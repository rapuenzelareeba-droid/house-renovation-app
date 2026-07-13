import { CalendarRange, Info, Trash2, Clock, CheckCircle } from 'lucide-react';
import { RenovationBooking } from '../types';

interface BookingsViewProps {
  bookings: RenovationBooking[];
  onCancelBooking: (id: string) => void;
  onNavigateToServices: () => void;
}

export default function BookingsView({
  bookings,
  onCancelBooking,
  onNavigateToServices
}: BookingsViewProps) {
  return (
    <div id="bookings-view-container" className="w-full h-full min-h-[600px] bg-neutral-50 flex flex-col rounded-3xl shadow-2xl overflow-y-auto p-5">
      
      {/* Title Header */}
      <div id="bookings-header" className="flex items-center gap-2 mb-2 pt-2">
        <CalendarRange id="bookings-header-icon" className="w-5 h-5 text-amber-800" />
        <h2 id="bookings-title" className="text-lg font-extrabold text-neutral-800">Your Booked Renovations</h2>
      </div>
      <p id="bookings-subtitle" className="text-[11px] text-neutral-500 mb-6 leading-relaxed">
        Track your custom room makeovers, consultant assignments, scheduled timelines, and cost estimations in real-time.
      </p>

      {bookings.length === 0 ? (
        <div id="empty-bookings" className="flex-1 flex flex-col items-center justify-center py-12 text-center">
          <div id="empty-bookings-icon-bg" className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-300 mb-4">
            <CalendarRange id="empty-bookings-icon" className="w-6 h-6" />
          </div>
          <p id="empty-bookings-msg" className="text-xs text-neutral-500 font-medium">No active renovation projects.</p>
          <p id="empty-bookings-sub" className="text-[10px] text-neutral-400 max-w-[200px] mt-1 leading-normal">
            Book our elite designers to craft gorgeous minimalist organic arches or workstations!
          </p>
          <button
            id="empty-bookings-btn"
            onClick={onNavigateToServices}
            className="mt-4 px-4 py-2 bg-amber-800 hover:bg-amber-700 text-white rounded-xl text-[10px] font-bold tracking-wide transition-all cursor-pointer"
          >
            Schedule Renovation
          </button>
        </div>
      ) : (
        <div id="bookings-list" className="space-y-4">
          {bookings.map((b) => (
            <div
              id={`booking-card-${b.id}`}
              key={b.id}
              className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm space-y-3.5"
            >
              {/* Card Header row */}
              <div id={`booking-card-header-${b.id}`} className="flex justify-between items-start">
                <div>
                  <span id={`booking-card-id-${b.id}`} className="text-[9px] font-mono font-medium text-neutral-400 uppercase">Project ID: {b.id.substring(5, 11)}</span>
                  <h3 id={`booking-card-title-${b.id}`} className="text-sm font-extrabold text-neutral-800 leading-tight mt-0.5">{b.serviceTitle}</h3>
                </div>

                {/* Status Badge */}
                <div id={`booking-card-status-${b.id}`} className="flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-100/50 px-2.5 py-0.5 rounded-full text-[9px] font-bold">
                  <Clock id="status-clock-icon" className="w-3 h-3 text-amber-800 animate-spin-slow" />
                  <span>{b.status.toUpperCase()}</span>
                </div>
              </div>

              {/* Booking specifications */}
              <div id={`booking-card-specs-${b.id}`} className="bg-neutral-50 p-3 rounded-xl space-y-1.5 text-[11px] text-neutral-500">
                <p id={`booking-card-client-${b.id}`} className="font-semibold text-neutral-700">Client: <span className="font-normal">{b.clientName} ({b.clientEmail})</span></p>
                <p id={`booking-card-date-${b.id}`} className="font-semibold text-neutral-700">Target Launch: <span className="font-normal font-mono">{b.date}</span></p>
                <p id={`booking-card-notes-${b.id}`} className="font-semibold text-neutral-700">Design Specs: <span className="font-normal text-neutral-600 italic block mt-1 bg-white p-2 rounded-lg border border-neutral-100">{b.notes}</span></p>
              </div>

              {/* Estimated quote and delete buttons row */}
              <div id={`booking-card-footer-${b.id}`} className="flex justify-between items-center pt-2 border-t border-neutral-100">
                <div id={`booking-card-price-group-${b.id}`}>
                  <span id={`booking-card-price-lbl-${b.id}`} className="text-[9px] text-neutral-400 block font-medium">Estimated Price Quote</span>
                  <span id={`booking-card-price-val-${b.id}`} className="text-sm font-extrabold text-amber-800 font-mono">₹{b.estimatedCost.toLocaleString()}</span>
                </div>

                <button
                  id={`booking-card-cancel-${b.id}`}
                  onClick={() => onCancelBooking(b.id)}
                  className="flex items-center gap-1 px-3 py-1.5 border border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200 rounded-xl text-[10px] font-bold tracking-wide transition-all cursor-pointer"
                >
                  <Trash2 id={`trash-icon-${b.id}`} className="w-3.5 h-3.5" />
                  <span>Cancel Request</span>
                </button>
              </div>

            </div>
          ))}

          {/* Consultation disclaimer */}
          <div id="bookings-consultation-disclaimer" className="flex items-start gap-2 bg-neutral-100 border border-neutral-200/40 p-3.5 rounded-2xl text-[9px] text-neutral-500 leading-normal">
            <Info className="w-4.5 h-4.5 text-amber-800 shrink-0 mt-0.5" />
            <span>Consultant assignments and blueprints are drafted within 24 hours of scheduled requests. Our chief designers will call you to conduct physical structural tests and sample layout mappings.</span>
          </div>
        </div>
      )}

    </div>
  );
}
