import { PurchaseStockParameters } from '@wrkspce/assistance/domain';
import { Card, Box, Text } from '@radix-ui/themes';
import { BotCard } from '@wrkspce/shared/ui';

export function ConfirmPurchase({ params }: { params: PurchaseStockParameters }) {
  return (
    <BotCard>
      <Text size="4" className='text-bold'>Purchase Confirmed!</Text>
      <p>
        You have successfully purchased {params.amount} shares of {params.name} at ${params.price} per share.
      </p>
    </BotCard>
  );
}

export default ConfirmPurchase;
