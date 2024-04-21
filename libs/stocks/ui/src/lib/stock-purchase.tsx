import { formatNumber } from '@wrkspce/shared/util';
import { Flex, Text } from '@radix-ui/themes';

export function StockPurchase({
  amount = 100,
  name,
  price,
  onPurchase,
  onSliderChange
}: {
  amount?: number;
  name: string;
  price: number;
  onPurchase: ({ name, price, amount }: { name: string, price: number, amount: number }) => void;
  onSliderChange: (e: string) => void;
}) {

  return (
    <div className="p-4 border rounded-xl bg-zinc-950">
      <Flex justify="between" align="center">
        <Text size="4" className="font-bold  text-accent-11 ">{name}</Text>
        <Text size="4" className="text-3xl text-accent-11 font-bold">${price}</Text>
      </Flex>
      <div className="relative pb-6 mt-6">
        <p>Shares to purchase</p>
        <input
          id="labels-range-input"
          type="range"
          defaultValue={amount}
          onChange={(e) => onSliderChange(e.target.value)}
          min="10"
          max="1000"
          className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-zinc-600 accent-accent-11 dark:bg-zinc-700"
        />
        <span className="absolute text-xs bottom-1 start-0 text-zinc-400">
          10
        </span>
        <span className="absolute text-xs -translate-x-1/2 bottom-1 start-1/3 text-zinc-400 rtl:translate-x-1/2">
          100
        </span>
        <span className="absolute text-xs -translate-x-1/2 bottom-1 start-2/3 text-zinc-400 rtl:translate-x-1/2">
          500
        </span>
        <span className="absolute text-xs bottom-1 end-0 text-zinc-400">
          1000
        </span>
      </div>

      <div className="mt-6">
        <div className="flex flex-wrap items-center text-xl font-bold sm:items-end sm:gap-2 sm:text-3xl">
          <div className="flex text-accent-11 flex-col basis-1/3 sm:basis-auto sm:flex-row sm:items-center sm:gap-2 tabular-nums">
            {amount}
            <span className="mb-1 text-sm font-normal text-gray-12 dark:text-zinc-400 sm:mb-0">
              shares
            </span>
          </div>
          <div className="text-center basis-1/3 sm:basis-auto">×</div>
          <span className="flex  text-accent-11 flex-col basis-1/3 sm:basis-auto sm:flex-row sm:items-center sm:gap-2 tabular-nums">
            ${price}
            <span className="mb-1 ml-1 text-sm font-normal text-gray-12 dark:text-zinc-400 sm:mb-0">
              per share
            </span>
          </span>
          <div className="pt-2 mt-2 text-center border-t basis-full sm:text-left sm:basis-auto border-t-zinc-700 sm:border-0 sm:mt-0 sm:pt-0">
            = <span className='text-accent-11'>{formatNumber(amount * price)}</span>
          </div>
        </div>
      </div>

      <button
        className="w-full px-4 py-2 mt-6 bg-accent-11 rounded-lg dark:bg-accent-11 text-gray-1"
        onClick={() => onPurchase({ name, price, amount })}
      >
        Purchase
      </button>
    </div>
  );
}
export default StockPurchase;