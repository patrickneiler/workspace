import { TAnyToolDefinitionArray, TToolDefinitionMap } from './tool-definition';
import { OpenAIStream } from 'ai';
import type OpenAI from 'openai';
import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';
import { CompletionResponse } from './domain';
import { DynamicFormField } from '@wrkspce/shared/feature/form';
import lodash from 'lodash';

export type AssistantToolPropertyType = 'string' | 'number' | 'boolean' | 'object' | 'array';


/**
 * Generates instructions based on the provided parameters.
 *
 * @param {Object} params - The parameters for generating instructions.
 * @param {string} params.name - The name of the function to be run.
 * @param {string} params.condition - The condition that needs to be met.
 * @param {string} params.description - The description of the instructions.
 * @param {string} [params.knowledge] - The additional knowledge to be used.
 * @param {string[]} params.rules - The rules to be followed.
 * @returns {string} - The generated instructions.
 */
export const generateInstructions = ({
  name,
  condition,
  goal,
  knowledge,
  rules
}: {
  name: string;
  condition: string;
  goal: string;
  knowledge?: string;
  rules: string[];
}) => {
  return `
    When the following condition is met: "${condition}"
    You will run the function named "${name}".
    ${goal}
    ${knowledge ? `Here's the knowledge you should use: ${knowledge}` : ''}
    Here's how you should proceed:
    ${rules
      .map((rule, index) => {
        return `${index + 1}. ${rule}`;
      })
      .join('\n')
    }
  `;
};

export function generatePropertyField(property: {
  property: string;
  type: AssistantToolPropertyType,
  value: string
}): DynamicFormField {
  console.log(property)
  return {
    name: property.property,
    value: property.value,
    required: true,
    type: convertAssistantToolPropertyTypeToDynamicFormFieldType(property.type),
    label: lodash.startCase(property.property),
  };
}

export function getPropertyValueFromFields(property: string, fields?: DynamicFormField[]) {
  return fields?.find((field) => field.name === property)?.value;
}



function convertAssistantToolPropertyTypeToDynamicFormFieldType(
  type: AssistantToolPropertyType,
): DynamicFormField['type'] {
  switch (type) {
    case 'string':
      return 'input';
    case 'number':
      return 'input';
    case 'boolean':
      return 'checkbox';
    case 'object':
      return 'input';
    case 'array':
      return 'select';
  }
}

/**
 * Consumes a ReadableStream by reading from it until it is done.
 * @param stream The ReadableStream to consume.
 */
const consumeStream = async (stream: ReadableStream) => {
  const reader = stream.getReader();
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { done } = await reader.read();
    if (done) break;
  }
};


/**
 * Runs OpenAI completion using the provided parameters and functions.
 *
 * @template T - The type of the OpenAI completion parameters.
 * @template TFunctions - The type of the functions array.
 * @param {OpenAI} openai - The OpenAI instance.
 * @param {T & { functions: TFunctions }} params - The OpenAI completion parameters and functions.
 * @returns {Object} - An object containing the `onTextContent` and `onFunctionCall` functions.
 */
export function runOpenAICompletion<
  T extends Omit<
    Parameters<typeof OpenAI.prototype.chat.completions.create>[0],
    'functions'
  >,
  const TFunctions extends TAnyToolDefinitionArray,
>(
  openai: OpenAI,
  params: T & {
    functions: TFunctions;
  },
) {
  let text = '';
  let hasFunction = false;

  type TToolMap = TToolDefinitionMap<TFunctions>;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  let onTextContent: (text: string, isFinal: boolean) => void = () => { };

  const functionsMap: Record<string, TFunctions[number]> = {};
  for (const fn of params.functions) {
    functionsMap[fn.name] = fn;
  }

  const onFunctionCall = {} as any;

  const { functions, ...rest } = params;

  (async () => {
    consumeStream(
      OpenAIStream(
        (await openai.chat.completions.create({
          ...rest,
          stream: true,
          functions: functions.map(fn => ({
            name: fn.name,
            description: fn.description,
            parameters: zodToJsonSchema(fn.parameters) as Record<
              string,
              unknown
            >,
          })),
        })) as any,
        {
          async experimental_onFunctionCall(functionCallPayload) {
            hasFunction = true;

            if (!onFunctionCall[functionCallPayload.name]) {
              return;
            }

            // we need to convert arguments from z.input to z.output
            // this is necessary if someone uses a .default in their schema
            const zodSchema = functionsMap[functionCallPayload.name].parameters;
            const parsedArgs = zodSchema.safeParse(
              functionCallPayload.arguments,
            );

            if (!parsedArgs.success) {
              throw new Error(
                `Invalid function call in message. Expected a function call object`,
              );
            }

            onFunctionCall[functionCallPayload.name]?.(parsedArgs.data);
          },
          onToken(token) {
            text += token;
            if (text.startsWith('{')) return;
            onTextContent(text, false);
          },
          onFinal() {
            if (hasFunction) return;
            onTextContent(text, true);
          },
        },
      ),
    );
  })();

  const response: CompletionResponse<TFunctions, TToolMap> = {
    onTextContent: (
      callback: (text: string, isFinal: boolean) => void | Promise<void>,
    ) => {
      onTextContent = callback;
    },
    onFunctionCall: <TName extends TFunctions[number]['name']>(
      name: TName,
      callback: (
        args: z.output<
          TName extends keyof TToolMap
          ? TToolMap[TName] extends infer TToolDef
          ? TToolDef extends TAnyToolDefinitionArray[number]
          ? TToolDef['parameters']
          : never
          : never
          : never
        >,
      ) => void | Promise<void>,
    ) => {
      onFunctionCall[name] = callback;
    },
  };
  return response;
}
