import { AI } from '../domain';
import { ChatList, EmptyScreen, ChatScrollAnchor } from '@wrkspce/assistance/chat';
import { PanelBackground } from '@wrkspce/ui/react';
import SubmitUserMessage from './actions/submitUserMessage/client';
import { useUIState } from 'ai/rsc';
export const INTRO = `I am Patrick Neiler's Clone, a replica created by Patrick himself. With my brilliant software engineering skills, reliable track record, and exceptional communication abilities, I bring a unique value to the table. Feel free to ask me anything and prepare to be impressed.`


export function AssistanceFeatureInteraction() {
  const [messages] = useUIState<AI>();

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
            <SubmitUserMessage />
          </div>
        </div>
      </div>

    </div>
  );
}

export default AssistanceFeatureInteraction;
