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
    theme: "Embracing the Jubilee Call",
    subTheme: "Renewal & Dialogue",
    color: "#c9a84c",
    sessions: [
      { time: "7:00 – 8:00 AM",  title: "Registration",                          desc: "" },
      { time: "8:00 – 9:00 AM",  title: "Eucharistic Celebration",               desc: "Presided by Fr. Glenn William Z. Relucio, Ph.D., Regional Trustee, CEAP NCR." },
      { time: "9:00 – 9:30 AM",  title: "Health Break (AM)",                     desc: "" },
      { time: "9:15 – 9:30 AM",  title: "Product Presentation 1",                desc: "Quipper" },
      { time: "9:30 AM",         title: "Opening Ceremonies",                     desc: "National Anthem & CEAP Hymn · Welcome Remarks (Fr. Louie R. Coronel, O.P., EHL – Secretary General, UST) · Recap of CNGA2024 (Dr. Leo B. Galve) · Perspective Setting (Fr. Kennedy A. Neral, Ph.D.) · Presentation of Participants (Fr. Emilio A. Ascano, LRMS)" },
      { time: "10:00 AM",        title: "Inspirational Message from the CEAP President", desc: "Fr. Karel S. San Juan, SJ, President, CEAP" },
      { time: "10:15 AM",        title: "CEAP Executive Director's Report",       desc: "Mr. Narcy Ador Dionisio, CEAP Executive Director" },
      { time: "10:40 AM",        title: "CEAP NCR Regional Trustee's Report",    desc: "Fr. Glenn William Z. Relucio, Ph.D., Regional Trustee, CEAP NCR" },
      { time: "11:10 AM – 12:10 PM", title: "Keynote Address — \"Pilgrims of Hope: Embracing the Jubilee Call to Mission\"", desc: "Msgr. Gerardo O. Santos, Ed.D., Parish Priest, St. Andrew Parish, Bel-Air" },
      { time: "12:10 – 12:30 PM", title: "CEAP NCR Election Process",            desc: "Simultaneous Casting of Votes · Dr. Virginia R. Fornias, Chair, CEAP NCR Tertiary Education Committee" },
      { time: "12:30 – 1:30 PM", title: "Lunch Break",                           desc: "" },
      { time: "12:45 – 1:15 PM", title: "Cultural Presentation",                 desc: "UST Salinggawi Dance Troupe" },
      { time: "1:15 – 1:30 PM",  title: "Product Presentation 2",               desc: "TechnoKids" },
      { time: "1:30 – 2:30 PM",  title: "Education for a Hope-Filled Future",   desc: "Hon. Juan Edgardo \"Sonny\" M. Angara, Secretary, Department of Education" },
      { time: "2:30 – 3:15 PM",  title: "Health Break (PM)",                    desc: "" },
      { time: "2:45 – 3:00 PM",  title: "Product Presentation 3",               desc: "DIWA" },
      { time: "3:00 – 3:15 PM",  title: "Product Presentation 4",               desc: "RAKSO" },
      { time: "3:15 – 3:45 PM",  title: "Committee Business Meeting and Election of Officers", desc: "Committee Chairpersons" },
      { time: "3:45 – 5:00 PM",  title: "Concurrent Sessions",                  desc: "CS1: Tertiary Education — Bridging Faith and Future: Catholic Higher Education in the Next Decade (Fr. Daniel Franklin E. Pilario, CM, Ph.D. – President, Adamson University)\nCS2: Basic Education — Catholic Basic Education Schools as Pillars of Hope (Mr. Paolo Josef L. Blando, National Teachers College)\nCS3: Advocacy — Catholic Schools as Catalysts for Change: Educating for Social Transformation (Ms. Heidi L. Mendoza)\nCS4: Christian Formation — Sacred Pause: Finding Peace in the Ministry of Presence (Ms. May Buenaobra, La Salle Green Hills)\nCS5: Administrative Services — Enhance Collaboration and Synodality Among CEAP-NCR Schools (Mr. Mark Raymond S. Par, CPA, MBA – Miriam College)" },
      { time: "5:00 PM",         title: "Closing of Day 1",                     desc: "Assigned Committees of the Day" },
    ],
  },
  {
    day: "Day 2",
    date: "July 30, 2025 (Wednesday)",
    theme: "Strengthening Our Pilgrimage",
    subTheme: "Formation & Leadership",
    color: "#1a1f6e",
    sessions: [
      { time: "7:00 – 8:00 AM",  title: "Registration",                          desc: "" },
      { time: "8:00 – 9:00 AM",  title: "Eucharistic Celebration",               desc: "His Eminence Jose F. Cardinal Advincula, D.D., Archbishop of Manila" },
      { time: "9:00 – 9:45 AM",  title: "Health Break (AM)",                     desc: "" },
      { time: "9:15 – 9:30 AM",  title: "Product Presentation 5",               desc: "KCK" },
      { time: "9:30 – 9:45 AM",  title: "Product Presentation 6",               desc: "Phoenix Publishing House" },
      { time: "9:45 – 10:00 AM", title: "Energizer",                             desc: "% Guidance Committee" },
      { time: "10:00 – 10:15 AM", title: "Recap of Day 1",                       desc: "Mr. Neil O. Parinas, Chairperson, CEAP NCR Institute for Continuing Education" },
      { time: "10:15 – 11:30 AM", title: "Plenary Session 1 — \"Leadership with Integrity: Servant Leadership in the Journey of Nation-Building\"", desc: "Dr. Narciso \"Jun\" Erguiza, Jr., President, St. John Integrated School, Angeles City" },
      { time: "11:30 AM – 12:00 NN", title: "Open Forum",                        desc: "" },
      { time: "12:00 – 1:00 PM", title: "Lunch Break",                           desc: "" },
      { time: "12:15 – 12:45 PM", title: "Cultural Presentation",                desc: "Adamson University Dance Company" },
      { time: "1:00 – 2:00 PM",  title: "Plenary Session 2 — Usapang ED with Atty E and Doc D sa CEAP NCR", desc: "Atty. Joseph Noel M. Estrada (Sr. Managing Partner, Estrada and Aquino Law Office) · Dr. Rhodora Angela F. Ferrer (Executive Director, PEAC) · Ms. Evangeline de Peralta (Learner Formation Head, De La Salle Santiago Zobel) · Ms. Remilyn Caluma-de Jesus (Senior High School Teacher, San Beda University) · Mrs. Jennifer Tiu (Parents Coordinating Body President, Holy Child Catholic School) · Mr. Juan Miguel Rubiales (Grade 11 Student, Colegio San Agustin – Makati)" },
      { time: "2:00 – 2:30 PM",  title: "Open Forum",                            desc: "" },
      { time: "2:30 – 3:15 PM",  title: "Health Break (PM)",                    desc: "" },
      { time: "2:45 – 3:00 PM",  title: "Product Presentation 7",               desc: "Phoenix Publishing House" },
      { time: "3:00 – 3:15 PM",  title: "Product Presentation 8",               desc: "SCUOLA" },
      { time: "3:15 – 3:45 PM",  title: "Committee Business Meeting and Election of Officers", desc: "Committee Chairpersons" },
      { time: "3:45 – 5:00 PM",  title: "Concurrent Sessions",                  desc: "CS6: Student Affairs — Beyond Discipline: Empowering Student Affairs to Address Bullying and Nurture Inclusive Communities (Dr. Sheila Marie \"Shake\" Hocson, Director of Guidance Services, Far Eastern University)\nCS7: Student Leadership — Called to Lead in Hope: Shaping #KatolikongLider as Pilgrims on a Mission with Christ (Ms. Cherry Camille Depano, RN, Corporate Secretary, YMCA of Manila)\nCS8: Library Services — Cultivating a Reading Culture for Wisdom and Faith: The Bible (Fr. Francis Alvarez, SJ, Ateneo de Manila University)\nCS9: Guidance & Counselling — Walking with the Young: Mental Health and Spiritual Resilience in Schools (Mr. Von Karlo N. Gonzales, RGC, De La Salle University Laguna Campus)\nCS10: Registrar — From Interaction to Impact: Redefining Frontline Customer Service (Ms. Bianca Monica \"Nix\" L. Lañas, CEO/Founder, Propeller Realty)" },
      { time: "5:00 PM",         title: "Closing of Day 2",                     desc: "Assigned Committees of the Day" },
    ],
  },
  {
    day: "Day 3",
    date: "July 31, 2025 (Thursday)",
    theme: "Commissioning & Sending Forth",
    subTheme: "Action & Commitment",
    color: "#232899",
    sessions: [
      { time: "7:00 – 8:00 AM",  title: "Registration",                          desc: "" },
      { time: "8:00 – 8:05 AM",  title: "Opening Prayer",                        desc: "AVP" },
      { time: "8:05 – 8:15 AM",  title: "Energizer",                             desc: "% Guidance Committee" },
      { time: "8:15 – 8:30 AM",  title: "Recap of Day 2",                        desc: "Mr. Neil O. Pariñas, Chair, Institute for Continuing Education (ICE)" },
      { time: "8:30 – 9:30 AM",  title: "Plenary Session 3 — \"Synodality in Catholic Education: Walking Together in Mission and Ministry\"", desc: "Fr. Raymond Joseph L. Arre, Superintendent, Diocese of Cubao Educational System (DOCES) · Chair, CEAP Superintendents Conference · Vice President, MaPSA" },
      { time: "9:30 – 10:00 AM", title: "Health Break (AM)",                     desc: "" },
      { time: "10:00 – 11:30 AM", title: "Plenary Session 4 — \"The Future of Catholic Schools: Challenges and Opportunities in the Jubilee Year and Beyond\"", desc: "Mr. Francis Jim B. Tuscano, EdTech Coordinator, Xavier School" },
      { time: "11:30 AM",        title: "Product Presentation 9",               desc: "OrangeApps" },
      { time: "11:45 AM",        title: "Lunch Break",                           desc: "" },
      { time: "12:00 NN",        title: "Cultural Presentation",                 desc: "Kalye A: The Musical (Excerpt)" },
      { time: "1:00 – 2:30 PM",  title: "A.I. Concurrent Sessions",             desc: "CS11: AI for Inclusive Education: Bridging Gaps for Diverse Learners (sponsored by SCOULA) — Fr. Stephen R. Redillas, OP, PhD, University of Santo Tomas\nCS12: Ethical AI Integration in Education: Balancing Innovation with Integrity (sponsored by Phoenix Publishing House) — Dr. Reuben P. Velarde, Asst. Vice President for Business Development, Phoenix Group of Companies\nCS13: AI in School Administration: Streamlining Operations and Decision-Making (sponsored by DIWA Learning Systems) — Dr. Jerrylyn Bacroya-Magbuo, Dean of the College of Arts, Sciences, and Education, FAITH Colleges" },
      { time: "3:00 PM",         title: "Go back to Plenary Hall · Health Break (PM)", desc: "" },
      { time: "3:30 – 4:30 PM",  title: "Eucharistic Celebration",               desc: "His Excellency Most Rev. Rufino C. Sescon, Jr. DD, Bishop of Balanga" },
      { time: "3:30 – 4:30 PM",  title: "Commissioning of the Newly Elected CEAP NCR Trustees", desc: "" },
      { time: "3:30 – 4:30 PM",  title: "Presentation of Resolutions",           desc: "" },
      { time: "4:30 – 5:00 PM",  title: "Closing Remarks & Acknowledgement · Grand Raffle", desc: "Fr. Glenn William Z. Relucio, Ph.D." },
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
  { label: "Deepen Spiritual Renewal",          desc: "Reflect on the meaning of the Jubilee Year and its impact on Catholic education, fostering a culture of faith, gratitude, and reconciliation." },
  { label: "Strengthen Missionary Commitment",  desc: "Equip Catholic schools to become vibrant centers of evangelization, social transformation, and lifelong learning in alignment with the Church's vision for the Jubilee." },
  { label: "Enhance Collaboration & Synodality", desc: "Encourage dialogue and synergy among Catholic educational institutions, government agencies, and stakeholders to advance holistic and inclusive education." },
  { label: "Empower Leadership & Formation",    desc: "Provide transformative leadership training, student engagement strategies, and faith formation programs to shape Christ-centered educators and learners." },
  { label: "Innovate for the Future",           desc: "Explore innovative approaches in academic leadership, student services, and digital transformation to ensure Catholic education remains relevant and impactful in the modern world." },
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

const YEAR_DATA = {
  2026: {
    heroBadge: "Upcoming: General Assembly 2026",
    isUpcoming: true,
    theme: "\"Transforming Catholic Schools into New Maps of Hope\"",
    desc: "Join us for the upcoming CEAP NCR General Assembly in 2026 at the University of Santo Tomas as we explore ways to transform Catholic schools into new maps of hope.",
    dateStartEnd: "July 29–31, 2026",
    location: "Buenaventura Garcia Paredes, O.P. Building (Thomasian Alumni Center), UST",
    delegates: "Registration Upcoming",
    aboutDesc1: "The upcoming CEAP NCR General Assembly 2026 will be held at the Buenaventura Garcia Paredes, O.P. Building (Thomasian Alumni Center), University of Santo Tomas in Sampaloc, Manila.",
    aboutDesc2: "Anchored on the theme \"Transforming Catholic Schools into New Maps of Hope,\" the assembly looks forward to bringing together school heads, administrators, and Catholic educators across the National Capital Region.",
    overviewImg: ga12,
    highlights: [
      { label: "Transforming Catholic Schools", desc: "Exploring strategies to serve as new maps of hope for learners." },
      { label: "Community Renewal", desc: "Strengthening the bonds of Catholic educational institutions in NCR." }
    ],
    programDays: [
      {
        day: "Day 1",
        date: "July 29, 2026 (Wednesday)",
        theme: "New Maps of Hope",
        color: "#c9a84c",
        sessions: [
          { time: "TBA", title: "Registration & Opening Ceremonies", desc: "Buenaventura Garcia Paredes, O.P. Building" }
        ]
      }
    ],
    speakers: [],
    videoTitle: "General Assembly 2026",
    videoDate: "Upcoming",
    gallery: GALLERY_IMAGES.slice(6, 10),
    galleryDesc: "Glimpses of past assemblies to build excitement for 2026!"
  },
  2025: {
    heroBadge: "General Assembly 2025",
    theme: "\"Living Synodality as Pilgrims of Hope\"",
    desc: "The flagship three-day gathering of CEAP NCR member schools at the University of Santo Tomas — uniting Catholic educators, administrators, and school leaders from across Metro Manila.",
    dateStartEnd: "July 29–31, 2025",
    location: "University of Santo Tomas, Manila",
    delegates: "120+ Delegates",
    aboutDesc1: "The CEAP NCR General Assembly 2025 was a landmark three-day event held at the University of Santo Tomas, bringing together school heads, administrators, and Catholic educators from across the National Capital Region.",
    aboutDesc2: "Anchored on the theme \"Living Synodality as Pilgrims of Hope,\" the assembly featured plenary sessions, breakout discussions, commission reports, and a closing declaration renewing the commitment of member schools to Catholic education in Metro Manila.",
    overviewImg: ga12,
    highlights: HIGHLIGHTS,
    programDays: PROGRAM_DAYS,
    speakers: SPEAKERS,
    videoTitle: "3-Day Highlights — CEAP NCR General Assembly 2025",
    videoDate: "August 2025",
    gallery: GALLERY_IMAGES,
    galleryDesc: "A visual chronicle of the CEAP NCR General Assembly 2025 — three days of synodality, community, and hope at the University of Santo Tomas."
  }
};

/* ─── MAIN COMPONENT ─────────────────────── */
export default function GeneralAssemblyPage({ onBack, onNavigate, activeNav, year = 2025 }) {
  const [scrolled, setScrolled]         = useState(false);
  const [activeDay, setActiveDay]       = useState(0);
  const [lightboxIdx, setLightboxIdx]   = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  
  const currentData = YEAR_DATA[year] || YEAR_DATA[2025];
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
            <span className="ga-hero-badge">{currentData.heroBadge}</span>
            <h1 className="ga-hero-title">
              CEAP NCR<br /><em>General Assembly</em>
            </h1>
            <p className="ga-hero-theme">
              {currentData.theme}
            </p>
            <p className="ga-hero-desc">
              {currentData.desc}
            </p>
            <div className="ga-hero-meta">
              <span><Icon.Calendar /> {currentData.dateStartEnd}</span>
              <span><Icon.MapPin /> {currentData.location}</span>
              <span><Icon.Users /> {currentData.delegates}</span>
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

      {/* ── SECTIONS (Not rendered if upcoming) ─ */}
      {!currentData.isUpcoming && (
        <>
          {/* ── ABOUT / OVERVIEW ─────────────────── */}
          <section className="ga-section">
            <div className="ga-section-inner">
          <div className="ga-overview-grid">
            <div>
              <p className="section-label">About the Assembly</p>
              <h2 className="section-title ga-reveal">A Landmark Gathering for Catholic Education</h2>
              <p className="section-body ga-reveal">
                {currentData.aboutDesc1}
              </p>
              <p className="section-body ga-reveal" style={{ marginTop: "1rem" }}>
                {currentData.aboutDesc2}
              </p>
            </div>
            <div className="ga-overview-img ga-reveal">
                  <img
                    src={currentData.overviewImg}
                    alt="General Assembly overview"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="ga-overview-img-badge">
                    <Icon.Star />
                    <span>{currentData.location.split(',')[0]}</span>
                  </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KEY HIGHLIGHTS ─────────────────────── */}
      <section className="ga-section ga-section--alt">
        <div className="ga-section-inner">
          <p className="section-label section-label--light ga-reveal">Objectives of the Assembly</p>
          <h2 className="section-title section-title--light ga-reveal">Key Highlights</h2>
          <div className="ga-highlights-list">
            {currentData.highlights.map(({ label, desc }) => (
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
            A full three-day program — from the opening Mass and keynote addresses to concurrent sessions, plenary discussions, and the commissioning and sending-forth of newly elected trustees.
          </p>

          {/* Day Tabs */}
          <div className="ga-day-tabs">
            {currentData.programDays.map((d, i) => (
              <button
                key={d.day}
                className={`ga-day-tab ${activeDay === i ? "ga-day-tab--active" : ""}`}
                onClick={() => setActiveDay(i)}
                style={{ "--tab-color": d.color }}
              >
                <span className="ga-day-tab-day">{d.day}</span>
                <span className="ga-day-tab-theme">{d.theme}</span>
                {d.subTheme && <span className="ga-day-tab-subtheme">{d.subTheme}</span>}
              </button>
            ))}
          </div>

          {/* Sessions */}
          {currentData.programDays[activeDay] && (
          <div className="ga-program-panel">
            <div className="ga-program-header">
              <h3>{currentData.programDays[activeDay].date}</h3>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.25rem" }}>
                <span
                  className="ga-program-theme-badge"
                  style={{ background: currentData.programDays[activeDay].color }}
                >
                  {currentData.programDays[activeDay].theme}
                </span>
                {currentData.programDays[activeDay].subTheme && (
                  <span style={{ fontSize: "0.75rem", color: "#888", fontStyle: "italic" }}>
                    {currentData.programDays[activeDay].subTheme}
                  </span>
                )}
              </div>
            </div>
            <div className="ga-program-sessions">
              {currentData.programDays[activeDay].sessions.map((s, i) => (
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
          )}
        </div>
      </section>

      {/* ── SPEAKERS ──────────────────────────── */}
      <section className="ga-section ga-section--navy">
        <div className="ga-section-inner">
          <p className="section-label section-label--light ga-reveal">Resource Persons</p>
          <h2 className="section-title section-title--light ga-reveal">Speakers &amp; Panelists</h2>
          <div className="ga-speakers-grid">
            {currentData.speakers && currentData.speakers.length > 0 ? (
              currentData.speakers.map((s) => (
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
              ))
            ) : (
              <p style={{ gridColumn: "1 / -1", textAlign: "center", fontStyle: "italic", color: "var(--navy-light)" }}>
                Speakers list will be updated soon.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── VIDEO SECTION ─────────────────────── */}
      <section className="ga-section">
        <div className="ga-section-inner">
          <p className="section-label ga-reveal">Official Recap</p>
          <h2 className="section-title ga-reveal">
            {currentData.isUpcoming ? "Highlights & Teasers" : "3-Day Highlights Video"}
          </h2>
          <p className="section-body ga-reveal">
            {currentData.isUpcoming 
              ? "We are preparing exciting coverages for the 2026 General Assembly. Stay tuned for teasers and updates!"
              : "Watch the official three-day highlights video of the CEAP NCR General Assembly, capturing the energy, talks, and fellowship of the entire event. Available now on the CEAP NCR Facebook page."}
          </p>

          <div className="ga-video-grid">
                {/* Main video */}
                <div className="ga-video-main ga-reveal">
                  <div className="ga-video-thumb">
                    <img
                      src={currentData.overviewImg}
                      alt="Highlights Video"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="ga-video-overlay">
                      <div className="ga-play-btn">
                        <Icon.Play />
                      </div>
                      <div className="ga-video-info">
                        <h3>{currentData.videoTitle}</h3>
                        <p>{currentData.videoDate}</p>
                      </div>
                    </div>
                  </div>
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
            {currentData.galleryDesc}
          </p>

          <div className="ga-gallery-grid">
            {currentData.gallery.map((img, i) => (
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

          </div>
        </section>
      </>
    )}

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
                Championing Catholic education in the National Capital Region since 1941 — uniting
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

      {/* ── LIGHTBOX ──────────────────────────── */}
      {lightboxIdx !== null && (
        <Lightbox
          images={currentData.gallery}
          activeIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx((lightboxIdx - 1 + currentData.gallery.length) % currentData.gallery.length)}
          onNext={() => setLightboxIdx((lightboxIdx + 1) % currentData.gallery.length)}
        />
      )}
    </div>
  );
}