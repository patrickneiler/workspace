'use client';
import { Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip';
import Textarea from 'react-textarea-autosize';
import { useEnterSubmit } from '@wrkspce/assistance/chat';
import { IconPlus, IconArrowElbow, Button, UserMessage } from '@wrkspce/ui/react';
import React, { FormEvent, useRef, useState } from 'react'
import { useActions, useUIState } from 'ai/rsc';
import { AI } from '../../../domain';

const SubmitUserMessage = () => {
    const [, setMessages] = useUIState<AI>();
    const { submitUserMessage } = useActions();
    const [inputValue, setInputValue] = useState('');
    const { formRef, onKeyDown } = useEnterSubmit();
    const inputRef = useRef<HTMLTextAreaElement>(null);
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
    )


}

export default SubmitUserMessage
