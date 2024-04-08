'use client';
import { useActions } from 'ai/rsc';
import { useState } from 'react';
import { DynamicForm, DynamicFormField } from '@wrkspce/shared/feature/form';
import { Box, Heading, Text } from '@radix-ui/themes';
import { FunctionCard } from '@wrkspce/shared/ui';
import { GenerateProjectParameters } from '@wrkspce/assistance/domain';
export const ConfirmProject = ({
  params,
}: {
  params: GenerateProjectParameters;
}) => {
  const [ui, setUi] = useState<null | React.ReactNode>(null);
  const { confirmProject } = useActions();
  const handleConfirmProject = async (fields: DynamicFormField[]) => {
    const response = await confirmProject({
      ...params,
      fields,
    });
    setUi(response.display);
  };
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {ui ? (
        <div className="mt-4 text-zinc-200">{ui}</div>
      ) : (
        <FunctionCard>
          <Box height="4" mb="2">
            <Heading as="h4" size="4" mt="-1">
              {params.name}
            </Heading>
          </Box>
          <Text className="mb-2">{`${params.description}.`}</Text>
          {params.fields && (
            <DynamicForm
              fields={params.fields}
              onSubmit={handleConfirmProject}
            />
          )}
        </FunctionCard>
      )}
    </>
  );
};
