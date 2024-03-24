import { WorkspaceParameters } from './domain';

/**
 * Represents the configuration for the workspace.
 */
export const workspaceConfig: WorkspaceParameters = {
  name: '@ranthology',
  configType: 'workspace',
  children: [
    {
      name: 'dynamic-avatar',
      configType: 'library',
      description: 'A dynamic avatar library',
      fields: [
        {
          name: 'name',
          type: 'input',
          value: 'dynamic-avatar',
          required: true,
          placeholder: 'dynamic-avatar',
          label: 'Name',
        },
        {
          name: 'type',
          type: 'select',
          value: 'lib',
          required: true,
          options: ['lib'],
          label: 'Type',
        },
        {
          name: 'scope',
          type: 'input',
          value: 'shared',
          required: true,
          placeholder: 'shared',
          label: 'Scope',
        },
        {
          name: 'importPath',
          type: 'input',
          value: '@ranthology/shared/dynamic/avatar',
          required: true,
          placeholder: '@ranthology/shared/dynamic/avatar',
          label: 'Import Path',
        },
        {
          name: 'generator',
          type: 'input',
          value:
            'nx generate @nx/workspace:lib --name=dynamic-avatar --directory=libs/shared/dynamic/avatar --buildable=true --importPath=@ranthology/shared/dynamic/avatar --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive',
          required: true,
          placeholder:
            'nx generate @nx/workspace:lib --name=dynamic-avatar --directory=libs/shared/dynamic/avatar --buildable=true --importPath=@ranthology/shared/dynamic/avatar --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive',
          label: 'Generator',
        },
      ],
    },
    {
      name: 'dynamic-form',
      configType: 'library',
      description: 'A dynamic form library',
      fields: [
        {
          name: 'name',
          type: 'input',
          value: 'dynamic-form',
          required: true,
          placeholder: 'dynamic-form',
          label: 'Name',
        },
        {
          name: 'type',
          type: 'select',
          value: 'lib',
          required: true,
          options: ['lib'],
          label: 'Type',
        },
        {
          name: 'scope',
          type: 'input',
          value: 'shared',
          required: true,
          placeholder: 'shared/dynamic/form',
          label: 'Scope',
        },
        {
          name: 'importPath',
          type: 'input',
          value: '@ranthology/shared/dynamic/form',
          required: true,
          placeholder: '@ranthology/shared/dynamic/form',
          label: 'Import Path',
        },
        {
          name: 'generator',
          type: 'input',
          value:
            'nx generate @nx/workspace:lib --name=dynamic-form --directory=libs/shared/dynamic/form --buildable=true --importPath=@ranthology/shared/dynamic/form --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive',
          required: true,
          placeholder:
            'nx generate @nx/workspace:lib --name=dynamic-form --directory=libs/shared/dynamic/form --buildable=true --importPath=@ranthology/shared/dynamic/form --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive',
          label: 'Generator',
        },
      ],
    },
    {
      name: 'assistance-shell',
      configType: 'library',
      description: 'A library for the assistance shell',
      fields: [
        {
          name: 'name',
          type: 'input',
          value: 'assistance-shell',
          required: true,
          placeholder: 'assistance-shell',
          label: 'Name',
        },
        {
          name: 'type',
          type: 'select',
          value: 'lib',
          required: true,
          options: ['lib'],
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
          value: '@ranthology/assistance/shell',
          required: true,
          placeholder: '@ranthology/assistance/shell',
          label: 'Import Path',
        },
        {
          name: 'generator',
          type: 'input',
          value:
            'nx generate @nx/workspace:lib --name=assistance-shell --directory=libs/assistance/shell --buildable=true --importPath=@ranthology/assistance/shell --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive',
          required: true,
          placeholder:
            'nx generate @nx/workspace:lib --name=assistance-shell --directory=libs/assistance/shell --buildable=true --importPath=@ranthology/assistance/shell --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive',
          label: 'Generator',
        },
      ],
    },
    {
      name: 'assistance-ai',
      configType: 'library',
      description: 'A library for the AI assistance',
      fields: [
        {
          name: 'name',
          type: 'input',
          value: 'assistance-ai',
          required: true,
          placeholder: 'assistance-ai',
          label: 'Name',
        },
        {
          name: 'type',
          type: 'select',
          value: 'lib',
          required: true,
          options: ['lib'],
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
          value: '@ranthology/assistance/ai',
          required: true,
          placeholder: '@ranthology/assistance/ai',
          label: 'Import Path',
        },
        {
          name: 'generator',
          type: 'input',
          value:
            'nx generate @nx/workspace:lib --name=assistance-ai --directory=libs/assistance/ai --buildable=true --importPath=@ranthology/assistance/ai --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive',
          required: true,
          placeholder:
            'nx generate @nx/workspace:lib --name=assistance-ai --directory=libs/assistance/ai --buildable=true --importPath=@ranthology/assistance/ai --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive',
          label: 'Generator',
        },
      ],
    },
    {
      name: 'assistance-chat',
      configType: 'library',
      description: 'A library for the assistance chat',
      fields: [
        {
          name: 'name',
          type: 'input',
          value: 'assistance-chat',
          required: true,
          placeholder: 'assistance-chat',
          label: 'Name',
        },
        {
          name: 'type',
          type: 'select',
          value: 'lib',
          required: true,
          options: ['lib'],
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
          value: '@ranthology/assistance/chat',
          required: true,
          placeholder: '@ranthology/assistance/chat',
          label: 'Import Path',
        },
        {
          name: 'generator',
          type: 'input',
          value:
            'nx generate @nx/workspace:lib --name=assistance-chat --directory=libs/assistance/chat --buildable=true --importPath=@ranthology/assistance/chat --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive',
          required: true,
          placeholder:
            'nx generate @nx/workspace:lib --name=assistance-chat --directory=libs/assistance/chat --buildable=true --importPath=@ranthology/assistance/chat --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive',
          label: 'Generator',
        },
      ],
    },
    {
      name: 'assistance-util',
      configType: 'library',
      description: 'A library for assistance utilities',
      fields: [
        {
          name: 'name',
          type: 'input',
          value: 'assistance-util',
          required: true,
          placeholder: 'assistance-util',
          label: 'Name',
        },
        {
          name: 'type',
          type: 'select',
          value: 'lib',
          required: true,
          options: ['lib'],
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
          value: '@ranthology/assistance/util',
          required: true,
          placeholder: '@ranthology/assistance/util',
          label: 'Import Path',
        },
        {
          name: 'generator',
          type: 'input',
          value:
            'nx generate @nx/workspace:lib --name=assistance-util --directory=libs/assistance/util --buildable=true --importPath=@ranthology/assistance/util --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive',
          required: true,
          placeholder:
            'nx generate @nx/workspace:lib --name=assistance-util --directory=libs/assistance/util --buildable=true --importPath=@ranthology/assistance/util --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive',
          label: 'Generator',
        },
      ],
    },
    {
      name: 'assistance-ai-app',
      configType: 'app',
      description: 'An application for AI assistance',
      fields: [
        {
          name: 'name',
          type: 'input',
          value: 'assistance-ai-app',
          required: true,
          placeholder: 'assistance-ai-app',
          label: 'Name',
        },
        {
          name: 'type',
          type: 'select',
          value: 'app',
          required: true,
          options: ['app'],
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
          value: '@ranthology/assistance/ai',
          required: true,
          placeholder: '@ranthology/assistance/ai',
          label: 'Import Path',
        },
        {
          name: 'generator',
          type: 'input',
          value:
            'nx generate @nx/workspace:app --name=assistance-ai-app --directory=apps/assistance/ai --importPath=@ranthology/assistance/ai --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=app --unitTestRunner=none --no-interactive',
          required: true,
          placeholder:
            'nx generate @nx/workspace:app --name=assistance-ai-app --directory=apps/assistance/ai --importPath=@ranthology/assistance/ai --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=app --unitTestRunner=none --no-interactive',
          label: 'Generator',
        },
      ],
    },
    {
      name: 'ui-react',
      configType: 'library',
      description: 'A library for UI components',
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
          value: 'lib',
          required: true,
          options: ['lib'],
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
            'nx generate @nx/workspace:lib --name=ui-react --directory=libs/ui/react --buildable=true --importPath=@ranthology/ui/react --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive',
          required: true,
          placeholder:
            'nx generate @nx/workspace:lib --name=ui-react --directory=libs/ui/react --buildable=true --importPath=@ranthology/ui/react --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive',
          label: 'Generator',
        },
      ],
    },
    {
      name: 'util',
      configType: 'library',
      description: 'A utility library',
      fields: [
        {
          name: 'name',
          type: 'input',
          value: 'util',
          required: true,
          placeholder: 'util',
          label: 'Name',
        },
        {
          name: 'type',
          type: 'select',
          value: 'lib',
          required: true,
          options: ['lib'],
          label: 'Type',
        },
        {
          name: 'scope',
          type: 'input',
          value: 'util',
          required: true,
          placeholder: 'util',
          label: 'Scope',
        },
        {
          name: 'importPath',
          type: 'input',
          value: '@ranthology/util',
          required: true,
          placeholder: '@ranthology/util',
          label: 'Import Path',
        },
        {
          name: 'generator',
          type: 'input',
          value:
            'nx generate @nx/workspace:lib --name=util --directory=libs/util --buildable=true --importPath=@ranthology/util --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive',
          required: true,
          placeholder:
            'nx generate @nx/workspace:lib --name=util --directory=libs/util --buildable=true --importPath=@ranthology/util --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive',
          label: 'Generator',
        },
      ],
    },
  ],
  dependencies: {
    "dynamic-avatar": [],
    "dynamic-form": [],
    "assistance-shell": [
      {
        source: "assistance-shell",
        target: "assistance-ai",
        type: "static",
      },
      {
        source: "assistance-shell",
        target: "ui-react",
        type: "static",
      },
      {
        source: "assistance-shell",
        target: "assistance-chat",
        type: "static",
      },
    ],
    "assistance-chat": [
      {
        source: "assistance-chat",
        target: "dynamic-avatar",
        type: "static",
      },
    ],
    "assistance-util": [],
    "assistance-ai": [
      {
        source: "assistance-ai",
        target: "ui-react",
        type: "static",
      },
      {
        source: "assistance-ai",
        target: "assistance-util",
        type: "static",
      },
      {
        source: "assistance-ai",
        target: "util",
        type: "static",
      },
      {
        source: "assistance-ai",
        target: "dynamic-avatar",
        type: "static",
      },
      {
        source: "assistance-ai",
        target: "dynamic-form",
        type: "static",
      },
    ],
    "assistance-ai-app": [
      {
        source: "assistance-ai-app",
        target: "assistance-shell",
        type: "static",
      },
    ],
    "ui-react": [
      {
        source: "ui-react",
        target: "util",
        type: "static",
      },
    ],
    "util": [],
  },
};


