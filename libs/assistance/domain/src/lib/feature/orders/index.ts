import { DynamicFormField } from '@wrkspce/shared/feature/form';

export interface GenerateOrderParameters {
  cartId: {
    type: 'string';
    value: string;
  };
  fields?: DynamicFormField[];
}
