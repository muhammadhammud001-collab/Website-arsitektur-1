import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import {
  PORTFOLIO_PHOTOS,
  type AlbumCategory,
  type PortfolioPhoto,
} from '../data/studioData';
import { getVisiblePortfolioItems } from '../utils/studioLogic';
import {
  EASE_EDITORIAL,
  EDITORIAL_VIEWPORT,
  EditorialReveal,
} from './MotionPrimitives';
import { SafeImage } from './SafeImage';

interface PortfolioGalleryProps {
  onSelectPhoto: (photo: PortfolioPhoto) => void;
}

const ALBUMS: AlbumCategory[] = ['Semua', 'Hunian', 'Komersial', 'Publik'];

function getGridSpanClass(index: number, isAllAlbums: boolean): string {
  if (!isAllAlbums) {
    return 'col-span-1 md:col-span-4 aspect-[4/3]';
  }
  // Mobile (2-col): paired rows with zero half-row gaps (0+1, 2 full, 3+4, 5 full, 6 full, 7 full, 8+9, 10 full, 11+12, 13 full)
  // Desktop (12-col): Reference Image 3 asymmetric 4-row rhythm (3+6+3, 4+4+4, 6+6, 4+4+4)
  switch (index) {
    case 0:
      return 'col-span-1 md:col-span-3 aspect-[4/3] md:aspect-auto md:h-[260px]';
    case 1:
      return 'col-span-1 md:col-span-6 aspect-[4/3] md:aspect-auto md:h-[260px]';
    case 2:
      return 'col-span-2 md:col-span-3 aspect-[16/10] md:aspect-auto md:h-[260px]';
    case 3:
    case 4:
      return 'col-span-1 md:col-span-4 aspect-[4/3] md:aspect-auto md:h-[240px]';
    case 5:
      return 'col-span-2 md:col-span-4 aspect-[16/10] md:aspect-auto md:h-[240px]';
    case 6:
    case 7:
      return 'col-span-2 md:col-span-6 aspect-[16/10] md:aspect-auto md:h-[290px]';
    case 8:
    case 9:
      return 'col-span-1 md:col-span-4 aspect-[4/3] md:aspect-auto md:h-[250px]';
    case 10:
    case 13:
      return 'col-span-2 md:col-span-4 aspect-[16/10] md:aspect-auto md:h-[250px]';
    default:
      return 'col-span-1 md:col-span-4 aspect-[4/3] md:aspect-auto md:h-[250px]';
  }
}

export function PortfolioGallery({ onSelectPhoto }: PortfolioGalleryProps) {
  const [activeAlbum, setActiveAlbum] = useState<AlbumCategory>('Semua');
  const [expanded, setExpanded] = useState(false);

  const { visible, hasMore } = getVisiblePortfolioItems(
    PORTFOLIO_PHOTOS,
    activeAlbum,
    expanded,
    11
  );

  return (
    <section id="portfolio" className="bg-white py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
        {/* Reference Image 3 editorial intro header unified on pure white canvas */}
        <EditorialReveal className="max-w-xl mb-9 sm:mb-12">
          <p className="text-xl sm:text-3xl font-normal text-neutral-400 leading-snug tracking-tight">
            Anda sedang melihat koleksi
            <br />
            Karya Arsitektur Horizon
          </p>

          <div
            className="mt-4 flex flex-wrap items-center gap-x-5 sm:gap-x-6 gap-y-2"
            role="tablist"
            aria-label="Kategori proyek arsitektur"
          >
            {ALBUMS.map((album) => {
              const isSelected = activeAlbum === album;
              return (
                <button
                  key={album}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setActiveAlbum(album);
                    setExpanded(false);
                  }}
                  className={`relative min-h-[40px] pb-1.5 text-base sm:text-xl font-semibold tracking-tight transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 ${
                    isSelected
                      ? 'text-neutral-950'
                      : 'text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  <span>{album}</span>
                  {isSelected && (
                    <motion.span
                      layoutId="portfolio-active-tab-underline"
                      transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
                      className="absolute left-0 right-0 bottom-0 h-[2px] bg-neutral-950"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </EditorialReveal>

        {/* Asymmetric editorial photo gallery grid with layout transitions */}
        <motion.div
          layout
          data-testid="portfolio-grid"
          className="grid grid-cols-2 md:grid-cols-12 gap-3 sm:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((photo, index) => (
              <motion.button
                key={photo.id}
                layout
                type="button"
                onClick={() => onSelectPhoto(photo)}
                aria-label={`Buka detail proyek ${photo.title}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                viewport={EDITORIAL_VIEWPORT}
                transition={{
                  opacity: { duration: 0.55, delay: Math.min(index, 5) * 0.06, ease: EASE_EDITORIAL },
                  y: { duration: 0.65, delay: Math.min(index, 5) * 0.06, ease: EASE_EDITORIAL },
                  layout: { duration: 0.45, ease: EASE_EDITORIAL },
                }}
                whileTap={{ scale: 0.985 }}
                className={`group relative overflow-hidden bg-neutral-100 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 ${getGridSpanClass(
                  index,
                  activeAlbum === 'Semua'
                )}`}
              >
                <motion.div
                  initial={{ scale: 1.07 }}
                  whileInView={{ scale: 1 }}
                  viewport={EDITORIAL_VIEWPORT}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.65, ease: EASE_EDITORIAL }}
                  className="w-full h-full will-change-transform"
                >
                  <SafeImage
                    src={photo.image}
                    alt={`${photo.title} — ${photo.location}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 sm:p-5">
                  <span className="text-[10px] sm:text-[11px] tracking-[0.14em] text-neutral-300 uppercase translate-y-2 group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-300">
                    {photo.series} · {photo.album}
                  </span>
                  <span className="text-sm sm:text-base font-medium text-white mt-0.5 translate-y-2 group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-300 delay-75">
                    {photo.title}
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Functional Load More / Show Less button matching Reference Image 3 */}
        {hasMore && (
          <div className="mt-10 sm:mt-12 flex justify-center">
            <motion.button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.18, ease: EASE_EDITORIAL }}
              className="inline-flex items-center gap-2 min-h-[44px] px-7 py-3 border border-neutral-300 bg-white text-neutral-900 text-xs font-medium tracking-[0.16em] uppercase hover:bg-neutral-950 hover:text-white hover:border-neutral-950 transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
            >
              {expanded ? (
                <>
                  <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Tampilkan Lebih Sedikit</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Muat Lebih Banyak</span>
                </>
              )}
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}
