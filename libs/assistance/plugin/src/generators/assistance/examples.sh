pnpm nx g @wrkspce/assistance/plugin:assistance-feature --name=stocks --tool.name='Purchase Stock' --tool.type='action' --tool.condition='User wants to purchase a stock' --tool.goal='Purchase a stock'  --tool.rules='["User will supply quantity", "Determine the symbol based on the user message", "Assistant should provide current price"]' --tool.parameters='[{"property":"symbol","type":"string","description":"The symbol of the stock"}, {"property": "quantity", "type":"string", "description":"The quantity of shares to purchase"}, {"property": "price", "type": "string", "description": "The latest price of the stock"}]' --tool.action='Confirm Purchase' --appPath="apps/assistance/app/src/app"

pnpm nx g @wrkspce/assistance/plugin:assistance-feature --name='DJ' --tool.name='Plan Sets' --tool.type='action' --tool.condition='The user asks to plan a set' --tool.goal='To help plan sets' --tool.rules='["The user will select songs and genres for the set", "The set duration must be specified"]' --tool.parameters='[{property: "songs", type: "string", description: "The list of songs to include in the set"}, {property: "genres", type: "string", description: "The list of genres for the set"}, {property: "duration", type: "string", description: "The duration of the set in minutes"}]' --tool.action='Plan Set' --appPath='apps/assistance/app/src/app'

pnpm nx g @wrkspce/assistance/plugin:assistance-feature --name='DJ Set Planner' --tool.name='Plan DJ Set' --tool.type='action' --tool.condition='The user asks for help planning a DJ set' --tool.goal='To help DJs plan their sets efficiently' --tool.rules='["The user will provide the type of event, their music preferences, and the set duration", "The tool will suggest tracks that fit the user's preferences and the event type"]' --tool.parameters='[{"property": "eventType", "type": "string", "description": "The type of event e.g., wedding, club night, private party"}, {"property": "musicPreferences", "type": "string", "description": "Your music preferences e.g., genres, artists, specific tracks"}, {"property": "setDuration", "type": "string", "description": "The duration of the DJ set in hours"}]' --tool.action='Generate Setlist' --appPath='undefined'


pnpm nx g @wrkspce/assistance/plugin:assistance-feature
    --name='Orders'
    --tool.name='Order Help'
    --tool.type='action'
    --tool.condition='The user asks for help with an order'
    --tool.goal='To provide assistance for orders'
    --tool.rules='["The user must provide the order ID", "The user must specify the type of assistance needed"]'
    --tool.parameters='[{property: "orderID", type: "string", description: "The unique identifier for the order"}, {property: "actionType", type: "string", description: "The type of assistance needed for the order"}]'
    --tool.action='Assist Order'
    --appPath='apps/assistance/app/src/app'
    --dry-run

    pnpm nx g @wrkspce/assistance/plugin:assistance-feature
    --name='Orders'
    --tool.name='Assist Order'
    --tool.type='action'
    --tool.condition='The user asks for help with an order'
    --tool.goal='To provide assistance for orders'
    --tool.rules='"[\"The user must provide the order ID\", \"The user must specify the type of assistance needed\"]"'
    --tool.parameters='"[{property: \"orderID\", type: \"string\", description: \"The unique identifier of the order\"}, {property: \"actionType\", type: \"string\", description: \"The type of assistance needed for the order\"}]"'
    --tool.action='Assist'
    --appPath='apps/assistance/app/src/app'
    --dry-run
    --verbose

    pnpm nx g @wrkspce/assistance/plugin:assistance-feature
    --name='Orders'
    --tool.name='Order Help'
    --tool.type='action'
    --tool.condition='The user asks for help with an order'
    --tool.goal='To provide assistance for orders'
    --tool.rules='["The user must have an existing order to request assistance", "The issue with the order should be clearly described"]'
    --tool.parameters='[{property: "issue", type: "string", description: "The issue with the order"}, {property: "orderId", type: "string", description: "The ID of the order"}]'
    --tool.action='Assist Order'
    --appPath='apps/assistance/app/src/app'
    --dry-run
    --verbose

    pnpm nx g @wrkspce/assistance/plugin:assistance-feature
    --name='Orders'
    --tool.name='Assist Order'
    --tool.type='action'
    --tool.condition='The user asks for help with an order'
    --tool.goal='To provide assistance for managing orders'
    --tool.rules='["The user must provide the order ID", "The user must specify the type of assistance needed"]'
    --tool.parameters='[{"property": "orderID", "type": "string", "description": "The unique identifier for the order"}, {"property": "actionType", "type": "string", "description": "The type of assistance needed for the order"}]'
    --tool.action='Provide Assistance'
    --appPath='apps/assistance/app/src/app'
    --dry-run
    --verbose

    [{"property": "item", "type": "string", "description": "The name of the item"}, {"property": "quantity", "type": "string", "description": "The quantity of the item"}, {"property": "price", "type": "string", "description": "The price of the item. If not provided, the assistant will estimate a price"}]

    [{"property": "orderID", "type": "string", "description": "The unique identifier for the order"}, {"property": "actionType", "type": "string", "description": "The type of assistance needed for the order"}]

    [{"property": "issue", "type": "string", "description": "The issue with the order"}, {"property": "orderId", "type": "string", "description": "The ID of the order"}]

    [{"property": "orderID", "type": "string", "description": "The unique identifier for the order"}, {"property": "actionType", "type": "string", "description": "The type of assistance needed for the order"}]

    [{"property": "orderID", "type": "string", "description": "The unique identifier for the order"}, {"property": "actionType", "type": "string", "description": "The type of assistance needed for the order"}]

    [{"property": "orderID", "type": "string", "description": "The unique identifier for the order"}, {"property": "actionType", "type": "string", "description": "The type of assistance needed for the order"}]

    [{"property": "orderID", "type": "string", "description": "The unique identifier for the order"}, {"property": "actionType", "type": "string", "description": "The type of assistance needed for the order"}]

    [{"property": "orderID", "type": "string", "description": "The unique identifier for the order"}, {"property": "actionType", "type": "string", "description": "The type of assistance needed for the order"}]

    [{"property": "orderID", "type": "string", "description": "The unique identifier for the order"}, {"property": "actionType", "type": "string", "description": "The type of assistance needed for the order"}]

    [{"property": "orderID", "type": "string", "description": "The unique identifier for the order"}, {"property": "actionType", "type": "string", "description": "The type of assistance needed for the order"}]

    [{"property": "orderID", "type": "string", "description": "The unique identifier for the order"},