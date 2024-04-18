/**
 * Represents a dynamic form field.
 */
export interface DynamicFormField {
  /**
   * The name of the form field.
   */
  name: string;
  /**
   * The type of the form field.
   * Possible values: 'input', 'select', 'multi', 'checkbox', 'radio', 'file'.
   */
  type: 'date' | 'datetime-local' | 'email' | 'hidden' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week';
  /**
   * The options for the form field (only applicable for 'select' and 'multi' types).
   */
  options?: string[];
  /**
   * Specifies if the form field is required.
   */
  required?: boolean;
  /**
   * The placeholder text for the form field.
   */
  placeholder?: string;
  /**
   * The label for the form field.
   */
  label: string;
  /**
   * The value of the form field.
   */
  value: string;
  fields?: DynamicFormField[];
}

/**
 * Represents the props for a dynamic form component.
 */
export interface DynamicFormProps {
  /**
   * The fields to be rendered in the dynamic form.
   */
  fields: DynamicFormField[];
  groups?: string[];
  /**
   * The callback function to be called when the form is submitted.
   * @param formState The current state of the form.
   */
  onSubmit: (formState: DynamicFormField[]) => void;
}
