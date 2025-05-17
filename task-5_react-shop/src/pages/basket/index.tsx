import useBasketStore from "@/stores/basket";
import { Button, HStack, Stack, Text } from "@chakra-ui/react";
import BasketItem from "./components/BasketItem";
import { useNavigate } from "react-router";

const Basket = () => {
  const products = useBasketStore((state) => state.products);
  const getTotalPrice = useBasketStore((state) => state.getTotalPrice);
  const navigate = useNavigate();
  const isBasketEmpty = products.length === 0;
  const totalPrice = getTotalPrice();

  return (
    <Stack>
      <HStack justifyContent="space-between">
        <Text as="b" fontSize="xl" data-testid="basket-header">
          Basket
        </Text>
        {!isBasketEmpty && (
          <Button onClick={() => navigate("/checkout")} data-testid="checkout-button">Checkout</Button>
        )}
      </HStack>
      {isBasketEmpty && <Text data-testid="basket-empty">The basket is empty</Text>}
      <Stack>
        {products.map((product) => (
          <BasketItem product={product} />
        ))}
      </Stack>

      <Text as="b" data-testid="basket-total">{`Total price: $${totalPrice}`}</Text>
    </Stack>
  );
};

export default Basket;
