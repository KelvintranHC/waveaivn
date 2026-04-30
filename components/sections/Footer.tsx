export const FOOTER_HTML = "<!-- WORDMARK FOOTER -->\n<footer class=\"wordmark-footer\">\n  <div class=\"wordmark-top\">\n    <span>© 2026 Wave AI. All rights reserved.</span>\n    <span>AI Automation Agency</span>\n  </div>\n  <span class=\"wordmark\">WAVE AI</span>\n</footer>\n" as const;

export default function Footer() {
  return <div className="raw-html" dangerouslySetInnerHTML={{ __html: FOOTER_HTML }} />;
}
