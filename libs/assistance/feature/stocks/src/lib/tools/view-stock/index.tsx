import {
  AssistanceTool,
} from '@wrkspce/assistance/domain';

import { instructions } from './instructions';
import { parameters } from './parameters';
import { ViewStock } from '@wrkspce/assistance/ui/stocks';
import { StockSkeleton } from '@wrkspce/stocks/ui';

export const tool: AssistanceTool = {
  name: 'view-stock',
  type: 'async',
  instructions,
  parameters,
  endpoint: `${process.env.PUBLIC_URL}/api/stocks/stock`,
  ui: {
    update: () => <StockSkeleton />,
    done: (params) => <ViewStock params={params} />,
  },
};

export const ViewStockTool = {
  tool
};
