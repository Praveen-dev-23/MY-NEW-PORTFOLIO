import React from 'react';
import './PosterGallery.css';

// Dynamically import all images in the posters directory
const posterImages = import.meta.glob('../assets/posters/*.{png,jpg,jpeg,svg,webp}', { eager: true, import: 'default' });
const posters = Object.values(posterImages);

const PosterGallery = () => {
  return (
    <section id="posters" className="py-20 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-[#f4f4f5] tracking-tight">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">Posters</span>
        </h2>
        
        {posters.length === 0 ? (
          <div className="text-gray-500 border border-gray-800 rounded-2xl p-12 text-center border-dashed">
            <p className="text-xl">No posters yet!</p>
            <p className="mt-2 text-sm">Drop your image files into <code className="bg-gray-900 px-2 py-1 rounded text-gray-300">src/assets/posters/</code> to see them float here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {posters.map((url, index) => (
              <div 
                key={index} 
                className="poster-card relative group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                
                {/* Poster Container */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-gray-800/50 shadow-2xl transition-transform duration-500 ease-out group-hover:scale-[1.03] bg-gray-900 flex items-center justify-center">
                  <img 
                    src={url} 
                    alt={`Poster ${index + 1}`} 
                    className="w-full h-full object-cover transition-opacity duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PosterGallery;
