import { useState, useEffect } from "react";
import "./App.css";
import logo from "./images/logo.png";
import edsa from "./images/edsa.jpg";
import ga12 from "./images/ga12.jpg";
import EventsPage from "./EventsPage";
import GeneralAssemblyPage from "./GeneralAssemblyPage";
import MemberSchoolsPage from "./MemberSchoolsPage";
import AboutPage from "./AboutPage";
import Navbar from "./Navbar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

/* ─────────────────────────────────────────
   EMAILJS CREDENTIALS
   Replace these with your actual values from
   https://dashboard.emailjs.com
───────────────────────────────────────── */
const EJ_SERVICE_ID       = "service_xnyzegr";        // e.g. "service_abc123"
const EJ_CONTACT_TEMPLATE = "template_0ta5yrj"; // e.g. "template_abc123"
const EJ_NEWSLETTER_TEMPLATE = "YOUR_NEWSLETTER_TEMPLATE_ID"; // e.g. "template_xyz456"
const EJ_PUBLIC_KEY       = "HECJM-eRsITMpWKj5";         // Account → API Keys

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────── */
const Icon = {
  GraduationCap: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  Award: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  Heart: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Lightbulb: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/>
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
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
  Clock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Calendar: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  ArrowLeft: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  ),
  CheckCircle: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
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
  Search: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Tag: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
      <line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  ),
  Image: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  ),
  Send: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
};

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const NAV_LINKS = ["Home", "About", "Events", "General Assembly", "Member Schools", "Contact"];

const MEMBER_SCHOOLS = [
  { name: "De La Salle Santiago Zobel School", location: "Muntinlupa City",},
  { name: "Ateneo de Manila University",       location: "Quezon City",},
  { name: "San Beda University",               location: "Manila",},
  { name: "Lourdes School of Mandaluyong",     location: "Mandaluyong City",},
  { name: "Xavier School",                     location: "San Juan City",},
  { name: "Assumption College",                location: "Makati City",},
  { name: "Holy Spirit of Novaliches",         location: "Quezon City",},
  { name: "St. Paul College of Pasig",         location: "Pasig City",},
  { name: "Don Bosco Technical College",       location: "Mandaluyong City",},
  { name: "Miriam College",                    location: "Quezon City",},
  { name: "Poveda Learning Center",            location: "Quezon City",},
  { name: "La Salle Greenhills",               location: "Mandaluyong City",},
];

/* Unsplash photo IDs mapped to plausible catholic-education themes */
const EVENT_IMAGE_IDS = [
  "photo-1540575467063-178a50c2df87", // conference / auditorium
  "photo-1524178232363-1fb2b075b655", // seminar / classroom
  "photo-1523050854058-8df90110c9f1", // graduation / campus
  "photo-1509062522246-3755977927d7", // leadership / panel
  "photo-1427504494785-3a9ca7044f45", // outreach / community
  "photo-1488190211105-8b0e65b80b4e", // writing / workshop
  "photo-1532619675605-1ede6c2ed2b0", // congress / hall
  "photo-1577896851231-70ef18881754", // formation / retreat
  "photo-1503676260728-1c00da094a0b", // education / study
];

/* ── GENERAL ASSEMBLY 2025 (Featured Highlight) ── */
const GENERAL_ASSEMBLY = {
  date: "July 29–31, 2025",
  title: "CEAP NCR General Assembly 2025",
  tag: "General Assembly",
  highlight: true,
  location: "University of Santo Tomas, Espana, Manila",
  time: "3 Days",
  img: ga12,
  desc: "The flagship three-day gathering of CEAP NCR member schools at the University of Santo Tomas — uniting Catholic educators, administrators, and school leaders from across Metro Manila.",
  fullDesc: "The CEAP NCR General Assembly 2025 was a landmark three-day event held at the University of Santo Tomas, bringing together school heads, administrators, and Catholic educators from across the National Capital Region. Anchored on the theme 'Living Synodality as Pilgrims of Hope,' the assembly featured plenary sessions, breakout discussions, and a highlight video capturing the energy and spirit of the entire event. Watch the 3-Day Highlights video on the CEAP NCR Facebook page for the full experience.",
  gallery: [
    EVENT_IMAGE_IDS[0],
    EVENT_IMAGE_IDS[1],
    EVENT_IMAGE_IDS[3],
    EVENT_IMAGE_IDS[7],
  ],
};

