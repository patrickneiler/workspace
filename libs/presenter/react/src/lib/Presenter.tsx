'use client'
import * as React from 'react'
import { useVideoContext } from './video-provider';
import VideoPlayer from './video-player';

interface PresenterProps {
  isLocked: boolean;
  script?: string;
  children: React.ReactNode;
}

export function Presenter({
  isLocked,
  script,
  children
}: PresenterProps) {
  const { nextVideo, getVideo, requestVideo } = useVideoContext();
  const [offline, setOffline] = React.useState(false);
  if (isLocked !== offline) setOffline(isLocked);

  React.useEffect(() => {
    if (script) {
      console.log(script);
      requestVideo(script);
    }
  }, [script, requestVideo]);

  React.useEffect(() => {
    const handleFetch = async (id: string, delay?: boolean) => {
      if (delay) await new Promise((resolve) => setTimeout(resolve, 3000));
      await getVideo(id);
      return;
    }
    if (nextVideo) {
      if (!nextVideo.result_url) {
        handleFetch(nextVideo.id, true);
      }
    }
  }, [nextVideo, getVideo]);

  return (
    <div className='flex justify-between w-full max-w-2xl'>
      <div className="relative">
        <VideoPlayer />
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}
