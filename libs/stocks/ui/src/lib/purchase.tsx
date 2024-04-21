'use client';

import { useState } from 'react';
import { sleep } from '@wrkspce/shared/util';
import StockPurchase from './stock-purchase';

export function Purchase({
    defaultAmount,
    name,
    price,
}: {
    defaultAmount?: number;
    name: string;
    price: number;
}) {
    const [value, setValue] = useState(defaultAmount || 100);
    const handlePurchase = async () => {
        await sleep(1000);
    };

    // Whenever the slider changes, we need to update the local value state and the history
    // so LLM also knows what's going on.
    function onSliderChange(e: string) {
        const newValue = Number(e);
        setValue(newValue);
    }

    return (
        <div className=" text-green-900 bg-zinc-950">
            <StockPurchase amount={value} name={name} price={price} onPurchase={handlePurchase} onSliderChange={onSliderChange} />
        </div>
    );
}
