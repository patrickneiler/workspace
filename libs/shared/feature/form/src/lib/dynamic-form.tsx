import * as React from 'react';
import { Box, Button, Flex, Heading, Select, Separator, Text, TextField } from '@radix-ui/themes';
import { DynamicFormProps, DynamicFormField } from './domain';

/**
 * Renders a dynamic form based on the provided fields and handles form submission.
 *
 * @param fields - An array of field objects that define the form fields.
 * @param onSubmit - A callback function that is called when the form is submitted.
 */
export const DynamicForm = ({ fields = [], onSubmit }: DynamicFormProps) => {
  const [formState, setFormState] = React.useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: field }), {}),
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
    console.log('fields', fields);
    onSubmit(fields as DynamicFormField[]);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => {
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
          case 'group':
            return (
              <Box key={field + index.toString()} mb="4" mt="4">
                <Heading size="3" color="sky">
                  <Separator size="4" />
                  <Box pt="4" pb="2">
                    {field.label}
                  </Box>
                </Heading>
                {
                  field.fields?.map((subField) => (
                    <Box key={subField.name} mb="4" mt="4">
                      <label>
                        <Text as="div" size="2" weight="medium" ml="1" mb="2">
                          {subField.label}
                        </Text>
                        <TextField.Root>
                          <TextField.Input
                            variant="classic"
                            size="2"
                            name={subField.name}
                            type={subField.type}
                            placeholder={subField.placeholder}
                            defaultValue={subField.value}
                            required={subField.required}
                            onChange={(e) => handleChange(subField.name, e.target.value)}
                          />
                        </TextField.Root>
                      </label>
                    </Box>
                  ))
                }
              </Box>
            )
          default:
            return (
              <Box key={field.name} mb="4" mt="4">
                <label>
                  <Text as="div" size="2" weight="medium" ml="1" mb="2">
                    {field.label}
                  </Text>
                  <TextField.Root>
                    <TextField.Input
                      variant="classic"
                      size="2"
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
        <Button color='sky' variant="soft">Submit</Button>
      </Flex>
    </form>
  );
};

export default DynamicForm;
