'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Label } from '../../ai/ui/label';
import { Input } from '../../ai/ui/input';

interface LibraryParameters {
  name: string;
  configType: 'library' | 'module' | 'app';
  type: 'next' | 'react';
  scope: string;
  importPath: string;
  generator: string;
  modules: string[];
}

interface LibraryFormProps {
  defaultValues: LibraryParameters;
  update: (data: LibraryParameters) => void;
}

const LibraryConfigForm: React.FC<LibraryFormProps> = ({ defaultValues, update }) => {
  const { register, watch } = useForm<LibraryParameters>({ defaultValues });

  const watchedFields = watch();

  useEffect(() => {
    console.log(watchedFields !== defaultValues);
    watchedFields !== defaultValues && update(watchedFields);

  }, [watchedFields, update]);

  return (
    <form>
      <Label>
        Name:
        <Input {...register('name')} />
      </Label>
      <Label>
        Config Type:
        <select {...register('configType')}>
          <option value="library">Library</option>
          <option value="module">Module</option>
          <option value="app">App</option>
        </select>
      </Label>
      <Label>
        Type:
        <select {...register('type')}>
          <option value="next">Next</option>
          <option value="react">React</option>
        </select>
      </Label>
      <Label>
        Scope:
        <Input {...register('scope')} />
      </Label>
      <Label>
        Import Path:
        <Input {...register('importPath')} />
      </Label>
      <Label>
        Generator:
        <Input {...register('generator')} />
      </Label>
      <Label>
        Modules:
        <Input {...register('modules')} />
      </Label>
    </form>
  );
};

export default LibraryConfigForm;