import React from "react";
import { ChevronLeft, ChevronRight } from "@medusajs/icons";
import { IconButton } from "@medusajs/ui";

type Props = {
  onClick: VoidFunction;
  disabled?: boolean;
};

export const PrevButton = ({ onClick, disabled }: Props) => {
  return (
    <IconButton onClick={onClick} disabled={disabled}>
      <ChevronLeft />
    </IconButton>
  );
};

export const NextButton = ({ onClick, disabled }: Props) => {
  return (
    <IconButton onClick={onClick} disabled={disabled}>
      <ChevronRight />
    </IconButton>
  );
};
