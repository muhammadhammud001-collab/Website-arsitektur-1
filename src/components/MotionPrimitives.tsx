import type { ReactNode } from 'react';
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';

/**
 * Shared architectural monograph easing curves.
 * - EASE_EDITORIAL: calm, authoritative deceleration for typography, cards, and imagery.
 * - EASE_OVERLAY: crisp architectural curtain curve for full-screen menus and modals.
 */
export const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;
export const EASE_OVERLAY = [0.76, 0, 0.24, 1] as const;

/**
 * Shared scroll-reveal viewport config.
 * Uses amount: 0.12 so tall mobile sections never remain stuck at opacity: 0.
 */
export const EDITORIAL_VIEWPORT = {
  once: true,
  amount: 0.12,
} as const;

interface EditorialRevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  masked?: boolean;
  immediate?: boolean;
}

export function EditorialReveal({
  children,
  delay = 0,
  duration = 0.65,
  y = 20,
  masked = false,
  immediate = false,
  className = '',
  ...rest
}: EditorialRevealProps) {
  const initialState = { opacity: 0, y };
  const targetState = { opacity: 1, y: 0 };

  const content = (
    <motion.div
      initial={initialState}
      animate={immediate ? targetState : undefined}
      whileInView={immediate ? undefined : targetState}
      viewport={immediate ? undefined : EDITORIAL_VIEWPORT}
      transition={{
        duration,
        delay,
        ease: EASE_EDITORIAL,
      }}
      className={masked ? undefined : className}
      {...rest}
    >
      {children}
    </motion.div>
  );

  if (masked) {
    return <div className={`overflow-hidden ${className}`}>{content}</div>;
  }

  return content;
}

interface HairlineDividerProps {
  className?: string;
  delay?: number;
  duration?: number;
  immediate?: boolean;
}

export function HairlineDivider({
  className = 'h-px w-full bg-neutral-200',
  delay = 0,
  duration = 0.75,
  immediate = false,
}: HairlineDividerProps) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      animate={immediate ? { scaleX: 1 } : undefined}
      whileInView={immediate ? undefined : { scaleX: 1 }}
      viewport={immediate ? undefined : EDITORIAL_VIEWPORT}
      transition={{
        duration,
        delay,
        ease: EASE_EDITORIAL,
      }}
      style={{ transformOrigin: 'left center' }}
      className={className}
    />
  );
}

interface StaggerGroupProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  stagger?: number;
  delayChildren?: number;
  immediate?: boolean;
}

export function StaggerGroup({
  children,
  stagger = 0.08,
  delayChildren = 0.04,
  immediate = false,
  className = '',
  ...rest
}: StaggerGroupProps) {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={immediate ? 'visible' : undefined}
      whileInView={immediate ? undefined : 'visible'}
      viewport={immediate ? undefined : EDITORIAL_VIEWPORT}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  y?: number;
  duration?: number;
}

export function StaggerItem({
  children,
  y = 20,
  duration = 0.62,
  className = '',
  ...rest
}: StaggerItemProps) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: EASE_EDITORIAL,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className} {...rest}>
      {children}
    </motion.div>
  );
}

interface ImageRevealFrameProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  delay?: number;
  duration?: number;
  initialScale?: number;
  hoverScale?: number;
  immediate?: boolean;
}

export function ImageRevealFrame({
  children,
  className = '',
  innerClassName = 'w-full h-full',
  delay = 0,
  duration = 0.9,
  initialScale = 1.07,
  hoverScale,
  immediate = false,
}: ImageRevealFrameProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ scale: initialScale, opacity: 0.9 }}
        animate={immediate ? { scale: 1, opacity: 1 } : undefined}
        whileInView={immediate ? undefined : { scale: 1, opacity: 1 }}
        viewport={immediate ? undefined : EDITORIAL_VIEWPORT}
        whileHover={hoverScale ? { scale: hoverScale } : undefined}
        transition={{
          duration,
          delay,
          ease: EASE_EDITORIAL,
        }}
        className={innerClassName}
      >
        {children}
      </motion.div>
    </div>
  );
}
