import { BotMessage, spinner } from '@ranthology/ui/react';
import { ConfirmWorkspace } from './components/ConfirmWorkspace';

const Spinner = () => {
  return (
    <BotMessage showAvatar={false} className="items-center text-white">
      {spinner}
    </BotMessage>
  );
};

export function renderWorkspace(aiState: any) {
  return async function* (config: any) {
    // Show a spinner on the client while we wait for the response.
    yield <Spinner />;

    aiState.done([
      ...aiState.get(),
      {
        role: 'function',
        name: 'generateWorkspaceParameters',
        content: `${JSON.stringify(config)}`,
      },
    ]);

    return <ConfirmWorkspace config={config} />;
  };
}
