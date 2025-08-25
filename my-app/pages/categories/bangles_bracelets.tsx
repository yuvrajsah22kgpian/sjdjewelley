import ProductsPage from "../../src/components/ProductPage"; 

export default function BanglesBracelets() {
  return (
    <ProductsPage
      heroLine1="Bangles & Bracelets Collection"
      heroLine2="Adorn your wrists with our beautiful bangles and bracelets"
      defaultExpandedFilter="material"
      pageSize={8}
      defaultFilters={{ category: ["bangles_bracelets"] }}
    />
  );
}
