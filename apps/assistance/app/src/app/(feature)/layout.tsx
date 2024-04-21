import { AssistanceFeatureProvider } from '@wrkspce/assistance/feature/root';

export function AssistanceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AssistanceFeatureProvider>{children}</AssistanceFeatureProvider>;
}
export default AssistanceLayout;
