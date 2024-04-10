import 'server-only';

import { createAI } from 'ai/rsc';
import { AIState, UIState } from '@wrkspce/assistance/domain';
import FeatureActions from './actions';
import { ToolActions } from './tools';
const initialAIState: AIState[] = [];
const initialUIState: UIState[] = [];

export const AssistanceFeatureProvider = createAI({
  actions: {
    ...FeatureActions,
    ...ToolActions,
  },
  initialUIState,
  initialAIState,
});
