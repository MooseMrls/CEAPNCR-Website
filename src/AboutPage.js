import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import "./AboutPage.css";
import logo from "./images/logo.png";
import glennImg from "./images/regional/glenn.png";
import kenImg from "./images/regional/ken.png";
import danielImg from "./images/regional/daniel.png";
import aileenImg from "./images/regional/aileen.png";
import christmarImg from "./images/regional/christmar.png";
import Navbar from "./Navbar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────── */
const Icon = {
  ArrowLeft: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Award: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  BookOpen: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  Star: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  MapPin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 16.92z"/>
    </svg>
  ),
  Mail: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Send: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  Youtube: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  ),
};

/* ─────────────────────────────────────────
   EMAILJS CREDENTIALS
───────────────────────────────────────── */
const EJ_SERVICE_ID          = "service_xnyzegr";
const EJ_NEWSLETTER_TEMPLATE = "YOUR_NEWSLETTER_TEMPLATE_ID";
const EJ_PUBLIC_KEY          = "HECJM-eRsITMpWKj5";

const NAV_LINKS = ["Home", "About", "Events", "General Assembly", "Member Schools", "Contact"];

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const REGIONAL_COUNCIL = [
  {
    name: "Rev. Fr. Glenn William Z. Relucio, Ph.D.",
    position: "Regional Trustee",
    school: "MaPSA Antipolo Schools",
    role: "Superintendent",
    image: glennImg,
  },
  {
    name: "Rev. Fr. Kennedy A. Neral, Ph.D.",
    position: "Vice Regional Trustee",
    school: "KADSA",
    role: "Superintendent",
    image: kenImg,
  },
  {
    name: "Rev. Fr. Daniel L. Estacio",
    position: "Treasurer",
    school: "PaDSS",
    role: "Superintendent",
    image: danielImg,
  },
  {
    name: "Sr. Aileen U. Bonifacio, SPC",
    position: "Corporate Secretary",
    school: "St. Paul University QC",
    role: "Principal",
    image: aileenImg,
  },
  {
    name: "Rev. Fr. Christmar I. Daguno, LPT, RGC, PhD",
    position: "Trustee-at-Large",
    school: "MOPSS",
    role: "Superintendent",
    image: christmarImg,
  },
];

const COMMITTEES = [
  { name: "Administrative Services",        chair: "Dr. Noel C. Racho",          school: "Miriam College" },
  { name: "Advocacy",                       chair: "Mr. Edward Dunhill P. Chico", school: "Lourdes School Quezon City" },
  { name: "Basic Education",                chair: "Ms. Evangeline de Peralta",   school: "De La Salle Brothers, Inc. / De La Salle Santiago Zobel School" },
  { name: "Christian Formation",            chair: "Dr. Erickson S. Javier",      school: "Pasig Catholic College" },
  { name: "Guidance and Counseling",        chair: "Dr. Myreen P. Cleofe",        school: "University of Santo Tomas" },
  { name: "Library",                        chair: "Rowena Cayanan",              school: "St. Paul University Manila" },
  { name: "Registrar",                      chair: "Vida Marie A. Pacquing",      school: "Assumption Antipolo, Inc." },
  { name: "Student Affairs",                chair: "Ms. Elmgay Valeriano",        school: "De La Salle University" },
  { name: "Student Leadership",             chair: "Mr. Bryan M. Gallos",         school: "Holy Child Catholic School" },
  { name: "Tertiary Education",             chair: "Dr. Virginia R. Fornias",     school: "St. Scholastica's College, Manila" },
  { name: "Institute For Continuing Education", chair: "Mr. Neil O. Pariñas",    school: "De La Salle – College of St. Benilde" },
];

