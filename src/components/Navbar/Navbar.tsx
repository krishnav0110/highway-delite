import { Box } from "@mui/material";
import { AppBar, Toolbar } from "@mui/material";
import { Typography } from "@mui/material";

import { LogoIcon } from "@/components/icons/icons";





export default function Navbar() {
  return (
    <AppBar position="static" elevation={0} sx={{ color: "inherit", bgcolor: "primary.contrastText" }}>
      <Toolbar sx={{ justifyContent: { xs: "center", md: "initial" } }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LogoIcon sx={{ mx: 1 }} />
          <Typography variant="h6">HD</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}