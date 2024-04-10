import { DynamicFormField } from '@wrkspce/shared/feature/form';

export interface GenerateFeatureParameters {
  name: string;
  tool: {
   
      name: string;
      type: string;
      instructions: string;
      parameters: string;
      rules: string;
      goal: string;
      condition: string,
      action?: string;
  };
  appPath?: string;
  fields?: DynamicFormField[];
}

export type GenerateFeatureParametersWithName = GenerateFeatureParameters & {
  name: string;
};