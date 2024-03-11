'use client'
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export interface Video {
    id: string;
    status: string;
    source_url?: string;
    result_url?: string;
}

export interface Config {
    url: string;
    key: string | undefined;
}

interface VideoContextValue {
    currentVideo: Video | null;
    nextVideo: Video | null;
    changeVideo: (video: Video) => Promise<void>;
    requestVideo: (script: string) => Promise<void>;
    getVideo: (id: string) => Promise<void>;
    setLoading: (id: boolean) => void;
    isLoading: boolean;
    prepareNextVideo: () => void;
}

const VideoContext = createContext<VideoContextValue | undefined>(undefined);

export const useVideoContext = () => {
    const context = useContext(VideoContext);
    if (!context) {
        throw new Error('useVideoContext must be used within a VideoProvider');
    }
    return context;
};

interface VideoProviderProps {
    children: React.ReactNode;
    config: Config
}

export const VideoProvider: React.FC<VideoProviderProps> = ({ children, config }) => {
    const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
    const [nextVideo, setNextVideo] = useState<Video | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        if (!currentVideo && nextVideo?.result_url) {
            setCurrentVideo(nextVideo);
            setNextVideo(null);
        }
    }, [currentVideo, nextVideo])
    const requestVideo = useCallback(async (script: string) => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    Authorization: `Basic ${config.key}`,
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    script: {
                        type: 'text',
                        subtitles: 'false',
                        provider: { type: 'elevenlabs', voice_id: 'TxGEqnHWrfWFTfGW9XjX' },
                        ssml: 'false',
                        input: script
                    },
                    config: {
                        fluent: 'true',
                        pad_audio: '2.0',
                    },
                    source_url: 'https://firebasestorage.googleapis.com/v0/b/make-with-it-firebase.appspot.com/o/clone_model.JPG?alt=media&token=6224dbf7-f907-4afc-83a8-03275daf194e'
                })
            };
            const response = await fetch(`${config.url}`, options)
                .then(response => (response.json()))
                .then(data => (setCurrentVideo(null), setNextVideo({
                    id: data.id,
                    status: data.id
                })))
                .catch(err => console.error(err));
            return response;
        } catch (error) {
            console.error('An error occurred while uploading video:', error);
        }
    }, []);

    const setLoading = ((id: boolean) => {
        setIsLoading(id);
    })

    const changeVideo = (async (video: Video) => {
        await setCurrentVideo(video);
    })

    const getVideo = useCallback(async (id: string) => {
        try {
            let status = '';
            do {
                await new Promise(resolve => setTimeout(resolve, 2000));
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                        Authorization: `Basic ${config.key}`,
                    },
                };

                const response = await fetch(`${config.url}/${id}`, options)
                    .then(response => (response.json()))
                    .then(data => (
                        status = data.status,
                        (data.result_url && setLoading(false)),
                        setNextVideo(
                            prevVideo => ({
                                ...prevVideo!,
                                status: data.status,
                                source_url: data.source_url,
                                result_url: data.result_url,
                            })
                        )))
                    .catch(err => console.error(err));

                return response;
            } while (status !== 'done');
        } catch (error) {
            console.error('An error occurred while fetching video status:', error);
        }
    }, []);

    const prepareNextVideo = useCallback(() => {
        setNextVideo({
            id: "",
            status: "prepare"
        });
    }, []);

    const contextValue: VideoContextValue = {
        requestVideo,
        getVideo,
        currentVideo,
        nextVideo,
        prepareNextVideo,
        setLoading,
        isLoading,
        changeVideo
    };

    return (
        <VideoContext.Provider value={contextValue}>{children}</VideoContext.Provider>
    );
};

export default VideoProvider;



