"use client";

import React from "react";
import { HiAdjustments } from "react-icons/hi";

type Props = {
  onClick: VoidFunction;
};

const FiltersToolbar = ({ onClick }: Props) => {
  return (
    <div className="border-y border-y-gray-200 py-4">
      <button onClick={onClick}>
        <span className="flex gap-1 text-ui-fg-base">
          Filters <HiAdjustments size={24} />
        </span>
      </button>
    </div>
  );
};

export default FiltersToolbar;
