/**
 * Represents a dependency between two entities.
 */
interface Dependency {
  source: string;
  target: string;
  type: string;
}

/**
 * Represents a field within a dynamic form in a workspace.
 */
export interface WorkspaceField {
  /**
   * The name of the field.
   */
  name: string;
  /**
   * The type of the field.
   * Possible values: 'input', 'select', 'multi', 'checkbox', 'radio', 'file'.
   */
  type: 'input' | 'select' | 'multi' | 'checkbox' | 'radio' | 'file';
  /**
   * The value of the field.
   */
  value: any;
  /**
   * The label of the field.
   */
  label: string;
  /**
   * The options for the field (only applicable for 'select' type).
   */
  options?: string[];
  /**
   * Indicates if the field is required.
   */
  required?: boolean;
  /**
   * The placeholder text for the field.
   */
  placeholder?: string;
}

/**
 * Represents an abstract configuration in a workspace.
 */
export interface WorkspaceParameters {
  /**
   * The name of the configuration.
   */
  name: string;
  /**
   * The type of the configuration.
   * Possible values: 'workspace', 'library', 'module', 'app'.
   */
  configType: 'workspace' | 'library' | 'module' | 'app';
  /**
   * The description of the configuration.
   */
  description?: string;
  /**
   * The fields of the configuration.
   */
  fields?: WorkspaceField[];
  /**
   * The child configurations of the configuration.
   */
  children?: WorkspaceParameters[];
  /**
   * The dependencies of the configuration.
   */
  dependencies?: {
    [key: string]: Dependency[];
  };
}