import { z } from 'zod';

/**
 * Represents the parameters for generating a workspace configuration.
 */
export const generateWorkspaceParameters = z
  .object({
    /**
     * The name of the library, module or app. Should follow pattern of [scope]/[name].
     */
    name: z.string().describe('The name of the library, module or app. Should follow pattern of [scope]/[name].'),
    /**
     * The type of configuration, can be either library, module, or app.
     */
    configType: z.enum(['library', 'module', 'app']).describe('The type of configuration, can be either library, module, or app.'),
    /**
     * The description of the library, module or app.
     */
    description: z.string().describe('The description of the library, module or app.'),
    /**
     * The array of field objects.
     */
    fields: z
      .array(
        z
          .object({
            /**
             * The name of the field.
             */
            name: z.string().describe('The name of the field.'),
            /**
             * The type of the field.
             */
            type: z.enum(['input', 'select', 'multi', 'checkbox', 'radio', 'file']).describe('The type of the field.'),
            /**
             * The options for the field, if applicable.
             */
            options: z.array(z.string()).optional().describe('The options for the field, if applicable.'),
            /**
             * The value of the field.
             */
            value: z.string().describe('The value of the field'),
            /**
             * Whether the field is required or not.
             */
            required: z.boolean().optional().describe('Whether the field is required or not.'),
            /**
             * The placeholder for the field, if any.
             */
            placeholder: z.string().optional().describe('The placeholder for the field, if any.'),
            /**
             * The label for the field.
             */
            label: z.string().describe('The label for the field'),
          })
          .describe('The field object, containing details about the field.'),
      )
      .optional()
      .describe('The array of field objects.'),
    /**
     * The children of the configuration, if any.
     */
    children: z.any().optional().describe('The children of the configuration, if any.'),
  })
  .required()
  .describe('The library configuration object.');

/**
 * Represents the parameters for generating a diagram.
 */
export const generateDiagramParameters = z
  .object({
    /**
     * The stringified JSON object representing a workspace configuration.
     */
    config: z.string().describe('The stringified JSON object representing a workspace configuration.'),
    /**
     * The Mermaid syntax illustrating the desired diagram structure.
     */
    diagram: z.string().describe('The Mermaid syntax illustrating the desired diagram structure.'),
  });
