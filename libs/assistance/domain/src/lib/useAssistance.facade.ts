import { experimental_useAssistant, Message, UseAssistantHelpers as UseAssistanceHelpers, UseAssistantOptions as UseAssistanceOptions } from 'ai/react';

function useAssistanceFacade(api: string, threadId?: string) {
  const options: UseAssistanceOptions = {
    api,
    threadId,
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
  };

  const {
    messages,
    threadId: currentThreadId,
    input,
    setInput,
    handleInputChange,
    submitMessage,
    status,
    error,
  } = experimental_useAssistant(options);

  return {
    messages,
    currentThreadId,
    input,
    setInput,
    handleInputChange,
    submitMessage,
    status,
    error,
  };
}

export { useAssistanceFacade as useAssistance, Message, UseAssistanceHelpers, UseAssistanceOptions };