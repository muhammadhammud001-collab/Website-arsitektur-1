export const STICKY_HEADER_OFFSET = 64;

/**
 * Smoothly scrolls to a hash target (e.g. "#about") while respecting the sticky
 * header height and working reliably even when clicking the same link repeatedly
 * or navigating immediately after closing a scroll-locked overlay menu.
 */
export function scrollToSection(href: string): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  // Ensure any scroll lock from a modal/drawer is released before scrolling
  if (document.body.style.overflow === 'hidden') {
    document.body.style.overflow = '';
  }

  const trimmed = href.trim();
  if (!trimmed.startsWith('#')) {
    return false;
  }

  const prefersReducedMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior: ScrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

  if (trimmed === '#' || trimmed === '#hero') {
    window.scrollTo({ top: 0, behavior });
    if (window.location.hash !== '#hero') {
      window.history.replaceState(null, '', '#hero');
    }
    return true;
  }

  const id = trimmed.slice(1);
  const target = document.getElementById(id) ?? document.querySelector(trimmed);
  if (!target) {
    return false;
  }

  const targetTop = Math.max(
    0,
    Math.round(target.getBoundingClientRect().top + window.scrollY - STICKY_HEADER_OFFSET),
  );

  window.scrollTo({ top: targetTop, behavior });
  if (window.location.hash !== trimmed) {
    window.history.replaceState(null, '', trimmed);
  }
  return true;
}
