'use server';
import { GetLiveAvatarProps, LiveAvatarResponse, RequestLiveAvatarProps } from './domain';

export const requestVideo = async ({
  apiKey,
  persona,
  script,
}: RequestLiveAvatarProps): Promise<LiveAvatarResponse> => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: `Basic ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      script: {
        type: 'text',
        subtitles: 'false',
        provider: { type: 'elevenlabs', voice_id: 'TxGEqnHWrfWFTfGW9XjX' },
        ssml: 'false',
        input: script,
      },
      config: {
        fluent: 'true',
        pad_audio: '2.0',
      },
      source_url: persona.photoUrl,
    }),
  };
  console.log(options);
  const response = await fetch(`https://api.d-id.com/talks`, options)
    .then((response) => response.json())
    .then((data) => (console.log(data), data))
    .catch((err) => console.error(err));
  return response;
};

export const getVideo = async ({
  apiKey,
  id,
}: GetLiveAvatarProps): Promise<LiveAvatarResponse> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Basic ${apiKey}`,
    },
  };

  const response = await fetch(`https://api.d-id.com/talks/${id}`, options)
    .then((response) => response.json())
    .then((data) => (console.log(data), data))
    .catch((err) => console.error(err));
  return response;
};
