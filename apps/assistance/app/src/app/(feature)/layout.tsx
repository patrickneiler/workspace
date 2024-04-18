import { AssistanceFeatureProvider } from '@wrkspce/assistance/feature/core';

export function AssistanceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AssistanceFeatureProvider>{children}</AssistanceFeatureProvider>;
}
export default AssistanceLayout;
