import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Products from "./pages/products";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Basket from "./pages/basket";
import Checkout from "./pages/checkout";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Products />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
export default App;
