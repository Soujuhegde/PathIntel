"use client";

import React, { useRef, useState } from "react";
// import html2pdf from "html2pdf.js";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const CoverLetterPreview = ({ content }) => {
  const [editableContent, setEditableContent] = useState(content);
  const pdfRef = useRef();

  const handleDownload = async () => {
    if (!pdfRef.current) return;

    try {
      const html2pdf = (await import("html2pdf.js")).default;
      html2pdf()
        .from(pdfRef.current)
        .set({
          margin: [0.5, 0.5],
          filename: "cover-letter.pdf",
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .save();
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editableContent);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <div className="space-y-4">
      {/* Editable Textarea */}
      <Textarea
        className="h-[500px] font-mono bg-white text-black"
        value={editableContent}
        onChange={(e) => setEditableContent(e.target.value)}
      />

      <div
        style={{
          position: "absolute",
          left: "-9999px",
          top: "0",
          width: "210mm",
        }}
      >
        <div
          ref={pdfRef}
          style={{
            whiteSpace: "pre-wrap",
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "12pt",
            lineHeight: "1.6",
            padding: "1in",
            color: "#000",
            background: "#fff",
          }}
        >
          {editableContent}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button onClick={handleDownload}>📄 Download PDF</Button>
        <Button onClick={handleCopy}>📋 Copy to Clipboard</Button>
      </div>
    </div>
  );
};

export default CoverLetterPreview;
