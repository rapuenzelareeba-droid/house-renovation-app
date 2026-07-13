import React, { useState } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CartItem, FurnitureItem, ServiceItem } from '../types';

interface CartViewProps {
  cart: CartItem[];
  onUpdateQty: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onAddBookingFromCart: (cart: CartItem[]) => void;
}

export default function CartView({
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onAddBookingFromCart,
}: CartViewProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Areeba',
    email: 'rapuenzelareeba@gmail.com',
    address: '12, Crescent Lane, New Delhi, India',
    phone: '+91 98765 43210',
  });

  const subtotal = cart.reduce((acc, curr) => acc + (curr.item.price * curr.quantity), 0);
  const serviceTax = Math.round(subtotal * 0.18); // 18% GST/Tax
  const total = subtotal + serviceTax;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);
    
    // Simulate API/process time
    setTimeout(() => {
      onAddBookingFromCart(cart);
      setIsCheckingOut(false);
      setOrderSuccess(true);
      onClearCart();
    }, 1500);
  };

  if (orderSuccess) {
    return (
      <div id="order-success-screen" className="w-full h-full min-h-[600px] bg-neutral-50 flex flex-col items-center justify-center p-6 text-center rounded-3xl shadow-2xl">
        <div id="success-icon-container" className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-5 animate-pulse">
          <CheckCircle2 id="success-circle" className="w-10 h-10" />
        </div>
        <h3 id="success-title" className="text-xl font-extrabold text-neutral-900 mb-2">Order Confirmed!</h3>
        <p id="success-message" className="text-xs text-neutral-500 max-w-xs mx-auto mb-6 leading-relaxed">
          Your reservation request has been registered. An Aura Interiors Architect will contact you shortly to coordinate measurements and delivery!
        </p>
        <div id="success-summary-box" className="bg-white p-4 rounded-2xl border border-neutral-200/60 w-full mb-6 text-left">
          <p id="summary-client" className="text-xs text-neutral-400">Client details:</p>
          <p id="summary-client-name" className="text-xs font-bold text-neutral-800 mt-0.5">{formData.name} • {formData.email}</p>
          <div className="border-t border-neutral-100 my-2" />
          <p id="summary-payment" className="text-xs text-neutral-400">Estimated Total:</p>
          <p id="summary-total-price" className="text-sm font-extrabold text-amber-800 mt-0.5 font-mono">₹{total.toLocaleString()}</p>
        </div>
        <button
          id="success-home-btn"
          onClick={() => setOrderSuccess(false)}
          className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold tracking-wider cursor-pointer"
        >
          Return to Browse
        </button>
      </div>
    );
  }

  return (
    <div id="cart-view-container" className="w-full h-full min-h-[600px] bg-neutral-50 flex flex-col rounded-3xl shadow-2xl overflow-y-auto p-5">
      
      {/* Title Header */}
      <div id="cart-header" className="flex items-center gap-2 mb-6 pt-2">
        <ShoppingCart id="cart-header-icon" className="w-5 h-5 text-amber-800" />
        <h2 id="cart-title" className="text-lg font-extrabold text-neutral-800">Your Design Basket</h2>
      </div>

      {cart.length === 0 ? (
        <div id="empty-cart" className="flex-1 flex flex-col items-center justify-center py-12 text-center">
          <div id="empty-cart-icon-bg" className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-300 mb-4">
            <ShoppingCart id="empty-cart-icon" className="w-6 h-6" />
          </div>
          <p id="empty-cart-msg" className="text-xs text-neutral-500 font-medium">Your design basket is empty.</p>
          <p id="empty-cart-sub" className="text-[10px] text-neutral-400 max-w-[180px] mt-1 leading-normal">
            Add beautiful armchairs or register for space renovation services to get started!
          </p>
        </div>
      ) : (
        <div id="cart-body" className="flex-1 flex flex-col justify-between">
          
          {/* Cart Item Cards list */}
          <div id="cart-items-list" className="space-y-3.5 mb-6">
            {cart.map((item) => (
              <div
                id={`cart-item-${item.id}`}
                key={item.id}
                className="flex gap-3 bg-white p-3 rounded-2xl border border-neutral-100 shadow-sm"
              >
                <img
                  id={`cart-item-img-${item.id}`}
                  src={item.item.image}
                  alt={item.type === 'furniture' ? (item.item as FurnitureItem).name : (item.item as ServiceItem).title}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-xl object-cover bg-neutral-100 shrink-0"
                />
                
                <div id={`cart-item-info-${item.id}`} className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div id={`cart-item-heading-${item.id}`} className="flex justify-between items-start">
                      <h4 id={`cart-item-name-${item.id}`} className="text-xs font-bold text-neutral-800 truncate">
                        {item.type === 'furniture' ? (item.item as FurnitureItem).name : (item.item as ServiceItem).title}
                      </h4>
                      <button
                        id={`cart-item-delete-${item.id}`}
                        onClick={() => onRemoveItem(item.id)}
                        className="text-neutral-300 hover:text-red-500 transition-colors p-0.5 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 id={`trash-icon-${item.id}`} className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p id={`cart-item-sub-${item.id}`} className="text-[9px] text-neutral-400 mt-0.5 font-medium">
                      {item.type === 'furniture' ? 'Accent Piece' : 'Interior Renovation'}
                      {item.selectedColor && ` • ${item.selectedColor.name}`}
                    </p>
                  </div>

                  <div id={`cart-item-footer-${item.id}`} className="flex justify-between items-center mt-1">
                    <span id={`cart-item-price-${item.id}`} className="text-xs font-extrabold text-amber-800 font-mono">
                      ₹{item.item.price.toLocaleString()}
                    </span>

                    {/* Quantity controls */}
                    <div id={`cart-item-qty-${item.id}`} className="flex items-center gap-2 border border-neutral-200/80 rounded-lg p-0.5 bg-neutral-50">
                      <button
                        id={`cart-item-minus-${item.id}`}
                        onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                        className="p-1 text-neutral-500 hover:text-neutral-800 active:scale-90 transition-transform cursor-pointer"
                      >
                        <Minus id="minus" className="w-2.5 h-2.5" />
                      </button>
                      <span id={`cart-item-qty-val-${item.id}`} className="text-[10px] font-bold text-neutral-700 min-w-[12px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        id={`cart-item-plus-${item.id}`}
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        className="p-1 text-neutral-500 hover:text-neutral-800 active:scale-90 transition-transform cursor-pointer"
                      >
                        <Plus id="plus" className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout billing summary */}
          <div id="cart-checkout-section" className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm">
            <h4 id="checkout-summary-title" className="text-[10px] font-bold text-neutral-800 uppercase tracking-widest mb-3">
              Order Breakdown
            </h4>
            <div id="checkout-rows" className="space-y-2 text-xs text-neutral-500">
              <div id="row-subtotal" className="flex justify-between">
                <span>Services & Items</span>
                <span className="font-semibold font-mono text-neutral-700">₹{subtotal.toLocaleString()}</span>
              </div>
              <div id="row-tax" className="flex justify-between">
                <span>Design Consultation & GST (18%)</span>
                <span className="font-semibold font-mono text-neutral-700">₹{serviceTax.toLocaleString()}</span>
              </div>
              <div className="border-t border-neutral-100 my-2" />
              <div id="row-total" className="flex justify-between text-sm font-extrabold text-neutral-950">
                <span>Total Estimated Cost</span>
                <span className="text-amber-800 font-mono">₹{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Direct simulated address form inside checkout */}
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="mt-4 border-t border-neutral-100 pt-4 space-y-2.5">
              <div id="form-field-name">
                <label id="lbl-name" className="block text-[9px] font-bold text-neutral-500 uppercase tracking-wide mb-1">Contact Name</label>
                <input
                  id="in-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 bg-neutral-50 border border-neutral-200/70 rounded-xl text-xs text-neutral-800 focus:outline-none focus:border-amber-700"
                />
              </div>
              <div id="form-field-phone">
                <label id="lbl-phone" className="block text-[9px] font-bold text-neutral-500 uppercase tracking-wide mb-1">Phone Number</label>
                <input
                  id="in-phone"
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2 bg-neutral-50 border border-neutral-200/70 rounded-xl text-xs text-neutral-800 focus:outline-none focus:border-amber-700"
                />
              </div>
              <div id="form-field-address">
                <label id="lbl-address" className="block text-[9px] font-bold text-neutral-500 uppercase tracking-wide mb-1">Site Address</label>
                <input
                  id="in-address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-2 bg-neutral-50 border border-neutral-200/70 rounded-xl text-xs text-neutral-800 focus:outline-none focus:border-amber-700"
                />
              </div>

              {/* Secure note */}
              <div id="form-secure-badge" className="flex items-center gap-1.5 py-1.5 px-2 bg-neutral-50 rounded-lg text-[9px] text-neutral-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                <span>Secured through standard preview token. No keys required.</span>
              </div>

              {/* Submit Checkout button */}
              <button
                id="submit-order-button"
                type="submit"
                disabled={isCheckingOut}
                className="w-full mt-2 py-3 bg-amber-800 hover:bg-amber-700 active:bg-amber-900 text-white rounded-xl text-xs font-semibold tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow hover:shadow-md transition-all"
              >
                {isCheckingOut ? (
                  <span>Reserving Space...</span>
                ) : (
                  <>
                    <span>Book Renovation Services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
}
