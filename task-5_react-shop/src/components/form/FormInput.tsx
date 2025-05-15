import { Field, Input } from "@chakra-ui/react";
import { Controller, FieldValues } from "react-hook-form";
import { ControlledFieldProps } from "./types";

type FormInputProps<T extends FieldValues> = {
  placeholder?: string;
  label: string;
} & ControlledFieldProps<T>;

const FormInput = <T extends FieldValues>({
  control,
  name,
  placeholder,
  label,
  rules,
}: FormInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Field.Root required invalid={!!error}>
          <Field.Label>{label}</Field.Label>
          <Input value={value} onChange={onChange} placeholder={placeholder} />
          {error && <Field.ErrorText>{error.message}</Field.ErrorText>}
        </Field.Root>
      )}
    />
  );
};

export default FormInput;
