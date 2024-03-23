import { runAsyncFnWithoutBlocking } from '@ranthology/util';
import { getMutableAIState, createStreamableUI } from 'ai/rsc/dist';
import { sleep } from 'openai/core';
import { LiveAvatar } from '@ranthology/dynamic-avatar';
import { AI } from '../provider';
import { requestVideo, getVideo } from './server';
import { RequestLiveAvatarProps } from './domain';

const liveAvatarConfig: RequestLiveAvatarProps = {
  apiKey: process.env.DID_API || '',
  persona: {
    name: "Patrick's Clone",
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/make-with-it-firebase.appspot.com/o/clone_model.JPG?alt=media&token=6224dbf7-f907-4afc-83a8-03275daf194e',
    idleVideo: `https://firebasestorage.googleapis.com/v0/b/make-with-it-firebase.appspot.com/o/Clone_Idle.mp4?alt=media&token=3623ed12-a726-497d-8840-012dcacdbc52`,
  },
};

export async function generateLiveAvatar(message: string) {
  'use server';

  const aiState = getMutableAIState<typeof AI>();

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
          video = await getVideo({
            apiKey: liveAvatarConfig.apiKey,
            id: video.id,
          });
          video.result_url &&
            liveAvatarUI.done(
              <LiveAvatar
                message={message}
                idleVideo={liveAvatarConfig.persona.idleVideo}
                videoUrl={video.result_url}
              />,
            );
          await sleep(1000);
        } while (!video.result_url);
      } catch (error) {
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
