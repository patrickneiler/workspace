import { GenerateProject } from './generate-project/index';

export const ToolActions = {
    ...GenerateProject.actions
}

export const Tools = [
    GenerateProject.tool
]