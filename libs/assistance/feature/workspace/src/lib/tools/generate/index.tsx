import { instructions } from './instructions';
import { parameters } from './parameters';
import { AssistanceTool, WorkspaceParameters } from '@wrkspce/assistance/domain';
import { ConfirmWorkspace } from '@wrkspce/assistance/ui/workspace';

export const generate: AssistanceTool<WorkspaceParameters> = {
  name: 'generate',
  type: 'action',
  instructions,
  parameters,
  ui: {
    done: (config) => <ConfirmWorkspace config={config} />,
  }
};
