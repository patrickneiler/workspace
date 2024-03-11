import { z } from "zod";

export interface WorkspaceParameters {
    name: string;
    configType: 'workspace' | 'library' | 'module' | 'app';
    type: 'nx';
    libs: string[];
}

export interface LibraryParameters {
    name: string;
    configType: 'library' | 'module' | 'app';
    type: 'next' | 'react';
    scope: string;
    importPath: string;
    generator: string;
    modules: string[];
}

export interface ModuleParameters {
    name: string;
    configType: 'library' | 'module' | 'app';
    type: 'hook' | 'stateful-component' | 'functional-component' | 'page' | 'server' | 'ui' | 'util';
    library: string;
    generator: string;
    dependencies: string[];
}

export type ConfigParameters = WorkspaceParameters | LibraryParameters | ModuleParameters;

export const generateWorkspaceParameters = z.object({
    name: z.string().describe('Name of the library, proceeded by the scope it exists in. e.g. "assistance-react"'),
    configType: z.enum(['workspace','library', 'module', 'app']).describe('Type of the configuration: workspace, library, module, or app'),
    type: z.enum(['nx']).describe('Framework used'),
    libs: z.array(z.string()).describe('List of library names within the workspace. These libraries will either already exist or be created by subsequent calls to the generateLibraryConfig tool.'),
  }).required();

export const generateLibraryParameters = z.object({
    name: z.string().describe('Name of the library, proceeded by the scope it exists in. e.g. "assistance-react"'),
    configType: z.enum(['library', 'module', 'app']).describe('Type of the configuration: library, module, or app'),
    type: z.enum(['next', 'react']).describe('Framework used'),
    scope: z.string().describe('Scope that library is in. e.g. "assistance"'),
    importPath: z.string().describe('Import path for the library e.g. "@ranthology/assistance/react"'),
    generator: z.string().describe('NX Generator script used for the library. e.g. "nx generate @nx/react:library --name=assistance-react --directory=assistance/react --buildable=true --component=false --importPath=@ranthology/assistance/react --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive"'),
    modules: z.array(z.string()).describe('List of module names within the library. These modules will either already exist or be created by subsequent calls to the generateModuleConfig tool.'),
  }).required();

  export const generateModuleParameters = z.object({
    name: z.string().describe('Name of the module, e.g. "useAssistance"'),
    configType: z.enum(['library', 'module', 'app']).describe('Type of the configuration: library, module, or app'),
    type: z.enum(['hook', 'stateful-component', 'functional-component', 'page', 'server', 'ui', 'util']).describe('Type of the module'),
    library: z.string().describe('Library that exports the module. e.g. "assistance-react"'),
    generator: z.string().describe('NX Generator script used for the module. e.g. "nx generate @nx/react:hook --name=useAssistance --nameAndDirectoryFormat=as-provided --no-interactive --dry-run"'),
    dependencies: z.array(z.string()).describe('List of dependencies for the module. These dependencies will be either within the library, workspace, or external.'),
  }).required();