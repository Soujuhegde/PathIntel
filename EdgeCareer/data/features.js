import {
  FileText,
  Mic,
  BriefcaseBusiness,
  ShieldCheck
} from "lucide-react";

export const features = [
  {
    icon: <ShieldCheck className="w-6 h-6 mb-4 text-gray-400" />,
    title: "Resume Scanner (AI vs. ATS)",
    description: "Our AI compares your resume against real job descriptions to identify missing keywords and formatting errors that get you rejected.",
    button: { text: "Scan My Resume", link: "/ats-checker" },
  },
  {
    icon: <Mic className="w-6 h-6 mb-4 text-gray-400" />,
    title: "AI Mock Interviewer",
    description: "Practice answering behavioral and technical questions. The AI listens to your audio and gives feedback on tone, clarity, and content.",
    button: { text: "Start Practice", link: "/mock-interview" },
  },
  {
    icon: <FileText className="w-6 h-6 mb-4 text-gray-400" />,
    title: "Automated Cover Letters",
    description: "Generate a tailored cover letter in seconds. The AI analyzes the job description and your resume to write a compelling pitch.",
    button: { text: "Generate Letter", link: "/resume-builder" },
  },
  {
    icon: <BriefcaseBusiness className="w-6 h-6 mb-4 text-gray-400" />,
    title: "Career Gap Analysis",
    description: "Identify exactly what skills or experiences you are missing for your target role and get actionable advice on how to bridge the gap.",
    button: { text: "View Gap Analysis", link: "/industry-insights" },
  },
];

export default features;