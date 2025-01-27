import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '@/lib/theme';
import "./globals.css";

import { Navbar } from "@/components/Navbar";
import { AuthProvider } from "@/components/context/AuthContext";





export const metadata: Metadata = {
  title: "Highway Delite Intern Task",
  description: "note creator task",
};





export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
              <Navbar />
              {children}
            </AuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}