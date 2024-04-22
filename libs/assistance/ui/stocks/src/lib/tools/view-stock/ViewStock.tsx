'use client';
import { BotCard, FunctionFormCard } from '@wrkspce/shared/ui';

import { ViewStockParameters } from '@wrkspce/assistance/domain';
import { Stock } from '@wrkspce/stocks/ui';

export const ViewStock = ({ params }: { params: ViewStockParameters }) => {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      <BotCard>
        <p className='block min-h-8'>Absolutely! Here's the latest price of {params.symbol}:</p>

        <Stock name={params.symbol} price={params.price} delta={params.delta} />
      </BotCard>
    </>
  )
};
