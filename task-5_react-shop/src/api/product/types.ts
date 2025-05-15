import { BasketItem } from "@/stores/basket/types";

export type CheckoutItem = Pick<BasketItem, "id" | "quantity">;
export type CheckoutData = {
  firstName: string;
  lastName: string;
  email: string;
  products: Array<CheckoutItem>;
};
