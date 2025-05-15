import FormInput from "@/components/form/FormInput";
import useBasketStore from "@/stores/basket";
import { Button, Stack, Text } from "@chakra-ui/react";
import { Control } from "react-hook-form";
import { CheckoutFormData } from "../types";

type CheckoutFromProps = {
  control: Control<CheckoutFormData>;
  onSubmit: () => void;
};

const commonFormRules = {
  required: "This field is required",
};

const CheckoutForm = ({ control, onSubmit }: CheckoutFromProps) => {
  const getTotalPrice = useBasketStore((state) => state.getTotalPrice);

  return (
    <Stack>
      <FormInput
        control={control}
        name="firstName"
        label="First name"
        placeholder="eg. Joe"
        rules={commonFormRules}
      />
      <FormInput
        control={control}
        name="lastName"
        label="Last name"
        placeholder="eg. Smith"
        rules={commonFormRules}
      />
      <FormInput
        control={control}
        name="email"
        label="Email"
        placeholder="eg. joe.smith@mail.com"
        rules={commonFormRules}
      />
      <Text>{`Total amount to pay: $${getTotalPrice()}`}</Text>
      <Button onClick={onSubmit}>Pay</Button>
    </Stack>
  );
};

export default CheckoutForm;
