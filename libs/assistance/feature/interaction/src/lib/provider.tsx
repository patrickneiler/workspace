import { createAI } from "ai/rsc/dist";
import { mappedActions } from "../util";
import { AIState, Action, UIState } from "../domain";
import { ReactNode } from "react";

const initialAIState: AIState[] = [];

const initialUIState: UIState[] = [];

export const AIProvider = ({ actions, children }: { actions: Action[], children: ReactNode }) => {
    const AI = createAI({
        actions: mappedActions(actions),
        initialUIState,
        initialAIState,
    })
    return (
        <AI>
            {children}
        </AI>
    )
};

