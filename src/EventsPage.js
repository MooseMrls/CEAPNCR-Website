import { useState, useEffect, useRef, useCallback } from "react";
import "./EventsPage.css";
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
import edsa from "./images/edsa.jpg";
import shs from "./images/shs.jpg";
import guidance from "./images/guidance.jpg";
import cyber from "./images/cyber.jpg";
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
  ArrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  Calendar: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  Clock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  MapPin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  Play: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="1.5"/>
      <polygon points="10 8 16 12 10 16 10 8" fill="white"/>
    </svg>
  ),
  ExternalLink: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  ),
  Tag: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
      <line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  ),
  Star: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  Images: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  ),
  Linkedin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  Youtube: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 16.92z"/>
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
};

/* ─────────────────────────────────────────
   NAV LINKS
───────────────────────────────────────── */
const NAV_LINKS = ["Home", "About", "Member Schools", "Events", "General Assembly", "Contact"];

/* ─────────────────────────────────────────
   REAL 2025 CEAP NCR EVENTS & IMAGES
   ─────────────────────────────────────────
   HOW TO USE YOUR FACEBOOK PHOTOS:
   Replace any placeholder URL below with the actual
   image URL from the CEAP NCR Facebook posts.
   Right-click any FB photo → "Open image in new tab"
   → copy that URL and paste it here.
───────────────────────────────────────── */

// ── GA 2025 real photos (replace with actual FB CDN URLs) ──
// To get: go to the FB post → click each photo → right-click → copy image URL
const GA_PHOTOS = [
  ga12,
  ga1,
  ga2,
  ga3,
  ga4,
  ga5,
  ga6,
  ga7,
  ga8,
  ga10,
  ga11
];

// ── Other 2025 event photos ──
const EVENT_PHOTOS = {
  peoplePower:    edsa,
  seminarWorkshop:"https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&h=480&q=80",
  gaHighlights:   ga9,
  nationalConv:   shs,
  paascu:         guidance,
  formation:      cyber,
};

/* ─────────────────────────────────────────
   GENERAL ASSEMBLY DATA
───────────────────────────────────────── */
const GENERAL_ASSEMBLY = {
  id: "ga2025",
  date: "July 29–31, 2025",
  title: "CEAP NCR General Assembly 2025",
  year: "2025",
  isHighlight: true,
  location: "University of Santo Tomas, Espana, Manila",
  time: "3-Day Event",
  img: GA_PHOTOS[0],
  desc: "The flagship three-day gathering of CEAP NCR member schools at the University of Santo Tomas — uniting Catholic educators, administrators, and school leaders from across Metro Manila under the theme 'Living Synodality as Pilgrims of Hope.'",
  fullDesc: "The CEAP NCR General Assembly 2025 was a landmark three-day event held at the University of Santo Tomas, bringing together school heads, administrators, and Catholic educators from across the National Capital Region. Anchored on the theme 'Living Synodality as Pilgrims of Hope,' the assembly featured opening Mass, plenary sessions with key speakers, breakout discussions, and a Spirit-filled community celebration. The 3-Day Highlights video is available on the CEAP NCR Facebook page.",
  fbPostUrl: "https://www.facebook.com/ceapncrPH/posts/-highlights-ceap-ncr-general-assembly-2025-university-of-santo-tomas-july-29-202/1237441708410742/",
  fbVideoUrl: "https://www.facebook.com/ceapncrPH/videos/-watch-the-3-day-highlights-of-the-ceap-ncr-general-assembly-2025-experience-the/633169446492175/",
  photos: GA_PHOTOS,
};

