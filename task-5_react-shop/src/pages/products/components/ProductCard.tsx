import useBasketStore from "@/stores/basket";
import type { Product } from "@/types/product";
import { Button, Card, HStack, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { imageUrl, name, description, price } = product;
  const addToBasket = useBasketStore((state) => state.addToBasket);
  const navigate = useNavigate();

  const updateBasket = () => {
    addToBasket({ ...product, quantity: 1 });
  };

  const handleBuyNow = () => {
    navigate("/checkout");
    updateBasket();
  };
  return (
    <Card.Root maxW="sm" overflow="hidden" maxH="sm" data-testid="product-card">
      <Image src={imageUrl} alt={`photo of ${name}`} maxH="190px" data-testid="product-image" />
      <Card.Body gap="4px">
        <Card.Title>
          <HStack justifyContent="space-between" alignItems="center">
            <Text data-testid="product-title">{name}</Text>
            <Text
              textStyle="2xl"
              fontWeight="medium"
              letterSpacing="tight"
              mt="2"
              data-testid="product-price"
            >
              ${price}
            </Text>
          </HStack>
        </Card.Title>
        <Card.Description data-testid="product-description">{description}</Card.Description>
      </Card.Body>
      <Card.Footer>
        <Button variant="solid" onClick={handleBuyNow} data-testid="buy-now-button">
          Buy now
        </Button>
        <Button variant="outline" onClick={updateBasket} data-testid="add-to-cart-button">
          Add to cart
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductCard;
