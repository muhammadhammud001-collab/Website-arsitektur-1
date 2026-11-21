import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PORTFOLIO_PHOTOS, type PortfolioPhoto } from '../data/studioData';
import { getSpreadState } from '../utils/studioLogic';
import { EASE_EDITORIAL } from './MotionPrimitives';
import { SafeImage } from './SafeImage';

interface PortfolioSpreadModalProps {
  activePhotoId: string | null;
  onSelectPhotoId: (id: string) => void;
  onClose: () => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction * 18,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.36,
      ease: EASE_EDITORIAL,
    },
  },
  exit: (direction: number) => ({
    x: direction * -18,
    opacity: 0,
    transition: {
      duration: 0.22,
      ease: EASE_EDITORIAL,
    },
  }),
};

export function PortfolioSpreadModal({
  activePhotoId,
  onSelectPhotoId,
  onClose,
}: PortfolioSpreadModalProps) {
  const [direction, setDirection] = useState<number>(1);
  const spread = activePhotoId ? getSpreadState(PORTFOLIO_PHOTOS, activePhotoId) : null;

  const selectWithDirection = useCallback(
    (targetId: string, explicitDirection?: number) => {
      if (explicitDirection !== undefined) {
        setDirection(explicitDirection);
      } else if (activePhotoId) {
        const currentIdx = PORTFOLIO_PHOTOS.findIndex((p) => p.id === activePhotoId);
        const nextIdx = PORTFOLIO_PHOTOS.findIndex((p) => p.id === targetId);
        setDirection(nextIdx >= currentIdx ? 1 : -1);
      }
      onSelectPhotoId(targetId);
    },
    [activePhotoId, onSelectPhotoId]
  );

  useEffect(() => {
    if (!activePhotoId) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      const currentIdx = PORTFOLIO_PHOTOS.findIndex((p) => p.id === activePhotoId);
      if (currentIdx === -1) return;

      if (event.key === 'ArrowRight') {
        const next = PORTFOLIO_PHOTOS[(currentIdx + 1) % PORTFOLIO_PHOTOS.length];
        selectWithDirection(next.id, 1);
      } else if (event.key === 'ArrowLeft') {
        const prev =
          PORTFOLIO_PHOTOS[
            (currentIdx - 1 + PORTFOLIO_PHOTOS.length) % PORTFOLIO_PHOTOS.length
          ];
        selectWithDirection(prev.id, -1);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePhotoId, onClose, selectWithDirection]);

  const handleStep = (stepDirection: -1 | 1) => {
    if (!spread) return;
    const currentIdx = PORTFOLIO_PHOTOS.findIndex((p) => p.id === spread.activePhoto.id);
    const nextIdx =
      (currentIdx + stepDirection + PORTFOLIO_PHOTOS.length) % PORTFOLIO_PHOTOS.length;
    selectWithDirection(PORTFOLIO_PHOTOS[nextIdx].id, stepDirection);
  };

  return (
    <AnimatePresence>
      {spread && (
        <motion.div
          key="portfolio-spread-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`Detail proyek: ${spread.activePhoto.title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE_EDITORIAL }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-0 sm:p-6 lg:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          {/* Two-column magazine monograph spread faithfully matching Reference Image 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.985 }}
            transition={{ duration: 0.45, ease: EASE_EDITORIAL }}
            className="w-full h-full sm:h-auto max-w-6xl bg-white shadow-2xl flex flex-col lg:grid lg:grid-cols-2 sm:max-h-[92vh] overflow-y-auto lg:overflow-hidden"
          >
            {/* Mobile sticky top bar so close button is immediately reachable */}
            <div className="flex lg:hidden shrink-0 items-center justify-between px-5 py-3.5 bg-white border-b border-neutral-100 sticky top-0 z-20">
              <span className="text-xs font-medium text-neutral-800 tabular-nums">
                Halaman {spread.pageNumber}
              </span>
              <span className="text-xs font-medium tracking-[0.16em] uppercase text-neutral-800">
                {spread.activePhoto.series}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup tampilan proyek"
                className="w-9 h-9 rounded-full border border-neutral-200 text-neutral-800 hover:bg-neutral-950 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Left column: Full-bleed active clicked photograph with staggered panel entrance */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.04, ease: EASE_EDITORIAL }}
              className="relative shrink-0 bg-neutral-100 aspect-[4/3] sm:aspect-[16/11] lg:aspect-auto lg:min-h-[660px] overflow-hidden"
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={spread.activePhoto.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full"
                >
                  <SafeImage
                    src={spread.activePhoto.image}
                    alt={`${spread.activePhoto.title} — ${spread.activePhoto.location}`}
                    loading="eager"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Right column: Pure white monograph layout staggered 0.08s after left panel */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.12, ease: EASE_EDITORIAL }}
              className="relative z-10 shrink-0 lg:shrink bg-white p-5 sm:p-8 lg:p-10 flex flex-col justify-between gap-6 lg:gap-0 lg:min-h-[660px]"
            >
              {/* Desktop editorial top bar: Halaman N | Seri | Tutup */}
              <div className="hidden lg:flex items-center justify-between gap-4 pb-6">
                <span className="text-xs font-medium text-neutral-800 tabular-nums">
                  Halaman {spread.pageNumber}
                </span>

                <span className="text-xs font-medium tracking-[0.16em] uppercase text-neutral-800">
                  {spread.activePhoto.series}
                </span>

                <motion.button
                  type="button"
                  onClick={onClose}
                  aria-label="Tutup tampilan proyek"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  className="w-8 h-8 rounded-full border border-neutral-200 text-neutral-700 hover:bg-neutral-950 hover:text-white hover:border-neutral-950 flex items-center justify-center transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </motion.button>
              </div>

              {/* Asymmetric 2-column selectable collage & narrative with directional crossfade */}
              <AnimatePresence mode="wait" custom={direction}>
                {(() => {
                  const [thumbTall, thumbTopRight, thumbMidRight, thumbBottomLeft] =
                    spread.relatedPhotos as [
                      PortfolioPhoto | undefined,
                      PortfolioPhoto | undefined,
                      PortfolioPhoto | undefined,
                      PortfolioPhoto | undefined,
                    ];

                  return (
                    <motion.div
                      key={`spread-content-${spread.activePhoto.id}`}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="grid grid-cols-12 gap-4 lg:my-auto"
                    >
                      {/* Inner left column: tall vertical photo + smaller square-ish detail photo below */}
                      <div className="col-span-6 flex flex-col gap-4">
                        {thumbTall && (
                          <button
                            type="button"
                            onClick={() => selectWithDirection(thumbTall.id)}
                            aria-label={`Lihat proyek ${thumbTall.title}`}
                            className="group relative overflow-hidden bg-neutral-100 aspect-[3/4] w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
                          >
                            <SafeImage
                              src={thumbTall.image}
                              alt={thumbTall.title}
                              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                            />
                            <span className="sr-only">Beralih ke {thumbTall.title}</span>
                          </button>
                        )}

                        {thumbBottomLeft && (
                          <div className="pl-5 sm:pl-8">
                            <button
                              type="button"
                              onClick={() => selectWithDirection(thumbBottomLeft.id)}
                              aria-label={`Lihat proyek ${thumbBottomLeft.title}`}
                              className="group relative overflow-hidden bg-neutral-100 aspect-square w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
                            >
                              <SafeImage
                                src={thumbBottomLeft.image}
                                alt={thumbBottomLeft.title}
                                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                              />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Inner right column: landscape photo + medium photo + date & short editorial description */}
                      <div className="col-span-6 flex flex-col gap-4">
                        {thumbTopRight && (
                          <button
                            type="button"
                            onClick={() => selectWithDirection(thumbTopRight.id)}
                            aria-label={`Lihat proyek ${thumbTopRight.title}`}
                            className="group relative overflow-hidden bg-neutral-100 aspect-[16/10] w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
                          >
                            <SafeImage
                              src={thumbTopRight.image}
                              alt={thumbTopRight.title}
                              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                            />
                          </button>
                        )}

                        {thumbMidRight && (
                          <button
                            type="button"
                            onClick={() => selectWithDirection(thumbMidRight.id)}
                            aria-label={`Lihat proyek ${thumbMidRight.title}`}
                            className="group relative overflow-hidden bg-neutral-100 aspect-[4/3] w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
                          >
                            <SafeImage
                              src={thumbMidRight.image}
                              alt={thumbMidRight.title}
                              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                            />
                          </button>
                        )}

                        {/* Short description & date below right photos matching Reference Image 4 */}
                        <div className="pt-2">
                          <p className="text-[11px] font-semibold text-neutral-950">
                            {spread.activePhoto.date} · {spread.activePhoto.title}
                          </p>
                          <p
                            data-testid="spread-description"
                            className="mt-2 text-xs leading-relaxed text-neutral-700"
                          >
                            {spread.activePhoto.description}
                          </p>
                          <p className="mt-3 text-[11px] font-medium text-neutral-900 text-right">
                            - {spread.activePhoto.attribution}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>

              {/* Bottom monograph credit & page step controls */}
              <div className="pt-6 mt-4 flex items-center justify-between gap-4 border-t border-neutral-100">
                <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-neutral-700">
                  KARYA HORIZON
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-neutral-400 tabular-nums mr-1">
                    {spread.pageNumber} / {spread.totalPages}
                  </span>
                  <motion.button
                    type="button"
                    onClick={() => handleStep(-1)}
                    aria-label="Proyek sebelumnya"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    className="w-8 h-8 rounded-full border border-neutral-200 text-neutral-700 hover:bg-neutral-950 hover:text-white hover:border-neutral-950 flex items-center justify-center transition-colors duration-150"
                  >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => handleStep(1)}
                    aria-label="Proyek berikutnya"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    className="w-8 h-8 rounded-full border border-neutral-200 text-neutral-700 hover:bg-neutral-950 hover:text-white hover:border-neutral-950 flex items-center justify-center transition-colors duration-150"
                  >
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