const ALL_EVENTS = [
  GENERAL_ASSEMBLY,
  {
    date: "February 25, 2025",
    title: "People Power Revolution Commemoration",
    desc: "CEAP NCR strongly encourages all member schools to observe February 25 as a non-academic day in honor of the EDSA People Power Revolution anniversary.",
    img: edsa,
    location: "Member Schools Region-Wide",
    time: "School Day",
    fullDesc: "CEAP NCR officially recommended that all member institutions designate February 25, 2025 as a non-academic, non-working day to commemorate the 39th anniversary of the EDSA People Power Revolution. The recommendation urged schools to use the occasion to foster patriotism and civic responsibility among young people, highlighting the enduring significance of democracy and freedom in Philippine history.",
  },
  {
    date: "March–April 2025",
    title: "Strengthening Systems for a Seamless Strengthened Senior High School Full Implementation",
    desc: "Seminar-Workshop on Inclusive Education: this workshop is designed to provide you with the tools and strategies needed for success.",
    img: EVENT_IMAGE_IDS[1],
    location: "Metro Manila (CEAP NCR Venues)",
    time: "TBA",
    fullDesc: "Organized by the MaPSA CHRMD Commission under CEAP NCR, this seminar-workshop focused on empowering Catholic school human resource and management professionals in upholding Republic Act 11650, the Inclusive Education Act. Participants explored practical approaches to inclusion, mainstreaming, and accommodation for learners with special needs within the Catholic school context.",
  },
  {
    date: "July 29–31, 2025",
    title: "3-Day CEAP NCR General Assembly Highlights Video",
    desc: "Watch the official 3-Day Highlights video of the CEAP NCR General Assembly 2025, capturing the energy, talks, and fellowship of the entire event at UST.",
    img: EVENT_IMAGE_IDS[7],
    location: "University of Santo Tomas, Manila",
    time: "See Facebook Page",
    fullDesc: "CEAP NCR released the official 3-Day Highlights video of the General Assembly 2025 on their Facebook page. The video captures the full experience of the three-day gathering — from the opening Mass and keynote plenary sessions to the breakout workshops and closing program. Member schools and the broader Catholic education community are invited to view and share the highlights on the CEAP NCR Facebook page.",
  },
  {
    date: "September 30 – October 3, 2025",
    title: "CEAP National Convention 2025",
    desc: "The national gathering of Catholic educational institutions across the Philippines, held at SMX Convention Center Manila with over 3,500 delegates.",
    img: EVENT_IMAGE_IDS[0],
    location: "SMX Convention Center, Pasay City",
    time: "4 Days",
    fullDesc: "The 2025 CEAP National Convention, themed 'Living Synodality as Pilgrims of Hope,' gathered over 3,500 delegates from all regions of the Philippines at the SMX Convention Center, Mall of Asia. The event featured a keynote address by His Eminence Cardinal Luis Antonio G. Tagle, who was also awarded the prestigious Pro Deo et Patria Award. CEAP NCR member schools participated actively in this national celebration of Catholic education.",
  },
  {
    date: "Ongoing 2025",
    title: "PAASCU Accreditation Preparation Clinic",
    desc: "Intensive guidance sessions for schools undergoing first-time or renewal PAASCU accreditation — covering documentation, site visit readiness, and compliance.",
    img: EVENT_IMAGE_IDS[6],
    location: "Catholic Educational Center, Intramuros, Manila",
    time: "9:00 AM – 3:00 PM",
    fullDesc: "CEAP NCR hosts ongoing clinics throughout 2025 to help member schools prepare confidently for PAASCU accreditation visits. Expert facilitators walk teams through self-survey instruments, documentation standards, and common compliance gaps. Schools at both basic and tertiary levels are encouraged to attend and bring their accreditation teams.",
  },
  {
    date: "Ongoing 2025",
    title: "Faculty Development & Values Formation Program",
    desc: "Year-round professional growth program for Catholic school educators, integrating pedagogy, spirituality, and leadership within the NCR member school network.",
    img: EVENT_IMAGE_IDS[5],
    location: "Various CEAP NCR Member Institutions",
    time: "Multiple Sessions",
    fullDesc: "CEAP NCR's flagship Faculty Development Program runs year-round across member institutions, offering formation workshops, spiritual retreats, and leadership clinics. The 2025 program is anchored on the synodal spirit of walking together as pilgrims of hope, encouraging Catholic educators to deepen their vocation and professionally grow within a faith-based framework.",
  },
];

