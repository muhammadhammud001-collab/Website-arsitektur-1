import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { EASE_EDITORIAL } from './MotionPrimitives';

interface HeroSectionProps {
  onStartProject: () => void;
}

const PARTNER_BLOX = [
  { id: 'arsitama', name: 'Arsitama', icon: 'ring' },
  { id: 'struktura', name: 'Struktura', icon: 'hourglass' },
  { id: 'monolit', name: 'Monolit', icon: 'duotone' },
  { id: 'tektonik', name: 'Tektonik', icon: 'split' },
] as const;

function PartnerMark({ type }: { type: (typeof PARTNER_BLOX)[number]['icon'] }) {
  switch (type) {
    case 'ring':
      return (
        <svg viewBox="0 0 20 20" className="w-4 h-4 text-neutral-500" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.75" />
        </svg>
      );
    case 'hourglass':
      return (
        <svg viewBox="0 0 20 20" className="w-4 h-4 text-neutral-950" fill="currentColor" aria-hidden="true">
          <path d="M5 4h10l-4 6 4 6H5l4-6-4-6z" />
        </svg>
      );
    case 'duotone':
      return (
        <svg viewBox="0 0 24 20" className="w-5 h-4 text-neutral-950" fill="none" aria-hidden="true">
          <circle cx="8" cy="10" r="5" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="15" cy="10" r="5" fill="currentColor" />
        </svg>
      );
    case 'split':
      return (
        <svg viewBox="0 0 20 20" className="w-4 h-4 text-neutral-950" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M10 3.5a6.5 6.5 0 0 1 0 13V3.5z" fill="currentColor" />
        </svg>
      );
  }
}

