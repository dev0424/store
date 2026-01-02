import React, { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  slot?: ReactNode;
};

const Section = ({ title, children, slot }: Props) => (
  <div className="flex w-full flex-col gap-4">
    <div className="flex justify-between">
      <p className="text-xl-semi text-center text-ui-fg-base sm:text-left">
        {title}
      </p>
      {slot}
    </div>
    {children}
  </div>
);

export default Section;