const FEATURED_EVENTS = ALL_EVENTS.slice(0, 3);



const CONTACT_DETAILS = [
  { IconComp: Icon.MapPin, label: "Address",      lines: ["6th Floor St. John Building 1521 Paz St. Paco, Manila 1007"] },
  { IconComp: Icon.Phone,  label: "Phone",        lines: ["(02) 8 564-3712 to 13"] },
  { IconComp: Icon.Mail,   label: "Email",        lines: ["info@ceapncr.org.ph"] },
  { IconComp: Icon.Clock,  label: "Office Hours", lines: ["Monday – Friday", "8:00 AM – 5:00 PM"] },
];

const FILTERS = ["All", "Basic Education", "Higher Education", "Technical-Vocational"];

const TICKER_ITEMS = [
  "CEAP NCR General Assembly 2025 — July 29–31 at UST",
  "Watch: 3-Day Highlights Video Now on Facebook",
  "Theme: Living Synodality as Pilgrims of Hope",
  "People Power Commemoration — February 25",
  "CEAP National Convention — Sept 30–Oct 3, SMX Manila",
  "Strengthening Systems for a Seamless Strengthened Senior High School Full Implementation",
];

const typeClass = {
  "Basic Education":       "school-type--basic",
  "Higher Education":      "school-type--higher",
  "Technical-Vocational":  "school-type--tech",
};

/* ─────────────────────────────────────────
   UNSPLASH IMAGE HELPER
───────────────────────────────────────── */
function unsplashUrl(photoId, w = 800, h = 480) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

