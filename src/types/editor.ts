export interface ImageState {
  file: File | null;
  originalUrl: string | null;
  editedUrl: string | null;
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
  rotation: number;
  backgroundColor: string;
  quality: number;
    format: 'jpeg' | 'jpg' | 'png' | 'webp' | 'svg';
  fileSize: number;
  originalFileSize: number;
}

export interface PresetSize {
  name: string;
  width: number;
  height: number;
  category: string;
}

export const PRESET_SIZES: PresetSize[] = [
  // Passport & ID Photos
  { name: 'Passport Photo', width: 413, height: 531, category: 'ID Photos' },
  { name: 'PAN Card', width: 206, height: 265, category: 'ID Photos' },
  { name: 'Aadhaar Card', width: 140, height: 182, category: 'ID Photos' },
  { name: 'Visa Photo', width: 600, height: 600, category: 'ID Photos' },
  { name: 'Stamp Size', width: 130, height: 150, category: 'ID Photos' },
  
  // Standard Sizes
  { name: '300 x 300', width: 300, height: 300, category: 'Standard' },
  { name: '600 x 600', width: 600, height: 600, category: 'Standard' },
  { name: '800 x 800', width: 800, height: 800, category: 'Standard' },
  { name: '1024 x 1024', width: 1024, height: 1024, category: 'Standard' },
  
  // Job Applications
  { name: 'SSC Form', width: 200, height: 230, category: 'Job Forms' },
  { name: 'UPSC Form', width: 200, height: 240, category: 'Job Forms' },
  { name: 'Bank PO', width: 200, height: 230, category: 'Job Forms' },
  { name: 'Railway Form', width: 165, height: 200, category: 'Job Forms' },
];

export const BACKGROUND_COLORS = [
  { name: 'White', value: '#FFFFFF' },
  { name: 'Light Grey', value: '#F5F5F5' },
  { name: 'Blue', value: '#0066CC' },
  { name: 'Red', value: '#CC0000' },
  { name: 'Transparent', value: 'transparent' },
];

export const FORMAT_OPTIONS = [
  { value: 'jpeg', label: 'JPEG', mime: 'image/jpeg' },
  { value: 'jpg', label: 'JPG', mime: 'image/jpeg' }, // alias
  { value: 'png', label: 'PNG', mime: 'image/png' },
  { value: 'webp', label: 'WEBP', mime: 'image/webp' },
  { value: 'svg', label: 'SVG', mime: 'image/svg+xml' },
] as const;

