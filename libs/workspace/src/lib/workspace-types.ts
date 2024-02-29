interface ArchitectureNode {
	name: string;
	type: string;
	description: string;
	tags?: string[];
	children?: string[];
	readme?: {
		[key: string]: string;
	};
	task?: {
		[key: string]: string;
	};

}

interface WorkspaceConfig extends ArchitectureNode {
	git: {
		repo: string;
		branch: string;
		url: string;
	};
	dependencies?: {
		[key: string]: string;
	};
	nxDependencies?: {
		[key: string]: string;
	};
	libs: ScopeConfig[];
}

interface ScopeConfig extends ArchitectureNode {
	features: LibraryConfig[];
	domain: LibraryConfig;

}

interface LibraryConfig extends ArchitectureNode {
	framework: string;
	name: string;
	importPath: string;
	generator: string;
	lib?: LibModuleConfig[];
	routes?: RouteConfig[];
	pages?: PageConfig[];
	exports?: LibModuleConfig[];

}

interface LibModuleConfig extends ArchitectureNode {
	type: 'hook' | 'host-component' | 'functional-component' | 'page' | 'server' | 'state' | 'import';
	options?: {
		[key: string]: string;
	};
	state?: {
		properties: {
			[key: string]: {
				type: string;
				description: string;
			}
		}
	};
	generator?: string;
	props?: string;
	importPath?: string;

}

interface RouteConfig extends ArchitectureNode {
	type: string;
	path: string;
	options?: {
		[key: string]: string;
	};
}

interface PageConfig extends ArchitectureNode {
	type: string;
	generator: string;
	importPath?: string;

}

interface StateConfig extends ArchitectureNode {
	framework: string;
	importPath: string;
	generator: string;
	exports: ExportConfig[];

}

interface ExportConfig extends ArchitectureNode {
	type: string;
	props?: Record<string, any>;
}

export type { WorkspaceConfig, LibraryConfig, ScopeConfig, LibModuleConfig, RouteConfig, PageConfig, StateConfig, ExportConfig };