'use client'
import { useAssistance } from './useAssistance';
import { AssistanceChat } from './AssistanceChat';

interface AssistanceProps {
    api: string;
}

export function Assistance({ api }: AssistanceProps) {
    const { status, messages, input, submitMessage, handleInputChange, error } =
        useAssistance(api);

    return <AssistanceChat {...{ status, messages, input, submitMessage, handleInputChange, error }} />;
}