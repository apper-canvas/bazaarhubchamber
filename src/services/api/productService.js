import productsData from "@/services/mockData/products.json";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const productService = {
  async getAll() {
    await delay(300);
    return [...productsData];
  },

  async getById(id) {
    await delay(200);
    const product = productsData.find((p) => p.Id === parseInt(id));
    if (!product) {
      throw new Error("Product not found");
    }
    return { ...product };
  },

  async getByCategory(category) {
    await delay(300);
    return productsData.filter((p) => p.category === category);
  },

  async searchProducts(query) {
    await delay(300);
    const lowerQuery = query.toLowerCase();
    return productsData.filter(
      (p) =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
    );
  },

  async filterProducts(filters) {
    await delay(300);
let filtered = [...productsData];

    if (filters.category && filters.category !== "All") {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    if (filters.subcategory) {
      filtered = filtered.filter((p) => p.subcategory === filters.subcategory);
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= filters.maxPrice);
    }

    if (filters.minRating !== undefined) {
      filtered = filtered.filter((p) => p.rating >= filters.minRating);
    }

    if (filters.brands && filters.brands.length > 0) {
      filtered = filtered.filter((p) => {
        const productBrand = p.specifications?.Brand;
        return productBrand && filters.brands.includes(productBrand);
      });
    }

    if (filters.colors && filters.colors.length > 0) {
      filtered = filtered.filter((p) => {
        const productColor = p.specifications?.Color;
        return productColor && filters.colors.some(color => 
          productColor.toLowerCase().includes(color.toLowerCase())
        );
      });
    }

    if (filters.sizes && filters.sizes.length > 0) {
      filtered = filtered.filter((p) => {
        const availableSizes = p.specifications?.["Available Sizes"];
        if (!availableSizes) return false;
        const sizesArray = typeof availableSizes === 'string' 
          ? availableSizes.split(',').map(s => s.trim())
          : Array.isArray(availableSizes) ? availableSizes : [];
        return filters.sizes.some(size => 
          sizesArray.some(availSize => 
            availSize.toLowerCase() === size.toLowerCase()
          )
        );
      });
    }

    if (filters.inStockOnly) {
      filtered = filtered.filter((p) => p.inStock === true);
    }

    return filtered;
  }
};

export default productService;