import { Stack, Text } from "@chakra-ui/react";
import CheckoutForm from "./components/CheckoutForm";
import { useForm } from "react-hook-form";
import { CheckoutFormData } from "./types";
import useBasketStore from "@/stores/basket";
import { useCheckout } from "@/api/product/hooks";
import { CheckoutData } from "@/api/product/types";
import { useNavigate } from "react-router";
import { toaster } from "@/components/ui/toaster";

const Checkout = () => {
  const { control, handleSubmit } = useForm<CheckoutFormData>();
  const { mutateAsync } = useCheckout();
  const basket = useBasketStore((state) => state.products);
  const emptyBasket = useBasketStore((state) => state.emptyBasket);
  const navigate = useNavigate();

  const handleForm = async (data: CheckoutFormData) => {
    const checkoutData: CheckoutData = {
      ...data,
      products: basket,
    };
    try {
      await mutateAsync(checkoutData);
      emptyBasket();
      navigate("/");
      toaster.create({
        title: "Success",
        type: "success",
      });
    } catch {
      toaster.create({
        title: "Something went wrong!",
        type: "error",
      });
    }
  };

  return (
    <Stack>
      <Text as="b" fontSize="xl">
        Checkout
      </Text>
      <CheckoutForm control={control} onSubmit={handleSubmit(handleForm)} />
    </Stack>
  );
};

export default Checkout;
