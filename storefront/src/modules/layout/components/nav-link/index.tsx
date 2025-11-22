"use client";

import React, { ReactNode } from "react";
import { clx } from "@medusajs/ui";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { usePathname } from "next/navigation";

type Props = {
  title: string | ReactNode;
  href: string;
  className?: string;
  [x: string]: any;
};

const NavLink = ({ title, href, className, ...props }: Props) => {
  const pathname = usePathname();

  return (
    <LocalizedClientLink
      href={href}
      className={clx("hover:text-accent-primary", className, {
        "text-accent-primary": pathname.includes(href),
      })}
      {...props}
    >
      {title}
    </LocalizedClientLink>
  );
};

export default NavLink;
