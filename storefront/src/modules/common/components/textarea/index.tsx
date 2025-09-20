import React, { useImperativeHandle } from "react";
import ErrorMessage from "@modules/checkout/components/error-message";

type Props = Omit<
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
  "placeholder"
> & {
  label: string;
  errors?: Record<string, unknown>;
  touched?: Record<string, unknown>;
  name: string;
  topLabel?: string;
  disableNativeValidation?: boolean;
  rows?: number;
};

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      name,
      label,
      touched,
      required,
      topLabel,
      errors,
      disableNativeValidation,
      rows,
      ...props
    },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => inputRef.current!);

    return (
      <div className="flex w-full flex-col">
        <div className="txt-compact-medium relative z-0 flex w-full">
          <textarea
            name={name}
            placeholder=" "
            required={!disableNativeValidation && required}
            className="mt-0 block w-full appearance-none rounded-md border border-ui-border-base bg-ui-bg-field px-4 pb-1 pt-4 font-sans hover:bg-ui-bg-field-hover focus:shadow-borders-interactive-with-active focus:outline-none focus:ring-0"
            {...props}
            ref={inputRef}
            rows={rows}
          />
          <label
            htmlFor={name}
            onClick={() => inputRef.current?.focus()}
            className="-z-1 origin-0 absolute top-3 mx-3 flex translate-y-[2px] items-center justify-center px-1 font-sans text-ui-fg-subtle transition-all duration-300"
          >
            {label}
            {required && <span className="text-rose-500">*</span>}
          </label>
        </div>
        {errors ? <ErrorMessage error={errors.message as string} /> : null}
      </div>
    );
  },
);

export default TextArea;
