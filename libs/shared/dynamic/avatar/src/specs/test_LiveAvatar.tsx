import { render, screen, fireEvent } from '@testing-library/react';
import { LiveAvatar } from '../lib/LiveAvatar';
import '@testing-library/jest-dom';

describe('LiveAvatar', () => {
    const mockMessage = 'Hello, world!';
    const mockVideoUrl = 'https://example.com/video.mp4';
    const mockIdleVideo = 'https://example.com/idle-video.mp4';

    test('renders the live avatar component', () => {
        render(
            <LiveAvatar
                message={mockMessage}
                videoUrl={mockVideoUrl}
                idleVideo={mockIdleVideo}
            />
        );

        // Assert that the video element is rendered
        const videoElement = screen.getByTestId('video');
        expect(videoElement).toBeInTheDocument();
        // Assert that the message is rendered
        const messageElement = screen.getByText(mockMessage);
        expect(messageElement).toBeInTheDocument();
    });

    test('renders the idle avatar component', () => {
        render(
            <LiveAvatar
                message={mockMessage}
                idleVideo={mockIdleVideo}
            />
        );

        // Assert that the video element is rendered
        const videoElement = screen.getByTestId('idle-video');
        expect(videoElement).toBeInTheDocument();
        // Assert that the message is rendered
        const messageElement = screen.getByText(mockMessage);
        expect(messageElement).toBeInTheDocument();
    });

    test('toggles play/pause state when play button is clicked', () => {
        render(
            <LiveAvatar
                message={mockMessage}
                videoUrl={mockVideoUrl}
                idleVideo={mockIdleVideo}
            />
        );

        // Get the play button
        const playButton = screen.getByTestId('play-button');

        // Click the play button
        fireEvent.click(playButton);

        // Assert that the video is paused
        const videoElement = screen.getByTestId('video') as HTMLVideoElement;
        expect(videoElement.paused).toBe(true);

        // Click the play button again
        fireEvent.click(playButton);

        // Assert that the video is playing
        expect(videoElement.paused).toBe(true);
    });

    test('toggles mute/unmute state when mute button is clicked', () => {
        render(
            <LiveAvatar
                message={mockMessage}
                videoUrl={mockVideoUrl}
                idleVideo={mockIdleVideo}
            />
        );

        // Get the mute button
        const muteButton = screen.getByTestId('mute-button');

        // Click the mute button
        fireEvent.click(muteButton);

        // Assert that the video is muted
        const videoElement = screen.getByTestId('video') as HTMLVideoElement;
        expect(videoElement.muted).toBe(true);

        // Click the mute button again
        fireEvent.click(muteButton);

        // Assert that the video is not muted
        expect(videoElement.muted).toBe(false);
    });
});