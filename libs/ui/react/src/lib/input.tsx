import * as React from 'react';

import { cn } from '@ranthology/util';

/**
 * Props for the Input component.
 */
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

/**
 * A custom input component.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  /**
   * Renders the input element.
   * @param className - The CSS class name for the input element.
   * @param type - The type of the input element.
   * @param props - Additional input element attributes.
   * @param ref - The ref to forward to the input element.
   * @returns The rendered input element.
   */
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
