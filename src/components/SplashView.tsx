import { motion } from 'motion/react';

interface SplashViewProps {
  onGetStarted: () => void;
}

export default function SplashView({ onGetStarted }: SplashViewProps) {
  return (
    <div id="splash-view-container" className="relative w-full h-full min-h-[600px] overflow-hidden rounded-3xl shadow-2xl bg-neutral-900 flex flex-col justify-between p-6">
      {/* Background Image with warm overlay */}
      <div 
        id="splash-bg" 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105" 
        style={{ 
          backgroundImage: `url('/assets/images/splash_background_1783979618315.jpg')`,
        }}
      />
      <div id="splash-overlay" className="absolute inset-0 bg-gradient-to-b from-black/30 via-neutral-950/20 to-neutral-950/80 z-0" />

      {/* Top Margin/Spacer */}
      <div id="splash-top-spacing" className="z-10 pt-4 flex justify-between items-center">
        <span id="splash-brand-logo" className="text-white/80 font-mono text-xs tracking-widest uppercase">
          AURA INTERIORS
        </span>
        <div id="splash-badge" className="bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[10px] text-white/90 font-medium tracking-wide">
          2026 Edition
        </div>
      </div>

      {/* Central Content Panel */}
      <div id="splash-bottom-panel" className="z-10 w-full pb-6">
        <motion.div
          id="splash-title-anim"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 id="splash-headline-title" className="text-3xl sm:text-4xl font-extrabold text-white tracking-wider leading-tight text-center uppercase drop-shadow-md">
            Turn Inspiration <br />
            <span className="text-amber-100">Into Reality</span>
          </h1>
          <p id="splash-sub-text" className="text-neutral-300 text-xs text-center mt-3 max-w-xs mx-auto">
            Curate elegant spaces with premium minimalist seating and professional renovation planners.
          </p>
        </motion.div>

        <motion.div
          id="splash-btn-anim"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button
            id="splash-start-button"
            onClick={onGetStarted}
            className="w-full py-4 bg-amber-800 hover:bg-amber-700 active:bg-amber-900 text-white font-medium rounded-2xl tracking-wide shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Get Started
          </button>
        </motion.div>
      </div>
    </div>
  );
}
