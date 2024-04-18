'use client';
import { useActions } from 'ai/rsc';
import { useState } from 'react';
import { DynamicForm, DynamicFormField } from '@wrkspce/shared/feature/form';
import { BotCard, FunctionFormCard } from '@wrkspce/shared/ui';
import { generatePropertyField } from '@wrkspce/assistance/util';

import { GenerateFeatureParameters } from '@wrkspce/assistance/domain';

export const GenerateFeature = ({
  params,
}: {
  params: GenerateFeatureParameters;
}) => {
  const [ui, setUi] = useState<null | React.ReactNode>(null);
  const { confirmFeature } = useActions();
  const fields: DynamicFormField[] =
    Object.keys(params).map((key) => {
      if (key === 'tool') {
        return {
          name: 'tool',
          type: 'text',
          label: 'Tool',
          value: '',
          fields: Object.keys(params[key]).map((prop) => {
            return generatePropertyField({
              property: prop,
              type: (params[key] as any)[prop].type,
              value: (params[key] as any)[prop],
            });
          }),
        };
      } else {
        return generatePropertyField({
          property: key,
          type: (params as any)[key].type,
          value: (params as any)[key],
        });
      }
    }
    );

  const handleConfirmFeature = async (fields: DynamicFormField[]) => {

    const response = await confirmFeature({
      ...params,
      fields
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
          <FunctionFormCard heading={params.name}>
            <DynamicForm fields={fields} onSubmit={handleConfirmFeature} />
          </FunctionFormCard>
        </>
      )}
    </>
  );
};
