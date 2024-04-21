'use client';
import { useActions } from 'ai/rsc';
import { useState } from 'react';
import { BotCard, FunctionFormCard } from '@wrkspce/shared/ui';

import { PurchaseStockParameters } from '@wrkspce/assistance/domain';
import { StockPurchase } from '@wrkspce/stocks/ui';

export const PurchaseStock = ({ params }: { params: PurchaseStockParameters }) => {
  const [ui, setUi] = useState<null | React.ReactNode>(null);
  const [value, setValue] = useState(params.amount);
  const { confirmPurchase } = useActions();

  const handlePurchase = async (params: PurchaseStockParameters) => {
    const response = await confirmPurchase({
      ...params,
      amount: value
    });
    setUi(response.display);
  };
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {ui ? (
        <div className="mt-4 text-zinc-200">{ui}</div>
      ) : (
        <BotCard>
          <p className='block min-h-8'>Absolutely! Take a look and review:</p>

          <StockPurchase name={params.name} amount={params.amount} price={params.price} onPurchase={handlePurchase} onSliderChange={(e) => setValue} />
        </BotCard>
      )}
    </>
  );
};
