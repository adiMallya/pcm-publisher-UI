import { Box, CssBaseline } from "@mui/material";

import { NavBar } from "./NavBar";

export const SiteLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <CssBaseline />
      <NavBar />
      <Box
        component={"main"}
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </>
  );
};
