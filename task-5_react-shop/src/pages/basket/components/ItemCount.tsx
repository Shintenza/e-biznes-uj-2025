import { HStack, IconButton, NumberInput } from "@chakra-ui/react";
import { LuMinus, LuPlus } from "react-icons/lu";

type ItemCountProps = {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

const ItemCount = ({ count, onIncrease, onDecrease }: ItemCountProps) => {
  return (
    <NumberInput.Root value={`${count}`} unstyled spinOnPress={false}>
      <HStack gap="2">
        <IconButton variant="outline" size="sm" onClick={onDecrease}>
          <LuMinus />
        </IconButton>
        <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" />
        <NumberInput.IncrementTrigger asChild>
          <IconButton variant="outline" size="sm" onClick={onIncrease}>
            <LuPlus />
          </IconButton>
        </NumberInput.IncrementTrigger>
      </HStack>
    </NumberInput.Root>
  );
};

export default ItemCount;
