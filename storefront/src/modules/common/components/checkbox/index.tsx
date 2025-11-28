import { Checkbox, Label } from "@medusajs/ui";
import React, { ReactNode } from "react";

type CheckboxProps = {
  checked?: boolean;
  onChange?: () => void;
  label: string | ReactNode;
  name?: string;
  id?: string;
  "data-testid"?: string;
};

const CheckboxWithLabel: React.FC<CheckboxProps> = ({
  checked = true,
  onChange,
  label,
  name,
  id,
  "data-testid": dataTestId,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        className="text-base-regular flex items-center gap-x-2"
        id={id}
        role="checkbox"
        type="button"
        checked={checked}
        aria-checked={checked}
        onClick={onChange}
        name={name}
        data-testid={dataTestId}
      />
      <Label
        htmlFor={id}
        className="!txt-medium mt-[4px] !transform-none !font-sans"
        size="large"
      >
        {label}
      </Label>
    </div>
  );
};

export default CheckboxWithLabel;
