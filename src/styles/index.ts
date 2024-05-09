import { createTheme, alpha } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#f5f5f5",
      light: "#fff",
      dark: "#78909c",
    },
    secondary: {
      main: "#4ba1a1",
    },
    text: {
      primary: "#000",
      secondary: "#fff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#4ba1a1",
          color: "#fff",
          "&:hover": {
            backgroundColor: alpha("#4ba1a1", 0.9),
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#2b2b2b",
          color: "#fff",
        },
      },
    },
  },
});
