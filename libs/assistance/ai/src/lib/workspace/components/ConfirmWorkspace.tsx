'use client';
import { useUIState, useActions } from 'ai/rsc';
import { useState } from 'react';
import { DynamicForm, DynamicFormField } from '@ranthology/dynamic-form';
import { Box, Heading, Text } from '@radix-ui/themes';
import { WorkspaceParameters } from '../domain';
import { BotMessage, FunctionCard } from '@ranthology/ui/react';
import { AI } from '../../provider';
export const ConfirmWorkspace = ({
  config,
}: {
  config: WorkspaceParameters;
}) => {
  const [configurationUI, setWorkspaceUI] = useState<null | React.ReactNode>(
    null,
  );
  const [, setMessages] = useUIState<typeof AI>();
  const { confirmWorkspace } = useActions();
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {configurationUI ? (
        <div className="mt-4 text-zinc-200">{configurationUI}</div>
      ) : (
        <>
          <BotMessage showAvatar={false}>
            {`Review the ${config.configType} configuration for ${config.name} and confirm if it's correct.`}
          </BotMessage>
          <FunctionCard>
            <Box height="4" mb="2">
              <Heading as="h3" size="6" mt="-1">
                {config.configType} Workspace
              </Heading>
            </Box>
            <Text className="mb-2">{`${config.description}.`}</Text>
            {config.fields && (
              <DynamicForm
                fields={config.fields}
                onSubmit={async (fields: DynamicFormField[]) => {
                  {
                    const response = await confirmWorkspace({
                      ...config,
                      fields,
                    });
                    setWorkspaceUI(response.configurationUI);

                    // Insert a new system message to the UI.
                    setMessages((currentMessages: any) => [
                      ...currentMessages,
                      response.newMessage,
                    ]);
                  }
                }}
              />
            )}
          </FunctionCard>
        </>
      )}
    </>
  );
};
