"use client";

import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";



const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});





export const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: "#367AFF",
      contrastText: "#fafaff",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    button: {
      textTransform: "none",
    },
  },
});