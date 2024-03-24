'use client';
import {
  PauseIcon,
  PlayIcon,
  SpeakerOffIcon,
  SpeakerQuietIcon,
} from '@radix-ui/react-icons';
import { Card, Text, IconButton } from '@radix-ui/themes';
import { useState, useRef } from 'react';
import { LiveAvatarProps } from './domain';

/**
 * Renders a live avatar component with a video and message.
 *
 * @component
 * @example
 * ```tsx
 * <LiveAvatar
 *   message="Hello, world!"
 *   videoUrl="https://example.com/video.mp4"
 *   idleVideo="https://example.com/idle-video.mp4"
 *   onReady={handleVideoReady}
 *   onEnd={handleVideoEnd}
 * />
 * ```
 */
export const LiveAvatar = ({
  message,
  videoUrl,
  idleVideo,
  onReady,
  onEnd,
}: LiveAvatarProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  /**
   * Toggles the play/pause state of the video.
   */
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  /**
   * Toggles the mute/unmute state of the video.
   */
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="flex items-start gap-3 md:items-center">
      <div className="flex flex-col gap-3">
        <div className="h-20 w-20 relative rounded-full overflow-hidden">
          <video
            playsInline
            autoPlay
            loop={true}
            src={idleVideo}
            className={`absolute w-full h-full ${videoUrl ? 'hidden' : ''} ${idleVideo ? '' : 'hidden'}`}
          />
          <video
            ref={videoRef}
            playsInline
            autoPlay
            loop={false}
            src={videoUrl}
            muted={isMuted}
            className={`absolute w-full h-full ${videoUrl ? '' : 'hidden'}`}
            onLoadedMetadata={(e) =>
              onReady && onReady(e.currentTarget, e.currentTarget.duration)
            }
            onEnded={(e) => onEnd && onEnd(e.currentTarget)}
          />
        </div>
        <div className="flex items-center justify-center w-full gap-3">
          <IconButton
            variant="ghost"
            color={`${isPlaying ? 'sky' : 'gray'}`}
            onClick={togglePlay}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </IconButton>
          <IconButton
            variant="ghost"
            color={`${isMuted ? 'sky' : 'gray'}`}
            onClick={toggleMute}
          >
            {isMuted ? <SpeakerOffIcon /> : <SpeakerQuietIcon />}
          </IconButton>
        </div>
      </div>

      <Card variant="classic" className="p-2 ml-2">
        <Text>{message}</Text>
      </Card>
    </div>
  );
};

export function LiveAvatarMessage({ children }: { children: React.ReactNode }) {
  return <Card variant="classic">{children}</Card>;
}

export function LiveAvatarCard({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
