'use client';
import { useActions } from 'ai/rsc';
import { useState } from 'react';
import { DynamicForm, DynamicFormField } from '@wrkspce/shared/feature/form';
import { BotCard, FunctionFormCard } from '@wrkspce/shared/ui';
import { generatePropertyField } from '@wrkspce/assistance/util';

import { GenerateOrderParameters } from '@wrkspce/assistance/domain';

export const GenerateOrder = ({
  params,
}: {
  params: GenerateOrderParameters;
}) => {
  const [ui, setUi] = useState<null | React.ReactNode>(null);
  const { confirmOrder } = useActions();
  const fields: DynamicFormField[] = Object.keys(params).map((key) =>
    generatePropertyField({
      property: key,
      type: params[key].type,
      value: params[key].value,
    }),
  );

  const handleConfirmOrder = async (fields: DynamicFormField[]) => {
    const response = await confirmOrder({
      params,
      ...fields,
    });
    setUi(response.display);
  };
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {ui ? (
        <div className="mt-4 text-zinc-200">{ui}</div>
      ) : (
        <>
          <BotCard>Absolutely! Take a look and review:</BotCard>
          <FunctionFormCard heading="Generate Order">
            <DynamicForm fields={fields} onSubmit={handleConfirmOrder} />
          </FunctionFormCard>
        </>
      )}
    </>
  );
};
