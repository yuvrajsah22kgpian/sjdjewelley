import ProductsPage from "../../components/ProductPage"; 

export default function MensJewelry() {
  return (
    <ProductsPage
      heroLine1="Men's Jewelry Collection"
      heroLine2="Sophisticated jewelry designed for the modern gentleman"
      defaultExpandedFilter="category"
      pageSize={8}
      defaultFilters={{ occasion: ["casual", "formal"] }}
    />
  );
}
