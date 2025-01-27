"use client";
import * as React from "react";
import { useRouter, usePathname } from "next/navigation";

import { Box } from "@mui/material";
import { AppBar, Toolbar } from "@mui/material";
import { Typography, Link } from "@mui/material";

import { LogoIcon } from "@/components/icons";

import { links } from "@/lib/constants";

import { useAuth } from "../context/AuthContext";





export const Navbar: React.FC = () => {

  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const currentActivePage = links.find(link => link.href === pathname)?.displayName;





  const handleSignOut = async (event: any) => {
    event.preventDefault();
    logout();
    router.push("/signin");
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
          <Link
            href=""
            variant="body2"  
            sx={{ fontWeight: "bold" }}
            onClick={handleSignOut}
          >
            Sign out
          </Link>
        }
      </Toolbar>
    </AppBar>
  );
}