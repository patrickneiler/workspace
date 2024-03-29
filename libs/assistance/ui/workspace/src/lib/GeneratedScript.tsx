import { CopyIcon } from '@radix-ui/react-icons';
import { Flex, Code, Box, Card, IconButton } from '@radix-ui/themes';

/* eslint-disable-next-line */

export function GeneratedScript({ script }: { script: string }) {
  return (
    <Card size="1">
      <Flex gap="3" align="center">
        <Box>
          <Code size="2">{script}</Code>
        </Box>
        <IconButton>
          <CopyIcon />
        </IconButton>
      </Flex>
    </Card>
  );
}

export default GeneratedScript;
