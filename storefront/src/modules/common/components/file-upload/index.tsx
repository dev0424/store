import React from "react";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { clx } from "@medusajs/ui";
import { XMark } from "@medusajs/icons";
import { IconButton } from "@medusajs/ui";

interface Props {
  name: string;
  label?: string;
  required?: boolean;
  accept?: Record<string, string[]>;
  rules?: Record<string, string>;
  multiple?: boolean;
  maxSizeMB?: number;
}

export const FileUpload = ({
  name,
  rules,
  label = "Fichier",
  required = false,
  accept = { "application/pdf": [] },
  multiple = false,
  maxSizeMB = 5,
}: Props) => {
  const {
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  // Retrieve nested error (e.g. documents.rib)
  const fieldError = name
    .split(".")
    .reduce((acc: any, key: string) => acc?.[key], errors);

  const maxBytes = maxSizeMB * 1024 * 1024;

  const onDrop = (
    acceptedFiles: File[],
    field: ControllerRenderProps<FieldValues, string>,
  ) => {
    // Validate file size
    const files = multiple ? acceptedFiles : [acceptedFiles[0]];
    const isTooLarge = files.some((file) => file.size > maxBytes);

    if (isTooLarge) {
      setError(name, {
        type: "manual",
        message: `La taille maximale est de ${maxSizeMB}MB`,
      });
      return;
    }

    // Clear previous errors
    clearErrors(name);

    // Update form state
    field.onChange(multiple ? files : (files[0] ?? null));
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => {
        const { getRootProps, getInputProps } = useDropzone({
          accept,
          multiple,
          onDrop: (acceptedFiles) => onDrop(acceptedFiles, field),
        });

        const onDelete = () => field.onChange(multiple ? [] : null);

        const hasFile = multiple
          ? Array.isArray(field.value) && field.value.length > 0
          : !!field.value;

        return (
          <section className="flex flex-col gap-2">
            {hasFile ? (
              <aside className="flex items-center justify-between rounded-md border bg-gray-50 p-3 text-xs">
                <p>
                  <span className="font-bold">{label}: </span>
                  <span>
                    {multiple
                      ? field.value.map((f: File) => f.name).join(", ")
                      : field.value.name}
                  </span>
                </p>
                <IconButton
                  onClick={onDelete}
                  className="text-red-500 hover:text-red-700"
                >
                  <XMark className="h-4 w-4" />
                </IconButton>
              </aside>
            ) : (
              <div
                {...getRootProps()}
                className={clx(
                  "flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 p-8 text-gray-600 hover:border-blue-400",
                  { "border-red-500": !!fieldError },
                )}
              >
                <input {...getInputProps()} />
                <p>
                  <span>{label}</span>
                  {required && <span className="text-red-500">*</span>}
                </p>
                <p className="mt-2 text-center text-xs">
                  Glissez-déposez un fichier ici, ou cliquez pour en
                  sélectionner un.
                </p>
              </div>
            )}

            {fieldError && (
              <p className="text-xs text-red-500">{fieldError?.message}</p>
            )}
          </section>
        );
      }}
    />
  );
};
