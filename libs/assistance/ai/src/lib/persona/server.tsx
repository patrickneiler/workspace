import { GetLiveAvatarProps, LiveAvatarResponse, RequestLiveAvatarProps } from "./domain";

/**
 * Requests a video with a live avatar.
 * @param apiKey - The API key for authentication.
 * @param persona - The persona object containing the photo URL.
 * @param script - The script for the video.
 * @returns A Promise that resolves to a LiveAvatarResponse object.
 */
export const requestVideo = async ({
  apiKey,
  persona,
  script,
}: RequestLiveAvatarProps): Promise<LiveAvatarResponse> => {

  // Define the options for the request.
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

  // Fetch the video from the API.
  const response = await fetch(`https://api.d-id.com/talks`, options)
    .then((response) => response.json())
    .then((data) => (console.log(data), data))
    .catch((err) => console.error(err));
  return response;
};

/**
 * Retrieves a video with a live avatar.
 * @param apiKey - The API key for authentication.
 * @param id - The ID of the video to retrieve.
 * @returns A Promise that resolves to a LiveAvatarResponse object.
 */
export const getVideo = async ({
  apiKey,
  id,
}: GetLiveAvatarProps): Promise<LiveAvatarResponse> => {

  // Define the options for the request.
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Basic ${apiKey}`,
    },
  };

  // Fetch the video from the API.
  const response = await fetch(`https://api.d-id.com/talks/${id}`, options)
    .then((response) => response.json())
    .then((data) => (console.log(data), data))
    .catch((err) => console.error(err));
  return response;
};
