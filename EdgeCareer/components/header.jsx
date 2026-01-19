import React from "react";
import { Button } from "./ui/button";
import { BUTTONS_MENUS } from "@/lib/constants";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  StarsIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { checkUser } from "@/lib/checkUser";
import { useTheme } from "next-themes";
import ThemeSwitch from "./theme-switch";


export default async function Header() {
  await checkUser();

  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="w-full px-6 md:px-12 h-24 flex items-center justify-between">
        <Link href="/">
          <Image
            src={"/skill.png"}
            alt="PathIntel Logo"
            width={600}
            height={150}
            className="w-80 h-auto object-contain"
          />
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="hidden md:inline-flex items-center gap-2 text-lg h-12 px-6"
              >
                <LayoutDashboard className="h-5 w-5" />
                {BUTTONS_MENUS.DASHBOARD_INSIGHTS}
              </Button>
              <Button variant="ghost" className="md:hidden w-12 h-12 p-0">
                <LayoutDashboard className="h-6 w-6" />
              </Button>
            </Link>

            {/* Growth Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2 text-lg h-12 px-6">
                  <StarsIcon className="h-5 w-5" />
                  <span className="hidden md:block">{BUTTONS_MENUS.GROWTH_TOOLS}</span>
                  <ChevronDown className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/resume" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {BUTTONS_MENUS.BUILD_RESUME}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/ai-cover-letter"
                    className="flex items-center gap-2"
                  >
                    <PenBox className="h-4 w-4" />
                    {BUTTONS_MENUS.COVER_LETTER}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/interview" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    {BUTTONS_MENUS.INTERVIEW_PREP}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="outline" className="text-xl h-14 px-10 font-bold border-2">{BUTTONS_MENUS.SIGN_IN}</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-12 h-12",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-bold text-lg",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
          <ThemeSwitch />
        </div>
      </nav>
    </header>
  );
}
