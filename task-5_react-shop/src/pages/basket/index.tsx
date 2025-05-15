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
        <Text as="b" fontSize="xl">
          Basket
        </Text>
        {!isBasketEmpty && (
          <Button onClick={() => navigate("/checkout")}>Checkout</Button>
        )}
      </HStack>
      {isBasketEmpty && <Text>The basket is empty</Text>}
      <Stack>
        {products.map((product) => (
          <BasketItem product={product} />
        ))}
      </Stack>

      <Text as="b">{`Total price: $${totalPrice}`}</Text>
    </Stack>
  );
};

export default Basket;
