import { FurnitureItem, ServiceItem } from './types';

export const categories = [
  { id: 'all', name: 'All Furniture', icon: 'LayoutGrid' },
  { id: 'armchair', name: 'Armchairs', icon: 'Armchair' },
  { id: 'sofa', name: 'Sofas', icon: 'Sofa' },
  { id: 'lighting', name: 'Lighting', icon: 'Lamp' },
  { id: 'table', name: 'Tables', icon: 'Table' }
];

export const furnitureItems: FurnitureItem[] = [
  {
    id: 'furn-1',
    name: 'Lounge Design',
    category: 'armchair',
    type: 'Armchair',
    price: 12500,
    rating: 4.8,
    description: 'The simple and elegant shape makes it very suitable for those who want a minimalist room. Crafted with an ultra-soft boucle weave fabric, supportive ergonomic structure, and fine premium wooden legs, it guarantees an eye-catching accent for any seating layout.',
    image: '/assets/images/lounge_armchair_1_1783979635876.jpg',
    colorOptions: [
      { name: 'Terracotta Rust', hex: '#b45309' },
      { name: 'Walnut Ochre', hex: '#854d0e' },
      { name: 'Taupe Boucle', hex: '#71717a' }
    ],
    thumbnails: [
      '/assets/images/lounge_armchair_1_1783979635876.jpg',
      '/assets/images/lounge_armchair_detail_1783979683146.jpg',
      '/assets/images/splash_background_1783979618315.jpg'
    ]
  },
  {
    id: 'furn-2',
    name: 'Cozy Lounge',
    category: 'armchair',
    type: 'Armchair',
    price: 8300,
    rating: 4.5,
    description: 'A beautifully upholstered minimalist organic armchair. Designed for small reading corners and sunrooms, it offers comfortable deep cushion seating and clean Scandinavian style structural woodwork.',
    image: '/assets/images/lounge_armchair_2_1783979650456.jpg',
    colorOptions: [
      { name: 'Cream White', hex: '#f5f5f4' },
      { name: 'Slate Gray', hex: '#3f3f46' },
      { name: 'Sage Soft', hex: '#6b7280' }
    ],
    thumbnails: [
      '/assets/images/lounge_armchair_2_1783979650456.jpg',
      '/assets/images/lounge_armchair_detail_1783979683146.jpg'
    ]
  },
  {
    id: 'furn-3',
    name: 'Executive Swivel',
    category: 'armchair',
    type: 'Office Chair',
    price: 18500,
    rating: 4.9,
    description: 'A sophisticated office accent chair merging modern style with ergonomic performance. Impeccably tailored leather meets a deep walnut solid wood base, creating an unmatched focal point for professional home office spaces.',
    image: '/assets/images/office_armchair_1783979667913.jpg',
    colorOptions: [
      { name: 'Tan Leather', hex: '#7c2d12' },
      { name: 'Espresso Black', hex: '#18181b' }
    ],
    thumbnails: [
      '/assets/images/office_armchair_1783979667913.jpg',
      '/assets/images/lounge_armchair_detail_1783979683146.jpg'
    ]
  }
];

export const serviceItems: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Office Renovation',
    category: 'Commercial',
    price: 125000,
    image: '/assets/images/office_armchair_1783979667913.jpg',
    description: 'Complete corporate redesign. We source premium ergonomic office chairs, customize modular desk layouts, install intelligent acoustic panels, and paint rooms with focus-enhancing accent palettes.',
    duration: '5 - 10 Days'
  },
  {
    id: 'srv-2',
    title: 'Living Room Makeover',
    category: 'Residential',
    price: 180000,
    image: '/assets/images/splash_background_1783979618315.jpg',
    description: 'Top-to-bottom spatial transformation. Features bespoke archways, custom recessed lighting, textured microcement plastering, and beautifully layered organic seating configurations.',
    duration: '7 - 14 Days'
  },
  {
    id: 'srv-3',
    title: 'Niche Reading Nook',
    category: 'Residential',
    price: 45000,
    image: '/assets/images/lounge_armchair_1_1783979635876.jpg',
    description: 'Transform an unused corner into a peaceful sanctuary. We install custom wall-mounted library shelving, warm directional accent lamps, and configure comfortable reading seating.',
    duration: '2 - 3 Days'
  }
];

