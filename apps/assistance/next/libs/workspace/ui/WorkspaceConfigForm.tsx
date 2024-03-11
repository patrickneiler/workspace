'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface WorkspaceParameters {
    name: string;
    configType: 'workspace' | 'library' | 'module' | 'app';
    type: 'nx';
    libs: string[];
}

interface WorkspaceConfigFormProps {
    defaultValues: WorkspaceParameters;
    update: (data: WorkspaceParameters) => void;
}

const WorkspaceConfigForm: React.FC<WorkspaceConfigFormProps> = ({ defaultValues, update }) => {
    const { register, watch } = useForm<WorkspaceParameters>({ defaultValues });

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
                    <option value="workspace">Workspace</option>
                    <option value="library">Library</option>
                    <option value="module">Module</option>
                    <option value="app">App</option>
                </select>
            </label>
            <label>
                Type:
                <select {...register('type')}>
                    <option value="nx">Nx</option>
                </select>
            </label>
            <label>
                Libraries:
                <input {...register('libs')} />
            </label>
        </form>
    );
};

export default WorkspaceConfigForm;