'use client';
import { IconAI, IconUser } from './icons';
import { Callout, Card } from '@radix-ui/themes';
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { cn } from '@ranthology/util';
import { spinner } from './spinner';

/**
 * Renders a user message component.
 * @param children - The content of the user message.
 * @returns The user message component.
 */
export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-background">
        <IconUser />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        {children}
      </div>
    </div>
  );
}

/**
 * Renders a bot message component.
 * @param children - The content of the bot message.
 * @param className - Additional CSS class name(s) for the bot message component.
 * @param showAvatar - Whether to show the avatar for the bot message. Default is true.
 * @returns The bot message component.
 */
export function BotMessage({
  children,
  className,
  showAvatar = true,
}: {
  children: React.ReactNode;
  className?: string;
  showAvatar?: boolean;
}) {
  return (
    <div className={cn('group relative flex items-start md:-ml-12', className)}>
      <div className={cn(
        'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-primary text-primary-foreground',
        !showAvatar && 'invisible',
      )}>
        <IconAI />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        {children}
      </div>
    </div>
  );
}

/**
 * Renders a bot card component.
 * @param children - The content of the bot card.
 * @param showAvatar - Whether to show the avatar for the bot card. Default is true.
 * @returns The bot card component.
 */
export function BotCard({
  children,
  showAvatar = true,
}: {
  children: React.ReactNode;
  showAvatar?: boolean;
}) {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-primary text-primary-foreground',
          !showAvatar && 'invisible',
        )}
      >
        <IconAI />
      </div>
      <div className="ml-4 flex-1 px-1">{children}</div>
    </div>
  );
}

/**
 * Renders a system message component.
 * @param children - The content of the system message.
 * @returns The system message component.
 */
export function SystemMessage({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Callout.Root color="green">
        <Callout.Icon>
          <CheckCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          {children}
        </Callout.Text>
      </Callout.Root>
    </div>
  );
}

/**
 * Renders a function card component.
 * @param children - The content of the function card.
 * @returns The function card component.
 */
export function FunctionCard({ children }: { children: React.ReactNode }) {
  return (
    <Card variant="classic" size="4" style={{ width: '100%' }}>
      {children}
    </Card>
  )
}

/**
 * Renders a spinner message component.
 * @param children - The content of the spinner message.
 * @param className - Additional CSS class name(s) for the spinner message component.
 * @returns The spinner message component.
 */
export const SpinnerMessage = ({ children,
  className }: {
    children: React.ReactNode;
    className?: string;
    showAvatar?: boolean;
  }) => {
  return (
    <div className={cn('group relative flex items-start md:-ml-12', className)}>
      <div className={cn(
        'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-primary text-primary-foreground',
      )}>
        {spinner}
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        {children}
      </div>
    </div>
  );
};
