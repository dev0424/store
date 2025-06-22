"use client";

import { Button } from "@medusajs/ui";
import React from "react";
import { useFormStatus } from "react-dom";

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "transparent" | "danger" | null;
  className?: string;
  "data-testid"?: string;
  disabled?: boolean;
  onClick?: VoidFunction;
};

export function SubmitButton({
  children,
  variant = "primary",
  className,
  "data-testid": dataTestId,
  disabled,
  onClick,
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button
      size="large"
      className={className}
      type="submit"
      isLoading={pending}
      variant={variant || "primary"}
      data-testid={dataTestId}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
