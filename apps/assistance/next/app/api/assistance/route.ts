import { AssistanceApi } from '@ranthology/assistance/feature/next/api';
const apiKey = process.env.OPENAI_API_KEY || '';
const assistantId = process.env.OPENAI_ASSISTANT_ID || '';
export const runtime = 'edge';
export const {POST} = AssistanceApi(apiKey, assistantId);
