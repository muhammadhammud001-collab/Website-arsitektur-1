import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { CLIENT_LOGOS, TEAM_MEMBERS } from '../data/studioData';
import {
  EASE_EDITORIAL,
  EDITORIAL_VIEWPORT,
  EditorialReveal,
  HairlineDivider,
  ImageRevealFrame,
  StaggerGroup,
  StaggerItem,
} from './MotionPrimitives';
import { SafeImage } from './SafeImage';

interface AboutSectionProps {
  onChatClick: () => void;
}

const ARCH_TOOLS = [
  { id: 'autocad', label: 'AutoCAD' },
  { id: 'revit', label: 'Revit' },
  { id: 'sketchup', label: 'SketchUp' },
  { id: 'rhino', label: 'Rhino' },
  { id: 'lumion', label: 'Lumion' },
] as const;

function ArchToolLogo({ id }: { id: (typeof ARCH_TOOLS)[number]['id'] }) {
  switch (id) {
    case 'autocad':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M12 4L4.5 19.5h3.2l1.6-3.5h5.4l1.6 3.5h3.2L12 4z" strokeLinejoin="round" />
          <path d="M10.4 13.2L12 9.5l1.6 3.7h-3.2z" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'revit':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="2.5" />
          <path d="M9 16V8h4a2.2 2.2 0 0 1 0 4.4H9m3.2 0L15.2 16" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'sketchup':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M12 3.5L20 8v8l-8 4.5L4 16V8l8-4.5z" strokeLinejoin="round" />
          <path d="M4 8l8 4.5L20 8M12 12.5V20.5" strokeLinejoin="round" />
        </svg>
      );
    case 'rhino':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-neutral-900" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M4.5 16.5C7 9 13 6 19.5 7.5" strokeLinecap="round" />
          <path d="M4.5 16.5c4.5 1.5 10.5 0 15-4.5" strokeLinecap="round" />
          <circle cx="12" cy="11.5" r="2" fill="currentColor" />
        </svg>
      );
    case 'lumion':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4L18 18M18 6l-1.6 1.6M7.6 16.4L6 18" strokeLinecap="round" />
        </svg>
      );
  }
}

