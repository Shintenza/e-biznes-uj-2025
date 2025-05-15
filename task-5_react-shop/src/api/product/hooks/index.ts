import { useMutation, useQuery } from "@tanstack/react-query";
import KEYS from "../product.keys";
import { useWithBackend } from "@/api/useWithBackend";
import QUERIES from "../product.queries";
import MUTATIONS from "../product.mutations";

export const useCheckout = () => {
  return useMutation({
    mutationFn: useWithBackend(MUTATIONS.handleCheckout).bind(null),
  });
};

export const useProducts = () => {
  return useQuery({
    queryKey: [...KEYS.GET_PRODUCTS],
    queryFn: useWithBackend(QUERIES.getProducts).bind(null),
  });
};
