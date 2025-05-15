import { camelcased } from "@/utils/case";

export function useWithBackend<
  const Args extends unknown[],
  const ReturnType extends Promise<unknown>
>(func: (url: string, ...arg: Args) => ReturnType) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("missing VITE_BACKEND_URL env variable");
  }
  return async (...args: Args) => camelcased(await func(backendUrl, ...args));
}
