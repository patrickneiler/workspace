import * as React from 'react';
import { Box, Button, Flex, Select, Text, TextField } from '@radix-ui/themes';
import { DynamicFormProps, DynamicFormField } from './domain';

/**
 * Renders a dynamic form based on the provided fields and handles form submission.
 *
 * @param fields - An array of field objects that define the form fields.
 * @param onSubmit - A callback function that is called when the form is submitted.
 */
export const DynamicForm = ({ fields, onSubmit }: DynamicFormProps) => {
  const [formState, setFormState] = React.useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}),
  );

  const handleChange = (name: string, value: any) => {
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fields = Object.entries(formState).map(([name, value]) => ({
      ...(value as Record<string, any>),
      name,
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
                  <Select.Root
                    required={field.required}
                    defaultValue={field.value}
                    onValueChange={(value) => handleChange(field.name, value)}
                  >
                    <Select.Trigger />
                    <Select.Content>
                      <Select.Group>
                        {field?.options?.map((option) => (
                          <Select.Item key={option} value={option}>
                            {option}
                          </Select.Item>
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
                      onChange={(e) => handleChange(field.name, e.target.value)}
                    />
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
