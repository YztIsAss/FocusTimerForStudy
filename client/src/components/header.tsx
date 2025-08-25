import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Menu as MenuIcon, FlashOn } from "@mui/icons-material";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { label: "Home", id: "home" },
    { label: "Features", id: "features" },
    { label: "Components", id: "components" },
    { label: "Docs", id: "docs" },
  ];

  return (
    <>
      <AppBar position="sticky" color="inherit" elevation={1}>
        <Toolbar sx={{ maxWidth: "1200px", width: "100%", mx: "auto" }}>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <FlashOn color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
              React + Vite
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  sx={{ textTransform: "none" }}
                >
                  {item.label}
                </Button>
              ))}
              <Button variant="contained" sx={{ textTransform: "none" }}>
                Get Started
              </Button>
            </Box>
          )}

          {isMobile && (
            <IconButton
              edge="end"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <Box sx={{ width: 250, pt: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton onClick={() => scrollToSection(item.id)}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton>
                <Button variant="contained" fullWidth sx={{ textTransform: "none" }}>
                  Get Started
                </Button>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
