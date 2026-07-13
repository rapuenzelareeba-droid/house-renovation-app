import React, { useState } from 'react';
import { CalendarRange, Info, ArrowRight, CheckCircle2, ChevronRight, UserCheck } from 'lucide-react';
import { ServiceItem, RenovationBooking } from '../types';
import { serviceItems } from '../data';

interface ServicesViewProps {
  onAddBooking: (booking: RenovationBooking) => void;
  onNavigateToBookings: () => void;
}

const DESIGN_THEMES = [
  { id: 'minimalist', name: 'Organic Minimalist', desc: 'Plaster, light wood, boucle' },
  { id: 'midcentury', name: 'Mid-Century Modern', desc: 'Teak wood, leather, rich tones' },
  { id: 'japandi', name: 'Japandi Harmony', desc: 'Bamboo, muted grays, low furniture' },
  { id: 'industrial', name: 'Brutalist Loft', desc: 'Exposed brick, concrete, black iron' }
];

const CONSULTANTS = [
  { name: 'Siddharth Roy', role: 'Principal Architect' },
  { name: 'Meera Nair', role: 'Lighting Designer' },
  { name: 'Elena Rostova', role: 'Furniture Stylist' }
];

export default function ServicesView({
  onAddBooking,
  onNavigateToBookings
}: ServicesViewProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [theme, setTheme] = useState('minimalist');
  const [consultant, setConsultant] = useState(0);
  const [areaSize, setAreaSize] = useState<number>(250); // square feet
  const [date, setDate] = useState('2026-08-15');
  const [notes, setNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Client Details
  const [name, setName] = useState('Areeba');
  const [email, setEmail] = useState('rapuenzelareeba@gmail.com');

  // Dynamic Quote Calculation
  const baseCost = selectedService ? selectedService.price : 0;
  const areaMultiplier = selectedService 
    ? (selectedService.id === 'srv-1' ? 450 : selectedService.id === 'srv-2' ? 600 : 350)
    : 0;
  const areaCost = areaSize * areaMultiplier;
  const gstCost = Math.round((baseCost + areaCost) * 0.18);
  const totalCost = baseCost + areaCost + gstCost;

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    const newBooking: RenovationBooking = {
      id: `book-${Date.now()}`,
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      clientName: name,
      clientEmail: email,
      date,
      notes: `Theme: ${DESIGN_THEMES.find(t => t.id === theme)?.name}. Consultant: ${CONSULTANTS[consultant].name}. Area Size: ${areaSize} sqft. ${notes}`,
      estimatedCost: totalCost,
      status: 'pending'
    };

    onAddBooking(newBooking);
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedService(null);
      onNavigateToBookings();
    }, 2000);
  };

  if (bookingSuccess) {
    return (
      <div id="booking-success-container" className="w-full h-full min-h-[600px] bg-neutral-50 flex flex-col items-center justify-center p-6 text-center rounded-3xl shadow-2xl">
        <div id="success-icon-bg" className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 mb-5 animate-bounce">
          <CheckCircle2 id="check-icon" className="w-10 h-10" />
        </div>
        <h3 id="booking-success-title" className="text-xl font-extrabold text-neutral-900 mb-2">Renovation Booked!</h3>
        <p id="booking-success-msg" className="text-xs text-neutral-500 max-w-xs mx-auto mb-6 leading-relaxed">
          Your project consultation with <strong>{CONSULTANTS[consultant].name}</strong> has been successfully booked for <strong>{date}</strong>!
        </p>
        <div id="booking-success-details" className="bg-white p-4 border border-amber-200 rounded-2xl w-full text-left space-y-1.5">
          <p id="details-header" className="text-[10px] font-bold text-amber-800 uppercase tracking-widest">Consultation Quote</p>
          <p id="details-title" className="text-sm font-bold text-neutral-800">{selectedService?.title}</p>
          <p id="details-sqft" className="text-xs text-neutral-500">Site Area: {areaSize} Sq. Ft.</p>
          <p id="details-cost" className="text-xs font-bold text-neutral-900 font-mono">Total Estimate: ₹{totalCost.toLocaleString()}</p>
        </div>
        <p id="redirecting-text" className="text-[10px] text-neutral-400 mt-6 italic">Redirecting to project tracker...</p>
      </div>
    );
  }

  return (
    <div id="services-view-container" className="w-full h-full min-h-[600px] bg-neutral-50 flex flex-col rounded-3xl shadow-2xl overflow-y-auto p-5">
      
      {/* Back to Browse if service selected */}
      {selectedService ? (
        <div id="selected-service-panel">
          <div id="selected-service-header" className="flex items-center gap-2.5 mb-5 pt-2">
            <button
              id="selected-service-back"
              onClick={() => setSelectedService(null)}
              className="text-xs font-bold text-amber-800 hover:text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200/50 cursor-pointer"
            >
              ← Services
            </button>
            <h2 id="selected-service-title" className="text-sm font-extrabold text-neutral-800">Customize Renovation</h2>
          </div>

          <div id="selected-service-summary" className="bg-white p-3.5 rounded-2xl border border-neutral-100 mb-5 flex items-center gap-3">
            <img
              id="selected-service-img"
              src={selectedService.image}
              alt={selectedService.title}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div id="selected-service-text">
              <h4 id="selected-service-name" className="text-xs font-extrabold text-neutral-800">{selectedService.title}</h4>
              <p id="selected-service-desc" className="text-[9px] text-neutral-400 font-medium leading-tight mt-0.5">{selectedService.description}</p>
            </div>
          </div>

          {/* Form Wizard Scheduler */}
          <form id="scheduler-form" onSubmit={handleSubmitBooking} className="space-y-4">
            
            {/* Step 1: Design theme selection */}
            <div id="wizard-step-1">
              <label id="lbl-theme" className="block text-[10px] font-bold text-neutral-800 uppercase tracking-widest mb-2.5">1. Aesthetics & Style Theme</label>
              <div id="theme-grid" className="grid grid-cols-2 gap-2.5">
                {DESIGN_THEMES.map((t) => {
                  const isActive = theme === t.id;
                  return (
                    <button
                      id={`theme-card-${t.id}`}
                      key={t.id}
                      type="button"
                      onClick={() => setTheme(t.id)}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        isActive 
                          ? 'bg-amber-50 border-amber-800 text-neutral-800 shadow-sm' 
                          : 'bg-white border-neutral-200/50 hover:border-neutral-300'
                      }`}
                    >
                      <h5 id={`theme-title-${t.id}`} className="text-[11px] font-extrabold leading-tight">{t.name}</h5>
                      <p id={`theme-desc-${t.id}`} className="text-[8px] text-neutral-400 font-medium mt-0.5 leading-tight">{t.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Area size custom slider & pricing multiplier */}
            <div id="wizard-step-2">
              <div id="area-header" className="flex justify-between items-center mb-1.5">
                <label id="lbl-area" className="block text-[10px] font-bold text-neutral-800 uppercase tracking-widest">2. Site Floor Area</label>
                <span id="area-val" className="text-xs font-extrabold text-amber-800">{areaSize} Sq. Ft.</span>
              </div>
              <input
                id="area-slider"
                type="range"
                min="100"
                max="2000"
                step="50"
                value={areaSize}
                onChange={(e) => setAreaSize(Number(e.target.value))}
                className="w-full accent-amber-800 h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
              />
              <div id="area-legend" className="flex justify-between text-[8px] text-neutral-400 mt-1 font-medium">
                <span>100 sqft (Tiny nook)</span>
                <span>2,000 sqft (Entire house)</span>
              </div>
            </div>

            {/* Step 3: Consultant Selection */}
            <div id="wizard-step-3">
              <label id="lbl-consultant" className="block text-[10px] font-bold text-neutral-800 uppercase tracking-widest mb-2">3. Primary Architect Consultant</label>
              <div id="consultant-list" className="space-y-2">
                {CONSULTANTS.map((c, idx) => {
                  const isActive = consultant === idx;
                  return (
                    <button
                      id={`consult-btn-${idx}`}
                      key={idx}
                      type="button"
                      onClick={() => setConsultant(idx)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        isActive 
                          ? 'bg-amber-50 border-amber-800 text-amber-900 shadow-sm' 
                          : 'bg-white border-neutral-200/50 hover:border-neutral-300'
                      }`}
                    >
                      <div id={`consult-info-${idx}`} className="flex items-center gap-2">
                        <div id={`consult-dot-${idx}`} className={`w-2 h-2 rounded-full ${isActive ? 'bg-amber-800' : 'bg-neutral-300'}`} />
                        <span id={`consult-name-${idx}`} className="font-bold text-neutral-800">{c.name}</span>
                        <span id={`consult-role-${idx}`} className="text-[10px] text-neutral-400">({c.role})</span>
                      </div>
                      {isActive && <UserCheck id="user-check-icon" className="w-4 h-4 text-amber-800" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Schedule Dates & contact details */}
            <div id="wizard-step-4" className="grid grid-cols-2 gap-3">
              <div id="form-field-date">
                <label id="lbl-date" className="block text-[9px] font-bold text-neutral-500 uppercase tracking-wide mb-1">Target Start Date</label>
                <input
                  id="in-date"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-800 focus:outline-none focus:border-amber-700"
                />
              </div>
              <div id="form-field-client-name">
                <label id="lbl-client-name" className="block text-[9px] font-bold text-neutral-500 uppercase tracking-wide mb-1">Contact Name</label>
                <input
                  id="in-client-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-800 focus:outline-none focus:border-amber-700"
                />
              </div>
            </div>

            {/* Quote details block */}
            <div id="quote-calculator-card" className="bg-neutral-900 text-white p-4 rounded-2xl border border-neutral-800 shadow-md">
              <h4 id="quote-title" className="text-[9px] font-bold text-amber-300 uppercase tracking-widest mb-3">Live Quotation Costing</h4>
              <div id="quote-rows" className="space-y-1.5 text-xs font-medium text-neutral-300">
                <div id="quote-base" className="flex justify-between">
                  <span>Base Consultant Fee</span>
                  <span className="font-mono">₹{baseCost.toLocaleString()}</span>
                </div>
                <div id="quote-area" className="flex justify-between">
                  <span>Site Materials & Design Work</span>
                  <span className="font-mono">₹{areaCost.toLocaleString()}</span>
                </div>
                <div id="quote-tax" className="flex justify-between text-neutral-400">
                  <span>GST & Municipal Permit (18%)</span>
                  <span className="font-mono">₹{gstCost.toLocaleString()}</span>
                </div>
                <div className="border-t border-neutral-800 my-2" />
                <div id="quote-total" className="flex justify-between text-sm font-extrabold text-amber-300">
                  <span>Estimated Renovation Price</span>
                  <span className="font-mono">₹{totalCost.toLocaleString()}</span>
                </div>
              </div>
              <div id="quote-disclaimer" className="flex gap-1 items-start mt-3 text-[8px] text-neutral-400 leading-normal">
                <Info className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                <span>Quote is based on standard organic plastering. Actual structural elements (e.g. wall demolitions) are billed post visual evaluation.</span>
              </div>
            </div>

            {/* Book Service Action Button */}
            <button
              id="submit-booking-button"
              type="submit"
              className="w-full py-4 bg-amber-800 hover:bg-amber-700 active:bg-amber-900 text-white rounded-2xl text-xs font-bold tracking-wider uppercase shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Book Project Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        </div>
      ) : (
        <div id="services-browser">
          <div id="services-header" className="flex items-center gap-2 mb-2 pt-2">
            <CalendarRange id="services-header-icon" className="w-5 h-5 text-amber-800" />
            <h2 id="services-title" className="text-lg font-extrabold text-neutral-800">Renovation Services</h2>
          </div>
          <p id="services-subtitle" className="text-[11px] text-neutral-500 mb-6 leading-relaxed">
            Partner with our elite design squad to re-imagine your spaces. Select a service to customize your layout scope and view automated live quotes.
          </p>

          <div id="services-catalogue" className="space-y-4">
            {serviceItems.map((srv) => (
              <div
                id={`srv-row-${srv.id}`}
                key={srv.id}
                onClick={() => setSelectedService(srv)}
                className="group bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm hover:border-amber-200 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div id={`srv-row-top-${srv.id}`} className="flex gap-3.5">
                  <img
                    id={`srv-row-img-${srv.id}`}
                    src={srv.image}
                    alt={srv.title}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div id={`srv-row-text-${srv.id}`} className="min-w-0">
                    <span id={`srv-row-cat-${srv.id}`} className="text-[9px] font-bold text-amber-800 uppercase tracking-widest">{srv.category}</span>
                    <h3 id={`srv-row-title-${srv.id}`} className="text-sm font-extrabold text-neutral-800 mt-0.5 truncate">{srv.title}</h3>
                    <p id={`srv-row-desc-${srv.id}`} className="text-[10px] text-neutral-400 line-clamp-2 mt-1 leading-snug">{srv.description}</p>
                  </div>
                </div>

                <div id={`srv-row-footer-${srv.id}`} className="border-t border-neutral-100 mt-4 pt-3 flex justify-between items-center text-xs">
                  <div id={`srv-row-price-group-${srv.id}`}>
                    <span id={`srv-row-price-lbl-${srv.id}`} className="text-[9px] text-neutral-400 block font-medium">Starting Fee</span>
                    <span id={`srv-row-price-val-${srv.id}`} className="font-extrabold text-neutral-900 font-mono">₹{srv.price.toLocaleString()}</span>
                  </div>
                  <div id={`srv-row-duration-group-${srv.id}`} className="text-right">
                    <span id={`srv-row-duration-lbl-${srv.id}`} className="text-[9px] text-neutral-400 block font-medium">Turnaround</span>
                    <span id={`srv-row-duration-val-${srv.id}`} className="font-bold text-neutral-800">{srv.duration}</span>
                  </div>
                  <div id={`srv-row-btn-${srv.id}`} className="px-3 py-1.5 bg-neutral-50 border border-neutral-150 rounded-xl text-[10px] font-bold text-neutral-600 group-hover:bg-amber-800 group-hover:text-white transition-all">
                    Configure
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
