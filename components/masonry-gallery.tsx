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
  columnClasses?: string;
  /** Show a mono "NN — caption" label under each frame (Gallery style). */
  withCaptions?: boolean;
}

export function MasonryGallery({
  images,
  columnClasses = "columns-1 md:columns-2 lg:columns-3",
  withCaptions = false,
}: MasonryGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<MasonryImage | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  return (
    <>
      <div className={`${columnClasses} [column-gap:22px]`}>
        {images.map((image, index) => {
          return (
            <div key={image.id} className="mb-[22px] break-inside-avoid">
              <div
                className="group relative cursor-zoom-in overflow-hidden rounded-lg border border-line bg-black/5 dark:bg-white/5"
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
                  className="relative z-10 h-auto w-full transition-transform duration-500 hover:opacity-90 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              {withCaptions && (
                <div className="mt-2 px-0.5 font-label text-[10px] uppercase tracking-[0.1em] text-label">
                  {String(index + 1).padStart(2, "0")}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute right-4 top-4 text-4xl font-bold text-white transition-colors hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <div className="relative h-full max-h-[90vh] w-full max-w-7xl">
            <div
              className="absolute inset-0 bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${selectedImage.loaderUrl})`,
                filter: "blur(5px)",
              }}
            />
            {isImageLoading && (
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <Spinner className="size-16" />
              </div>
            )}
            <Image
              src={selectedImage.fullUrl}
              alt={selectedImage.alt}
              fill
              sizes="100vw"
              className="relative z-10 object-contain"
              onLoad={() => setIsImageLoading(false)}
              unoptimized
            />
          </div>
        </div>
      )}
    </>
  );
}
