import type { AlbumCategory, PortfolioPhoto } from '../data/studioData';

export interface ContactFormValues {
  name: string;
  email: string;
  budget: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  budget?: string;
  message?: string;
}

export interface PortfolioSpreadState {
  activePhoto: PortfolioPhoto;
  pageNumber: number;
  totalPages: number;
  relatedPhotos: PortfolioPhoto[];
}

export function filterPortfolioByAlbum(
  photos: PortfolioPhoto[],
  album: AlbumCategory
): PortfolioPhoto[] {
  if (album === 'Semua') {
    return photos;
  }
  return photos.filter((photo) => photo.album === album);
}

export function getVisiblePortfolioItems(
  photos: PortfolioPhoto[],
  album: AlbumCategory,
  expanded: boolean,
  initialLimit = 9
): {
  visible: PortfolioPhoto[];
  hasMore: boolean;
  totalMatching: number;
} {
  const filtered = filterPortfolioByAlbum(photos, album);
  const visible = expanded ? filtered : filtered.slice(0, initialLimit);
  return {
    visible,
    hasMore: filtered.length > initialLimit,
    totalMatching: filtered.length,
  };
}

export function getSpreadState(
  photos: PortfolioPhoto[],
  activePhotoId: string
): PortfolioSpreadState | null {
  if (photos.length === 0) return null;
  const activeIndex = photos.findIndex((p) => p.id === activePhotoId);
  if (activeIndex === -1) return null;

  const activePhoto = photos[activeIndex];
  const others = photos.filter((p) => p.id !== activePhotoId);

  // Prioritize same-series or same-album items, then fill up to 4 unique preview slots
  const prioritized = [
    ...others.filter((p) => p.series === activePhoto.series),
    ...others.filter((p) => p.series !== activePhoto.series && p.album === activePhoto.album),
    ...others.filter((p) => p.series !== activePhoto.series && p.album !== activePhoto.album),
  ];

  const uniqueRelated: PortfolioPhoto[] = [];
  const seenImages = new Set<string>([activePhoto.image]);

  for (const candidate of prioritized) {
    if (uniqueRelated.length >= 4) break;
    if (!seenImages.has(candidate.image)) {
      uniqueRelated.push(candidate);
      seenImages.add(candidate.image);
    }
  }

  // Fallback if fewer than 4 unique images exist
  for (const candidate of prioritized) {
    if (uniqueRelated.length >= 4) break;
    if (!uniqueRelated.some((item) => item.id === candidate.id)) {
      uniqueRelated.push(candidate);
    }
  }

  return {
    activePhoto,
    pageNumber: activeIndex + 1,
    totalPages: photos.length,
    relatedPhotos: uniqueRelated,
  };
}

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const trimmedName = values.name.trim();
  const trimmedEmail = values.email.trim();
  const trimmedMessage = values.message.trim();

  if (!trimmedName) {
    errors.name = 'Mohon masukkan nama lengkap Anda.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Nama minimal terdiri dari 2 karakter.';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail) {
    errors.email = 'Mohon masukkan alamat email Anda.';
  } else if (!emailPattern.test(trimmedEmail)) {
    errors.email = 'Mohon masukkan alamat email yang valid.';
  }

  if (!values.budget) {
    errors.budget = 'Mohon pilih estimasi anggaran proyek Anda.';
  }

  if (!trimmedMessage) {
    errors.message = 'Mohon ceritakan gambaran singkat proyek Anda.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Mohon tuliskan minimal 10 karakter mengenai kebutuhan ruang Anda.';
  }

  return errors;
}
