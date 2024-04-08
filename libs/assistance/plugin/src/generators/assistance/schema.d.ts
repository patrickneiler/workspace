import { DynamicFormField } from '@wrkspce/shared/feature/form';

export interface Names {
  name: string;
  fileName: string;
  className: string;
  functionName: string;
}

export interface AssistanceTool<T = any> {
  name: string;
  type: 'static' | 'async' | 'action';
  instructions?: string;
  parameters?: z.AnyZodObject;
  endpoint?: string;
  ui: {
    update?: () => JSX.Element;
    done: (params: T) => JSX.Element;
  };
}

export type AssistantToolPropertyType = 'string' | 'number' | 'boolean' | 'object' | 'array';

export interface AssistanceToolGenerator {
  name: string;
  type: 'static' | 'async' | 'action';
  condition: string;
  goal: string;
  rules: string;
  parameters: string;
  action?: string;
  endpoint?: string;
}

export interface AssistanceFeatureGeneratorSchema {
  name: string;
  tool: AssistanceToolGenerator;
}

// Transformation of the schema
export interface AssistanceToolFileGeneratorParams extends AssistanceToolGenerator {
  names: Names;
  fields?: DynamicFormField[];
  schema?: z.AnyZodObject;
  rules: string[];
  parameters: {
    property: string;
    type: AssistantToolPropertyType;
    description: string;
  }[];
  action?: {
    names: Names
  }
}

export interface AssistanceFeatureFileGeneratorParams {
  names: Names;
  tools: AssistanceToolFileGeneratorParams[];
}

export const tools = [
  {
    name: 'Generate Order',
    type: 'action',
    condition: 'User wants to generate an order',
    goal: 'Generate an order',
    rules: ['User must have a cart with items'],
    parameters: [
      {
        property: 'cartId',
        type: 'string',
        description: 'The ID of the cart to generate the order from'
      }
    ],
    action: 'Confirm Order' 
  }
]

export const toolString = ``
export const toolString = `{
  name: 'Generate Order',
  type: 'action',
  condition: 'User wants to generate an order',
  goal: 'Generate an order',
  rules: ['User must have a cart with items'],
  parameters: [
    {
      property: 'cartId',
      type: 'string',
      description: 'The ID of the cart to generate the order from'
    }
  ],
  action: 'Confirm Order' 
}`;
export const terminalGenerator = `{
  name: 'Generate Order',
  type: 'action',
  condition: 'User wants to generate an order',
  goal: 'Generate an order',
  rules: ['User must have a cart with items'],
  parameters: [
    {
      property: 'cartId',
      type: 'string',
      description: 'The ID of the cart to generate the order from'
    }
  ],
  action: 'Confirm Order' 
}`;
