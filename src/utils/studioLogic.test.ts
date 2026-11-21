import test from 'node:test';
import assert from 'node:assert/strict';
import { PORTFOLIO_PHOTOS } from '../data/studioData';
import {
  filterPortfolioByAlbum,
  getSpreadState,
  getVisiblePortfolioItems,
  validateContactForm,
} from './studioLogic';

test('filterPortfolioByAlbum returns all items or strictly matching album', () => {
  const all = filterPortfolioByAlbum(PORTFOLIO_PHOTOS, 'Semua');
  assert.equal(all.length, PORTFOLIO_PHOTOS.length);

  const hunian = filterPortfolioByAlbum(PORTFOLIO_PHOTOS, 'Hunian');
  assert.ok(hunian.length > 0);
  assert.ok(hunian.every((item) => item.album === 'Hunian'));
});

test('getVisiblePortfolioItems limits initial gallery count and expands on demand', () => {
  const collapsed = getVisiblePortfolioItems(PORTFOLIO_PHOTOS, 'Semua', false, 11);
  assert.equal(collapsed.visible.length, 11);
  assert.equal(collapsed.hasMore, true);

  const expanded = getVisiblePortfolioItems(PORTFOLIO_PHOTOS, 'Semua', true, 11);
  assert.equal(expanded.visible.length, PORTFOLIO_PHOTOS.length);
  assert.equal(expanded.totalMatching, PORTFOLIO_PHOTOS.length);
});

test('getSpreadState returns active image, accurate page number, and 4 other selectable images', () => {
  const spread = getSpreadState(PORTFOLIO_PHOTOS, 'vila-beton-ubud');
  assert.ok(spread);
  assert.equal(spread.activePhoto.id, 'vila-beton-ubud');
  assert.equal(spread.pageNumber, 2);
  assert.equal(spread.relatedPhotos.length, 4);
  assert.ok(spread.relatedPhotos.every((p) => p.id !== 'vila-beton-ubud'));

  const missing = getSpreadState(PORTFOLIO_PHOTOS, 'non-existent-id');
  assert.equal(missing, null);
});

test('validateContactForm catches empty and invalid fields and accepts valid input', () => {
  const emptyErrors = validateContactForm({
    name: '',
    email: 'email-tidak-valid',
    budget: '',
    message: 'singkat',
  });
  assert.ok(emptyErrors.name);
  assert.ok(emptyErrors.email);
  assert.ok(emptyErrors.budget);
  assert.ok(emptyErrors.message);

  const validErrors = validateContactForm({
    name: 'Budi Santoso',
    email: 'budi@arsitektur.id',
    budget: 'Rp 1,5 Miliar – Rp 5 Miliar',
    message: 'Kami berencana membangun rumah tinggal tropis dua lantai di lahan 350 m2 di Jakarta Selatan.',
  });
  assert.deepEqual(validErrors, {});
});
