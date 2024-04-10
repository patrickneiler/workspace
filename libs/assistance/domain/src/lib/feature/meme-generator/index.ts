import { DynamicFormField } from '@wrkspce/shared/feature/form';

export interface GenerateMemeParameters {
  image: {
    value: string;
    type: string;
  };

  topText: {
    value: string;
    type: string;
  };

  bottomText: {
    value: string;
    type: string;
  };

  fields?: DynamicFormField[];
}
