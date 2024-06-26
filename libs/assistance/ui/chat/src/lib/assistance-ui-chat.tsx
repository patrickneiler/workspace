'use client';

import { FormEvent, ReactNode, useRef, useState } from 'react';
import Textarea from 'react-textarea-autosize';

// TODO: Utilize this implementation within the library components.
import { useUIState, useActions } from 'ai/rsc';

import {
  IconSend,
  UserMessage,
} from '@wrkspce/shared/ui';
import { ChatScrollAnchor } from './hooks/chat-scroll-anchor';
import { useEnterSubmit } from './hooks/use-enter-submit';
import { Card, Text, Button, Separator, Box, Callout } from '@radix-ui/themes';
import { AI } from '@wrkspce/assistance/domain';
import { InfoCircledIcon } from '@radix-ui/react-icons';

/**
 * Represents the AssistanceChat component.
 * This component is responsible for rendering the assistance chat, where users can interact with the AI assistant.
 */
export function AssistanceChat({ empty }: { empty?: ReactNode }): JSX.Element {
  const [messages, setMessages] = useUIState<AI>();
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
  };

  return (
    <>
      {/* <PanelBackground /> */}
      {messages.length ? (
        <div className="pb-[200px] pt-8 md:pt-24 z-10 relative">
          <div className="relative mx-auto max-w-2xl px-4">
            {messages.map((message: any, index: number) => (
              <div key={index} className="pb-6">
                {message.display}
                {index < messages.length - 1 && (
                  <div className="flex items-center justify-center mt-6">
                    <Separator size="4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        empty ? <Card className="z-10 relative  mt-8 mb-40 max-w-3xl mx-auto w-full">{empty}</Card> : <DefaultEmpty />
      )}
      <ChatScrollAnchor trackVisibility={true} />
      <div className="fixed inset-x-0 bottom-0 w-full z-20 bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
        <div className="mx-auto sm:max-w-3xl sm:px-4 relative bottom-8 md:bottom-8">
          <Box className="space-y-4 md:px-4 py-2 shadow-lg rounded-t-4 md:py-4">
            <form ref={formRef} onSubmit={handleForm}>
              <Card variant='surface' className="relative flex max-h-60 w-full grow items-center overflow-hidden  px-8 sm:px-4">
                <Textarea
                  ref={inputRef}
                  tabIndex={0}
                  onKeyDown={onKeyDown}
                  placeholder="Send a message."
                  className="min-h-[60px] text-4 w-full resize-none bg-transparent px-4 py-4 focus-within:outline-none sm:text-sm"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  name="message"
                  rows={1}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <div className="relative flex shrink-0 ml-4">

                  <Button
                    radius='full'
                    type="submit"
                    className="text-gray-1 max-w-12 px-0 text-lg"
                    disabled={inputValue === ''}
                  >
                    <IconSend />
                    <span className="sr-only">Send message</span>
                  </Button>
                </div>
              </Card>
            </form>
          </Box>
        </div>
      </div>
    </>
  );
}

export const DefaultEmpty = () => (
  <div className="pb-[200px] pt-8 md:pt-24 z-10 relative">
    <div className="relative mx-auto max-w-2xl px-4">

      <Callout.Root variant="surface" size="3">
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          Start a conversation below to get assistance for this topic.
        </Callout.Text>
      </Callout.Root>
    </div>
  </div>
);

export default AssistanceChat;