/* ─────────────────────────────────────────
   ALL EVENTS
───────────────────────────────────────── */
const ALL_EVENTS = [
  GENERAL_ASSEMBLY,
  {
    id: "pp2025",
    date: "February 25, 2025",
    title: "People Power Revolution Commemoration",
    year: "2025",
    img: EVENT_PHOTOS.peoplePower,
    location: "Member Schools Region-Wide",
    time: "Full Day (Non-Academic)",
    desc: "CEAP NCR strongly encouraged all member schools to observe February 25 as a non-academic day in honor of the EDSA People Power Revolution 39th anniversary.",
    fullDesc: "CEAP NCR officially recommended that all member institutions designate February 25, 2025 as a non-academic, non-working day to commemorate the 39th anniversary of the EDSA People Power Revolution. The recommendation urged schools to use the occasion to foster patriotism and civic responsibility among young people, highlighting the enduring significance of democracy and freedom in Philippine history.",
    fbPostUrl: "https://www.facebook.com/ceapncrPH/",
  },
  // {
  //   id: "mapsa2025",
  //   date: "March–April 2025",
  //   title: "MaPSA CHRMD Seminar-Workshop on Inclusive Education",
  //   tag: "Formation",
  //   img: EVENT_PHOTOS.seminarWorkshop,
  //   location: "Metro Manila (CEAP NCR Venues)",
  //   time: "Multiple Sessions",
  //   desc: "Seminar-Workshop: 'Inclusion, Mainstreaming & Accommodation: Upholding RA 11650 in Catholic Schools,' organized by MaPSA CHRMD under CEAP NCR.",
  //   fullDesc: "Organized by the MaPSA CHRMD Commission under CEAP NCR, this seminar-workshop focused on empowering Catholic school human resource and management professionals in upholding Republic Act 11650, the Inclusive Education Act. Participants explored practical approaches to inclusion, mainstreaming, and accommodation for learners with special needs within the Catholic school context.",
  //   fbPostUrl: "https://www.facebook.com/ceapncrPH/",
  // },
  // {
  //   id: "gav2025",
  //   date: "July 29–31, 2025",
  //   title: "CEAP NCR General Assembly — 3-Day Highlights Video",
  //   tag: "General Assembly",
  //   img: EVENT_PHOTOS.gaHighlights,
  //   location: "University of Santo Tomas, Manila",
  //   time: "Watch on Facebook",
  //   desc: "Watch the official 3-Day Highlights video capturing the energy, talks, and fellowship of the CEAP NCR General Assembly 2025 at UST.",
  //   fullDesc: "CEAP NCR released the official 3-Day Highlights video of the General Assembly 2025 on their Facebook page. The video captures the full experience — from the opening Mass and keynote plenary sessions to breakout workshops and the closing program. Member schools and the broader Catholic education community are invited to view and share on the CEAP NCR Facebook page.",
  //   fbVideoUrl: "https://www.facebook.com/ceapncrPH/videos/-watch-the-3-day-highlights-of-the-ceap-ncr-general-assembly-2025-experience-the/633169446492175/",
  //   fbPostUrl: "https://www.facebook.com/ceapncrPH/",
  // },
  {
    id: "natconv2025",
    date: "January 29",
    title: "Strengthened Senior High School Benchmarking Program",
    year: "2026",
    img: EVENT_PHOTOS.nationalConv,
    location: "Cainta Catholic College, Cainta Rizal",
    time: "8:00 am - 5:00 pm",
    desc: "In collaboration with Quipper Philippines, CEAP NCR invites member schools to join the Strengthened Senior High School Benchmarking Program, hosted by Cainta Catholic College.",
    fullDesc: "In collaboration with Quipper Philippines, CEAP NCR invites member schools to join the Strengthened Senior High School Benchmarking Program, hosted by Cainta Catholic College.",
    fbPostUrl: "https://www.facebook.com/ceapncrPH/",
  },
  {
    id: "paascu2025",
    date: "June 26 -27 2025",
    title: "Guidance and Counseling Committee 2nd General Assembly.",
    year: "2025",
    img: EVENT_PHOTOS.paascu,
    location: "Albacina Hall, Lourdes School of Mandaluyong ",
    time: "9:00 AM – 3:00 PM",
    desc: "The Guidance and Counseling Committee of CEAP NCR held its 2nd General Assembly on June 26-27, 2025, at Albacina Hall, Lourdes School of Mandaluyong. The event gathered guidance counselors and student formation teams from member schools for a series of workshops and discussions focused on enhancing guidance services within the Catholic education network.",
    fullDesc: "The Guidance and Counseling Committee of CEAP NCR held its 2nd General Assembly on June 26-27, 2025, at Albacina Hall, Lourdes School of Mandaluyong. The event gathered guidance counselors and student formation teams from member schools for a series of workshops and discussions focused on enhancing guidance services within the Catholic education network.",
    fbPostUrl: "https://www.facebook.com/ceapncrPH/",
  },
  {
    id: "formation2025",
    date: "June 11, 2025",
    title: "Cybersecurity and Data Privacy",
    year: "2025",
    img: EVENT_PHOTOS.formation,
    location: "ESI Conference Room, Miriam College, Quezon City",
    time: "8:00 AM - 5:00 PM",
    desc: "The Commission on Formation and Values Education of CEAP NCR conducted a seminar-workshop on Cybersecurity and Data Privacy on June 11, 2025, at the ESI Conference Room, Miriam College, Quezon City. The session equipped school administrators, IT personnel, and formation teams with essential knowledge and strategies to safeguard digital assets and ensure compliance with data privacy regulations in the educational setting.",
    fullDesc: "The Commission on Formation and Values Education of CEAP NCR conducted a seminar-workshop on Cybersecurity and Data Privacy on June 11, 2025, at the ESI Conference Room, Miriam College, Quezon City. The session equipped school administrators, IT personnel, and formation teams with essential knowledge and strategies to safeguard digital assets and ensure compliance with data privacy regulations in the educational setting.",
    fbPostUrl: "https://www.facebook.com/ceapncrPH/",
  },
];