export function HeroSection({ onStartProject }: HeroSectionProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start end', 'end start'],
  });

  // Subtle GPU-only scroll parallax capped within 32px total travel (<= 36px guardrail)
  const stageContentY = useTransform(scrollYProgress, [0, 1], [16, -16]);

  return (
    <section id="hero" className="bg-white pt-10 sm:pt-14 lg:pt-16 pb-16 sm:pb-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
        {/* Centered typographic introduction matching Reference Image 1 */}
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease: EASE_EDITORIAL }}
            className="font-serif text-xs sm:text-sm tracking-[0.1em] sm:tracking-[0.12em] text-neutral-700 mb-4 sm:mb-5"
          >
            Biro arsitektur yang merancang ruang kontekstual, berkelanjutan, dan presisi.
          </motion.p>

          <h1 className="text-[34px] sm:text-5xl lg:text-[62px] font-bold tracking-[-0.035em] leading-[1.06] text-neutral-950">
            <span className="block overflow-hidden pb-1">
              <motion.span
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.72, delay: 0.14, ease: EASE_EDITORIAL }}
                className="block"
              >
                Ruang Bermakna,
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.72, delay: 0.26, ease: EASE_EDITORIAL }}
                className="block"
              >
                Dibangun Presisi
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35, ease: EASE_EDITORIAL }}
            className="mt-4 sm:mt-5 text-sm sm:text-base text-neutral-500 max-w-xl mx-auto leading-relaxed"
          >
            Kami menghadirkan desain hunian tropis, bangunan komersial, dan ruang publik yang
            selaras dengan iklim Indonesia—dari sketsa awal hingga serah terima konstruksi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.44, ease: EASE_EDITORIAL }}
            className="mt-7 sm:mt-8 flex justify-center"
          >
            <button
              type="button"
              onClick={onStartProject}
              className="group inline-flex items-center gap-3 min-h-[46px] pl-6 pr-2 py-2 rounded-full bg-neutral-950 text-white text-sm font-medium hover:bg-neutral-800 hover:scale-[1.02] active:scale-[0.97] transition-all duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
            >
              <span>Mulai Konsultasi</span>
              <span className="w-8 h-8 rounded-full bg-white text-neutral-950 flex items-center justify-center transition-transform duration-150 group-hover:translate-x-0.5">
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </button>
          </motion.div>
        </div>

        {/* Atmospheric video hero showcase block with editorial scale settle & subtle scroll parallax */}
        <div
          ref={stageRef}
          className="mt-10 sm:mt-12 rounded-[24px] sm:rounded-[28px] overflow-hidden"
        >
          <motion.div
            data-testid="hero-solid-black-stage"
            initial={{ scale: 1.06, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.25, ease: EASE_EDITORIAL }}
            className="relative w-full min-h-[340px] sm:min-h-[440px] lg:min-h-[490px] rounded-[24px] sm:rounded-[28px] bg-neutral-900 text-white overflow-hidden flex flex-col justify-between px-6 pt-7 pb-0 sm:p-10 lg:p-12"
          >
            {/* Full-bleed ambient clouds background video */}
            <video
              src="https://res.cloudinary.com/dqlgvzlxk/video/upload/v1795250414/Clouds_moving_in_sky_bc22f45b_1080p_w42y0v.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            />

            {/* Subtle atmospheric scrim to preserve sky clarity while keeping white typography legible */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/45 pointer-events-none"
            />

            {/* Scroll-linked parallax interior wrapper (desktop-safe, bounded within stage) */}
            <motion.div
              style={{ y: stageContentY }}
              className="relative z-10 flex-1 flex flex-col justify-between will-change-transform"
            >
              {/* Top-left metric */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.52, ease: EASE_EDITORIAL }}
                className="max-w-[210px] drop-shadow-[0_1px_10px_rgba(0,0,0,0.35)]"
              >
                <div className="text-4xl sm:text-5xl font-bold tracking-tight tabular-nums text-white leading-none">
                  98%
                </div>
                <p className="mt-2 text-xs sm:text-sm text-white/90 leading-snug">
                  Tepat Waktu &amp;
                  <br />
                  Anggaran Terjaga
                </p>
              </motion.div>

              {/* Bottom-right feature callout */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.62, ease: EASE_EDITORIAL }}
                className="self-end text-right max-w-[250px] mt-10 sm:mt-0 sm:pb-10 drop-shadow-[0_1px_10px_rgba(0,0,0,0.35)]"
              >
                <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white leading-tight">
                  Integrasi
                  <br />
                  BIM
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-white/90 leading-relaxed">
                  Koordinasi arsitektur, struktur, dan MEP secara presisi sejak tahap skematik.
                </p>
              </motion.div>
            </motion.div>

            {/* Seamless bottom-center white cutout bar matching Reference Image 1 */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.68, delay: 0.68, ease: EASE_EDITORIAL }}
              className="relative z-10 mt-7 mx-auto sm:mt-0 sm:absolute sm:bottom-0 sm:left-1/2 sm:-translate-x-1/2 flex items-end justify-center max-w-full"
            >
              {/* Left concave inverse fillet */}
              <svg
                viewBox="0 0 28 28"
                className="hidden sm:block w-7 h-7 shrink-0 text-white"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M28 0v28H0c15.464 0 28-12.536 28-28z" />
              </svg>

              <div className="bg-white text-neutral-950 rounded-t-[20px] sm:rounded-t-[24px] px-5 sm:px-9 py-3.5 sm:py-4 grid grid-cols-2 sm:flex sm:items-center sm:justify-center gap-x-5 sm:gap-x-8 gap-y-2.5">
                {PARTNER_BLOX.map((partner) => (
                  <div
                    key={partner.id}
                    className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-neutral-900 whitespace-nowrap shrink-0"
                  >
                    <PartnerMark type={partner.icon} />
                    <span>{partner.name}</span>
                  </div>
                ))}
              </div>

              {/* Right concave inverse fillet */}
              <svg
                viewBox="0 0 28 28"
                className="hidden sm:block w-7 h-7 shrink-0 text-white"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M0 0v28h28C12.536 28 0 15.464 0 0z" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
