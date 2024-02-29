'use client';
import { useEffect, useRef } from 'react';
import { Message } from '@ranthology/assistance/domain';

const roleToColorMap: Record<Message['role'], string> = {
  system: 'red',
  user: 'black',
  function: 'blue',
  tool: 'purple',
  assistant: 'green',
  data: 'orange',
};

interface AssistanceChatProps {
  messages: Message[];
  status: string;
  input: string;
  submitMessage: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: any;
}

export const AssistanceChat: React.FC<AssistanceChatProps> = ({
  messages,
  status,
  input,
  submitMessage,
  handleInputChange,
  error,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    console.log(messages);
    if (status === 'awaiting_message') {
      inputRef.current?.focus();
    }
  }, [status, messages]);

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {error != null && (
        <div className="relative bg-red-500 text-white px-6 py-4 rounded-md">
          <span className="block sm:inline">
            Error: {(error as any).toString()}
          </span>
        </div>
      )}

      {messages.map((m: Message) => (
        <div
          key={m.id}
          className="whitespace-pre-wrap"
          style={{ color: roleToColorMap[m.role] }}
        >
          <strong>{`${m.role}: `}</strong>
          {m.role !== 'data' && m.content}
          {m.role === 'data' && (
            <>
              {(m.data as any).description}
              <br />
              <pre className={'bg-gray-200'}>
                {JSON.stringify(m.data, null, 2)}
              </pre>
            </>
          )}
          <br />
          <br />
        </div>
      ))}

      {status === 'in_progress' && (
        <div className="h-8 w-full max-w-md p-2 mb-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
      )}

      <form onSubmit={submitMessage}>
        <input
          ref={inputRef}
          disabled={status !== 'awaiting_message'}
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="What is the temperature in the living room?"
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};
