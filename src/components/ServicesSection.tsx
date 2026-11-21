import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Minus, Plus } from 'lucide-react';
import { SERVICES, type ServiceItem } from '../data/studioData';
import {
  EASE_EDITORIAL,
  EDITORIAL_VIEWPORT,
  EditorialReveal,
  HairlineDivider,
} from './MotionPrimitives';

interface ServicesSectionProps {
  onStartProject: (serviceTitle?: string) => void;
}

export function ServicesSection({ onStartProject }: ServicesSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggleService = (service: ServiceItem) => {
    setExpandedId((prev) => (prev === service.id ? null : service.id));
  };

  return (
    <section id="services" className="bg-white py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
        {/* Top hairline rule matching Reference Image 5 */}
        <HairlineDivider className="h-px w-full bg-neutral-200" />

        <div className="pt-9 sm:pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left column: "Layanan kami" at top, "Mulai proyek" + "Pelajari lanjut" at bottom on desktop */}
          <EditorialReveal className="lg:col-span-5 flex flex-col justify-between gap-6 lg:gap-10">
            <div>
              <h2 className="text-sm font-medium text-neutral-900">Layanan kami</h2>
            </div>

            <div className="hidden lg:flex items-center gap-6 flex-wrap">
              <motion.button
                type="button"
                onClick={() => onStartProject()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.985 }}
                transition={{ duration: 0.18, ease: EASE_EDITORIAL }}
                className="min-h-[42px] px-6 py-2.5 rounded-full bg-neutral-950 text-white text-xs sm:text-sm font-medium hover:bg-neutral-800 transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
              >
                Konsultasi
              </motion.button>

              <motion.button
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  setExpandedId((prev) => (prev ? null : SERVICES[0].id))
                }
                className="min-h-[42px] text-xs sm:text-sm font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-600 transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950"
              >
                {expandedId ? 'Tutup' : 'Rincian'}
              </motion.button>
            </div>
          </EditorialReveal>

          {/* Right column: 4 stacked service rows separated by animated hairline rules */}
          <div className="lg:col-span-7">
            {SERVICES.map((service, index) => {
              const isExpanded = expandedId === service.id;
              const isHovered = hoveredId === service.id;
              const serviceIndex = `0${index + 1}`;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={EDITORIAL_VIEWPORT}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: EASE_EDITORIAL,
                  }}
                  className={`${index === 0 ? 'pb-7 sm:pb-10' : 'pb-7 sm:pb-10'} ${
                    index === SERVICES.length - 1 ? 'pb-2' : ''
                  }`}
                >
                  {index > 0 && (
                    <HairlineDivider
                      className="h-px w-full bg-neutral-200 mb-7 sm:mb-10"
                      delay={index * 0.07}
                    />
                  )}

                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => toggleService(service)}
                    onMouseEnter={() => setHoveredId(service.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="w-full text-left grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-6 items-start group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950"
                  >
                    <div className="sm:col-span-5 flex items-start justify-between gap-3">
                      <div className="flex items-baseline gap-2.5">
                        <motion.span
                          aria-hidden="true"
                          animate={{ opacity: isHovered || isExpanded ? 1 : 0.38 }}
                          transition={{ duration: 0.25, ease: EASE_EDITORIAL }}
                          className="text-[11px] font-medium tabular-nums text-neutral-900 select-none shrink-0"
                        >
                          {serviceIndex}
                        </motion.span>
                        <motion.h3
                          animate={{ x: isHovered ? 6 : 0 }}
                          transition={{ duration: 0.3, ease: EASE_EDITORIAL }}
                          className="text-lg sm:text-2xl font-medium tracking-tight text-neutral-950 leading-snug group-hover:text-neutral-700 transition-colors duration-150"
                        >
                          {service.title}
                        </motion.h3>
                      </div>
                      <span className="sm:hidden mt-1 text-neutral-400 shrink-0" aria-hidden="true">
                        {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </div>
                    <p className="sm:col-span-7 text-sm sm:text-[15px] text-neutral-500 leading-relaxed">
                      {service.summary}
                    </p>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key={`${service.id}-details`}
                        initial={{
                          opacity: 0,
                          y: -8,
                          clipPath: 'inset(0% 0% 100% 0%)',
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          clipPath: 'inset(0% 0% 0% 0%)',
                        }}
                        exit={{
                          opacity: 0,
                          y: -6,
                          clipPath: 'inset(0% 0% 100% 0%)',
                        }}
                        transition={{ duration: 0.38, ease: EASE_EDITORIAL }}
                        className="mt-5 sm:grid sm:grid-cols-12 sm:gap-6"
                      >
                        <div className="sm:col-start-6 sm:col-span-7 pt-4 border-t border-neutral-100 flex flex-col gap-3">
                          <p className="text-xs text-neutral-500">
                            Estimasi waktu:{' '}
                            <span className="text-neutral-900 font-medium">{service.timeline}</span>
                          </p>
                          <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-700">
                            {service.deliverables.map((item) => (
                              <li key={item} className="flex items-center gap-2">
                                <span
                                  className="w-1 h-1 rounded-full bg-neutral-400 shrink-0"
                                  aria-hidden="true"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="pt-1">
                            <motion.button
                              type="button"
                              onClick={() => onStartProject(service.title)}
                              whileHover={{ x: 6 }}
                              whileTap={{ scale: 0.985 }}
                              transition={{ duration: 0.25, ease: EASE_EDITORIAL }}
                              className="inline-flex items-center gap-1.5 min-h-[36px] text-xs font-medium text-neutral-950 hover:text-neutral-600 transition-colors"
                            >
                              <span>Konsultasi {service.title}</span>
                              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile actions placed naturally below the service list */}
          <div className="flex lg:hidden items-center gap-5 pt-2">
            <motion.button
              type="button"
              onClick={() => onStartProject()}
              whileTap={{ scale: 0.985 }}
              className="min-h-[44px] px-6 py-2.5 rounded-full bg-neutral-950 text-white text-sm font-medium hover:bg-neutral-800 transition-colors whitespace-nowrap"
            >
              Konsultasi
            </motion.button>
            <button
              type="button"
              onClick={() =>
                setExpandedId((prev) => (prev ? null : SERVICES[0].id))
              }
              className="min-h-[44px] text-sm font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-600 transition-colors whitespace-nowrap"
            >
              {expandedId ? 'Tutup' : 'Rincian'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
