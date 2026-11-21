import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { EASE_EDITORIAL, EASE_OVERLAY } from './MotionPrimitives';

interface NavItem {
  number: string;
  label: string;
  href: string;
}

const OVERLAY_NAV_ITEMS: NavItem[] = [
  { number: '1', label: 'Beranda', href: '#hero' },
  { number: '2', label: 'Studio', href: '#about' },
  { number: '3', label: 'Layanan', href: '#services' },
  { number: '4', label: 'Proyek', href: '#portfolio' },
  { number: '5', label: 'Kontak', href: '#contact' },
];

const TOP_BAR_LINKS = [
  { label: 'Beranda', href: '#hero' },
  { label: 'Studio', href: '#about' },
  { label: 'Portofolio', href: '#portfolio' },
  { label: 'Layanan', href: '#services' },
  { label: 'Jurnal', href: '#blog' },
];

export function HeaderNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 16);
  });

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const handleNavigate = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE_EDITORIAL }}
        className={`sticky top-0 z-40 w-full transition-colors duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-sm border-b border-neutral-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)]'
            : 'bg-white border-b border-neutral-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-6 lg:gap-8">
          <a
            href="#hero"
            className="text-[15px] sm:text-base tracking-[0.06em] text-neutral-950 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950"
          >
            <span className="font-bold">HORIZON</span>{' '}
            <span className="font-light">STUDIO</span>
          </a>

          <nav
            aria-label="Navigasi utama"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600"
          >
            {TOP_BAR_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative py-1 text-neutral-600 hover:text-neutral-950 transition-colors duration-150 whitespace-nowrap shrink-0 after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-neutral-950 hover:after:w-full after:transition-all after:duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center shrink-0">
            <motion.button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="horizon-split-menu"
              aria-label="Buka menu navigasi"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18, ease: EASE_EDITORIAL }}
              className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 text-xs font-medium text-white bg-neutral-950 rounded-full hover:bg-neutral-800 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
            >
              <Menu className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Menu</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="horizon-split-menu-backdrop"
            id="horizon-split-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi Horizon Studio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE_EDITORIAL }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-0 sm:p-6 lg:p-10"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setMenuOpen(false);
              }
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                clipPath: 'inset(0% 0% 100% 0%)',
                y: -16,
              }}
              animate={{
                opacity: 1,
                clipPath: 'inset(0% 0% 0% 0%)',
                y: 0,
              }}
              exit={{
                opacity: 0,
                clipPath: 'inset(0% 0% 100% 0%)',
                y: -12,
              }}
              transition={{ duration: 0.52, ease: EASE_OVERLAY }}
              className="w-full h-full sm:h-auto max-w-6xl bg-white shadow-2xl overflow-y-auto lg:overflow-hidden grid grid-cols-1 lg:grid-cols-2 sm:min-h-[min(86vh,680px)] sm:max-h-[92vh]"
            >
              {/* Mobile-only sticky header bar inside drawer for instant close access */}
              <div className="flex lg:hidden items-center justify-between px-5 py-4 border-b border-neutral-200 bg-white sticky top-0 z-10">
                <span className="text-sm tracking-[0.06em] text-neutral-950">
                  <span className="font-bold">HORIZON</span>{' '}
                  <span className="font-light">STUDIO</span>
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Tutup menu navigasi"
                  className="w-10 h-10 rounded-full border border-neutral-200 text-neutral-800 hover:bg-neutral-950 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              {/* Left column: 5 numbered architectural rows */}
              <nav
                aria-label="Navigasi lengkap studio"
                className="flex flex-col divide-y divide-neutral-200 bg-white"
              >
                {OVERLAY_NAV_ITEMS.map((item, idx) => {
                  const isActive = highlightedIndex === idx;
                  return (
                    <button
                      key={item.href}
                      type="button"
                      onMouseEnter={() => setHighlightedIndex(idx)}
                      onFocus={() => setHighlightedIndex(idx)}
                      onClick={() => handleNavigate(item.href)}
                      className={`group flex-1 flex items-center justify-between px-5 sm:px-9 py-5 sm:py-7 text-left transition-colors duration-150 focus-visible:outline-none ${
                        isActive
                          ? 'bg-[#1D1D1D] text-white'
                          : 'bg-white text-neutral-950 hover:bg-[#1D1D1D] hover:text-white'
                      }`}
                    >
                      <div className="flex items-start gap-5 sm:gap-9 overflow-hidden">
                        <motion.span
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.42,
                            delay: 0.14 + idx * 0.06,
                            ease: EASE_EDITORIAL,
                          }}
                          className={`text-xs font-medium tabular-nums pt-1 transition-colors duration-150 ${
                            isActive
                              ? 'text-neutral-400'
                              : 'text-neutral-500 group-hover:text-neutral-400'
                          }`}
                        >
                          {item.number}
                        </motion.span>
                        <div className="overflow-hidden">
                          <motion.span
                            initial={{ opacity: 0, y: '100%' }}
                            animate={{ opacity: 1, y: '0%' }}
                            transition={{
                              duration: 0.5,
                              delay: 0.16 + idx * 0.065,
                              ease: EASE_EDITORIAL,
                            }}
                            className={`block text-2xl sm:text-4xl font-light tracking-tight transition-transform duration-150 ${
                              isActive
                                ? 'translate-x-1.5 sm:translate-x-2'
                                : 'group-hover:translate-x-1.5 sm:group-hover:translate-x-2'
                            }`}
                          >
                            {item.label}
                          </motion.span>
                        </div>
                      </div>

                      <motion.span
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.35,
                          delay: 0.2 + idx * 0.06,
                          ease: EASE_EDITORIAL,
                        }}
                        className={`w-9 h-9 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-colors duration-150 shrink-0 ${
                          isActive
                            ? 'border-neutral-600 text-neutral-200'
                            : 'border-neutral-200 text-neutral-500 group-hover:border-neutral-600 group-hover:text-neutral-200'
                        }`}
                        aria-hidden="true"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.span>
                    </button>
                  );
                })}
              </nav>

              {/* Right column: Dark charcoal Horizon Studio info panel */}
              <div className="relative bg-[#1B1B1B] text-white p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
                <motion.button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Tutup menu navigasi"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  className="hidden lg:flex absolute top-6 right-6 w-9 h-9 rounded-full border border-neutral-600 text-neutral-200 hover:bg-white hover:text-neutral-950 hover:border-white items-center justify-center transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </motion.button>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.22, ease: EASE_EDITORIAL }}
                  className="pr-12"
                >
                  <div className="text-2xl sm:text-3xl tracking-[0.04em] leading-none">
                    <span className="font-bold">HORIZON</span>{' '}
                    <span className="font-light text-neutral-200">STUDIO</span>
                    <sup className="text-xs ml-0.5 text-neutral-300">•</sup>
                  </div>

                  <address className="not-italic mt-4 text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-0.5">
                    <p>Jl. Kemang Raya No. 48,</p>
                    <p>Jakarta Selatan 12730</p>
                    <p className="pt-1.5 text-neutral-400 tabular-nums">+62 21 7198 4200</p>
                  </address>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.52, delay: 0.3, ease: EASE_EDITORIAL }}
                  className="grid grid-cols-2 gap-x-8 gap-y-8 my-10"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full border border-neutral-600 text-[10px] text-neutral-300 flex items-center justify-center shrink-0 mt-0.5">
                      A
                    </span>
                    <div>
                      <p className="text-xs font-medium text-neutral-200">Bisnis</p>
                      <a
                        href="mailto:halo@horizonstudio.id"
                        className="text-xs text-neutral-400 hover:text-white transition-colors mt-1 inline-block"
                      >
                        halo@horizonstudio.id
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full border border-neutral-600 text-[10px] text-neutral-300 flex items-center justify-center shrink-0 mt-0.5">
                      B
                    </span>
                    <div>
                      <p className="text-xs font-medium text-neutral-200">Karier</p>
                      <a
                        href="mailto:karier@horizonstudio.id"
                        className="text-xs text-neutral-400 hover:text-white transition-colors mt-1 inline-block"
                      >
                        karier@horizonstudio.id
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full border border-neutral-600 text-[10px] text-neutral-300 flex items-center justify-center shrink-0 mt-0.5">
                      C
                    </span>
                    <div>
                      <p className="text-xs font-medium text-neutral-200">Sosial</p>
                      <ul className="mt-1 space-y-0.5 text-xs text-neutral-400">
                        <li>
                          <a href="#footer" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">
                            Instagram
                          </a>
                        </li>
                        <li>
                          <a href="#footer" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">
                            ArchDaily
                          </a>
                        </li>
                        <li>
                          <a href="#footer" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">
                            LinkedIn
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full border border-neutral-600 text-[10px] text-neutral-300 flex items-center justify-center shrink-0 mt-0.5">
                      D
                    </span>
                    <div>
                      <p className="text-xs font-medium text-neutral-200">Legal</p>
                      <ul className="mt-1 space-y-0.5 text-xs text-neutral-400">
                        <li>
                          <a href="#contact" onClick={() => handleNavigate('#contact')} className="hover:text-white transition-colors">
                            Privasi
                          </a>
                        </li>
                        <li>
                          <a href="#footer" onClick={() => handleNavigate('#footer')} className="hover:text-white transition-colors">
                            Ketentuan
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.48, delay: 0.36, ease: EASE_EDITORIAL }}
                  className="pt-6 border-t border-neutral-700/80 flex items-end justify-between gap-4"
                >
                  <span className="text-[10px] tracking-[0.14em] text-neutral-400">
                    * INFO STUDIO
                  </span>
                  <div className="text-right">
                    <div className="text-3xl sm:text-4xl font-light tracking-tight tabular-nums text-white leading-none">
                      ©2026
                    </div>
                    <p className="text-[10px] tracking-[0.14em] text-neutral-400 mt-1.5">
                      HAK CIPTA DILINDUNGI
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
