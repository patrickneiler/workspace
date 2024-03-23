// This defines an abstract field which can be used to construct a form field within a dynamic form
export interface WorkspaceField {
  name: string;
  type: 'input' | 'select' | 'multi' | 'checkbox' | 'radio' | 'file';
  value: any;
  label: string;
  options?: string[];
  required?: boolean;
  placeholder?: string;
}

// This defines an abstract configuration which has an optional array of properties
export interface WorkspaceParameters {
  name: string;
  configType: 'workspace' | 'library' | 'module' | 'app';
  description?: string;
  fields?: WorkspaceField[];
  children?: WorkspaceParameters[];
}
