import ProductsPage from "../../src/components/ProductPage"; 

export default function Earrings() {
  return (
    <ProductsPage
      heroLine1="Earrings Collection"
      heroLine2="Explore our elegant earrings from classic studs to statement pieces"
      defaultExpandedFilter="material"
      pageSize={8}
      defaultFilters={{ category: ["earrings"] }}
    />
  );
}
