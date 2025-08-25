import ProductsPage from "../../src/components/ProductPage"; 

export default function WomensJewelry() {
  return (
    <ProductsPage
      heroLine1="Women's Jewelry Collection"
      heroLine2="Elegant jewelry pieces for every woman's style"
      defaultExpandedFilter="category"
      pageSize={8}
      defaultFilters={{ occasion: ["casual", "formal", "engagement", "wedding", "cocktail"] }}
    />
  );
}
