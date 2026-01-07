"use client";

import React from "react";
import { productDocumentMetadata } from "@lib/constants";
import { ArrowUpRightMini } from "@medusajs/icons";
import { ProductDocument } from "../../../../types/product";
import { HiOutlineDocumentText } from "react-icons/hi";
import { sdk } from "@lib/config";

type Props = {
  document: ProductDocument;
  productId: string;
};

const Document = ({ document, productId }: Props) => {
  const onClickDownload = async (documentId: string, productId: string) => {
    try {
      const { url } = await sdk.client.fetch<{ url: string }>(
        `/store/products/${productId}/documents/${documentId}`,
        {
          method: "GET",
        },
      );
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Failed to download document", err);
    }
  };

  return (
    <div className="flex items-center gap-x-1">
      <HiOutlineDocumentText size={20} className={"text-ui-fg-subtle"} />
      <p
        onClick={() => onClickDownload(document.id, productId)}
        className="peer mt-[2px] cursor-pointer text-sm text-ui-fg-subtle"
      >
        {productDocumentMetadata[document.type]}
      </p>
      <ArrowUpRightMini
        className="duration-150 ease-in-out peer-hover:rotate-45"
        color="var(--fg-interactive)"
      />
    </div>
  );
};

export default Document;
