import { AssistanceFeatureProvider } from '@wrkspce/assistance/feature/root';

export default function AssistanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AssistanceFeatureProvider>{children}</AssistanceFeatureProvider>;
}
