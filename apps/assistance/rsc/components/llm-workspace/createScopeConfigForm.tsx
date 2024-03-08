'use client';

import React, { useState } from 'react';
import { LibraryConfig } from './createLibraryConfigForm';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface CreateScopeConfigArgs {
    name: string;
    features: LibraryConfig[];
    domain: LibraryConfig;
}

interface CreateScopeConfigFormProps {
    args: CreateScopeConfigArgs;
    onChange: (value: CreateScopeConfigArgs) => void;
}

export function ConfigForm({ args, onChange }: CreateScopeConfigFormProps) {
    const [features, setFeatures] = useState(args.features || [{ /* initial LibraryConfig object */ }]);
    const [domain, setDomain] = useState(args.domain || { /* initial LibraryConfig object */ });
    const [name, setName] = useState(args.name);


    const handleFeatureChange = (index: number, value: LibraryConfig) => {
        const newFeatures = [...features];
        newFeatures[index] = value;
        setFeatures(newFeatures);
        onChange({ name, features: newFeatures, domain });
    };
    const handleDomainChange = (value: LibraryConfig) => {
        setDomain(value);
        onChange({ name, features, domain: value });
    };
    const handleNameChange = (value: string) => {
        setName(value);
        onChange({ name: value, features, domain });
    };

    return (
        <form>
            <div>
                {/* Render input fields for the properties of the domain object here */}
                {/* For example: */}
                <Label>
                    Scope Name
                </Label>
                <Input type="text" value={name} onChange={e => handleNameChange(e.target.value)} />

                {/* Repeat for other properties of the domain object */}
            </div>
        </form>
    );
}