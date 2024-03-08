'use client';

import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface ModuleConfigArgs {
    name: string;
    type: string;
    description: string;
    tags?: string[];
    children?: string[];
    readme?: { [key: string]: string };
    task?: { [key: string]: string };
    options?: { [key: string]: string };
    state?: {
        properties: {
            [key: string]: {
                type: string;
                description: string;
            };
        };
    };
    generator: string;
    props?: string;
    importPath?: string;
}

interface ModuleConfigFormProps {
    args: ModuleConfigArgs;
    onChange: (value: ModuleConfigArgs) => void;
}

export function ConfigForm({ args, onChange }: ModuleConfigFormProps) {
    const [name, setName] = useState(args.name);
    const [type, setType] = useState(args.type);
    const [description, setDescription] = useState(args.description);
    const [generator, setGenerator] = useState(args.generator);

    const handleChange = (event: any) => {
        event.preventDefault();
        const moduleConfig = { ...args, name, type, description, generator };
        onChange(moduleConfig);
    };

    return (
        <form onChange={handleChange}>
            <Label>
                Name
            </Label>
            <Input type="text" value={name} onChange={e => setName(e.target.value)} required />
            <Label>
                Type
            </Label>
            <Input type="text" value={type} onChange={e => setType(e.target.value)} required />

            <Label>
                Description
            </Label>
            <Input type="text" value={description} onChange={e => setDescription(e.target.value)} required />

            <Label>
                Generator
            </Label>
            <Input type="text" value={generator} onChange={e => setGenerator(e.target.value)} required />

        </form>
    );
}