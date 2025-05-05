"use client";

import { Fragment, useRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import { SEARCH_INDEX_NAME, searchClient } from "@lib/search-client";
import { MagnifyingGlassMini } from "@medusajs/icons";
import Hit from "@modules/search/components/hit";
import Hits from "@modules/search/components/hits";
import SearchBox from "@modules/search/components/search-box";
import { InstantSearch } from "react-instantsearch-hooks-web";

export default function SearchHeader() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleInputClick = () => {
    // Simulate button click to open popover
    buttonRef.current?.click();
  };

  return (
    <InstantSearch indexName={SEARCH_INDEX_NAME} searchClient={searchClient}>
      <Popover className="relative flex h-full">
        {({ open, close }) => (
          <>
            <Popover.Button ref={buttonRef} className="hidden" />
            <div className="flex h-fit w-full flex-col">
              <div className="flex w-full items-center gap-x-2 rounded-md border border-ui-border-base bg-ui-bg-field p-2">
                <MagnifyingGlassMini />
                <SearchBox onClick={handleInputClick} />
              </div>
            </div>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Panel
                onClick={close}
                className="absolute left-0 top-0 z-50 flex w-full flex-col text-sm text-ui-fg-on-color"
              >
                <div className="absolute top-12 w-full rounded-md border border-ui-border-base bg-white p-2">
                  <Hits hitComponent={Hit} />
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </InstantSearch>
  );
}
