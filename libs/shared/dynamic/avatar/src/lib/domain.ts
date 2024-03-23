
export interface LiveAvatarProps {
  message: string;
  idleVideo?: string;
  videoUrl?: string;
  loop?: boolean;
  onReady?: (el: HTMLVideoElement, length: number) => void;
  onEnd?: (el: HTMLVideoElement) => void;
}