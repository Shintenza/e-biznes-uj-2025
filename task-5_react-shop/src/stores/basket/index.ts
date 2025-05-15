import { create } from "zustand";
import { BasketStore } from "./types";

const useBasketStore = create<BasketStore>((set, get) => ({
  products: [],
  addToBasket: (product) =>
    set((state) => {
      const existing = state.products.find((p) => p.id === product.id);
      if (existing) {
        return {
          products: state.products.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          ),
        };
      } else {
        return {
          products: [
            ...state.products,
            { ...product, quantity: product.quantity || 1 },
          ],
        };
      }
    }),
  removeFromBasket: (productId, force = false) =>
    set((state) => {
      const existing = state.products.find((p) => p.id === productId);
      if (!existing) return { products: state.products };

      if (force || existing.quantity <= 1) {
        return {
          products: state.products.filter((p) => p.id !== productId),
        };
      }
      return {
        products: state.products.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
        ),
      };
    }),
  emptyBasket: () => set(() => ({ products: [] })),
  getTotalPrice: () =>
    get().products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    ),
}));

export default useBasketStore;
