import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  SlidersHorizontal, 
  Armchair, 
  Lamp, 
  Table, 
  LayoutGrid, 
  Sofa, 
  Plus, 
  Star, 
  ChevronRight, 
  Heart,
  Check
} from 'lucide-react';
import { FurnitureItem, ServiceItem } from '../types';
import { categories, furnitureItems, serviceItems } from '../data';

interface HomeViewProps {
  onSelectItem: (id: string) => void;
  onSelectService: (service: ServiceItem) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onAddToCart: (item: FurnitureItem, colorIndex: number) => void;
  cartItemsCount: number;
}

export default function HomeView({
  onSelectItem,
  onSelectService,
  favorites,
  onToggleFavorite,
  onAddToCart,
  cartItemsCount
}: HomeViewProps) {
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<number>(20000);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Filter items
  const filteredItems = furnitureItems.filter(item => {
    const matchesCategory = selectedCat === 'all' || item.category === selectedCat || item.type.toLowerCase().includes(selectedCat);
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = item.price <= priceRange;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Category Icon Resolver
  const renderCategoryIcon = (iconName: string, active: boolean) => {
    const props = {
      className: `w-5 h-5 transition-colors ${active ? 'text-amber-800' : 'text-neutral-500'}`
    };
    switch (iconName) {
      case 'LayoutGrid': return <LayoutGrid {...props} />;
      case 'Armchair': return <Armchair {...props} />;
      case 'Sofa': return <Sofa {...props} />;
      case 'Lamp': return <Lamp {...props} />;
      case 'Table': return <Table {...props} />;
      default: return <LayoutGrid {...props} />;
    }
  };

  const handleQuickAdd = (e: React.MouseEvent, item: FurnitureItem) => {
    e.stopPropagation();
    onAddToCart(item, 0); // default to first color
    setJustAddedId(item.id);
    setTimeout(() => setJustAddedId(null), 1200);
  };

  return (
    <div id="home-view-container" className="w-full h-full min-h-[600px] bg-neutral-50 flex flex-col p-5 overflow-y-auto rounded-3xl shadow-2xl">
      
      {/* Top Header Panel */}
      <div id="home-header" className="flex justify-between items-center mb-6 pt-2">
        <div id="home-title-block">
          <h2 id="home-greeting" className="text-xl sm:text-2xl font-bold text-neutral-800 tracking-tight leading-tight">
            Make your Home <br />
            <span className="text-amber-800">Elegant</span>
          </h2>
        </div>
        <div id="home-avatar-container" className="relative cursor-pointer group">
          <img 
            id="home-avatar"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120" 
            alt="User profile" 
            referrerPolicy="no-referrer"
            className="w-11 h-11 rounded-full border-2 border-white shadow-md hover:border-amber-700 transition-colors"
          />
          <div id="home-avatar-indicator" className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
        </div>
      </div>

      {/* Search Bar & Custom Filter Tool */}
      <div id="search-section" className="flex items-center gap-2.5 mb-6">
        <div id="search-input-wrapper" className="relative flex-1">
          <Search id="search-icon" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400" />
          <input
            id="search-input"
            type="text"
            placeholder="Search for furniture..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 pl-10 pr-4 bg-white border border-neutral-200/80 rounded-2xl text-xs text-neutral-800 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700/20 transition-all placeholder:text-neutral-400"
          />
        </div>
        <button
          id="filter-toggle"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
            isFilterOpen 
              ? 'bg-amber-800 border-amber-800 text-white shadow-md' 
              : 'bg-white border-neutral-200/80 text-neutral-700 hover:border-amber-700'
          }`}
        >
          <SlidersHorizontal id="filter-btn-icon" className="w-4 h-4" />
        </button>
      </div>

      {/* Expandable Filter drawer */}
      {isFilterOpen && (
        <motion.div
          id="filter-drawer"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 bg-amber-50/50 border border-amber-100/80 p-4 rounded-2xl"
        >
          <div id="filter-price-header" className="flex justify-between items-center mb-2">
            <span id="price-range-label" className="text-xs font-semibold text-neutral-700">Max Budget</span>
            <span id="price-range-value" className="text-xs font-bold text-amber-800">₹{priceRange.toLocaleString()}</span>
          </div>
          <input
            id="price-range-slider"
            type="range"
            min="5000"
            max="30000"
            step="500"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full accent-amber-800 cursor-pointer h-1 bg-neutral-200 rounded-lg appearance-none"
          />
          <div id="filter-presets" className="flex gap-2 mt-3">
            <button 
              id="filter-preset-all"
              onClick={() => setPriceRange(30000)} 
              className="px-2.5 py-1 text-[10px] bg-white border border-neutral-200 rounded-lg text-neutral-600 hover:border-amber-700"
            >
              Reset Budget
            </button>
            <button 
              id="filter-preset-budget"
              onClick={() => setPriceRange(10000)} 
              className="px-2.5 py-1 text-[10px] bg-white border border-neutral-200 rounded-lg text-neutral-600 hover:border-amber-700"
            >
              Under ₹10k
            </button>
          </div>
        </motion.div>
      )}

      {/* Categories Horizontal Scrolling List */}
      <div id="categories-section" className="mb-6">
        <h3 id="categories-section-title" className="text-xs font-bold text-neutral-800 uppercase tracking-widest mb-3.5">
          Categories
        </h3>
        <div id="categories-scroll" className="flex gap-3.5 overflow-x-auto pb-2 scrollbar-none snap-x">
          {categories.map((cat) => {
            const active = selectedCat === cat.id;
            return (
              <button
                id={`cat-btn-${cat.id}`}
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`flex flex-col items-center justify-center p-3 w-16 h-16 rounded-2xl snap-start cursor-pointer transition-all duration-300 ${
                  active 
                    ? 'bg-amber-100 border border-amber-200/60 shadow-sm transform scale-105' 
                    : 'bg-white border border-neutral-200/40 hover:border-neutral-300'
                }`}
              >
                {renderCategoryIcon(cat.icon, active)}
                <span id={`cat-lbl-${cat.id}`} className={`text-[9px] font-medium tracking-tight mt-1.5 transition-colors ${
                  active ? 'text-amber-900 font-bold' : 'text-neutral-500'
                }`}>
                  {cat.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Armchair Products Grid Row */}
      <div id="products-section" className="mb-6">
        <div id="products-header" className="flex justify-between items-center mb-3">
          <h3 id="products-section-title" className="text-xs font-bold text-neutral-800 uppercase tracking-widest">
            Minimalist Collection
          </h3>
          <span id="products-count-badge" className="text-[10px] font-medium text-neutral-400">
            {filteredItems.length} items
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div id="no-products" className="py-8 text-center bg-white rounded-2xl border border-neutral-200/50">
            <p id="no-products-text" className="text-xs text-neutral-500">No matching items found.</p>
          </div>
        ) : (
          <div id="products-grid" className="grid grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <div
                id={`prod-card-${item.id}`}
                key={item.id}
                onClick={() => onSelectItem(item.id)}
                className="group bg-white rounded-3xl p-3 border border-neutral-100/75 hover:border-neutral-200/80 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                {/* Image and Favourite floating button */}
                <div id={`image-container-${item.id}`} className="relative rounded-2xl overflow-hidden aspect-square mb-2.5 bg-neutral-100">
                  <img
                    id={`prod-img-${item.id}`}
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    id={`fav-btn-${item.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(item.id);
                    }}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-neutral-200/20 text-neutral-600 hover:text-red-500 hover:bg-white transition-colors cursor-pointer"
                  >
                    <Heart 
                      id={`fav-icon-${item.id}`}
                      className={`w-3.5 h-3.5 ${favorites.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-neutral-600'}`} 
                    />
                  </button>
                  <div id={`rating-badge-${item.id}`} className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[8px] text-white font-bold flex items-center gap-0.5">
                    <Star id={`star-icon-${item.id}`} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    {item.rating}
                  </div>
                </div>

                {/* Info & Price row */}
                <div id={`info-row-${item.id}`}>
                  <h4 id={`prod-name-${item.id}`} className="text-[13px] font-bold text-neutral-800 truncate leading-tight">
                    {item.name}
                  </h4>
                  <p id={`prod-type-${item.id}`} className="text-[9px] font-medium text-neutral-400 mb-2">
                    {item.type}
                  </p>
                  
                  <div id={`price-row-${item.id}`} className="flex justify-between items-center mt-1">
                    <span id={`prod-price-${item.id}`} className="text-xs font-extrabold text-neutral-950 font-mono">
                      ₹{item.price.toLocaleString()}
                    </span>
                    <button
                      id={`add-btn-${item.id}`}
                      onClick={(e) => handleQuickAdd(e, item)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        justAddedId === item.id 
                          ? 'bg-green-600 text-white scale-110' 
                          : 'bg-amber-800 hover:bg-amber-700 active:bg-amber-900 text-white'
                      }`}
                    >
                      {justAddedId === item.id ? (
                        <Check id={`check-icon-${item.id}`} className="w-3.5 h-3.5" />
                      ) : (
                        <Plus id={`plus-icon-${item.id}`} className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Explore Our Services section */}
      <div id="services-section" className="mb-4">
        <h3 id="services-section-title" className="text-xs font-bold text-neutral-800 uppercase tracking-widest mb-3">
          Explore Our Services
        </h3>
        <div id="services-list" className="flex flex-col gap-3">
          {serviceItems.map((srv) => (
            <div
              id={`service-card-${srv.id}`}
              key={srv.id}
              onClick={() => onSelectService(srv)}
              className="flex items-center gap-3.5 bg-white p-3 rounded-2xl border border-neutral-100/70 hover:border-amber-200 hover:shadow-sm transition-all cursor-pointer"
            >
              <img
                id={`srv-img-${srv.id}`}
                src={srv.image}
                alt={srv.title}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div id={`srv-info-${srv.id}`} className="flex-1 min-w-0">
                <h4 id={`srv-title-${srv.id}`} className="text-xs font-bold text-neutral-800 truncate">
                  {srv.title}
                </h4>
                <p id={`srv-desc-${srv.id}`} className="text-[10px] text-neutral-400 truncate mt-0.5">
                  Custom styling • {srv.duration}
                </p>
                <p id={`srv-price-${srv.id}`} className="text-[10px] font-bold text-amber-800 mt-1 font-mono">
                  Starting at ₹{srv.price.toLocaleString()}
                </p>
              </div>
              <div id={`srv-go-arrow-${srv.id}`} className="p-1 rounded-full bg-neutral-50 border border-neutral-100 text-neutral-400 group-hover:text-amber-800">
                <ChevronRight id={`arrow-icon-${srv.id}`} className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
