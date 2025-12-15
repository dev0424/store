import React, { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

const Section = ({ title, children }: Props) => (
  <div className="flex w-full flex-col gap-2">
    <p className="text-xl-semi text-center text-ui-fg-base sm:text-left">
      {title}
    </p>
    {children}
  </div>
);

export default Section;
