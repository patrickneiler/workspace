import { Action } from '../domain';
import { AIProvider } from './provider';

// The AssistanceLayout component is a layout component that wraps the application so you can access AI and UI state in your components.
export function InteractionLayout({
    actions,
    children,
}: Readonly<{
    actions: Action[],
    children: React.ReactNode;
}>) {
    return (
        // The AI provider is a context provider that wraps the application so you can access AI and UI state in your components.
        <AIProvider actions={actions}>
            {children}
        </AIProvider>
    );
}

export default InteractionLayout;

