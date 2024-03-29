/**
 * Represents the properties for a live avatar.
 */
export interface LiveAvatarProps {
  /**
   * The message associated with the live avatar.
   */
  message: string;

  /**
   * The URL of the idle video for the live avatar.
   */
  idleVideo?: string;

  /**
   * The URL of the video for the live avatar.
   */
  videoUrl?: string;

  /**
   * Specifies whether the video should loop or not.
   */
  loop?: boolean;

  /**
   * A callback function that is called when the video is ready to play.
   * @param el - The HTMLVideoElement that represents the video.
   * @param length - The length of the video in seconds.
   */
  onReady?: (el: HTMLVideoElement, length: number) => void;

  /**
   * A callback function that is called when the video ends.
   * @param el - The HTMLVideoElement that represents the video.
   */
  onEnd?: (el: HTMLVideoElement) => void;
}
