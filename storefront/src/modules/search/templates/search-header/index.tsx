"use client";

import { Fragment, useState } from "react";

import { SEARCH_INDEX_NAME, searchClient } from "@lib/search-client";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch";
import Hit from "@modules/search/components/hit";
import { Transition } from "@headlessui/react";

export default function SearchHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const onFocus = () => {
    setIsOpen(true);
  };

  const onBlur = () => {
    setIsOpen(false);
  };

  return (
    <InstantSearch indexName={SEARCH_INDEX_NAME} searchClient={searchClient}>
      <SearchBox
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={"Search for products or categories"}
        classNames={{
          form: "bg-transparent text-white",
          input:
            "bg-background-secondary rounded-3xl border-none text-sm text-white placeholder:text-[#9FA2A5] caret-inherit font-sans shadow-none pt-[2px]",
          reset: "fill-white",
          submit: "text-white fill-white stroke-white",
        }}
      />
      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Hits
          hitComponent={Hit}
          classNames={{
            root: "mt-3 sm:mt-2 z-50 w-screen absolute left-0 sm:relative sm:w-full sm:rounded sm:overflow-hidden",
            item: "!rounded-none",
          }}
        />
      </Transition>
    </InstantSearch>
  );
}
