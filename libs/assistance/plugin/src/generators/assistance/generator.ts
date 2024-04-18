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
import { names, generatePropertyField, generateNextLibraryOptions, generateReactLibraryOptions, convertToZod, readFileReplaceString } from './helpers';
import { z } from 'zod';


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
  const { tool } = params;
  const parameters = JSON.parse(tool.parameters) as { property: string; type: AssistantToolPropertyType; description: string }[];
  const rules = JSON.parse(tool.rules) as string[];
  const schema = z.object({
    ...convertToZod(parameters),
  });
  const knowledge = tool.knowledge ? JSON.stringify(tool.knowledge) : "";
  const fields = parameters.map((property) => generatePropertyField(property))
  const action = tool.action ? { names: names(tool.action) } : undefined;

  // 1. Construct the feature object
  const feature: AssistanceFeatureFileGeneratorParams = {
    names: names(params.name),
    tools:  [{
        ...tool,
        names: names(tool.name),
        rules,
        parameters,
        knowledge,
        fields,
        schema,
        action
      }]
    };
  await build(feature, tree);
  await appToApp(feature, tree, params.appPath && params.appPath !== 'undefined' ? params.appPath : 'apps/assistance/app/src/app');

}


async function build(feature: AssistanceFeatureFileGeneratorParams, tree: Tree) {
  const featureFileName = feature.names.fileName;
  const toolActionFilenName = feature.tools[0].action ? feature.tools[0].action.names.fileName : '';
  const toolFileName = feature.tools[0].names.fileName;
  const toolClassName = feature.tools[0].names.className;
  const toolActionClassName = feature.tools[0].action ? feature.tools[0].action.names.className : '';

  // 2. Generate the domain files for feature within the domain library
  await assistanceFeatureDomainGenerator(tree, feature, featureFileName);

  // 3. Generate the feature library and files
  await assistanceFeatureGenerator(
    tree, // virtual file system tree
    feature,
  );

  // 4. Generate the UI library and files
  await assistanceUIGenerator(tree, feature);

  // 5. Generate the tool files for the feature
  await assistanceFeatureToolGenerator(tree, feature, toolActionFilenName);

  // 6. Generate the tool UI files for the feature
  await assistanceFeatureToolUIGenerator(tree, feature, toolFileName, toolClassName, toolActionClassName);
}

async function appToApp(feature: AssistanceFeatureFileGeneratorParams, tree: Tree, appPath: string) {
  const layoutTemplatePath = path.join(__dirname, 'files/src/app/layout');
  generateFiles(
    tree,
    layoutTemplatePath,
    `${appPath}/(${feature.names.fileName})`,
    {
      feature,
      esj: ''
    },
  );
  const pageTemplatePath = path.join(__dirname, 'files/src/app/page');
  generateFiles(
    tree,
    pageTemplatePath,
    `${appPath}/(${feature.names.fileName})/${feature.names.fileName}`,
    {
      feature,
      esj: ''
    },
  );
  const updatedContent = `{ title: '${feature.names.className}', href: '/${feature.names.fileName}' },\n// @wrkspce Generator - DO NOT DELETE`;
  readFileReplaceString(tree, `${appPath}/navigation.tsx`, '// @wrkspce Generator - DO NOT DELETE', updatedContent);
  await formatFiles(tree);
}
/**
 * 
 * @param tree - The virtual file system tree.
 * @param feature - The feature object.
 */
export async function assistanceFeatureDomainGenerator(
  tree: Tree,
  feature: AssistanceFeatureFileGeneratorParams,
  featureFileName: string,
) {
  // 1. Construct the path to the template files
  const templatePath = path.join(__dirname, 'files/src/domain/lib/feature');
  // 2. Generate the files

  generateFiles(
    tree,
    templatePath,
    `libs/assistance/domain/src/lib/feature/${featureFileName}`,
    {
      feature,
      featureFileName,
      esj: ''
    },
  );
  const updatedContent = `export * from './lib/feature/${featureFileName}';\n// @wrkspce Generator - DO NOT DELETE`;
  readFileReplaceString(tree, `libs/assistance/domain/src/index.ts`, '// @wrkspce Generator - DO NOT DELETE', updatedContent)
  await formatFiles(tree);
}

/**
 * 
 * @param tree - The virtual file system tree.
 * @param params - The parameters for generating the assistance feature.
 */
export async function assistanceFeatureGenerator(
  tree: Tree,
  feature: AssistanceFeatureFileGeneratorParams,
) {
  // 1. Generate the library options
  const nextLibraryOptions: NextLibrarySchema =
    generateNextLibraryOptions(feature);
  // 2. Generate libraries using NX workspace devkit project generator
  await nextLibraryGenerator(tree, nextLibraryOptions);
  // 3. Construct the path to the template files
  const templatePath = path.join(__dirname, 'files/src/feature');
  // 4. Generate the files
  generateFiles(
    tree,
    templatePath,
    `libs/assistance/feature/${feature.names.fileName}/src`,
    {
      feature,
      esj: ''
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
  feature: AssistanceFeatureFileGeneratorParams
) {
  // 1. Generate the library options
  const reactLibraryOptions: ReactLibrarySchema =
    generateReactLibraryOptions(feature);
  // 2. Generate libraries using NX workspace devkit project generator
  await reactLibraryGenerator(tree, reactLibraryOptions);
  // 1. Construct the path to the template files
  const templatePath = path.join(
    __dirname,
    'files/src/ui/src',
  );

  // 2. Iterate through the tools and generate the files
  feature.tools.forEach((tool) => {
    generateFiles(
      tree,
      templatePath,
      `libs/assistance/ui/${feature.names.fileName}/src`,
      {
        tool,
        esj: ''
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
export async function assistanceFeatureToolGenerator(
  tree: Tree,
  feature: AssistanceFeatureFileGeneratorParams,
  toolActionFilenName: string,
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
        feature,
        toolActionFilenName,
        esj: ''
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
  toolFilename: string,
  toolClassName: string,
  toolActionClassName: string,
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
        toolFilename,
        toolClassName,
        toolActionClassName,
        esj: ''
      },
    );
  });
  await formatFiles(tree);
}

export default assistanceGenerator;
