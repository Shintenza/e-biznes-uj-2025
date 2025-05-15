import { HStack, Text } from "@chakra-ui/react";
import Basket from "./basket/Basket";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <HStack boxShadow="xs" py="42px" px="84px" justifyContent="space-between">
      <Text fontSize="xl" onClick={() => navigate("/")} cursor="pointer">
        Simple Shop
      </Text>
      <Basket />
    </HStack>
  );
};

export default Navbar;