/* ─────────────────────────────────────────
   GSAP SCROLL ANIMATIONS HOOK
───────────────────────────────────────── */
function useScrollAnimations(isActive) {
  useEffect(() => {
    if (!isActive) return;

    // Wait one frame so the DOM is fully painted before GSAP scans for elements
    const raf = requestAnimationFrame(() => {

    // Kill any existing ScrollTriggers to avoid duplicates on re-render
    ScrollTrigger.getAll().forEach((t) => t.kill());

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {

      /* ── 1. Generic .reveal elements (fade + slide up) ── */
      const revealEls = gsap.utils.toArray(".reveal");
      revealEls.forEach((el) => {
        const delay = el.classList.contains("reveal-delay-1") ? 0.12
                    : el.classList.contains("reveal-delay-2") ? 0.24
                    : el.classList.contains("reveal-delay-3") ? 0.36
                    : 0;
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.85,
            ease: "power3.out",
            delay,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      /* ── 2. Stats bar — count-up + stagger ── */
      const statItems = gsap.utils.toArray(".stat-item");
      if (statItems.length) {
        gsap.fromTo(statItems,
          { y: 30, opacity: 0, scale: 0.92 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: ".stats-bar",
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      /* ── 3. Program cards — fan-in with stagger ── */
      const programCards = gsap.utils.toArray(".program-card");
      if (programCards.length) {
        gsap.fromTo(programCards,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".programs-grid",
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      /* ── 4. Event cards — slide-in from bottom with stagger ── */
      const eventCards = gsap.utils.toArray(".event-card");
      if (eventCards.length) {
        gsap.fromTo(eventCards,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".events-grid",
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      /* ── 5. School cards — cascade in ── */
      const schoolCards = gsap.utils.toArray(".school-card");
      if (schoolCards.length) {
        gsap.fromTo(schoolCards,
          { y: 35, opacity: 0, scale: 0.96 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.6,
            stagger: { amount: 0.8, from: "start" },
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".schools-grid",
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      /* ── 6. About section — split left/right ── */
      const aboutLeft = document.querySelector(".about-grid > div:first-child");
      const aboutRight = document.querySelector(".about-visual");
      if (aboutLeft) {
        gsap.fromTo(aboutLeft,
          { x: -50, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: ".about-grid", start: "top 80%", toggleActions: "play none none none" },
          }
        );
      }
      if (aboutRight) {
        gsap.fromTo(aboutRight,
          { x: 50, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.15,
            scrollTrigger: { trigger: ".about-grid", start: "top 80%", toggleActions: "play none none none" },
          }
        );
      }

      /* ── 7. Contact grid — slide from sides ── */
      const contactInfo = document.querySelector(".contact-info");
      const contactForm = document.querySelector(".contact-form");
      if (contactInfo) {
        gsap.fromTo(contactInfo,
          { x: -40, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: ".contact-grid", start: "top 82%", toggleActions: "play none none none" },
          }
        );
      }
      if (contactForm) {
        gsap.fromTo(contactForm,
          { x: 40, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.1,
            scrollTrigger: { trigger: ".contact-grid", start: "top 82%", toggleActions: "play none none none" },
          }
        );
      }

      /* ── 8. Section labels — slide in from left ── */
      const sectionLabels = gsap.utils.toArray(".section-label");
      sectionLabels.forEach((el) => {
        gsap.fromTo(el,
          { x: -30, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          }
        );
      });

      /* ── 9. Footer brand — fade up ── */
      const footerBrand = document.querySelector(".footer-brand");
      const footerCols = gsap.utils.toArray(".footer-col");
      if (footerBrand) {
        gsap.fromTo(footerBrand,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: "footer", start: "top 90%", toggleActions: "play none none none" },
          }
        );
      }
      if (footerCols.length) {
        gsap.fromTo(footerCols,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out", delay: 0.1,
            scrollTrigger: { trigger: "footer", start: "top 90%", toggleActions: "play none none none" },
          }
        );
      }

    });

    /* ── Reduced-motion fallback: just show everything ── */
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.utils.toArray(".reveal, .stat-item, .program-card, .event-card, .school-card").forEach((el) => {
        gsap.set(el, { opacity: 1, y: 0, x: 0, scale: 1 });
      });
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };

    }); // end rAF

    return () => {
      cancelAnimationFrame(raf);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isActive]); // re-runs whenever home page becomes active
}

/* ─────────────────────────────────────────
   MAIN APP COMPONENT
───────────────────────────────────────── */
export default function App() {
  const [activeNav, setActiveNav]     = useState("Home");
  const [scrolled, setScrolled]       = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "", inquiry: "" });
  const [submitted, setSubmitted]     = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [contactError, setContactError]     = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone]   = useState(false);
  const [nlLoading, setNlLoading] = useState(false);
  const [nlError, setNlError]     = useState("");
  const [showEventsPage, setShowEventsPage]   = useState(false);
  const [showGAPage, setShowGAPage]           = useState(false);
  const [showMSPage, setShowMSPage]           = useState(false);
  const [showAboutPage, setShowAboutPage]     = useState(false);
  const [gaYear, setGaYear]                   = useState(2026);

  const isHomePage = !showEventsPage && !showGAPage && !showMSPage && !showAboutPage;
  useScrollAnimations(isHomePage);

  // Re-animate school cards whenever the filter changes
  useEffect(() => {
    const cards = gsap.utils.toArray(".school-card");
    if (!cards.length) return;
    gsap.fromTo(
      cards,
      { y: 30, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: { amount: 0.55 }, ease: "power2.out" }
    );
  }, [activeFilter]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active nav tracking via scroll (only for sections actually on the home page)
  useEffect(() => {
    if (showEventsPage || showGAPage || showMSPage || showAboutPage) return;
    const scrollSections = ["home", "about", "contact"]; 
    const onScroll = () => {
      const scrollY = window.scrollY + 120;
      for (let i = scrollSections.length - 1; i >= 0; i--) {
        const id = scrollSections[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          // Map ID back to Nav label
          const label = id === "home" ? "Home" : id === "about" ? "About" : "Contact";
          setActiveNav(label);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [showEventsPage, showGAPage, showMSPage, showAboutPage]);

  const INQUIRY_LABELS = {
    membership:  "Membership Inquiry",
    programs:    "Programs & Services",
    events:      "Events & Registration",
    partnership: "Partnership Opportunities",
    media:       "Media & Press",
    other:       "Other",
  };

  const handleContact = (e) => {
    e.preventDefault();
    setContactLoading(true);
    setContactError("");

    emailjs.send(
      EJ_SERVICE_ID,
      EJ_CONTACT_TEMPLATE,
      {
        from_name:    contactForm.name,
        from_email:   contactForm.email,
        inquiry_type: INQUIRY_LABELS[contactForm.inquiry] || contactForm.inquiry,
        subject:      contactForm.subject,
        message:      contactForm.message,
        reply_to:     contactForm.email,
      },
      EJ_PUBLIC_KEY
    )
      .then(() => {
        setSubmitted(true);
        setContactForm({ name: "", email: "", subject: "", message: "", inquiry: "" });
        setTimeout(() => setSubmitted(false), 6000);
      })
      .catch(() => {
        setContactError("Something went wrong. Please try again or email us directly at info@ceapncr.org.ph");
      })
      .finally(() => setContactLoading(false));
  };

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
      .then(() => {
        setNewsletterDone(true);
        setNewsletterEmail("");
      })
      .catch(() => {
        setNlError("Couldn't subscribe. Please try again.");
      })
      .finally(() => setNlLoading(false));
  };

  const updateForm = (field) => (e) =>
    setContactForm((prev) => ({ ...prev, [field]: e.target.value }));

  const filteredSchools = activeFilter === "All"
    ? MEMBER_SCHOOLS
    : MEMBER_SCHOOLS.filter((s) => s.type === activeFilter);

  const handleViewAllEvents = (e) => {
    e.preventDefault();
    setShowEventsPage(true);
  };

  const handleGlobalNavigate = (link, year = 2026) => {
    const isEvents = link === "Events";
    const isGA = link === "General Assembly";
    const isMS = link === "Member Schools";
    const isAbout = link === "About";

    // 1. Clear all pages first
    setShowEventsPage(isEvents);
    setShowGAPage(isGA);
    setShowMSPage(isMS);
    setShowAboutPage(isAbout);

    setActiveNav(link);
    if (isGA) {
      setGaYear(year);
    }

    // 2. If it's a home page section, scroll to it
    if (!isEvents && !isGA && !isMS && !isAbout) {
      setTimeout(() => {
        const id = link.toLowerCase().replace(/ /g, "-");
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else if (link === "Home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 100);
    } else {
      // Switch top scroll for new page
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  // ── ABOUT PAGE ───────────────────────────
  if (showAboutPage) {
    return (
      <AboutPage
        onBack={() => handleGlobalNavigate("Home")}
        onNavigate={handleGlobalNavigate}
      />
    );
  }

  // ── MEMBER SCHOOLS PAGE ──────────────────
  if (showMSPage) {
    return (
      <MemberSchoolsPage
        onBack={() => handleGlobalNavigate("Home")}
        onNavigate={handleGlobalNavigate}
      />
    );
  }

  // ── GENERAL ASSEMBLY PAGE ────────────────
  if (showGAPage) {
    return (
      <GeneralAssemblyPage
        onBack={() => handleGlobalNavigate("Home")}
        activeNav="General Assembly"
        onNavigate={handleGlobalNavigate}
        year={gaYear}
      />
    );
  }

  // ── EVENTS PAGE ──────────────────────────
  if (showEventsPage) {
    return (
      <EventsPage 
        onBack={() => handleGlobalNavigate("Home")} 
        onViewGA={() => handleGlobalNavigate("General Assembly")} 
        onNavigate={handleGlobalNavigate}
      />
    );
  }

  // ── MAIN SITE ────────────────────────────
  return (
    <div>
      <a href="#home" className="skip-link">Skip to main content</a>

      {/* ── NAVBAR ─────────────────────────────── */}
      <Navbar
        activeLink={activeNav}
        scrolled={scrolled}
        onNavigate={handleGlobalNavigate}
      />

      {/* ── HERO ───────────────────────────────── */}
      <section id="home" style={{ padding: 0 }}>
        <div className="hero">
          <div className="hero-pattern" />
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-grid" />

          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Shaping<em> Catholic Education</em> in Metro Manila
              </h1>
              <p className="hero-subtitle">Sapientia Aetate et Gratia</p>
              <p className="hero-desc">
                CEAP NCR unites over 160+ Catholic schools across the National Capital Region,
                advancing quality education anchored in Gospel values and a commitment to the common good.
              </p>
              <div className="hero-ctas">
                <a href="#about"          className="btn-primary">Discover Our Mission</a>
                <button className="btn-outline" onClick={() => setShowMSPage(true)}>View Member Schools</button>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-card-stack">
                <div className="hero-card">
                  <p className="hero-card-label">At a glance</p>
                  <div className="hero-stat-row">
                    {[
                      { Icon: Icon.GraduationCap, value: "160+", label: "Member Schools" },
                      { Icon: Icon.Users,          value: "8", label: "Arch/Dioceses" },
                      { Icon: Icon.Award,          value: "15 Cities", label: "NCR + Rizal Province" },
                    ].map(({ Icon: I, value, label }) => (
                      <div className="hero-stat-item" key={label}>
                        <div className="hero-stat-icon"><I /></div>
                        <div className="hero-stat-info">
                          <div className="hero-stat-value">{value}</div>
                          <div className="hero-stat-label">{label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="hero-card-accent">
                    <span className="hero-card-accent-year">1941</span>
                    <span className="hero-card-accent-text">Founded<br />NCR Chapter</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-scroll" aria-hidden="true">
            <span>Scroll</span>
            <div className="scroll-line" />
          </div>
        </div>
      </section>

      {/* ── TICKER ─────────────────────────────── */}
      <div className="ticker-bar" aria-label="Latest announcements" aria-live="polite">
        <div className="ticker-inner">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* ── STATS BAR ──────────────────────────── */}
      {/* <div className="stats-bar">
        <div className="stats-inner">
          {STATS.map((s) => (
            <div key={s.label} className="stat-item reveal">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div> */}

      {/* ── ABOUT ──────────────────────────────── */}
      <section id="about">
        <div className="section-inner">
          <div className="about-grid">
            <div>
              <p className="section-label reveal">About CEAP NCR</p>
              <h2 className="section-title reveal reveal-delay-1">A Legacy of Faith-Based Educational Leadership</h2>
              <p className="section-body reveal reveal-delay-2">
                The Catholic Educational Association of the Philippines — National Capital Region (CEAP NCR)
                is the regional chapter of CEAP, serving as the primary coordinating body for Catholic
                educational institutions in Metro Manila. Founded to strengthen the collective voice of
                Catholic schools, we champion policies, programs, and partnerships that uphold the dignity
                of every learner.
              </p>
              <p className="section-body section-body--spaced reveal reveal-delay-3">
                From early childhood to higher education, our member schools form a vibrant community
                committed to forming young people of conscience, competence, and compassion.
              </p>
            </div>

            <div className="about-visual reveal reveal-delay-2">
              <div className="about-card">
                <div className="about-card-bg" />
                <div className="about-card-quote-mark">"</div>
                <p className="about-card-quote">
                  "Catholic education does not merely aim at the transmission of knowledge; it forms the
                  whole person — mind, heart, and spirit — for service to God and to others."
                </p>
                <p className="about-card-attr">— CEAP NCR Regional President</p>
                <div className="about-badge">
                  <span className="about-badge-year">1941</span>
                  <span className="about-badge-text">Founded<br />NCR Chapter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ───────────────────────────── */}
      {/* <section id="programs" className="programs-section">
        <div className="section-inner">
          <div className="programs-intro">
            <div>
              <p className="section-label reveal">What We Offer</p>
              <h2 className="section-title section-title--flush reveal reveal-delay-1">Programs &amp; Services</h2>
            </div>
          </div>
          <div className="programs-grid">
            {PROGRAMS.map(({ IconComp, title, desc }, i) => (
              <div key={title} className={`program-card reveal reveal-delay-${(i % 3) + 1}`}>
                <div className="program-icon-wrap">
                  <IconComp />
                </div>
                <h3 className="program-title">{title}</h3>
                <p className="program-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

         {/* ── EVENTS (Homepage Preview) ──────────── */}
         <section className="events-section">
        <div className="section-inner">
          <p className="section-label section-label--light reveal">Latest News</p>
          <h2 className="section-title section-title--light reveal reveal-delay-1">Events &amp; Announcements</h2>

          {/* Featured event cards with images */}
          <div className="events-grid">
            {FEATURED_EVENTS.map((e, i) => (
              <div key={e.title} className={`event-card reveal reveal-delay-${i + 1}`}>
                <div className="event-card__image">
                  <img
                    src={typeof e.img === 'string' && e.img.startsWith("photo-") ? unsplashUrl(e.img, 600, 300) : e.img}
                    alt={e.title}
                    loading="lazy"
                    onError={(ev) => { ev.target.parentElement.style.display = "none"; }}
                  />
                </div>
                <div className="event-card__content">
                  <span className="event-tag">{e.tag}</span>
                  <p className="event-date">
                    <Icon.Calendar />
                    {e.date}
                  </p>
                  <h3 className="event-title">{e.title}</h3>
                  <p className="event-desc">{e.desc}</p>
                  <button
                    className="event-link"
                    aria-label={`Read more about ${e.title}`}
                    onClick={handleViewAllEvents}
                  >
                    Read More <Icon.ArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="section-cta reveal">
            <button className="btn-outline btn-outline--dim" onClick={handleViewAllEvents}>
              View All Events
            </button>
          </div>
        </div>
      </section>

      {/* ── MEMBER SCHOOLS (Homepage Preview) ────── */}
      <section>
        <div className="section-inner">
          <div className="schools-header">
            <div>
              <p className="section-label reveal">Our Network</p>
              <h2 className="section-title section-title--flush reveal reveal-delay-1">Member Schools</h2>
            </div>
            <div className="schools-filter" role="group" aria-label="Filter schools by type">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  className={`filter-btn ${activeFilter === f ? "active" : ""}`}
                  onClick={() => setActiveFilter(f)}
                  aria-pressed={activeFilter === f}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="schools-grid">
            {filteredSchools.map((s, i) => (
              <div key={s.name} className={`school-card reveal reveal-delay-${(i % 3) + 1}`}>
                <div className="school-initial">{s.name[0]}</div>
                <div className="school-name">{s.name}</div>
                <div className="school-loc">
                  <Icon.MapPin />
                  {s.location}
                </div>
                <span className={`school-type ${typeClass[s.type] || ""}`}>{s.type}</span>
              </div>
            ))}
          </div>

          <div className="section-cta reveal">
            <button className="btn-primary" onClick={() => setShowMSPage(true)}>
              View More Schools
            </button>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ─────────────────────────── */}
      {/* <section className="newsletter-section" style={{ padding: "4rem 2rem" }}>
        <div className="newsletter-inner reveal">
          <p className="section-label section-label--light" style={{ justifyContent: "center" }}>
            Stay Connected
          </p>
          <h2 className="newsletter-title">Get the Latest from CEAP NCR</h2>
          <p className="newsletter-desc">
            Receive updates on events, programs, accreditation news, and Catholic education developments
            across the National Capital Region — delivered straight to your inbox.
          </p>
          {newsletterDone ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", color: "var(--gold-light)", fontFamily: "Outfit", fontSize: "0.95rem" }}>
              <Icon.CheckCircle /> Thank you for subscribing!
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleNewsletter}>
              <input
                type="email"
                placeholder="your@school.edu.ph"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                aria-label="Email address for newsletter"
              />
              <button type="submit">Subscribe</button>
            </form>
          )}
        </div>
      </section> */}

      {/* ── CONTACT ────────────────────────────── */}
      <section id="contact" className="contact-section">
        <div className="section-inner">
          <p className="section-label reveal">Get in Touch</p>
          <h2 className="section-title reveal reveal-delay-1">Contact Us</h2>

          <div className="contact-grid">
            <div className="contact-info reveal">
              <h3>We'd love to hear from you.</h3>
              <p className="section-body contact-info__intro">
                Whether you're a prospective member school, a partner organization, or simply interested
                in Catholic education initiatives in the NCR — our team is ready to assist.
              </p>
              {CONTACT_DETAILS.map(({ IconComp, label, lines }) => (
                <div key={label} className="contact-detail">
                  <div className="contact-detail-icon">
                    <IconComp />
                  </div>
                  <div className="contact-detail-text">
                    <strong>{label}</strong>
                    <span>
                      {lines.map((line, i) => (
                        <span key={i}>{line}{i < lines.length - 1 && <br />}</span>
                      ))}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-form reveal reveal-delay-2">
              <h3 className="contact-form-title">Send a Message</h3>

              {submitted && (
                <div className="form-success" role="alert">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "18px", height: "18px", flexShrink: 0 }}>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  Message sent! We'll get back to you within 2 business days.
                </div>
              )}

              {contactError && (
                <div className="form-error" role="alert" style={{
                  background: "rgba(220,53,69,0.08)",
                  border: "1px solid rgba(220,53,69,0.25)",
                  color: "#c0392b",
                  borderRadius: "var(--radius-sm)",
                  padding: "0.85rem 1rem",
                  fontSize: "0.88rem",
                  marginBottom: "1rem",
                  lineHeight: 1.5,
                }}>
                  {contactError}
                </div>
              )}

              <form onSubmit={handleContact}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Juan dela Cruz"
                      value={contactForm.name}
                      onChange={updateForm("name")}
                      required
                      disabled={contactLoading}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="juan@school.edu.ph"
                      value={contactForm.email}
                      onChange={updateForm("email")}
                      required
                      disabled={contactLoading}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="inquiry">Inquiry Type</label>
                  <select
                    id="inquiry"
                    value={contactForm.inquiry}
                    onChange={updateForm("inquiry")}
                    required
                    disabled={contactLoading}
                  >
                    <option value="">Select an inquiry type</option>
                    <option value="membership">Membership Inquiry</option>
                    <option value="programs">Programs &amp; Services</option>
                    <option value="events">Events &amp; Registration</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="media">Media &amp; Press</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="How can we help you?"
                    value={contactForm.subject}
                    onChange={updateForm("subject")}
                    required
                    disabled={contactLoading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    placeholder="Tell us more about your inquiry..."
                    value={contactForm.message}
                    onChange={updateForm("message")}
                    required
                    disabled={contactLoading}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary btn-primary--full"
                  disabled={contactLoading}
                  style={{ opacity: contactLoading ? 0.7 : 1, cursor: contactLoading ? "not-allowed" : "pointer" }}
                >
                  {contactLoading ? "Sending…" : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

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
                  { Icon: Icon.Facebook, label: "Facebook", href: "https://www.facebook.com/ceapncrPH" },
                  // { Icon: Icon.Linkedin, label: "LinkedIn", href: "#" },
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