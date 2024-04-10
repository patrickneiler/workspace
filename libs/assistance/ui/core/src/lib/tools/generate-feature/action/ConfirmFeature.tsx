import { GenerateFeatureParameters } from '@wrkspce/assistance/domain';
import { Card, Box, Code, IconButton } from '@radix-ui/themes';
import { CopyIcon } from '@radix-ui/react-icons';

export function ConfirmFeature({ params }: { params: GenerateFeatureParameters }) {
  return (
    <Card size="1">
      <Box>
        <Code size="2">
          {`pnpm nx g @wrkspce/assistance/plugin:assistance-feature
              --name='${params.name}'
              --tool.name='${params.tool.name}'
              --tool.type='${params.tool.type}'
              --tool.condition='${params.tool.condition}'
              --tool.goal='${params.tool.goal}'
              --tool.rules='${JSON.parse(JSON.stringify(params.tool.rules, null, 2))}'
              --tool.parameters='${JSON.parse(JSON.stringify(params.tool.parameters, null, 2))}'
              --tool.action='${params.tool.action}'
              --appPath='${params.appPath}'`}
        </Code>
      </Box>
      <IconButton>
        <CopyIcon />
      </IconButton>
    </Card>
  );
}

export default ConfirmFeature;
