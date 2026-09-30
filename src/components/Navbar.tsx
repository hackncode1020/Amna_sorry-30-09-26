import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Music2 } from 'lucide-react';
import { CONFIG } from '../config';

interface NavbarProps {
  onAudioScroll?: () => void;
  isAudioPlaying?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onAudioScroll, isAudioPlaying }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Sorry', href: '#sorry' },
    { label: 'Flowers', href: '#flowers' },
    { label: 'Memories', href: '#memories' },
    { label: 'Awards', href: '#awards' },
    { label: 'Promises', href: '#promises' },
    { label: 'Final Message', href: '#final-message' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
        {/* Subtle reading progress hairline indicator */}
        <div
          className="h-[2.5px] bg-gradient-to-r from-rose-300 via-pink-400 to-amber-300 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 md:py-3.5">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            className="flex items-center gap-1.5 font-display text-base font-semibold text-rose-950 transition-opacity hover:opacity-80 md:text-lg"
          >
            <span>{CONFIG.sisterName}</span>
            <Heart className="h-3.5 w-3.5 fill-rose-400 text-rose-400 inline-block" />
            <span className="text-xs font-normal text-rose-900/60 font-sans hidden sm:inline">
              · from {CONFIG.brotherName.split(' ')[0]}
            </span>
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="relative py-1 transition-colors hover:text-rose-900 whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-rose-400 after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Quick Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            <a
              href="#music"
              onClick={(e) => {
                if (onAudioScroll) {
                  e.preventDefault();
                  onAudioScroll();
                }
              }}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                isAudioPlaying
                  ? 'bg-rose-100/90 text-rose-900 border border-rose-300/70 shadow-xs'
                  : 'bg-white/80 text-slate-700 border border-rose-100 hover:bg-rose-50'
              }`}
              title="Music player"
            >
              <Music2 className={`h-3.5 w-3.5 ${isAudioPlaying ? 'text-rose-600 animate-spin' : 'text-slate-500'}`} style={{ animationDuration: '4s' }} />
              <span className="hidden sm:inline">{isAudioPlaying ? 'Playing' : 'Music'}</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 hover:bg-rose-100/50 hover:text-rose-900 lg:hidden focus:outline-none focus:ring-2 focus:ring-rose-300"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-rose-100/80 bg-white/95 px-6 py-4 shadow-xl backdrop-blur-md lg:hidden">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="rounded-lg py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-950 px-2"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
