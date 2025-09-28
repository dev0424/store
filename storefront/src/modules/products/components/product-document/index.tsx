import React from "react";
import { productDocumentMetadata } from "@lib/constants";
import { ArrowUpRightMini } from "@medusajs/icons";
import { ProductDocument } from "../../../../types/product";
import { HiOutlineDocumentText } from "react-icons/hi";

type Props = {
  document: ProductDocument;
};

const Document = ({ document }: Props) => {
  return (
    <div className="flex items-center gap-x-1">
      <HiOutlineDocumentText size={20} className={"text-ui-fg-subtle"} />
      <a
        href={document.url}
        className="peer mt-[2px] text-sm text-ui-fg-subtle"
      >
        {productDocumentMetadata[document.type]}
      </a>
      <ArrowUpRightMini
        className="duration-150 ease-in-out peer-hover:rotate-45"
        color="var(--fg-interactive)"
      />
    </div>
  );
};

export default Document;
