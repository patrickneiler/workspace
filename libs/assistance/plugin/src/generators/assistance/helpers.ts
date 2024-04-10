import { DynamicFormField } from "@wrkspce/shared/feature/form";
import { Tree} from "@nx/devkit";
import slugify from "slugify";
import { AssistanceFeatureFileGeneratorParams, AssistantToolPropertyType } from "./schema";
import { NextLibrarySchema, ReactLibrarySchema, Linter } from "./library";
import { z } from "zod";
import * as lodash from 'lodash';

export function names(str: string) {
    return {
      name: str,
      fileName: slugify(str, { lower: true, strict: true }),
      className: lodash.upperFirst(lodash.camelCase(str)),
      functionName: lodash.camelCase(str),
    };
  }
  
export function generatePropertyField(property: {
    property: string;
    type: AssistantToolPropertyType,
    description: string
  }): DynamicFormField {
    return {
      name: property.property,
      value: '',
      required: true,
      type: convertAssistantToolPropertyTypeToDynamicFormFieldType(property.type),
      label: lodash.startCase(property.property),
    };
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

  export function convertToZod(parameters: {
    property: string;
    type: string;
    description: string;
  }[]): {[key: string]: z.AnyZodObject} {
    const zodSchema = {};
    parameters.forEach((param) => {
      switch (param.type) {
        case 'string':
          zodSchema[param.property] = z.string().describe(param.description);
          break;
        case 'number':
          zodSchema[param.property] = z.number().describe(param.description);
          break;
        case 'boolean':
          zodSchema[param.property] = z.boolean().describe(param.description);
          break;
        case 'object':
          zodSchema[param.property] = z.object({}).describe(param.description);
          break;
        case 'array':
          zodSchema[param.property] = z.array(z.object({})).describe(param.description);
          break;
        default:
          break;
      }
    });
    return zodSchema;
  }


  export function generateNextLibraryOptions(
    feature: AssistanceFeatureFileGeneratorParams,
  ): NextLibrarySchema {
    return {
      name: `assistance-feature-${feature.names.fileName}`,
      directory: `libs/assistance/feature/${feature.names.fileName}`,
      projectNameAndRootFormat: 'as-provided',
      style: 'css',
      skipTsConfig: false,
      skipFormat: false,
      tags: 'scope:assistance, type:feature',
      pascalCaseFiles: false,
      routing: false,
      unitTestRunner: 'jest',
      linter: Linter.EsLint,
      component: false,
      publishable: true,
      buildable: true,
      importPath: `@wrkspce/assistance/feature/${feature.names.fileName}`,
    };
  }
  
  export function generateReactLibraryOptions(
    feature: AssistanceFeatureFileGeneratorParams,
  ): ReactLibrarySchema {
    return {
      name: `assistance-ui-${feature.names.fileName}`,
      directory: `libs/assistance/ui/${feature.names.fileName}`,
      projectNameAndRootFormat: 'as-provided',
      style: 'css',
      skipTsConfig: false,
      skipFormat: false,
      tags: 'scope:assistance, type:ui',
      pascalCaseFiles: false,
      routing: false,
      unitTestRunner: 'jest',
      linter: Linter.EsLint,
      component: false,
      publishable: true,
      buildable: true,
      importPath: `@wrkspce/assistance/ui/${feature.names.fileName}`,
    };
  }

  export function readFileReplaceString(tree: Tree, path: string, replace: string, replaceWith: string) {
    const content = tree.read(path)?.toString('utf-8');
    const updatedContent = content.replace(replace, replaceWith);
    tree.write(path, updatedContent);
  }

