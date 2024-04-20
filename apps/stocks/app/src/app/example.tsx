const parameters = [{ "property": "symbol", "type": "string", "description": "The ticker of the stock" }, { "property": "price", "type": "number", "description": "The price of the stock" }, { "property": "delta", "type": "number", "description": "change in price" }]
const script = `
pnpm nx g @wrkspce/assistance/plugin:assistance-feature
    --name='Stocks'
    --tool.name='View Stock'
    --tool.type='async'
    --tool.condition='The user asks to view a stock price'
    --tool.goal='To view the price of a stock'
    --tool.rules='["The user must provide the name of the stock to view its price"]'
    --tool.parameters='[{ "property": "symbol", "type": "string", "description": "The ticker of the stock" }, { "property": "price", "type": "number", "description": "The price of the stock" }, { "property": "delta", "type": "number", "description": "change in price" }]'
    --tool.action='Show Price'
    --appPath='apps/stocks/app/src/app'
`