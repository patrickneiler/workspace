'use client';

import { FormEvent, useRef, useState } from 'react';
import Textarea from 'react-textarea-autosize';

// TODO: Utilize this implementation within the library components.
import { useUIState, useActions } from 'ai/rsc';
import { type AI } from '@wrkspce/assistance/ai';

import { ChatScrollAnchor, useEnterSubmit, ChatList, EmptyScreen } from '@wrkspce/assistance/chat';

import {
    Button, IconArrowElbow, IconPlus, Tooltip,
    TooltipContent,
    TooltipTrigger,
    PanelBackground,
    UserMessage
} from '@wrkspce/ui/react';


// TODO - Parameterize this intro message
export const INTRO = `I am Patrick Neiler's Clone, a replica created by Patrick himself. With my brilliant software engineering skills, reliable track record, and exceptional communication abilities, I bring a unique value to the table. Feel free to ask me anything and prepare to be impressed.`

/**
 * Represents the AssistancePage component.
 * This component is responsible for rendering the assistance page, where users can interact with the AI assistant.
 */
export function AssistancePage(): JSX.Element {
    const [messages, setMessages] = useUIState<typeof AI>();
    const { submitUserMessage } = useActions();
    const [inputValue, setInputValue] = useState('');
    const { formRef, onKeyDown } = useEnterSubmit();
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Handle form submission
    const handleForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Blur focus on mobile
        if (window.innerWidth < 600) {
            (e.target as HTMLFormElement)['message']?.blur();
        }

        // Get input value
        const value = inputValue.trim();
        // Clear input value
        setInputValue('');
        if (!value) return;

        // Add user message UI
        setMessages((currentMessages: any) => [
            ...currentMessages,
            {
                id: Date.now(),
                display: <UserMessage>{value}</UserMessage>,
            },
        ]);

        try {
            // Submit and get response message
            const responseMessage = await submitUserMessage(value);
            setMessages((currentMessages: any) => [
                ...currentMessages,
                responseMessage,
            ]);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <PanelBackground />
            {messages.length ? (
                <div className="pb-[200px] pt-4 md:pt-24 z-10 relative">
                    <ChatList messages={messages} />
                </div>
            ) : (
                <div className="pb-[200px] pt-4 md:pt-8 z-10 relative">
                    <EmptyScreen
                        introMessage={INTRO}
                    />
                </div>
            )}
            <ChatScrollAnchor trackVisibility={true} />
            <div className="fixed inset-x-0 bottom-0 w-full z-20 bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
                <div className="mx-auto sm:max-w-2xl sm:px-4">
                    <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
                        <form
                            ref={formRef}
                            onSubmit={handleForm}
                        >
                            <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="absolute left-0 top-4 h-8 w-8 rounded-full bg-background p-0 sm:left-4"
                                            onClick={e => {
                                                e.preventDefault();
                                                window.location.reload();
                                            }}
                                        >
                                            <IconPlus />
                                            <span className="sr-only">New Chat</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>New Chat</TooltipContent>
                                </Tooltip>
                                <Textarea
                                    ref={inputRef}
                                    tabIndex={0}
                                    onKeyDown={onKeyDown}
                                    placeholder="Send a message."
                                    className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
                                    autoFocus
                                    spellCheck={false}
                                    autoComplete="off"
                                    autoCorrect="off"
                                    name="message"
                                    rows={1}
                                    value={inputValue}
                                    onChange={e => setInputValue(e.target.value)}
                                />
                                <div className="absolute right-0 top-4 sm:right-4">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                type="submit"
                                                size="icon"
                                                disabled={inputValue === ''}
                                            >
                                                <IconArrowElbow />
                                                <span className="sr-only">Send message</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Send message</TooltipContent>
                                    </Tooltip>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AssistancePage;