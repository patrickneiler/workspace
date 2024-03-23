import { WorkspaceParameters } from './domain';

export const assistanceReactModulesConfig: WorkspaceParameters[] = [
  {
    name: 'useAssistance',
    configType: 'module',
    description: 'React hook that provides AI assistance to the user',
    fields: [
      {
        name: 'name',
        type: 'input',
        value: 'useAssistance',
        required: true,
        placeholder: 'useAssistance',
        label: 'Name',
      },
      {
        name: 'type',
        type: 'select',
        value: 'hook',
        required: true,
        options: [
          'hook',
          'stateful-component',
          'functional-component',
          'page',
          'server',
          'ui',
          'util',
        ],
        label: 'Type',
      },
      {
        name: 'library',
        type: 'input',
        value: 'assistance-react',
        required: true,
        placeholder: 'assistance-react',
        label: 'Library',
      },
      {
        name: 'generator',
        type: 'input',
        value:
          'nx generate @nx/react:hook --name=useAssistance --nameAndDirectoryFormat=as-provided --no-interactive --dry-run',
        required: true,
        placeholder:
          'nx generate @nx/react:hook --name=useAssistance --nameAndDirectoryFormat=as-provided --no-interactive --dry-run',
        label: 'Generator',
      },
    ],
  },
  {
    name: 'confirm',
    configType: 'module',
    description: 'A module that handles the confirmation of a configuration',
    fields: [
      {
        name: 'name',
        type: 'input',
        value: 'confirm',
        required: true,
        placeholder: 'confirm',
        label: 'Name',
      },
      {
        name: 'type',
        type: 'select',
        value: 'stateful-component',
        required: true,
        options: [
          'hook',
          'stateful-component',
          'functional-component',
          'page',
          'server',
          'ui',
          'util',
        ],
        label: 'Type',
      },
      {
        name: 'library',
        type: 'input',
        value: 'assistance-react',
        required: true,
        placeholder: 'assistance-react',
        label: 'Library',
      },
      {
        name: 'generator',
        type: 'input',
        value:
          'nx generate @nx/react:stateful --name=confirm --nameAndDirectoryFormat=as-provided --no-interactive --dry-run',
        required: true,
        placeholder:
          'nx generate @nx/react:stateful --name=confirm --nameAndDirectoryFormat=as-provided --no-interactive --dry-run',
        label: 'Generator',
      },
    ],
  },
];

export const assistanceNextModulesConfig: WorkspaceParameters[] = [
  {
    name: 'actions',
    configType: 'module',
    description: 'A module that handles actions that connect to the AI service',
    fields: [
      {
        name: 'name',
        type: 'input',
        value: 'actions',
        required: true,
        placeholder: 'Actions',
        label: 'Name',
      },
      {
        name: 'type',
        type: 'select',
        value: 'server-component',
        required: true,
        options: [
          'hook',
          'stateful-component',
          'functional-component',
          'server-component',
          'page',
          'server',
          'ui',
          'util',
        ],
        label: 'Type',
      },
      {
        name: 'library',
        type: 'input',
        value: 'assistance-next',
        required: true,
        placeholder: 'assistance-next',
        label: 'Library',
      },
      {
        name: 'generator',
        type: 'input',
        value:
          'nx generate @nx/next:server --name=Actions --nameAndDirectoryFormat=as-provided --no-interactive --dry-run',
        required: true,
        placeholder:
          'nx generate @nx/next:server --name=Actions --nameAndDirectoryFormat=as-provided --no-interactive --dry-run',
        label: 'Generator',
      },
    ],
  },
];

export const uiReactModulesConfig: WorkspaceParameters[] = [
  {
    name: 'DynamicForm',
    configType: 'module',
    description: 'A module that provides a dynamic form component',
    fields: [
      {
        name: 'name',
        type: 'input',
        value: 'DynamicForm',
        required: true,
        placeholder: 'DynamicForm',
        label: 'Name',
      },
      {
        name: 'type',
        type: 'select',
        value: 'functional-component',
        required: true,
        options: [
          'hook',
          'stateful-component',
          'functional-component',
          'page',
          'server',
          'ui',
          'util',
        ],
        label: 'Type',
      },
      {
        name: 'library',
        type: 'input',
        value: 'ui-react',
        required: true,
        placeholder: 'ui-react',
        label: 'Library',
      },
      {
        name: 'generator',
        type: 'input',
        value:
          'nx generate @nx/react:functional --name=DynamicForm --nameAndDirectoryFormat=as-provided --no-interactive --dry-run',
        required: true,
        placeholder:
          'nx generate @nx/react:functional --name=DynamicForm --nameAndDirectoryFormat=as-provided --no-interactive --dry-run',
        label: 'Generator',
      },
    ],
  },
];

