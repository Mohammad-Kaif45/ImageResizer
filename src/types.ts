export interface SocialMediaDimensions {
  name: string;
  width: number;
  height: number;
  icon: string;
}

export const socialMediaSizes: SocialMediaDimensions[] = [
  { name: 'Instagram Post', width: 1080, height: 1080, icon: 'instagram' },
  { name: 'Instagram Story', width: 1080, height: 1920, icon: 'instagram' },
  { name: 'Twitter Post', width: 1200, height: 675, icon: 'twitter' },
  { name: 'Facebook Post', width: 1200, height: 630, icon: 'facebook' },
  { name: 'LinkedIn Post', width: 1200, height: 627, icon: 'linkedin' },
  { name: 'YouTube Thumbnail', width: 1280, height: 720, icon: 'youtube' },
];