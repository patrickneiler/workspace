// import { confirmWorkspace, generateWorkspaceDiagram } from '../actions';
// import { getMutableAIState, createStreamableUI } from 'ai/rsc';
// import '@testing-library/jest-dom';
// import { WorkspaceParameters } from '../domain';
// import { spinner, SystemMessage } from '@wrkspce/ui/react';


// jest.mock('./aiState');
// jest.mock('./streamableUI');
// jest.mock('./utils');
// jest.mock('./diagram');

// describe('confirmWorkspace', () => {
//     const config = {
//         name: 'Test Workspace',
//         // Add other configuration properties here
//     };

//     beforeEach(() => {
//         jest.clearAllMocks();
//     });

//     it('should update the configuration UI with the confirmation message', async () => {
//         const aiStateMock = {
//             get: jest.fn().mockReturnValue([]),
//             done: jest.fn(),
//         };
//         const configurationUI = {
//             update: jest.fn(),
//             done: jest.fn(),
//             value: 'Configuration UI Value',
//         };
//         const systemMessage = {
//             done: jest.fn(),
//             value: 'System Message Value',
//         };

//         getMutableAIState.mockReturnValue(aiStateMock);
//         createStreamableUI.mockReturnValueOnce(configurationUI);
//         createStreamableUI.mockReturnValueOnce(systemMessage);
//         generateWorkspaceDiagram.mockResolvedValueOnce({ display: 'Diagram Display' });

//         await confirmWorkspace(config);

//         expect(configurationUI.update).toHaveBeenCalledWith(
//             <div className="inline-flex items-start gap-1 md:items-center">
//                 {spinner}
//                 <p className="mb-2">Confirming configuration for {config.name}...</p>
//             </div>
//         );
//     });

//     it('should update the system message with the confirmation message', async () => {
//         const aiStateMock = {
//             get: jest.fn().mockReturnValue([]),
//             done: jest.fn(),
//         };
//         const configurationUI = {
//             update: jest.fn(),
//             done: jest.fn(),
//             value: 'Configuration UI Value',
//         };
//         const systemMessage = {
//             done: jest.fn(),
//             value: 'System Message Value',
//         };

//         const config: WorkspaceParameters = {
//             name: 'Test Workspace',
//             configType: 'library',
//         };

//         jest.spyOn(getMutableAIState(), 'get').mockReturnValue(aiStateMock);
//         // eslint-disable-next-line @typescript-eslint/no-empty-function
//         jest.spyOn(createStreamableUI(), 'update').mockImplementation(() => {});
//         (generateWorkspaceDiagram as jest.Mock).mockResolvedValueOnce({ display: 'Diagram Display' });

//         await confirmWorkspace(config);

//         expect(systemMessage.done).toHaveBeenCalledWith(
//             <SystemMessage>
//                 You have successfully configured {config.name}.
//             </SystemMessage>
//         );
//     });

//     it('should update the configuration UI with the diagram display', async () => {
//         const aiStateMock = {
//             get: jest.fn().mockReturnValue([]),
//             done: jest.fn(),
//         };
//         const configurationUI = {
//             update: jest.fn(),
//             done: jest.fn(),
//             value: 'Configuration UI Value',
//         };
//         const systemMessage = {
//             done: jest.fn(),
//             value: 'System Message Value',
//         };

//         getMutableAIState.mockReturnValue(aiStateMock);
//         createStreamableUI.mockReturnValueOnce(configurationUI);
//         createStreamableUI.mockReturnValueOnce(systemMessage);
//         generateWorkspaceDiagram.mockResolvedValueOnce({ display: 'Diagram Display' });

//         await confirmWorkspace(config);

//         expect(configurationUI.done).toHaveBeenCalledWith('Diagram Display');
//     });

//     it('should update the AI state with the system message', async () => {
//         const aiStateMock = {
//             get: jest.fn().mockReturnValue([]),
//             done: jest.fn(),
//         };
//         const configurationUI = {
//             update: jest.fn(),
//             done: jest.fn(),
//             value: 'Configuration UI Value',
//         };
//         const systemMessage = {
//             done: jest.fn(),
//             value: 'System Message Value',
//         };

//         getMutableAIState.mockReturnValue(aiStateMock);
//         createStreamableUI.mockReturnValueOnce(configurationUI);
//         createStreamableUI.mockReturnValueOnce(systemMessage);
//         generateWorkspaceDiagram.mockResolvedValueOnce({ display: 'Diagram Display' });

//         await confirmWorkspace(config);

//         expect(aiStateMock.done).toHaveBeenCalledWith([
//             ...aiStateMock.get(),
//             {
//                 role: 'system',
//                 content: `[User has successfully configured ${config.name}.]`,
//             },
//         ]);
//     });

//     it('should return the configuration UI and new message', async () => {
//         const aiStateMock = {
//             get: jest.fn().mockReturnValue([]),
//             done: jest.fn(),
//         };
//         const configurationUI = {
//             update: jest.fn(),
//             done: jest.fn(),
//             value: 'Configuration UI Value',
//         };
//         const systemMessage = {
//             done: jest.fn(),
//             value: 'System Message Value',
//         };

//         jest.spyOn(AIState, 'getMutableAIState').mockReturnValue(aiStateMock);
//         createStreamableUI.mockReturnValueOnce(configurationUI);
//         createStreamableUI.mockReturnValueOnce(systemMessage);
//         generateWorkspaceDiagram.mockResolvedValueOnce({ display: 'Diagram Display' });

//         const result = await confirmWorkspace(config);

//         expect(result).toEqual({
//             configurationUI: configurationUI.value,
//             newMessage: {
//                 id: expect.any(Number),
//                 display: systemMessage.value,
//             },
//         });
//     });
// });