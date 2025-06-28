import React from "react";
import { HiChevronRight as ChevronRight } from "react-icons/hi";

type Props = {
  title: string;
  onClick: VoidFunction;
};

const ForwardButton = ({ title, onClick }: Props) => {
  return (
    <div
      className={
        "flex cursor-pointer items-center justify-between text-lg leading-10 hover:text-accent-primary"
      }
      onClick={onClick}
    >
      <p>{title}</p>
      <ChevronRight size={24} />
    </div>
  );
};

export default ForwardButton;
