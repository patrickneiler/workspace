nx g @wrkspce/assistance/plugin:assistance-feature --name=orders --tool.name='Generate Order' --tool.type='action' --tool.condition='User wants to generate an order' --tool.goal='Generate an order'  --tool.rules=["User must have a cart with items", "User must have an item"] --tool.parameters=[{"property":"cartId","type":"string","description":"The ID of the cart to generate the order from"}] --tool.action='Confirm Order'
nx g @wrkspce/assistance/plugin:assistance-feature --name=orders --tool.name='Generate Order' --tool.type='action' --tool.condition='User wants to generate an order' --tool.goal='Generate an order'  --tool.rules.0='User must have a cart with items' --tool.rules.1='User must have an item' --tool.parameters.0.property='cartId' --tool.parameters.0.type='string' --tool.parameters.0.description='The ID of the cart to generate the order from' --tool.action='Confirm Order'
`{
  name: 'Generate Order',
  type: 'action',
  condition: 'User wants to generate an order',
  goal: 'Generate an order',
  rules: ['User must have a cart with items'],
  parameters: [
    {
      property: 'cartId',
      type: 'string',
      description: 'The ID of the cart to generate the order from'
    }
  ],
  action: 'Confirm Order' 
}`

pnpm nx g @wrkspce/assistance/plugin:assistance-feature --options='{"name":"Generate Order","type":"action","condition":"User wants to generate an order","goal":"Generate an order","rules":'["User must have a cart with items"]',"parameters":'[{"property":"cartId","type":"string","description":"The ID of the cart to generate the order from"}]',"action":"Confirm Order"}';

pnpm nx g @wrkspce/assistance/plugin:assistance-feature --name=orders --tool.name='Generate Order' --tool.type='action' --tool.condition='User wants to generate an order' --tool.goal='Generate an order'  --tool.rules='["User must have a cart with items", "User must have an item"]' --tool.parameters='[{"property":"cartId","type":"string","description":"The ID of the cart to generate the order from"}]' --tool.action='Confirm Order'