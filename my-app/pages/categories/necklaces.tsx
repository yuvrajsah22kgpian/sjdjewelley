import ProductsPage from "../../components/ProductPage"; 

export default function Necklaces() {
  return (
    <ProductsPage
      heroLine1="Necklaces Collection"
      heroLine2="Find the perfect necklace to complement your style"
      defaultExpandedFilter="material"
      pageSize={8}
      defaultFilters={{ category: ["necklaces"] }}
    />
  );
}
