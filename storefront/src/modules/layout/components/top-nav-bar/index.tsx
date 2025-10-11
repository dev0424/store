import React from "react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

const TopNavBar = () => {
  return (
    <div className="w-full border-b border-background-secondary bg-[#141414] p-2 text-sm text-[#9FA2A5]">
      <div className="content-container">
        <ul className="flex items-center justify-end gap-8">
          <li>
            <LocalizedClientLink href="#">Créer un compte</LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink href="#">Catalogue</LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink href="#">
              Trouver un distributeur
            </LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink href="#">FAQ</LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink href="/about">À propos</LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink href="/contact">Contact</LocalizedClientLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopNavBar;
