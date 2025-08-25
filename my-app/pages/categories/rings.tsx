import ProductsPage from "../../src/components/ProductPage"; 

export default function Rings() {
  return (
    <ProductsPage
      heroLine1="Rings Collection"
      heroLine2="Discover our stunning collection of rings for every occasion"
      defaultExpandedFilter="material"
      pageSize={8}
      defaultFilters={{ category: ["rings"] }}
    />
  );
}
