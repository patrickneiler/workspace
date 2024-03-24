
/**
 * Represents the properties required to request a live avatar.
 */
export interface RequestLiveAvatarProps {
  /**
   * The API key for authentication.
   */
  apiKey: string;
  /**
   * The persona details for the live avatar.
   */
  persona: {
    /**
     * The name of the persona.
     */
    name: string;
    /**
     * The URL of the photo for the persona.
     */
    photoUrl: string;
    /**
     * The URL of the idle video for the persona.
     */
    idleVideo: string;
  };
  /**
   * An optional script for the live avatar.
   */
  script?: string;
}

/**
 * Represents the properties required to get a live avatar.
 */
export interface GetLiveAvatarProps {
  /**
   * The API key for authentication.
   */
  apiKey: string;
  /**
   * The ID of the live avatar.
   */
  id: string;
}

/**
 * Represents the response from a live avatar request.
 */
export interface LiveAvatarResponse {
  /**
   * The ID of the live avatar.
   */
  id: string;
  /**
   * The status of the live avatar.
   */
  status?: string;
  /**
   * The source URL of the live avatar.
   */
  source_url?: string;
  /**
   * The result URL of the live avatar.
   */
  result_url?: string;
}
