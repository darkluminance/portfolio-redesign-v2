import { buildCloudinaryImageUrl } from "./cloudinary";

export interface ProjectImage {
  version: number;
  public_id: string;
  format: string;
  width: number;
  height: number;
}

export interface Project {
  name: string;
  slug: string;
  category: string;
  year: number;
  description: string;
  githubURL: string;
  demoURL: string;
  stacks: string[];
  image: ProjectImage;
}

export function getCloudinaryUrl(image: ProjectImage, width: number = 600): string {
  return buildCloudinaryImageUrl(
    image.version,
    image.public_id,
    image.format,
    `c_thumb,w_${width}`
  );
}

