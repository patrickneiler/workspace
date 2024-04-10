import {
  AssistanceTool,
  GenerateFeatureParameters,
} from '@wrkspce/assistance/domain';

import { instructions } from './instructions';
import { parameters } from './parameters';
import { Actions } from './action';
import { GenerateFeature } from '@wrkspce/assistance/ui/core';

export const actions = {
  ...Actions,
};

export const tool: AssistanceTool = {
  name: 'generate-feature',
  type: 'action',
  instructions,
  parameters,
  ui: {
    done: (params) => <GenerateFeature params={params} />,
  },
};

export const GenerateFeatureTool = {
  tool,
  actions,
};
