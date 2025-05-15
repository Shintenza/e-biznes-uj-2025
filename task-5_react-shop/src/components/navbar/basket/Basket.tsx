import useBasketStore from "@/stores/basket";
import { Box, Circle, Float, Icon } from "@chakra-ui/react";
import { FaBasketShopping } from "react-icons/fa6";
import { useNavigate } from "react-router";

const Basket = () => {
  const productsCount = useBasketStore((state) => state.products.length);
  const navigate = useNavigate();

  return (
    <Box position="relative" cursor="pointer">
      {productsCount > 0 && (
        <Float>
          <Circle size="5" bg="red" color="white">
            {productsCount}
          </Circle>
        </Float>
      )}
      <Icon size="2xl" onClick={() => navigate("/basket")}>
        <FaBasketShopping />
      </Icon>
    </Box>
  );
};

export default Basket;
