if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
  throw new Error(
    "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME environment variable is not set"
  );
}

export const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}`;

export const CLOUDINARY_GALLERY_LIST_URL = `${CLOUDINARY_BASE_URL}/image/list/gallery-xl.json`;

export const CLOUDINARY_DIGITAL_ARTS_LIST_URL = `${CLOUDINARY_BASE_URL}/image/list/arts.json`;

export function buildCloudinaryImageUrl(
  version: number,
  publicId: string,
  format: string,
  transformation: string = ""
): string {
  const transformPath = transformation ? `${transformation}/` : "";
  return `${CLOUDINARY_BASE_URL}/image/upload/${transformPath}v${version}/${publicId}.${format}`;
}

