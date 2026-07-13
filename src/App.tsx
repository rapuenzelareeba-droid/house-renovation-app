import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  Heart, 
  Home, 
  ShoppingCart, 
  CalendarRange, 
  Sparkles, 
  Wifi, 
  Battery, 
  Signal, 
  Info, 
  CheckCircle, 
  Maximize2,
  Brush,
  ChevronRight,
  Palette
} from 'lucide-react';

import { FurnitureItem, ServiceItem, CartItem, RenovationBooking, ScreenType } from './types';
import { furnitureItems, serviceItems } from './data';

import SplashView from './components/SplashView';
import HomeView from './components/HomeView';
import DetailView from './components/DetailView';
import CartView from './components/CartView';
import ServicesView from './components/ServicesView';
import BookingsView from './components/BookingsView';

// Simulated Notifications Center
const INITIAL_NOTIFICATIONS = [
  { id: 'not-1', sender: 'Siddharth Roy', role: 'Principal Architect', message: 'I have reviewed your Living Room spatial layout. The plaster arch arches look fantastic with our Terracotta Rust seating!', read: false, time: '2 mins ago' },
  { id: 'not-2', sender: 'Meera Nair', role: 'Lighting Lead', message: 'We sourced a matching glowing sphere pendant lamp that coordinates perfectly with the boucle fabric.', read: true, time: '1 hour ago' },
  { id: 'not-3', sender: 'System', role: 'Aura Concierge', message: 'Welcome to Aura Interiors! Tap Get Started to explore our customized seating or renovate rooms.', read: true, time: '2 hours ago' }
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const [selectedItemId, setSelectedItemId] = useState<string>('furn-1');
  
  // Interactive client storage states
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aura_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aura_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookings, setBookings] = useState<RenovationBooking[]>(() => {
    try {
      const saved = localStorage.getItem('aura_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  // Studio Interactive Customizer states
  const [studioChairId, setStudioChairId] = useState('furn-1');
  const [studioColorIdx, setStudioColorIdx] = useState(0);
  const [studioFloor, setStudioFloor] = useState<'ash' | 'teak' | 'plaster'>('ash');

  // Persistence triggers
  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aura_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('aura_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Actions
  const handleSelectItem = (id: string) => {
    setSelectedItemId(id);
    setCurrentScreen('detail');
  };

  const handleSelectService = (srv: ServiceItem) => {
    setCurrentScreen('services');
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (item: FurnitureItem, colorIndex: number) => {
    const selectedColor = item.colorOptions[colorIndex];
    const existingIndex = cart.findIndex(c => c.item.id === item.id && c.selectedColor?.name === selectedColor.name);

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}`,
        item,
        type: 'furniture',
        selectedColor,
        quantity: 1
      };
      setCart(prev => [...prev, newItem]);
    }

    // Automatically synchronize the studio customizer to the selected chair
    setStudioChairId(item.id);
    setStudioColorIdx(colorIndex);
  };

  const handleUpdateQty = (cartId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartId);
    } else {
      setCart(prev => prev.map(c => c.id === cartId ? { ...c, quantity: newQty } : c));
    }
  };

  const handleRemoveItem = (cartId: string) => {
    setCart(prev => prev.filter(c => c.id !== cartId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleAddBookingFromCart = (checkoutItems: CartItem[]) => {
    const newBookings: RenovationBooking[] = checkoutItems.map((c, idx) => ({
      id: `book-${Date.now()}-${idx}`,
      serviceId: c.item.id,
      serviceTitle: `${c.type === 'furniture' ? (c.item as FurnitureItem).name : (c.item as ServiceItem).title} Setup`,
      clientName: 'Areeba',
      clientEmail: 'rapuenzelareeba@gmail.com',
      date: '2026-08-15',
      notes: `Customized with ${c.selectedColor?.name || 'Standard'} fabric accents. Quantity: ${c.quantity}`,
      estimatedCost: c.item.price * c.quantity,
      status: 'pending'
    }));
    setBookings(prev => [...prev, ...newBookings]);
    
    // Add custom notification for checkout
    const newNot = {
      id: `not-${Date.now()}`,
      sender: 'Aura Concierge',
      role: 'Project Delivery',
      message: `Your booking for ${checkoutItems.length} items has been logged! Siddhartha Roy is preparing the design templates.`,
      read: false,
      time: 'Just now'
    };
    setNotifications(prev => [newNot, ...prev]);
  };

  const handleAddBooking = (booking: RenovationBooking) => {
    setBookings(prev => [...prev, booking]);
    
    const newNot = {
      id: `not-${Date.now()}`,
      sender: 'Siddharth Roy',
      role: 'Principal Architect',
      message: `Thanks for scheduling the "${booking.serviceTitle}". I will personally coordinate our measurement squad for ${booking.date}.`,
      read: false,
      time: 'Just now'
    };
    setNotifications(prev => [newNot, ...prev]);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
  };

  const handleMarkNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Resolvers for current furniture item inspected
  const selectedFurnitureItem = furnitureItems.find(f => f.id === selectedItemId) || furnitureItems[0];
  const studioChair = furnitureItems.find(f => f.id === studioChairId) || furnitureItems[0];
  const activeStudioColor = studioChair.colorOptions[studioColorIdx] || studioChair.colorOptions[0];

  return (
    <div id="app-workspace-root" className="min-h-screen w-full bg-neutral-100 text-neutral-800 flex flex-col font-sans selection:bg-amber-800/10 selection:text-amber-900">
      
      {/* Top Professional Decorative Header (No Port or Telemetry logs!) */}
      <header id="desktop-app-header" className="w-full bg-white border-b border-neutral-200/60 px-6 py-4 flex justify-between items-center shrink-0">
        <div id="header-branding" className="flex items-center gap-2">
          <div id="brand-sphere" className="w-7 h-7 rounded-full bg-amber-800 flex items-center justify-center text-white">
            <Sparkles id="brand-spark-icon" className="w-4 h-4" />
          </div>
          <div>
            <h1 id="brand-title" className="text-sm font-extrabold text-neutral-900 uppercase tracking-widest leading-none">Aura Design App</h1>
            <p id="brand-sub" className="text-[10px] text-neutral-400 font-medium tracking-tight mt-0.5">High-Fidelity House Renovation & Furnishing Studio</p>
          </div>
        </div>

        {/* Global Stats indicators for client comfort */}
        <div id="header-stats" className="hidden md:flex items-center gap-5 text-xs font-semibold text-neutral-500">
          <button 
            id="hdr-fav-link"
            onClick={() => { if (currentScreen !== 'splash') setCurrentScreen('home'); }} 
            className="flex items-center gap-1.5 hover:text-amber-800 transition-colors cursor-pointer"
          >
            <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
            <span>Favorites ({favorites.length})</span>
          </button>
          
          <button 
            id="hdr-cart-link"
            onClick={() => { if (currentScreen !== 'splash') setCurrentScreen('cart'); }} 
            className="flex items-center gap-1.5 hover:text-amber-800 transition-colors cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Basket ({cart.reduce((a, c) => a + c.quantity, 0)})</span>
          </button>

          <button 
            id="hdr-projects-link"
            onClick={() => { if (currentScreen !== 'splash') setCurrentScreen('bookings'); }} 
            className="flex items-center gap-1.5 hover:text-amber-800 transition-colors cursor-pointer"
          >
            <CalendarRange className="w-4 h-4" />
            <span>Projects ({bookings.length})</span>
          </button>
        </div>
      </header>

      {/* Main Responsive Grid Workspace */}
      <main id="app-workspace-grid" className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: The Interactive iPhone Device Frame Mockup (lg:col-span-5) */}
        <div id="iphone-mockup-wrapper" className="lg:col-span-5 w-full flex flex-col items-center justify-center">
          
          <div id="iphone-body-frame" className="relative w-full max-w-[390px] aspect-[9/19.5] rounded-[52px] bg-neutral-950 p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border-[5px] border-neutral-800 flex flex-col justify-between overflow-hidden">
            
            {/* Dynamic iPhone Notch Island */}
            <div id="iphone-island" className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-neutral-900 rounded-full z-40 flex items-center justify-between px-3 text-[10px] text-neutral-400">
              <div id="island-lens" className="w-2.5 h-2.5 rounded-full bg-neutral-950 border border-neutral-800" />
              <div id="island-dot" className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
            </div>

            {/* Dynamic Status Bar */}
            <div id="iphone-status-bar" className="w-full h-8 z-30 flex justify-between items-center px-6 text-[11px] font-bold text-neutral-800 mix-blend-difference select-none pt-1">
              <span id="status-time" className="text-white">14:53</span>
              <div id="status-icons" className="flex items-center gap-1.5 text-white">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* Main Interactive Screen Canvas */}
            <div id="iphone-screen-canvas" className="relative w-full h-[calc(100%-32px)] bg-neutral-50 rounded-[38px] overflow-hidden flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                <motion.div
                  id="active-screen-motion-wrapper"
                  key={currentScreen + (currentScreen === 'detail' ? selectedItemId : '')}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.35 }}
                  className="flex-1 w-full overflow-hidden"
                >
                  {currentScreen === 'splash' && (
                    <SplashView onGetStarted={() => setCurrentScreen('home')} />
                  )}

                  {currentScreen === 'home' && (
                    <HomeView
                      onSelectItem={handleSelectItem}
                      onSelectService={handleSelectService}
                      favorites={favorites}
                      onToggleFavorite={handleToggleFavorite}
                      onAddToCart={handleAddToCart}
                      cartItemsCount={cart.reduce((a, c) => a + c.quantity, 0)}
                    />
                  )}

                  {currentScreen === 'detail' && (
                    <DetailView
                      item={selectedFurnitureItem}
                      onBack={() => setCurrentScreen('home')}
                      favorites={favorites}
                      onToggleFavorite={handleToggleFavorite}
                      onAddToCart={handleAddToCart}
                    />
                  )}

                  {currentScreen === 'cart' && (
                    <CartView
                      cart={cart}
                      onUpdateQty={handleUpdateQty}
                      onRemoveItem={handleRemoveItem}
                      onClearCart={handleClearCart}
                      onAddBookingFromCart={handleAddBookingFromCart}
                    />
                  )}

                  {currentScreen === 'services' && (
                    <ServicesView
                      onAddBooking={handleAddBooking}
                      onNavigateToBookings={() => setCurrentScreen('bookings')}
                    />
                  )}

                  {currentScreen === 'bookings' && (
                    <BookingsView
                      bookings={bookings}
                      onCancelBooking={handleCancelBooking}
                      onNavigateToServices={() => setCurrentScreen('services')}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Dynamic Bottom Interactive Navigation Tab Bar (Shown only when NOT on Splash) */}
              {currentScreen !== 'splash' && (
                <div id="iphone-nav-bar" className="w-full bg-white/95 backdrop-blur-md border-t border-neutral-100/80 px-4 py-2.5 flex justify-between items-center shrink-0 z-30">
                  
                  {/* Tab 1: Notifications indicator */}
                  <button
                    id="nav-tab-notifications"
                    onClick={() => setShowNotificationsModal(true)}
                    className="flex flex-col items-center justify-center flex-1 py-1 text-neutral-400 hover:text-amber-800 transition-colors relative cursor-pointer"
                  >
                    <div className="relative">
                      <Bell id="bell-icon" className="w-5 h-5 text-neutral-400 hover:scale-105 transition-transform" />
                      {notifications.some(n => !n.read) && (
                        <span id="unread-not-dot" className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white" />
                      )}
                    </div>
                    <span id="tab-not-lbl" className="text-[8px] font-medium tracking-tight mt-1 text-neutral-400">Notification</span>
                  </button>

                  {/* Tab 2: Favourites */}
                  <button
                    id="nav-tab-favorites"
                    onClick={() => {
                      if (currentScreen !== 'home') setCurrentScreen('home');
                      // Filter state is handled globally if needed, let's keep navigation clean
                    }}
                    className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors cursor-pointer ${
                      currentScreen === 'home' && favorites.length > 0 ? 'text-amber-800' : 'text-neutral-400'
                    }`}
                  >
                    <Heart id="heart-icon" className={`w-5 h-5 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                    <span id="tab-fav-lbl" className="text-[8px] font-medium tracking-tight mt-1">Favourite</span>
                  </button>

                  {/* Tab 3: Home / Explore */}
                  <button
                    id="nav-tab-home"
                    onClick={() => setCurrentScreen('home')}
                    className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors cursor-pointer ${
                      currentScreen === 'home' ? 'text-amber-800' : 'text-neutral-400'
                    }`}
                  >
                    <Home id="home-icon" className="w-5 h-5" />
                    <span id="tab-home-lbl" className="text-[8px] font-bold tracking-tight mt-1">Home</span>
                  </button>

                  {/* Tab 4: Cart/Chart */}
                  <button
                    id="nav-tab-cart"
                    onClick={() => setCurrentScreen('cart')}
                    className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors relative cursor-pointer ${
                      currentScreen === 'cart' ? 'text-amber-800 font-bold' : 'text-neutral-400'
                    }`}
                  >
                    <div className="relative">
                      <ShoppingCart id="cart-nav-icon" className="w-5 h-5" />
                      {cart.length > 0 && (
                        <span id="cart-badge-nav" className="absolute -top-1.5 -right-2 bg-amber-800 text-white font-mono text-[8px] font-extrabold px-1.5 py-0.5 rounded-full border border-white">
                          {cart.reduce((a, c) => a + c.quantity, 0)}
                        </span>
                      )}
                    </div>
                    <span id="tab-cart-lbl" className="text-[8px] font-medium tracking-tight mt-1">Chart</span>
                  </button>

                </div>
              )}

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Interactive Studio Customizer (Mood Board Room Visualizer) (lg:col-span-7) */}
        <div id="desktop-studio-panel" className="lg:col-span-7 w-full flex flex-col gap-6">
          
          <div id="studio-main-card" className="bg-white p-5 sm:p-6 rounded-3xl border border-neutral-200/60 shadow-lg flex flex-col justify-between">
            <div id="studio-header" className="flex items-center justify-between mb-4">
              <div id="studio-title-group" className="flex items-center gap-2">
                <Palette id="palette-icon" className="w-5 h-5 text-amber-800" />
                <h3 id="studio-title" className="text-sm font-extrabold text-neutral-900 uppercase tracking-widest">Aura Style Sandbox</h3>
              </div>
              <span id="studio-live-pill" className="bg-green-100 text-green-700 font-bold text-[9px] px-2.5 py-0.5 rounded-full flex items-center gap-1 select-none animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Live Design Engine
              </span>
            </div>

            <p id="studio-desc" className="text-xs text-neutral-500 leading-relaxed mb-6">
              Experiment with furniture styles, colors, and floor textures in our virtual room simulator. Select active components below to construct matching renovation schemes.
            </p>

            {/* Virtual Room Simulator Stage */}
            <div 
              id="studio-render-stage" 
              className={`w-full aspect-[16/9] rounded-2xl relative overflow-hidden transition-all duration-700 flex items-center justify-center border border-neutral-200/50 ${
                studioFloor === 'ash' 
                  ? 'bg-neutral-100' 
                  : studioFloor === 'teak' 
                    ? 'bg-amber-950/10' 
                    : 'bg-neutral-200/80'
              }`}
            >
              {/* Backing Room wall rendering */}
              <div id="stage-shadow-overlay" className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/5 to-neutral-900/30 z-0" />
              <div id="stage-light-glow" className="absolute top-0 left-1/4 w-1/2 h-[75%] bg-amber-200/20 blur-3xl z-0 rounded-full" />

              {/* Dynamic pendant lamp on the wall */}
              <div id="stage-lamp" className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                <div id="stage-lamp-wire" className="w-0.5 h-14 bg-neutral-800" />
                <div id="stage-lamp-sphere" className="w-6 h-6 rounded-full bg-amber-100 border border-white shadow-[0_0_15px_rgba(253,230,138,0.8)] animate-pulse" />
              </div>

              {/* Plaster Arch outline backdrop */}
              <div id="stage-arch" className="absolute bottom-0 left-12 w-48 h-40 border-t-[3px] border-x-[3px] border-white/60 rounded-t-full bg-white/10 backdrop-blur-[1px] z-0" />

              {/* Room floor texture surface */}
              <div 
                id="stage-floor" 
                className={`absolute bottom-0 left-0 right-0 h-1/4 border-t border-neutral-200/30 z-10 flex items-center justify-center transition-all ${
                  studioFloor === 'ash' 
                    ? 'bg-stone-200' 
                    : studioFloor === 'teak' 
                      ? 'bg-amber-900/40' 
                      : 'bg-zinc-300'
                }`}
              >
                {/* Woven Woolen Rug */}
                <div id="stage-rug" className="w-56 h-10 bg-amber-100/60 rounded-full border border-amber-200/20 transform scale-y-50 shadow-md blur-[0.5px]" />
              </div>

              {/* Main Simulated Armchair element */}
              <motion.div
                id="stage-chair-element"
                key={studioChair.id + studioColorIdx}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute bottom-4 z-20 w-36 sm:w-44 aspect-square flex items-center justify-center"
              >
                <img
                  id="stage-chair-img"
                  src={studioChair.image}
                  alt="Studio customized armchair"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.25)] rounded-2xl"
                  style={{
                    // Apply subtle CSS filter overlay to tint colors if needed, but since we generate high fidelity custom assets we rely on beautiful real item views!
                    borderBottom: `6px solid ${activeStudioColor.hex}80` // subtle color floor highlight matching selected color
                  }}
                />
              </motion.div>

              {/* floating detail labels */}
              <div id="stage-floating-spec" className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[9px] text-neutral-300 space-y-0.5 z-20">
                <p id="floating-spec-style" className="font-bold text-white uppercase tracking-wider">{studioChair.name}</p>
                <p id="floating-spec-color" className="italic font-medium">Color: {activeStudioColor.name}</p>
                <p id="floating-spec-floor" className="font-mono text-amber-300">Floor: {studioFloor.toUpperCase()}</p>
              </div>
            </div>

            {/* Selector Controls for Sandbox */}
            <div id="studio-selectors" className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6 border-t border-neutral-100 pt-5">
              
              {/* Control 1: Choose Armchair model */}
              <div id="studio-ctrl-armchair">
                <label id="lbl-studio-model" className="block text-[10px] font-bold text-neutral-800 uppercase tracking-widest mb-2.5">Chair Model</label>
                <div id="studio-model-list" className="space-y-1.5">
                  {furnitureItems.map((f) => (
                    <button
                      id={`studio-model-btn-${f.id}`}
                      key={f.id}
                      onClick={() => {
                        setStudioChairId(f.id);
                        setStudioColorIdx(0);
                      }}
                      className={`w-full py-2 px-3 rounded-xl border text-left text-xs font-bold flex justify-between items-center transition-all cursor-pointer ${
                        studioChairId === f.id 
                          ? 'bg-amber-800 text-white border-amber-800 shadow' 
                          : 'bg-neutral-50 border-neutral-200/50 hover:bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      <span id={`studio-model-name-${f.id}`}>{f.name}</span>
                      <span id={`studio-model-price-${f.id}`} className="font-mono text-[10px] font-medium opacity-80">₹{f.price.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Control 2: Color Swatches */}
              <div id="studio-ctrl-color">
                <label id="lbl-studio-color" className="block text-[10px] font-bold text-neutral-800 uppercase tracking-widest mb-2.5">Fabric Finish</label>
                <div id="studio-color-grid" className="grid grid-cols-2 gap-2">
                  {studioChair.colorOptions.map((opt, idx) => {
                    const isSelected = studioColorIdx === idx;
                    return (
                      <button
                        id={`studio-color-btn-${idx}`}
                        key={idx}
                        onClick={() => setStudioColorIdx(idx)}
                        className={`p-2 rounded-xl border flex items-center gap-2 text-left cursor-pointer transition-all ${
                          isSelected 
                            ? 'bg-amber-50 border-amber-800 shadow-sm' 
                            : 'bg-white border-neutral-200/60 hover:border-neutral-300'
                        }`}
                      >
                        <span id={`studio-color-dot-${idx}`} className="w-3.5 h-3.5 rounded-full shrink-0 border border-neutral-200" style={{ backgroundColor: opt.hex }} />
                        <span id={`studio-color-name-${idx}`} className="text-[10px] font-semibold text-neutral-700 truncate leading-tight">{opt.name.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Control 3: Floor wood material selection */}
              <div id="studio-ctrl-floor">
                <label id="lbl-studio-floor" className="block text-[10px] font-bold text-neutral-800 uppercase tracking-widest mb-2.5">Floor Surface</label>
                <div id="studio-floor-list" className="space-y-1.5">
                  {(['ash', 'teak', 'plaster'] as const).map((fl) => (
                    <button
                      id={`studio-floor-btn-${fl}`}
                      key={fl}
                      onClick={() => setStudioFloor(fl)}
                      className={`w-full py-2 px-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer capitalize ${
                        studioFloor === fl 
                          ? 'bg-neutral-900 text-white border-neutral-900 shadow' 
                          : 'bg-neutral-50 border-neutral-200/50 hover:bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {fl === 'ash' ? 'Scandinavian Ash' : fl === 'teak' ? 'Rich Dark Teak' : 'Organic Plaster'}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Quick Action to buy active Studio design */}
            <div id="studio-cta-box" className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <div>
                <p id="studio-total-lbl" className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Studio Configuration Price</p>
                <p id="studio-total-val" className="text-base font-extrabold text-neutral-950 font-mono mt-0.5">₹{studioChair.price.toLocaleString()}</p>
              </div>
              <button
                id="studio-buy-active-btn"
                onClick={() => {
                  handleAddToCart(studioChair, studioColorIdx);
                  // Automatically open cart to complete booking
                  setCurrentScreen('cart');
                }}
                className="px-4 py-2.5 bg-amber-800 hover:bg-amber-700 text-white text-xs font-extrabold tracking-wider rounded-xl cursor-pointer flex items-center gap-1.5 transition-all shadow-md"
              >
                <Brush className="w-4.5 h-4.5" />
                <span>BOOK THIS CONFIGURATION</span>
              </button>
            </div>

          </div>

          {/* Quick Client Consultation info card */}
          <div id="consultation-widget" className="bg-amber-50/55 p-4.5 rounded-3xl border border-amber-100/80 flex items-start gap-3">
            <div id="consultation-icon-bg" className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
              <Sparkles id="spark-widget" className="w-5 h-5" />
            </div>
            <div id="consultation-widget-text" className="flex-1 min-w-0">
              <h4 id="widget-title" className="text-xs font-bold text-amber-900">Need expert physical matching assistance?</h4>
              <p id="widget-desc" className="text-[11px] text-neutral-500 leading-relaxed mt-0.5">
                Our elite design advisors provide at-home physical material mockups with genuine wood chips, plaster cards, and boucle weavers. Book standard renovations below or connect via simulated mailer.
              </p>
              <button
                id="widget-schedule-btn"
                onClick={() => {
                  if (currentScreen === 'splash') {
                    setCurrentScreen('home');
                  }
                  setTimeout(() => setCurrentScreen('services'), 100);
                }}
                className="mt-2.5 text-xs font-extrabold text-amber-800 hover:text-amber-700 flex items-center gap-1 cursor-pointer hover:underline"
              >
                <span>Launch Renovation Configurator</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer id="app-footer" className="w-full py-6 mt-12 bg-white border-t border-neutral-200/50 text-center text-[10px] text-neutral-400 font-medium tracking-wide">
        <p id="footer-text">© 2026 Aura Interiors. All Rights Reserved. Built with React, Tailwind, and Motion.</p>
        <p id="footer-support" className="mt-1 text-neutral-400">Preview User Token: {localStorage.getItem('aura_cart') ? 'Active Session' : 'New Session'}</p>
      </footer>

      {/* SIMULATED NOTIFICATIONS MODAL DRAWER */}
      {showNotificationsModal && (
        <div id="not-modal-overlay" className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            id="not-modal-content"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 max-w-md w-full border border-neutral-200 shadow-2xl relative"
          >
            <div id="not-modal-header" className="flex justify-between items-center mb-5">
              <h3 id="not-modal-title" className="text-sm font-extrabold text-neutral-900 uppercase tracking-widest flex items-center gap-2">
                <Bell className="w-4.5 h-4.5 text-amber-800" />
                Aura Design Mailbox
              </h3>
              <button
                id="not-modal-close"
                onClick={() => {
                  handleMarkNotificationsRead();
                  setShowNotificationsModal(false);
                }}
                className="text-neutral-400 hover:text-neutral-800 text-xs font-bold px-2.5 py-1 bg-neutral-100 rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>

            <div id="not-modal-list" className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {notifications.map((n) => (
                <div
                  id={`not-item-${n.id}`}
                  key={n.id}
                  className={`p-3 rounded-xl border text-xs relative ${
                    n.read ? 'bg-neutral-50 border-neutral-200/60 text-neutral-500' : 'bg-amber-50/50 border-amber-200 text-neutral-800 font-medium'
                  }`}
                >
                  <div id={`not-item-header-${n.id}`} className="flex justify-between items-center mb-1">
                    <span id={`not-item-sender-${n.id}`} className="font-bold text-amber-900">{n.sender} <span className="font-normal text-[10px] text-neutral-400">({n.role})</span></span>
                    <span id={`not-item-time-${n.id}`} className="text-[9px] text-neutral-400 font-mono">{n.time}</span>
                  </div>
                  <p id={`not-item-msg-${n.id}`} className="leading-relaxed">{n.message}</p>
                </div>
              ))}
            </div>

            <button
              id="not-modal-clear-btn"
              onClick={() => {
                handleMarkNotificationsRead();
                setShowNotificationsModal(false);
              }}
              className="w-full mt-5 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs rounded-xl tracking-wider uppercase cursor-pointer"
            >
              Clear & Read All
            </button>
          </motion.div>
        </div>
      )}

    </div>
  );
}
