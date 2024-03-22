import * as React from 'react';
import { Box, Button, Flex, Select, Text, TextField } from '@radix-ui/themes';

export interface DynamicFormField {
    name: string;
    type: 'input' | 'select' | 'multi' | 'checkbox' | 'radio' | 'file';
    options?: string[];
    required?: boolean;
    placeholder?: string;
    label: string;
    value: string;
}

export interface DynamicFormProps {
    fields: DynamicFormField[];
    onSubmit: (formState: DynamicFormField[]) => void;
}


export const DynamicForm = ({ fields, onSubmit }: DynamicFormProps) => {
    const [formState, setFormState] = React.useState(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
    );

    const handleChange = (name: string, value: any) => {
        setFormState({ ...formState, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fields = Object.entries(formState).map(([name, value]) => ({
            ...value as Record<string, any>,
            name
        }));
        onSubmit(fields as DynamicFormField[]);
    };

    return (
        <form onSubmit={handleSubmit}>
            {fields.map((field) => {
                switch (field.type) {
                    case 'select':
                        return (
                            <Box key={field.name} mb="5">
                                <label>
                                    <Text as="div" size="2" weight="medium" mb="2">
                                        {field.label}
                                    </Text>
                                    <Select.Root required={field.required} defaultValue={field.value} onValueChange={(value) => handleChange(field.name, value)}>
                                        <Select.Trigger />
                                        <Select.Content>
                                            <Select.Group>
                                                {field?.options?.map((option) => (
                                                    <Select.Item key={option} value={option}>{option}</Select.Item>
                                                ))}
                                            </Select.Group>
                                        </Select.Content>
                                    </Select.Root>
                                </label>
                            </Box>
                        );
                    default:
                        return (
                            <Box key={field.name} mb="5">
                                <label>
                                    <Text as="div" size="2" weight="medium" mb="2">
                                        {field.label}
                                    </Text>
                                    <TextField.Root>
                                        <TextField.Input
                                            variant="classic"
                                            name={field.name}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            defaultValue={field.value}
                                            required={field.required}
                                            onChange={(e) => handleChange(field.name, e.target.value)} />
                                    </TextField.Root>
                                </label>
                            </Box>
                        );
                }
            })}
            <Flex mt="6" justify="end" gap="3">
                <Button variant="solid">Submit</Button>
            </Flex>
        </form>
    );
};

export default DynamicForm;

