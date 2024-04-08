import {
  AssistanceTool, GenerateProjectParameters
} from '@wrkspce/assistance/domain';
import { instructions } from './instructions';
import { parameters } from './parameters';
import { Actions } from './actions';
import { ConfirmProject } from '@wrkspce/assistance/ui/project';

export const actions = {
  ...Actions,
};

export const tool: AssistanceTool<GenerateProjectParameters> = {
  name: 'generate',
  type: 'action',
  instructions,
  parameters,
  ui: {
    done: (params) => <ConfirmProject params={params} />,
  },
};

export const GenerateProject = {
  tool,
  actions
}