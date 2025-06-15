import { listCategories } from "@lib/data/categories";
import { listCollections } from "@lib/data/collections";
import { clx } from "@medusajs/ui";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Image from "next/image";

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  });
  const productCategories = await listCategories();

  return (
    <footer className="w-full bg-[#141414] text-white">
      <div className="content-container flex w-full flex-col">
        <div className="flex flex-col items-start justify-between gap-y-6 py-32 small:flex-row">
          <div className="flex flex-col gap-6">
            <LocalizedClientLink href="/" data-testid="nav-store-link">
              <Image
                src={"/images/logo.png"}
                width={200}
                height={50}
                alt="RSPI logo"
                className={"object-cover"}
              />
            </LocalizedClientLink>
            <p className="max-w-lg text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:gap-x-16">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="text-sm font-black">Categories</span>
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
                        <LocalizedClientLink
                          className={clx(children && "text-sm")}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
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
                <ul
                  className={clx("grid grid-cols-1 gap-2 text-sm", {
                    "grid-cols-2": (collections?.length || 0) > 3,
                  })}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="text-sm"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-2">
              <span className="text-sm font-black">Links</span>
              <ul className="grid grid-cols-1 gap-y-2 text-sm">
                <li>
                  <LocalizedClientLink href="#">Help</LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="#">Contact</LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="#">
                    Privacy policy
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="#">
                    Cookie policy
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mb-16 flex w-full justify-between text-sm text-ui-fg-muted">
          <p>© {new Date().getFullYear()} RSPI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
