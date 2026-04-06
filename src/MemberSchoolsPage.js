import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import logo from "./images/logo.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────
   SVG ICONS (subset reused from App.js)
───────────────────────────────────────── */
const Icon = {
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
  ArrowLeft: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  ),
  GraduationCap: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  Building: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
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
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  Youtube: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  ),
  Send: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
};

/* ─────────────────────────────────────────
   FULL MEMBER SCHOOLS DATA
───────────────────────────────────────── */
const MEMBER_SCHOOLS = [
  // ── Diocese of Antipolo
  { name: "Assumption Antipolo, Inc.",                                diocese: "Diocese of Antipolo" },
  { name: "Binangonan Catholic College",                              diocese: "Diocese of Antipolo" },
  { name: "Cainta Catholic College",                                  diocese: "Diocese of Antipolo" },
  { name: "College of San Benildo-Rizal Foundation, Inc.",            diocese: "Diocese of Antipolo" },
  { name: "Daughters of St. Dominic School",                          diocese: "Diocese of Antipolo" },
  { name: "Don Antonio de Zuzuarregui Sr. Memorial Academy, Inc.",    diocese: "Diocese of Antipolo" },
  { name: "Infant Jesus Academy, Inc.",                               diocese: "Diocese of Antipolo" },
  { name: "La Salle College Antipolo",                                diocese: "Diocese of Antipolo" },
  { name: "Lorenzo Ruiz de Manila School",                            diocese: "Diocese of Antipolo" },
  { name: "Marikina Catholic School",                                 diocese: "Diocese of Antipolo" },
  { name: "Marist College, Inc.",                                     diocese: "Diocese of Antipolo" },
  { name: "Mother of Divine Providence School",                       diocese: "Diocese of Antipolo" },
  { name: "Our Lady of Peace School, Inc.",                           diocese: "Diocese of Antipolo" },
  { name: "Padre Annibale School (Marikina City), Inc.",              diocese: "Diocese of Antipolo" },
  { name: "Passionist Sisters' School (Marikina), Inc.",             diocese: "Diocese of Antipolo" },
  { name: "San Francisco Parish School, Inc.",                        diocese: "Diocese of Antipolo" },
  { name: "San Lorenzo Ruiz de Manila School of Marikina, Inc.",      diocese: "Diocese of Antipolo" },
  { name: "Siena College of Taytay, Inc.",                            diocese: "Diocese of Antipolo" },
  { name: "St. Camillus College Seminary",                            diocese: "Diocese of Antipolo" },
  { name: "St. Joseph's College of Rodriguez, Inc.",                 diocese: "Diocese of Antipolo" },
  { name: "St. Scholastica's Academy",                               diocese: "Diocese of Antipolo" },
  { name: "Virgen del Pilar School Rodriguez, Inc.",                  diocese: "Diocese of Antipolo" },

  // ── Diocese of Cubao
  { name: "Ateneo de Manila University, Inc.",                        diocese: "Diocese of Cubao" },
  { name: "Claret School of Quezon City",                             diocese: "Diocese of Cubao" },
  { name: "Colegio de San Lorenzo, Inc.",                             diocese: "Diocese of Cubao" },
  { name: "Daughters of Dominic School, Inc.",                        diocese: "Diocese of Cubao" },
  { name: "Divine Word Mission Seminary",                             diocese: "Diocese of Cubao" },
  { name: "DML Montessori School of Quezon City, Inc.",               diocese: "Diocese of Cubao" },
  { name: "Holy Family Parochial School",                             diocese: "Diocese of Cubao" },
  { name: "Holy Family School of Quezon City, Inc.",                  diocese: "Diocese of Cubao" },
  { name: "Holy Spirit School, Inc.",                                 diocese: "Diocese of Cubao" },
  { name: "Immaculate Conception Cathedral School",                   diocese: "Diocese of Cubao" },
  { name: "Immaculate Heart of Mary College, Inc.",                   diocese: "Diocese of Cubao" },
  { name: "Lourdes School, Inc.",                                     diocese: "Diocese of Cubao" },
  { name: "Mater Carmeli School",                                     diocese: "Diocese of Cubao" },
  { name: "Miriam College Foundation, Inc.",                          diocese: "Diocese of Cubao" },
  { name: "Our Lady of Hope Parochial School",                        diocese: "Diocese of Cubao" },
  { name: "Our Lady of the Sacred Heart School",                      diocese: "Diocese of Cubao" },
  { name: "Saint Pedro Poveda College",                               diocese: "Diocese of Cubao" },
  { name: "Siena College Inc.",                                       diocese: "Diocese of Cubao" },
  { name: "St. Bridget's School, Inc.",                              diocese: "Diocese of Cubao" },
  { name: "St. Ignatius School",                                      diocese: "Diocese of Cubao" },
  { name: "St. Joseph Catholic School",                               diocese: "Diocese of Cubao" },
  { name: "St. Joseph's College of Quezon City",                     diocese: "Diocese of Cubao" },
  { name: "St. Mary's College, Inc.",                                diocese: "Diocese of Cubao" },
  { name: "St. Paul University Quezon City, Inc.",                    diocese: "Diocese of Cubao" },
  { name: "St. Theresa's College, Quezon City",                      diocese: "Diocese of Cubao" },
  { name: "St. Vincent's School of Theology",                        diocese: "Diocese of Cubao" },
  { name: "Sta. Rafaela Maria School of Quezon City",                 diocese: "Diocese of Cubao" },
  { name: "Stella Maris College",                                     diocese: "Diocese of Cubao" },
  { name: "Sto. Niño Parochial School, Inc.",                         diocese: "Diocese of Cubao" },
  { name: "UST Angelicum College, Inc.",                              diocese: "Diocese of Cubao" },

  // ── Diocese of Kalookan
  { name: "De La Salle - Araneta University",                         diocese: "Diocese of Kalookan" },
  { name: "Holy Rosary College Foundation, Inc.",                     diocese: "Diocese of Kalookan" },
  { name: "Immaculate Conception Parochial School",                   diocese: "Diocese of Kalookan" },
  { name: "La Consolacion College Valenzuela",                        diocese: "Diocese of Kalookan" },
  { name: "La Consolacion College, Inc.",                             diocese: "Diocese of Kalookan" },
  { name: "Notre Dame of Greater Manila, Inc.",                       diocese: "Diocese of Kalookan" },
  { name: "San Jose Academy, Inc.",                                   diocese: "Diocese of Kalookan" },
  { name: "St. Gabriel Academy",                                      diocese: "Diocese of Kalookan" },
  { name: "St. James Academy",                                        diocese: "Diocese of Kalookan" },
  { name: "St. Mary's Academy of Caloocan City, Inc.",               diocese: "Diocese of Kalookan" },

  // ── Diocese of Malolos
  { name: "San Diego Parochial School, Inc.",                         diocese: "Diocese of Malolos" },

  // ── Archdiocese of Manila
  { name: "Adamson University",                                       diocese: "Archdiocese of Manila" },
  { name: "Aquinas School",                                           diocese: "Archdiocese of Manila" },
  { name: "Asian Social Institute",                                   diocese: "Archdiocese of Manila" },
  { name: "Assumption College, Inc.",                                 diocese: "Archdiocese of Manila" },
  { name: "Blessed Elena Academy, Inc.",                              diocese: "Archdiocese of Manila" },
  { name: "Colegio de San Juan de Letran",                            diocese: "Archdiocese of Manila" },
  { name: "Colegio de Sta. Rosa",                                     diocese: "Archdiocese of Manila" },
  { name: "Colegio de Sta. Rosa - Makati",                            diocese: "Archdiocese of Manila" },
  { name: "Colegio San Agustin Makati",                               diocese: "Archdiocese of Manila" },
  { name: "College of the Holy Spirit of Manila",                     diocese: "Archdiocese of Manila" },
  { name: "Concordia College",                                        diocese: "Archdiocese of Manila" },
  { name: "De La Salle - College of St. Benilde",                     diocese: "Archdiocese of Manila" },
  { name: "De La Salle University",                                   diocese: "Archdiocese of Manila" },
  { name: "Dominican School Inc.",                                    diocese: "Archdiocese of Manila" },
  { name: "Don Bosco School (Salesian Sisters), Inc.",                diocese: "Archdiocese of Manila" },
  { name: "Don Bosco Technical College, Inc.",                        diocese: "Archdiocese of Manila" },
  { name: "Don Bosco Technical Institute of Makati, Inc.",            diocese: "Archdiocese of Manila" },
  { name: "Espiritu Santo Parochial School of Manila, Inc.",          diocese: "Archdiocese of Manila" },
  { name: "Guadalupe Catholic School",                                diocese: "Archdiocese of Manila" },
  { name: "Holy Child Catholic School, Inc.",                         diocese: "Archdiocese of Manila" },
  { name: "Holy Trinity Academy",                                     diocese: "Archdiocese of Manila" },
  { name: "Immaculate Conception Academy of Manila",                  diocese: "Archdiocese of Manila" },
  { name: "Immaculate Conception Academy of San Juan Inc.",           diocese: "Archdiocese of Manila" },
  { name: "La Consolacion College Manila",                            diocese: "Archdiocese of Manila" },
  { name: "La Salle Greenhills",                                      diocese: "Archdiocese of Manila" },
  { name: "Lourdes School of Mandaluyong",                            diocese: "Archdiocese of Manila" },
  { name: "Malate Catholic School",                                   diocese: "Archdiocese of Manila" },
  { name: "Manila Archdiocesan Seminary System Foundation, Inc.",     diocese: "Archdiocese of Manila" },
  { name: "Manila Cathedral College",                                 diocese: "Archdiocese of Manila" },
  { name: "Nazareth School of National University",                   diocese: "Archdiocese of Manila" },
  { name: "Paco Catholic School, Inc.",                               diocese: "Archdiocese of Manila" },
  { name: "Perpetual Help College of Manila",                         diocese: "Archdiocese of Manila" },
  { name: "Saint Francis School",                                     diocese: "Archdiocese of Manila" },
  { name: "Saint Rita College - Manila, Inc.",                        diocese: "Archdiocese of Manila" },
  { name: "San Beda University",                                      diocese: "Archdiocese of Manila" },
  { name: "San Carlos Seminary",                                      diocese: "Archdiocese of Manila" },
  { name: "San Felipe Neri Parochial School, Inc.",                   diocese: "Archdiocese of Manila" },
  { name: "San Isidro Catholic School",                               diocese: "Archdiocese of Manila" },
  { name: "San Juan de Dios Educational Foundation, Inc.",            diocese: "Archdiocese of Manila" },
  { name: "San Juan Nepomuceno School, Inc.",                         diocese: "Archdiocese of Manila" },
  { name: "San Sebastian College-Recoletos, Inc.",                    diocese: "Archdiocese of Manila" },
  { name: "Santa Isabel College of Manila",                           diocese: "Archdiocese of Manila" },
  { name: "St. Anthony School",                                       diocese: "Archdiocese of Manila" },
  { name: "St. Joseph School of Gagalangin, Inc.",                    diocese: "Archdiocese of Manila" },
  { name: "St. Joseph School of Pandacan",                            diocese: "Archdiocese of Manila" },
  { name: "St. Jude Catholic School, Inc.",                           diocese: "Archdiocese of Manila" },
  { name: "St. Mary of the Woods School",                             diocese: "Archdiocese of Manila" },
  { name: "St. Mary's Academy Manila",                               diocese: "Archdiocese of Manila" },
  { name: "St. Mary's Academy of Pasay City, Inc.",                  diocese: "Archdiocese of Manila" },
  { name: "St. Mary's Academy of Sta. Ana, Manila, Inc.",            diocese: "Archdiocese of Manila" },
  { name: "St. Paul College of Makati, Inc.",                         diocese: "Archdiocese of Manila" },
  { name: "St. Paul University Manila",                               diocese: "Archdiocese of Manila" },
  { name: "St. Peter the Apostle School",                             diocese: "Archdiocese of Manila" },
  { name: "St. Scholastica's College, Inc.",                         diocese: "Archdiocese of Manila" },
  { name: "St. Therese of the Child Jesus of the Holy Face School",   diocese: "Archdiocese of Manila" },
  { name: "Sta. Catalina College, Inc.",                              diocese: "Archdiocese of Manila" },
  { name: "Sta. Clara Parish School, Inc.",                           diocese: "Archdiocese of Manila" },
  { name: "The Nazarene Catholic School",                             diocese: "Archdiocese of Manila" },
  { name: "University of Santo Tomas",                                diocese: "Archdiocese of Manila" },
  { name: "Xavier School, Inc.",                                      diocese: "Archdiocese of Manila" },

  // ── Diocese of Novaliches
  { name: "Blessed Sacrament Catholic School",                        diocese: "Diocese of Novaliches" },
  { name: "Colegio de San Bartolome de Novaliches",                   diocese: "Diocese of Novaliches" },
  { name: "Good Shepherd Cathedral School",                           diocese: "Diocese of Novaliches" },
  { name: "Immaculate Mother School, Quezon City Inc.",               diocese: "Diocese of Novaliches" },
  { name: "Ina ng Buhay Catholic School, Inc.",                       diocese: "Diocese of Novaliches" },
  { name: "La Consolacion College Novaliches",                        diocese: "Diocese of Novaliches" },
  { name: "Mater Carmeli School of Novaliches, Quezon City, Inc.",    diocese: "Diocese of Novaliches" },
  { name: "Mercedarian School, Inc.",                                 diocese: "Diocese of Novaliches" },
  { name: "Mother of Life Center",                                    diocese: "Diocese of Novaliches" },
  { name: "Mother of Mercy Learning Center",                          diocese: "Diocese of Novaliches" },
  { name: "Our Lady of Lourdes Catholic School, Inc.",                diocese: "Diocese of Novaliches" },
  { name: "Our Lady of the Angels Seminary",                          diocese: "Diocese of Novaliches" },
  { name: "Pledge of Love School",                                    diocese: "Diocese of Novaliches" },
  { name: "Sacred Heart Academy of Novaliches, Inc.",                 diocese: "Diocese of Novaliches" },
  { name: "School of Saint Anthony, Inc.",                            diocese: "Diocese of Novaliches" },
  { name: "School of the Holy Spirit of Quezon City",                 diocese: "Diocese of Novaliches" },
  { name: "St. Francis Xavier Catholic School",                       diocese: "Diocese of Novaliches" },
  { name: "Sto. Niño de Novaliches School, Inc.",                     diocese: "Diocese of Novaliches" },

  // ── Diocese of Parañaque
  { name: "De La Salle Santiago Zobel School",                        diocese: "Diocese of Parañaque" },
  { name: "Divine Light Academy, Inc.",                               diocese: "Diocese of Parañaque" },
  { name: "Don Carlo Cavina School",                                  diocese: "Diocese of Parañaque" },
  { name: "Father Donato Giannotti Foundation, Inc.",                 diocese: "Diocese of Parañaque" },
  { name: "Fr. Angelico Lipani School",                               diocese: "Diocese of Parañaque" },
  { name: "Fr. Simpliciano Academy, Inc.",                            diocese: "Diocese of Parañaque" },
  { name: "Immaculate Heart of Mary College Parañaque, Inc.",         diocese: "Diocese of Parañaque" },
  { name: "Madre Maria Pia Notari School, Inc.",                      diocese: "Diocese of Parañaque" },
  { name: "Manresa School, Inc.",                                     diocese: "Diocese of Parañaque" },
  { name: "Mary Cause of Our Joy Catholic School",                    diocese: "Diocese of Parañaque" },
  { name: "Mary Immaculate Parish Special School",                    diocese: "Diocese of Parañaque" },
  { name: "Mary Immaculate School (Parañaque), Inc.",                 diocese: "Diocese of Parañaque" },
  { name: "Sacred Heart School",                                      diocese: "Diocese of Parañaque" },
  { name: "San Beda College Alabang, Inc.",                           diocese: "Diocese of Parañaque" },
  { name: "St. Andrew's School, Inc.",                               diocese: "Diocese of Parañaque" },
  { name: "St. Joseph's Academy of Las Piñas, Inc.",                 diocese: "Diocese of Parañaque" },
  { name: "St. Paul College of Parañaque",                            diocese: "Diocese of Parañaque" },
  { name: "Sta. Rita de Cascia Parochial School",                     diocese: "Diocese of Parañaque" },
  { name: "University of Perpetual Help System Dalta - Las Piñas",    diocese: "Diocese of Parañaque" },
  { name: "Ville St. John Academy, Inc.",                             diocese: "Diocese of Parañaque" },
  { name: "Virgin Mary Immaculate School, Inc.",                      diocese: "Diocese of Parañaque" },

  // ── Diocese of Pasig
  { name: "Academia de San Bartolome de Taguig",                      diocese: "Diocese of Pasig" },
  { name: "Bicutan Parochial School, Inc.",                           diocese: "Diocese of Pasig" },
  { name: "Colegio de Santa Ana, Inc.",                               diocese: "Diocese of Pasig" },
  { name: "Colegio del Buen Consejo, Inc.",                           diocese: "Diocese of Pasig" },
  { name: "Escuela Catolica de San Sebastian, Inc.",                  diocese: "Diocese of Pasig" },
  { name: "Everest International Academy Inc.",                       diocese: "Diocese of Pasig" },
  { name: "Holy Family Parochial School of Kapitolyo, Inc.",          diocese: "Diocese of Pasig" },
  { name: "La Consolacion College Pasig",                             diocese: "Diocese of Pasig" },
  { name: "Our Lady of the Poor Catholic School Inc.",                diocese: "Diocese of Pasig" },
  { name: "Pasig Catholic College",                                   diocese: "Diocese of Pasig" },
  { name: "Pateros Catholic School",                                  diocese: "Diocese of Pasig" },
  { name: "St. Paul College Pasig, Inc.",                             diocese: "Diocese of Pasig" },
  { name: "Sta. Rosa Catholic School, Inc.",                          diocese: "Diocese of Pasig" },
  { name: "Sto. Niño Catholic School, Inc.",                          diocese: "Diocese of Pasig" },
  { name: "Sto. Niño Parish School, Inc.",                            diocese: "Diocese of Pasig" },
  { name: "Sto. Tomas de Villanueva Parochial School, Inc.",          diocese: "Diocese of Pasig" },
  { name: "Tipas Catholic School, Inc.",                              diocese: "Diocese of Pasig" },
];

