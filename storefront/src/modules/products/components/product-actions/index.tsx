"use client";

import { addToCart } from "@lib/data/cart";
import { useIntersection } from "@lib/hooks/use-in-view";
import { HttpTypes } from "@medusajs/types";
import { Button } from "@medusajs/ui";
import Divider from "@modules/common/components/divider";
import OptionSelect from "@modules/products/components/product-actions/option-select";
import { isEqual } from "lodash";
import { useParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import ProductPrice from "../product-price";
import MobileActions from "./mobile-actions";
import {
  HiOutlineUser as UserIcon,
  HiOutlineShoppingCart as ShoppingCartIcon,
} from "react-icons/hi";

type Props = {
  product: HttpTypes.StoreProduct;
  region: HttpTypes.StoreRegion;
  disabled?: boolean;
  isLoggedIn?: boolean;
  isApproved?: boolean;
  isLoading?: boolean;
};

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"],
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value;
    return acc;
  }, {});
};

export default function ProductActions({
  product,
  disabled,
  isLoggedIn,
  isApproved,
  isLoading,
}: Props) {
  const [options, setOptions] = useState<Record<string, string | undefined>>(
    () => {
      // If there is only 1 variant, preselect the options
      if (product.variants?.length === 1) {
        return optionsAsKeymap(product.variants[0].options) ?? {};
      }
      return {};
    },
  );

  const [isAdding, setIsAdding] = useState(false);
  const countryCode = useParams().countryCode as string;

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return;
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options);
      return isEqual(variantOptions, options);
    });
  }, [product.variants, options]);

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }));
  };

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options);
      return isEqual(variantOptions, options);
    });
  }, [product.variants, options]);

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true;
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true;
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true;
    }

    // Otherwise, we can't add to cart
    return false;
  }, [selectedVariant]);

  const actionsRef = useRef<HTMLDivElement>(null);

  const inView = useIntersection(actionsRef, "0px");

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null;

    setIsAdding(true);

    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
    });

    setIsAdding(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-y-4">
        <div className="h-[36px] w-48 animate-pulse rounded-md bg-gray-100" />
        <Button
          disabled={true}
          isLoading={true}
          variant="primary"
          className="text-md h-10 w-full py-1 font-sans font-bold text-white shadow-none disabled:shadow-none"
        />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col gap-y-2">
        <ProductPrice product={product} variant={selectedVariant} />
        <Button
          disabled={true}
          variant="primary"
          className="text-md h-10 w-full py-1 font-sans font-bold text-white shadow-none disabled:shadow-none"
        >
          <UserIcon size={20} />
          Se connecter pour acheter
        </Button>
      </div>
    );
  }

  if (!isApproved) {
    return (
      <div className="flex flex-col gap-y-2">
        <ProductPrice product={product} variant={selectedVariant} />
        <Button
          disabled={true}
          variant="primary"
          className="text-md h-10 w-full py-1 font-sans font-bold text-white shadow-none disabled:shadow-none"
        >
          <UserIcon size={20} />
          Approbation en attente
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.id]}
                      updateOption={setOptionValue}
                      title={option.title ?? ""}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding}
                    />
                  </div>
                );
              })}
              <Divider />
            </div>
          )}
        </div>

        <ProductPrice product={product} variant={selectedVariant} />

        <Button
          onClick={handleAddToCart}
          disabled={
            !inStock ||
            !selectedVariant ||
            !!disabled ||
            isAdding ||
            !isValidVariant
          }
          variant="primary"
          className="text-md h-10 w-full py-1 font-sans font-bold text-white shadow-none disabled:shadow-none"
          isLoading={isAdding}
          data-testid="add-product-button"
        >
          <ShoppingCartIcon size={20} />
          {!selectedVariant && !options
            ? "Sélectionnez la variante"
            : !inStock || !isValidVariant
              ? "En rupture de stock"
              : "Ajouter au panier"}
        </Button>
        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  );
}
