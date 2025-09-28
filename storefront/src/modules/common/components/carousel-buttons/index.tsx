import React from "react";
import { ChevronLeft, ChevronRight } from "@medusajs/icons";
import { clx, IconButton } from "@medusajs/ui";

type Props = {
  onClick: VoidFunction;
  disabled?: boolean;
  isSelected?: boolean;
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

export const DotButton = ({ isSelected, onClick }: Props) => {
  return (
    <button
      type={"button"}
      className={clx("h-2.5 w-2.5 rounded-full bg-gray-300", {
        "bg-black": isSelected,
      })}
      onClick={onClick}
    />
  );
};
