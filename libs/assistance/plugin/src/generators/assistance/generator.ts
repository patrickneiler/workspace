import { Tree, formatFiles, generateFiles } from '@nx/devkit';
import { libraryGenerator as nextLibraryGenerator } from '@nx/next';
import { libraryGenerator as reactLibraryGenerator } from '@nx/react';
import {
  AssistanceFeatureFileGeneratorParams,
  AssistanceFeatureGeneratorSchema,
  AssistantToolPropertyType
} from './schema';
import { NextLibrarySchema, ReactLibrarySchema } from './library';
import path = require('path');
import { names, generatePropertyField, generateNextLibraryOptions, generateReactLibraryOptions, convertParametersToZodObject } from './helpers';


/**
 * Generates the necessary files and libraries for the assistance feature.
 * 
 * @param tree - The virtual file system tree.
 * @param params - The parameters for generating the assistance feature.
 */
export async function assistanceGenerator(
  tree: Tree,
  params: AssistanceFeatureGeneratorSchema,
) {
  console.log('params', params);

  const { tool } = params;
  console.log('tool', tool);

  const parameters = JSON.parse(tool.parameters) as { property: string; type: AssistantToolPropertyType; description: string }[];
  console.log('parameters', parameters);

  const rules = JSON.parse(tool.rules) as string[];
  console.log('rules', rules);

  // 1. Construct the feature object
  const feature: AssistanceFeatureFileGeneratorParams = {
    names: names(params.name),
    tools:  [{
        ...tool,
        names: names(tool.name),
        rules,
        parameters,
        fields: parameters.map((property) => generatePropertyField(property)),
        schema: parameters.length > 0 ? convertParametersToZodObject(parameters) : undefined,
        action: tool.action ? { names: names(tool.action) } : undefined,
      }]
    };

  // 2. Generate the domain files for feature within the domain library
  await assistanceFeatureDomainGenerator(tree, feature);

  // 3. Generate the feature library and files
  await assistanceFeatureGenerator(
    tree, // virtual file system tree
    feature,
  );

  // 4. Generate the UI library and files
  await assistanceUIGenerator(tree, feature);

  // 5. Generate the tool files for the feature
  await assistanceFeatureToolGenerator(tree, feature);

  // 6. Generate the tool UI files for the feature
  await assistanceFeatureToolUIGenerator(tree, feature);

}

/**
 * 
 * @param tree - The virtual file system tree.
 * @param feature - The feature object.
 */
export async function assistanceFeatureDomainGenerator(
  tree: Tree,
  feature: AssistanceFeatureFileGeneratorParams,
) {
  // 1. Construct the path to the template files
  const templatePath = path.join(__dirname, 'files/src/domain/lib/feature');

  console.log('feature', feature);
  console.log('names', feature.names);
  console.log('feature.tools.names', feature.tools[0].names);
  console.log('feature.tools[0].parameters', feature.tools[0].parameters);
  // 2. Generate the files

  generateFiles(
    tree,
    templatePath,
    `libs/assistance/domain/src/lib/feature`,
    {
      feature,
    },
  );
  await formatFiles(tree);
}

/**
 * 
 * @param tree - The virtual file system tree.
 * @param params - The parameters for generating the assistance feature.
 */
export async function assistanceFeatureGenerator(
  tree: Tree,
  params: AssistanceFeatureFileGeneratorParams,
) {
  // 1. Generate the library options
  const nextLibraryOptions: NextLibrarySchema =
    generateNextLibraryOptions(params);
  // 2. Generate libraries using NX workspace devkit project generator
  await nextLibraryGenerator(tree, nextLibraryOptions);
  // 3. Construct the path to the template files
  const templatePath = path.join(__dirname, 'files/src/feature');

  // 4. Generate the files
  generateFiles(
    tree,
    templatePath,
    `libs/assistance/feature/${params.names.fileName}/src`,
    {
      feature: params,
    },
  );
  await formatFiles(tree);
}

/**
 * 
 * @param tree - The virtual file system tree.
 * @param params - The parameters for generating the assistance feature.
 */
export async function assistanceUIGenerator(
  tree: Tree,
  params: AssistanceFeatureFileGeneratorParams,
) {
  // 1. Generate the library options
  const reactLibraryOptions: ReactLibrarySchema =
    generateReactLibraryOptions(params);
  // 2. Generate libraries using NX workspace devkit project generator
  await reactLibraryGenerator(tree, reactLibraryOptions);
}

/**
 * 
 * @param tree - The virtual file system tree.
 * @param feature - The feature object.
 */
export async function assistanceFeatureToolGenerator(
  tree: Tree,
  feature: AssistanceFeatureFileGeneratorParams,
) {
  // 1. Construct the path to the template files
  const templatePath = path.join(__dirname, 'files/src/tools');

  // 2. Iterate through the tools and generate the files
  feature.tools.forEach((tool) => {
    generateFiles(
      tree,
      templatePath,
      `libs/assistance/feature/${feature.names.fileName}/src/lib/tools/${tool.names.fileName}`,
      {
        tool,
        feature
      },
    );
  });
  await formatFiles(tree);
}

/**
 * 
 * @param tree - The virtual file system tree.
 * @param feature - The feature object.
 */
export async function assistanceFeatureToolUIGenerator(
  tree: Tree,
  feature: AssistanceFeatureFileGeneratorParams,
) {
  // 1. Construct the path to the template files
  const templatePath = path.join(
    __dirname,
    'files/src/ui/lib/tools',
  );

  // 2. Iterate through the tools and generate the files
  feature.tools.forEach((tool) => {
    generateFiles(
      tree,
      templatePath,
      `libs/assistance/ui/${feature.names.fileName}/src/lib/tools/${tool.names.fileName}`,
      {
        tool,
      },
    );
  });
  await formatFiles(tree);
}

export default assistanceGenerator;
