'use client';
import { useUIState, useActions } from "ai/rsc";
import { useState } from "react";
import { AI } from "../../../../app/action";
import { DynamicForm, DynamicFormField } from "@ranthology/ui/react";
import { BotMessage, FunctionCard } from "../../../assistance/react/ui/message";
import { ConfigurationParameters } from "../configuration";
import { Box, Heading, Text } from "@radix-ui/themes";
export const ConfirmConfiguration = ({ config }: { config: ConfigurationParameters }) => {
    const [configurationUI, setConfigurationUI] = useState<null | React.ReactNode>(
        null,
    );
    const [, setMessages] = useUIState<typeof AI>();
    const { confirmConfiguration } = useActions();
    return (
        <>
            {
                configurationUI ? (
                    <div className="mt-4 text-zinc-200">{configurationUI}</div>
                ) : (
                    <>
                        <BotMessage showAvatar={false}>
                            {`Review the ${config.configType} configuration for ${config.name} and confirm if it's correct.`}
                        </BotMessage>
                        <FunctionCard>
                            <Box height="4" mb="2">
                                <Heading as="h3" size="6" mt="-1">
                                    {config.configType} Configuration
                                </Heading>
                            </Box>
                            <Text className="mb-2">
                                {`${config.description}.`}
                            </Text>
                            {
                                config.fields && <DynamicForm fields={config.fields} onSubmit={async (fields: DynamicFormField[]) => {
                                    {
                                        const response = await confirmConfiguration({ ...config, fields });
                                        setConfigurationUI(response.configurationUI);

                                        // Insert a new system message to the UI.
                                        setMessages((currentMessages: any) => [
                                            ...currentMessages,
                                            response.newMessage,
                                        ]);
                                    }
                                }} />
                            }
                        </FunctionCard>
                    </>
                )
            }
        </>
    );
}