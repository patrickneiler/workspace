import { AssistanceChat } from '@wrkspce/assistance/ui/chat';
import { SharedFeatureJourney } from '@wrkspce/shared/feature/journey';
const StockJourney = {
    subject: {
        name: 'Stock Grabber',
        title: 'Stock Purchasing App',
        about: 'I work for a company that created a stock purchasing app that helps users purchase stocks. I am looking to add a new feature that allows users to purchase stocks using an AI assistant.',
    },
    steps: [
        {
            title: 'Installing Workspace/Assistance',
            story: 'I start by installing the workspace and the assistance for the app feature.',
            action: {
                label: 'Install Workspace/Assistance',
                code: 'npm install @wrkspce/assistance'
            }
        },
        {
            title: 'Adding Assistance to App',
            story: 'Next, I add the @wrkspce/assistant provider and chat to our app',
            action: {
                label: 'Import Provider and Chat',
                code: 'import {AssistanceProvider} from "@wrkspce/assistance"'
            }
        },
        {
            title: 'Generating New Assistant',
            story: 'I run the app and ask navigate to the chat. I ask the assistant to create an assistant that helps our customers purchase stocks.',
            action: {
                label: 'Chat Prompt',
                code: 'Create an assistance feature that helps users purchase stocks.'
            }
        },
        {
            title: 'Configuring New Assistant',
            story: ' I receive back a form to configure the assistant, with the fields prefilled based on the assistants assumptions. I change the fields for "properties" to match our internal order ddata-structure, and add a few examples of completed order forms',
            action: {
                label: 'Customize Parameters',
                code: '[{property: "name", type: "string", description: "The name of the stock"}, {property: "quantity", type: "number", description: "The quantity of the stock to purchase"}, {property: "price", type: "number", description: "The price of the stock"}]'
            }
        },
        {
            title: 'Generate Feature',
            story: 'After submitting my configuration, I receive a message containing a script. I open my terminal, paste the script and run it. I see new projects in my workspace for assistance/feature/stocks, and assistance/feature/ui',
            action: {
                label: 'Run NX Script',
                code: `pnpm nx g @wrkspce/assistance/plugin:assistance-feature --name=stocks --tool.name='Purchase Stock' --tool.type='action' --tool.condition='User wants to purchase a stock' --tool.goal='Purchase a stock'  --tool.rules='["User will supply quantity", "Determine the symbol based on the user message", "Assistant should provide current price"]' --tool.parameters='[{"property":"symbol","type":"string","description":"The symbol of the stock"}, {"property": "quantity", "type":"string", "description":"The quantity of shares to purchase"}, {"property": "price", "type": "string", "description": "The latest price of the stock"}]' --tool.action='Confirm Purchase' --appPath="apps/assistance/app/src/app"`
            }
        },
        {
            title: 'Customizing Purchase UI',
            story: 'I navigate to the assistance/ui/stocks directory and see a component for the tool that I defined. The component is already set up to handle confirmation of the purchase. I replace the prebuilt React form component with our existing order form',
            action: {
                label: 'Customize UI',
                code: `
export const PurchaseStock = ({
  params,
}: {
  params: PurchaseStockParameters;
}) => {
  //...

  const handleConfirmPurchase = async (fields: DynamicFormField[]) => {
    const response = await confirmPurchase({
      params,
      ...fields,
    });
    setUi(response.display);
  };

  return (
    //...
          <BotCard>Absolutely! Take a look and review:</BotCard>
          <FunctionFormCard heading="Purchase Stock">
            <DynamicForm fields={fields} onSubmit={handleConfirmPurchase} />
          </FunctionFormCard>
    );
  };         `
            }
        },
        {
            title: 'Handling Action',
            story: 'I implement logic to call our service for handling orders and pass in the parameters.',
            action: {
                label: 'Confirm and Execute Purchase',
                code: `const handleConfirmPurchase = async (fields: DynamicFormField[]) => {
    const purchaseId = await Purchasing.createPurchase(fields);
    const response = await confirmPurchase({
      ...params,
      purchaseId
    });
    setUi(response.display);
  };`
            }
        },
        {
            title: 'Customizing Confirmation UI',
            story: 'I navigate to the assistance/ui/stocks directory and see a component for action. I replace the default component with our existing order confirmation component',
            action: {
                label: 'Custimize Confirmation UI',
                code: `
export function ConfirmPurchase({
  params,
}: {
  params: PurchaseStockParameters;
}) {
  return (
    <Card size="1">
      <Box>
        <PurchaseConfirmation purchaseId={params.purchaseId}></PurchaseConfirmation>
      </Box>
    </Card>
  );
}

export default ConfirmPurchase;;`
            }
        },
    ],
}

