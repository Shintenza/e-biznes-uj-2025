import { snakecased } from "@/utils/case";
import axios from "axios";
import { CheckoutData } from "./types";

const handleCheckout = async (url: string, data: CheckoutData) => {
  const endpoint = `${url}/checkout`;
  const snakeCasedData = snakecased(data);
  await axios.post(endpoint, snakeCasedData);
};

const MUTATIONS = {
  handleCheckout,
};

export default MUTATIONS;
