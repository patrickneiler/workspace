import {
  formatFiles,
  generateFiles,
  readCachedProjectGraph,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { GenerateProjectParameters } from '@wrkspce/assistance/domain';

export async function projectConfigurationGenerator(tree: Tree) {
  const workspaceName = 'wrkspce';
  const projects = readCachedProjectGraph().nodes;
  const { dependencies } = readCachedProjectGraph();
  const projectNames = Object.keys(projects);
  const configuraton: GenerateProjectParameters = {
    name: '@wrkspce',
    configType: 'workspace',
    children: projectNames
      .filter((name) => name !== 'workspace')
      .map((projectName) => {
        const project = projects[projectName];
        const projectDependencies = dependencies[projectName];
        const projectScope = projectName.split('-')[0];
        const projectType = projectName.split('-')[1];
        const configType = project.type;
        const importPath = `@${workspaceName}/${projectScope}/${projectType}/${projectName.split('-').pop()}`;
        const generatorScript = `nx g @nx/${projectType === 'ui' ? 'react:library' : projectType === 'feature' ? 'next:library' : projectType === 'app' ? 'next:application' : 'javascript:library'} --name=${projectName} --bundler=rollup --directory=libs/${projectScope}/${projectType}/${projectName.split('-').pop()} --importPath=${importPath} --projectNameAndRootFormat=as-provided --publishable=true --tags="scope:${projectScope}, type:${projectType}" --unitTestRunner=jest`;
        return {
          name: projectName,
          configType: configType === 'app' ? 'app' : 'library',
          scope: projectScope,
          fields: [
            {
              name: 'name',
              value: projectName,
              required: true,
              type: 'input',
              label: 'Name',
            },
            {
              name: 'scope',
              value: projectScope,
              required: true,
              type: 'input',
              label: 'Scope',
            },
            {
              name: 'type',
              value: projectType,
              required: true,
              type: 'input',
              label: 'Type',
            },
            {
              name: 'importPath',
              value: importPath,
              required: true,
              type: 'input',
              label: 'Import Path',
            },
            {
              name: 'generatorScript',
              value: generatorScript,
              required: true,
              type: 'input',
              label: 'Generator Script',
            },
          ],
          dependencies: projectDependencies
            .filter((dependency) => !dependency.target.includes('npm:'))
            .map((dependency) => dependency.target),
        };
      }),
  };
  const graph = {
    root: '@wrkspce',
    apps: configuraton.children
      .filter((child) => child.configType === 'app')
      .map((child) => ({
        name: child.name,
        scope: child.scope,
        dependencies: child.dependencies,
      })),
    libs: configuraton.children
      .filter((child) => child.configType === 'library')
      .map((child) => ({
        name: child.name,
        scope: child.scope,
        dependencies: child.dependencies,
      })),
  };

  const templatePath = path.join(__dirname, 'files/src');
  generateFiles(
    tree,
    templatePath,
    'libs/assistance/feature/project/src/lib/tools/generate/knowledge.tsx',
    {
      config: configuraton,
      generator: projectConfigurationGenerator.toString(),
      graph: graph,
    },
  );
  await formatFiles(tree);
}

export default projectConfigurationGenerator;
