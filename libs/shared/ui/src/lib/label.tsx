'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@wrkspce/shared/util';

/**
 * Variants for the label component.
 */
const labelVariants = cva(
  'text-sm mt-4 mb-2 text-zinc-500 font-medium uppercase block leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
);

/**
 * A custom label component.
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>
>(
  /**
   * Renders the label component.
   * @param {React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>} props - The component props.
   * @param {React.Ref<React.ElementRef<typeof LabelPrimitive.Root>>} ref - The component ref.
   * @returns {JSX.Element} The rendered label component.
   */
  ({ className, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      {...props}
    />
  ),
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
