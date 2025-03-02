"use client";

import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

export default function MuiThemeProvider({ children }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#755f56",
        contrastText: "#ffffff",
      },
    },
    typography: {
      fontFamily: "moraba-regular",
    },
    direction: "rtl",
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
