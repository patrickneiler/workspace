'use client';
import { useUIState, useActions } from "ai/rsc";
import { useEffect, useState } from "react";
import { useId } from "react";
import { AI } from "./action";
import { ConfigForm } from "./card";
import { BotCard, BotMessage } from "../libs/ai/ui/message";
export const ConfirmConfiguration = ({ content }: { content: string }) => {
    const [configurationUI, setConfigurationUI] = useState<null | React.ReactNode>(
        null,
    );
    const [, setMessages] = useUIState<typeof AI>();
    const { createAssistantMessage } = useActions();

    // Unique identifier for this UI component.
    const id = useId();

    useEffect(() => {
        if (content) {
            (async () => {
                const response = await createAssistantMessage(content);
                // Insert a new system message to the UI.
                setMessages((currentMessages: any) => [
                    ...currentMessages,
                    response.newMessage,
                ]);
            })();
        }

    }, [content]);

    return (
        <BotMessage className="items-center text-white">{content}</BotMessage>
    );
}