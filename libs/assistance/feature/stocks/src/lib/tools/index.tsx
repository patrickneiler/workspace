import { ViewStockTool } from './view-stock';
import { PurchaseStockTool, actions } from './purchase-stock';

export const ToolActions = { ...actions };

export const Tools = [ViewStockTool, PurchaseStockTool];
