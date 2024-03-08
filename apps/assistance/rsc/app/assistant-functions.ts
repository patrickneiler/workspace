import z from 'zod';
export const ASSISTANT_FUNCTIONS = [
    {
        name: "createScopeConfig",
        description: "Create a scope configuration",
        parameters: z.object({
          name: z.string().describe('Name of the scope'),
          features: z.array(
            z.object({}).describe("Array of LibraryConfig objects")
          ).describe("Feature libraries of the scope"),
          domain: z.object({}).describe("Domain of the scope as a LibraryConfig object")
        }).required()
      },
    {
        name: 'createLibraryConfig',
        description: 'Create a library configuration',
        parameters: z.object({
          framework: z.string().describe('Framework used'),
          name: z.string().describe('Name of the library'),
          scope: z.string().describe('Scope that library is in. e.g. "shared" or "assistant"'),
          importPath: z.string().describe('Import path for the library e.g. "@ranthology/shared/feature/react"'),
          generator: z.string().describe('NX Generator script used for the library. e.g. "nx generate @nx/react:library --name=assistance-feature-react --directory=assistance/feature/react --buildable=true --component=false --importPath=@ranthology/assistance/feature/react --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive"'),
          exports: z.array(z.object({})).describe('Module configuration'),
        }).required(),
      },
    {
        name: 'createModuleConfig',
        description: 'Create a library module configuration',
        parameters: 
        z.object({
            name: z.string().describe('Name of the module'),
            type: z.enum(['hook', 'host-component', 'functional-component', 'page', 'server', 'state', 'import']).describe('Type of the module'),
            description: z.string().describe('Description of the module'),
            tags: z.array(z.string()).describe('Tags associated with the module'),
            children: z.array(z.string()).describe('Children of the module'),
            readme: z.record(z.string()).describe('Readme of the module'),
            task: z.record(z.string()).describe('Task of the module'),
            options: z.record(z.string()).describe('Options of the module'),
            state: z.object({
            properties: z.record(
                z.object({
                    type: z.string(),
                    description: z.string(),
                })
                ).describe('State properties of the module'),
          }),
          generator: z.string().describe('Generator of the module'),
          props: z.string().describe('Props of the module'),
          importPath: z.string().describe('Import path of the module'),
        }),
      },
]
export const EXAMPLE_FUNCTIONS = [
    {
      name: 'show_stock_price',
      description:
        'Get the current stock price of a given stock or currency. Use this to show the price to the user.',
      parameters: z.object({
        symbol: z
          .string()
          .describe(
            'The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD.',
          ),
        price: z.number().describe('The price of the stock.'),
        delta: z.number().describe('The change in price of the stock'),
      }),
    },
    {
      name: 'show_stock_purchase_ui',
      description:
        'Show price and the UI to purchase a stock or currency. Use this if the user wants to purchase a stock or currency.',
      parameters: z.object({
        symbol: z
          .string()
          .describe(
            'The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD.',
          ),
        price: z.number().describe('The price of the stock.'),
        numberOfShares: z
          .number()
          .describe(
            'The **number of shares** for a stock or currency to purchase. Can be optional if the user did not specify it.',
          ),
      }),
    },
    {
      name: 'list_stocks',
      description: 'List three imaginary stocks that are trending.',
      parameters: z.object({
        stocks: z.array(
          z.object({
            symbol: z.string().describe('The symbol of the stock'),
            price: z.number().describe('The price of the stock'),
            delta: z.number().describe('The change in price of the stock'),
          }),
        ),
      }),
    },
    {
      name: 'get_events',
      description:
        'List funny imaginary events between user highlighted dates that describe stock activity.',
      parameters: z.object({
        events: z.array(
          z.object({
            date: z
              .string()
              .describe('The date of the event, in ISO-8601 format'),
            headline: z.string().describe('The headline of the event'),
            description: z.string().describe('The description of the event'),
          }),
        ),
      }),
    },
  ];