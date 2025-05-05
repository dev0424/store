"use client";

import { Popover, Transition } from "@headlessui/react";
import { XMark, BarsThree } from "@medusajs/icons";
import { Text } from "@medusajs/ui";
import React, { Fragment } from "react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

const SideMenuItems = {
  Home: "/",
  Store: "/store",
  Search: "/search",
  Account: "/account",
  Cart: "/cart",
};

const SideMenu = () => {
  return (
    <Popover className="flex h-full items-center">
      {({ open, close }) => (
        <>
          <div className="relative flex h-full">
            <Popover.Button
              data-testid="nav-menu-button"
              className="relative flex h-full items-center outline-none transition-all duration-200 ease-out hover:text-ui-fg-base"
            >
              <BarsThree />
            </Popover.Button>
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
              className="absolute left-0 top-[112px] z-50 flex h-[calc(100vh-112px)] w-full flex-col text-sm text-ui-fg-on-color"
            >
              <div
                data-testid="nav-menu-popup"
                className="flex h-full flex-col justify-between bg-white bg-opacity-100 p-6 sm:w-1/3 sm:min-w-min 2xl:w-1/4"
              >
                <div className="flex justify-end text-black" id="xmark">
                  <button data-testid="close-menu-button" onClick={close}>
                    <XMark />
                  </button>
                </div>
                <ul className="flex flex-col items-start justify-start gap-6">
                  {Object.entries(SideMenuItems).map(([name, href]) => {
                    return (
                      <li key={name}>
                        <LocalizedClientLink
                          href={href}
                          className="text-3xl leading-10 text-black hover:text-ui-fg-disabled"
                          onClick={close}
                          data-testid={`${name.toLowerCase()}-link`}
                        >
                          {name}
                        </LocalizedClientLink>
                      </li>
                    );
                  })}
                </ul>
                <div className="flex flex-col gap-y-6">
                  <Text className="txt-compact-small flex justify-between text-black">
                    © {new Date().getFullYear()} Store. All rights reserved.
                  </Text>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default SideMenu;
