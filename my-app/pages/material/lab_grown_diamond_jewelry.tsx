import ProductsPage from "../../src/components/ProductPage"; 

export default function LabGrownDiamond() {
  return (
    <ProductsPage
      heroLine1="Natural Diamond Jewelry Collection"
      heroLine2="Discover our exquisite collection of handcrafted diamond jewelry"
      defaultExpandedFilter="category"
      pageSize={8}
      defaultFilters={{}}
    />
  );
}
