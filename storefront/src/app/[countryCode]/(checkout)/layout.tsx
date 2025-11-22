import React from "react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import ChevronDown from "@modules/common/icons/chevron-down";
import Image from "next/image";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full small:min-h-screen">
      <div className="h-16 border-b border-background-secondary bg-background-primary text-white">
        <nav className="content-container flex h-full items-center justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-small-semi flex flex-1 basis-0 items-center gap-x-2 uppercase"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="txt-compact-plus mt-px hidden hover:text-accent-primary small:block">
              Retour au panier
            </span>
            <span className="txt-compact-plus mt-px block hover:text-accent-primary small:hidden">
              Retour
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="txt-compact-xlarge-plus uppercase"
            data-testid="store-link"
          >
            <Image
              src={"/images/logo.png"}
              width={200}
              height={50}
              alt="RSPI logo"
              className={"max-w-32 object-cover"}
            />
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">
        {children}
      </div>
    </div>
  );
}
