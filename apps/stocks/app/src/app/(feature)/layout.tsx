import { AssistanceFeatureProvider } from '@wrkspce/assistance/feature/root';

export default function AssistanceFeatureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AssistanceFeatureProvider>{children}</AssistanceFeatureProvider>;
}
