import Navbar from "@/components/navbar";
import { Box, Stack } from "@chakra-ui/react";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <Stack justifyContent="center" gap="32px" pb="32px">
      <Navbar />
      <Box w="60%" mx="auto">
        <Outlet />
      </Box>
    </Stack>
  );
};

export default MainLayout;
