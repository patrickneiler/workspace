'use client';
import { useActions } from "ai/rsc";
import { useEffect, useState } from "react";
import { LiveAvatarCard } from "./LiveAvatar";
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


export const GenerateLiveAvatar = ({ message, videoUrl }: { message: string, videoUrl: string }) => {
    const [liveAvatarUI, setLiveAvatarUI] = useState<null | React.ReactNode>(
        null,
    );
    const { generateLiveAvatar } = useActions();
    useEffect(() => {
        if (!liveAvatarUI) {
            const generate = async () => {
                const response = await generateLiveAvatar(message);
                setLiveAvatarUI(response.liveAvatarUI);
            }
            generate();
        }
    });

    return (
        <LiveAvatarCard>
            {
                liveAvatarUI ? (
                    liveAvatarUI
                ) : (<></>)
            }
        </LiveAvatarCard>
    );
}