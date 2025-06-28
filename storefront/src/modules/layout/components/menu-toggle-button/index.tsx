import React from "react";
import { HiMenu, HiOutlineX } from "react-icons/hi";
import { PopoverButton } from "@headlessui/react";

type Props = {
  isOpen: boolean;
  onClose: VoidFunction;
};

const MenuToggleButton = ({ isOpen, onClose }: Props) => {
  return (
    <PopoverButton
      data-testid="nav-menu-button"
      className="relative flex h-full items-center text-white transition-all duration-200 ease-out focus:outline-none"
    >
      {isOpen ? (
        <HiOutlineX size={24} onClick={onClose} />
      ) : (
        <HiMenu size={24} />
      )}
    </PopoverButton>
  );
};

export default MenuToggleButton;
