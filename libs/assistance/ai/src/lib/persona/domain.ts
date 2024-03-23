export interface RequestLiveAvatarProps {
  apiKey: string;
  persona: {
    name: string;
    photoUrl: string;
    idleVideo: string;
  };
  script?: string;
}

export interface GetLiveAvatarProps {
  apiKey: string;
  id: string;
}

export interface LiveAvatarResponse {
  id: string;
  status?: string;
  source_url?: string;
  result_url?: string;
}
