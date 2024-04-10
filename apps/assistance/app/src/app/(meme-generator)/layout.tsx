import { AssistanceMemeGeneratorProvider } from '@wrkspce/assistance/feature/meme-generator';

export function AssistanceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AssistanceMemeGeneratorProvider>
      {children}
    </AssistanceMemeGeneratorProvider>
  );
}
export default AssistanceLayout;
