import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, 
  FolderOpen, 
  Sparkles, 
  Play, 
  Pause, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  RotateCw,
  Eye,
  Layers,
  Sparkle
} from 'lucide-react';
import './PosterGallery.css';

// Dynamically import all images in the posters directory with their file paths
const posterModules = import.meta.glob('../assets/posters/*.{png,jpg,jpeg,svg,webp}', { eager: true, import: 'default' });

// Build a clean dataset with readable titles inferred from filenames
const POSTER_LIST = Object.entries(posterModules).map(([path, url], index) => {
  const filename = path.split('/').pop()?.replace(/\.[^/.]+$/, "") || `Poster ${index + 1}`;
  const title = filename.replace(/[-_]/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  return {
    id: index,
    title,
    url,
    tag: index % 2 === 0 ? 'Concept Art' : 'Visual Design'
  };
});

// Interactive 3D Tilt Card Component
const TiltCard = ({ poster, isActive, onClick, className = "", style = {}, showGlow = true }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rX = ((y - centerY) / centerY) * -12;
    const rY = ((x - centerX) / centerX) * 12;
    
    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`poster-tilt-card relative cursor-pointer select-none rounded-2xl transition-transform duration-200 ease-out ${className}`}
      style={{
        ...style,
        transform: `${style.transform || ''} perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }}
    >
      {/* Outer ambient glow */}
      {showGlow && (
        <div 
          className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-lg transition-opacity duration-500 ${
            isActive ? 'opacity-100' : 'opacity-0 hover:opacity-75'
          }`}
        />
      )}

      {/* Card container with 3:4 aspect ratio */}
      <div className="relative aspect-[3/4] w-full h-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl">
        <img
          src={poster.url}
          alt={poster.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Dynamic Specular Glare overlay */}
        <div 
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.opacity}) 0%, transparent 65%)`
          }}
        />

        {/* Subtle gradient vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        {/* Card meta footer */}
        <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
              {poster.tag}
            </span>
            <h4 className="text-sm md:text-base font-bold text-white mt-1.5 drop-shadow-md">
              {poster.title}
            </h4>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Maximize2 className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

const PosterGallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [selectedPoster, setSelectedPoster] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const total = POSTER_LIST.length;

  // Continuous circular orbit animation loop
  useEffect(() => {
    if (!isOpen || !isRotating || isHovered || total === 0) return;
    
    const interval = setInterval(() => {
      setOrbitAngle(prev => (prev + 0.35) % 360);
    }, 20);

    return () => clearInterval(interval);
  }, [isOpen, isRotating, isHovered, total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPoster) {
        if (e.key === 'Escape') setSelectedPoster(null);
        if (e.key === 'ArrowRight') handleNextSpotlight();
        if (e.key === 'ArrowLeft') handlePrevSpotlight();
      } else if (isOpen) {
        if (e.key === 'Escape') setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPoster, isOpen, activeIdx]);

  const handleNextSpotlight = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrevSpotlight = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + total) % total);
  }, [total]);

  // If no posters are available
  if (total === 0) {
    return (
      <section id="posters" className="py-24 bg-[#050505] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-neutral-500 border border-neutral-800 rounded-2xl p-12 max-w-lg mx-auto border-dashed">
            <Folder className="w-12 h-12 mx-auto mb-4 text-neutral-600 animate-pulse" />
            <p className="text-xl font-medium text-white">Posters Archive Empty</p>
            <p className="mt-2 text-sm text-neutral-400">
              Add your 3:4 posters to <code className="bg-neutral-900 px-2 py-1 rounded text-neutral-300">src/assets/posters/</code> to display them.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const activePoster = POSTER_LIST[activeIdx] || POSTER_LIST[0];

  return (
    <section id="posters" className="py-24 bg-[#050505] relative overflow-hidden select-none border-t border-white/5">
      {/* Background radial ambient lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Visual Artworks & Posters</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Poster <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-white to-neutral-500">Archive</span>
            </h2>
          </div>

          {/* Quick stats & toggle controls */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300">
              {total} ITEMS • 3:4 FORMAT
            </span>
            {isOpen && (
              <button
                onClick={() => setIsOpen(false)}
                className="font-mono text-xs px-4 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-white/15 text-white flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Folder className="w-3.5 h-3.5 text-neutral-400" />
                Close Archive
              </button>
            )}
          </div>
        </div>

        {/* Phase 1: Closed Interactive Folder Presentation */}
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="folder-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <div
                onClick={() => setIsOpen(true)}
                className="group relative cursor-pointer flex flex-col items-center"
              >
                {/* Glowing aura around folder */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Stacked Preview Cards behind Folder */}
                <div className="relative w-84 sm:w-96 md:w-[460px] h-72 md:h-80 flex items-center justify-center">
                  {POSTER_LIST.slice(0, 3).map((poster, i) => {
                    const rotations = [-14, 0, 14];
                    const offsets = [-55, 0, 55];
                    const yOffsets = [-25, -42, -25];
                    return (
                      <motion.div
                        key={poster.id}
                        className="absolute w-36 sm:w-44 md:w-48 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/25 bg-neutral-900"
                        style={{
                          zIndex: i === 1 ? 10 : 5,
                        }}
                        initial={false}
                        animate={{
                          rotate: rotations[i],
                          x: offsets[i],
                          y: yOffsets[i],
                        }}
                        whileHover={{
                          y: yOffsets[i] - 20,
                          scale: 1.08
                        }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      >
                        <img src={poster.url} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/15" />
                      </motion.div>
                    );
                  })}

                  {/* Main Glass Folder Body Front */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="absolute bottom-0 w-full p-6 sm:p-7 rounded-3xl bg-neutral-900/95 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex items-center justify-between z-20"
                  >
                    <div className="flex items-center gap-4 sm:gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/15 flex items-center justify-center text-cyan-400 group-hover:text-white transition-colors">
                        <FolderOpen className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-xl sm:text-2xl flex items-center gap-2">
                          Posters
                        </h3>
                        <p className="text-xs text-neutral-400 font-mono mt-0.5">
                          {total} works • 3:4
                        </p>
                      </div>
                    </div>
                    
                    <div className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-white text-black text-xs sm:text-sm font-semibold group-hover:bg-neutral-200 transition-all duration-300 flex items-center gap-1.5 shadow-lg">
                      <span>OPEN</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                </div>


              </div>
            </motion.div>
          ) : (
            /* Phase 2: Expanded Orbit Arena & Center Showcase */
            <motion.div
              key="orbit-arena"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative min-h-[620px] md:min-h-[720px] w-full flex flex-col items-center justify-center"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Controls bar (Orbit Play/Pause, Manual Rotate, Prev, Next) */}
              <div className="absolute top-0 inset-x-0 flex items-center justify-between z-30 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  <span>PLANETARY ORBIT ACTIVE</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsRotating(!isRotating)}
                    className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-neutral-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                    title={isRotating ? "Pause Orbit" : "Resume Orbit"}
                  >
                    {isRotating ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                    <span>{isRotating ? 'PAUSE' : 'ROTATE'}</span>
                  </button>

                  <button
                    onClick={() => setOrbitAngle(prev => (prev + 45) % 360)}
                    className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-neutral-300 transition-colors cursor-pointer"
                    title="Nudge Orbit Angle"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Orbit Visual Track Rings */}
              <div className="absolute w-[360px] h-[360px] md:w-[600px] md:h-[600px] rounded-full border border-dashed border-white/10 pointer-events-none animate-[spin_120s_linear_infinite]" />
              <div className="absolute w-[240px] h-[240px] md:w-[420px] md:h-[420px] rounded-full border border-white/5 pointer-events-none" />

              {/* Central Spotlight Showcase */}
              <div className="relative z-20 flex flex-col items-center justify-center my-12">
                <div className="group relative w-48 sm:w-56 md:w-64 aspect-[3/4]">
                  <TiltCard
                    poster={activePoster}
                    isActive={true}
                    onClick={() => setSelectedPoster(activePoster)}
                    showGlow={true}
                    className="shadow-[0_0_50px_rgba(0,0,0,0.9)] ring-2 ring-white/30"
                  />
                  
                  {/* Spotlight label overlay */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-white text-black font-mono text-[10px] font-bold tracking-widest uppercase shadow-lg pointer-events-none flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    Spotlight
                  </div>
                </div>

                {/* Spotlight navigation controls */}
                <div className="flex items-center gap-4 mt-6">
                  <button
                    onClick={handlePrevSpotlight}
                    className="p-2 rounded-full bg-neutral-900/80 hover:bg-white hover:text-black border border-white/10 text-white transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="text-center font-mono text-xs text-neutral-400">
                    <span className="text-white font-bold">{activeIdx + 1}</span> / {total}
                  </div>

                  <button
                    onClick={handleNextSpotlight}
                    className="p-2 rounded-full bg-neutral-900/80 hover:bg-white hover:text-black border border-white/10 text-white transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Circulating Planetary Orbit Cards */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                {POSTER_LIST.map((poster, index) => {
                  // Calculate orbital positioning angle
                  const angleOffset = (360 / total) * index;
                  const currentAngle = (orbitAngle + angleOffset) * (Math.PI / 180);
                  
                  // Elliptical orbit radiuses (responsive)
                  const radiusX = typeof window !== 'undefined' && window.innerWidth < 768 ? 160 : 320;
                  const radiusY = typeof window !== 'undefined' && window.innerWidth < 768 ? 90 : 160;

                  const x = Math.cos(currentAngle) * radiusX;
                  const y = Math.sin(currentAngle) * radiusY;
                  
                  // Scale and opacity depending on front/back depth
                  const depth = (Math.sin(currentAngle) + 1) / 2; // 0 (back) to 1 (front)
                  const scale = 0.55 + depth * 0.45;
                  const opacity = 0.4 + depth * 0.6;
                  const zIndex = Math.round(depth * 15);

                  const isCurrentActive = index === activeIdx;

                  return (
                    <div
                      key={poster.id}
                      className="absolute pointer-events-auto transition-transform duration-75 cursor-pointer group"
                      style={{
                        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                        zIndex: isCurrentActive ? 25 : zIndex,
                        opacity
                      }}
                      onClick={() => {
                        setActiveIdx(index);
                      }}
                      onDoubleClick={() => setSelectedPoster(poster)}
                    >
                      <div className="w-24 sm:w-32 md:w-36 aspect-[3/4]">
                        <TiltCard
                          poster={poster}
                          isActive={isCurrentActive}
                          showGlow={isCurrentActive}
                          className={`transform transition-all duration-300 ${
                            isCurrentActive ? 'ring-2 ring-cyan-400 scale-105' : 'hover:scale-110 hover:opacity-100'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Instructions */}
              <div className="absolute bottom-0 inset-x-0 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-500 border-t border-white/5 gap-2">
                <div>• Click any circulating poster to focus • Click spotlight to inspect</div>
                <div>• Orbit pauses automatically on hover</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fullscreen Modal Lightbox Preview */}
      <AnimatePresence>
        {selectedPoster && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedPoster(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedPoster(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors cursor-pointer z-50"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox main container */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-4xl max-h-[90vh] flex flex-col md:flex-row items-center bg-neutral-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Poster HD preview with 3:4 aspect ratio */}
              <div className="relative w-full md:w-auto h-[60vh] md:h-[80vh] aspect-[3/4] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={selectedPoster.url}
                  alt={selectedPoster.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Poster info sidebar */}
              <div className="p-6 md:p-8 flex flex-col justify-between h-full md:w-80 border-t md:border-t-0 md:border-l border-white/10 bg-neutral-900/90">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2 uppercase">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{selectedPoster.tag}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {selectedPoster.title}
                  </h3>
                  <p className="text-neutral-400 text-xs leading-relaxed font-sans">
                    Custom graphic poster crafted with high precision in 3:4 Instagram format. Features custom typography, curated palette, and distinct visual themes.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 space-y-3 font-mono text-xs">
                  <div className="flex justify-between text-neutral-400">
                    <span>Aspect Ratio</span>
                    <span className="text-white">3:4 Portrait</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Index</span>
                    <span className="text-white">#{selectedPoster.id + 1} of {total}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Source</span>
                    <span className="text-white">Local Asset</span>
                  </div>
                  
                  <div className="pt-4 flex gap-2">
                    <button
                      onClick={() => {
                        const prevIdx = (selectedPoster.id - 1 + total) % total;
                        setSelectedPoster(POSTER_LIST[prevIdx]);
                      }}
                      className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-center transition-colors cursor-pointer"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => {
                        const nextIdx = (selectedPoster.id + 1) % total;
                        setSelectedPoster(POSTER_LIST[nextIdx]);
                      }}
                      className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-center transition-colors cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PosterGallery;
