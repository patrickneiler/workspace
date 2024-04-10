import {
  AssistanceTool,
  PurchaseStockParameters,
} from '@wrkspce/assistance/domain';

import { instructions } from './instructions';
import { parameters } from './parameters';
import { Actions } from './action';
import { PurchaseStock } from '@wrkspce/assistance/ui/stocks';

export const actions = {
  ...Actions,
};

export const tool: AssistanceTool = {
  name: 'purchase-stock',
  type: 'action',
  instructions,
  parameters,
  ui: {
    done: (params) => <PurchaseStock params={params} />,
  },
};

export const PurchaseStockTool = {
  tool,
  actions,
};