const EVENT_YEARS = ["All", "2026", "2025", "2024"];

/* ─────────────────────────────────────────
   GSAP SCROLL ANIMATIONS HOOK
───────────────────────────────────────── */
function useScrollAnimations() {
  useEffect(() => {
    // Use a scoped GSAP context so we only kill OUR triggers on cleanup,
    // not the ones belonging to App.js or GeneralAssemblyPage.
    const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {

      /* ── 1. Hero — staggered fade up on mount ── */
      const heroEls = gsap.utils.toArray(".ep-hero .ep-reveal");
      if (heroEls.length) {
        gsap.fromTo(heroEls,
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.14, ease: "power3.out", delay: 0.2 }
        );
      }

      /* ── 2. Section labels — slide in from left ── */
      gsap.utils.toArray(".ep-section-label:not(.ep-hero .ep-section-label)").forEach((el) => {
        gsap.fromTo(el,
          { x: -30, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          }
        );
      });

      /* ── 3. GA Highlight — split left/right ── */
      const gaText   = document.querySelector(".ep-ga-text");
      const gaPhotos = document.querySelector(".ep-ga-photos");
      if (gaText) {
        gsap.fromTo(gaText,
          { x: -50, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: ".ep-ga-inner", start: "top 80%", toggleActions: "play none none none" },
          }
        );
      }
      if (gaPhotos) {
        gsap.fromTo(gaPhotos,
          { x: 50, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.15,
            scrollTrigger: { trigger: ".ep-ga-inner", start: "top 80%", toggleActions: "play none none none" },
          }
        );
      }

      /* ── 4. Controls bar — fade down ── */
      const controls = document.querySelector(".ep-controls");
      if (controls) {
        gsap.fromTo(controls,
          { y: -20, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: controls, start: "top 90%", toggleActions: "play none none none" },
          }
        );
      }

      /* ── 5. Event cards — cascade up with stagger ── */
      const eventCards = gsap.utils.toArray(".ep-event-card");
      if (eventCards.length) {
        gsap.fromTo(eventCards,
          { y: 55, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
            scrollTrigger: { trigger: ".ep-grid-section", start: "top 82%", toggleActions: "play none none none" },
          }
        );
      }

      /* ── 6. Footer — staggered fade up ── */
      const footerBrand = document.querySelector(".ep-root .footer-brand");
      const footerCols  = gsap.utils.toArray(".ep-root .footer-col");
      if (footerBrand) {
        gsap.fromTo(footerBrand,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: ".ep-root footer", start: "top 90%", toggleActions: "play none none none" },
          }
        );
      }
      if (footerCols.length) {
        gsap.fromTo(footerCols,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out", delay: 0.1,
            scrollTrigger: { trigger: ".ep-root footer", start: "top 90%", toggleActions: "play none none none" },
          }
        );
      }

    });

    /* ── Reduced-motion: show everything immediately ── */
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.utils.toArray(".ep-reveal, .ep-event-card, .ep-ga-text, .ep-ga-photos, .ep-controls, .footer-brand, .footer-col").forEach((el) => {
        gsap.set(el, { opacity: 1, y: 0, x: 0 });
      });
    });
    }); // end gsap.context

    return () => {
      ctx.revert(); // only kills THIS page's tweens & ScrollTriggers
    };
  }, []); // mount only
}

