import {
  CLOUDINARY_DIGITAL_ARTS_LIST_URL,
  buildCloudinaryImageUrl,
} from "@/lib/cloudinary";
import { MasonryGallery } from "@/components/masonry-gallery";

interface CloudinaryResource {
  public_id: string;
  version: number;
  format: string;
  width: number;
  height: number;
  type: string;
  created_at: string;
}

interface CloudinaryResponse {
  resources: CloudinaryResource[];
  updated_at: string;
}

export const revalidate = 86400;

const buildCloudinaryURL = (
  resource: CloudinaryResource,
  transformation: string
): string => {
  return buildCloudinaryImageUrl(
    resource.version,
    resource.public_id,
    resource.format,
    transformation
  );
};

async function getDigitalArtsData(): Promise<CloudinaryResource[]> {
  const response = await fetch(CLOUDINARY_DIGITAL_ARTS_LIST_URL, {
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch digital arts data");
  }

  const data: CloudinaryResponse = await response.json();
  return data.resources;
}

export default async function DigitalArtsPage() {
  const digitalArtsData = await getDigitalArtsData();

  const getLoaderURL = (resource: CloudinaryResource) =>
    buildCloudinaryURL(resource, "c_thumb,w_10");

  const getThumbnailURL = (resource: CloudinaryResource) =>
    buildCloudinaryURL(resource, "c_thumb,w_420");

  const getFullURL = (resource: CloudinaryResource) =>
    buildCloudinaryURL(resource, "");

  const images = digitalArtsData.map((resource) => ({
    id: resource.public_id,
    loaderUrl: getLoaderURL(resource),
    thumbnailUrl: getThumbnailURL(resource),
    fullUrl: getFullURL(resource),
    alt: resource.public_id.slice(4),
    width: resource.width,
    height: resource.height,
  }));

  return (
    <div className="md:py-8">
      <h1 className="text-3xl font-bold mb-8">Digital Arts</h1>
      <MasonryGallery images={images} columns={{ sm: 1, md: 2, lg: 2 }} />
    </div>
  );
}

