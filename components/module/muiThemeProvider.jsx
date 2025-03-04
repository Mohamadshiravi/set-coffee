"use client";

import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

export default function MuiThemeProvider({ children }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#755f56",
        contrastText: "#ffffff",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            height: "50px",
            fontSize: "1.2rem",
          },
        },
      },
    },
    typography: {
      fontFamily: "moraba-regular",
    },

    direction: "rtl",
  });
  const rtlCache = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  return (
    <ThemeProvider theme={theme}>
      <CacheProvider value={rtlCache}>{children}</CacheProvider>
    </ThemeProvider>
  );
}