export function AboutSection({ onChatClick }: AboutSectionProps) {
  const [selectedMemberId, setSelectedMemberId] = useState<string>(TEAM_MEMBERS[0].id);
  const selectedMember =
    TEAM_MEMBERS.find((member) => member.id === selectedMemberId) ?? TEAM_MEMBERS[0];

  return (
    <section id="about" className="bg-white py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
        <div className="mb-8 sm:mb-10">
          <EditorialReveal>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-neutral-950">
              Membangun Karya Arsitektur Berkelanjutan
            </h2>
          </EditorialReveal>
          <HairlineDivider className="h-px w-full bg-neutral-100 mt-5" delay={0.12} />
        </div>

        {/* Reference Image 2 Bento Grid unified on pure white background */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          {/* Left tall card: Tim Arsitek */}
          <EditorialReveal
            delay={0.06}
            className="lg:col-span-4 rounded-2xl bg-white border border-neutral-200/90 p-6 sm:p-7 flex flex-col justify-between"
          >
            <div className="relative py-2 sm:py-4">
              {/* Subtle staggered 3x3 grid matching Reference Image 2 */}
              <div className="grid grid-cols-3 grid-rows-3 gap-2.5 sm:gap-3 max-w-[240px] sm:max-w-[260px] mx-auto">
                {[0, 2, 4, 6, 8].map((slot) => (
                  <div
                    key={slot}
                    aria-hidden="true"
                    className="aspect-square rounded-xl border border-neutral-100 bg-neutral-50/50"
                  />
                ))}

                {TEAM_MEMBERS.map((member, idx) => {
                  const isSelected = member.id === selectedMember.id;
                  return (
                    <motion.button
                      key={member.id}
                      type="button"
                      onClick={() => setSelectedMemberId(member.id)}
                      aria-label={`Pilih arsitek ${member.name}, ${member.role}`}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={EDITORIAL_VIEWPORT}
                      transition={{
                        duration: 0.58,
                        delay: 0.08 * idx,
                        ease: EASE_EDITORIAL,
                      }}
                      whileTap={{ scale: 0.97 }}
                      className={`group ${member.gridPosition} aspect-square rounded-xl overflow-hidden border transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 ${
                        isSelected
                          ? 'border-neutral-950 ring-2 ring-neutral-950/10'
                          : 'border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      <ImageRevealFrame
                        delay={0.08 * idx}
                        duration={0.85}
                        initialScale={1.07}
                        hoverScale={1.03}
                        className="w-full h-full"
                      >
                        <SafeImage
                          src={member.image}
                          alt={`${member.name}, ${member.role}`}
                          className="w-full h-full object-cover"
                        />
                      </ImageRevealFrame>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="pt-5 sm:pt-6 text-center">
              <p className="text-sm font-medium text-neutral-900">Kenali tim arsitek kami</p>
              <div className="min-h-[20px] mt-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={selectedMember.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: EASE_EDITORIAL }}
                    className="text-xs text-neutral-500"
                  >
                    {selectedMember.name} · {selectedMember.role}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="mt-5 flex justify-center">
                <motion.button
                  type="button"
                  onClick={onChatClick}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ duration: 0.18, ease: EASE_EDITORIAL }}
                  className="inline-flex items-center gap-2.5 min-h-[42px] pl-1.5 pr-4 py-1.5 rounded-xl bg-neutral-950 text-white text-xs font-medium hover:bg-neutral-800 transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
                >
                  <span className="w-7 h-7 rounded-lg bg-[#FACC15] text-neutral-950 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  <span>Konsultasi Studio</span>
                </motion.button>
              </div>
            </div>
          </EditorialReveal>

          {/* Right 8 columns */}
          <div className="lg:col-span-8 flex flex-col gap-4 sm:gap-5">
            {/* Upper 2-column split inside right side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 flex-1">
              {/* 100+ Proyek terbangun card */}
              <EditorialReveal
                delay={0.12}
                className="rounded-2xl bg-white border border-neutral-200/90 bento-grid-bg p-6 sm:p-8 flex flex-col justify-between min-h-[240px] sm:min-h-[290px]"
              >
                <div>
                  <div className="text-5xl sm:text-6xl font-semibold tracking-tight text-neutral-950 tabular-nums leading-none">
                    100+
                  </div>
                  <p className="mt-2.5 text-sm text-neutral-500">Proyek terbangun</p>
                </div>

                <div>
                  <HairlineDivider className="h-px w-12 bg-neutral-200 mb-4" delay={0.22} />
                  <p className="text-sm text-neutral-500 leading-relaxed max-w-[30ch]">
                    Kami merancang bangunan yang tahan waktu, nyaman dihuni, dan matang secara
                    teknis. Tanpa kompromi pada detail dan kejujuran material.
                  </p>
                </div>
              </EditorialReveal>

              {/* Right stacked column: Mitra Pengembang + Testimoni Klien */}
              <div className="flex flex-col gap-4 sm:gap-5">
                {/* Client logo strip */}
                <EditorialReveal
                  delay={0.16}
                  className="rounded-2xl bg-white border border-neutral-200/90 px-3.5 sm:px-4 py-3.5 flex flex-nowrap items-center justify-between gap-2"
                >
                  {CLIENT_LOGOS.slice(0, 3).map((client, index) => (
                    <div
                      key={client.name}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-200/80 bg-white text-[11px] font-medium text-neutral-800 whitespace-nowrap shrink-0"
                    >
                      <span
                        className={`w-4 h-4 rounded flex items-center justify-center text-[9px] font-bold ${
                          index === 0
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'bg-neutral-950 text-white'
                        }`}
                        aria-hidden="true"
                      >
                        {client.glyph}
                      </span>
                      <span>{client.name}</span>
                    </div>
                  ))}
                </EditorialReveal>

                {/* Testimoni Klien */}
                <EditorialReveal
                  delay={0.2}
                  className="rounded-2xl bg-white border border-neutral-200/90 warm-grid-accent p-6 sm:p-7 flex-1 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-neutral-950">
                      Graha
                    </h3>
                    <blockquote className="mt-3 text-sm text-neutral-600 leading-relaxed">
                      “Sejak melibatkan Horizon Studio dalam perancangan kantor pusat kami, beban
                      pendinginan gedung turun hampir 35%. Pencahayaan alami dan alur ruangnya
                      membuat tim bekerja jauh lebih nyaman.”
                    </blockquote>
                  </div>

                  <p className="mt-5 text-xs text-neutral-500">
                    <span className="font-semibold text-neutral-900">— Hendra Wijaya</span>{' '}
                    Direktur Proyek, Graha
                  </p>
                </EditorialReveal>
              </div>
            </div>

            {/* Bottom wide bar: Perangkat & sistem BIM */}
            <EditorialReveal
              delay={0.24}
              className="rounded-2xl bg-white border border-neutral-200/90 px-6 sm:px-7 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <p className="text-sm font-medium text-neutral-800 whitespace-nowrap">
                Perangkat &amp; sistem BIM
              </p>

              <StaggerGroup
                stagger={0.07}
                delayChildren={0.08}
                className="grid grid-cols-5 sm:flex items-center gap-2.5 sm:gap-3"
              >
                {ARCH_TOOLS.map((tool) => (
                  <StaggerItem key={tool.id} y={10}>
                    <motion.div
                      title={tool.label}
                      aria-label={tool.label}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2, ease: EASE_EDITORIAL }}
                      className="h-11 sm:w-11 rounded-xl border border-neutral-200/90 bg-white flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                    >
                      <ArchToolLogo id={tool.id} />
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </EditorialReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
