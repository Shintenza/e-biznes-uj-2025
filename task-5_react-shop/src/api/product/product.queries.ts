import type { Product } from "@/types/product";
import axios from "axios";

const getProducts = async (url: string) => {
  const endpoint = `${url}/products`;

  const { data } = await axios.get(endpoint);
  return data as Array<Product>;
};

const QUERIES = {
  getProducts,
};

export default QUERIES;
