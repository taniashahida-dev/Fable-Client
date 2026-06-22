"use client";

import React, { useState } from 'react';

export default function BookCover({ src, alt }) {
  const [isBroken, setIsBroken] = useState(false);

  if (!src || isBroken) {
    return (
      <div className="w-full h-full bg-[#1A4B58]/10 flex items-center justify-center font-serif font-bold text-[#1A4B58] p-4 text-center text-xs">
        {alt}
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      onError={() => setIsBroken(true)}
    />
  );
}