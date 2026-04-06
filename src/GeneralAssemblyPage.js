import { useState, useEffect, useRef } from "react";
import "./GeneralAssemblyPage.css";
import logo from "./images/logo.png";
import ga1 from "./images/ga1.jpg";
import ga2 from "./images/ga2.jpg";
import ga3 from "./images/ga3.jpg";
import ga4 from "./images/ga4.jpg";
import ga5 from "./images/ga5.jpg";
import ga6 from "./images/ga6.jpg";
import ga7 from "./images/ga7.jpg";
import ga8 from "./images/ga8.jpg";
import ga9 from "./images/ga9.jpg";
import ga10 from "./images/ga10.jpg";
import ga11 from "./images/ga11.jpg";
import ga12 from "./images/ga12.jpg";
import sonny from "./images/sonny.png";
import raymond from "./images/raymond.jpg";
import joseph from "./images/joseph.jpg";
import rhodora from "./images/rhodora.jpg";
import Navbar from "./Navbar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.config({ force3D: true });

/* ─── ICONS ─────────────────────────────── */
const Icon = {
  ArrowLeft: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  ),
  Calendar: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  MapPin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Play: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="12" fill="rgba(255,255,255,0.15)"/>
      <polygon points="10 8 18 12 10 16 10 8" fill="white"/>
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  ExternalLink: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  Star: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  Clock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  ChevronLeft: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
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
  Youtube: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  ),
  Send: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
};

const NAV_LINKS = ["Home", "About", "Member Schools", "Events", "General Assembly", "Contact"];

/* ─── DATA ───────────────────────────────── */
const PROGRAM_DAYS = [
  {
    day: "Day 1",
    date: "July 29, 2025 (Tuesday)",
    theme: "Arriving as Pilgrims",
    color: "#c9a84c",
    sessions: [
      { time: "8:00 AM",  title: "Registration & Welcome Coffee",       desc: "Arrival of delegates, distribution of materials, networking." },
      { time: "9:30 AM",  title: "Opening Holy Mass",                   desc: "Celebrated by the CEAP NCR Ecclesiastical Adviser at the UST Chapel." },
      { time: "11:00 AM", title: "Opening Plenary: Living Synodality",  desc: "Keynote address by the CEAP NCR President on the theme 'Living Synodality as Pilgrims of Hope.'" },
      { time: "1:00 PM",  title: "Lunch Break & Networking",            desc: "Fellowship meal among school heads and administrators." },
      { time: "2:30 PM",  title: "Panel: The Synodal Church & Catholic Schools", desc: "Four panelists explore what walking together means for Catholic education in Metro Manila." },
      { time: "5:00 PM",  title: "Cultural Presentation & Icebreakers", desc: "Showcase of member school talents. Team-building activities." },
      { time: "7:00 PM",  title: "Welcome Dinner & Fellowship Night",   desc: "Formal dinner. Awarding of long-service member schools." },
    ],
  },
  {
    day: "Day 2",
    date: "July 30, 2025 (Wednesday)",
    theme: "Walking Together",
    color: "#1a1f6e",
    sessions: [
      { time: "7:00 AM",  title: "Morning Prayer & Reflection",         desc: "Led by the CEAP NCR Spirituality Commission." },
      { time: "8:30 AM",  title: "Plenary II: Inclusive Catholic Education", desc: "Deep dive into RA 11650 and how Catholic schools uphold inclusive practices." },
      { time: "10:30 AM", title: "Breakout Sessions (4 tracks)",        desc: "Track A: Governance · Track B: Faculty Formation · Track C: Curriculum · Track D: Student Welfare" },
      { time: "12:00 PM", title: "Lunch",                               desc: "" },
      { time: "1:30 PM",  title: "Commission Reports",                  desc: "Updates from MaPSA, CHRMD, Spirituality, and Research Commissions." },
      { time: "3:00 PM",  title: "Workshop: Strategic Planning 2026",   desc: "Facilitated group workshops for member school action planning." },
      { time: "5:30 PM",  title: "Eucharistic Celebration",             desc: "Evening Mass for all delegates." },
      { time: "7:00 PM",  title: "Delegates' Night",                    desc: "Cultural performances and raffle for participating member schools." },
    ],
  },
  {
    day: "Day 3",
    date: "July 31, 2025 (Thursday)",
    theme: "Renewed & Sent Forth",
    color: "#232899",
    sessions: [
      { time: "7:00 AM",  title: "Lauds & Morning Reflection",          desc: "Morning prayer in the tradition of the Liturgy of the Hours." },
      { time: "8:30 AM",  title: "Plenary III: Pilgrims of Hope — The Way Forward", desc: "Closing keynote on the vision of CEAP NCR for 2026 and beyond." },
      { time: "10:00 AM", title: "Open Forum & Resolutions",            desc: "Delegates raise concerns and vote on resolutions for the upcoming year." },
      { time: "11:30 AM", title: "Assembly Declaration",                desc: "Reading and signing of the CEAP NCR General Assembly 2025 Declaration." },
      { time: "12:00 PM", title: "Closing Lunch",                       desc: "Final fellowship lunch." },
      { time: "2:00 PM",  title: "Closing Mass & Blessing",             desc: "Solemn closing Eucharistic celebration and sending-forth blessing." },
      { time: "4:00 PM",  title: "Departure",                           desc: "Safe travels for all delegates." },
    ],
  },
];

