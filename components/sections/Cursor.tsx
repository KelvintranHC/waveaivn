export const CURSOR_HTML = "<!-- Custom cursor -->\n<div class=\"cursor-dot\" id=\"cursorDot\"></div>\n<div class=\"cursor-ring\" id=\"cursorRing\"></div>\n" as const;

export default function Cursor() {
  return <div className="raw-html" dangerouslySetInnerHTML={{ __html: CURSOR_HTML }} />;
}
