import { z } from 'zod';

/**
 * Represents the parameters for generating a LiveAvatar.
 */
export const generateLiveAvatarParameters = z.object({
  /**
   * The message for the LiveAvatar.
   * @remarks The message should not exceed 50 characters.
   */
  message: z.string()
    .max(50)
    .describe('The message for the LiveAvatar.'),

  /**
   * The URL of the idle video.
   * @remarks This property is optional.
   */
  idleVideo: z.string()
    .optional()
    .describe('The URL of the idle video.'),

  /**
   * The URL of the video.
   * @remarks This property is optional.
   */
  videoUrl: z.string()
    .optional()
    .describe('The URL of the video.'),

  /**
   * Whether the video should loop or not.
   * @remarks This property is optional.
   */
  loop: z.boolean()
    .optional()
    .describe('Whether the video should loop or not.'),
}).describe('The LiveAvatar props object.');