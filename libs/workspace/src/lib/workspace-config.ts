import { WorkspaceConfig } from './workspace-types';
// the following object represents the architecture of an Nx workspace with a library called 'ranthology' that contains a feature called 'assistance' with two sub-features, one for React and one for Next.js. The React feature contains a hook and a host component, while the Next.js feature contains a server route and a page. The 'assistance' library also contains a domain library that exposes the core interfaces and types for the assistance feature. 
export const config: WorkspaceConfig = {
	name: "ranthology",
	type: "workspace",
	description: "The concept of 'ranthology' involves integrating AI into the software development process to manage the 'legwork'. This involves using AI to convert human-readable feature descriptions into structured JSON metadata, which acts as a blueprint for the AI to generate the corresponding code. This approach enhances efficiency, innovation, and reduces the chance of errors in software development.",
	git: {
		repo: "patrickneiler/ranthology",
		branch: "assistance",
		url: "https://github.com/patrickneiler/ranthology.git",
	},
	dependencies: {
		'ai': "^2.2.36",
		'next': "14.0.4",
		'openai': "^4.28.0",
		'react': "18.2.0",
		'react-dom:': "18.2.0",
		'tslib': "^2.3.0"
	},
	nxDependencies: {
		"@nx/next": "^18.0.5",
		"@nx/react": "^18.0.5",
		"@nx/rollup": "18.0.5",
		"@nx/workspace": "18.0.5",
	},
	libs: [
		{
			name: "assistance",
			type: "scope",
			description: "This directory contains the core domains for the assistance feature.",
			features: [
				{
					framework: "react",
					name: "assistant-feature-react",
					type: "library",
					description: "This library contains the core functionality for the react-based presentational and stateful components for the assistance feature.",
					importPath: "@ranthology/assistance/feature/react",
					generator:
						"npx nx generate @nx/react:library --name=assistance-feature-react --directory=assistance/feature/react --buildable=true --component=false --importPath=@ranthology/assistance/feature/react --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive",
					exports: [
						{
							name: "useAssistance",
							type: "hook",
							description: "This hook is used to manage the state and logic for the assistance feature.",
							options: {
								api: 'api/assistance',
								threadId: 'threadId',
								credentials: 'same-origin',
								headers: "'Content-Type': 'application/json' }",
							  },
							state: {
								properties: {
									messages: {
										type: "Message[]",
										description: "The current array of chat messages.",
									},
									threadId: {
										type: "string",
										description: "The current thread ID.",
									},
									input: {
										type: "string",
										description: "The current value of the input field.",
									},
									setInput: {
										type: "React.Dispatch<React.SetStateAction<string>>",
										description: "setState-powered method to update the input value.",
									},
									handleInputChange: {
										type: "(event: React.ChangeEvent<HTMLInputElement>) => void",
										description: "Handler for the `onChange` event of the input field to control the input's value.",
									},
									submitMessage: {
										type: "(event?: React.FormEvent<HTMLFormElement>, requestOptions?: { data?: Record<string, string>; }) => Promise<void>",
										description: "Form submission handler that automatically resets the input field and appends a user message.",
									},
									status: {
										type: "AssistantStatus",
										description: "The current status of the assistant. This can be used to show a loading indicator.",
									},
									error: {
										type: "undefined | unknown",
										description: "The error thrown during the assistant message processing, if any.",
									},
								},
							},
							generator:
								"npx nx generate @nx/react:hook --name=useAssistance --project=assistance-feature-react --skipFormat=true --no-interactive",
							readme: {
							},
							task: {
							},
						},
						{
							name: "Assistance",
							type: "host-component",
							description: "This component is the host for the assistance feature.",
							options: {
								api: 'string',
							},
							state: {
								properties: {
									useAssistance: {
										type: "useAssistance",
										description: "The hook to use for the assistance feature.",
									},
								}
							},
							generator:
								"npx nx generate @nx/react:component --name=Assistance --project=assistance-feature-react --skipFormat=true --no-interactive",
							children: [
								'AssistanceChat'
							],
							readme: {
							},
							task: {
							},
						},
						{
							name: "AssistanceChat",
							type: "functional-component",
							description: "This component is the presentational component for the chat interface of the assistance feature.",
							options: {
								messages: 'Message[]',
								status: 'string',
								input: 'string',
								submitMessage: '() => void',
								handleInputChange: '(event: React.ChangeEvent<HTMLInputElement>) => void',
								error: 'any',
							},
							generator:
								"npx nx generate @nx/react:component --name=AssistanceChat --project=assistance-feature-react --skipFormat=true --no-interactive",
							readme: {
							},
							task: {
							},
						},
					],
					readme: {
					},
					task: {
					},
				},
				{
					framework: "next",
					name: "assistant-feature-next",
					type: "feature",
					description: "This library contains the core functionality for the next-based pages and server routes for the assistance feature.",
					importPath: "@ranthology/assistance/feature/next",
					generator:
						"npx nx generate @nx/next:library --name=assistance-feature-next --directory=assistance/feature/next --buildable=true --component=false --importPath=@ranthology/assistance/feature/next --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive",
					routes: [
						{
							name: "AssistanceApiRoute",
							type: "server",
							description: "This server route is used to handle the API requests for the assistance feature. This endpoint is used to communicate with the OpenAI API.",
							options: {
								apiKey: 'string',
								assistantId: 'string',
							},
							path: "/routes/assistance",
						},
					],
					pages: [
						{
							name: "Assistance",
							type: "page",
							description: "This page is the host for the assistance feature.",
							generator:
								"npx nx generate @nx/next:page --name=Assistance --project=assistance-feature-next --skipFormat=true --no-interactive",
							children: [
								'AssistanceChat'
							],
						},
					],
					readme: {
					},
					task: {
					},
				},
			],
			domain: {
				name: "assistance-domain",
				type: "library",
				description: "This library exposes the core interfaces and types for the assistance feature.",
				framework: "react",
				importPath: "@ranthology/assistance/domain",
				generator:
					"npx nx generate @nx/typescript:library --name=assistance-domain --directory=assistance/domain --buildable=true --importPath=@ranthology/assistance/domain --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=domain --unitTestRunner=none --no-interactive",
				exports: [
					{
						name: "state",
						type: "state",
						description: "This module contains the core state management logic for the assistance feature.",
					}
				],
				readme: {
				},
				task: {
				},
			},
			readme: {
			},
			task: {
			},
		},
	],
};
