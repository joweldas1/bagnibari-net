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
  Gamepad2
} from 'lucide-react';

import hero1Img from './hero-1.jpg';
import hero2Img from './hero-2.jpg';
import hero3Img from './hero-3.jpg';

export default function App() {
  // Mobile Drawer State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Slider State & Mouse Drag / Touch Swipe Support
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const wasDraggingRef = useRef(false);

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
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else if (dragOffset > 50) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
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

  // Slider Data matching User's Exact Specification
  const slides = [
    {
      id: 1,
      smallTitle: "High-Speed Broadband",
      titlePrefix: "Watch Anything ",
      titleHighlight: "Without Buffering",
      description: "Enjoy uninterrupted HD and 4K streaming—whether it’s movies, series, or live sports. Stable and fast internet for your whole family.",
      buttonText: "View Packages",
      buttonLink: "#packages",
      secondaryText: "WhatsApp Support",
      secondaryLink: "https://wa.me/8801700000000",
      image: hero1Img,
      badgeColor: "bg-purple-500/20 text-purple-200 border-purple-400/30",
      badgeIcon: Tv,
      tag: "Streaming & Family",
      shortTag: "Streaming",
      kenburnsClass: "animate-kenburns-in"
    },
    {
      id: 2,
      smallTitle: "Together for Everyone",
      titlePrefix: "More Devices, ",
      titleHighlight: "Same Speed",
      description: "Browsing, online classes, freelancing, or office work—your speed won't drop even with multiple devices connected at once. Get everything done hassle-free.",
      buttonText: "Get Connected Now",
      buttonLink: "#contact",
      secondaryText: "View Packages",
      secondaryLink: "#packages",
      image: hero2Img,
      badgeColor: "bg-indigo-500/20 text-indigo-200 border-indigo-400/30",
      badgeIcon: Users,
      tag: "Work & Multi-Device",
      shortTag: "Work",
      kenburnsClass: "animate-kenburns-out"
    },
    {
      id: 3,
      smallTitle: "Gamers' Choice",
      titlePrefix: "Zero Lag, ",
      titleHighlight: "Maximum Fun",
      description: "Play online games worry-free with low ping and a stable connection. Download large files or game updates at lightning speed.",
      buttonText: "View Offers",
      buttonLink: "#packages",
      secondaryText: "Coverage Areas",
      secondaryLink: "#coverage",
      image: hero3Img,
      badgeColor: "bg-emerald-500/20 text-emerald-200 border-emerald-400/30",
      badgeIcon: Gamepad2,
      tag: "Low-Ping Gaming",
      shortTag: "Gaming",
      kenburnsClass: "animate-kenburns-pan"
    }
  ];

  // Auto Slider Effect
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  // Packages Data
  const packages = [
    {
      id: 'silver',
      name: 'Silver Home',
      tag: 'Starter Plan',
      speed: '25',
      price: '500',
      popular: false,
      color: 'border-slate-200 bg-white hover:border-purple-300',
      badgeColor: 'bg-slate-100 text-slate-700',
      features: [
        '25 Mbps Real Dedicated Speed',
        '50 Mbps YouTube & Facebook Cache',
        'Unlimited Monthly Data (No FUP)',
        'Ideal for 2-4 Simultaneous Devices',
        '24/7 Telephone & WhatsApp Helpdesk'
      ]
    },
    {
      id: 'gold',
      name: 'Gold Ultra',
      tag: 'Most Popular',
      speed: '40',
      price: '700',
      popular: true,
      color: 'border-purple-400 bg-gradient-to-b from-purple-50/50 to-white shadow-xl shadow-purple-500/10 ring-2 ring-purple-500/20',
      badgeColor: 'bg-purple-600 text-white shadow-sm',
      features: [
        '40 Mbps Blazing Fast Speed',
        '100 Mbps BDIX, YouTube & FB Cache',
        'Crystal-Clear 4K UHD Video Streaming',
        'Low-Ping Gaming & Zoom Meetings',
        'Free Optical Fiber Drop Cable Setup',
        'Priority Technical Support'
      ]
    },
    {
      id: 'diamond',
      name: 'Diamond Pro',
      tag: 'Best for Family',
      speed: '60',
      price: '900',
      popular: false,
      color: 'border-slate-200 bg-white hover:border-indigo-300',
      badgeColor: 'bg-indigo-100 text-indigo-700',
      features: [
        '60 Mbps High-Bandwidth Core Speed',
        '100 Mbps BDIX & FTP Movie Servers',
        'Multiple Smart TVs & Consoles Support',
        'Heavy Download & Cloud Sync Ready',
        'Direct Optical Fiber Core Line',
        'VIP Local Priority Support'
      ]
    },
    {
      id: 'turbo',
      name: 'Turbo Gamer',
      tag: 'Ultra Fast',
      speed: '90',
      price: '1,200',
      popular: false,
      color: 'border-slate-200 bg-white hover:border-cyan-300',
      badgeColor: 'bg-cyan-100 text-cyan-700',
      features: [
        '90 Mbps Extreme Power User Speed',
        'Ultra-Low Latency Gaming Routing',
        'BDIX Gigafast Caching up to 100 Mbps',
        'Ideal for Freelancers & Creators',
        'Free Dual-Band Router Optimization',
        'Dedicated Senior Technician Assigned'
      ]
    }
  ];

  // Coverage Areas Data
  const coverageAreas = [
    { name: "Bagnibari Central Bazar", landmark: "Main Market & Commercial Hub", status: "Active (100% Fiber Coverage)" },
    { name: "Siddham North Para", landmark: "North Para Main Road & Residential Lanes", status: "Active (100% Fiber Coverage)" },
    { name: "School & College Road", landmark: "High School, College & Madrasa Link", status: "Active (100% Fiber Coverage)" },
    { name: "West Para & Jame Mosque Lane", landmark: "Surrounding residential quarters", status: "Active (100% Fiber Coverage)" },
    { name: "South Siddham Junction", landmark: "South Crossroads & Adjacent Homes", status: "Active (100% Fiber Coverage)" },
    { name: "East Para & Canal Road Extension", landmark: "New Fiber Expansion & Pre-Booking", status: "Expanding (Pre-booking open)" },
  ];

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
    }, 2500);
  };

  // Form Submit Handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#fafbff] text-slate-800 flex flex-col font-sans overflow-x-hidden w-full">
      
      {/* 1. TOP ANNOUNCEMENT STRIP (1-LINE SLIDING MARQUEE ON MOBILE, CLEAN FLEX ON DESKTOP - ALIGNED WITH NAVBAR) */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 text-white text-xs py-2 shadow-sm overflow-hidden select-none">
        <div className="content-container">
          
          {/* Mobile View: 1-line smooth sliding marquee ticker */}
          <div className="flex md:hidden items-center h-5 overflow-hidden">
            <div className="flex-shrink-0 z-20 pr-2">
              <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded-[3px] text-[10px] font-black flex items-center gap-1 shadow-sm uppercase tracking-wider">
                <Zap className="w-2.5 h-2.5 fill-current text-slate-950" /> LIVE
              </span>
            </div>
            <div className="flex-1 min-w-0 overflow-hidden relative">
              <div className="animate-marquee-smooth flex items-center gap-8 text-[11px] font-medium whitespace-nowrap pl-2">
                <span>🚀 Ultra-Fast Optical Fiber Broadband is now live across Bagnibari & Siddham!</span>
                <span className="text-amber-300 font-bold">📞 24/7 Hotline: 017XX-XXXXXX</span>
                <span>🎁 Special Welcome Offer: 100% Free Optical Fiber Drop Wire Setup!</span>
                {/* Duplicate for seamless infinite loop */}
                <span>🚀 Ultra-Fast Optical Fiber Broadband is now live across Bagnibari & Siddham!</span>
                <span className="text-amber-300 font-bold">📞 24/7 Hotline: 017XX-XXXXXX</span>
                <span>🎁 Special Welcome Offer: 100% Free Optical Fiber Drop Wire Setup!</span>
              </div>
            </div>
          </div>

          {/* Desktop View: Clean Flex Row */}
          <div className="hidden md:flex justify-between items-center text-xs">
            <div className="flex items-center gap-2 font-medium">
              <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-300" /> NEW
              </span>
              <span>Ultra-Fast Optical Fiber Broadband is now live in Bagnibari & Siddham areas!</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5 opacity-90">
                <Clock className="w-3.5 h-3.5 text-cyan-200" />
                <span>24/7 Helpline:</span>
              </div>
              <a href="tel:01700000000" className="font-bold text-amber-300 hover:text-white transition-colors flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" /> 017XX-XXXXXX
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 2. STICKY LIGHT NAVBAR (WITH MOBILE HAMBURGER TOGGLE) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="content-container h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-purple-500/25 group-hover:scale-105 transition-transform">
              <Wifi className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 flex items-center">
                Bagnibari<span className="text-purple-600">Net</span>
              </div>
              <p className="text-[9px] sm:text-[10px] tracking-wider uppercase text-indigo-600 font-bold">Ultra-Fast Home Fiber</p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#home" className="hover:text-purple-600 transition-colors">Home</a>
            <a href="#packages" className="hover:text-purple-600 transition-colors">Packages</a>
            <a href="#features" className="hover:text-purple-600 transition-colors">Why Us</a>
            <a href="#speedtest" className="hover:text-purple-600 transition-colors">Speed Test</a>
            <a href="#coverage" className="hover:text-purple-600 transition-colors">Coverage</a>
            <a href="#paybill" className="hover:text-purple-600 transition-colors">Pay Bill</a>
            <a href="#contact" className="hover:text-purple-600 transition-colors">Contact</a>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a 
              href="https://wa.me/8801700000000" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 h-[38px] rounded-[4px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all border border-slate-200 whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>WhatsApp</span>
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center gap-2 px-5 h-[38px] rounded-[4px] bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 transition-all whitespace-nowrap"
            >
              <span>Get Connected</span>
              <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </a>
          </div>

          {/* Mobile Hamburger / Close Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-[4px] bg-white hover:bg-purple-50 active:bg-purple-100 text-purple-600 flex items-center justify-center border border-slate-200/90 shadow-sm transition-all focus:outline-none flex-shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-purple-600 transition-transform duration-200 rotate-90 scale-105" />
            ) : (
              <Menu className="w-5 h-5 text-purple-600 transition-transform duration-200" />
            )}
          </button>

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
          {/* Drawer Top Header - Align Logo and Close Button to the edges */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-[4px] bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-purple-500/20">
                <Wifi className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-extrabold text-slate-900 leading-tight block">
                  Bagnibari<span className="text-purple-600">Net</span>
                </span>
                <p className="text-[9px] uppercase tracking-wider text-indigo-600 font-bold">Ultra Fast Fiber</p>
              </div>
            </div>
            
            {/* Drawer Close Button (Pushed further to the right) */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="-mr-1.5 p-2 rounded-[4px] text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5 text-slate-700" />
            </button>
          </div>

          {/* Navigation Links - Perfect vertical alignment with Logo */}
          <nav className="flex flex-col space-y-1">
            {[
              { name: 'Home', href: '#home', icon: Wifi },
              { name: 'Packages', href: '#packages', icon: Zap },
              { name: 'Why Choose Us', href: '#features', icon: ShieldCheck },
              { name: 'Speed Test', href: '#speedtest', icon: Gauge },
              { name: 'Coverage Areas', href: '#coverage', icon: MapPin },
              { name: 'Pay Bill (bKash/Nagad)', href: '#paybill', icon: CreditCard },
              { name: 'Contact & Support', href: '#contact', icon: Phone }
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <a
                  key={idx}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2.5 py-2.5 rounded-[4px] font-semibold text-sm text-slate-700 hover:text-purple-600 hover:bg-purple-50/80 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <IconComp className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-colors flex-shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-purple-600 transition-colors" />
                </a>
              );
            })}
          </nav>
        </div>

        {/* Drawer Bottom Actions: Redesigned Beautiful Mobile Action Card */}
        <div className="pt-5 border-t border-slate-100 mt-6">
          <div className="bg-slate-50/90 rounded-xl p-3.5 border border-slate-200/70 space-y-2.5 shadow-sm">
            
            {/* Get Connected Action - Optically balanced vertical padding */}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full h-11 px-4 rounded-[4px] bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold text-sm shadow-md shadow-purple-500/20 inline-flex items-center justify-center gap-2 transition-all active:scale-[0.99] whitespace-nowrap"
            >
              <span>Get Connected</span>
              <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </a>

            {/* WhatsApp Action */}
            <a
              href="https://wa.me/8801700000000"
              target="_blank"
              rel="noreferrer"
              className="w-full h-11 px-4 rounded-[4px] bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm shadow-sm shadow-emerald-600/15 inline-flex items-center justify-center gap-2 transition-all active:scale-[0.99] whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 flex-shrink-0" />
              <span>Chat on WhatsApp</span>
            </a>

            {/* 24/7 Helpline Row */}
            <div className="pt-1.5 flex items-center justify-between text-xs text-slate-500 px-1 font-medium border-t border-slate-200/50">
              <span className="flex items-center gap-1 text-[11px]">
                <Clock className="w-3 h-3 text-purple-600" />
                <span>24/7 Support:</span>
              </span>
              <a href="tel:01700000000" className="text-purple-700 font-extrabold text-xs hover:underline">
                017XX-XXXXXX
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* 3. HERO SLIDER SECTION (TRUE HORIZONTAL SLIDING, MOUSE DRAG / TOUCH SWIPE, STAGGERED CONTENT ANIMATIONS) */}
      <section 
        id="home" 
        className="relative overflow-hidden min-h-[580px] lg:h-[80vh] flex flex-col justify-between border-b border-slate-200/80 bg-slate-900 select-none cursor-grab active:cursor-grabbing"
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
        {/* Dynamic Sliding Track (moves horizontally with true sliding transition and drag tracking) */}
        <div 
          className={`absolute inset-0 flex h-full ${
            isDragging 
              ? '' 
              : 'transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]'
          }`}
          style={{
            width: `${slides.length * 100}%`,
            transform: `translate3d(calc(-${(currentSlide * 100) / slides.length}% + ${dragOffset}px), 0, 0)`
          }}
        >
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className="relative h-full flex flex-col justify-center flex-shrink-0 overflow-hidden"
              style={{ width: `${100 / slides.length}%` }}
            >
              {/* Background Photography with Dynamic Ken Burns Zoom In/Out Animation */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                <img
                  key={`hero-img-${currentSlide === idx ? 'active-' + currentSlide : 'idle-' + idx}`}
                  src={slide.image}
                  alt={slide.smallTitle}
                  className={`w-full h-full object-cover object-center will-change-transform ${
                    currentSlide === idx 
                      ? slide.kenburnsClass 
                      : 'scale-100 transition-transform duration-1000 ease-out'
                  }`}
                  draggable={false}
                />
              </div>

              {/* Cinematic Blackish Gradient Overlay (Eliminates white fog, highlights photography & guarantees 100% text contrast) */}
              <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-slate-950/95 via-slate-950/75 via-45% to-slate-950/25 pointer-events-none"></div>
              <div className="absolute inset-0 md:hidden bg-gradient-to-t from-slate-950/95 via-slate-950/75 via-55% to-slate-950/30 pointer-events-none"></div>
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/85 to-transparent pointer-events-none"></div>

              {/* Content Container adhering strictly to User's Breakpoint & Spacing Specs */}
              <div className="content-container relative z-10 w-full py-8 lg:py-12">
                
                {/* Hero Text Column (Crisp, High-Contrast Ultra-Readable Typography) */}
                <div className="max-w-xl lg:max-w-2xl text-center lg:text-left">
                  
                  {/* Small Title Badge - Staggered 1 */}
                  <div 
                    key={`badge-${currentSlide}-${idx}`}
                    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border mb-4 shadow-sm backdrop-blur-md ${slide.badgeColor} ${
                      currentSlide === idx ? 'animate-slide-badge' : ''
                    }`}
                  >
                    {React.createElement(slide.badgeIcon, { className: "w-4 h-4 flex-shrink-0" })}
                    <span>{slide.smallTitle}</span>
                  </div>

                  {/* Main Title - Staggered 2 */}
                  <h1 
                    key={`title-${currentSlide}-${idx}`}
                    className={`text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold text-white tracking-tight leading-[1.14] mb-4 drop-shadow-sm ${
                      currentSlide === idx ? 'animate-slide-title' : ''
                    }`}
                  >
                    <span>{slide.titlePrefix}</span>
                    <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-fuchsia-400 bg-clip-text text-transparent">
                      {slide.titleHighlight}
                    </span>
                  </h1>

                  {/* Description - Staggered 3 */}
                  <p 
                    key={`desc-${currentSlide}-${idx}`}
                    className={`text-slate-200 text-sm sm:text-base lg:text-lg font-normal leading-relaxed mb-8 max-w-xl drop-shadow-sm ${
                      currentSlide === idx ? 'animate-slide-desc' : ''
                    }`}
                  >
                    {slide.description}
                  </p>

                  {/* Action Buttons - Staggered 4 */}
                  <div 
                    key={`btns-${currentSlide}-${idx}`}
                    className={`flex flex-wrap items-center justify-center lg:justify-start gap-3.5 ${
                      currentSlide === idx ? 'animate-slide-btns' : ''
                    }`}
                  >
                    <a 
                      href={slide.buttonLink}
                      onClick={(e) => {
                        if (wasDraggingRef.current) e.preventDefault();
                      }}
                      className="inline-flex items-center justify-center gap-2 px-7 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-purple-600/35 hover:shadow-purple-600/50 transition-all whitespace-nowrap transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <span>{slide.buttonText}</span>
                      <ArrowRight className="w-4 h-4 flex-shrink-0" />
                    </a>

                    <a 
                      href={slide.secondaryLink}
                      onClick={(e) => {
                        if (wasDraggingRef.current) e.preventDefault();
                      }}
                      className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm sm:text-base backdrop-blur-md shadow-sm transition-all whitespace-nowrap transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{slide.secondaryText}</span>
                    </a>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Empty placeholder flex spacer so bottom controls stay at bottom */}
        <div className="flex-1 pointer-events-none"></div>

        {/* Slider Bottom Navigation & Controls */}
        <div className="relative z-10 w-full pb-6 lg:pb-8">
          <div className="content-container flex flex-row items-center justify-between gap-2 sm:gap-4">
            
            {/* Category / Slide Selectors - Fully Rounded Pill Radius */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto no-scrollbar py-1">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-sm whitespace-nowrap ${
                    currentSlide === idx 
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/35 ring-1 ring-white/25 scale-105' 
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/15 backdrop-blur-md'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${currentSlide === idx ? 'bg-amber-300 animate-pulse' : 'bg-slate-500'}`}></span>
                  <span className="hidden sm:inline">0{s.id} • {s.tag}</span>
                  <span className="sm:hidden">0{s.id} • {s.shortTag}</span>
                </button>
              ))}
            </div>

            {/* Prev / Next Arrows - Fully Rounded Circular Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 hover:bg-purple-600 text-white border border-white/15 hover:border-purple-500 shadow-md backdrop-blur-md flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 hover:bg-purple-600 text-white border border-white/15 hover:border-purple-500 shadow-md backdrop-blur-md flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 4. KEY ADVANTAGES (4 COLORFUL FEATURE CARDS) */}
      <section id="features" className="section-spacing bg-white border-b border-slate-100">
        <div className="content-container">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-extrabold tracking-wider text-purple-700 px-3.5 py-1 rounded-full bg-purple-100 border border-purple-200">
              Why Bagnibari Net
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
              Designed for Unstoppable Speed & Reliability
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              We deliver true optical fiber directly to your room with local neighborhood support that responds in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-[#fbfbfe] border border-slate-200/80 rounded-3xl p-8 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/5 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">100% Optical Fiber</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Direct fiber line to your home router. No signal drop during heavy rain, thunderstorms, or local load-shedding.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#fbfbfe] border border-slate-200/80 rounded-3xl p-8 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <Gauge className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Ultra-Low Ping Gaming</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Optimized direct BDIX routing for PubG, Valorant, FreeFire, and CS:GO with consistent 3-5ms local latency.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#fbfbfe] border border-slate-200/80 rounded-3xl p-8 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/5 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                <Tv className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">BDIX & Live Media Hub</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                100 Mbps dedicated caching for YouTube 4K, Facebook HD video, local FTP movie archives, and 50+ live TV channels.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#fbfbfe] border border-slate-200/80 rounded-3xl p-8 hover:border-rose-300 hover:shadow-xl hover:shadow-rose-500/5 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-6">
                <Headphones className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">24/7 Local Support</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our support team and field technicians reside right inside Bagnibari and Siddham to provide rapid on-site resolution.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. PACKAGES SECTION (LIGHT, VIBRANT & HIGH-CONVERTING) */}
      <section id="packages" className="section-spacing bg-[#fafbff] border-b border-slate-200/60">
        <div className="content-container">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-extrabold tracking-wider text-purple-700 px-3.5 py-1 rounded-full bg-purple-100 border border-purple-200">
              Home Broadband Plans
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
              Transparent Pricing. No Hidden Charges.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Select the perfect speed for your household. All plans include 100 Mbps BDIX, unmetered bandwidth, and free fiber setup.
            </p>
          </div>

          {/* Packages 4-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <div 
                key={pkg.id} 
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
                        <Star className="w-3 h-3 fill-current text-purple-600" /> Hot
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">{pkg.name}</h3>
                  
                  {/* Speed Number */}
                  <div className="text-4xl font-extrabold text-slate-900 mt-2 mb-1">
                    {pkg.speed} <span className="text-xl font-bold text-purple-600">Mbps</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 text-slate-500 mb-6">
                    <span className="text-3xl font-extrabold text-slate-900">৳{pkg.price}</span>
                    <span className="text-xs font-medium">/ month</span>
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
                    onClick={() => setFormData({ ...formData, packageSelected: `${pkg.name} (${pkg.speed} Mbps - ৳${pkg.price}/mo)` })}
                    className={`block w-full text-center py-3 rounded-[4px] font-semibold text-sm transition-all ${
                      pkg.popular 
                        ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20 hover:shadow-lg'
                        : 'bg-slate-100 hover:bg-purple-600 hover:text-white text-slate-800'
                    }`}
                  >
                    Select This Package
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
                <strong>Need custom speeds or multiple connections?</strong> Call our dedicated sales team for personalized discounts.
              </p>
            </div>
            <a href="tel:01700000000" className="px-5 py-2.5 rounded-xl bg-purple-100 text-purple-700 hover:bg-purple-200 font-bold text-xs whitespace-nowrap transition-colors">
              Call Support: 017XX-XXXXXX
            </a>
          </div>

        </div>
      </section>

      {/* 6. INTERACTIVE SPEED TEST SIMULATOR WIDGET */}
      <section id="speedtest" className="section-spacing bg-white border-b border-slate-200/60">
        <div className="content-container text-center">
          
          <span className="text-xs uppercase font-extrabold tracking-wider text-purple-700 px-3.5 py-1 rounded-full bg-purple-100 border border-purple-200">
            Live Network Diagnostic
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
            Simulate Your Fiber Speed
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 mb-10 max-w-xl mx-auto">
            Test the real-world download, upload, and latency benchmarks provided across our optical fiber infrastructure.
          </p>

          <div className="bg-gradient-to-br from-purple-50/70 via-indigo-50/40 to-blue-50/50 border border-purple-200/80 rounded-3xl p-8 sm:p-12 shadow-lg shadow-purple-500/5 max-w-2xl mx-auto">
            
            {!speedResult && !testingSpeed && (
              <div>
                <div className="w-20 h-20 rounded-full bg-white text-purple-600 shadow-md flex items-center justify-center mx-auto mb-6">
                  <Activity className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to test connection?</h3>
                <p className="text-xs text-slate-500 mb-6">Connected Server: Bagnibari BDIX Gateway Core 01</p>
                <button
                  onClick={handleRunSpeedTest}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-base shadow-lg shadow-purple-500/25 transition-all transform hover:scale-105 active:scale-95"
                >
                  Start Speed Test ➔
                </button>
              </div>
            )}

            {testingSpeed && (
              <div className="py-6">
                <div className="w-20 h-20 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin mx-auto mb-6"></div>
                <h3 className="text-xl font-bold text-purple-700 animate-pulse">Measuring Real-Time Fiber Throughput...</h3>
                <p className="text-xs text-slate-500 mt-2">Pinging local BDIX cache and analyzing jitter...</p>
              </div>
            )}

            {speedResult && (
              <div className="py-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-sm">
                    <div className="text-xs text-slate-500 font-semibold mb-1 flex items-center justify-center gap-1">
                      <Download className="w-3.5 h-3.5 text-purple-600" /> Download
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900">{speedResult.download}</div>
                    <div className="text-[11px] text-purple-600 font-bold">Mbps</div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-sm">
                    <div className="text-xs text-slate-500 font-semibold mb-1 flex items-center justify-center gap-1">
                      <Upload className="w-3.5 h-3.5 text-indigo-600" /> Upload
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900">{speedResult.upload}</div>
                    <div className="text-[11px] text-indigo-600 font-bold">Mbps</div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-sm">
                    <div className="text-xs text-slate-500 font-semibold mb-1">Ping</div>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-600">{speedResult.ping}</div>
                    <div className="text-[11px] text-emerald-600 font-bold">ms</div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-sm">
                    <div className="text-xs text-slate-500 font-semibold mb-1">Jitter</div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-700">{speedResult.jitter}</div>
                    <div className="text-[11px] text-slate-400 font-bold">Stable</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleRunSpeedTest}
                    className="px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
                  >
                    Test Again
                  </button>
                  <a
                    href="#contact"
                    className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors"
                  >
                    Get This Speed at Home ➔
                  </a>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* 7. COVERAGE AREA SECTION (WITH INTERACTIVE FILTER SEARCH) */}
      <section id="coverage" className="section-spacing bg-[#fafbff] border-b border-slate-200/60">
        <div className="content-container">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-wider text-purple-700 px-3.5 py-1 rounded-full bg-purple-100 border border-purple-200">
              Coverage Locations
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
              Is Your Neighborhood Covered?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Browse our live optical fiber zones or search by your street or neighborhood name.
            </p>

            {/* Search Input Box */}
            <div className="mt-8 max-w-md mx-auto relative">
              <input
                type="text"
                placeholder="Search area (e.g. Bazar, Siddham, School Road)..."
                value={searchArea}
                onChange={(e) => setSearchArea(e.target.value)}
                className="w-full px-5 py-3.5 pl-11 rounded-2xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Area Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAreas.map((area, idx) => (
              <div 
                key={idx}
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
                  <span className="text-slate-500">Installation: &lt; 24 Hours</span>
                  <a 
                    href="#contact" 
                    onClick={() => setFormData({ ...formData, area: area.name })}
                    className="text-purple-600 font-bold hover:underline"
                  >
                    Request Line →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Expansion Banner */}
          <div className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 sm:p-10 text-white text-center shadow-lg shadow-purple-500/15">
            <h3 className="text-2xl font-bold mb-2">Don't see your specific address listed?</h3>
            <p className="text-purple-100 text-sm max-w-2xl mx-auto mb-6">
              Our line technicians are actively laying fiber lines in new lanes weekly. Send us your address and we'll check feasibility within 2 hours.
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-purple-50 text-purple-700 font-bold text-sm shadow-md transition-all"
            >
              <span>Submit Area Feasibility Request</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* 8. EASY BILL PAYMENT GUIDE (BKASH & NAGAD) */}
      <section id="paybill" className="section-spacing bg-white border-b border-slate-200/60">
        <div className="content-container">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-extrabold tracking-wider text-purple-700 px-3.5 py-1 rounded-full bg-purple-100 border border-purple-200">
              Bill Payment Methods
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
              Pay Your Monthly Bill from Home
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Pay easily via bKash or Nagad between the 1st and 10th of every month with zero extra charges.
            </p>
          </div>

          {/* Reference Warning Notice */}
          <div className="mb-10 bg-amber-50 border border-amber-200 rounded-2xl p-5 text-amber-800 text-sm flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div>
              <strong>Important Instruction:</strong> When making your payment, always enter your <strong>Customer ID</strong> (or registered mobile phone number) in the <strong>Reference</strong> field so your account recharges automatically.
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
                    <h3 className="text-xl font-bold text-slate-900">bKash Payment</h3>
                    <p className="text-xs text-slate-500">App or Dial *247#</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-pink-100 text-pink-700 border border-pink-200">
                  Send Money / Payment
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-pink-100 mb-6 text-center">
                <span className="text-xs text-slate-500 block mb-1">Our Official bKash Number:</span>
                <span className="text-2xl font-mono font-extrabold text-pink-600 tracking-wider">017XX-XXXXXX</span>
              </div>

              <ol className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                  <span>Open your <strong>bKash App</strong> or dial <strong>*247#</strong>.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                  <span>Select <strong>Send Money</strong> or <strong>Make Payment</strong>.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                  <span>Enter the official bKash number and your package amount.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                  <span>Type your <strong>Customer ID</strong> in the Reference box & confirm with PIN.</span>
                </li>
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
                    <h3 className="text-xl font-bold text-slate-900">Nagad Payment</h3>
                    <p className="text-xs text-slate-500">App or Dial *167#</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-100 text-orange-700 border border-orange-200">
                  Send Money
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-orange-100 mb-6 text-center">
                <span className="text-xs text-slate-500 block mb-1">Our Official Nagad Number:</span>
                <span className="text-2xl font-mono font-extrabold text-orange-600 tracking-wider">017XX-XXXXXX</span>
              </div>

              <ol className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                  <span>Open your <strong>Nagad App</strong> or dial <strong>*167#</strong>.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                  <span>Select <strong>Send Money</strong> and enter our Nagad number.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                  <span>Type the exact monthly package amount.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                  <span>Enter your <strong>Customer ID</strong> in reference & enter PIN to confirm.</span>
                </li>
              </ol>
            </div>

          </div>

        </div>
      </section>

      {/* 9. INSTANT CONNECTION & CONTACT FORM */}
      <section id="contact" className="section-spacing bg-[#fafbff] border-b border-slate-200/60">
        <div className="content-container">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Contact Information (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-sm">
                <span className="text-xs uppercase font-extrabold tracking-wider text-purple-700 px-3 py-1 rounded-full bg-purple-100">
                  Customer Support
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-4 mb-6">
                  Get In Touch With Our Local Office
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Physical Office</h4>
                      <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                        Bagnibari Central Bazar Junction, Siddham Road, Dhaka-1340, Bangladesh.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">24/7 Telephone Hotline</h4>
                      <a href="tel:01700000000" className="text-purple-600 font-extrabold text-sm mt-1 block hover:underline">
                        017XX-XXXXXX / 018XX-XXXXXX
                      </a>
                      <p className="text-slate-500 text-xs mt-0.5">Direct technical assistance anytime</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl flex-shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">WhatsApp Instant Chat</h4>
                      <a href="https://wa.me/8801700000000" target="_blank" rel="noreferrer" className="text-emerald-600 font-extrabold text-sm mt-1 block hover:underline">
                        017XX-XXXXXX
                      </a>
                      <p className="text-slate-500 text-xs mt-0.5">Send location pin for quick feasibility</p>
                    </div>
                  </div>
                </div>

                <a 
                  href="https://wa.me/8801700000000" 
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-8 block w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-center text-sm shadow-md shadow-emerald-500/20 transition-all"
                >
                  Chat with Us on WhatsApp
                </a>
              </div>

              {/* Fast Activation Banner */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="w-5 h-5 text-purple-600" />
                  <span className="font-bold text-slate-900 text-sm">24-Hour Connection Promise</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Upon submitting your order, our technician visits your residence, mounts the fiber cable, and confirms internet speed within 24 hours.
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
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank You, {formData.fullName}!</h3>
                    <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                      Your new connection request has been received. Our technician will call you shortly at <strong>{formData.phone}</strong> to confirm your line setup time.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-wider text-purple-700 px-3 py-1 rounded-full bg-purple-100">
                      Online Application
                    </span>
                    <h3 className="text-2xl font-extrabold text-slate-900 mt-3 mb-2">
                      Apply for New Connection
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm mb-8">
                      Fill out the form below and enjoy blazing fast home fiber internet within 24 hours.
                    </p>

                    <form onSubmit={handleFormSubmit} className="space-y-5">
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. John Doe"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Phone Number *</label>
                          <input
                            type="tel"
                            required
                            placeholder="017XXXXXXXX"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Desired Package *</label>
                          <select
                            value={formData.packageSelected}
                            onChange={(e) => setFormData({ ...formData, packageSelected: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                          >
                            <option value="Silver Home (25 Mbps - ৳500/mo)">Silver Home (25 Mbps - ৳500/mo)</option>
                            <option value="Gold Ultra (40 Mbps - ৳700/mo)">Gold Ultra (40 Mbps - ৳700/mo)</option>
                            <option value="Diamond Pro (60 Mbps - ৳900/mo)">Diamond Pro (60 Mbps - ৳900/mo)</option>
                            <option value="Turbo Gamer (90 Mbps - ৳1,200/mo)">Turbo Gamer (90 Mbps - ৳1,200/mo)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Coverage Neighborhood *</label>
                        <select
                          value={formData.area}
                          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                        >
                          <option value="Bagnibari Central Bazar">Bagnibari Central Bazar Area</option>
                          <option value="Siddham North Para">Siddham North Para</option>
                          <option value="School & College Road">School & College Road</option>
                          <option value="West Para & Jame Mosque Lane">West Para & Jame Mosque Lane</option>
                          <option value="South Siddham Junction">South Siddham Junction</option>
                          <option value="Other Area">Other (Specify in Address)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Detailed Home Address *</label>
                        <textarea
                          required
                          rows="3"
                          placeholder="House name/number, lane, road, landmarks..."
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full h-12 rounded-[4px] bg-purple-600 hover:bg-purple-700 text-white font-semibold text-base shadow-lg shadow-purple-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 leading-none flex items-center justify-center"
                      >
                        <span className="-translate-y-[1.5px]">Submit Connection Request ➔</span>
                      </button>

                      <p className="text-center text-xs text-slate-400">
                        🔒 Your information is completely safe and used strictly for fiber connection setup.
                      </p>

                    </form>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 10. COLORFUL MODERN FOOTER */}
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
                The premier home optical fiber broadband provider across Bagnibari and Siddham areas. Reliable, bufferless, and high-speed.
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-200 text-xs text-purple-700 font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>BTRC Licensed & ISPAB Member</span>
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="text-slate-900 font-bold text-base mb-4">Quick Navigation</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
                <li><a href="#home" className="hover:text-purple-600 transition-colors">Home Page</a></li>
                <li><a href="#packages" className="hover:text-purple-600 transition-colors">Home Internet Packages</a></li>
                <li><a href="#features" className="hover:text-purple-600 transition-colors">Why Choose Us</a></li>
                <li><a href="#speedtest" className="hover:text-purple-600 transition-colors">Speed Diagnostic Tool</a></li>
                <li><a href="#coverage" className="hover:text-purple-600 transition-colors">Coverage Areas</a></li>
                <li><a href="#paybill" className="hover:text-purple-600 transition-colors">Pay Bill via bKash/Nagad</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="text-slate-900 font-bold text-base mb-4">Coverage Zones</h4>
              <ul className="space-y-2 text-xs sm:text-sm font-medium">
                <li className="flex items-center gap-1.5">📍 <span>Bagnibari Central Bazar</span></li>
                <li className="flex items-center gap-1.5">📍 <span>Siddham North Para Road</span></li>
                <li className="flex items-center gap-1.5">📍 <span>School & College Lane</span></li>
                <li className="flex items-center gap-1.5">📍 <span>West Para & Jame Mosque</span></li>
                <li className="flex items-center gap-1.5">📍 <span>South Siddham Junction</span></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="text-slate-900 font-bold text-base mb-4">24/7 Helpline</h4>
              <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 mb-4">
                <p className="text-xs text-slate-500 font-semibold">Immediate Assistance:</p>
                <a href="tel:01700000000" className="text-lg font-black text-purple-700 mt-1 block hover:underline">
                  017XX-XXXXXX
                </a>
              </div>
              <p className="text-xs text-slate-600">📍 Office: Bagnibari Bazar Junction, Dhaka-1340</p>
              <p className="text-xs text-emerald-600 font-bold mt-1.5">💬 WhatsApp: 017XX-XXXXXX</p>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <p>© 2026 Bagnibari Net. All rights reserved.</p>
            <p className="font-medium text-slate-500">Next-Generation Home Optical Fiber Network</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
