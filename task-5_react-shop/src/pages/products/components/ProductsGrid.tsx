import type { Product } from "@/types/product";
import { Grid } from "@chakra-ui/react";
import ProductCard from "./ProductCard";

type ProductsGridProps = {
  products: Array<Product>;
};

const ProductsGrid = ({ products }: ProductsGridProps) => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap="12px" maxW="fit-content">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </Grid>
  );
};

export default ProductsGrid;
