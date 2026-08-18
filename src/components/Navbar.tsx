import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Menu, X, ArrowRight, BookOpen, Layers, ShieldCheck, User, Dumbbell, Video, Activity } from 'lucide-react';
import { BrandConfig } from '../types';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  brand: BrandConfig;
  onOpenStrategyGuide: () => void;
  onOpenCustomBrandEditor: () => void;
  onOpenDashboard: () => void;
  onOpenAuth: () => void;
  onOpenDemoSteps: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  brand,
  onOpenStrategyGuide,
  onOpenCustomBrandEditor,
  onOpenDashboard,
  onOpenAuth,
  onOpenDemoSteps,
  onScrollToSection,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Why Us', id: 'why-us' },
    { label: 'Case Studies', id: 'portfolio' },
    { label: 'Process', id: 'process' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'FAQ', id: 'faq' },
  ];

  const handleNavClick = (id: string) => {
    onScrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-xs py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Tag */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onScrollToSection('hero')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            id="nav-logo-btn"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-sm text-white font-black text-xl tracking-tighter group-hover:scale-105 transition-transform duration-200">
              {brand.name.slice(0, 1)}
            </div>
            <div>
              <div className="font-heading font-black tracking-wider text-xl text-slate-900 flex items-center gap-1.5">
                {brand.name}
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              </div>
              <p className="text-[10px] tracking-widest uppercase font-medium text-slate-500 -mt-0.5">
                {brand.industry.split('&')[0].split(' ')[0]} Studio
              </p>
            </div>
          </button>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-100/90 border border-slate-200/80 px-2 py-1 rounded-full backdrop-blur-md">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="px-3 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-full hover:bg-white hover:shadow-xs transition-all duration-150"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Actions (Firebase Member Portal, YouTube Demo, Customizer & Booking CTA) */}
        <div className="hidden md:flex items-center gap-2">
          
          {/* YouTube Tutorial Demo Guide Button */}
          <button
            onClick={onOpenDemoSteps}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200/90 rounded-full hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 shadow-2xs"
            title="YouTube Tutorial Walkthrough Steps"
            id="nav-demo-guide-btn"
          >
            <Video className="w-3.5 h-3.5 text-red-600" />
            <span>Demo Steps</span>
          </button>

          {/* Firebase Member Portal Button with Realtime Badge */}
          <button
            onClick={onOpenDashboard}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full border transition-all duration-200 shadow-2xs ${
              user
                ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
            }`}
            title="Open Cloud Firestore Member Portal"
            id="nav-member-portal-btn"
          >
            <Dumbbell className="w-3.5 h-3.5" />
            <span>{user ? (profile?.displayName ? profile.displayName.split(' ')[0] : 'Member Portal') : 'Member Portal'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </button>

          {/* Auth State Button */}
          {!user ? (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 rounded-full hover:bg-slate-200 transition-all duration-200"
              id="nav-signin-btn"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          ) : (
            <button
              onClick={onOpenDashboard}
              className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs border border-slate-300"
              title={`Signed in as ${user.email}`}
            >
              {profile?.displayName ? profile.displayName.slice(0, 1).toUpperCase() : 'U'}
            </button>
          )}

          {/* Strategy Guide */}
          <button
            onClick={onOpenStrategyGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200 rounded-full hover:bg-slate-100 transition-all duration-200"
            title="Open Complete Strategy & Sitemap Guide"
            id="nav-strategy-btn"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden lg:inline">Strategy</span>
          </button>

          {/* Booking CTA */}
          <button
            onClick={() => onScrollToSection('contact')}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-slate-900 rounded-full hover:bg-blue-600 transition-all duration-200 shadow-sm active:scale-95"
            id="nav-book-cta-btn"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Call</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenDashboard}
            className="p-2 text-blue-600 bg-blue-50 border border-blue-200 rounded-full text-xs font-medium flex items-center gap-1"
            title="Member Portal"
          >
            <Dumbbell className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 bg-slate-100 border border-slate-200 rounded-full focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 border-b border-slate-200 px-4 pt-3 pb-6 mt-2 space-y-3 backdrop-blur-2xl shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenDashboard();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-blue-600 rounded-xl shadow-xs"
            >
              <Dumbbell className="w-4 h-4" />
              <span>Athletic Member Portal & Cloud Firestore</span>
            </button>

            <button
              onClick={() => {
                onOpenDemoSteps();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl"
            >
              <Video className="w-4 h-4 text-red-600" />
              <span>YouTube Video Tutorial Demo Steps</span>
            </button>

            {!user ? (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-slate-900 bg-slate-100 border border-slate-200 rounded-xl"
              >
                <User className="w-4 h-4" />
                <span>Sign In / Create Account</span>
              </button>
            ) : null}

            <button
              onClick={() => {
                onOpenStrategyGuide();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-xl"
            >
              <BookOpen className="w-4 h-4" />
              <span>View Brand Strategy & Sitemap Guide</span>
            </button>

            <button
              onClick={() => {
                onOpenCustomBrandEditor();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-medium text-slate-700 bg-slate-100 border border-slate-200 rounded-xl"
            >
              <Layers className="w-4 h-4 text-slate-500" />
              <span>Customize Brand / Industry Details</span>
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-slate-900 rounded-xl shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Strategy Consultation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
