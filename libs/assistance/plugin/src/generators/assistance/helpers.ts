import { DynamicFormField } from "@wrkspce/shared/feature/form";
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

  export function convertParametersToZodObject(parameters: {
    property: string;
    type: AssistantToolPropertyType;
    description: string;
  }[]) {
    return parameters.reduce((acc, parameter) => {
      return {
        ...acc,
        [parameter.property]: convertPropertyTypeToZodType(parameter.type, parameter.description),
  
      };
    }, {});
  }
  
  export function convertPropertyTypeToZodType(type: string, description: string) {
    switch (type) {
      case 'string':
        return z.string().describe(description);
      case 'number':
        return z.number().describe(description);
      case 'boolean':
        return z.boolean().describe(description);
      case 'object':
        return z.object({}).describe(description);
      case 'array':
        return z.array(z.string()).describe(description);
    }
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
      importPath: `@wrkspce/assistance/feature/${feature.names.name}`,
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