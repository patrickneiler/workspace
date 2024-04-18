'use client';
import { GenerateFeatureParameters } from '@wrkspce/assistance/domain';
import { Card, Box, Code, IconButton, Flex } from '@radix-ui/themes';
import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { getPropertyValueFromFields } from '@wrkspce/assistance/util';

export function ConfirmFeature({ params }: { params: GenerateFeatureParameters }) {
  const [copied, setCopied] = useState(false);
  const tool = params.fields?.find((field) => field.name === 'tool');
  const code = `pnpm nx g @wrkspce/assistance/plugin:assistance-feature
  --name='${getPropertyValueFromFields('name', params.fields)}'
  --tool.name='${getPropertyValueFromFields('name', tool?.fields)}'
  --tool.type='${getPropertyValueFromFields('type', tool?.fields)}'
  --tool.condition='${getPropertyValueFromFields('condition', tool?.fields)}'
  --tool.goal='${getPropertyValueFromFields('goal', tool?.fields)}'
  --tool.rules='${getPropertyValueFromFields('rules', tool?.fields)}'
  --tool.parameters='${getPropertyValueFromFields('parameters', tool?.fields)}'
  --tool.action='${getPropertyValueFromFields('action', tool?.fields)}'
  --appPath='${getPropertyValueFromFields('appPath', params.fields)}'`;
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
  }
  return (
    <Card size="1">
      <Flex direction="row">
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
        <IconButton onClick={copyCode}>
          {copied ? <CopyIcon /> : <CheckIcon />}
        </IconButton>
      </Flex>
    </Card>
  );
}

export default ConfirmFeature;
