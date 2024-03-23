import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: { default: 'nx run assistance-ai:start' },
      ciWebServerCommand: 'nx run assistance-ai:serve-static',
    }),
    baseUrl: 'http://localhost:3000',
  },
});
