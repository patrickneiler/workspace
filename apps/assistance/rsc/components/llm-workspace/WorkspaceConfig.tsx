'use client';

import { useId, useState } from 'react';
import { useActions, useAIState, useUIState } from 'ai/rsc';
import { formatNumber } from '@/lib/utils';
import { ConfigForm as ScopeConfigForm } from './createScopeConfigForm';
import { ConfigForm as LibraryConfigForm } from './createLibraryConfigForm';
import { ConfigForm as ModuleConfigForm } from './createModuleConfigForm';
import { Diagram } from '@ranthology/workspace/react';

import type { AI } from '../../app/action';
import { Separator } from '../ui/separator';

interface ModuleConfigArgs {
  name: string;
  type: string;
  description: string;
  tags?: string[];
  children?: string[];
  readme?: { [key: string]: string };
  task?: { [key: string]: string };
  options?: { [key: string]: string };
  state?: {
    properties: {
      [key: string]: {
        type: string;
        description: string;
      };
    };
  };
  generator: string;
  props?: string;
  importPath?: string;
}

interface ModuleConfigFormProps {
  args: ModuleConfigArgs;
  fn: string;
}

export interface LibraryConfig {
  framework?: string;
  name?: string;
  importPath?: string;
  generator?: string;
  exports?: any[];
}

interface LibraryConfigFormProps {
  args: LibraryConfig;
  fn: string;
}

interface CreateScopeConfigArgs {
  name: string;
  importPath?: string;
  generator?: string;
  type?: string;
  features: LibraryConfig[];
  domain: LibraryConfig;
}

interface CreateScopeConfigFormProps {
  args: CreateScopeConfigArgs;
  fn: string;
}

export type WorkspaceConfigProps = CreateScopeConfigFormProps | LibraryConfigFormProps | ModuleConfigFormProps;

export function getFunctionDisplayName(fn: string) {
  switch (fn) {
    case 'createScopeConfig': {
      return 'Scope Configuration';
    }
    case 'createLibraryConfig': {
      return 'Library Configuration';
    }
    case 'createModuleConfig': {
      return 'Module Configuration';
    }
    default: {
      return 'Unknown';
    }
  }

}


export function getFuntionUI(name: string, args: any, onChange: (value: any) => void) {
  switch (name) {
    case 'createScopeConfig': {
      return <ScopeConfigForm args={args} onChange={onChange} />
    }
    case 'createLibraryConfig': {
      return <LibraryConfigForm args={args} onChange={onChange} />
    }
    case 'createModuleConfig': {
      return <ModuleConfigForm args={args} onChange={onChange} />
    }
    default: {
      return null;
    }
  }
}

export function WorkspaceConfig({
  args,
  fn
}: {
  args: WorkspaceConfigProps,
  fn: string
}) {
  const [value, setValue] = useState(args);
  const [configUI, setConfigUI] = useState<null | React.ReactNode>(
    null,
  );
  const [history, setHistory] = useAIState<typeof AI>();
  const [, setMessages] = useUIState<typeof AI>();
  const { confirmConfig } = useActions();

  // Unique identifier for this UI component.
  const id = useId();

  // Whenever the slider changes, we need to update the local value state and the history
  // so LLM also knows what's going on.
  function onFormChange(args: WorkspaceConfigProps) {
    console.log(args);
    setValue(args);

    // Insert a hidden history info to the list.
    const info = {
      role: 'system' as const,
      content: `[User has changed configuration to ${JSON.stringify(args)}]`,

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
    <div className="rounded-xl bg-zinc-950 p-4 text-green-400 border">

      {configUI ? (
        <div className="mt-4 text-zinc-200">{configUI}</div>
      ) : (
        <>
          <div className="relative pb-6">
            <Diagram diagram={{
              ranthology: ['assistance'],
              assistance: ['reactLib', 'nextLib', 'domainLib'],
              reactLib: ['useAssistance', 'AssistanceHost', 'AssistanceChat'],
              nextLib: ['AssistancePage', 'AssistanceApiRoute'],
            }} classDefs={{
              assistance: 'scope',
              reactLib: 'library',
              nextLib: 'library',
              domainLib: 'library',
              useAssistance: 'module',
              AssistanceHost: 'module',
              AssistanceChat: 'module',
              AssistancePage: 'module',
              AssistanceApiRoute: 'module',
            }} />
            <div className="text-lg font-bold mb-2 text-zinc-300">{getFunctionDisplayName(fn)}</div>
            <Separator />
            {getFuntionUI(fn, args, onFormChange)}

          </div>

          <button
            className="mt-6 w-full rounded-lg bg-green-500 dark:bg-green-500 px-4 py-2 text-zinc-900"
            onClick={async () => {
              const response = await confirmConfig(value);
              setConfigUI(response.configUI);

              // Insert a new system message to the UI.
              setMessages((currentMessages: any) => [
                ...currentMessages,
                response.newMessage,
              ]);
            }}
          >
            Confirm
          </button>
        </>
      )}
    </div>
  );
}
