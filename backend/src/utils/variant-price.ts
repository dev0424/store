export const getProductMinPrice = (product: any) => {
    let min_price = null;
    let cheapest_variant_id = null;

    // Calculate min_price from variant.prices array
    if (Array.isArray(product.variants)) {
        for (const variant of product.variants) {
            if (Array.isArray(variant.prices)) {
                const variantMin = variant.prices
                    .filter(p => p.currency_code === 'eur' && !p.price_list_id)
                    .reduce((min, p) => (min === null || p.amount < min ? p.amount : min), null);

                if (variantMin !== null && (min_price === null || variantMin < min_price)) {
                    min_price = variantMin;
                    cheapest_variant_id = variant.id;
                }
            }
        }
    }

    return {
        ...product,
        min_price,
        cheapest_variant_id,
    };
};
