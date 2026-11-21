import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { BLOG_ARTICLES, type BlogArticle } from '../data/studioData';
import {
  EASE_EDITORIAL,
  EditorialReveal,
  StaggerGroup,
  StaggerItem,
} from './MotionPrimitives';
import { SafeImage } from './SafeImage';

export function BlogSection() {
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);

  useEffect(() => {
    if (!activeArticle) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveArticle(null);
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [activeArticle]);

  return (
    <section id="blog" className="bg-white py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
        <EditorialReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-9 sm:mb-12">
          <div>
            <p className="text-xs font-medium tracking-[0.12em] text-neutral-500 mb-2">
              Jurnal Arsitektur
            </p>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-neutral-950">
              Artikel &amp; Gagasan Ruang
            </h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-sm">
            Esai seputar arsitektur tropis, kejujuran material, dan tata ruang berkelanjutan dari
            praktik studio kami.
          </p>
        </EditorialReveal>

        {/* 4 tall vertical editorial blog cards matching Reference Image 6 */}
        <StaggerGroup
          stagger={0.08}
          delayChildren={0.05}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
        >
          {BLOG_ARTICLES.map((article, idx) => (
            <StaggerItem key={article.id} y={24} className="h-full">
              <article className="h-full">
                <motion.button
                  type="button"
                  onClick={() => setActiveArticle(article)}
                  aria-label={`Baca artikel: ${article.titleLine1} ${article.titleLine2}`}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
                  className="group w-full h-full text-left rounded-[22px] border border-neutral-200/85 bg-[#FAFAF8] overflow-hidden flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
                >
                  {/* Upper crisp ivory/white editorial card header */}
                  <div className="pt-9 sm:pt-16 lg:pt-24 px-5 pb-5 sm:pb-6 flex-1 flex flex-col justify-end">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-[17px] font-medium leading-[1.3] text-neutral-900 group-hover:text-neutral-600 transition-colors">
                        <span className="block whitespace-nowrap">{article.titleLine1}</span>
                        <span className="block whitespace-nowrap">{article.titleLine2}</span>
                      </h3>

                      {/* Minimal dual-bar editorial mark matching Reference Image 6 */}
                      <div className="flex flex-col items-end shrink-0 pt-1">
                        <div className="flex items-center gap-1" aria-hidden="true">
                          <span className="w-2.5 h-[2px] bg-neutral-700" />
                          <span className="w-2.5 h-[2px] bg-neutral-700" />
                        </div>
                        <span className="mt-2 text-[9px] leading-tight tracking-[0.1em] uppercase text-neutral-400 text-right tabular-nums whitespace-nowrap">
                          0{idx + 1} · {article.category}
                        </span>
                      </div>
                    </div>

                    <div className="w-3.5 h-px bg-neutral-400 my-3" aria-hidden="true" />

                    <p className="text-xs sm:text-[11px] leading-relaxed text-neutral-500 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="mt-3 text-[11px] sm:text-[10px] text-neutral-400 flex items-center gap-1.5">
                      <span>{article.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  {/* Lower photographic panel with soft organic torn-paper upper transition edge */}
                  <div className="relative h-48 sm:h-56 w-full bg-neutral-200 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.65, ease: EASE_EDITORIAL }}
                      className="w-full h-full will-change-transform"
                    >
                      <SafeImage
                        src={article.image}
                        alt={`${article.titleLine1} ${article.titleLine2}`}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    </motion.div>

                    {/* Subtle organic deckled paper edge matching Reference Image 6 */}
                    <svg
                      viewBox="0 0 320 26"
                      preserveAspectRatio="none"
                      className="absolute -top-px left-0 w-full h-5 text-[#FAFAF8] pointer-events-none"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M0 0h320v16c-18 4-36-7-58-4-24 3-44 10-70 3-26-7-48-11-74-3-25 8-48 11-76 3C24 10 11 12 0 15V0z" />
                    </svg>
                  </div>
                </motion.button>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            key="blog-article-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeArticle.titleLine1} ${activeArticle.titleLine2}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE_EDITORIAL }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 sm:p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setActiveArticle(null);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.985 }}
              transition={{ duration: 0.42, ease: EASE_EDITORIAL }}
              className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="relative h-52 sm:h-72 bg-neutral-100 shrink-0 overflow-hidden">
                <motion.div
                  initial={{ scale: 1.06 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.75, ease: EASE_EDITORIAL }}
                  className="w-full h-full"
                >
                  <SafeImage
                    src={activeArticle.image}
                    alt={`${activeArticle.titleLine1} ${activeArticle.titleLine2}`}
                    loading="eager"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  aria-label="Tutup artikel"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-neutral-900 hover:bg-neutral-950 hover:text-white flex items-center justify-center transition-colors duration-150 shadow-sm"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </motion.button>
              </div>

              <div className="p-6 sm:p-9 overflow-y-auto">
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <span>{activeArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeArticle.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeArticle.readTime}</span>
                </div>

                <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-medium text-neutral-950 leading-snug">
                  {activeArticle.titleLine1} — {activeArticle.titleLine2}
                </h3>

                <div className="mt-6 space-y-4 text-sm sm:text-[15px] leading-relaxed text-neutral-600">
                  {activeArticle.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
