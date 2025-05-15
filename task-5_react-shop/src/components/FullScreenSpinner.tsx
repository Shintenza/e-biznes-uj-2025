import { Flex, Spinner } from "@chakra-ui/react";

const FullScreenSpinner = () => {
  return (
    <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
      <Spinner size="lg" />
    </Flex>
  );
};

export default FullScreenSpinner;