export const librariesConfig: WorkspaceParameters[] = [
  {
    name: 'assistance-react',
    configType: 'library',
    description:
      'A library that provides React based components and hooks for AI assistance',
    fields: [
      {
        name: 'name',
        type: 'input',
        value: 'assistance-react',
        required: true,
        placeholder: 'assistance-react',
        label: 'Name',
      },
      {
        name: 'type',
        type: 'select',
        value: 'react',
        required: true,
        options: ['next', 'react'],
        label: 'Type',
      },
      {
        name: 'scope',
        type: 'input',
        value: 'assistance',
        required: true,
        placeholder: 'assistance',
        label: 'Scope',
      },
      {
        name: 'importPath',
        type: 'input',
        value: '@ranthology/assistance/react',
        required: true,
        placeholder: '@ranthology/assistance/react',
        label: 'Import Path',
      },
      {
        name: 'generator',
        type: 'input',
        value:
          'nx generate @nx/react:library --name=assistance-react --directory=assistance/react --buildable=true --component=false --importPath=@ranthology/assistance/react --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive',
        required: true,
        placeholder:
          'nx generate @nx/react:library --name=assistance-react --directory=assistance/react --buildable=true --component=false --importPath=@ranthology/assistance/react --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive',
        label: 'Generator',
      },
    ],
    children: assistanceReactModulesConfig,
  },
  {
    name: 'assistance-next',
    configType: 'library',
    description:
      'A library that provides Next.js based Server Components for streaming AI assistance through generative UI',
    fields: [
      {
        name: 'name',
        type: 'input',
        value: 'assistance-next',
        required: true,
        placeholder: 'assistance-next',
        label: 'Name',
      },
      {
        name: 'type',
        type: 'select',
        value: 'next',
        required: true,
        options: ['next', 'react'],
        label: 'Type',
      },
      {
        name: 'scope',
        type: 'input',
        value: 'assistance',
        required: true,
        placeholder: 'assistance',
        label: 'Scope',
      },
      {
        name: 'importPath',
        type: 'input',
        value: '@ranthology/assistance/next',
        required: true,
        placeholder: '@ranthology/assistance/next',
        label: 'Import Path',
      },
      {
        name: 'generator',
        type: 'input',
        value:
          'nx generate @nx/next:library --name=assistance-next --directory=assistance/next --buildable=true --component=false --importPath=@ranthology/assistance/next --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive',
        required: true,
        placeholder:
          'nx generate @nx/next:library --name=assistance-next --directory=assistance/next --buildable=true --component=false --importPath=@ranthology/assistance/next --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive',
        label: 'Generator',
      },
    ],
    children: assistanceNextModulesConfig,
  },
  {
    name: 'ui-react',
    configType: 'library',
    description:
      'A library that provides React based UI components shared across the workspace',
    fields: [
      {
        name: 'name',
        type: 'input',
        value: 'ui-react',
        required: true,
        placeholder: 'ui-react',
        label: 'Name',
      },
      {
        name: 'type',
        type: 'select',
        value: 'react',
        required: true,
        options: ['next', 'react'],
        label: 'Type',
      },
      {
        name: 'scope',
        type: 'input',
        value: 'ui',
        required: true,
        placeholder: 'ui',
        label: 'Scope',
      },
      {
        name: 'importPath',
        type: 'input',
        value: '@ranthology/ui/react',
        required: true,
        placeholder: '@ranthology/ui/react',
        label: 'Import Path',
      },
      {
        name: 'generator',
        type: 'input',
        value:
          'nx generate @nx/react:library --name=ui-react --directory=ui/react --buildable=true --component=true --importPath=@ranthology/ui/react --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive',
        required: true,
        placeholder:
          'nx generate @nx/react:library --name=ui-react --directory=ui/react --buildable=true --component=true --importPath=@ranthology/ui/react --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive',
        label: 'Generator',
      },
    ],
    children: uiReactModulesConfig,
  },
];

export const workspaceConfig: WorkspaceParameters = {
  name: '@ranthology',
  configType: 'workspace',
  children: librariesConfig,
};
