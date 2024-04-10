import { DynamicFormField } from "@wrkspce/shared/feature/form";

/**
 * Represents an abstract configuration in a workspace.
 */
export interface GenerateProjectParameters {
    /**
     * The name of the configuration.
     */
    name: string;
    /**
     * The type of the configuration.
     * Possible values: 'workspace', 'library', 'module', 'app'.
     */
    configType: 'workspace' | 'library' | 'module' | 'app' | 'e2e';
    scope?: string;
    /**
     * The description of the configuration.
     */
    description?: string;
    /**
     * The fields of the configuration.
     */
    fields?: DynamicFormField[];
    /**
     * The child configurations of the configuration.
     */
    children?: GenerateProjectParameters[];
    /**
     * The dependencies of the configuration.
     */
    dependencies?: string[]
}