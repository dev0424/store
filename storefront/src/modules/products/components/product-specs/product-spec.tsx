import React from "react";

type Props = {
  name: string;
  value: string | number | undefined | null;
};

const ProductSpec = ({ name, value }: Props) => {
  return (
    <div className={"grid grid-cols-2 items-center pt-2.5"}>
      <p className={"font-bold"}>{name}</p>
      <p className={"text-ui-fg-subtle"}>{value ? value : "-"}</p>
    </div>
  );
};

export default ProductSpec;
