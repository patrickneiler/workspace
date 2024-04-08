export enum Linter {
    EsLint = "eslint",
    None = "none"
  }
  
  export type ProjectNameAndRootFormat = 'as-provided' | 'derived';
  export type SupportedStyles =
  | 'css'
  | 'scss'
  | 'less'
  | 'tailwind'
  | 'styled-components'
  | '@emotion/styled'
  | 'styled-jsx'
  | 'none';
  export interface NextLibrarySchema {
    name: string;
    directory?: string;
    projectNameAndRootFormat?: ProjectNameAndRootFormat;
    style: SupportedStyles;
    skipTsConfig?: boolean;
    skipFormat?: boolean;
    tags?: string;
    pascalCaseFiles?: boolean;
    routing?: boolean;
    appProject?: string;
    unitTestRunner: 'jest' | 'none';
    linter: Linter;
    component?: boolean;
    publishable?: boolean;
    buildable?: boolean;
    importPath?: string;
    js?: boolean;
    globalCss?: boolean;
    strict?: boolean;
    setParserOptionsProject?: boolean;
    skipPackageJson?: boolean;
    addPlugin?: boolean;
  }

  export interface ReactLibrarySchema {
    appProject?: string;
    buildable?: boolean;
    bundler?: 'none' | 'rollup' | 'vite';
    compiler?: 'babel' | 'swc';
    component?: boolean;
    directory?: string;
    projectNameAndRootFormat?: ProjectNameAndRootFormat;
    globalCss?: boolean;
    importPath?: string;
    inSourceTests?: boolean;
    js?: boolean;
    linter: Linter;
    name: string;
    pascalCaseFiles?: boolean;
    publishable?: boolean;
    routing?: boolean;
    setParserOptionsProject?: boolean;
    skipFormat?: boolean;
    skipPackageJson?: boolean;
    skipTsConfig?: boolean;
    strict?: boolean;
    style: SupportedStyles;
    tags?: string;
    unitTestRunner?: 'jest' | 'vitest' | 'none';
    minimal?: boolean;
    simpleName?: boolean;
    addPlugin?: boolean;
  }