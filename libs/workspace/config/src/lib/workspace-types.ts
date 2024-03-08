interface BaseConfig {
  name: string;
  type: string;
  description: string;
  tags?: string[];
}

interface WorkspaceConfig extends BaseConfig {
  git: {
    repo: string;
    branch: string;
    url: string;
  };
  dependencies?: {
    [key: string]: string;
  };
  nxDependencies?: {
    [key: string]: string;
  };
  libs: ScopeConfig[];
}

interface ScopeConfig extends BaseConfig {
  features: LibraryConfig[];
  domain?: LibraryConfig;
  ui?: LibraryConfig;
  util?: LibraryConfig;
}

interface LibraryConfig extends BaseConfig {
  framework: string;
  name: string;
  importPath: string;
  generator: string;
  lib?: ModuleConfig[];
  exports?: string[];
}

interface ModuleConfig extends BaseConfig {
  type:
    | 'hook'
    | 'host-component'
    | 'functional-component'
    | 'page'
    | 'server'
    | 'state'
    | 'import';
  generator?: string;
  options?: {
    description: string;
    properties: {
      [key: string]: {
        type: string;
        description: string;
      };
    };
  };
  state?: {
    description: string;
    properties: {
      [key: string]: {
        type: string;
        description: string;
      };
    };
  };
  imports?: {
    [key: string]: {
      value: string;
      description: string;
    };
  };
  children?: string[];
}

export type { WorkspaceConfig, LibraryConfig, ScopeConfig, ModuleConfig };
