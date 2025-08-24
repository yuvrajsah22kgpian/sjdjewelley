import ProductsPage from "../../components/ProductPage"; 

export default function Accessories() {
  return (
    <ProductsPage
      heroLine1="Accessories Collection"
      heroLine2="Complete your look with our stunning jewelry accessories"
      defaultExpandedFilter="material"
      pageSize={8}
      defaultFilters={{ category: ["accessories"] }}
    />
  );
}
