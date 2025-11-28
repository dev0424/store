import React from "react";
import { listCategories } from "@lib/data/categories";
import { listCollections } from "@lib/data/collections";
import { clx } from "@medusajs/ui";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Image from "next/image";
import NavLink from "@modules/layout/components/nav-link";

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  });
  const productCategories = await listCategories();

  return (
    <footer className="w-full border-t border-background-secondary bg-background-primary text-white">
      <div className="content-container flex w-full flex-col">
        <div className="flex flex-col items-start justify-between gap-10 py-16 sm:py-32 small:flex-row">
          <div className="flex flex-col gap-6">
            <LocalizedClientLink href="/" data-testid="nav-store-link">
              <Image
                src={"/images/logo.png"}
                width={200}
                height={50}
                alt="RSPI logo"
                className={"max-w-32 object-cover"}
              />
            </LocalizedClientLink>
            <p className="max-w-lg text-sm">
              RSPI équipe les professionnels avec des solutions techniques
              fiables, rapides et accessibles. Livraison partout en France
              métropolitaine.
            </p>
            <div className="text-sm">
              <p className="mb-2">SAS RSPI ROCK SOLUTIONS PRO INDUSTRIE</p>
              <p>185 Rue du Canton du Caillouti, 59279 Loon-Plage, France</p>
              <p>SIRET: 95187083100017</p>
              <p>TVA: FR17951870831</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:gap-x-16">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="text-sm font-black">Catégories</span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return;
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null;

                    return (
                      <li className="flex flex-col text-white" key={c.id}>
                        <NavLink
                          href={`/categories/${c.handle}`}
                          title={c.name}
                          className={clx(children && "text-sm")}
                          data-testid="category-link"
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="text-sm font-black text-white">
                  Collections
                </span>
                <ul className="grid grid-cols-1 gap-2 text-sm">
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <NavLink
                        href={`/collections/${c.handle}`}
                        title={c.title}
                        className="text-sm"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-2">
              <span className="text-sm font-black">Liens</span>
              <ul className="grid grid-cols-1 gap-y-2 text-sm">
                <li>
                  <NavLink href="/about" title="À propos" className="text-sm" />
                </li>
                <li>
                  <NavLink
                    href="/distributors"
                    title="Trouver un distributeur"
                    className="text-sm"
                  />
                </li>
                <li>
                  <NavLink
                    href="/contact"
                    title="Contact"
                    className="text-sm"
                  />
                </li>
                <li>
                  <NavLink
                    href="/policies/cgu"
                    title="CGU"
                    className="text-sm"
                  />
                </li>
                <li>
                  <NavLink
                    href="/policies/cgv"
                    title="CGV"
                    className="text-sm"
                  />
                </li>
                <li>
                  <NavLink
                    href="/policies/legal"
                    title="Mentions légales"
                    className="text-sm"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mb-16 flex w-full justify-between text-sm text-ui-fg-muted">
          <p>
            © {new Date().getFullYear()} | RSPI — La performance entre vos
            mains.
          </p>
        </div>
      </div>
    </footer>
  );
}
