'use server';
import { AI } from '../provider';
import { getMutableAIState, createStreamableUI } from 'ai/rsc';
import { runAsyncFnWithoutBlocking, sleep } from '@ranthology/util';

import { requestVideo, getVideo } from './server';
import { RequestLiveAvatarProps } from './domain';

import { LiveAvatar } from '@ranthology/dynamic-avatar';

// TODO: Parameterize this configuration
const liveAvatarConfig: RequestLiveAvatarProps = {
  apiKey: process.env.DID_API || '',
  persona: {
    name: "Patrick Neiler",
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/make-with-it-firebase.appspot.com/o/clone_model.JPG?alt=media&token=6224dbf7-f907-4afc-83a8-03275daf194e',
    idleVideo: `https://firebasestorage.googleapis.com/v0/b/make-with-it-firebase.appspot.com/o/Clone_Idle.mp4?alt=media&token=3623ed12-a726-497d-8840-012dcacdbc52`,
  },
};

/**
 * Generates a live avatar video based on the provided message.
 * @param message - The message to generate the live avatar video for.
 * @returns An object containing the live avatar UI.
 */
export async function generateLiveAvatar(message: string) {

  // Get the mutable AI state.
  const aiState = getMutableAIState<typeof AI>();

  // Create a streamable UI for the live avatar.
  const liveAvatarUI = createStreamableUI(
    <LiveAvatar
      message={'Thinking...'}
      idleVideo={liveAvatarConfig.persona.idleVideo}
    />,
  );

  runAsyncFnWithoutBlocking(async () => {
    // Request live avatar video
    let video = await requestVideo({
      ...liveAvatarConfig,
      script: message,
    });
    // If no ID, show idle video
    if (!video.id) {
      liveAvatarUI.done(
        <LiveAvatar
          message={message}
          idleVideo={liveAvatarConfig.persona.idleVideo}
        />,
      );
    } else {
      // Wait for video to be ready
      try {
        do {
          // Get the video
          video = await getVideo({
            apiKey: liveAvatarConfig.apiKey,
            id: video.id,
          });

          // If the video is ready, update the live avatar UI
          video.result_url &&
            liveAvatarUI.done(
              <LiveAvatar
                message={message}
                idleVideo={liveAvatarConfig.persona.idleVideo}
                videoUrl={video.result_url}
              />,
            );
          // Delay for 1 second
          await sleep(1000);
        } while (!video.result_url);
      } catch (error) {
        // If there is an error, show the idle video
        liveAvatarUI.done(
          <LiveAvatar
            message={message}
            idleVideo={liveAvatarConfig.persona.idleVideo}
          />,
        );
      }
    }
    aiState.done([
      ...aiState.get(),
      {
        role: 'system',
        content: `[Successfully retreived live avatar video: ${JSON.stringify(video)}]`,
      },
    ]);
  });

  return {
    liveAvatarUI: liveAvatarUI.value,
  };
}
