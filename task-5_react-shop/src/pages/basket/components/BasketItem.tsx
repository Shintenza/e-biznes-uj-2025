import useBasketStore from "@/stores/basket";
import { BasketItem } from "@/stores/basket/types";
import { HStack, Image, Text } from "@chakra-ui/react";
import ItemCount from "./ItemCount";

type BasketItemProps = {
  product: BasketItem;
};
const BasketItem = ({ product }: BasketItemProps) => {
  const addToBasket = useBasketStore((state) => state.addToBasket);
  const removeFromBasket = useBasketStore((state) => state.removeFromBasket);
  const price = product.price * product.quantity;

  return (
    <HStack
      border="1px solid black"
      borderRadius="sm"
      justifyContent="space-between"
      w="100%"
      pr="24px"
    >
      <HStack>
        <Image src={product.imageUrl} w="240px" aspectRatio="16/9" />
        <Text>{product.name}</Text>
      </HStack>

      <HStack>
        <HStack>
          <Text as="b">${price}</Text>
        </HStack>
        <ItemCount
          count={product.quantity}
          onIncrease={() => addToBasket(product)}
          onDecrease={() => removeFromBasket(product.id)}
        />
      </HStack>
    </HStack>
  );
};

export default BasketItem;
