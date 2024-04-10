import { AssistanceOrdersProvider } from '@wrkspce/assistance/feature/orders';

export function AssistanceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AssistanceOrdersProvider>{children}</AssistanceOrdersProvider>;
}
export default AssistanceLayout;
