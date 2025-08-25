import ProductsPage from "../../src/components/ProductPage"; 

export default function PlainGoldJewelry() {
  return (
    <ProductsPage
      heroLine1="Plain Gold Jewelry Collection"
      heroLine2="Timeless elegance in pure gold jewelry"
      defaultExpandedFilter="category"
      pageSize={8}
      defaultFilters={{ material: ["gold"] }}
    />
  );
}
