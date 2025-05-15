import type { Product } from "@/types/product";

export type BasketStore = {
  products: BasketItem[];
  addToBasket: (product: BasketItem) => void;
  removeFromBasket: (productId: number) => void;
  emptyBasket: () => void;
  getTotalPrice: () => number;
};

export type BasketItem = Omit<Product, "description"> & {
  quantity: number;
};
