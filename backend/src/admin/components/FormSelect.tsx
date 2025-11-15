import React from 'react';
import { Label, Select, Text } from '@medusajs/ui';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
    label: string;
    name: string;
    rules?: any;
    defaultValue?: string;
    placeholder?: string;
    items: {
        key: string;
        label: string;
    }[];
};

const FormSelect = ({ label, name, rules, defaultValue, placeholder, items }: Props) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <div className="flex flex-col gap-1">
            <Label htmlFor={name} className="font-sans txt-compact-small font-medium">
                {label}
            </Label>
            <Controller
                name={name}
                control={control}
                rules={rules}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                        <Select.Trigger>
                            <Select.Value placeholder={placeholder} />
                        </Select.Trigger>
                        <Select.Content>
                            {items.map(item => (
                                <Select.Item key={item.key} value={item.key}>
                                    {item.label}
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select>
                )}
            />
            {errors?.[name] && (
                <Text className="text-red-500 text-xs">{errors[name]?.message as string}</Text>
            )}
        </div>
    );
};

export default FormSelect;
