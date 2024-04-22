import { Itim, Fira_Code } from "next/font/google";
// Will break at build. Waiting for https://github.com/shadcn-ui/ui/issues/2377
const itim_init = Itim({ weight: '400', subsets: ['latin'], variable: '--font-itim' });
const fira_code_init = Fira_Code({ weight: '400', subsets: ['latin'], variable: '--font-fira-code' });

export const itim = itim_init.variable;
export const fira_code = fira_code_init.variable;
