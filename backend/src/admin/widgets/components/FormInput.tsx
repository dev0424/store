import React from 'react';
import { Input, Label, Text } from '@medusajs/ui';
import { useFormContext } from 'react-hook-form';

type Props = {
    label: string;
    name: string;
    rules?: any;
    defaultValue?: string;
};

const FormInput = ({ label, name, rules, defaultValue }: Props) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div className="flex flex-col gap-1">
            <Label htmlFor="bank_name" className="font-sans txt-compact-small font-medium">
                {label}
            </Label>
            <Input
                {...register(name, rules)}
                id={name}
                name={name}
                type="text"
                defaultValue={defaultValue}
                aria-invalid={!!errors?.[name]}
            />
            {errors?.[name] && (
                <Text className="text-red-500 text-xs">{errors[name]?.message as string}</Text>
            )}
        </div>
    );
};

export default FormInput;
