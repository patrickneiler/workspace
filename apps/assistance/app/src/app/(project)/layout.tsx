import { AssistanceProjectProvider } from '@wrkspce/assistance/feature/project';

export function AssistanceWorkspace({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AssistanceProjectProvider>{children}</AssistanceProjectProvider>;
}
export default AssistanceWorkspace;
