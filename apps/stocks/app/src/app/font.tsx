import { Saira } from "next/font/google";
// Will break at build. Waiting for https://github.com/shadcn-ui/ui/issues/2377
const saira_init = Saira({ subsets: ['latin'], variable: '--font-saira' });
export const saira = saira_init.variable;
