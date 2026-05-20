import "../styles/hero.css";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Login", href: "#login" },
];

interface HeroNavProps {
  onAboutClick?: () => void;
  onPricingClick?: () => void;
  onFaqClick?: () => void;
}

export default function HeroNav({ onAboutClick, onPricingClick, onFaqClick }: HeroNavProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string) => {
    if (label === "About" && onAboutClick) {
      e.preventDefault();
      onAboutClick();
    }
    if (label === "Pricing" && onPricingClick) {
      e.preventDefault();
      onPricingClick();
    }
    if (label === "FAQ" && onFaqClick) {
      e.preventDefault();
      onFaqClick();
    }
  };

  return (
    <nav className="hero-nav" aria-label="Primary">
      {NAV_LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="hero-nav-link"
          onClick={(e) => handleClick(e, link.label)}
        >
          <span className="hero-nav-link-text">{link.label}</span>
          <span className="hero-nav-ripple" aria-hidden="true" />
        </a>
      ))}
    </nav>
  );
}
