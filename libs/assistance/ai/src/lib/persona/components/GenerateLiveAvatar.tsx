'use client';
import { useActions } from 'ai/rsc';
import { useEffect, useState } from 'react';
import { LiveAvatarCard } from '@ranthology/dynamic-avatar';

export const GenerateLiveAvatar = ({ message }: { message: string }) => {
  const [liveAvatarUI, setLiveAvatarUI] = useState<null | React.ReactNode>(
    null,
  );
  const { generateLiveAvatar } = useActions();
  useEffect(() => {
    if (!liveAvatarUI) {
      const generate = async () => {
        const response = await generateLiveAvatar(message);
        setLiveAvatarUI(response.liveAvatarUI);
      };
      generate();
    }
  });

  return <LiveAvatarCard>{liveAvatarUI ? liveAvatarUI : <></>}</LiveAvatarCard>;
};

export default GenerateLiveAvatar;
