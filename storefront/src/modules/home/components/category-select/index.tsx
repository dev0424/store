"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import React, { useState, Fragment } from "react";
import ChevronDown from "@modules/common/icons/chevron-down";
import { clx } from "@medusajs/ui";

const categories = [
  { id: 1, name: "Category 1" },
  { id: 2, name: "Category 2" },
  { id: 3, name: "Category 3" },
  { id: 4, name: "Category 4" },
  { id: 5, name: "Category 5" },
];

type Props = {
  placeholder: string;
};

function CategorySelect({ placeholder }: Props) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <Listbox value={selectedCategory} onChange={setSelectedCategory}>
      <ListboxButton
        className={
          "z-10 flex w-full items-center justify-between rounded-md bg-background-secondary px-4 py-2 text-sm text-[#9FA2A5] outline-none"
        }
      >
        {({ open }) => (
          <>
            {selectedCategory ? selectedCategory.name : placeholder}
            <ChevronDown
              className={clx("transition-rotate duration-200", {
                "rotate-180 transform": open,
              })}
            />
          </>
        )}
      </ListboxButton>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <ListboxOptions
          anchor="bottom"
          transition
          className={
            "z-10 mt-2 flex w-[--button-width] flex-col gap-2 rounded-md bg-white px-4 py-2 text-sm text-ui-fg-subtle outline-none"
          }
        >
          {categories.map((person) => (
            <ListboxOption key={person.id} value={person}>
              {person.name}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Transition>
    </Listbox>
  );
}

export default CategorySelect;
