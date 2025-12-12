import React, { ReactNode } from "react";

type Props = {
  title: string;
  children: React.ReactNode;
};

const Section = ({ title, children }: Props) => (
  <div className="flex w-full flex-col gap-2">
    <p>{title}</p>
    {children}
  </div>
);

export default Section;
