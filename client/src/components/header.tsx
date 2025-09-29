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
import { Schedule as ScheduleIcon } from "@mui/icons-material";

export default function Header() {
  return (
    <>
      <AppBar position="sticky" color="inherit" elevation={1}>
        <Toolbar sx={{ maxWidth: "1200px", width: "100%", mx: "auto" }}>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <ScheduleIcon color="primary" sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              集中タイマー
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
