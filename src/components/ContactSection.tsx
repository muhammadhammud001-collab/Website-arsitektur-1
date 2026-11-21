import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, ChevronDown, Loader2 } from 'lucide-react';
import { BUDGET_OPTIONS } from '../data/studioData';
import {
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from '../utils/studioLogic';
import {
  EASE_EDITORIAL,
  EditorialReveal,
} from './MotionPrimitives';

interface ContactSectionProps {
  prefilledTopic?: string | null;
}

const errorRevealVariants = {
  hidden: {
    opacity: 0,
    y: -4,
    clipPath: 'inset(0% 0% 100% 0%)',
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: {
      duration: 0.28,
      ease: EASE_EDITORIAL,
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    clipPath: 'inset(0% 0% 100% 0%)',
    transition: {
      duration: 0.2,
      ease: EASE_EDITORIAL,
    },
  },
};

export function ContactSection({ prefilledTopic }: ContactSectionProps) {
  const [values, setValues] = useState<ContactFormValues>({
    name: '',
    email: '',
    budget: '',
    message: '',
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactFormValues | null>(null);
  const submitTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (submitTimerRef.current !== null) {
        window.clearTimeout(submitTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!prefilledTopic) return;
    setSubmittedData(null);
    setValues((prev) => ({
      ...prev,
      message: `Tertarik dengan layanan ${prefilledTopic}. Berikut gambaran lokasi, luas lahan, dan rencana proyek kami: `,
    }));
  }, [prefilledTopic]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validateContactForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const payload: ContactFormValues = {
      name: values.name.trim(),
      email: values.email.trim(),
      budget: values.budget,
      message: values.message.trim(),
    };

    setIsSubmitting(true);
    submitTimerRef.current = window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData(payload);
      submitTimerRef.current = null;
    }, 240);
  };

  const handleReset = () => {
    setValues({ name: '', email: '', budget: '', message: '' });
    setErrors({});
    setIsSubmitting(false);
    setSubmittedData(null);
  };

  return (
    <section id="contact" className="bg-white py-16 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
        {/* Only the clean white Mari berdiskusi box (no background image behind it) */}
        <EditorialReveal
          y={24}
          duration={0.72}
          data-testid="cta-card-only"
          className="max-w-[680px] mx-auto bg-white border border-neutral-200/90 px-6 py-10 sm:px-16 sm:py-16 shadow-[0_8px_36px_rgba(0,0,0,0.03)]"
        >
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-neutral-950 text-center">
            Mari berdiskusi
          </h2>

          <AnimatePresence mode="wait">
            {submittedData ? (
              <motion.div
                key="contact-success"
                initial={{ opacity: 0, y: 14, clipPath: 'inset(0% 0% 20% 0%)' }}
                animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.42, ease: EASE_EDITORIAL }}
                className="mt-10 text-center py-6 space-y-4"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.08, ease: EASE_EDITORIAL }}
                  className="w-11 h-11 rounded-full bg-neutral-950 text-white flex items-center justify-center mx-auto"
                >
                  <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                </motion.div>
                <h3 className="text-xl font-semibold text-neutral-950">
                  Pesan diterima, {submittedData.name}
                </h3>
                <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Terima kasih telah menghubungi kami. Tim arsitek kami akan membalas ke{' '}
                  <span className="font-medium text-neutral-900">{submittedData.email}</span>{' '}
                  dalam satu hari kerja untuk membahas rencana proyek beranggaran{' '}
                  <span className="font-medium text-neutral-900">{submittedData.budget}</span> Anda.
                </p>
                <div className="pt-4">
                  <motion.button
                    type="button"
                    onClick={handleReset}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.18, ease: EASE_EDITORIAL }}
                    className="min-h-[44px] px-6 py-2.5 rounded-md bg-neutral-950 text-white text-xs font-medium hover:bg-neutral-800 transition-colors"
                  >
                    Kirim pesan lainnya
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
                onSubmit={handleSubmit}
                noValidate
                className="mt-8 sm:mt-10 max-w-md mx-auto space-y-6"
              >
                {/* Nama */}
                <div>
                  <label htmlFor="contact-name" className="sr-only">
                    Nama lengkap
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Nama lengkap"
                    value={values.name}
                    onChange={(e) => {
                      setValues((prev) => ({ ...prev, name: e.target.value }));
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className={`w-full bg-transparent border-b py-3 text-base sm:text-sm text-neutral-950 placeholder:text-neutral-400 focus:outline-none transition-colors ${
                      errors.name
                        ? 'border-red-600 focus:border-red-600'
                        : 'border-neutral-200 focus:border-neutral-950'
                    }`}
                  />
                  <AnimatePresence initial={false}>
                    {errors.name && (
                      <motion.p
                        key="contact-name-error"
                        id="contact-name-error"
                        variants={errorRevealVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="mt-1.5 text-xs text-red-600"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="sr-only">
                    Alamat email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="email@domain.com"
                    value={values.email}
                    onChange={(e) => {
                      setValues((prev) => ({ ...prev, email: e.target.value }));
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className={`w-full bg-transparent border-b py-3 text-base sm:text-sm text-neutral-950 placeholder:text-neutral-400 focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-red-600 focus:border-red-600'
                        : 'border-neutral-200 focus:border-neutral-950'
                    }`}
                  />
                  <AnimatePresence initial={false}>
                    {errors.email && (
                      <motion.p
                        key="contact-email-error"
                        id="contact-email-error"
                        variants={errorRevealVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="mt-1.5 text-xs text-red-600"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Estimasi anggaran */}
                <div>
                  <label htmlFor="contact-budget" className="sr-only">
                    Estimasi anggaran
                  </label>
                  <div className="relative">
                    <select
                      id="contact-budget"
                      name="budget"
                      value={values.budget}
                      onChange={(e) => {
                        setValues((prev) => ({ ...prev, budget: e.target.value }));
                        if (errors.budget) setErrors((prev) => ({ ...prev, budget: undefined }));
                      }}
                      aria-invalid={Boolean(errors.budget)}
                      aria-describedby={errors.budget ? 'contact-budget-error' : undefined}
                      className={`w-full appearance-none bg-transparent border-b py-3 pr-8 text-base sm:text-sm focus:outline-none transition-colors ${
                        values.budget ? 'text-neutral-950' : 'text-neutral-600'
                      } ${
                        errors.budget
                          ? 'border-red-600 focus:border-red-600'
                          : 'border-neutral-200 focus:border-neutral-950'
                      }`}
                    >
                      <option value="">Estimasi anggaran</option>
                      {BUDGET_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="w-4 h-4 text-neutral-700 pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"
                      aria-hidden="true"
                    />
                  </div>
                  <AnimatePresence initial={false}>
                    {errors.budget && (
                      <motion.p
                        key="contact-budget-error"
                        id="contact-budget-error"
                        variants={errorRevealVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="mt-1.5 text-xs text-red-600"
                      >
                        {errors.budget}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Informasi proyek */}
                <div>
                  <label htmlFor="contact-message" className="sr-only">
                    Informasi proyek
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Ceritakan lokasi, luas lahan, dan kebutuhan ruang Anda"
                    value={values.message}
                    onChange={(e) => {
                      setValues((prev) => ({ ...prev, message: e.target.value }));
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    className={`w-full bg-transparent border-b py-3 text-base sm:text-sm text-neutral-950 placeholder:text-neutral-400 resize-none focus:outline-none transition-colors ${
                      errors.message
                        ? 'border-red-600 focus:border-red-600'
                        : 'border-neutral-200 focus:border-neutral-950'
                    }`}
                  />
                  <AnimatePresence initial={false}>
                    {errors.message && (
                      <motion.p
                        key="contact-message-error"
                        id="contact-message-error"
                        variants={errorRevealVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="mt-1.5 text-xs text-red-600"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <p className="text-[11px] leading-relaxed text-neutral-500">
                  Dengan mengirimkan informasi ini, Anda menyetujui bahwa Horizon Studio dapat
                  menggunakan data tersebut untuk menanggapi pertanyaan konsultasi dan memberikan
                  informasi terkait proyek Anda. Selengkapnya lihat{' '}
                  <a
                    href="#footer"
                    className="underline underline-offset-2 text-neutral-700 hover:text-neutral-950"
                  >
                    Kebijakan Privasi
                  </a>
                  .
                </p>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={isSubmitting ? undefined : { scale: 1.01 }}
                  whileTap={isSubmitting ? undefined : { scale: 0.985 }}
                  transition={{ duration: 0.18, ease: EASE_EDITORIAL }}
                  className="w-full min-h-[48px] py-3.5 px-6 rounded-[4px] bg-[#0D0D10] text-white text-sm font-medium hover:bg-neutral-800 disabled:opacity-80 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 inline-flex items-center justify-center gap-2"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isSubmitting ? (
                      <motion.span
                        key="submitting-label"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.16 }}
                        className="inline-flex items-center gap-2"
                      >
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        <span>Mengirim pesan…</span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle-label"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.16 }}
                      >
                        Kirim pesan
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </EditorialReveal>
      </div>
    </section>
  );
}
