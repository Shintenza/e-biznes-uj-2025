import { useProducts } from "@/api/product/hooks";
import FullScreenSpinner from "@/components/FullScreenSpinner";
import ProductsGrid from "./components/ProductsGrid";
import { Stack, Text } from "@chakra-ui/react";

const Products = () => {
  const { data, isLoading } = useProducts();
  if (isLoading) return <FullScreenSpinner />;
  return (
    <Stack px="64px" flexDir="column" alignItems="center" gap="32px">
      <Text fontSize="xl">Available products</Text>
      <ProductsGrid products={data ?? []} />
    </Stack>
  );
};

export default Products;
