export interface ColorOption {
  name: string;
  hex: string;
}

export interface FurnitureItem {
  id: string;
  name: string;
  category: string;
  type: string;
  price: number;
  rating: number;
  description: string;
  image: string;
  colorOptions: ColorOption[];
  thumbnails: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
  description: string;
  duration: string;
}

export interface CartItem {
  id: string; // unique cart item id
  item: FurnitureItem | ServiceItem;
  type: 'furniture' | 'service';
  selectedColor?: ColorOption;
  quantity: number;
}

export interface RenovationBooking {
  id: string;
  serviceId: string;
  serviceTitle: string;
  clientName: string;
  clientEmail: string;
  date: string;
  notes: string;
  estimatedCost: number;
  status: 'pending' | 'confirmed' | 'completed';
}

export type ScreenType = 'splash' | 'home' | 'detail' | 'cart' | 'services' | 'bookings';
