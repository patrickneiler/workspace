import { DynamicFormField } from '@wrkspce/shared/feature/form';

export interface ViewStockParameters {
  symbol: string;

  price: number;

  delta: number;
}

export interface PurchaseStockParameters {
  name: string;

  price: number;

  amount: number;
}
