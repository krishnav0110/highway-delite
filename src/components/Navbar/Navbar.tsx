"use client";
import { usePathname } from "next/navigation";

import { Box } from "@mui/material";
import { AppBar, Toolbar } from "@mui/material";
import { Typography, Link } from "@mui/material";

import { LogoIcon } from "@/components/icons/icons";

import { links } from "@/lib/constants";





const user = {};





export default function Navbar() {
  const pathname = usePathname();
  const currentActivePage = links.find(link => link.href === pathname)?.displayName;





  const handleSignOut = async (event: any) => {
    event.preventDefault();
    console.log("sign out");
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