/* ─────────────────────────────────────────
   GA PHOTO GALLERY LIGHTBOX
───────────────────────────────────────── */
function Lightbox({ photos, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % photos.length);
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [photos.length, onClose]);

  return (
    <div className="ep-lightbox" onClick={onClose}>
      <button className="ep-lightbox__close" onClick={onClose}>✕</button>
      <div className="ep-lightbox__content" onClick={(e) => e.stopPropagation()}>
        <button className="ep-lightbox__nav ep-lightbox__nav--prev" onClick={() => setCurrent((c) => (c - 1 + photos.length) % photos.length)}>
          <Icon.ArrowLeft />
        </button>
        <img src={photos[current]} alt={`Gallery item ${current + 1}`} className="ep-lightbox__img" />
        <button className="ep-lightbox__nav ep-lightbox__nav--next" onClick={() => setCurrent((c) => (c + 1) % photos.length)}>
          <Icon.ArrowRight />
        </button>
        <div className="ep-lightbox__counter">{current + 1} / {photos.length}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   GA HIGHLIGHT BANNER
───────────────────────────────────────── */
function GAHighlight({ ga }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxStart, setLightboxStart] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(null);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef(null);

  const goToSlide = (i) => {
    if (animating || i === activeSlide) return;
    setPrevSlide(activeSlide);
    setAnimating(true);
    setActiveSlide(i);
    setTimeout(() => { setPrevSlide(null); setAnimating(false); }, 600);
  };

  const startAuto = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveSlide((c) => {
        const next = (c + 1) % ga.photos.length;
        setPrevSlide(c);
        setAnimating(true);
        setTimeout(() => { setPrevSlide(null); setAnimating(false); }, 600);
        return next;
      });
    }, 3200);
  }, [ga.photos.length]);

  useEffect(() => {
    startAuto();
    return () => clearInterval(intervalRef.current);
  }, [startAuto]);

  const openLightbox = (i) => { setLightboxStart(i); setLightboxOpen(true); };

  return (
    <>
      <section className="ep-ga-section">
        <div className="ep-ga-section__bg" />
        <div className="ep-ga-section__orb ep-ga-section__orb--1" />
        <div className="ep-ga-section__orb ep-ga-section__orb--2" />

        <div className="ep-ga-inner">
          {/* Badge row */}
          <div className="ep-ga-badges">
            <span className="ep-ga-featured-badge">
              <Icon.Star /> 2025 Highlight Event
            </span>
            <span className="ep-ga-tag-pill">{ga.year}</span>
          </div>

          <div className="ep-ga-layout">
            {/* Left: text */}
            <div className="ep-ga-text ep-reveal">
              <h2 className="ep-ga-title">CEAP NCR General Assembly 2025</h2>
              <div className="ep-ga-meta">
                <span><Icon.Calendar /> {ga.date}</span>
                <span className="ep-ga-meta-sep">·</span>
                <span><Icon.Clock /> {ga.time}</span>
              </div>
              <div className="ep-ga-location">
                <Icon.MapPin /> {ga.location}
              </div>
              <div className="ep-ga-theme-pill">
                Theme: <em>"Living Synodality as Pilgrims of Hope"</em>
              </div>
              <p className="ep-ga-desc">{ga.fullDesc}</p>
              <div className="ep-ga-actions">
                <a href={ga.fbVideoUrl} target="_blank" rel="noopener noreferrer" className="ep-btn-primary">
                  <Icon.Play /> Watch 3-Day Highlights
                </a>
                {/* <a href={ga.fbPostUrl} target="_blank" rel="noopener noreferrer" className="ep-btn-ghost">
                  <Icon.Facebook /> View on Facebook
                </a> */}
              </div>
            </div>

            {/* Right: slideshow */}
            <div className="ep-ga-photos ep-reveal ep-reveal--delay-2">
              <div
                className="ep-ga-slideshow"
                onMouseEnter={() => clearInterval(intervalRef.current)}
                onMouseLeave={startAuto}
              >
                {/* Slides */}
                {ga.photos.map((src, i) => (
                  <button
                    key={i}
                    className={`ep-ga-slide ${i === activeSlide ? "ep-ga-slide--active" : ""} ${i === prevSlide ? "ep-ga-slide--prev" : ""}`}
                    onClick={() => openLightbox(i)}
                    tabIndex={i === activeSlide ? 0 : -1}
                    aria-hidden={i !== activeSlide}
                  >
                    <img src={src} alt={`General Assembly 2025 – slide ${i + 1}`} />
                    <div className="ep-ga-photo__overlay">
                      <Icon.Images /> View Gallery
                    </div>
                  </button>
                ))}

                {/* Prev / Next arrows */}
                <button className="ep-ga-slide-nav ep-ga-slide-nav--prev" onClick={() => { goToSlide((activeSlide - 1 + ga.photos.length) % ga.photos.length); startAuto(); }} aria-label="Previous photo">
                  <Icon.ArrowLeft />
                </button>
                <button className="ep-ga-slide-nav ep-ga-slide-nav--next" onClick={() => { goToSlide((activeSlide + 1) % ga.photos.length); startAuto(); }} aria-label="Next photo">
                  <Icon.ArrowRight />
                </button>

                {/* Dot indicators */}
                <div className="ep-ga-dots">
                  {ga.photos.map((_, i) => (
                    <button
                      key={i}
                      className={`ep-ga-dot ${i === activeSlide ? "ep-ga-dot--active" : ""}`}
                      onClick={() => { goToSlide(i); startAuto(); }}
                      aria-label={`Go to photo ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {lightboxOpen && (
        <Lightbox photos={ga.photos} startIndex={lightboxStart} onClose={() => setLightboxOpen(false)} />
      )}
    </>
  );
}

/* ─────────────────────────────────────────
   EVENT CARD
───────────────────────────────────────── */
function EventCard({ ev, index }) {
  return (
    <article className={`ep-event-card ep-reveal ep-reveal--delay-${(index % 3) + 1}${ev.isHighlight ? " ep-event-card--featured" : ""}`}>
      <div className="ep-event-card__img-wrap">
        <img src={ev.img} alt={ev.title} loading="lazy" onError={(e) => { e.target.parentElement.style.background = "var(--surface)"; e.target.style.display = "none"; }} />
        <span className={`ep-event-card__tag${ev.isHighlight ? " ep-event-card__tag--gold" : ""}`}>{ev.year}</span>
        {ev.isHighlight && <span className="ep-event-card__star"><Icon.Star /> Featured</span>}
      </div>
      <div className="ep-event-card__body">
        <div className="ep-event-card__meta">
          <span><Icon.Calendar /> {ev.date}</span>
          <span><Icon.Clock /> {ev.time}</span>
        </div>
        <h3 className="ep-event-card__title">{ev.title}</h3>
        <p className="ep-event-card__location"><Icon.MapPin /> {ev.location}</p>
        <p className="ep-event-card__desc">{ev.fullDesc}</p>
        <div className="ep-event-card__footer">
          {ev.fbVideoUrl && (
            <a href={ev.fbVideoUrl} target="_blank" rel="noopener noreferrer" className="ep-event-card__cta ep-event-card__cta--video">
              <Icon.Play /> Watch Video
            </a>
          )}
          <a href={ev.fbPostUrl || "https://www.facebook.com/ceapncrPH/"} target="_blank" rel="noopener noreferrer" className={`ep-event-card__cta${ev.fbVideoUrl ? " ep-event-card__cta--ghost" : ""}`}>
            <Icon.ExternalLink /> View Post
          </a>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────
   MAIN EVENTS PAGE EXPORT
───────────────────────────────────────── */
export default function EventsPage({ onBack, onViewGA, onNavigate }) {
  const [activeYear, setActiveYear] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [activeNav, setActiveNav] = useState("Events");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);

  useScrollAnimations();

  // Re-animate event cards when search or year filter changes
  useEffect(() => {
    const cards = gsap.utils.toArray(".ep-event-card");
    if (!cards.length) return;
    gsap.fromTo(
      cards,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" }
    );
  }, [activeYear, searchQuery]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  const handleNavigate = (link) => {
    if (onNavigate) {
      onNavigate(link);
    } else {
      if (link === "Events") return;
      if (link === "General Assembly") { onViewGA?.(); return; }
      onBack?.(link.toLowerCase().replace(/ /g, "-"));
    }
  };

  const filtered = ALL_EVENTS.filter((e) => {
    const matchYear = activeYear === "All" || e.year === activeYear;
    const matchSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.year && e.year.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchYear && matchSearch;
  });

  const nonGAEvents = filtered.filter((e) => e.id !== "ga2025");

  return (
    <div className="ep-root">

      {/* ── NAVBAR ─────────────────────────────── */}
      <Navbar activeLink={activeNav} onNavigate={handleNavigate} />

      {/* ── PAGE HERO ────────────────────────── */}
      <header className="ep-hero">
        <div className="ep-hero__overlay" />
        <div className="ep-hero__orb ep-hero__orb--1" />
        <div className="ep-hero__orb ep-hero__orb--2" />
        <div className="ep-hero__grid" />
        <div className="ep-hero__content">
          <h1 className="ep-hero__title ep-reveal ep-reveal--delay-1">
            Events &amp; <em>Announcements</em>
          </h1>
          <p className="ep-hero__sub ep-reveal ep-reveal--delay-2">
            Stay informed on the latest gatherings, summits, seminars, and celebrations
            shaping Catholic education across Metro Manila.
          </p>
          <div className="ep-hero__pills ep-reveal ep-reveal--delay-3">
            <span>✦ General Assembly 2025</span>
            <span>✦ Living Synodality</span>
            <span>✦ Pilgrims of Hope</span>
          </div>
        </div>
      </header>

      {/* ── GA HIGHLIGHT ─────────────────────── */}
      <GAHighlight ga={GENERAL_ASSEMBLY} />

      {/* ── CONTROLS ─────────────────────────── */}
      <div className="ep-controls">
        <div className="ep-controls__inner">
          <div className="ep-search-wrap">
            <Icon.Search />
            <input
              type="text"
              placeholder="Search events…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ep-search-input"
              aria-label="Search events"
            />
          </div>
          <div className="ep-tag-filters" role="group" aria-label="Filter by year">
            {EVENT_YEARS.map((year) => (
              <button
                key={year}
                className={`ep-filter-btn ${activeYear === year ? "ep-filter-btn--active" : ""}`}
                onClick={() => setActiveYear(year)}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── EVENTS GRID ──────────────────────── */}
      <main className="ep-grid-section">
        <div className="ep-grid-section__inner">

          {nonGAEvents.length === 0 ? (
            <div className="ep-empty">
              <Icon.Calendar />
              <p>No events match your search. Try a different keyword or category.</p>
            </div>
          ) : (
            nonGAEvents.map((ev, i) => <EventCard key={ev.id} ev={ev} index={i + 1} />)
          )}
        </div>
      </main>

      {/* ── FOOTER CTA ───────────────────────── */}
      {/* <div className="ep-footer-cta">
        <div className="ep-footer-cta__inner ep-reveal">
          <p className="ep-section-label ep-section-label--light">Stay Connected</p>
          <h3 className="ep-footer-cta__title">Can't find what you're looking for?</h3>
          <p className="ep-footer-cta__sub">
            Reach out to our secretariat for the latest event schedules and registration details, or follow us on Facebook for real-time updates.
          </p>
          <div className="ep-footer-cta__actions">
            <button className="ep-btn-primary" onClick={() => onBack && onBack("contact")}>Contact Secretariat</button>
            <a href="https://www.facebook.com/ceapncrPH/" target="_blank" rel="noopener noreferrer" className="ep-btn-ghost">
              <Icon.Facebook /> Follow on Facebook
            </a>
          </div>
        </div>
      </div> */}

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
                Championing Catholic education in the National Capital Region since 1941 — uniting
                schools in faith, service, and academic excellence.
              </p>
              <div className="footer-socials">
                {[
                  { I: Icon.Facebook, label: "Facebook", href: "https://www.facebook.com/ceapncrPH/" },
                //   { I: Icon.Linkedin, label: "LinkedIn",  href: "#" },
                  { I: Icon.Youtube,  label: "YouTube",   href: "https://www.youtube.com/@ceapncrph6072" },
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
                        if (l === "General Assembly") { onViewGA?.(); return; }
                        onBack && onBack(l.toLowerCase().replace(/ /g, "-"));
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
              <ul className="ep-footer-contact-list">
                <li>
                  <span className="ep-footer-contact-icon"><Icon.MapPin /></span>
                  <span>6th Flr. St. John Building 1521 Paz St.<br />Paco, Manila 1007</span>
                </li>
                <li>
                  <span className="ep-footer-contact-icon"><Icon.Phone /></span>
                  <span>(02) 8 564-3712 to 13</span>
                </li>
                <li>
                  <span className="ep-footer-contact-icon"><Icon.Mail /></span>
                  <span>info@ceapncr.org.ph</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer-col">
              <h5>Stay Updated</h5>
              <p className="ep-footer-nl-desc">Get the latest events, programs, and announcements delivered to your inbox.</p>
              {newsletterDone ? (
                <p className="ep-footer-newsletter__thanks">✦ Thank you for subscribing!</p>
              ) : (
                <form className="ep-footer-nl-form" onSubmit={(e) => { e.preventDefault(); setNewsletterDone(true); setNewsletterEmail(""); }}>
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