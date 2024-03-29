'use client';
import { useActions } from 'ai/rsc';
import { useEffect, useState } from 'react';
import { LiveAvatarCard } from '@wrkspce/shared/feature/avatar';

/**
 * Renders a live avatar based on the provided message.
 *
 * @param message - The message used to generate the live avatar.
 * @returns The generated live avatar component.
 */
export const GeneratePersona = ({ message }: { message: string }) => {
  const [ui, setUi] = useState<null | React.ReactNode>(
    null,
  );
  // Get the `generateLiveAvatar` action.
  const { generateLiveAvatar } = useActions();

  useEffect(() => {
    // Generate the live avatar UI if it doesn't exist.
    if (!ui) {
      const generate = async () => {
        // Call the `generateLiveAvatar` action with the provided message.
        const response = await generateLiveAvatar(message);
        // Set the live avatar UI.
        setUi(response.ui);
      };
      generate();
    }
  });

  return <LiveAvatarCard>{ui && ui}</LiveAvatarCard>;
};

export default GeneratePersona;
