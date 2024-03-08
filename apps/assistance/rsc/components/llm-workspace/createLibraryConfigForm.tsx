'use client';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export interface LibraryConfig {
  framework?: string;
  name?: string;
  importPath?: string;
  generator?: string;
  exports?: any[];
}

interface LibraryConfigFormProps {
  args: LibraryConfig;
  onChange: (value: LibraryConfig) => void;
}

export function ConfigForm({ args, onChange }: LibraryConfigFormProps) {
  const [framework, setFramework] = useState(args.framework || '');
  const [name, setName] = useState(args.name || '');
  const [importPath, setImportPath] = useState(args.importPath || '');
  const [generator, setGenerator] = useState(args.generator || '');
  const [exports, setExports] = useState(args.exports || []);

  const handleChange = (event: any) => {
    event.preventDefault();
    const libraryConfig = { ...args, framework, name, importPath, generator, exports };
    onChange(libraryConfig);
  };

  return (
    <form onChange={handleChange}>
      <Label>
        Framework
      </Label>
      <Input type="text" value={framework} onChange={e => setFramework(e.target.value)} />
      <Label>
        Name
      </Label>
      <Input type="text" value={name} onChange={e => setName(e.target.value)} />
      <Label>
        Import Path
      </Label>
      <Input type="text" value={importPath} onChange={e => setImportPath(e.target.value)} />
      <Label>
        Generator
      </Label>
      <Input type="text" value={generator} onChange={e => setGenerator(e.target.value)} />

    </form>
  );
}