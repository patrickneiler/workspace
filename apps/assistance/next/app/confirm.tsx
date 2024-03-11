'use client';
import { useAIState, useUIState, useActions } from "ai/rsc";
import { useState } from "react";
import { useId } from "react";
import { AI } from "./action";
import { ConfigForm } from "./card";
import { BotCard, BotMessage } from "../libs/ai/ui/message";
export const ConfirmConfiguration = ({ params }: { params: any }) => {
    const [value, setValue] = useState(params);
    const [configurationUI, setConfigurationUI] = useState<null | React.ReactNode>(
        null,
    );
    const [history, setHistory] = useAIState<typeof AI>();
    const [, setMessages] = useUIState<typeof AI>();
    const { confirmConfiguration } = useActions();

    // Unique identifier for this UI component.
    const id = useId();
    function onFormChange(params: any) {
        console.log(params, value)
        const newValue = params;
        newValue !== value && setValue(newValue);

        // Insert a hidden history info to the list.
        const info = {
            role: 'system' as const,
            content: `[User has changed to ${JSON.stringify(newValue)}]`,

            // Identifier of this UI component, so we don't insert it many times.
            id,
        };

        // If last history state is already this info, update it. This is to avoid
        // adding every slider change to the history.
        if (history[history.length - 1]?.id === id) {
            setHistory([...history.slice(0, -1), info]);
            return;
        }

        // If it doesn't exist, append it to history.
        setHistory([...history, info]);
    }
    return (
        <>
            {
                configurationUI ? (
                    <div className="mt-4 text-zinc-200">{configurationUI}</div>
                ) : (
                    <>
                        <BotCard showAvatar={false}>
                            <BotMessage>
                                Sure!{' '}
                                {`Review the configuration for ${params.name} and confirm if it's correct.`}
                            </BotMessage>
                            <ConfigForm params={value} update={(params) => params !== value && onFormChange} />
                            <button
                                className="mt-6 w-full rounded-lg bg-green-500 dark:bg-green-500 px-4 py-2 text-zinc-900"
                                onClick={async () => {
                                    const response = await confirmConfiguration(value);
                                    setConfigurationUI(response.configurationUI);

                                    // Insert a new system message to the UI.
                                    setMessages((currentMessages: any) => [
                                        ...currentMessages,
                                        response.newMessage,
                                    ]);
                                }}
                            >
                                Confirm
                            </button>
                        </BotCard>
                    </>
                )
            }
        </>
    );
}