const GALLERY_IMAGES = [
  { src: ga1, caption: "Opening Plenary at UST", id: "ga1" },
  { src: ga2, caption: "Breakout Session — Track B", id: "ga2" },
  { src: ga3, caption: "Panel Discussion", id: "ga3" },
  { src: ga4, caption: "Morning Reflection", id: "ga4" },
  { src: ga5, caption: "Community Fellowship", id: "ga5" },
  { src: ga6, caption: "Workshop Session", id: "ga6" },
  { src: ga7, caption: "Delegates' Night", id: "ga7" },
  { src: ga8, caption: "Closing Mass", id: "ga8" },
  { src: ga9, caption: "Assembly Highlights", id: "ga9" },
  { src: ga10, caption: "Networking and Fellowship", id: "ga10" },
  { src: ga11, caption: "Continuing the Mission", id: "ga11" },
];

const SPEAKERS = [
  { name: "Hon. Juan Edgardo “Sonny” M. Angara",  role: "Secretary of the Department of Education",        img: sonny },
  { name: "Fr. Raymond Joseph L. Arre",          role: "Superintendent, Diocese of Cubao Educational System (DOCES),Chair, CEAP Superintendents Conference Vice President, MaPSA",                       img: raymond },
  { name: "Atty. Joseph Noel M. Estrada",               role: "Sr. Managing Partner, Estrada and Aquino Law Office",                img: joseph },
  { name: "Dr. Rhodora Angela F. Ferrer",           role: "Executive Director, PEAC",              img: rhodora },
];

const HIGHLIGHTS = [
  { label: "Opening Mass",             desc: "Celebrated at the UST Central Seminary Chapel, uniting all delegates in prayer." },
  { label: "Synodality Keynote",       desc: "A landmark address on walking together as a Church committed to education." },
  { label: "Commission Reports",       desc: "MaPSA, CHRMD, and Spirituality Commissions presented 2025 milestones." },
  { label: "Assembly Declaration",     desc: "A signed declaration committing member schools to the 2026 action agenda." },
  { label: "Delegates' Night",         desc: "Cultural performances, raffle prizes, and long-service school recognition." },
  { label: "3-Day Highlights Video",   desc: "Full recap video now available on the CEAP NCR Facebook page." },
];



