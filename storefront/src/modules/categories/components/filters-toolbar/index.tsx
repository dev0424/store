"use client";

import React from "react";
import { HiAdjustments } from "react-icons/hi";
import { getShowFiltersCookie, setShowFiltersCookie } from "@lib/data/filters";

const FiltersToolbar = () => {
  const toggleFilters = async () => {
    const showFilters = await getShowFiltersCookie();
    await setShowFiltersCookie(!showFilters);
  };

  return (
    <div className="border-y border-y-gray-200 py-4">
      <button onClick={toggleFilters}>
        <span className="flex gap-1 text-ui-fg-base">
          Filters <HiAdjustments size={24} />
        </span>
      </button>
    </div>
  );
};

export default FiltersToolbar;
