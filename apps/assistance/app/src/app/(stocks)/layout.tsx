import { AssistanceStocksProvider } from '@wrkspce/assistance/feature/stocks';

export function AssistanceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AssistanceStocksProvider>{children}</AssistanceStocksProvider>;
}
export default AssistanceLayout;