const DIOCESE_FILTERS = [
  "All Dioceses",
  "Archdiocese of Manila",
  "Diocese of Antipolo",
  "Diocese of Cubao",
  "Diocese of Kalookan",
  "Diocese of Malolos",
  "Diocese of Novaliches",
  "Diocese of Parañaque",
  "Diocese of Pasig",
];

const dioceseColors = {
  "Archdiocese of Manila": { bg: "rgba(26,31,110,0.07)",  color: "#1a1f6e" },
  "Diocese of Antipolo":   { bg: "rgba(140,80,20,0.09)",  color: "#7a4a12" },
  "Diocese of Cubao":      { bg: "rgba(201,168,76,0.12)", color: "#7a5e18" },
  "Diocese of Kalookan":   { bg: "rgba(160,40,80,0.09)",  color: "#8a1e44" },
  "Diocese of Malolos":    { bg: "rgba(80,140,60,0.09)",  color: "#3a7020" },
  "Diocese of Novaliches": { bg: "rgba(30,120,80,0.09)",  color: "#1a6644" },
  "Diocese of Parañaque":  { bg: "rgba(20,110,130,0.09)", color: "#145c72" },
  "Diocese of Pasig":      { bg: "rgba(60,80,200,0.09)",  color: "#2d3aaa" },
};

