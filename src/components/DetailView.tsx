import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Heart, Star, ShoppingCart, Check, Info } from 'lucide-react';
import { FurnitureItem } from '../types';

interface DetailViewProps {
  item: FurnitureItem;
  onBack: () => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onAddToCart: (item: FurnitureItem, colorIndex: number) => void;
}

export default function DetailView({
  item,
  onBack,
  favorites,
  onToggleFavorite,
  onAddToCart,
}: DetailViewProps) {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [activeImage, setActiveImage] = useState(item.image);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const selectedColor = item.colorOptions[selectedColorIdx];

  const handleAddToCart = () => {
    onAddToCart(item, selectedColorIdx);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  return (
    <div id="detail-view-container" className="w-full h-full min-h-[600px] bg-neutral-100 flex flex-col overflow-y-auto rounded-3xl shadow-2xl relative">
      
      {/* Top Floating Action Buttons */}
      <div id="detail-floating-header" className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
        <button
          id="detail-back-button"
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md border border-neutral-200/20 text-neutral-800 hover:bg-white active:scale-95 transition-all cursor-pointer"
        >
          <ChevronLeft id="back-arrow-icon" className="w-5 h-5" />
        </button>
        <button
          id="detail-fav-button"
          onClick={() => onToggleFavorite(item.id)}
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md border border-neutral-200/20 text-neutral-800 hover:bg-white active:scale-95 transition-all cursor-pointer"
        >
          <Heart
            id="detail-fav-icon"
            className={`w-4.5 h-4.5 ${favorites.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-neutral-600'}`}
          />
        </button>
      </div>

      {/* Main Large Hero Image */}
      <div id="detail-hero-section" className="relative w-full h-[280px] bg-neutral-200 overflow-hidden shrink-0">
        <img
          id="detail-hero-img"
          src={activeImage}
          alt={item.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-all duration-700"
        />
        <div id="detail-hero-gradient" className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Card Content Sheet Container */}
      <div id="detail-card-sheet" className="flex-1 bg-white rounded-t-[32px] -mt-6 relative z-10 px-5 pt-6 pb-6 flex flex-col justify-between">
        <div id="detail-card-main-info">
          
          {/* Title & Rating Header row */}
          <div id="detail-title-row" className="flex justify-between items-start mb-3">
            <div id="detail-title-group">
              <span id="detail-item-type" className="text-[10px] font-bold text-amber-800 uppercase tracking-widest">
                {item.type}
              </span>
              <h3 id="detail-item-name" className="text-xl font-extrabold text-neutral-900 leading-tight mt-0.5">
                {item.name}
              </h3>
            </div>
            
            {/* Star Rating Badge */}
            <div id="detail-star-badge" className="flex items-center gap-1 bg-neutral-100 border border-neutral-200/30 px-3 py-1 rounded-full text-xs font-bold text-neutral-800">
              <Star id="detail-star-icon" className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{item.rating}</span>
            </div>
          </div>

          {/* Description Section */}
          <div id="detail-desc-container" className="mb-5">
            <p id="detail-desc-text" className={`text-xs text-neutral-500 leading-relaxed transition-all duration-300 ${
              isDescExpanded ? '' : 'line-clamp-3'
            }`}>
              {item.description}
            </p>
            <button
              id="detail-read-more"
              onClick={() => setIsDescExpanded(!isDescExpanded)}
              className="text-xs font-bold text-amber-800 hover:text-amber-700 mt-1 cursor-pointer underline decoration-dotted"
            >
              {isDescExpanded ? 'Read Less' : 'Read More'}
            </button>
          </div>

          {/* Alternate Thumbnail Gallery Row */}
          <div id="detail-gallery-container" className="mb-5">
            <h4 id="detail-gallery-title" className="text-[10px] font-bold text-neutral-800 uppercase tracking-widest mb-3">
              Design Perspectives
            </h4>
            <div id="detail-gallery-list" className="flex gap-2.5 overflow-x-auto pb-1">
              {item.thumbnails.map((thumb, idx) => {
                const isActive = activeImage === thumb;
                return (
                  <button
                    id={`thumb-btn-${idx}`}
                    key={idx}
                    onClick={() => setActiveImage(thumb)}
                    className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 cursor-pointer transition-all ${
                      isActive ? 'border-amber-800 scale-105 shadow-sm' : 'border-transparent hover:border-neutral-200'
                    }`}
                  >
                    <img
                      id={`thumb-img-${idx}`}
                      src={thumb}
                      alt={`${item.name} angle ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Option Selector */}
          <div id="detail-color-container" className="mb-6">
            <h4 id="detail-color-title" className="text-[10px] font-bold text-neutral-800 uppercase tracking-widest mb-2.5">
              Available Colors
            </h4>
            <div id="detail-color-options" className="flex items-center gap-3">
              {item.colorOptions.map((opt, idx) => {
                const isSelected = selectedColorIdx === idx;
                return (
                  <button
                    id={`color-circle-${idx}`}
                    key={idx}
                    onClick={() => setSelectedColorIdx(idx)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer relative ${
                      isSelected ? 'ring-2 ring-offset-2 ring-amber-800 scale-105' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: opt.hex }}
                    title={opt.name}
                  >
                    {/* Add visual check indicator for light/dark hex colors */}
                    {isSelected && (
                      <span id={`color-check-${idx}`} className={`w-1.5 h-1.5 rounded-full ${
                        opt.hex === '#f5f5f4' ? 'bg-neutral-800' : 'bg-white'
                      }`} />
                    )}
                  </button>
                );
              })}
              <span id="detail-color-name" className="text-[11px] text-neutral-400 font-medium italic ml-1">
                {selectedColor.name}
              </span>
            </div>
          </div>

        </div>

        {/* CTA Purchase Action Box */}
        <div id="detail-cta-box" className="pt-2">
          <button
            id="detail-buy-button"
            onClick={handleAddToCart}
            className={`w-full py-4 rounded-2xl font-semibold text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer uppercase ${
              isAdded 
                ? 'bg-green-600 text-white hover:bg-green-600' 
                : 'bg-amber-800 hover:bg-amber-700 active:bg-amber-900 text-white'
            }`}
          >
            {isAdded ? (
              <>
                <Check id="check-icon" className="w-4.5 h-4.5 animate-bounce" />
                <span>Added to Design Cart</span>
              </>
            ) : (
              <>
                <ShoppingCart id="cart-icon" className="w-4.5 h-4.5" />
                <span>Buy Our Services • ₹{item.price.toLocaleString()}</span>
              </>
            )}
          </button>
          
          <div id="detail-disclaimer" className="flex items-center justify-center gap-1.5 mt-2.5 text-[9px] text-neutral-400 font-medium">
            <Info className="w-3 h-3 text-neutral-400 shrink-0" />
            <span>Includes 1 year structural warranty & matching style guide.</span>
          </div>
        </div>

      </div>

    </div>
  );
}
