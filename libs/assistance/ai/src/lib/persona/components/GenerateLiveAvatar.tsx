'use client';
import { useActions } from 'ai/rsc';
import { useEffect, useState } from 'react';
import { LiveAvatarCard } from '@ranthology/dynamic-avatar';

/**
 * Renders a live avatar based on the provided message.
 *
 * @param message - The message used to generate the live avatar.
 * @returns The generated live avatar component.
 */
export const GenerateLiveAvatar = ({ message }: { message: string }) => {
  const [liveAvatarUI, setLiveAvatarUI] = useState<null | React.ReactNode>(
    null,
  );
  // Get the `generateLiveAvatar` action.
  const { generateLiveAvatar } = useActions();

  useEffect(() => {
    // Generate the live avatar UI if it doesn't exist.
    if (!liveAvatarUI) {
      const generate = async () => {
        // Call the `generateLiveAvatar` action with the provided message.
        const response = await generateLiveAvatar(message);
        // Set the live avatar UI.
        setLiveAvatarUI(response.liveAvatarUI);
      };
      generate();
    }
  });

  return <LiveAvatarCard>{liveAvatarUI && liveAvatarUI}</LiveAvatarCard>;
};

export default GenerateLiveAvatar;