/* ─── LIGHTBOX ───────────────────────────── */
function Lightbox({ images, activeIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="ga-lightbox" onClick={onClose}>
      <button className="ga-lightbox-close" onClick={onClose}><Icon.X /></button>
      <button className="ga-lightbox-prev" onClick={(e) => { e.stopPropagation(); onPrev(); }}><Icon.ChevronLeft /></button>
      <div className="ga-lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img src={images[activeIndex].src} alt={images[activeIndex].caption} />
        <p className="ga-lightbox-caption">{images[activeIndex].caption}</p>
      </div>
      <button className="ga-lightbox-next" onClick={(e) => { e.stopPropagation(); onNext(); }}><Icon.ChevronRight /></button>
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────── */
export default function GeneralAssemblyPage({ onBack, onNavigate, activeNav }) {
  const [scrolled, setScrolled]         = useState(false);
  const [activeDay, setActiveDay]       = useState(0);
  const [lightboxIdx, setLightboxIdx]   = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone]   = useState(false);
  const initialized = useRef(false);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll to top on mount
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  // GSAP animations — performance-optimized:
  // • force3D: true (compositor-only transforms)
  // • once: true on all ScrollTriggers (no re-trigger overhead)
  // • Shorter stagger values to reduce total animation time
  // • No scale animations (triggers layout recalc) except where truly needed
  // • will-change removed from CSS; GSAP manages it inline during animation only
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {

        // ── Hero content — staggered fade+slide on mount
        gsap.fromTo(".ga-hero-content > *",
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: "power3.out", force3D: true, delay: 0.1 }
        );

        // ── Generic section reveals — batch per section for fewer ScrollTriggers
        gsap.utils.toArray(".ga-reveal").forEach((el) => {
          gsap.fromTo(el,
            { y: 28, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65, ease: "power3.out", force3D: true,
              scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none", once: true } }
          );
        });

        // ── Highlight items — staggered from a single ScrollTrigger (cheaper)
        gsap.fromTo(".ga-highlight-item",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.07, ease: "power2.out", force3D: true,
            scrollTrigger: { trigger: ".ga-highlights-list", start: "top 85%", toggleActions: "play none none none", once: true } }
        );

        // ── Gallery — single batch trigger
        gsap.fromTo(".ga-gallery-item",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: "power3.out", force3D: true,
            scrollTrigger: { trigger: ".ga-gallery-grid", start: "top 83%", toggleActions: "play none none none", once: true } }
        );

        // ── Speaker cards — single batch trigger
        gsap.fromTo(".ga-speaker-card",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: "power3.out", force3D: true,
            scrollTrigger: { trigger: ".ga-speakers-grid", start: "top 84%", toggleActions: "play none none none", once: true } }
        );

      });

      // Reduced motion: instantly show everything
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.utils.toArray(
          ".ga-hero-content > *, .ga-reveal, .ga-gallery-item, .ga-speaker-card, .ga-highlight-item"
        ).forEach((el) => gsap.set(el, { opacity: 1, y: 0, x: 0 }));
      });

      return () => mm.revert();
    });

    return () => {
      ctx.revert(); // scoped — only kills this page's tweens & ScrollTriggers
      initialized.current = false;
    };
  }, []);

  // Program day tab — lightweight fade-in only (no x-slide, cheaper)
  useEffect(() => {
    const items = document.querySelectorAll(".ga-program-session");
    if (!items.length) return;
    gsap.fromTo(items,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: "power2.out", force3D: true }
    );
  }, [activeDay]);

  return (
    <div className="ga-page">
      {/* ── NAVBAR ── */}
      <Navbar
        activeLink={activeNav || "Events"}
        scrolled={scrolled}
        onNavigate={onNavigate}
      />

      {/* ── HERO ─────────────────────────────── */}
      <section className="ga-hero">
        <div className="ga-hero-bg" />
        <div className="ga-hero-orb ga-hero-orb-1" />
        <div className="ga-hero-orb ga-hero-orb-2" />

        <div className="ga-hero-inner">
          {/* <button className="ga-back-btn" onClick={onBack}>
            <Icon.ArrowLeft /> Back to Events
          </button> */}

          <div className="ga-hero-content">
            <span className="ga-hero-badge">General Assembly 2025</span>
            <h1 className="ga-hero-title">
              CEAP NCR<br /><em>General Assembly</em>
            </h1>
            <p className="ga-hero-theme">
              "Living Synodality as Pilgrims of Hope"
            </p>
            <p className="ga-hero-desc">
              The flagship three-day gathering of CEAP NCR member schools at the University of
              Santo Tomas — uniting Catholic educators, administrators, and school leaders from
              across Metro Manila.
            </p>
            <div className="ga-hero-meta">
              <span><Icon.Calendar /> July 29–31, 2025</span>
              <span><Icon.MapPin /> University of Santo Tomas, Manila</span>
              <span><Icon.Users /> 120+ Delegates</span>
            </div>
            {/* <div className="ga-hero-ctas">
              <a
                href="https://www.facebook.com/ceapncr"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Icon.Facebook /> Watch Highlights on Facebook
              </a>
            </div> */}
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────── */}
      {/* <div className="ga-stats">
        <div className="ga-stats-inner">
          {GA_STATS.map(({ value, label }) => (
            <div className="ga-stat" key={label}>
              <span className="ga-stat-value">{value}</span>
              <span className="ga-stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div> */}

      {/* ── ABOUT / OVERVIEW ─────────────────── */}
      <section className="ga-section">
        <div className="ga-section-inner">
          <div className="ga-overview-grid">
            <div>
              <p className="section-label">About the Assembly</p>
              <h2 className="section-title ga-reveal">A Landmark Gathering for Catholic Education</h2>
              <p className="section-body ga-reveal">
                The CEAP NCR General Assembly 2025 was a landmark three-day event held at the
                University of Santo Tomas, bringing together school heads, administrators, and
                Catholic educators from across the National Capital Region.
              </p>
              <p className="section-body ga-reveal" style={{ marginTop: "1rem" }}>
                Anchored on the theme <strong>"Living Synodality as Pilgrims of Hope,"</strong> the
                assembly featured plenary sessions, breakout discussions, commission reports, and a
                closing declaration renewing the commitment of member schools to Catholic education
                in Metro Manila.
              </p>
            </div>
            <div className="ga-overview-img ga-reveal">
              <img
                src={ga12}
                alt="General Assembly overview"
                loading="lazy"
                decoding="async"
              />
              <div className="ga-overview-img-badge">
                <Icon.Star />
                <span>UST, Espana Manila</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KEY HIGHLIGHTS ─────────────────────── */}
      <section className="ga-section ga-section--alt">
        <div className="ga-section-inner">
          <p className="section-label section-label--light ga-reveal">Assembly Moments</p>
          <h2 className="section-title section-title--light ga-reveal">Key Highlights</h2>
          <div className="ga-highlights-list">
            {HIGHLIGHTS.map(({ label, desc }) => (
              <div className="ga-highlight-item" key={label}>
                <div className="ga-highlight-dot" />
                <div>
                  <strong>{label}</strong>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAM ───────────────────────────── */}
      <section className="ga-section">
        <div className="ga-section-inner">
          <p className="section-label ga-reveal">3-Day Schedule</p>
          <h2 className="section-title ga-reveal">Assembly Program</h2>
          <p className="section-body ga-reveal" style={{ marginBottom: "2.5rem" }}>
            A full program spanning three days — from the opening Mass to the closing declaration
            and sending-forth blessing.
          </p>

          {/* Day Tabs */}
          <div className="ga-day-tabs">
            {PROGRAM_DAYS.map((d, i) => (
              <button
                key={d.day}
                className={`ga-day-tab ${activeDay === i ? "ga-day-tab--active" : ""}`}
                onClick={() => setActiveDay(i)}
                style={{ "--tab-color": d.color }}
              >
                <span className="ga-day-tab-day">{d.day}</span>
                <span className="ga-day-tab-theme">{d.theme}</span>
              </button>
            ))}
          </div>

          {/* Sessions */}
          <div className="ga-program-panel">
            <div className="ga-program-header">
              <h3>{PROGRAM_DAYS[activeDay].date}</h3>
              <span
                className="ga-program-theme-badge"
                style={{ background: PROGRAM_DAYS[activeDay].color }}
              >
                {PROGRAM_DAYS[activeDay].theme}
              </span>
            </div>
            <div className="ga-program-sessions">
              {PROGRAM_DAYS[activeDay].sessions.map((s, i) => (
                <div className="ga-program-session" key={i}>
                  <div className="ga-session-time">
                    <Icon.Clock />
                    {s.time}
                  </div>
                  <div className="ga-session-body">
                    <h4>{s.title}</h4>
                    {s.desc && <p>{s.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SPEAKERS ──────────────────────────── */}
      <section className="ga-section ga-section--navy">
        <div className="ga-section-inner">
          <p className="section-label section-label--light ga-reveal">Resource Persons</p>
          <h2 className="section-title section-title--light ga-reveal">Speakers &amp; Panelists</h2>
          <div className="ga-speakers-grid">
            {SPEAKERS.map((s) => (
              <div className="ga-speaker-card" key={s.name}>
                <div className="ga-speaker-img-wrap">
                  <img
                    src={s.img}
                    alt={s.name}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="ga-speaker-info">
                  <h4>{s.name}</h4>
                  <p>{s.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO SECTION ─────────────────────── */}
      <section className="ga-section">
        <div className="ga-section-inner">
          <p className="section-label ga-reveal">Official Recap</p>
          <h2 className="section-title ga-reveal">3-Day Highlights Video</h2>
          <p className="section-body ga-reveal">
            Watch the official three-day highlights video of the CEAP NCR General Assembly 2025,
            capturing the energy, talks, and fellowship of the entire event at UST. Available now
            on the CEAP NCR Facebook page.
          </p>

          <div className="ga-video-grid">
            {/* Main video */}
            <div className="ga-video-main ga-reveal">
              <div className="ga-video-thumb">
                <img
                  src={ga2}
                  alt="GA 2025 Highlights Video"
                  loading="lazy"
                  decoding="async"
                />
                <div className="ga-video-overlay">
                  <div className="ga-play-btn">
                    <Icon.Play />
                  </div>
                  <div className="ga-video-info">
                    <h3>3-Day Highlights — CEAP NCR General Assembly 2025</h3>
                    <p>Watch on Facebook · July 31, 2025</p>
                  </div>
                </div>
              </div>
              {/* <a
                href="https://www.facebook.com/ceapncr"
                target="_blank"
                rel="noopener noreferrer"
                className="ga-video-link"
              >
                <Icon.Facebook />
                Watch Full Video on CEAP NCR Facebook Page
                <Icon.ExternalLink />
              </a> */}
            </div>

            {/* Secondary clips */}
            <div className="ga-video-side">
              {[
                { title: "Opening Plenary Recap",      img: ga3, dur: "12:34" },
                { title: "Delegates' Night Highlights", img: ga4, dur: "8:15" },
                { title: "Closing Mass & Declaration",  img: ga5, dur: "15:02" },
              ].map((v) => (
                <div className="ga-video-clip ga-reveal" key={v.title}>
                  <div className="ga-video-clip-thumb">
                    <img src={v.img} alt={v.title} loading="lazy" decoding="async" />
                    <div className="ga-video-clip-play"><Icon.Play /></div>
                    <span className="ga-video-clip-dur">{v.dur}</span>
                  </div>
                  <div className="ga-video-clip-info">
                    <h4>{v.title}</h4>
                    <p><Icon.Facebook /> CEAP NCR Facebook</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ───────────────────────────── */}
      <section className="ga-section ga-section--surface">
        <div className="ga-section-inner">
          <p className="section-label ga-reveal">Photo Documentation</p>
          <h2 className="section-title ga-reveal">Assembly Gallery</h2>
          <p className="section-body ga-reveal" style={{ marginBottom: "2.5rem" }}>
            A visual chronicle of the CEAP NCR General Assembly 2025 — three days of synodality,
            community, and hope at the University of Santo Tomas.
          </p>

          <div className="ga-gallery-grid">
            {GALLERY_IMAGES.map((img, i) => (
              <button
                className={`ga-gallery-item ${i === 0 ? "ga-gallery-item--wide" : ""}`}
                key={img.id}
                onClick={() => setLightboxIdx(i)}
                aria-label={`View photo: ${img.caption}`}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  decoding="async"
                />
                <div className="ga-gallery-item-overlay">
                  <span>{img.caption}</span>
                </div>
              </button>
            ))}
          </div>

          {/* <p className="ga-gallery-note ga-reveal">
            Photos shown are illustrative. Official photo documentation will be made available through
            the CEAP NCR Facebook page and official channels.
          </p> */}
        </div>
      </section>

      {/* ── CTA FOOTER BAR ────────────────────── */}
      {/* <section className="ga-cta-bar">
        <div className="ga-cta-inner">
          <div>
            <h2>Watch the Full Assembly Recap</h2>
            <p>The official 3-Day Highlights video is available now on the CEAP NCR Facebook page.</p>
          </div>
          <div className="ga-cta-buttons">
            <a
              href="https://www.facebook.com/ceapncr"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Icon.Facebook /> Watch on Facebook
            </a>
            <button className="btn-outline" onClick={onBack}>
              ← Back to Events
            </button>
          </div>
        </div>
      </section> */}

      {/* ── FOOTER ───────────────────────────── */}
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
                Championing Catholic education in the National Capital Region since 1990 — uniting
                schools in faith, service, and academic excellence.
              </p>
              <div className="footer-socials">
                {[
                  { I: Icon.Facebook, label: "Facebook", href: "https://www.facebook.com/ceapncrPH/" },
                  { I: Icon.Youtube,  label: "YouTube",  href: "https://www.youtube.com/@ceapncrph6072" },
                ].map(({ I, label, href }) => (
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
                    <button
                      style={{ background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}
                      className="footer-col-link-btn"
                      onClick={() => {
                        if (l === "General Assembly") return;
                        if (l === "Events") { onNavigate?.("Events"); return; }
                        onNavigate?.(l);
                      }}
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <h5>Contact Us</h5>
              <ul className="ga-footer-contact-list">
                <li>
                  <span className="ga-footer-contact-icon"><Icon.MapPin /></span>
                  <span>6th Flr. St. John Building 1521 Paz St.<br />Paco, Manila 1007</span>
                </li>
                <li>
                  <span className="ga-footer-contact-icon"><Icon.Phone /></span>
                  <span>(02) 8 564-3712 to 13</span>
                </li>
                <li>
                  <span className="ga-footer-contact-icon"><Icon.Mail /></span>
                  <span>info@ceapncr.org.ph</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer-col">
              <h5>Stay Updated</h5>
              <p className="ga-footer-nl-desc">Get the latest events, programs, and announcements delivered to your inbox.</p>
              {newsletterDone ? (
                <p className="ga-footer-nl-thanks">✦ Thank you for subscribing!</p>
              ) : (
                <form
                  className="ga-footer-nl-form"
                  onSubmit={(e) => { e.preventDefault(); setNewsletterDone(true); setNewsletterEmail(""); }}
                >
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    aria-label="Email for newsletter"
                  />
                  <button type="submit"><Icon.Send /> Subscribe</button>
                </form>
              )}
            </div>

          </div>

          <div className="footer-bottom">
            <p>Developed By: Sean Morales</p>
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

      {/* ── LIGHTBOX ──────────────────────────── */}
      {lightboxIdx !== null && (
        <Lightbox
          images={GALLERY_IMAGES}
          activeIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx((i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)}
          onNext={() => setLightboxIdx((i) => (i + 1) % GALLERY_IMAGES.length)}
        />
      )}
    </div>
  );
}