import React, { useState, useEffect, useRef } from 'react';
import {
  Wifi,
  Zap,
  Phone,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Tv,
  Film,
  Download,
  Upload,
  Clock,
  MapPin,
  CreditCard,
  Search,
  Sparkles,
  Headphones,
  MessageSquare,
  Send,
  Star,
  Gift,
  Gauge,
  Activity,
  Award,
  Menu,
  X,
  Users,
  Gamepad2,
  Globe
} from 'lucide-react';

import hero1Img from './image/hero 1 update.png';
import hero2Img from './image/hero-2.jpg';
import hero3Img from './image/hero-3.jpg';
import { translations } from './translations';

// Reusable Viewport Visibility Hook (Triggers Once on Scroll)
function useInView(options = { threshold: 0.12, rootMargin: '0px' }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: options.threshold ?? 0.12,
        rootMargin: options.rootMargin ?? '0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return [ref, inView];
}

// Sub-component for individual Feature Card with responsive viewport trigger
function FeatureCardItem({ card, isSectionInView }) {
  const [cardRef, isCardInView] = useInView({ threshold: 0.12 });

  return (
    <div
      ref={cardRef}
      className={`group relative bg-[#fbfbfe] hover:bg-white border border-slate-200/90 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out text-left cursor-default ${card.cardBorder} ${
        isSectionInView ? card.desktopAnimClass : 'md:opacity-0'
      } ${
        isCardInView ? 'section-card-mobile-rise' : 'max-md:opacity-0'
      }`}
    >
      {/* Icon Box with Interactive Hover State */}
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ease-out shadow-sm ${card.iconDefault} ${card.iconHover}`}
      >
        {React.createElement(card.icon, {
          className: "w-6 h-6 flex-shrink-0 transition-transform duration-300 ease-out group-hover:scale-110"
        })}
      </div>

      {/* Card Title */}
      <h3 className={`text-lg font-bold text-slate-900 mb-2 transition-colors duration-200 ${card.titleHover}`}>
        {card.title}
      </h3>

      {/* Card Description */}
      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed [text-wrap:balance]">
        {card.description}
      </p>
    </div>
  );
}

export default function App() {
  // Language State with Persistent LocalStorage
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('bagnibari_lang') || 'bn';
    } catch (e) {
      return 'bn';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bagnibari_lang', lang);
    } catch (e) {}
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang] || translations.en;

  // Mobile Drawer State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Features Section Viewport Hook for Synchronized Entrance Elevation
  const [featuresSectionRef, isFeaturesInView] = useInView({ threshold: 0.12 });

  // Slider State & Mouse Drag / Touch Swipe Support
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const wasDraggingRef = useRef(false);

  // Dynamic Slider Data based on current language
  const heroSlideMeta = [
    {
      image: hero1Img,
      badgeColor: "bg-purple-500/20 text-purple-200 border-purple-400/30",
      badgeIcon: Tv,
      buttonLink: "#packages",
      secondaryLink: "https://wa.me/8801700000000",
      kenburnsClass: "animate-kenburns-in"
    },
    {
      image: hero2Img,
      badgeColor: "bg-indigo-500/20 text-indigo-200 border-indigo-400/30",
      badgeIcon: Users,
      buttonLink: "#contact",
      secondaryLink: "#packages",
      kenburnsClass: "animate-kenburns-out"
    },
    {
      image: hero3Img,
      badgeColor: "bg-emerald-500/20 text-emerald-200 border-emerald-400/30",
      badgeIcon: Gamepad2,
      buttonLink: "#packages",
      secondaryLink: "#coverage",
      kenburnsClass: "animate-kenburns-pan"
    }
  ];

  const slides = t.hero.slides.map((s, idx) => ({
    id: idx + 1,
    ...s,
    ...heroSlideMeta[idx]
  }));

  // 1. Infinite Track Array (Last Clone + Original Slides + First Clone)
  const extendedSlides = [
    slides[slides.length - 1],
    ...slides,
    slides[0],
  ];

  // 2. Start at index 1 (which is the real first slide)
  const [trackIndex, setTrackIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Real active index (0, 1, 2) for dots & animations
  const activeRealIndex =
    trackIndex === 0
      ? slides.length - 1
      : trackIndex === extendedSlides.length - 1
        ? 0
        : trackIndex - 1;

  const goToSlide = (realIdx) => {
    setIsTransitioning(true);
    setTrackIndex(realIdx + 1);
  };

  const goToNext = () => {
    if (trackIndex >= extendedSlides.length - 1) return;
    setIsTransitioning(true);
    setTrackIndex((prev) => prev + 1);
  };

  const goToPrev = () => {
    if (trackIndex <= 0) return;
    setIsTransitioning(true);
    setTrackIndex((prev) => prev - 1);
  };

  // Seamless jump without animation when reaching clones
  const handleTrackTransitionEnd = () => {
    if (trackIndex === extendedSlides.length - 1) {
      setIsTransitioning(false);
      setTrackIndex(1);
    } else if (trackIndex === 0) {
      setIsTransitioning(false);
      setTrackIndex(slides.length);
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    wasDraggingRef.current = false;
    startXRef.current = e.clientX;
    setIsDragging(true);
    setIsPaused(true);
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const diff = e.clientX - startXRef.current;
    if (Math.abs(diff) > 6) {
      wasDraggingRef.current = true;
    }
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    setIsPaused(false);

    if (dragOffset < -50) {
      goToNext();
    } else if (dragOffset > 50) {
      goToPrev();
    }
    setDragOffset(0);
  };

  const handleMouseLeave = () => {
    if (isDraggingRef.current) {
      handleMouseUp();
    }
  };

  // Touch swipe handlers
  const handleTouchStart = (e) => {
    isDraggingRef.current = true;
    wasDraggingRef.current = false;
    startXRef.current = e.touches[0].clientX;
    setIsDragging(true);
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return;
    const diff = e.touches[0].clientX - startXRef.current;
    if (Math.abs(diff) > 6) {
      wasDraggingRef.current = true;
    }
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  // Coverage Search State
  const [searchArea, setSearchArea] = useState('');

  // Order / Contact Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    packageSelected: 'Gold Ultra (40 Mbps - ৳700/mo)',
    area: 'Bagnibari Central Bazar',
    address: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Speed Test Simulator State
  const [testingSpeed, setTestingSpeed] = useState(false);
  const [speedResult, setSpeedResult] = useState(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  // Auto Slider Effect
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      goToNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, trackIndex]);

  // Dynamic Features Cards Data with Themed Styles
  const featureMeta = [
    {
      id: 'optical-fiber',
      icon: Zap,
      cardBorder: 'hover:border-purple-300 hover:shadow-purple-500/10',
      iconDefault: 'bg-purple-50 border border-purple-100 text-purple-600',
      iconHover: 'group-hover:bg-gradient-to-tr group-hover:from-purple-600 group-hover:to-indigo-600 group-hover:text-white group-hover:shadow-purple-500/35 group-hover:rotate-3 group-hover:border-transparent',
      titleHover: 'group-hover:text-purple-600',
      desktopAnimClass: 'section-card-stagger-1'
    },
    {
      id: 'gaming',
      icon: Gamepad2,
      cardBorder: 'hover:border-blue-300 hover:shadow-blue-500/10',
      iconDefault: 'bg-blue-50 border border-blue-100 text-blue-600',
      iconHover: 'group-hover:bg-gradient-to-tr group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white group-hover:shadow-blue-500/35 group-hover:-rotate-3 group-hover:border-transparent',
      titleHover: 'group-hover:text-blue-600',
      desktopAnimClass: 'section-card-stagger-2'
    },
    {
      id: 'bdix-media',
      icon: Tv,
      cardBorder: 'hover:border-emerald-300 hover:shadow-emerald-500/10',
      iconDefault: 'bg-emerald-50 border border-emerald-100 text-emerald-600',
      iconHover: 'group-hover:bg-gradient-to-tr group-hover:from-emerald-600 group-hover:to-teal-500 group-hover:text-white group-hover:shadow-emerald-500/35 group-hover:rotate-3 group-hover:border-transparent',
      titleHover: 'group-hover:text-emerald-600',
      desktopAnimClass: 'section-card-stagger-3'
    },
    {
      id: 'local-support',
      icon: Headphones,
      cardBorder: 'hover:border-rose-300 hover:shadow-rose-500/10',
      iconDefault: 'bg-rose-50 border border-rose-100 text-rose-600',
      iconHover: 'group-hover:bg-gradient-to-tr group-hover:from-rose-600 group-hover:to-pink-500 group-hover:text-white group-hover:shadow-rose-500/35 group-hover:-rotate-3 group-hover:border-transparent',
      titleHover: 'group-hover:text-rose-600',
      desktopAnimClass: 'section-card-stagger-4'
    }
  ];

  const featureCards = t.features.cards.map((card, idx) => ({
    ...card,
    ...featureMeta[idx]
  }));

  // Dynamic Packages Data
  const packageStyles = [
    {
      id: 'silver',
      popular: false,
      color: 'border-slate-200 bg-white hover:border-purple-300',
      badgeColor: 'bg-slate-100 text-slate-700',
      tag: t.packages.starterBadge,
    },
    {
      id: 'gold',
      popular: true,
      color: 'border-purple-400 bg-gradient-to-b from-purple-50/50 to-white shadow-xl shadow-purple-500/10 ring-2 ring-purple-500/20',
      badgeColor: 'bg-purple-600 text-white shadow-sm',
      tag: t.packages.popularBadge,
    },
    {
      id: 'diamond',
      popular: false,
      color: 'border-slate-200 bg-white hover:border-indigo-300',
      badgeColor: 'bg-indigo-100 text-indigo-700',
      tag: t.packages.familyBadge,
    },
    {
      id: 'turbo',
      popular: false,
      color: 'border-slate-200 bg-white hover:border-cyan-300',
      badgeColor: 'bg-cyan-100 text-cyan-800',
      tag: t.packages.gamerBadge,
    }
  ];

  const packages = t.packages.plans.map((pkg, idx) => ({
    ...pkg,
    ...packageStyles[idx]
  }));

  // Dynamic Coverage Areas Data
  const coverageAreas = t.coverage.areas;

  const filteredAreas = coverageAreas.filter(area =>
    area.name.toLowerCase().includes(searchArea.toLowerCase()) ||
    area.landmark.toLowerCase().includes(searchArea.toLowerCase())
  );

  // Speed Test Simulation Handler
  const handleRunSpeedTest = () => {
    setTestingSpeed(true);
    setSpeedResult(null);
    setTimeout(() => {
      setSpeedResult({
        download: (Math.random() * 8 + 48).toFixed(1),
        upload: (Math.random() * 6 + 46).toFixed(1),
        ping: (Math.random() * 2 + 3).toFixed(0),
        jitter: '1 ms'
      });
      setTestingSpeed(false);
    }, 2400);
  };

  // Form Submit Handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#fafbff] text-slate-800 flex flex-col font-sans overflow-x-hidden w-full">

      {/* 1. TOP ANNOUNCEMENT STRIP (WITH PC LANGUAGE TOGGLE AS MARKED IN IMAGE 1) */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 text-white text-xs py-2 shadow-sm overflow-hidden select-none">
        <div className="content-container">

          {/* Mobile View: 1-line smooth sliding marquee ticker */}
          <div className="flex md:hidden items-center h-5 overflow-hidden">
            <div className="flex-shrink-0 z-20 pr-2">
              <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded-[3px] text-[10px] font-black flex items-center gap-1 shadow-sm uppercase tracking-wider">
                <Zap className="w-2.5 h-2.5 fill-current text-slate-950" /> {t.topbar.badgeLive}
              </span>
            </div>
            <div className="flex-1 min-w-0 overflow-hidden relative">
              <div className="animate-marquee-smooth flex items-center gap-8 text-[11px] font-medium whitespace-nowrap pl-2">
                <span>{t.topbar.announcement}</span>
                <span className="text-amber-300 font-bold">📞 {t.topbar.hotlineLabel} {t.topbar.phone}</span>
                <span>{t.topbar.offer}</span>
                {/* Duplicate for seamless infinite loop */}
                <span>{t.topbar.announcement}</span>
                <span className="text-amber-300 font-bold">📞 {t.topbar.hotlineLabel} {t.topbar.phone}</span>
                <span>{t.topbar.offer}</span>
              </div>
            </div>
          </div>

          {/* Desktop View: Clean Flex Row with Language Toggle on Right */}
          <div className="hidden md:flex justify-between items-center text-xs">
            <div className="flex items-center gap-2 font-medium">
              <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-300" /> {t.topbar.badgeNew}
              </span>
              <span>{t.topbar.announcement}</span>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5 opacity-90">
                <Clock className="w-3.5 h-3.5 text-cyan-200" />
                <span>{t.topbar.helplineLabel}</span>
              </div>
              <a href="tel:01700000000" className="font-bold text-amber-300 hover:text-white transition-colors flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" /> {t.topbar.phone}
              </a>

              {/* Language Toggle for PC (Exact location marked by user in Image 1) */}
              <div className="flex items-center bg-white/15 backdrop-blur-md p-0.5 rounded-full border border-white/25 select-none ml-1">
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all duration-200 ${
                    lang === 'en'
                      ? 'bg-white text-purple-700 shadow-sm'
                      : 'text-white/80 hover:text-white'
                  }`}
                  aria-label="Switch to English"
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLang('bn')}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all duration-200 ${
                    lang === 'bn'
                      ? 'bg-white text-purple-700 shadow-sm'
                      : 'text-white/80 hover:text-white'
                  }`}
                  aria-label="Switch to Bengali"
                >
                  বাংলা
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. STICKY LIGHT NAVBAR (WITH MOBILE LANGUAGE TOGGLE AS MARKED IN IMAGE 2) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="content-container h-20 flex items-center justify-between">

          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-md shadow-purple-500/25 group-hover:scale-105 transition-transform flex-shrink-0">
              <Wifi className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-extrabold tracking-tight text-slate-900 flex items-center leading-none">
                Bagnibari<span className="text-purple-600">Net</span>
              </div>
              <p className="text-[8px] sm:text-[10px] tracking-wider uppercase text-indigo-600 font-bold leading-none mt-1">{t.nav.tagline}</p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#home" className="hover:text-purple-600 transition-colors">{t.nav.home}</a>
            <a href="#packages" className="hover:text-purple-600 transition-colors">{t.nav.packages}</a>
            <a href="#features" className="hover:text-purple-600 transition-colors">{t.nav.whyUs}</a>
            <a href="#speedtest" className="hover:text-purple-600 transition-colors">{t.nav.speedTest}</a>
            <a href="#coverage" className="hover:text-purple-600 transition-colors">{t.nav.coverage}</a>
            <a href="#paybill" className="hover:text-purple-600 transition-colors">{t.nav.payBill}</a>
            <a href="#contact" className="hover:text-purple-600 transition-colors">{t.nav.contact}</a>
          </nav>

          {/* Right Action Section: Desktop Action Buttons + Mobile Toggle & Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 h-[38px] rounded-[4px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all border border-slate-200 whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{t.nav.whatsapp}</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 h-[38px] rounded-[4px] bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 transition-all whitespace-nowrap"
              >
                <span>{t.nav.getConnected}</span>
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </a>
            </div>

            {/* Mobile Language Toggle Button (Exact location marked by user in Image 2: Left of Hamburger) */}
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="lg:hidden flex items-center justify-center gap-1 px-2.5 h-8.5 py-1.5 rounded-[4px] bg-purple-50 hover:bg-purple-100 active:bg-purple-200 border border-purple-200 text-purple-700 font-bold text-xs transition-colors shadow-sm select-none flex-shrink-0"
              aria-label="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
              <span>{lang === 'en' ? 'বাংলা' : 'EN'}</span>
            </button>

            {/* Mobile Hamburger / Close Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8.5 h-8.5 p-1.5 rounded-[4px] bg-white hover:bg-purple-50 active:bg-purple-100 text-purple-600 flex items-center justify-center border border-slate-200/90 shadow-sm transition-all focus:outline-none flex-shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-purple-600 transition-transform duration-200 rotate-90 scale-105" />
              ) : (
                <Menu className="w-5 h-5 text-purple-600 transition-transform duration-200" />
              )}
            </button>
          </div>

        </div>
      </header>

      {/* 2.1 MOBILE SIDE DRAWER (OPENS FROM LEFT SIDE) */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Drawer Container (Sliding in from LEFT) */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-[84vw] max-w-[320px] bg-white z-50 shadow-2xl p-5 sm:p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:hidden border-r border-slate-200 overflow-y-auto ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Drawer Top Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-[4px] bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-purple-500/20">
                <Wifi className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-extrabold text-slate-900 leading-tight block">
                  Bagnibari<span className="text-purple-600">Net</span>
                </span>
                <p className="text-[9px] uppercase tracking-wider text-indigo-600 font-bold">{t.nav.tagline}</p>
              </div>
            </div>

            {/* Drawer Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="-mr-1.5 p-2 rounded-[4px] text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5 text-slate-700" />
            </button>
          </div>

          {/* Language Switcher Inside Drawer */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-50/70 border border-purple-100 mb-5">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-purple-600" />
              {lang === 'en' ? 'Language:' : 'ভাষা:'}
            </span>
            <div className="flex items-center bg-white p-0.5 rounded-lg border border-purple-200">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  lang === 'en'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-purple-600'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang('bn')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  lang === 'bn'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-purple-600'
                }`}
              >
                বাংলা
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-purple-600 hover:bg-purple-50 transition-colors"
            >
              {t.nav.home}
            </a>
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-purple-600 hover:bg-purple-50 transition-colors"
            >
              {t.nav.packages}
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-purple-600 hover:bg-purple-50 transition-colors"
            >
              {t.nav.whyUs}
            </a>
            <a
              href="#speedtest"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-purple-600 hover:bg-purple-50 transition-colors"
            >
              {t.nav.speedTest}
            </a>
            <a
              href="#coverage"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-purple-600 hover:bg-purple-50 transition-colors"
            >
              {t.nav.coverage}
            </a>
            <a
              href="#paybill"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-purple-600 hover:bg-purple-50 transition-colors"
            >
              {t.nav.payBill}
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-purple-600 hover:bg-purple-50 transition-colors"
            >
              {t.nav.contact}
            </a>
          </nav>
        </div>

        {/* Drawer Bottom Actions */}
        <div className="pt-4 border-t border-slate-100 space-y-2.5 mt-auto">
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full h-11 px-4 rounded-[4px] bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold text-sm shadow-md shadow-purple-500/20 inline-flex items-center justify-center gap-2 transition-all active:scale-[0.99] whitespace-nowrap"
          >
            <span>{t.nav.getConnected}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="https://wa.me/8801700000000"
            target="_blank"
            rel="noreferrer"
            className="w-full h-11 px-4 rounded-[4px] bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm shadow-sm shadow-emerald-600/15 inline-flex items-center justify-center gap-2 transition-all active:scale-[0.99] whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t.nav.whatsapp}</span>
          </a>

          <p className="text-[11px] text-center text-slate-400 font-medium pt-1">
            📞 {t.topbar.helplineLabel} {t.topbar.phone}
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. HERO SLIDER SECTION (RHYTHMIC STAGGER ENTRANCE + KEN BURNS) */}
      {/* ========================================================================= */}
      <section
        id="home"
        className="relative overflow-hidden min-h-[490px] sm:min-h-[560px] lg:h-[80vh] flex flex-col justify-center border-b border-slate-200/80 bg-slate-900 select-none cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          if (!isDraggingRef.current) setIsPaused(false);
          handleMouseLeave();
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Infinite Sliding Track */}
        <div
          onTransitionEnd={handleTrackTransitionEnd}
          className={`absolute inset-0 flex h-full ${
            isDragging || !isTransitioning
              ? ''
              : 'transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]'
          }`}
          style={{
            width: `${extendedSlides.length * 100}%`,
            transform: `translate3d(calc(-${(trackIndex * 100) / extendedSlides.length}% + ${dragOffset}px), 0, 0)`
          }}
        >
          {extendedSlides.map((slide, idx) => {
            const isSlideActive = idx === trackIndex;
            return (
              <div
                key={`slide-track-${slide.id}-${idx}`}
                className="relative h-full flex flex-col justify-center flex-shrink-0 overflow-hidden"
                style={{ width: `${100 / extendedSlides.length}%` }}
              >
                {/* Background Photography */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                  <img
                    src={slide.image}
                    alt={slide.smallTitle}
                    className={`w-full h-full object-cover object-center will-change-transform ${
                      isSlideActive
                        ? slide.kenburnsClass
                        : 'scale-100 transition-transform duration-1000 ease-out'
                    }`}
                    draggable={false}
                  />
                </div>

                {/* Deep Blackish Cinematic Overlay */}
                <div className="absolute inset-0 hidden md:block hero-dark-overlay pointer-events-none"></div>
                <div className="absolute inset-0 md:hidden hero-mobile-overlay pointer-events-none"></div>
                <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-slate-950/80 sm:from-slate-950/95 to-transparent pointer-events-none"></div>

                {/* Content Container */}
                <div className="content-container relative z-10 w-full py-7 sm:py-10 lg:py-14">
                  <div
                    key={isSlideActive ? `active-content-${idx}-${lang}` : `inactive-content-${idx}-${lang}`}
                    className="max-w-xl lg:max-w-2xl text-left"
                  >
                    {/* Small Title Badge */}
                    <div
                      className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 h-7 sm:h-8 rounded-full text-xs sm:text-[13px] font-semibold tracking-wide border mb-3.5 sm:mb-5 shadow-sm backdrop-blur-md ${
                        slide.badgeColor
                      } ${isSlideActive ? 'animate-hero-badge' : 'opacity-0'}`}
                    >
                      {React.createElement(slide.badgeIcon, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" })}
                      <span className="leading-none">{slide.smallTitle}</span>
                    </div>

                    {/* Main Title */}
                    <h1
                      className={`text-[28px] sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold text-white tracking-tight leading-[1.18] sm:leading-[1.14] mb-3 sm:mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] ${
                        isSlideActive ? 'animate-hero-title' : 'opacity-0'
                      }`}
                    >
                      <span>{slide.titlePrefix}</span>
                      <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-fuchsia-400 bg-clip-text text-transparent">
                        {slide.titleHighlight}
                      </span>
                    </h1>

                    {/* Description */}
                    <p
                      className={`text-slate-200 text-xs sm:text-base lg:text-lg font-normal leading-relaxed mb-5 sm:mb-8 max-w-xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] ${
                        isSlideActive ? 'animate-hero-desc' : 'opacity-0'
                      }`}
                    >
                      {slide.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center justify-start gap-2.5 sm:gap-3">
                      <a
                        href={slide.buttonLink}
                        onClick={(e) => {
                          if (wasDraggingRef.current) e.preventDefault();
                        }}
                        className={`group inline-flex items-center justify-center gap-2 px-5 sm:px-6 h-10 sm:h-10.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-slate-950/30 hover:shadow-lg transition-all duration-300 ease-out whitespace-nowrap transform hover:-translate-y-0.5 active:translate-y-0 ${
                          isSlideActive ? 'animate-hero-btn-primary' : 'opacity-0'
                        }`}
                      >
                        <span>{slide.buttonText}</span>
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                      </a>

                      <a
                        href={slide.secondaryLink}
                        onClick={(e) => {
                          if (wasDraggingRef.current) e.preventDefault();
                        }}
                        className={`group inline-flex items-center justify-center gap-2 px-5 sm:px-6 h-10 sm:h-10.5 rounded-full bg-white/10 hover:bg-white/20 hover:border-white/40 border border-white/20 text-white font-medium text-xs sm:text-sm backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 ease-out whitespace-nowrap transform hover:-translate-y-0.5 active:translate-y-0 ${
                          isSlideActive ? 'animate-hero-btn-secondary' : 'opacity-0'
                        }`}
                      >
                        <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0 transition-transform duration-300 ease-out group-hover:scale-110" />
                        <span>{slide.secondaryText}</span>
                      </a>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Paired Arrow Navigation */}
        <div className="absolute right-4 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center gap-1.5 select-none">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            className="slider-nav-btn w-9 h-9 sm:w-10 sm:h-10 rounded-full text-white/70 hover:text-white hover:bg-white/10 active:scale-90 transition-all duration-200 flex items-center justify-center outline-none border-none ring-0 select-none"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-md" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="slider-nav-btn w-9 h-9 sm:w-10 sm:h-10 rounded-full text-white/70 hover:text-white hover:bg-white/10 active:scale-90 transition-all duration-200 flex items-center justify-center outline-none border-none ring-0 select-none"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-md" />
          </button>
        </div>

        {/* Dynamic Dot Indicators */}
        <div className="absolute bottom-5 sm:bottom-6 inset-x-0 z-20 flex items-center justify-center gap-2 select-none">
          {slides.map((s, idx) => {
            const isDotActive = activeRealIndex === idx;
            return (
              <button
                key={`dot-${s.id}-${idx}`}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(idx);
                }}
                className={`slider-nav-btn rounded-full transition-all duration-300 outline-none border-none ring-0 select-none ${
                  isDotActive
                    ? 'w-7 sm:w-8 h-2 sm:h-2.5 bg-gradient-to-r from-purple-500 via-indigo-400 to-fuchsia-500 shadow-md shadow-purple-500/50'
                    : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/40 hover:bg-white/80 shadow-sm'
                }`}
                aria-label={`Go to slide ${s.id}`}
              />
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. KEY ADVANTAGES (4 COLORFUL FEATURE CARDS) */}
      {/* ========================================================================= */}
      <section
        id="features"
        ref={featuresSectionRef}
        className="section-spacing bg-white border-b border-slate-100 overflow-hidden"
      >
        <div className="content-container">

          {/* Section Header: Left on Phone, Centered on PC */}
          <div className="text-left sm:text-center max-w-2xl sm:mx-auto mb-5 sm:mb-7">
            <div className="flex justify-start sm:justify-center">
              <span
                className={`text-xs uppercase font-extrabold tracking-wider text-purple-700 px-3.5 py-1 rounded-full bg-purple-100 border border-purple-200 inline-block mb-3 sm:mb-4 ${
                  isFeaturesInView ? 'section-entrance-badge' : 'opacity-0'
                }`}
              >
                {t.features.badge}
              </span>
            </div>

            <h2
              className={`text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug sm:leading-tight ${
                isFeaturesInView ? 'section-entrance-title' : 'opacity-0'
              }`}
            >
              {t.features.titleLine1} <br /> {t.features.titleLine2}
            </h2>

            <p
              className={`text-slate-600 text-sm sm:text-base mt-2.5 sm:mt-3 leading-relaxed max-w-[400px] sm:max-w-[480px] mx-0 sm:mx-auto [text-wrap:balance] ${
                isFeaturesInView ? 'section-entrance-desc' : 'opacity-0'
              }`}
            >
              {t.features.description}
            </p>
          </div>

          {/* Feature Cards Grid: 20px padding (p-5), Custom Lucide Icons, Interactive Hover State */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {featureCards.map((card) => (
              <FeatureCardItem
                key={`${card.id}-${lang}`}
                card={card}
                isSectionInView={isFeaturesInView}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PACKAGES SECTION (LIGHT, VIBRANT & HIGH-CONVERTING) */}
      {/* ========================================================================= */}
      <section id="packages" className="section-spacing bg-[#fafbff] border-b border-slate-200/60">
        <div className="content-container">

          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <span className="text-xs uppercase font-extrabold tracking-wider text-purple-700 px-3.5 py-1 rounded-full bg-purple-100 border border-purple-200">
              {t.packages.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
              {t.packages.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              {t.packages.description}
            </p>
          </div>

          {/* Packages 4-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <div
                key={`${pkg.id}-${lang}`}
                className={`rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all duration-300 ${pkg.color} ${
                  pkg.popular ? 'transform lg:-translate-y-2' : 'hover:-translate-y-1 hover:shadow-lg'
                }`}
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex justify-between items-center mb-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${pkg.badgeColor}`}>
                      {pkg.tag}
                    </span>
                    {pkg.popular && (
                      <span className="flex items-center gap-1 text-xs font-bold text-purple-600 bg-purple-100 px-2.5 py-0.5 rounded-full">
                        <Star className="w-3 h-3 fill-current text-purple-600" /> {t.packages.popularHot}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">{pkg.name}</h3>

                  {/* Speed Number */}
                  <div className="text-4xl font-extrabold text-slate-900 mt-2 mb-1">
                    {pkg.speed}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 text-slate-500 mb-6">
                    <span className="text-3xl font-extrabold text-slate-900">৳{pkg.price}</span>
                    <span className="text-xs font-medium">{t.packages.monthUnit}</span>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-600 border-t border-slate-100 pt-5">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${pkg.popular ? 'text-purple-600' : 'text-emerald-500'}`} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA */}
                <div className="mt-8 pt-4">
                  <a
                    href="#contact"
                    onClick={() => setFormData({ ...formData, packageSelected: `${pkg.name} (${pkg.speed} - ৳${pkg.price})` })}
                    className={`block w-full text-center py-3 rounded-[4px] font-semibold text-sm transition-all ${
                      pkg.popular
                        ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20 hover:shadow-lg'
                        : 'bg-slate-100 hover:bg-purple-600 hover:text-white text-slate-800'
                    }`}
                  >
                    {t.packages.choosePlan}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Installation Guarantee Note */}
          <div className="mt-14 max-w-4xl mx-auto bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                <Gift className="w-5 h-5" />
              </div>
              <p className="text-sm text-slate-700">
                {lang === 'en' ? (
                  <>
                    <strong>Need custom speeds or multiple connections?</strong> Call our dedicated sales team for personalized discounts.
                  </>
                ) : (
                  <>
                    <strong>কাস্টম স্পিড বা একাধিক সংযোগের প্রয়োজন?</strong> স্পেশাল ডিসকাউন্টের জন্য আমাদের সেলস টিমে কল করুন।
                  </>
                )}
              </p>
            </div>
            <a href="tel:01700000000" className="px-5 py-2.5 rounded-xl bg-purple-100 text-purple-700 hover:bg-purple-200 font-bold text-xs whitespace-nowrap transition-colors">
              📞 {t.topbar.helplineLabel} {t.topbar.phone}
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. INTERACTIVE SPEED TEST SIMULATOR WIDGET */}
      {/* ========================================================================= */}
      <section id="speedtest" className="section-spacing bg-white border-b border-slate-200/60">
        <div className="content-container text-center">

          <span className="text-xs uppercase font-extrabold tracking-wider text-purple-700 px-3.5 py-1 rounded-full bg-purple-100 border border-purple-200">
            {t.speedtest.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
            {t.speedtest.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 mb-10 max-w-xl mx-auto">
            {t.speedtest.description}
          </p>

          <div className="bg-gradient-to-br from-purple-50/70 via-indigo-50/40 to-blue-50/50 border border-purple-200/80 rounded-3xl p-8 sm:p-12 shadow-lg shadow-purple-500/5 max-w-2xl mx-auto">

            {!speedResult && !testingSpeed && (
              <div>
                <div className="w-20 h-20 rounded-full bg-white text-purple-600 shadow-md flex items-center justify-center mx-auto mb-6">
                  <Activity className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {lang === 'en' ? 'Ready to test connection?' : 'ইন্টারনেট স্পিড টেস্টের জন্য প্রস্তুত?'}
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  {lang === 'en' ? 'Connected Server: Bagnibari BDIX Gateway Core 01' : 'সংযুক্ত সার্ভার: বাগিনীবাড়ি BDIX গেটওয়ে কোর ০১'}
                </p>
                <button
                  type="button"
                  onClick={handleRunSpeedTest}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-base shadow-lg shadow-purple-500/25 transition-all transform hover:scale-105 active:scale-95"
                >
                  {t.speedtest.btnRun} ➔
                </button>
              </div>
            )}

            {testingSpeed && (
              <div className="py-6">
                <div className="w-20 h-20 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin mx-auto mb-6"></div>
                <h3 className="text-xl font-bold text-purple-700 animate-pulse">{t.speedtest.btnRunning}</h3>
                <p className="text-xs text-slate-500 mt-2">{t.speedtest.bdixStatus}</p>
              </div>
            )}

            {speedResult && (
              <div className="py-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-sm">
                    <div className="text-xs text-slate-500 font-semibold mb-1 flex items-center justify-center gap-1">
                      <Download className="w-3.5 h-3.5 text-purple-600" /> {t.speedtest.downloadLabel}
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900">{speedResult.download}</div>
                    <div className="text-[11px] text-purple-600 font-bold">{t.speedtest.mbpsUnit}</div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-sm">
                    <div className="text-xs text-slate-500 font-semibold mb-1 flex items-center justify-center gap-1">
                      <Upload className="w-3.5 h-3.5 text-indigo-600" /> {t.speedtest.uploadLabel}
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900">{speedResult.upload}</div>
                    <div className="text-[11px] text-indigo-600 font-bold">{t.speedtest.mbpsUnit}</div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-sm">
                    <div className="text-xs text-slate-500 font-semibold mb-1">{t.speedtest.latencyLabel}</div>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-600">{speedResult.ping}</div>
                    <div className="text-[11px] text-emerald-600 font-bold">{t.speedtest.msUnit}</div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-sm">
                    <div className="text-xs text-slate-500 font-semibold mb-1">Jitter</div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-700">{speedResult.jitter}</div>
                    <div className="text-[11px] text-slate-400 font-bold">{lang === 'en' ? 'Stable' : 'স্টেবল'}</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleRunSpeedTest}
                    className="px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
                  >
                    {lang === 'en' ? 'Test Again' : 'আবার টেস্ট করুন'}
                  </button>
                  <a
                    href="#contact"
                    className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors"
                  >
                    {lang === 'en' ? 'Get This Speed at Home ➔' : 'ঘরে এই স্পিড উপভোগ করুন ➔'}
                  </a>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. COVERAGE AREA SECTION (WITH INTERACTIVE FILTER SEARCH) */}
      {/* ========================================================================= */}
      <section id="coverage" className="section-spacing bg-[#fafbff] border-b border-slate-200/60">
        <div className="content-container">

          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-wider text-purple-700 px-3.5 py-1 rounded-full bg-purple-100 border border-purple-200">
              {t.coverage.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
              {t.coverage.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              {t.coverage.description}
            </p>

            {/* Search Input Box */}
            <div className="mt-8 max-w-md mx-auto relative">
              <input
                type="text"
                placeholder={t.coverage.searchPlaceholder}
                value={searchArea}
                onChange={(e) => setSearchArea(e.target.value)}
                className="w-full px-5 py-3.5 pl-11 rounded-2xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Area Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAreas.length > 0 ? (
              filteredAreas.map((area, idx) => (
                <div
                  key={`${area.name}-${idx}-${lang}`}
                  className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                        {area.status}
                      </span>
                      <MapPin className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mt-3">{area.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{area.landmark}</p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      {lang === 'en' ? 'Installation: < 24 Hours' : 'ইন্সটলেশন: < ২৪ ঘণ্টা'}
                    </span>
                    <a
                      href="#contact"
                      onClick={() => setFormData({ ...formData, area: area.name })}
                      className="text-purple-600 font-bold hover:underline"
                    >
                      {lang === 'en' ? 'Request Line →' : 'সংযোগের আবেদন →'}
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-slate-500 text-sm">
                {t.coverage.noResults}
              </div>
            )}
          </div>

          {/* Expansion Banner */}
          <div className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 sm:p-10 text-white text-center shadow-lg shadow-purple-500/15">
            <h3 className="text-2xl font-bold mb-2">
              {lang === 'en' ? "Don't see your specific address listed?" : 'তালিকায় আপনার নির্দিষ্ট ঠিকানা খুঁজে পাচ্ছেন না?'}
            </h3>
            <p className="text-purple-100 text-sm max-w-2xl mx-auto mb-6">
              {lang === 'en'
                ? "Our line technicians are actively laying fiber lines in new lanes weekly. Send us your address and we'll check feasibility within 2 hours."
                : 'আমাদের টেকনিশিয়ানরা প্রতি সপ্তাহে নতুন গলিতে ফাইবার লাইন বসাচ্ছেন। আপনার ঠিকানা পাঠান, আমরা ২ ঘণ্টার মধ্যে সম্ভাব্যতা যাচাই করব।'}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-purple-50 text-purple-700 font-bold text-sm shadow-md transition-all"
            >
              <span>{lang === 'en' ? 'Submit Area Feasibility Request' : 'কাভারেজ অনুসন্ধানের আবেদন করুন'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. EASY BILL PAYMENT GUIDE (BKASH & NAGAD) */}
      {/* ========================================================================= */}
      <section id="paybill" className="section-spacing bg-white border-b border-slate-200/60">
        <div className="content-container">

          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <span className="text-xs uppercase font-extrabold tracking-wider text-purple-700 px-3.5 py-1 rounded-full bg-purple-100 border border-purple-200">
              {t.paybill.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
              {t.paybill.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              {t.paybill.description}
            </p>
          </div>

          {/* Reference Warning Notice */}
          <div className="mb-10 bg-amber-50 border border-amber-200 rounded-2xl p-5 text-amber-800 text-sm flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div>
              <strong>{t.paybill.noticeTitle}</strong> {t.paybill.noticeBody}
            </div>
          </div>

          {/* Two Payment Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* bKash */}
            <div className="bg-[#fef9f9] border border-pink-200 rounded-3xl p-8 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between pb-4 border-b border-pink-100 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-pink-600 text-white font-extrabold text-lg flex items-center justify-center shadow-md">
                    bKash
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{t.paybill.bkashTitle}</h3>
                    <p className="text-xs text-slate-500">App or Dial *247#</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-pink-100 text-pink-700 border border-pink-200">
                  {lang === 'en' ? 'Send Money / Payment' : 'পেমেন্ট / সেন্ড মানি'}
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-pink-100 mb-6 text-center">
                <span className="text-xs text-slate-500 block mb-1">
                  {lang === 'en' ? 'Our Official bKash Number:' : 'আমাদের অফিশিয়াল বিকাশ নম্বর:'}
                </span>
                <span className="text-2xl font-mono font-extrabold text-pink-600 tracking-wider">017XX-XXXXXX</span>
              </div>

              <ol className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                {t.paybill.bkashSteps.map((step, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Nagad */}
            <div className="bg-[#fffbf8] border border-orange-200 rounded-3xl p-8 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between pb-4 border-b border-orange-100 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white font-extrabold text-lg flex items-center justify-center shadow-md">
                    Nagad
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{t.paybill.nagadTitle}</h3>
                    <p className="text-xs text-slate-500">App or Dial *167#</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-100 text-orange-700 border border-orange-200">
                  {lang === 'en' ? 'Merchant Pay' : 'মার্চেন্ট পে'}
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-orange-100 mb-6 text-center">
                <span className="text-xs text-slate-500 block mb-1">
                  {lang === 'en' ? 'Our Official Nagad Number:' : 'আমাদের অফিশিয়াল নগদ নম্বর:'}
                </span>
                <span className="text-2xl font-mono font-extrabold text-orange-600 tracking-wider">017XX-XXXXXX</span>
              </div>

              <ol className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                {t.paybill.nagadSteps.map((step, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. INSTANT CONNECTION & CONTACT FORM */}
      {/* ========================================================================= */}
      <section id="contact" className="section-spacing bg-[#fafbff] border-b border-slate-200/60">
        <div className="content-container">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left Contact Information (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">

              <div className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-sm">
                <span className="text-xs uppercase font-extrabold tracking-wider text-purple-700 px-3 py-1 rounded-full bg-purple-100">
                  {lang === 'en' ? 'Customer Support' : 'গ্রাহক সেবা'}
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-4 mb-6">
                  {lang === 'en' ? 'Get In Touch With Our Local Office' : 'আমাদের লোকাল অফিসে সরাসরি যোগাযোগ করুন'}
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{t.contact.officeTitle}</h4>
                      <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                        {t.contact.officeAddress}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{t.contact.supportHelplineTitle}</h4>
                      <a href="tel:01700000000" className="text-purple-600 font-extrabold text-sm mt-1 block hover:underline">
                        017XX-XXXXXX / 018XX-XXXXXX
                      </a>
                      <p className="text-slate-500 text-xs mt-0.5">
                        {lang === 'en' ? 'Direct technical assistance anytime' : '২৪ ঘণ্টা যেকোনো কারিগরি সহায়তায়'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl flex-shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{t.contact.whatsappTitle}</h4>
                      <a href="https://wa.me/8801700000000" target="_blank" rel="noreferrer" className="text-emerald-600 font-extrabold text-sm mt-1 block hover:underline">
                        017XX-XXXXXX
                      </a>
                      <p className="text-slate-500 text-xs mt-0.5">
                        {lang === 'en' ? 'Send location pin for quick feasibility' : 'লোকেশন পিন পাঠিয়ে দ্রুত কাভারেজ জানুন'}
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://wa.me/8801700000000"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 block w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-center text-sm shadow-md shadow-emerald-500/20 transition-all"
                >
                  {t.contact.whatsappBtn}
                </a>
              </div>

              {/* Fast Activation Banner */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="w-5 h-5 text-purple-600" />
                  <span className="font-bold text-slate-900 text-sm">
                    {lang === 'en' ? '24-Hour Connection Promise' : '২৪ ঘণ্টার মধ্যে সংযোগের প্রতিশ্রুতি'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'en'
                    ? 'Upon submitting your order, our technician visits your residence, mounts the fiber cable, and confirms internet speed within 24 hours.'
                    : 'আবেদন পাওয়ার পর আমাদের টেকনিশিয়ান আপনার বাড়ি পরিদর্শন করে ২৪ ঘণ্টার মধ্যে ফাইবার লাইন টেনে রাউটার চালু করে দেবেন।'}
                </p>
              </div>

            </div>

            {/* Right: New Connection Request Form (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-sm">

                {formSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.contact.successTitle}</h3>
                    <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                      {t.contact.successMessage.replace('{name}', formData.fullName || (lang === 'en' ? 'Valued Customer' : 'সম্মানিত গ্রাহক'))}
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs"
                    >
                      {t.contact.submitAnotherBtn}
                    </button>
                  </div>
                ) : (
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-wider text-purple-700 px-3 py-1 rounded-full bg-purple-100">
                      {t.contact.badge}
                    </span>
                    <h3 className="text-2xl font-extrabold text-slate-900 mt-3 mb-2">
                      {t.contact.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm mb-8">
                      {t.contact.description}
                    </p>

                    <form onSubmit={handleFormSubmit} className="space-y-5">

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          {t.contact.fullNameLabel}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder={t.contact.fullNamePlaceholder}
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            {t.contact.mobileLabel}
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder={t.contact.mobilePlaceholder}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            {t.contact.planLabel}
                          </label>
                          <select
                            value={formData.packageSelected}
                            onChange={(e) => setFormData({ ...formData, packageSelected: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                          >
                            {packages.map((p) => (
                              <option key={p.id} value={`${p.name} (${p.speed} - ৳${p.price})`}>
                                {p.name} ({p.speed} - ৳{p.price})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          {t.contact.areaLabel}
                        </label>
                        <select
                          value={formData.area}
                          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                        >
                          {coverageAreas.map((a, aIdx) => (
                            <option key={aIdx} value={a.name}>
                              {a.name}
                            </option>
                          ))}
                          <option value="Other Area">
                            {lang === 'en' ? 'Other Area in Bagnibari' : 'বাগিনীবাড়ীর অন্যান্য এলাকা'}
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          {t.contact.addressLabel}
                        </label>
                        <textarea
                          required
                          rows="3"
                          placeholder={t.contact.addressPlaceholder}
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full h-12 rounded-[4px] bg-purple-600 hover:bg-purple-700 text-white font-semibold text-base shadow-lg shadow-purple-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 leading-none flex items-center justify-center"
                      >
                        <span className="-translate-y-[1.5px]">{t.contact.submitBtn}</span>
                      </button>

                      <p className="text-center text-xs text-slate-400">
                        {t.contact.privacyNote}
                      </p>

                    </form>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. COLORFUL MODERN FOOTER */}
      {/* ========================================================================= */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-12 mt-auto text-slate-500 text-sm">
        <div className="content-container">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-100">

            {/* Col 1 */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg">
                  <Wifi className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-extrabold text-slate-900">
                  Bagnibari<span className="text-purple-600">Net</span>
                </span>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                {t.footer.description}
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-200 text-xs text-purple-700 font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>{t.footer.licenseBadge}</span>
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="text-slate-900 font-bold text-base mb-4">{t.footer.quickNavTitle}</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
                <li><a href="#home" className="hover:text-purple-600 transition-colors">{t.nav.home}</a></li>
                <li><a href="#packages" className="hover:text-purple-600 transition-colors">{t.nav.packages}</a></li>
                <li><a href="#features" className="hover:text-purple-600 transition-colors">{t.nav.whyUs}</a></li>
                <li><a href="#speedtest" className="hover:text-purple-600 transition-colors">{t.nav.speedTest}</a></li>
                <li><a href="#coverage" className="hover:text-purple-600 transition-colors">{t.nav.coverage}</a></li>
                <li><a href="#paybill" className="hover:text-purple-600 transition-colors">{t.nav.payBill}</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="text-slate-900 font-bold text-base mb-4">{t.footer.coverageTitle}</h4>
              <ul className="space-y-2 text-xs sm:text-sm font-medium">
                {coverageAreas.slice(0, 5).map((a, aIdx) => (
                  <li key={aIdx} className="flex items-center gap-1.5">
                    📍 <span>{a.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="text-slate-900 font-bold text-base mb-4">{t.footer.helplineTitle}</h4>
              <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 mb-4">
                <p className="text-xs text-slate-500 font-semibold">{t.footer.immediateHelp}</p>
                <a href="tel:01700000000" className="text-lg font-black text-purple-700 mt-1 block hover:underline">
                  {t.topbar.phone}
                </a>
              </div>
              <p className="text-xs text-slate-600">{t.footer.officeLocation}</p>
              <p className="text-xs text-emerald-600 font-bold mt-1.5">{t.footer.whatsappLabel}</p>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <p>{t.footer.copyright}</p>
            <p className="font-medium text-slate-500">
              {lang === 'en' ? 'Next-Generation Home Optical Fiber Network' : 'নেক্সট-জেনারেশন হোম অপটিক্যাল ফাইবার নেটওয়ার্ক'}
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
