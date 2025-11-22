"use client";

import React, { useMemo, useState } from "react";
import CategorySelect from "@modules/home/components/category-select";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import { StoreProductCategory } from "@medusajs/types";
import { useRouter } from "next/navigation";
import { filterMainCategories } from "@lib/util/categories";
import { HiOutlineSearch } from "react-icons/hi";

type Props = {
  categories: StoreProductCategory[];
};

const BrowserWidget = ({ categories }: Props) => {
  const [selectedCategory, setSelectedCategory] =
    useState<StoreProductCategory | null>(null);

  const router = useRouter();

  const onChangeCategory = (category: StoreProductCategory | null) =>
    setSelectedCategory(category);

  const mainCategories = filterMainCategories(categories);

  const subCategories = useMemo(
    () => selectedCategory?.category_children || [],
    [selectedCategory],
  );

  const getButtonText = (category: StoreProductCategory | null) => {
    if (!category || !category.products?.length) {
      return "Rechercher";
    }

    if (category.products.length === 1) {
      return "Afficher 1 produit";
    }

    return `Afficher ${category.products.length} produits`;
  };

  const onClick = () => {
    if (!selectedCategory) {
      return;
    }

    router.push(`/categories/${selectedCategory?.handle}`);
  };

  return (
    <div className="flex h-fit flex-col gap-4 rounded-md bg-background-primary p-6 text-white">
      <h2 className="text-center text-lg font-bold">Découvrez la gamme RSPI</h2>
      <CategorySelect
        placeholder="Sélectionner une catégorie"
        categories={mainCategories}
        onChange={onChangeCategory}
      />
      <CategorySelect
        placeholder="Sélectionnez une sous-catégorie"
        categories={subCategories}
        onChange={onChangeCategory}
        disabled={!selectedCategory}
      />
      <SubmitButton
        className="text-md mt-2 flex h-10 w-full items-center bg-accent-primary py-1 font-sans font-bold hover:bg-hover-accent-primary disabled:bg-disabled-accent-primary disabled:text-[#6d866f]"
        disabled={!selectedCategory}
        onClick={onClick}
      >
        <div className="flex items-center gap-1">
          <HiOutlineSearch size={18} />
          {getButtonText(selectedCategory)}
        </div>
      </SubmitButton>
    </div>
  );
};

export default BrowserWidget;
