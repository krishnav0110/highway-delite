"use client";
import * as React from "react";
import { useRouter, usePathname } from "next/navigation";

import { Box } from "@mui/material";
import { AppBar, Toolbar } from "@mui/material";
import { Typography, Button } from "@mui/material";

import { LogoIcon } from "@/components/icons";

import { links } from "@/lib/constants";

import { useAuth } from "../context/AuthContext";





export const Navbar: React.FC = () => {

  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, logout } = useAuth();

  const currentActivePage = links.find(link => link.href === pathname)?.displayName;





  const handleSignOut = async (event: any) => {
    event.preventDefault();
    try {
      await logout();
      router.push("/signin");
    }
    catch (error) {
      console.error(error);
    }
  };





  return (
    <AppBar position="static" elevation={0} sx={{ color: "inherit", bgcolor: "Background" }}>
      <Toolbar sx={{ justifyContent: { xs: "center", md: "initial" } }}>
        <Box sx={{ display: "flex", alignItems: "center", flex: user? 1:0 }}>
          <LogoIcon sx={{ mx: 1 }} />

          {!user?
            <Typography variant="h6">HD</Typography>
            :
            <Typography variant="h6" sx={{ ml: 2 }}>{currentActivePage ?? "HD"}</Typography>
          }
        </Box>

        {user &&
          <Button
            loading={isLoading}
            sx={{ fontWeight: "bold", textDecoration: "underline" }}
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        }
      </Toolbar>
    </AppBar>
  );
}