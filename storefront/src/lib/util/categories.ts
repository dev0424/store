import { StoreProductCategory } from "@medusajs/types";

export function filterMainCategories(categories: StoreProductCategory[]) {
  return categories?.filter((category) => !category.parent_category_id);
}

export function hasChildrenCategory(category: StoreProductCategory) {
  return category.category_children.length > 0;
}
