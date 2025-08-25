import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

const theme = createTheme({
  palette: {
    primary: {
      main: '#3B82F6', // Blue color matching the original design
    },
    secondary: {
      main: '#F59E0B', // Orange color matching the original design
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
