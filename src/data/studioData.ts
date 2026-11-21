export type AlbumCategory = 'Semua' | 'Hunian' | 'Komersial' | 'Publik';

export interface PortfolioPhoto {
  id: string;
  title: string;
  series: string;
  album: Exclude<AlbumCategory, 'Semua'>;
  date: string;
  location: string;
  description: string;
  attribution: string;
  image: string;
  layoutSpan: 'sm' | 'md' | 'lg' | 'wide';
  aspectClass: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  summary: string;
  deliverables: string[];
  timeline: string;
}

export interface BlogArticle {
  id: string;
  titleLine1: string;
  titleLine2: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  body: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  gridPosition: string;
}

export const ASSETS = {
  footerSkyline: '/src/assets/images/footer_city_skyline_1795185892526.jpg',
  archTropicalVilla: '/src/assets/images/arch_tropical_villa_1795230361059.jpg',
  archCourtyardHouse: '/src/assets/images/arch_courtyard_house_1795230362491.jpg',
  archMuseumAtrium: '/src/assets/images/arch_museum_atrium_1795230361582.jpg',
  archTimberPavilion: '/src/assets/images/arch_timber_pavilion_1795230362854.jpg',
  archCommercialFacade: '/src/assets/images/arch_commercial_facade_1795230362442.jpg',
  coastalBridge: '/src/assets/images/portfolio_coastal_bridge_1795185892272.jpg',
  urbanDusk: '/src/assets/images/portfolio_urban_dusk_1795185893336.jpg',
  minimalIvy: '/src/assets/images/portfolio_minimal_ivy_1795185892575.jpg',
  monochromeShadow: '/src/assets/images/portfolio_monochrome_shadow_1795185893530.jpg',
  teamAlex: '/src/assets/images/team_portrait_alex_1795185893093.jpg',
  teamMaya: '/src/assets/images/team_portrait_maya_1795185892947.jpg',
  teamDaniel: '/src/assets/images/team_portrait_daniel_1795185893763.jpg',
  teamKenji: '/src/assets/images/team_portrait_kenji_1795185893329.jpg',
} as const;

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'arif',
    name: 'Arif Pratama, IAI',
    role: 'Arsitek Utama',
    image: ASSETS.teamAlex,
    gridPosition: 'col-start-2 row-start-1',
  },
  {
    id: 'kenji',
    name: 'Raka Wijaya',
    role: 'Kepala Desain Spasial',
    image: ASSETS.teamMaya,
    gridPosition: 'col-start-1 row-start-2',
  },
  {
    id: 'nadia',
    name: 'Nadia Kusuma',
    role: 'Direktur Perencanaan',
    image: ASSETS.teamKenji,
    gridPosition: 'col-start-3 row-start-2',
  },
  {
    id: 'dimas',
    name: 'Dimas Hartanto',
    role: 'Arsitek Teknis & BIM',
    image: ASSETS.teamDaniel,
    gridPosition: 'col-start-2 row-start-3',
  },
];

