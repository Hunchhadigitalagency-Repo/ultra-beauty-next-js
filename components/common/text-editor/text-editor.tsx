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

    const onChangeRef = useRef(onChange);

    useEffect(() => {
      onChangeRef.current = onChange;
    }, [onChange]);

    // Helper function to clean empty content for validation
    const cleanEmptyContent = (content: string): string => {
      if (!content) return "";

      // Remove common empty HTML patterns that Summernote creates
      const cleanContent = content
        .replace(/<p><br><\/p>/g, "")
        .replace(/<p><\/p>/g, "")
        .replace(/<br>/g, "")
        .replace(/<div><br><\/div>/g, "")
        .replace(/<div><\/div>/g, "")
        .replace(/&nbsp;/g, " ")
        .trim();

      // If after cleaning, we only have whitespace or basic HTML, return empty string
      if (!cleanContent || cleanContent === "<p></p>" || cleanContent === "<div></div>") {
        return "";
      }

      // Check if content only contains HTML tags with no actual text
      const textOnly = cleanContent.replace(/<[^>]*>/g, '').trim();
      if (!textOnly) {
        return "";
      }

      return content; // Return original content if it has actual content
    };
    useEffect(() => {
      const el = textareaRef.current;
      const loadScripts = async () => {
        if (!window.$) {
          const jqueryScript = document.createElement('script');
          jqueryScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js';
          document.head.appendChild(jqueryScript);
          await new Promise((resolve) => {
            jqueryScript.onload = resolve;
          });
        }
        if (!document.querySelector('link[href*="summernote"]')) {
          const summernoteCSS = document.createElement('link');
          summernoteCSS.rel = 'stylesheet';
          summernoteCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-lite.min.css';
          document.head.appendChild(summernoteCSS);
        }
        const summernoteScript = document.createElement('script');
        summernoteScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-lite.min.js';
        document.head.appendChild(summernoteScript);
        await new Promise((resolve) => {
          summernoteScript.onload = resolve;
        });
        if (el && window.$) {
          window.$(el).summernote({
            height: 120,
            placeholder,
            // Add width constraint and word wrapping options
            width: '100%',
            disableResizeEditor: false,
            toolbar: [
              ['style', ['style']],
              ['font', ['bold', 'italic', 'underline', 'strikethrough']],
              ['fontsize', ['fontsize']],
              ['color', ['color']],
              ['para', ['ul', 'ol', 'paragraph']],
              ['table', ['table']],
              ['insert', ['link', 'picture']],
              ['view', ['fullscreen', 'codeview']]
            ],
            table: {
              className: 'summernote-table'
            },
            callbacks: {
              onChange: function (contents: string) {
                // Clean up empty content for proper validation
                const cleanedContents = cleanEmptyContent(contents);
                onChangeRef.current(cleanedContents);
              },
              onPaste: function (e: any) {
                // Get the pasted HTML content
                const pastedData = (e.originalEvent || e).clipboardData.getData('text/html');
                if (pastedData) {
                  // Prevent the default paste
                  e.preventDefault();
                  // Create a temporary element to hold the pasted HTML for cleaning
                  const tempEl = document.createElement('div');
                  tempEl.innerHTML = pastedData;
                  // Remove unwanted attributes and elements
                  const sanitizeElement = (el: HTMLElement) => {
                    const elements = el.querySelectorAll('*');
                    elements.forEach((element: any) => {
                      // Remove inline styles that cause layout issues
                      element.removeAttribute('style');
                      element.removeAttribute('width');
                      element.removeAttribute('height');
                      // Also remove min-width and max-width attributes
                      element.removeAttribute('min-width');
                      element.removeAttribute('max-width');
                      // Strip out any script tags for security
                      if (element.tagName === 'SCRIPT') {
                        element.remove();
                      }
                      // Handle specific problematic elements
                      if (element.tagName === 'TABLE') {
                        element.style.width = '100%';
                        element.style.maxWidth = '100%';
                      }
                      if (element.tagName === 'TD' || element.tagName === 'TH') {
                        element.style.wordWrap = 'break-word';
                        element.style.overflowWrap = 'break-word';
                        element.style.minWidth = '80px';
                        element.style.maxWidth = '300px';
                      }
                    });
                  };
                  sanitizeElement(tempEl);
                  // Insert the cleaned HTML back into the editor
                  window.$(textareaRef.current).summernote('pasteHTML', tempEl.innerHTML);
                  // Trigger the onChange to update the parent component's state
                  const finalContent = window.$(textareaRef.current).summernote('code');
                  const cleanedContent = cleanEmptyContent(finalContent);
                  onChange(cleanedContent);
                } else {
                  // If no HTML is available, fall back to plain text
                  const plainText = (e.originalEvent || e).clipboardData.getData('text/plain');
                  if (plainText) {
                    e.preventDefault();
                    // Break long words to prevent width overflow
                    const wrappedText = plainText.replace(/(\S{50})/g, '$1 ');
                    document.execCommand('insertText', false, wrappedText);
                    const finalContent = window.$(textareaRef.current).summernote('code');
                    const cleanedContent = cleanEmptyContent(finalContent);
                    onChange(cleanedContent);
                  }
                }
              }
            }
          });
          if (value) {
            window.$(el).summernote('code', value);
          }
        }
      };
      loadScripts();
      return () => {
        if (el && window.$) {
          window.$(el).summernote('destroy');
        }
      };
    }, [placeholder]);
    useEffect(() => {
      if (textareaRef.current && window.$ && window.$(textareaRef.current).summernote) {
        const currentContent = window.$(textareaRef.current).summernote('code');
        if (currentContent !== value) {
          window.$(textareaRef.current).summernote('code', value);
        }
      }
    }, [value]);
    return (
      <div ref={ref} className={`bg-white ${className}`}>
        <style jsx global>{`
          /* Container width constraints */
          .note-editor {
            width: 100% !important;
            max-width: 100% !important;
            overflow-x: hidden !important;
          }
          
          /* Editing area width constraints */
          .note-editing-area {
            width: 100% !important;
            max-width: 100% !important;
            overflow-x: hidden !important;
          }
          
          .note-editable {
            width: 100% !important;
            max-width: 100% !important;
            word-wrap: break-word !important;
            word-break: break-word !important;
            white-space: pre-wrap !important;
            overflow-x: hidden !important;
            overflow-y: auto !important;
          }
          /* Handle long words and URLs */
          .note-editable * {
            max-width: 100% !important;
            word-wrap: break-word !important;
            word-break: break-all !important;
          }
          /* Specific handling for different content types */
          .note-editable p,
          .note-editable div,
          .note-editable span {
            max-width: 100% !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
          }
          /* Handle pasted content with fixed widths */
          .note-editable [style*="width"] {
            width: auto !important;
            max-width: 100% !important;
          }
          /* Table styles for editor */
          .note-editor table,
          .summernote-table {
            border-collapse: collapse !important;
            width: 100% !important;
            max-width: 100% !important;
            table-layout: auto !important;
            margin: 10px 0 !important;
            border: 1px solid #dee2e6 !important;
          }
          
          .note-editor table td,
          .note-editor table th,
          .summernote-table td,
          .summernote-table th {
            border: 1px solid #dee2e6 !important;
            padding: 8px 12px !important;
            text-align: left !important;
            vertical-align: top !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            min-width: 80px !important;
            max-width: 300px !important;
          }
          
          .note-editor table th,
          .summernote-table th {
            background-color: #f8f9fa !important;
            font-weight: bold !important;
          }
          
          /* Styles for rendered content (when using dangerouslySetInnerHTML) */
          .text-sm table,
          .md\\:text-base table {
            border-collapse: collapse !important;
            width: 100% !important;
            max-width: 100% !important;
            table-layout: auto !important;
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
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            min-width: 80px !important;
            max-width: 300px !important;
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
          /* Handle images */
          .note-editable img {
            max-width: 100% !important;
            height: auto !important;
          }
          /* Handle code blocks */
          .note-editable pre,
          .note-editable code {
            white-space: pre-wrap !important;
            word-wrap: break-word !important;
            overflow-x: auto !important;
            max-width: 100% !important;
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