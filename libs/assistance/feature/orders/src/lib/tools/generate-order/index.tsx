import {
  AssistanceTool,
  GenerateOrderParameters,
} from '@wrkspce/assistance/domain';

import { instructions } from './instructions';
import { parameters } from './parameters';
import { Actions } from './action';
import { GenerateOrder } from '@wrkspce/assistance/ui/orders';

export const actions = {
  ...Actions,
};

export const tool: AssistanceTool = {
  name: 'generate-order',
  type: 'action',
  instructions,
  parameters,
  ui: {
    done: (params) => <GenerateOrder params={params} />,
  },
};

export const GenerateOrderTool = {
  tool,
  actions,
};
