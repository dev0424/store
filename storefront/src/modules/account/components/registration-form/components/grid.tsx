import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Grid = ({ children }: Props) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
);

export default Grid;