export const PORTFOLIO_PHOTOS: PortfolioPhoto[] = [
  {
    id: 'fasad-terakota-sudirman',
    title: 'Menara Fasad Terakota',
    series: 'FASAD',
    album: 'Komersial',
    date: '18 Februari 2025',
    location: 'Sudirman, Jakarta',
    description:
      'Kisi-kisi terakota vertikal meredam panas matahari sore sekaligus menghadirkan ritme bayangan yang hidup di sepanjang ruang kerja komersial.',
    attribution: 'Divisi Komersial Horizon',
    image: ASSETS.archCommercialFacade,
    layoutSpan: 'sm',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'vila-beton-ubud',
    title: 'Vila Beton Tropis Ubud',
    series: 'TROPIS',
    album: 'Hunian',
    date: '15 Maret 2025',
    location: 'Ubud, Bali',
    description:
      'Kantilever beton ekspos berpadu dengan plafon kayu jati dan kolam refleksi memanjang, merangkai transisi mulus antara ruang dalam dan lembah hijau.',
    attribution: 'Monograf Hunian Tropis',
    image: ASSETS.archTropicalVilla,
    layoutSpan: 'lg',
    aspectClass: 'aspect-[16/10]',
  },
  {
    id: 'atrium-galeri-nusantara',
    title: 'Atrium Galeri Nusantara',
    series: 'ATRIUM',
    album: 'Publik',
    date: '04 April 2025',
    location: 'Jakarta Pusat',
    description:
      'Skylight kisi beton menyalurkan cahaya zenital lembut ke lantai teraso, membentuk ruang pamer publik yang hening dan monumental.',
    attribution: 'Arsip Ruang Publik',
    image: ASSETS.archMuseumAtrium,
    layoutSpan: 'sm',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'jendela-hijau-menteng',
    title: 'Fasad Sunyi Menteng',
    series: 'FASAD',
    album: 'Hunian',
    date: '29 Januari 2025',
    location: 'Menteng, Jakarta',
    description:
      'Dinding plester putih polos berpadu dengan vegetasi rambat alami—sebuah eksplorasi proporsi bukaan, kesederhanaan bentuk, dan keteduhan mikro.',
    attribution: 'Studi Bentuk & Permukaan',
    image: ASSETS.minimalIvy,
    layoutSpan: 'md',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'rumah-halaman-kemang',
    title: 'Rumah Halaman Kemang',
    series: 'TROPIS',
    album: 'Hunian',
    date: '28 Maret 2025',
    location: 'Kemang, Jakarta Selatan',
    description:
      'Taman dalam terbuka dengan batu travertin dan kisi kayu ulin memaksimalkan ventilasi silang alami di tengah kepadatan kawasan urban.',
    attribution: 'Seri Hunian Urban',
    image: ASSETS.archCourtyardHouse,
    layoutSpan: 'md',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'amfiteater-beton-senayan',
    title: 'Geometri Amfiteater Beton',
    series: 'MONOLIT',
    album: 'Publik',
    date: '11 Desember 2024',
    location: 'Senayan, Jakarta',
    description:
      'Undakan beton melengkung membentuk ruang berkumpul terbuka yang memadukan presisi struktur, permainan bayangan, dan sirkulasi pejalan kaki.',
    attribution: 'Seri Monolit',
    image: ASSETS.monochromeShadow,
    layoutSpan: 'md',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'paviliun-kayu-lembang',
    title: 'Paviliun Kayu Lembang',
    series: 'TROPIS',
    album: 'Hunian',
    date: '22 Oktober 2024',
    location: 'Lembang, Bandung',
    description:
      'Struktur kayu laminasi dan bidang kaca penuh membingkai lanskap perbukitan berkabut, menghadirkan kehangatan ruang saat senja turun.',
    attribution: 'Arsip Dataran Tinggi',
    image: ASSETS.archTimberPavilion,
    layoutSpan: 'wide',
    aspectClass: 'aspect-[16/10]',
  },
  {
    id: 'jembatan-pesisir-bali',
    title: 'Bentang Beton Pesisir',
    series: 'MONOLIT',
    album: 'Publik',
    date: '09 November 2024',
    location: 'Pesisir Selatan',
    description:
      'Lengkung beton prategang membentang tenang di atas perairan berkabut, menjadikan infrastruktur publik bagian dari keselarasan lanskap.',
    attribution: 'Kajian Infrastruktur',
    image: ASSETS.coastalBridge,
    layoutSpan: 'wide',
    aspectClass: 'aspect-[16/10]',
  },
  {
    id: 'bata-klasik-kota-lama',
    title: 'Revitalisasi Bata Kota Lama',
    series: 'FASAD',
    album: 'Komersial',
    date: '03 Mei 2025',
    location: 'Kota Lama, Semarang',
    description:
      'Konservasi struktur bata bersejarah yang dialihfungsikan menjadi ruang kreatif dan kantor butik tanpa menghilangkan karakter asli kawasan.',
    attribution: 'Divisi Konservasi',
    image: ASSETS.urbanDusk,
    layoutSpan: 'md',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'hunian-teras-canggu',
    title: 'Hunian Teras Canggu',
    series: 'TROPIS',
    album: 'Hunian',
    date: '19 Mei 2025',
    location: 'Canggu, Bali',
    description:
      'Tata massa terpecah mengelilingi halaman teduh, memungkinkan angin laut mengalir bebas ke seluruh kamar tidur dan ruang keluarga.',
    attribution: 'Jurnal Bali',
    image: ASSETS.archCourtyardHouse,
    layoutSpan: 'md',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'menara-kisi-scbd',
    title: 'Gedung Kisi SCBD',
    series: 'FASAD',
    album: 'Komersial',
    date: '02 Juni 2025',
    location: 'SCBD, Jakarta Selatan',
    description:
      'Selubung bangunan ganda berbasis batu kapur dan terakota menekan beban pendinginan gedung hingga 34% dibanding standar konvensional.',
    attribution: 'Arsitektur Berkelanjutan',
    image: ASSETS.archCommercialFacade,
    layoutSpan: 'md',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'balai-budaya-bandung',
    title: 'Balai Budaya Bandung',
    series: 'ATRIUM',
    album: 'Publik',
    date: '18 Juni 2025',
    location: 'Dago, Bandung',
    description:
      'Ruang serbaguna berlangit-langit tinggi dengan akustik alami dan tangga beton skulptural sebagai poros aktivitas komunitas seni.',
    attribution: 'Arsip Kebudayaan',
    image: ASSETS.archMuseumAtrium,
    layoutSpan: 'md',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'galeri-niaga-surabaya',
    title: 'Galeri Niaga Tunjungan',
    series: 'FASAD',
    album: 'Komersial',
    date: '04 Juli 2025',
    location: 'Surabaya, Jawa Timur',
    description:
      'Adaptasi bangunan sudut kota menjadi ruang pamer desain dan kafe dengan bukaan lebar yang terhubung langsung ke trotoar publik.',
    attribution: 'Studi Koridor Kota',
    image: ASSETS.urbanDusk,
    layoutSpan: 'md',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'kantor-taman-bintaro',
    title: 'Paviliun Kantor Bintaro',
    series: 'TROPIS',
    album: 'Komersial',
    date: '21 Juli 2025',
    location: 'Bintaro, Tangerang Selatan',
    description:
      'Studio kerja berkonsep paviliun taman yang menggabungkan struktur kayu tropis, pencahayaan alami, dan ruang kolaborasi terbuka.',
    attribution: 'Monograf Ruang Kerja',
    image: ASSETS.archTimberPavilion,
    layoutSpan: 'md',
    aspectClass: 'aspect-[4/3]',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'desain-arsitektur',
    title: 'Arsitektur',
    summary:
      'Merancang hunian, bangunan komersial, dan ruang publik yang responsif terhadap iklim tropis serta karakter tapak.',
    deliverables: [
      'Konsep Massa & Studi Tapak',
      'Gambar Kerja DED & Pemodelan BIM 3D',
      'Koordinasi Struktur & MEP',
    ],
    timeline: '8–16 minggu',
  },
  {
    id: 'perencanaan-tapak',
    title: 'Masterplan',
    summary:
      'Menyusun rencana induk kawasan, sirkulasi, serta integrasi lanskap yang berkelanjutan dan bernilai jangka panjang.',
    deliverables: [
      'Analisis Kontur, Matahari & Angin',
      'Masterplan Zonasi & Sirkulasi',
      'Panduan Rancang Bangun Kawasan',
    ],
    timeline: '6–12 minggu',
  },
  {
    id: 'desain-interior',
    title: 'Interior',
    summary:
      'Menghadirkan tata ruang dalam yang tenang, fungsional, dan menyatu dengan kejujuran material arsitektur.',
    deliverables: [
      'Tata Letak Ruang & Skema Pencahayaan',
      'Kurasi Material, Kayu & Batu Alam',
      'Detail Furnitur Kustom Terintegrasi',
    ],
    timeline: '6–10 minggu',
  },
  {
    id: 'manajemen-konstruksi',
    title: 'Konstruksi',
    summary:
      'Mengawal kualitas pengerjaan lapangan, ketepatan jadwal, dan transparansi anggaran hingga serah terima kunci.',
    deliverables: [
      'Penyusunan RAB & Tender Kontraktor',
      'Supervisi Berkala & Kontrol Mutu',
      'Dokumentasi As-Built & Serah Terima',
    ],
    timeline: 'Sepanjang masa bangun',
  },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'cahaya-alami-ruang-tropis',
    titleLine1: 'Cahaya',
    titleLine2: 'Tropis',
    category: 'Hunian',
    date: '12 Mei 2026',
    readTime: '4 mnt baca',
    excerpt:
      'Bagaimana proporsi tritisan, kolam refleksi, dan ventilasi silang menjaga kenyamanan termal tanpa bergantung penuh pada pendingin ruangan.',
    image: ASSETS.archTropicalVilla,
    body: [
      'Arsitektur tropis yang baik selalu dimulai dari membaca arah matahari dan hembusan angin di tapak. Sebelum menentukan gaya fasad, kami memetakan bayangan sepanjang hari agar ruang keluarga tetap teduh meski sinar matahari terik.',
      'Penggunaan kantilever beton yang cukup dalam dipadukan dengan plafon kayu jati dan bukaan tinggi menciptakan aliran udara silang alami yang menurunkan suhu ruang secara signifikan.',
      'Ketika cahaya masuk secara terukur dan tidak menyilaukan, hunian terasa lebih lapang, tenang, dan hemat energi sepanjang tahun.',
    ],
  },
  {
    id: 'halaman-dalam-bata-kayu',
    titleLine1: 'Taman',
    titleLine2: 'Kayu',
    category: 'Material',
    date: '28 April 2026',
    readTime: '5 mnt baca',
    excerpt:
      'Menghadirkan taman privat di tengah lahan urban sempit menggunakan batu travertin, kisi kayu ulin, dan tanaman peneduh.',
    image: ASSETS.archCourtyardHouse,
    body: [
      'Di kawasan perkotaan yang padat, halaman dalam menjadi paru-paru utama sebuah rumah. Dengan menempatkan ruang hijau di inti denah, hampir setiap ruangan mendapatkan akses langsung ke cahaya pagi dan udara segar.',
      'Pemilihan material jujur seperti batu alam lokal dan kayu tahan cuaca membuat bangunan menua dengan anggun tanpa membutuhkan perawatan berlebih.',
      'Hasilnya adalah oase hening yang melindungi privasi penghuni sambil tetap terhubung erat dengan ritme alam.',
    ],
  },
  {
    id: 'atrium-beton-skala-publik',
    titleLine1: 'Atrium',
    titleLine2: 'Beton',
    category: 'Publik',
    date: '14 April 2026',
    readTime: '6 mnt baca',
    excerpt:
      'Merancang ruang publik monumental yang tetap ramah bagi pengunjung melalui ritme struktur, akustik tenang, dan cahaya zenital.',
    image: ASSETS.archMuseumAtrium,
    body: [
      'Ruang publik yang berkesan tidak selalu bergantung pada ornamen ramai. Struktur beton ekspos yang presisi dan bukaan langit-langit yang terukur sudah cukup membentuk suasana kontemplatif.',
      'Dalam proyek galeri dan balai budaya kami, alur sirkulasi dirancang intuitif sehingga pengunjung dapat berpindah antar lantai sambil menikmati perubahan skala ruang.',
      'Kejujuran struktur dan detail sambungan yang rapi menjadikan bangunan tetap relevan lintas generasi.',
    ],
  },
  {
    id: 'fasad-terakota-iklim-kota',
    titleLine1: 'Fasad',
    titleLine2: 'Terakota',
    category: 'Fasad',
    date: '30 Maret 2026',
    readTime: '3 mnt baca',
    excerpt:
      'Peran selubung bangunan berlapis dan kisi terakota dalam meredam radiasi panas pada gedung komersial modern.',
    image: ASSETS.archCommercialFacade,
    body: [
      'Gedung komersial dengan dinding kaca penuh sering kali menuntut beban pendinginan tinggi di iklim khatulistiwa. Selubung sekunder berbahan terakota menawarkan solusi pasif yang efektif sekaligus estetis.',
      'Dengan mengatur sudut dan jarak antar sirip fasad sesuai orientasi barat dan timur, panas berlebih tersaring sebelum mencapai kaca interior tanpa menghalangi pandangan ke luar.',
      'Pendekatan ini memadukan efisiensi energi jangka panjang dengan karakter arsitektur kota yang khas.',
    ],
  },
];

export const CLIENT_LOGOS = [
  { name: 'Graha', glyph: 'GR' },
  { name: 'Karya', glyph: 'KR' },
  { name: 'Nusantara', glyph: 'NS' },
  { name: 'Cipta', glyph: 'CP' },
];

export const BUDGET_OPTIONS = [
  'Di bawah Rp 500 Juta',
  'Rp 500 Juta – Rp 1,5 Miliar',
  'Rp 1,5 Miliar – Rp 5 Miliar',
  'Di atas Rp 5 Miliar',
];
