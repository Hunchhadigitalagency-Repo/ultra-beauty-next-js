"use client";

import { forwardRef, useEffect, useRef } from "react";

declare global {
  interface Window {
    $: any;
  }
}

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
  className?: string;
  heightClass?: string;
}

const RichTextEditor = forwardRef<HTMLDivElement, RichTextEditorProps>(
  (
    {
      value,
      onChange,
      placeholder = "Enter text...",
      className = "mb-16 sm:mb-12",
      heightClass,
    },
    ref
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Load scripts & initialize summernote only once
    useEffect(() => {

      const el = textareaRef.current;

      const loadScripts = async () => {
        // Load jQuery if not present
        if (!window.$) {
          const jqueryScript = document.createElement("script");
          jqueryScript.src =
            "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js";
          document.head.appendChild(jqueryScript);
          await new Promise((resolve) => {
            jqueryScript.onload = resolve;
          });
        }

        // Load Summernote CSS
        if (!document.querySelector('link[href*="summernote"]')) {
          const summernoteCSS = document.createElement("link");
          summernoteCSS.rel = "stylesheet";
          summernoteCSS.href =
            "https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-lite.min.css";
          document.head.appendChild(summernoteCSS);
        }

        // Load Summernote JS
        const summernoteScript = document.createElement("script");
        summernoteScript.src =
          "https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-lite.min.js";
        document.head.appendChild(summernoteScript);

        await new Promise((resolve) => {
          summernoteScript.onload = resolve;
        });

        if (el && window.$) {
          window.$(el).summernote({
            height: 120,
            placeholder,
            toolbar: [
              ["style", ["style"]],
              ["font", ["bold", "italic", "underline", "strikethrough"]],
              ["fontsize", ["fontsize"]],
              ["color", ["color"]],
              ["para", ["ul", "ol", "paragraph"]],
              ["table", ["table"]],
              ["insert", ["link", "picture"]],
              ["view", ["fullscreen", "codeview"]],
            ],
            table: { className: "summernote-table" },
            callbacks: {
              onChange: function (contents: string) {
                onChange(contents);
              },
            },
          });

          // Set initial value
          if (value) {
            window.$(el).summernote("code", value);
          }
        }
      };

      loadScripts();

      return () => {
        if (el && window.$ && window.$(el).summernote) {
          window.$(el).summernote("destroy");
        }
      };
    }, [onChange, placeholder, value]); // no `value` here → init only once

    // Keep editor in sync when value changes
    useEffect(() => {
      const el = textareaRef.current;
      if (el && window.$ && window.$(el).summernote) {
        const currentContent = window.$(el).summernote("code");
        if (currentContent !== value) {
          window.$(el).summernote("code", value);
        }
      }
    }, [value]);

    return (
      <div ref={ref} className={`bg-white ${className}`}>
        {/* Custom table styles */}
        <style jsx global>{`
          .note-editor table,
          .summernote-table {
            border-collapse: collapse;
            width: 100%;
            margin: 10px 0;
            border: 1px solid #dee2e6;
          }
          .note-editor table td,
          .note-editor table th,
          .summernote-table td,
          .summernote-table th {
            border: 1px solid #dee2e6;
            padding: 8px 12px;
            text-align: left;
            vertical-align: top;
          }
          .note-editor table th,
          .summernote-table th {
            background-color: #f8f9fa;
            font-weight: bold;
          }
          .text-sm table,
          .md\\:text-base table {
            border-collapse: collapse !important;
            width: 100% !important;
            margin: 10px 0 !important;
            border: 1px solid #dee2e6 !important;
          }
          .text-sm table td,
          .text-sm table th,
          .md\\:text-base table td,
          .md\\:text-base table th {
            border: 1px solid #dee2e6 !important;
            padding: 8px 12px !important;
            text-align: left !important;
            vertical-align: top !important;
          }
          .text-sm table th,
          .md\\:text-base table th {
            background-color: #f8f9fa !important;
            font-weight: bold !important;
          }
          .text-sm table tr:nth-child(even),
          .md\\:text-base table tr:nth-child(even) {
            background-color: #f8f9fa !important;
          }
        `}</style>

        <textarea
          ref={textareaRef}
          className={`w-full ${heightClass}`}
          defaultValue={value}
        />
      </div>
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";

export default RichTextEditor;
