import "../styles/hero.css";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Login", href: "#login" },
];

export default function HeroNav() {
  return (
    <nav className="hero-nav" aria-label="Primary">
      {NAV_LINKS.map((link) => (
        <a key={link.href} href={link.href} className="hero-nav-link">
          {link.label}
        </a>
      ))}
    </nav>
  );
}
