import { AI } from '@ranthology/assistance/ai';
import { Providers } from './providers';

export function AssistanceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
