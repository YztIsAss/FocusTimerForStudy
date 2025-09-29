import Header from "@/components/header";
import Footer from "@/components/footer";
import { useState, useEffect, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Paper,
  Stack,
  Grid,
} from "@mui/material";
import {
  Rocket,
  MenuBook,
  FlashOn,
  Inventory,
  Settings,
  Smartphone,
  Code,
  Route,
} from "@mui/icons-material";
import Counter from "@/components/counter";
import TodoList from "@/components/todo-list";
import SettingsPage, { TimerSettings } from "@/components/settings";
const STORAGE_KEY = "timerSettings";

export default function Home() {
  const defaultSettings: TimerSettings = {
    pomoMinutes: 25,
    shortBreakMinutes: 5,
    longBreakMinutes: 15,
    cyclesBeforeLongBreak: 4,
    roundsPerSession: 1,
    enableSound: true,
    enableVibration: false,
    isDarkMode: false,
    preset: "Custom",
  };
  const getSettings = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as TimerSettings;
    } catch {
      /* ignore */
    }
    return defaultSettings;
  }
  const [settings, setSettings] = useState<TimerSettings>(getSettings());
  // ダークテーマ切替
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: settings.isDarkMode ? "dark" : "light",
        },
      }),
    [settings.isDarkMode],
  );

  const handleSaveSettings = (newSettings: TimerSettings) => {
    setSettings(newSettings);
  };
  const [pageId, setPageId] = useState<number>(0);
  const pages = [
    <Counter settings={settings}/>,
    <TodoList />,
    <SettingsPage initialSettings={settings} onSave={handleSaveSettings} />,
  ];
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
        <Header />
        <Paper square sx={{ pb: "50px" }}>
          {pages[pageId]}
        </Paper>

        <Footer pageId={pageId} setPageId={setPageId} />
      </Box>
    </ThemeProvider>
  );
}
