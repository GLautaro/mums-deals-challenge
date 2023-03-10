/**
 * Returns the minimum and maximum prices for a product's variants.
 *
 * @param {Product} product - A Product object with variants that have prices.
 * @returns {[number, number]} - An array of two numbers representing the minimum and maximum prices of the product's variants.
 */
export function getMinAndMaxPrice(product: Product): [number, number] {
    // Initialize variables to track minimum and maximum prices.
    let minPrice = Number.POSITIVE_INFINITY;
    let maxPrice = Number.NEGATIVE_INFINITY;
  
    // Iterate over the product's variants and update minPrice and maxPrice accordingly.
    for (const variant of product.variants) {
      const price = Number(variant.compare_at_price || variant.price);
      if (price < minPrice) {
        minPrice = price;
      }
  
      if (price > maxPrice) {
        maxPrice = price;
      }
    }
  
    // Return an array of two numbers representing the minimum and maximum prices.
    return [minPrice, maxPrice];
  }


/**
 * Sorts and filters an array of products based on selected criteria.
 *
 * @param {Product[]} products - Array of Product objects.
 * @param {string} sortBy - Sort criteria, can be 'nameAsc', 'nameDesc', 'priceAsc', or 'priceDesc'.
 * @param {string[]} selectedTypes - Array of product types to include in the results. If empty, all types are included.
 * @param {number[]} priceRange - Array representing the price range to include in the results, in the format [minPrice, maxPrice].
 * @returns {Product[]} - Sorted and filtered array of Product objects.
 */

export function sortAndFilterProduct(
    products: Product[],
    sortBy: string,
    selectedTypes: string[],
    priceRange: number[]
  ) {
    let sortedProducts = [...products].sort((a, b) => {
        const [a_minPrice] = getMinAndMaxPrice(a);
        const [b_minPrice] = getMinAndMaxPrice(b);
  
      switch (sortBy) {
        case "nameAsc":
          return a.title.localeCompare(b.title);
        case "nameDesc":
          return b.title.localeCompare(a.title);
        case "priceAsc":
          return a_minPrice - b_minPrice;
        case "priceDesc":
          return b_minPrice - a_minPrice;
        default:
          return 0;
      }
    });
  
    if (selectedTypes.length) {
      sortedProducts = sortedProducts.filter((product) =>
        selectedTypes.includes(product.product_type)
      );
    }
  
    return sortedProducts.filter((product) =>
      product.variants.some(
        (variant) =>
          Number(variant.compare_at_price || variant.price) >= priceRange[0] &&
          Number(variant.compare_at_price || variant.price) <= priceRange[1]
      )
    );
  }
