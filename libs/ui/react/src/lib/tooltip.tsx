'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@ranthology/util';

/**
 * Provides a tooltip component that can be used to display additional information
 * when hovering or interacting with other elements.
 */
const TooltipProvider = TooltipPrimitive.Provider;

/**
 * Represents the root element of a tooltip.
 */
const Tooltip = TooltipPrimitive.Root;

/**
 * Represents the trigger element that activates the tooltip.
 */
const TooltipTrigger = TooltipPrimitive.Trigger;

/**
 * Represents the content of a tooltip.
 */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(
  /**
   * Renders the content of the tooltip.
   * @param className - The CSS class name for the tooltip content.
   * @param sideOffset - The offset of the tooltip from the trigger element.
   * @param props - Additional props for the tooltip content.
   * @param ref - The ref to attach to the tooltip content.
   * @returns The rendered tooltip content.
   */
  ({ className, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-xs font-medium text-popover-foreground shadow-md animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1',
        className,
      )}
      {...props}
    />
  )
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
