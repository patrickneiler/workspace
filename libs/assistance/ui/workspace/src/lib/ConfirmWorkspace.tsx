'use client';
import { useActions } from 'ai/rsc';
import { useState } from 'react';
import { DynamicForm, DynamicFormField } from '@wrkspce/shared/feature/form';
import { Box, Heading, Text } from '@radix-ui/themes';
import { FunctionCard } from '@wrkspce/shared/ui';
import { WorkspaceParameters } from '@wrkspce/assistance/domain';
export const ConfirmWorkspace = ({
  config,
}: {
  config: WorkspaceParameters;
}) => {
  const [ui, setUi] = useState<null | React.ReactNode>(null);
  const { confirmWorkspace } = useActions();
  const handleConfirmWorkspace = async (fields: DynamicFormField[]) => {
    const response = await confirmWorkspace({
      ...config,
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
              {config.name}
            </Heading>
          </Box>
          <Text className="mb-2">{`${config.description}.`}</Text>
          {config.fields && (
            <DynamicForm
              fields={config.fields}
              onSubmit={handleConfirmWorkspace}
            />
          )}
        </FunctionCard>
      )}
    </>
  );
};
