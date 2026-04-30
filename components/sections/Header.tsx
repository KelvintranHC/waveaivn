export const HEADER_HTML = "<!-- NAV -->\n<nav id=\"navbar\">\n  <div class=\"nav-inner\">\n    <div class=\"nav-logo\">WAVE AI</div>\n    <div class=\"nav-links\">\n      <a href=\"#\">Services</a>\n      <a href=\"#\">Work</a>\n      <a href=\"#\">Team</a>\n      <a href=\"#\">Blog</a>\n      <a href=\"#\">FAQ</a>\n    </div>\n    <div class=\"nav-right\">\n      <button class=\"nav-cta\">LET'S TALK</button>\n    </div>\n  </div>\n</nav>\n" as const;

export default function Header() {
  return <div className="raw-html" dangerouslySetInnerHTML={{ __html: HEADER_HTML }} />;
}
