import ProductsPage from "../../components/ProductPage"; 

export default function NaturalDiamond() {
  return (
    <ProductsPage
      heroLine1="Natural Diamond Jewelry Collection"
      heroLine2="Discover our exquisite collection of handcrafted natural diamond jewelry"
      defaultExpandedFilter="category"
      pageSize={8}
      defaultFilters={{ material: ["natural_diamond"] }}
    />
  );
}
