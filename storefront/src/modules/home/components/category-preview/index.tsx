import React from "react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { StoreProductCategory } from "@medusajs/types";
import { Button } from "@medusajs/ui";

type Props = {
  category: StoreProductCategory;
};

const CategoryPreview = ({ category }: Props) => {
  const thumbnail = category.metadata?.thumbnail as string | undefined;

  return (
    <LocalizedClientLink
      href={`/categories/${category.handle}`}
      className="group relative flex h-60 w-auto overflow-hidden rounded-md bg-gradient-to-br from-background-primary to-background-secondary hover:shadow-elevation-card-hover sm:h-80 sm:w-48"
    >
      <p className="relative z-20 w-full p-4 text-left text-xl font-black text-white sm:text-2xl">
        {category.name}
      </p>

      {thumbnail && (
        <div
          className="absolute inset-0 z-10 bg-[length:80%] bg-bottom bg-no-repeat sm:bg-contain sm:transition-transform sm:duration-500 sm:ease-out sm:group-hover:translate-y-full"
          style={{ backgroundImage: `url(${thumbnail})` }}
        />
      )}

      <div className="absolute inset-0 z-10 hidden translate-y-full justify-end gap-2 p-4 text-sm font-light text-white sm:flex sm:flex-col sm:transition-transform sm:duration-500 sm:ease-out sm:group-hover:translate-y-0">
        <p>{category.description}</p>
        <Button className="text-md flex w-full items-center bg-accent-primary py-1 font-sans font-bold shadow-none hover:bg-hover-accent-primary">
          Voir tout
        </Button>
      </div>
    </LocalizedClientLink>
  );
};

export default CategoryPreview;
