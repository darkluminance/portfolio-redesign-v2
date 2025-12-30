"use client";

import { useState } from "react";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";

interface GalleryImage {
  id: string;
  loaderUrl: string;
  thumbnailUrl: string;
  fullUrl: string;
  alt: string;
}

interface GalleryModalProps {
  images: GalleryImage[];
}

export function GalleryModal({ images }: GalleryModalProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative aspect-2/3 overflow-hidden cursor-zoom-in group"
            onClick={() => {
              setSelectedImage(image);
              setIsImageLoading(true);
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${image.loaderUrl})`,
                filter: "blur(5px)",
              }}
            />
            <Image
              src={image.thumbnailUrl}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105 hover:opacity-90 relative z-10"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full">
            <div
              className="absolute inset-0 bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${selectedImage.loaderUrl})`,
                filter: "blur(5px)",
              }}
            />
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <Spinner className="size-16"/>
              </div>
            )}
            <Image
              src={selectedImage.fullUrl}
              alt={selectedImage.alt}
              fill
              sizes="100vw"
              className="object-contain relative z-10"
              onLoad={() => setIsImageLoading(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

