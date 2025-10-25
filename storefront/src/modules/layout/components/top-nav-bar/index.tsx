import React from "react";
import NavLink from "@modules/layout/components/nav-link";

const TopNavBar = () => {
  return (
    <div className="w-full border-b border-background-secondary p-2 text-sm text-white">
      <div className="content-container">
        <ul className="flex items-center justify-end gap-8">
          <li>
            <NavLink href="#" title="Créer un compte" />
          </li>
          <li>
            <NavLink href="#" title="Catalogue" />
          </li>
          <li>
            <NavLink href="/distributors" title="Trouver un distributeur" />
          </li>
          <li>
            <NavLink href="#" title="FAQ" />
          </li>
          <li>
            <NavLink href="/about" title="À propos" />
          </li>
          <li>
            <NavLink href="/contact" title="Contact" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopNavBar;
