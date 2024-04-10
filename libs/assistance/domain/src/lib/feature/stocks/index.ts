import { DynamicFormField } from '@wrkspce/shared/feature/form';

export interface PurchaseStockParameters {
  symbol: {
    value: string;
    type: string;
  };

  quantity: {
    value: string;
    type: string;
  };

  price: {
    value: string;
    type: string;
  };

  fields?: DynamicFormField[];
}
