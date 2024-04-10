import {
  AssistanceTool,
  GenerateMemeParameters,
} from '@wrkspce/assistance/domain';

import { instructions } from './instructions';
import { parameters } from './parameters';
import { Actions } from './action';
import { GenerateMeme } from '@wrkspce/assistance/ui/meme-generator';

export const actions = {
  ...Actions,
};

export const tool: AssistanceTool = {
  name: 'generate-meme',
  type: 'action',
  instructions,
  parameters,
  ui: {
    done: (params) => <GenerateMeme params={params} />,
  },
};

export const GenerateMemeTool = {
  tool,
  actions,
};
