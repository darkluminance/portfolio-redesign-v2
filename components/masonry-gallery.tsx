"use client";

import { useState } from "react";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";

interface MasonryImage {
  id: string;
  loaderUrl: string;
  thumbnailUrl: string;
  fullUrl: string;
  alt: string;
  width: number;
  height: number;
}

interface MasonryGalleryProps {
  images: MasonryImage[];
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
}

export function MasonryGallery({ images, columns = { sm: 1, md: 2, lg: 3 } }: MasonryGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<MasonryImage | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const columnClasses = `columns-${columns.sm ?? 1} md:columns-${columns.md ?? 2} lg:columns-${columns.lg ?? 3}`;

  return (
    <>
      <div className={`${columnClasses} gap-4 space-y-4`}>
        {images.map((image) => {
          const aspectRatio = image.height / image.width;
          return (
            <div
              key={image.id}
              className="relative overflow-hidden cursor-zoom-in group break-inside-avoid mb-4"
              style={{ aspectRatio: `${image.width} / ${image.height}` }}
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
                width={image.width}
                height={image.height}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105 hover:opacity-90 relative z-10"
                loading="lazy"
              />
            </div>
          );
        })}
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
              unoptimized
            />
          </div>
        </div>
      )}
    </>
  );
}

