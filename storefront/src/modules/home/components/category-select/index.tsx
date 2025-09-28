import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import React, { Fragment } from "react";
import ChevronDown from "@modules/common/icons/chevron-down";
import { clx } from "@medusajs/ui";
import { StoreProductCategory } from "@medusajs/types";

type Props = {
  placeholder: string;
  categories: StoreProductCategory[];
  onChange: (category: StoreProductCategory | null) => void;
  disabled?: boolean;
};

function CategorySelect({
  placeholder,
  categories,
  onChange,
  disabled,
}: Props) {
  return (
    <Listbox onChange={onChange} disabled={disabled}>
      <ListboxButton
        className={
          "z-10 flex w-full items-center justify-between rounded-md bg-background-secondary px-4 py-2 pt-[10px] text-sm text-[#9FA2A5] outline-none"
        }
      >
        {({ open, value }) => (
          <>
            {value?.name || placeholder}
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
            "z-10 mt-2 flex w-[--button-width] flex-col rounded-md bg-white py-2 text-sm text-ui-fg-subtle shadow-borders-base outline-none"
          }
        >
          {categories.length ? (
            categories.map((category) => (
              <ListboxOption
                key={category.id}
                value={category}
                className={
                  "cursor-pointer p-2 px-4 hover:bg-[#F4F4F4] data-[selected]:bg-[#F4F4F4]"
                }
              >
                {category.name}
              </ListboxOption>
            ))
          ) : (
            <div className={"cursor-default p-2 px-4"}>The list is empty</div>
          )}
        </ListboxOptions>
      </Transition>
    </Listbox>
  );
}

export default CategorySelect;