const HealthDataJourney = {
    subject: {
        name: 'Health Data',
        title: 'Health Data App',
        about: 'I work for a company that created a health data app that helps users track their health data. I am looking to add a new feature that allows users to track their health data using an AI assistant.',
    },
    steps: [
        {
            title: 'Installing Workspace/Assistance',
            story: 'I start by installing the workspace and the assistance for the app feature.',
            action: {
                label: 'Install Workspace/Assistance',
                code: 'npm install @wrkspce/assistance'
            }
        },
        {
            title: 'Adding Assistance to App',
            story: 'Next, I add the @wrkspce/assistant provider and chat to our app',
            action: {
                label: 'Import Provider and Chat',
                code: 'import {AssistanceProvider} from "@wrkspce/assistance"'
            }
        },
        {
            title: 'Generating New Assistant',
            story: 'I run the app and ask navigate to the chat. I ask the assistant to create an assistant that helps our customers track their health data.',
            action: {
                label: 'Chat Prompt',
                code: 'Create an assistance feature that helps users track their health data.'
            }
        },
        {
            title: 'Configuring New Assistant',
            story: ' I receive back a form to configure the assistant, with the fields prefilled based on the assistants assumptions. I change the fields for "properties" to match our internal order ddata-structure, and add a few examples of completed order forms',
            action: {
                label: 'Customize Parameters',
                code: '[{property: "name", type: "string", description: "The name of the health data"}, {property: "quantity", type: "number", description: "The quantity of the health data to track"}, {property: "price", type: "number", description: "The price of the health data"}]'
            }
        },
        {
            title: 'Generate Feature',
            story: 'After submitting my configuration, I receive a message containing a script. I open my terminal, paste the script and run it. I see new projects in my workspace for assistance/feature/health, and assistance/feature/ui',
            action: {
                label: 'Run NX Script',
                code: `pnpm nx g @wrkspce/assistance/plugin:assistance-feature --name=health --tool.name='Track Health Data' --tool.type='action' --tool.condition='User wants to track health data' --tool.goal='Track health data'  --tool.rules='["User will supply quantity", "Determine the symbol based on the user message", "Assistant should provide current price"]' --tool.parameters='[{"property":"symbol","type":"string","description":"The symbol of the health data"}, {"property": "quantity", "type": "string", "description":"The quantity of health data to track"}, {"property": "price", "type": "string", "description": "The latest price of the health data"}]' --tool.action='Confirm Track' --appPath="apps/assistance/app/src/app"`
            }
        },
        {
            title: 'Customizing Purchase UI',
            story: 'I navigate to the assistance/ui/health directory and see a component for the tool that I defined. The component is already set up to handle confirmation of the purchase. I replace the prebuilt React form component with our existing order form',
            action: {
                label: 'Customize UI',
                code: `
export const TrackHealthData = ({
  params,
}: {
  params: TrackHealthDataParameters;
}) => {
  //...

  const handleConfirmTrack = async (fields: DynamicFormField[]) => {
    const response = await confirmTrack({
      params,
      ...fields,
    });
    setUi(response.display);
  };

  return (
    //...
          <BotCard>Absolutely! Take a look and review:</BotCard>
          <FunctionFormCard heading="Track Health Data">
            <DynamicForm fields={fields} onSubmit={handleConfirmTrack} />
          </FunctionFormCard>
    );
  };         `
            }
        },
        {
            title: 'Handling Action',
            story: 'I implement logic to call our service for handling orders and pass in the parameters.',
            action: {
                label: 'Confirm and Execute Track',
                code: `const handleConfirmTrack = async (fields: DynamicFormField[]) => {
    const trackId = await Tracking.createTrack(fields);
    const response = await confirmTrack({
      ...params,
      trackId
    });
    setUi(response.display);
  };`
            }
        },
        {
            title: 'Customizing Confirmation UI',
            story: 'I navigate to the assistance/ui/health directory and see a component for action. I replace the default component with our existing order confirmation component',
            action: {
                label: 'Custimize Confirmation UI',
                code: `
export function ConfirmTrack({
  params,
}: {
  params: TrackHealthDataParameters;
}) {
  return (
    <Card size="1">
      <Box>
        <TrackConfirmation trackId={params.trackId}></TrackConfirmation>
      </Box>
    </Card>
  );
}`,
            }
        },
    ],
}


const journeys = [
    StockJourney,
    HealthDataJourney
]

const AssistancePage = () => {
    return <AssistanceChat empty={<SharedFeatureJourney journies={journeys}></SharedFeatureJourney>} />;
};
export default AssistancePage;