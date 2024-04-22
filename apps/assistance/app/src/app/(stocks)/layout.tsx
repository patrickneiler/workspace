import { AssistanceStocksProvider } from '@wrkspce/assistance/feature/stocks';

export default function AssistanceStocksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AssistanceStocksProvider>{children}</AssistanceStocksProvider>;
}
