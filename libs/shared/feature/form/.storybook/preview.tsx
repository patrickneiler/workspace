import React from 'react';
import '@radix-ui/themes/styles.css';
import { Preview } from '@storybook/react';
import { Card, Theme } from '@radix-ui/themes';

const preview: Preview = {
  decorators: [
    (Story) => (
      <Theme appearance="dark" accentColor="sky" grayColor="slate">
        <Card>
          <Story />
        </Card>
      </Theme>
    ),
  ],
};

export default preview;