const NAV_LINKS = ["Home", "About", "Events", "General Assembly", "Member Schools", "Contact"];




/* ─────────────────────────────────────────
   MEMBER SCHOOLS PAGE
───────────────────────────────────────── */
export default function MemberSchoolsPage({ onBack, onNavigate }) {
  const [search, setSearch]         = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone]   = useState(false);
  const [nlLoading, setNlLoading] = useState(false);
  const [nlError, setNlError]     = useState("");
  const [dioceseFilter, setDioceseFilter] = useState("All Dioceses");
  const gridRef = useRef(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // GSAP — hero + cards on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ms-hero-content",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
      gsap.fromTo(".ms-stats-item",
        { y: 30, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: "back.out(1.4)", delay: 0.3 }
      );
    });
    return () => ctx.revert();
  }, []);

  // Re-animate cards on filter/search change
  useEffect(() => {
    const cards = gsap.utils.toArray(".school-card");
    if (!cards.length) return;
    gsap.fromTo(cards,
      { y: 24, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: { amount: 0.5 }, ease: "power2.out" }
    );
  }, [search, dioceseFilter]);

  const filtered = MEMBER_SCHOOLS
    .filter((s) => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
      const matchDioc   = dioceseFilter === "All Dioceses" || s.diocese === dioceseFilter;
      return matchSearch && matchDioc;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const counts = {
    total: filtered.length,
  };

  const clearFilters = () => {
    setSearch("");
    setDioceseFilter("All Dioceses");
  };

  const hasActiveFilters = search || dioceseFilter !== "All Dioceses";

  const handleNewsletter = (e) => {
    e.preventDefault();
    setNlError("");
    setNlLoading(true);
    setTimeout(() => {
      try {
        setNewsletterDone(true);
        setNewsletterEmail("");
      } catch {
        setNlError("Something went wrong. Please try again.");
      } finally {
        setNlLoading(false);
      }
    }, 800);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--off-white)", fontFamily: "var(--font-body)" }}>
      <Navbar
        activeLink="Member Schools"
        onNavigate={(link) => {
          if (link === "Member Schools") return;
          onNavigate?.(link);
        }}
      />

      {/* ── HERO ─────────────────────────────── */}
      <section style={{
        background: "linear-gradient(160deg, var(--navy-dark) 0%, var(--navy) 55%, var(--navy-mid) 100%)",
        padding: "0",
        paddingTop: "var(--nav-height)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)",
          pointerEvents: "none",
        }} />
        {/* Orb */}
        <div style={{
          position: "absolute", width: 500, height: 500,
          right: -120, top: -80, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(46,52,190,0.28) 0%, transparent 70%)",
          animation: "floatA 24s ease-in-out infinite",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", width: 320, height: 320,
          left: -60, bottom: -40, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.11) 0%, transparent 70%)",
          animation: "floatB 30s ease-in-out infinite",
          pointerEvents: "none",
        }} />

        <div className="ms-hero-content" style={{
          maxWidth: 1320, margin: "0 auto", padding: "5rem 2rem 4rem",
          position: "relative", zIndex: 2,
        }}>

          <p style={{
            fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.28em",
            textTransform: "uppercase", color: "var(--gold-light)",
            display: "flex", alignItems: "center", gap: 10, marginBottom: "0.9rem",
          }}>
            Our Network
            <span style={{ width: 36, height: 1, background: "var(--gold-light)", display: "inline-block" }} />
          </p>
          <h1 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
            fontWeight: 800, color: "white", lineHeight: 1.08, marginBottom: "1rem",
          }}>
            Member 
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}> Schools</em>
          </h1>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "1rem",
            color: "rgba(255,255,255,0.65)", maxWidth: 560, lineHeight: 1.85, marginBottom: "3rem",
          }}>
            Discover the 179 Catholic educational institutions united under CEAP NCR — serving learners
            across Metro Manila and Rizal Province in faith, excellence, and service.
          </p>

          {/* Stats strip */}
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {[
              { value: "179", label: "Member Schools", icon: <Icon.GraduationCap /> },
              { value: "8",    label: "Arch/Dioceses",  icon: <Icon.Building /> },
              { value: "15",   label: "Cities & Municipalities", icon: <Icon.MapPin /> },
            ].map(({ value, label, icon }) => (
              <div key={label} className="ms-stats-item" style={{
                display: "flex", alignItems: "center", gap: 12,
                background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.12)", borderRadius: "var(--radius-md)",
                padding: "1rem 1.5rem",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "var(--radius-sm)",
                  background: "rgba(201,168,76,0.2)", color: "var(--gold)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ width: 18, height: 18 }}>{icon}</span>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 700, color: "white", lineHeight: 1 }}>{value}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "rgba(255,255,255,0.55)", marginTop: 2, letterSpacing: "0.05em" }}>{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEARCH & FILTER BAR ───────────────── */}
      <div style={{
        background: "white", borderBottom: "1px solid var(--border)",
        position: "sticky", top: "var(--nav-height)", zIndex: 100,
        boxShadow: "0 2px 20px rgba(26,31,110,0.07)",
      }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "1.25rem 2rem", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>

          {/* Search input */}
          <div style={{ position: "relative", flex: "1 1 260px", minWidth: 200 }}>
            <span style={{
              position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
              width: 16, height: 16, color: "var(--text-muted)", pointerEvents: "none",
            }}>
              <Icon.Search />
            </span>
            <input
              type="text"
              placeholder="Search schools…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: "100%", padding: "10px 14px 10px 42px",
                border: "1.5px solid var(--border)", borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--text)",
                background: "var(--surface)", outline: "none", transition: "border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor = "var(--navy)"}
              onBlur={e => e.target.style.borderColor = "var(--border)"}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{
                  position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--text-muted)", width: 18, height: 18, padding: 0,
                }}
              >
                <Icon.X />
              </button>
            )}
          </div>

          {/* Diocese filter */}
          <div style={{ position: "relative", flex: "1 1 200px", minWidth: 180 }}>
            <select
              value={dioceseFilter}
              onChange={e => setDioceseFilter(e.target.value)}
              style={{
                width: "100%", padding: "10px 36px 10px 14px",
                border: "1.5px solid var(--border)", borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--text)",
                background: "var(--surface)", outline: "none", cursor: "pointer",
                appearance: "none", WebkitAppearance: "none", transition: "border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor = "var(--navy)"}
              onBlur={e => e.target.style.borderColor = "var(--border)"}
            >
              {DIOCESE_FILTERS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <span style={{
              position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
              width: 16, height: 16, color: "var(--text-muted)", pointerEvents: "none",
            }}>
              <Icon.ChevronDown />
            </span>
          </div>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "rgba(220,53,69,0.08)", border: "1px solid rgba(220,53,69,0.2)",
                color: "#c0392b", borderRadius: "var(--radius-sm)",
                padding: "8px 14px", cursor: "pointer", fontFamily: "var(--font-body)",
                fontSize: "0.75rem", fontWeight: 500, transition: "all 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(220,53,69,0.14)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(220,53,69,0.08)"}
            >
              <span style={{ width: 13, height: 13 }}><Icon.X /></span>
              Clear
            </button>
          )}
        </div>

        {/* Results count bar */}
        <div style={{
          borderTop: "1px solid var(--border)", padding: "0.6rem 2rem",
          display: "flex", alignItems: "center", gap: "1.5rem",
          maxWidth: 1320, margin: "0 auto", flexWrap: "wrap",
        }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            <strong style={{ color: "var(--navy)" }}>{counts.total}</strong> school{counts.total !== 1 ? "s" : ""} found
          </span>
        </div>
      </div>

      {/* ── SCHOOLS GRID ─────────────────────── */}
      <section style={{ padding: "3rem 2rem 6rem" }}>
        <div ref={gridRef} style={{ maxWidth: 1320, margin: "0 auto" }}>

          {/* Diocese grouping when a specific diocese is selected */}
          {dioceseFilter !== "All Dioceses" ? (
            <>
              <div style={{
                display: "flex", alignItems: "center", gap: 12, marginBottom: "2rem",
              }}>
                <span style={{
                  padding: "4px 16px", borderRadius: 99,
                  background: dioceseColors[dioceseFilter]?.bg || "rgba(26,31,110,0.08)",
                  color: dioceseColors[dioceseFilter]?.color || "var(--navy)",
                  fontFamily: "var(--font-body)", fontSize: "0.72rem",
                  fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                }}>
                  {dioceseFilter}
                </span>
                <span style={{ width: "100%", height: 1, background: "var(--border)" }} />
              </div>
              <SchoolGrid schools={filtered} />
            </>
          ) : (
            /* Group by diocese when "All Dioceses" */
            DIOCESE_FILTERS.slice(1).map(diocese => {
              const dioceseSchools = filtered.filter(s => s.diocese === diocese);
              if (!dioceseSchools.length) return null;
              return (
                <div key={diocese} style={{ marginBottom: "3.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
                    <span style={{
                      padding: "4px 16px", borderRadius: 99, flexShrink: 0,
                      background: dioceseColors[diocese]?.bg || "rgba(26,31,110,0.08)",
                      color: dioceseColors[diocese]?.color || "var(--navy)",
                      fontFamily: "var(--font-body)", fontSize: "0.72rem",
                      fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                    }}>
                      {diocese}
                    </span>
                    <span style={{ flex: 1, height: 1, background: "var(--border)" }} />
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--text-muted)", flexShrink: 0 }}>
                      {dioceseSchools.length} school{dioceseSchools.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <SchoolGrid schools={dioceseSchools} />
                </div>
              );
            })
          )}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div style={{
              textAlign: "center", padding: "5rem 2rem",
              color: "var(--text-muted)", fontFamily: "var(--font-body)",
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem", opacity: 0.4 }}>🔍</div>
              <p style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--text)", marginBottom: "0.5rem" }}>
                No schools found
              </p>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                Try adjusting your search or filters.
              </p>
              <button className="btn-primary" onClick={clearFilters}>Clear Filters</button>
            </div>
          )}
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
                    <button className="footer-bottom-link" style={{ fontSize: "0.85rem" }} onClick={() => onNavigate?.(l)}>{l}</button>
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
    </div>
  );
}

/* ── Helper: school grid ── */
function SchoolGrid({ schools }) {
  return (
    <div className="schools-grid">
      {schools.map((s) => (
        <SchoolCard key={s.name} school={s} />
      ))}
    </div>
  );
}

/* ── Helper: school card ── */
function SchoolCard({ school: s }) {
  const dc = dioceseColors[s.diocese] || {};
  return (
    <div className="school-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.8rem" }}>
        <div className="school-initial">{s.name[0]}</div>
        <span style={{
          padding: "3px 10px", borderRadius: 99,
          background: dc.bg || "rgba(26,31,110,0.07)",
          color: dc.color || "var(--navy)",
          fontFamily: "var(--font-body)", fontSize: "0.6rem",
          fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
          textAlign: "right", lineHeight: 1.4, maxWidth: 120,
        }}>
          {s.diocese.replace("Archdiocese of ", "Archd. ").replace("Diocese of ", "")}
        </span>
      </div>
      <div className="school-name">{s.name}</div>
      <div className="school-loc">
        <Icon.MapPin />
        {s.diocese}
      </div>
    </div>
  );
}