import { AI } from '@ranthology/assistance/ai';
import { Providers } from './providers';

// The AssistanceLayout component is a layout component that wraps the application so you can access AI and UI state in your components.
export function AssistanceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The AI provider is a context provider that wraps the application so you can access AI and UI state in your components.
    <AI>
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
    </AI>
  );
}

export default AssistanceLayout;
