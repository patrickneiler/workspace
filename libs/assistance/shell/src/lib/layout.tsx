import { AIProvider, Action, InteractionLayout } from '@wrkspce/assistance/feature/interaction';
import { Providers } from './providers';

// The AssistanceLayout component is a layout component that wraps the application so you can access AI and UI state in your components.
export function AssistanceLayout({
  actions,
  children,
}: Readonly<{
  actions: Action[],
  children: React.ReactNode;
}>) {
  return (
    // The AI provider is a context provider that wraps the application so you can access AI and UI state in your components.
    <InteractionLayout actions={actions}>
      <Providers
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="flex flex-col min-h-screen">
          <main className="flex flex-col flex-1 bg-muted/50 dark:bg-background">
            {children}
          </main>
        </div>
      </Providers>
    </InteractionLayout>
  );
}

export default AssistanceLayout;
