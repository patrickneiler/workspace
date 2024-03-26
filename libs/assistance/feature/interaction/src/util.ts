import { Action, AITool } from './domain';

export const mappedActions = (actions: Action[]) => actions.reduce((obj: {[key: string]: Action}, action) => {
    obj[action.name] = action;
    return obj;
  }, {});

  export const mappedTools = (tools: AITool[]) => tools.reduce((obj: {[key: string]: AITool}, tool) => {
    obj[tool.name] = tool;
    return obj;
  }, {});