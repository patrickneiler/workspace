import { AssistanceChat } from '@wrkspce/assistance/ui/chat';
import { SharedFeatureJourney } from '@wrkspce/shared/feature/journey';
const StockJourney = {
  subject: {
    name: 'Stock Grabber',
    title: 'Stock Purchasing App',
    about: 'I work for a company that created a stock purchasing app that helps users purchase stocks. I am looking to add a new feature that allows users to purchase stocks using an AI assistant.',
  },
  steps: [
    // {
    //   title: 'Installation',
    //   story: '',
    //   action: {
    //     label: '',
    //     code: 'npm install @wrkspce/assistance'
    //   }
    // },
    // {
    //   title: 'Add Provider',
    //   story: 'Next, add the @wrkspce/assistance provider to your app',
    //   action: {
    //     label: '',
    //     code: 'import {AssistanceProvider} from "@wrkspce/assistance"'
    //   }
    // },
    {
      title: 'Creating an Assistance Feature',
      story: 'Run the app and ask the assistant to create a feature that helps accomplish a task.',
      action: {
        label: 'Example Prompt',
        code: 'Create an assistance feature that helps users purchase stocks.'
      }
    },
    {
      title: 'Configuring Assistant',
      story: ' The assistant will return a form prefilled based on assumptions.',
      action: {
        label: 'Example Parameters',
        code: '[{property: "name", type: "string", description: "The name of the stock"}, {property: "quantity", type: "number", description: "The quantity of the stock to purchase"}, {property: "price", type: "number", description: "The price of the stock"}]'
      }
    },
    {
      title: 'Generate Feature',
      story: 'Run the provided script. You will see two new projects in your workspace within assistance/feature/{feature-name}, and assistance/ui/{feature-name}',
      action: {
        label: 'bash',
        code:
          `pnpm nx g @wrkspce/assistance/plugin:assistance-feature
--name=stocks
--tool.name='Purchase Stock'
--tool.type='action'
--tool.condition='User wants to purchase a stock'
--tool.goal='Purchase a stock'
--tool.rules='["User will supply quantity", ...]'
--tool.parameters='[{"property":"symbol", ...}]'
--tool.action='Confirm Purchase'
--appPath="apps/assistance/app/src/app"`
      }
    },
    {
      title: 'Customizing UI',
      story: 'Navigate to the assistance/ui/stocks directory and find the component for the tool that you defined. Replace the prebuilt React form component with your existing order form',
      action: {
        label: 'Example Component',
        code: `export const PurchaseStock = ({
  params,
}: {
  params: PurchaseStockParameters;
}) => {

  const handleConfirmPurchase = async (fields) => {
    const response = await confirmPurchase({
      params,
      ...fields,
    });
    setUi(response.display);
  };

  return (
      <BotCard>
        Absolutely! Take a look and review:
      </BotCard>
      <FunctionFormCard heading="Purchase Stock">
        <DynamicForm
          fields={fields}
          onSubmit={handleConfirmPurchase}
        />
      </FunctionFormCard>
    );
  };`}
    },
    {
      title: 'Handling Action',
      story: 'Implement logic to call your service for handling orders and pass in the parameters.',
      action: {
        label: 'Example Logic',
        code:
          `const handleConfirmPurchase = async (fields) => {
    const purchaseId = await createPurchase(fields);
    const response = await confirmPurchase({
      ...params,
      purchaseId
    });
    setUi(response.display);
  };`
      }
    }
  ],
}




const journeys = [
  StockJourney
]

const AssistancePage = () => {
  return <AssistanceChat empty={<SharedFeatureJourney journies={journeys}></SharedFeatureJourney>} />;
};
export default AssistancePage;