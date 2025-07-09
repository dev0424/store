import React from "react";
import { HiAdjustments } from "react-icons/hi";

type Props = {
  onClick: VoidFunction;
  className?: string;
};

const FilterButton = ({ onClick, className }: Props) => {
  return (
    <button onClick={onClick} className={className}>
      <span className="flex gap-1 text-ui-fg-base">
        Filters <HiAdjustments size={24} />
      </span>
    </button>
  );
};

export default FilterButton;
