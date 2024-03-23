import { z } from "zod";

export const generateConfigurationParameters = z.object({
  name: z.string().describe('The name of the library, module or app. Should follow pattern of [scope]/[name].'),
  configType: z.enum(['library', 'module', 'app']).describe('The type of configuration, can be either library, module, or app.'),
  description: z.string().describe('The description of the library, module or app.'),
  fields: z.array(
      z.object({
        name: z.string().describe('The name of the field.'),
        type: z.enum(['input', 'select', 'multi', 'checkbox', 'radio', 'file']).describe('The type of the field.'),
        options: z.array(z.string()).optional().describe('The options for the field, if applicable.'),
        value: z.string().describe('The value of the field'),
        required: z.boolean().optional().describe('Whether the field is required or not.'),
        placeholder: z.string().optional().describe('The placeholder for the field, if any.'),
        label: z.string().describe('The label for the field'),
      }).describe('The field object, containing details about the field.'),
  ).describe('The array of field objects.').optional(),
  children: z.any().optional().describe('The children of the configuration, if any.')
}).required().describe('The library configuration object.');