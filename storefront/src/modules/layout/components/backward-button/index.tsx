import React from "react";
import { HiChevronLeft as ChevronLeft } from "react-icons/hi";

type Props = {
  title: string;
  onClick: VoidFunction;
};

const BackwardButton = ({ title, onClick }: Props) => {
  return (
    <div
      className="flex cursor-pointer items-center gap-2 text-lg leading-10 text-accent-primary"
      onClick={onClick}
    >
      <ChevronLeft size={24} />
      <p className={"translate-y-[2px]"}>{title}</p>
    </div>
  );
};

export default BackwardButton;