const PILLARS = [
  {
    icon: Icon.BookOpen,
    title: "Academic Excellence",
    desc: "Upholding the highest standards of Catholic education across all member institutions in Metro Manila.",
  },
  {
    icon: Icon.Users,
    title: "Collaborative Leadership",
    desc: "Uniting school administrators, educators, and communities in shared mission and governance.",
  },
  {
    icon: Icon.Award,
    title: "Faith Formation",
    desc: "Rooting every program and initiative in Gospel values, service, and authentic Christian witness.",
  },
  {
    icon: Icon.Star,
    title: "Servant Leadership",
    desc: "Forming future leaders who lead with humility, integrity, and deep concern for the common good.",
  },
];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function AboutPage({ onBack, onNavigate }) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone]   = useState(false);
  const [nlLoading, setNlLoading] = useState(false);
  const [nlError, setNlError]     = useState("");

  const handleNewsletter = (e) => {
    e.preventDefault();
    setNlLoading(true);
    setNlError("");
    emailjs.send(
      EJ_SERVICE_ID,
      EJ_NEWSLETTER_TEMPLATE,
      { subscriber_email: newsletterEmail },
      EJ_PUBLIC_KEY
    )
      .then(() => { setNewsletterDone(true); setNewsletterEmail(""); })
      .catch(() => { setNlError("Couldn't subscribe. Please try again."); })
      .finally(() => setNlLoading(false));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    const raf = requestAnimationFrame(() => {
      ScrollTrigger.getAll().forEach((t) => t.kill());

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Hero text
        gsap.fromTo(".about-hero__title",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
        );
        gsap.fromTo(".about-hero__sub",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.45 }
        );
        gsap.fromTo(".about-hero__badge",
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.5)", delay: 0.1 }
        );

        // Pillar cards
        gsap.fromTo(".pillar-card",
          { y: 45, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: ".pillars-grid", start: "top 82%" },
          }
        );

        // Council cards
        gsap.fromTo(".council-card",
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.65, stagger: 0.09, ease: "power2.out",
            scrollTrigger: { trigger: ".council-grid", start: "top 84%" },
          }
        );

        // Committee cards
        gsap.fromTo(".committee-card",
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.65, stagger: 0.07, ease: "power2.out",
            scrollTrigger: { trigger: ".committee-grid", start: "top 84%" },
          }
        );

        // Section labels
        gsap.utils.toArray(".section-label").forEach((el) => {
          gsap.fromTo(el,
            { x: -30, opacity: 0 },
            {
              x: 0, opacity: 1, duration: 0.6, ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 88%" },
            }
          );
        });

        // Reveal generics
        gsap.utils.toArray(".reveal").forEach((el) => {
          gsap.fromTo(el,
            { y: 36, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 88%" },
            }
          );
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.utils.toArray(".pillar-card,.council-card,.committee-card,.reveal").forEach((el) => {
          gsap.set(el, { opacity: 1, y: 0, x: 0, scale: 1 });
        });
      });

      return () => {
        mm.revert();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    });

    return () => {
      cancelAnimationFrame(raf);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="about-page">
      {/* ── NAVBAR ─────────────────────────────── */}
      <Navbar activeLink="About" onNavigate={onNavigate} scrolled={false} />

      {/* ── HERO ───────────────────────────────── */}
      <header className="about-hero">
        <div className="about-hero__pattern" />
        <div className="about-hero__orb about-hero__orb--1" />
        <div className="about-hero__orb about-hero__orb--2" />

        <div className="about-hero__inner">
          <div className="about-hero__badge">
            <img src={logo} alt="CEAP NCR" className="about-hero__logo" />
          </div>
          <h1 className="about-hero__title">
            CEAP NCR<br />
            <em>Regional Council</em>
          </h1>
          <p className="about-hero__sub">
            Catholic Educational Association of the Philippines<br />
            National Capital Region
          </p>
        </div>
      </header>

      {/* ── MISSION / PILLARS ──────────────────── */}
      <section className="about-section about-section--light">
        <div className="section-inner">
          <div className="about-intro reveal">
            <span className="section-label">Our Foundation</span>
            <h2 className="section-title">Championing Catholic Education Across Metro Manila</h2>
            <p className="section-body">
              CEAP NCR is the regional body of the Catholic Educational Association of the Philippines, 
              serving the National Capital Region. Since 1941, it has united Catholic schools in a shared 
              mission of faith, excellence, and service — forming leaders and communities through the values 
              of the Gospel.
            </p>
          </div>

          <div className="pillars-grid">
            {PILLARS.map(({ icon: IconComp, title, desc }) => (
              <div key={title} className="pillar-card">
                <div className="pillar-card__icon">
                  <IconComp />
                </div>
                <h3 className="pillar-card__title">{title}</h3>
                <p className="pillar-card__desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REGIONAL COUNCIL ───────────────────── */}
      <section className="about-section about-section--dark">
        <div className="section-inner">
          <div className="reveal">
            <span className="section-label section-label--light">Leadership</span>
            <h2 className="section-title section-title--light">Regional Council</h2>
            <p className="section-body" style={{ color: "rgba(255,255,255,0.65)", marginBottom: "3rem" }}>
              The CEAP NCR Regional Council is composed of distinguished Catholic educators and 
              religious leaders guiding the region's educational mission.
            </p>
          </div>

          <div className="council-grid">
            {REGIONAL_COUNCIL.map((member) => (
              <div key={member.name} className="council-card">
                <div className="council-card__position-badge">
                  {member.position}
                </div>
                <div className="council-card__avatar" style={{ overflow: "hidden" }}>
                  <img src={member.image} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: member.imagePosition || "center 20%" }} />
                </div>
                <h3 className="council-card__name">{member.name}</h3>
                <p className="council-card__role">{member.role}</p>
                <p className="council-card__school">{member.school}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMITTEES ─────────────────────────── */}
      <section className="about-section about-section--light">
        <div className="section-inner">
          <div className="reveal">
            <span className="section-label">Structure</span>
            <h2 className="section-title">Standing Committees</h2>
            <p className="section-body" style={{ marginBottom: "2.5rem" }}>
              Each committee is chaired by a dedicated educator from a member school, overseeing 
              a specific area of Catholic education in the NCR.
            </p>
          </div>

          <div className="committee-grid">
            {COMMITTEES.map((c, i) => (
              <div key={c.name} className="committee-card" style={{ animationDelay: `${i * 0.04}s` }}>
                <div className="committee-card__badge">{c.name}</div>
                <div className="committee-card__avatar">
                  {c.chair.split(" ").filter(w => /^[A-Z]/.test(w) && w.length > 1).slice(0, 2).map(w => w[0]).join("")}
                </div>
                <h3 className="committee-card__name">{c.chair}</h3>
                <p className="committee-card__label">Committee Chair</p>
                <p className="committee-card__school">{c.school}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────── */}
      <footer>
        <div className="footer-inner">

          <div className="footer-top" style={{ gridTemplateColumns: "1.6fr 0.75fr 1fr 1.5fr" }}>

            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-brand__logo">
                <img src={logo} alt="CEAP NCR Logo" className="footer-logo-img" />
                <div>
                  <div className="footer-logo-name">CEAP NCR</div>
                  <div className="footer-logo-sub">Catholic Educational Association</div>
                </div>
              </div>
              <p>
                Championing Catholic education in the National Capital Region since 1941 — uniting
                schools in faith, service, and academic excellence.
              </p>
              <div className="footer-socials">
                {[
                  { Icon: Icon.Facebook, label: "Facebook", href: "https://www.facebook.com/ceapncrPH" },
                  { Icon: Icon.Youtube,  label: "YouTube",  href: "https://www.youtube.com/@ceapncrph6072" },
                ].map(({ Icon: I, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label={label}>
                    <I />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h5>Quick Links</h5>
              <ul>
                {NAV_LINKS.map((l) => (
                  <li key={l}>
                    <a href={`#${l.toLowerCase().replace(/ /g, "-")}`}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <h5>Contact Us</h5>
              <ul className="footer-contact-list">
                <li>
                  <span className="footer-contact-icon"><Icon.MapPin /></span>
                  <span>6th Flr. St. John Building 1521 Paz St.<br />Paco, Manila 1007</span>
                </li>
                <li>
                  <span className="footer-contact-icon"><Icon.Phone /></span>
                  <span>(02) 8 564-3712 to 13</span>
                </li>
                <li>
                  <span className="footer-contact-icon"><Icon.Mail /></span>
                  <span>info@ceapncr.org.ph</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer-col">
              <h5>Stay Updated</h5>
              <p className="footer-nl-desc">Get the latest events, programs, and announcements delivered to your inbox.</p>
              {newsletterDone ? (
                <p className="footer-nl-thanks">Thank you for subscribing!</p>
              ) : (
                <>
                  <form className="footer-nl-form" onSubmit={handleNewsletter}>
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      required
                      disabled={nlLoading}
                      aria-label="Email for newsletter"
                    />
                    <button type="submit" disabled={nlLoading} style={{ opacity: nlLoading ? 0.7 : 1 }}>
                      {nlLoading ? "…" : <><Icon.Send /> Subscribe</>}
                    </button>
                  </form>
                  {nlError && (
                    <p style={{ color: "#f4a0a0", fontSize: "0.78rem", marginTop: "0.5rem" }}>{nlError}</p>
                  )}
                </>
              )}
            </div>

          </div>

          <div className="footer-bottom">
            <p>Developed By: <a href="https://sean-m.vercel.app" target="_blank" rel="noopener noreferrer" className="footer-dev-link">Sean Morales</a></p>
            <p>© 2026 Catholic Educational Association of the Philippines – National Capital Region. All Rights Reserved.</p>
            <p>
              <button className="footer-bottom-link" onClick={() => {}}>Privacy Policy</button>
              {" · "}
              <button className="footer-bottom-link" onClick={() => {}}>Terms of Use</button>
              {" · "}
              <button className="footer-bottom-link" onClick={() => {}}>Sitemap</button>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}