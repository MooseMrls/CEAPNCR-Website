import { useState, useEffect, useRef } from "react";
import logo from "./images/logo.png";

const NAV_LINKS = ["Home", "About", "Events", "General Assembly", "Member Schools"];

export default function Navbar({ activeLink = "Home", onNavigate, scrolled = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(scrolled);
  const [gaDropdownOpen, setGaDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Passive listener — no main-thread blocking
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setGaDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on outside scroll
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("scroll", close, { passive: true, once: true });
    return () => window.removeEventListener("scroll", close);
  }, [menuOpen]);

  const handleLinkClick = (link, year = 2026) => {
    setMenuOpen(false);
    setGaDropdownOpen(false);
    onNavigate?.(link, year);
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
            {NAV_LINKS.map((link) => {
              if (link === "General Assembly") {
                return (
                  <li key={link} style={{ position: "relative" }} ref={dropdownRef}>
                    <button
                      className={`navbar__link ${activeLink === link ? "navbar__link--active" : ""}`}
                      onClick={() => setGaDropdownOpen(!gaDropdownOpen)}
                    >
                      General Assembly ▼
                    </button>
                    {gaDropdownOpen && (
                      <ul className="navbar__dropdown-menu" style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", background: "var(--navy, #1a1f6e)", padding: "0.5rem 0", borderRadius: "0.5rem", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", zIndex: 100, minWidth: "140px", display: "flex", flexDirection: "column", gap: "0.2rem", listStyle: "none", border: "1px solid rgba(255,255,255,0.1)" }}>
                        {[2026, 2025].map((yr) => (
                          <li key={yr}>
                            <button 
                              style={{ width: "100%", padding: "0.6rem 1rem", background: "none", border: "none", color: "white", textAlign: "center", cursor: "pointer", transition: "background 0.2s" }}
                              onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.1)"}
                              onMouseLeave={(e) => e.target.style.background = "none"}
                              onClick={() => handleLinkClick("General Assembly", yr)}
                            >
                              Year {yr}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }
              return (
                <li key={link}>
                  <button
                    className={`navbar__link ${activeLink === link ? "navbar__link--active" : ""}`}
                    onClick={() => handleLinkClick(link)}
                  >
                    {link}
                  </button>
                </li>
              );
            })}
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
        {NAV_LINKS.map((link) => {
          if (link === "General Assembly") {
            return (
              <div key={link} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                <button className="navbar__mobile-link" onClick={() => setGaDropdownOpen(!gaDropdownOpen)}>
                  General Assembly ▼
                </button>
                {gaDropdownOpen && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem", width: "100%", background: "rgba(0,0,0,0.1)", padding: "1rem 0", borderRadius: "8px" }}>
                    {[2026, 2025].map((yr) => (
                      <button key={yr} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: "1.1rem" }} onClick={() => handleLinkClick("General Assembly", yr)}>
                        Year {yr}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          return (
            <button key={link} className="navbar__mobile-link" onClick={() => handleLinkClick(link)}>
              {link}
            </button>
          );
        })}
        <button className="navbar__mobile-cta" onClick={() => handleLinkClick("Contact")}>
          Join CEAP NCR →
        </button>
      </div>
    </>
  );
}