'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface ModuleParameters {
    name: string;
    configType: 'library' | 'module' | 'app';
    type: 'hook' | 'stateful-component' | 'functional-component' | 'page' | 'server' | 'ui' | 'util';
    library: string;
    generator: string;
    dependencies: string[];
}

interface ModuleConfigFormProps {
    defaultValues: ModuleParameters;
    update: (data: ModuleParameters) => void;
}

const ModuleConfigForm: React.FC<ModuleConfigFormProps> = ({ defaultValues, update }) => {
    const { register, watch } = useForm<ModuleParameters>({ defaultValues });

    const watchedFields = watch();

    useEffect(() => {
        update(watchedFields);
    }, [watchedFields, update]);

    return (
        <form>
            <label>
                Name:
                <input {...register('name')} />
            </label>
            <label>
                Config Type:
                <select {...register('configType')}>
                    <option value="library">Library</option>
                    <option value="module">Module</option>
                    <option value="app">App</option>
                </select>
            </label>
            <label>
                Type:
                <select {...register('type')}>
                    <option value="hook">Hook</option>
                    <option value="stateful-component">Stateful Component</option>
                    <option value="functional-component">Functional Component</option>
                    <option value="page">Page</option>
                    <option value="server">Server</option>
                    <option value="ui">UI</option>
                    <option value="util">Util</option>
                </select>
            </label>
            <label>
                Library:
                <input {...register('library')} />
            </label>
            <label>
                Generator:
                <input {...register('generator')} />
            </label>
            <label>
                Dependencies:
                <input {...register('dependencies')} />
            </label>
        </form>
    );
};

export default ModuleConfigForm;