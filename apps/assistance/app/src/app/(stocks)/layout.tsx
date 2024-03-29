
import { AssistanceWorkspaceProvider } from '@wrkspce/assistance/feature/workspace';
// Import the assistance layout from the scoped package.

export function AssistanceWorkspace({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AssistanceWorkspaceProvider>
      {children}
    </AssistanceWorkspaceProvider>
  );
}
export default AssistanceWorkspace;
