import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Grid = ({ children }: Props) => (
  <div className="grid grid-cols-2 gap-4">{children}</div>
);

export default Grid;
