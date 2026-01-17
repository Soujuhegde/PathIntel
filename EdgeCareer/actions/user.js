"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    // Check if industry insights exist
    let industryInsight = await db.industryInsight.findUnique({
      where: {
        industry: data.industry,
      },
    });

    // If no insights, generate them before transaction
    let insights;
    if (!industryInsight) {
      try {
        insights = await generateAIInsights(data.industry);
      } catch (err) {
        console.error("Failed to generate AI insights, using default fallback:", err);
        insights = {
          salaryRanges: [],
          growthRate: 0,
          demandLevel: "Medium",
          topSkills: [],
          marketOutlook: "Neutral",
          keyTrends: ["Gathering data..."],
          recommendedSkills: [],
        };
      }
    }

    // Start a transaction to handle both operations
    const result = await db.$transaction(
      async (tx) => {
        // Check again inside transaction to handle race conditions
        if (!industryInsight) {
          industryInsight = await tx.industryInsight.findUnique({
            where: {
              industry: data.industry,
            },
          });
        }

        // If still no insight, create it - ONLY if insights were successfully generated
        if (!industryInsight && insights) {
          industryInsight = await tx.industryInsight.create({
            data: {
              industry: data.industry,
              ...insights,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
        }

        // Now update the user
        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return { updatedUser, industryInsight };
      },
      {
        timeout: 10000,
      }
    );

    revalidatePath("/");
    return result.user;
  } catch (error) {
    console.error("Error updating user and industry:", error);
    console.error("Error stack:", error.stack);
    console.error("Input data:", JSON.stringify(data));
    throw new Error("Failed to update profile: " + (error.message || "Unknown error"));
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    return { isOnboarded: false };
  }

  try {
    return {
      isOnboarded: !!user.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}
