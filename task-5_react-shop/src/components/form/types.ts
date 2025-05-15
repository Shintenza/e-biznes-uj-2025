import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";

export type ControlledFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: Pick<
    RegisterOptions<T>,
    "maxLength" | "minLength" | "pattern" | "validate" | "required"
  >;
};
