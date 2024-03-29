import 'server-only';

import { createAI } from 'ai/rsc';
import { AIState, UIState } from '@wrkspce/assistance/domain';
import { actions } from './actions';
const initialAIState: AIState[] = [];
const initialUIState: UIState[] = [];

export const AssistanceWorkspaceProvider = createAI({
    actions,
    initialUIState,
    initialAIState,
});


