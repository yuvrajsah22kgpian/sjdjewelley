import ProductsPage from "../../components/ProductPage"; 

export default function Pendants() {
  return (
    <ProductsPage
      heroLine1="Pendants Collection"
      heroLine2="Discover our exquisite pendants to add elegance to any outfit"
      defaultExpandedFilter="material"
      pageSize={8}
      defaultFilters={{ category: ["pendants"] }}
    />
  );
}
