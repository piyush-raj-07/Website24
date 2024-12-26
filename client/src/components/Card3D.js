import React from 'react';

export default function Card3D({ cardTitle, coverImage }) {
    return (
      <div className="group perspective-1000 transform transition-transform duration-400 hover:rotate-y-30">
        <div className="relative min-h-[280px] w-[320px] bg-white border border-black transform group-hover:rotate-y-30">
          {/* Cover Image */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 to-transparent z-10">
            <img
              src={coverImage}
              alt={cardTitle}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
  
          {/* Title Layer */}
          <div className="relative flex flex-col justify-end p-2 z-20 bg-gradient-to-t from-black/30 via-black/10 to-transparent">
            <h2 className="text-lg text-white">{cardTitle}</h2>
          </div>
        </div>
      </div>
    );
  }