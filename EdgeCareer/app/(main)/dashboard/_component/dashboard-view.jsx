"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BriefcaseIcon,
  LineChart,
  TrendingUp,
  TrendingDown,
  Brain,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const DashboardView = ({ insights }) => {
  // Transform salary data for the chart
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-green-500" };
      case "neutral":
        return { icon: LineChart, color: "text-yellow-500" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-500" };
      default:
        return { icon: LineChart, color: "text-gray-500" };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  // Format dates using date-fns
  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true }
  );

  return (
    <div className="space-y-8">
      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow border-primary/20 bg-gradient-to-br from-background to-primary/5 cursor-pointer group"
          onClick={() => window.location.href = '/resume'}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <LineChart className="h-5 w-5" />
              </div>
              Resume Scanner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Check your resume score vs. job descriptions.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-primary/20 bg-gradient-to-br from-background to-primary/5 cursor-pointer group"
          onClick={() => window.location.href = '/interview'}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Brain className="h-5 w-5" />
              </div>
              Mock Interview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Practice behavioral questions with AI audio.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-primary/20 bg-gradient-to-br from-background to-primary/5 cursor-pointer group"
          onClick={() => window.location.href = '/ai-cover-letter'}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <BriefcaseIcon className="h-5 w-5" />
              </div>
              Cover Letter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Generate a tailored cover letter in seconds.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="border-t border-dashed my-6"></div>

      {/* Industry Insights Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Industry Intelligence</h2>
          <p className="text-muted-foreground text-sm">Real-time market analysis for your profile</p>
        </div>
        <Badge variant="outline" className="text-xs">Last updated: {lastUpdatedDate}</Badge>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* ... existing cards ... */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Market Outlook
            </CardTitle>
            <OutlookIcon className={`h-4 w-4 ${outlookColor}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.marketOutlook}</div>
            <p className="text-xs text-muted-foreground">
              Next update {nextUpdateDistance}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Industry Growth
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {insights.growthRate.toFixed(1)}%
            </div>
            <Progress value={insights.growthRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Demand Level</CardTitle>
            <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.demandLevel}</div>
            <div
              className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(
                insights.demandLevel
              )}`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Skills</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {insights.topSkills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts & Trends Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Salary Ranges Chart */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Salary Ranges by Role</CardTitle>
            <CardDescription>
              Displaying minimum, median, and maximum salaries (in thousands)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salaryData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", color: "#f8fafc" }}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 shadow-xl">
                            <p className="font-medium text-slate-100 mb-2">{label}</p>
                            {payload.map((item) => (
                              <p key={item.name} className="text-sm text-slate-300">
                                {item.name}: <span className="text-white font-bold">${item.value}K</span>
                              </p>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="min" fill="#64748b" radius={[4, 4, 0, 0]} name="Min Salary" />
                  <Bar dataKey="median" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Median Salary" />
                  <Bar dataKey="max" fill="#0f172a" radius={[4, 4, 0, 0]} name="Max Salary" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Industry Trends & Skills Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Key Industry Trends</CardTitle>
              <CardDescription>
                Current trends shaping the industry
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {insights.keyTrends.map((trend, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="flex h-2 w-2 translate-y-2 rounded-full bg-primary" />
                    <span className="text-sm">{trend}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Skills</CardTitle>
              <CardDescription>Skills to consider developing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {insights.recommendedSkills.map((skill) => (
                  <Badge key={skill} variant="outline" className="border-primary/20 bg-primary/5">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
