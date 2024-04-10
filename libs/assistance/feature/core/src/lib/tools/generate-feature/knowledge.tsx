import { GenerateFeatureParameters } from "@wrkspce/assistance/domain";

export const snapshot: GenerateFeatureParameters = {
    name: 'Stocks',
    tool: {

        name: 'Purchase Stocks',
        type: 'action',
        instructions: 'This tool allows you to purchase stocks.',
        parameters: '[{property: "name", type: "string", description: "The name of the stock"}, {property: "quantity", type: "number", description: "The quantity of the stock to purchase"}, {property: "price", type: "number", description: "The price of the stock"}]',
        rules: '["The user will supply the name of the stock and the quantity to purchase", "You will provide the price of the stock"]',
        goal: 'To purchase stocks',
        condition: 'The user asks to purchase stocks',
        action: 'Confirm Purchase',
    },
    appPath: 'apps/assistance/app/src/app',
};