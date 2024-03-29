'use client';

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '@wrkspce/shared/util';

/**
 * A custom separator component.
 */
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  /**
   * Renders the separator component.
   * @param {object} props - The component props.
   * @param {string} props.className - Additional CSS class names for the separator.
   * @param {string} props.orientation - The orientation of the separator. Defaults to 'horizontal'.
   * @param {boolean} props.decorative - Whether the separator is decorative. Defaults to true.
   * @returns {JSX.Element} The rendered separator component.
   */
  (
    { className, orientation = 'horizontal', decorative = true, ...props },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className,
      )}
      {...props}
    />
  ),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
