import { Upload, FileSearch, Mic, Trophy } from "lucide-react";

export const howItWorks = [
  {
    title: "1. Upload Resume",
    description: "Upload your existing resume (PDF/DOCX) and tell us your target job role.",
    icon: <Upload className="w-8 h-8 text-primary" />,
  },
  {
    title: "2. AI Audit",
    description: "We score your resume against the job description and highlight exactly what to fix.",
    icon: <FileSearch className="w-8 h-8 text-primary" />,
  },
  {
    title: "3. Practice & Fix",
    description: "Use the AI tools to fix your resume gaps and practice interview questions.",
    icon: <Mic className="w-8 h-8 text-primary" />,
  },
  {
    title: "4. Get Hired",
    description: "Apply with confidence using optimized documents and interview skills.",
    icon: <Trophy className="w-8 h-8 text-primary" />,
  },
];
