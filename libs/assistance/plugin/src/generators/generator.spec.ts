import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { workspaceConfigurationGenerator } from './generator';
import { WorkspaceConfigurationGeneratorSchema } from './schema';

describe('workspace-configuration generator', () => {
  let tree: Tree;
  const options: WorkspaceConfigurationGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await workspaceConfigurationGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
