import { type MouseEvent, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ASSETS } from '../data/studioData';
import { scrollToSection } from '../utils/navigation';
import { StaggerGroup, StaggerItem } from './MotionPrimitives';
import { SafeImage } from './SafeImage';

export function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });

  // Ultra-subtle atmospheric settle on skyline as user reaches page bottom
  const skylineScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const skylineY = useTransform(scrollYProgress, [0, 1], [14, 0]);

  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    scrollToSection(href);
  };

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="bg-[#F7F7F5] border-t border-neutral-200/70 pt-14 sm:pt-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
        <StaggerGroup
          stagger={0.08}
          delayChildren={0.04}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pb-8 sm:pb-12"
        >
          {/* Left column: Framed minimal serif logo box + copyright */}
          <StaggerItem
            y={16}
            className="md:col-span-6 flex flex-col justify-between gap-6 md:gap-10"
          >
            <div>
              <a
                href="#hero"
                onClick={(e) => handleAnchorClick(e, '#hero')}
                className="inline-block border border-neutral-300/90 bg-white/70 px-3.5 py-1.5 font-serif text-sm tracking-[0.14em] text-neutral-900 hover:border-neutral-900 active:scale-95 transition-all"
              >
                HORIZON
              </a>
            </div>

            <p className="text-xs text-neutral-500 leading-relaxed">
              © 2026 Horizon Studio.
              <br />
              Seluruh hak cipta dilindungi.
            </p>
          </StaggerItem>

          {/* Right columns: 2-column layout on both mobile and desktop */}
          <div className="md:col-span-6 grid grid-cols-[minmax(104px,auto)_1fr] sm:grid-cols-2 gap-6 sm:gap-8">
            <StaggerItem y={16}>
              <h2 className="text-sm font-normal text-neutral-400 mb-3.5 sm:mb-4">Navigasi</h2>
              <ul className="space-y-2.5 text-sm text-neutral-700">
                <li>
                  <a
                    href="#about"
                    onClick={(e) => handleAnchorClick(e, '#about')}
                    className="inline-block py-0.5 hover:text-neutral-950 transition-colors"
                  >
                    Tentang
                  </a>
                </li>
                <li>
                  <a
                    href="#portfolio"
                    onClick={(e) => handleAnchorClick(e, '#portfolio')}
                    className="inline-block py-0.5 hover:text-neutral-950 transition-colors"
                  >
                    Portofolio
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    onClick={(e) => handleAnchorClick(e, '#services')}
                    className="inline-block py-0.5 hover:text-neutral-950 transition-colors"
                  >
                    Layanan
                  </a>
                </li>
                <li>
                  <a
                    href="#blog"
                    onClick={(e) => handleAnchorClick(e, '#blog')}
                    className="inline-block py-0.5 hover:text-neutral-950 transition-colors"
                  >
                    Jurnal
                  </a>
                </li>
              </ul>
            </StaggerItem>

            <StaggerItem y={16}>
              <h2 className="text-sm font-normal text-neutral-400 mb-3.5 sm:mb-4">Perusahaan</h2>
              <ul className="space-y-2.5 text-sm text-neutral-700">
                <li>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block py-0.5 hover:text-neutral-950 transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={(e) => handleAnchorClick(e, '#contact')}
                    className="inline-block py-0.5 hover:text-neutral-950 transition-colors"
                  >
                    Kontak
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:halo@horizonstudio.id"
                    className="inline-block py-0.5 text-[13px] sm:text-sm whitespace-nowrap hover:text-neutral-950 transition-colors"
                  >
                    halo@horizonstudio.id
                  </a>
                </li>
              </ul>
            </StaggerItem>
          </div>
        </StaggerGroup>
      </div>

      {/* Seamless #F7F7F5-matched monochrome architectural skyline with ultra-subtle scroll scale settle */}
      <div className="w-full max-w-[1360px] mx-auto px-2 sm:px-6 pt-2 overflow-hidden">
        <motion.div
          style={{ scale: skylineScale, y: skylineY, transformOrigin: 'bottom center' }}
          className="will-change-transform"
        >
          <SafeImage
            src={ASSETS.footerSkyline}
            alt="Ilustrasi arsitektur monokrom cakrawala gedung perkotaan berbingkai pepohonan"
            loading="eager"
            className="block w-full h-auto max-h-[220px] sm:max-h-[320px] lg:max-h-[380px] object-contain object-bottom select-none pointer-events-none"
          />
        </motion.div>
      </div>
    </footer>
  );
}
