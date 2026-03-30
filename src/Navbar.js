import { useState, useEffect } from "react";
import logo from "./images/logo.png";

const NAV_LINKS = ["Home", "About", "Events", "General Assembly", "Member Schools"];

export default function Navbar({ activeLink = "Home", onNavigate, scrolled = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(scrolled);

  useEffect(() => {
    // Passive listener — no main-thread blocking
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on outside scroll
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("scroll", close, { passive: true, once: true });
    return () => window.removeEventListener("scroll", close);
  }, [menuOpen]);

  const handleLinkClick = (link) => {
    setMenuOpen(false);
    onNavigate?.(link);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? "navbar--scrolled" : "navbar--top"}`}>
        <div className="navbar__inner">
          <button className="navbar__logo" onClick={() => handleLinkClick("Home")}>
            <img src={logo} alt="CEAP NCR Logo" className="navbar__logo-img" />
            <div className="navbar__logo-text">
              <strong>CEAP NCR</strong>
              <span>Catholic Educational Association of the Philippines</span>
              <br /><span>National Capital Region</span>
            </div>
          </button>

          <ul className="navbar__links">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <button
                  className={`navbar__link ${activeLink === link ? "navbar__link--active" : ""}`}
                  onClick={() => handleLinkClick(link)}
                >
                  {link}
                </button>
              </li>
            ))}
            <li>
              <button className="navbar__cta" onClick={() => handleLinkClick("Contact")}>
                Contact Us
              </button>
            </li>
          </ul>

          <button
            className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <button key={link} className="navbar__mobile-link" onClick={() => handleLinkClick(link)}>
            {link}
          </button>
        ))}
        <button className="navbar__mobile-cta" onClick={() => handleLinkClick("Contact")}>
          Join CEAP NCR →
        </button>
      </div>
    </>
  );
}