'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface CarGalleryProps {
  mainImage: string;
  images?: string[];
  title: string;
}

export default function CarGallery({ mainImage, images, title }: CarGalleryProps) {
  const allImages = Array.from(new Set([mainImage, ...(images || [])]));
  const [activeImage, setActiveImage] = useState(mainImage);

  return (
    <div className="space-y-3">
      <div className="relative h-72 md:h-96 w-full rounded-xl overflow-hidden">
        <Image src={activeImage} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allImages.map((url, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(url)}
              className={`relative h-16 w-24 shrink-0 rounded-md overflow-hidden border-2 transition-colors ${
                activeImage === url ? 'border-[#f59e0b]' : 'border-transparent'
              }`}
            >
              <Image src={url} alt={`${title} ${idx + 1}`} fill className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
