import Header from "@/components/header";
import Footer from "@/components/footer";
import Counter from "@/components/counter";
import TodoList from "@/components/todo-list";
import ApiData from "@/components/api-data";
import ContactForm from "@/components/contact-form";
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Card,
  CardContent,
  Paper,
  Stack,
  Grid
} from "@mui/material";
import { 
  Rocket, 
  MenuBook, 
  FlashOn, 
  Inventory, 
  Settings, 
  Smartphone, 
  Code, 
  Route 
} from "@mui/icons-material";

export default function Home() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      <Header />
      
      {/* Hero Section */}
      <Box component="section" id="home" sx={{ py: { xs: 10, lg: 16 }, bgcolor: "grey.100" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center" }}>
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: "2.5rem", md: "4rem" }, 
                fontWeight: "bold", 
                mb: 3 
              }}
            >
              Build Fast with{" "}
              <Typography component="span" color="primary" sx={{ fontSize: "inherit" }}>
                React
              </Typography>
              {" + "}
              <Typography component="span" color="secondary" sx={{ fontSize: "inherit" }}>
                Vite
              </Typography>
            </Typography>
            
            <Typography 
              variant="h5" 
              color="text.secondary" 
              sx={{ maxWidth: "800px", mx: "auto", mb: 4 }}
            >
              Experience lightning-fast development with hot module replacement, optimized builds, 
              and modern JavaScript support. Create production-ready React applications in minutes.
            </Typography>
            
            <Stack 
              direction={{ xs: "column", sm: "row" }} 
              spacing={2} 
              justifyContent="center" 
              sx={{ mb: 6 }}
            >
              <Button 
                variant="contained" 
                size="large" 
                startIcon={<Rocket />}
                sx={{ px: 4, py: 1.5 }}
              >
                Create New Project
              </Button>
              <Button 
                variant="outlined" 
                size="large" 
                startIcon={<MenuBook />}
                sx={{ px: 4, py: 1.5 }}
              >
                View Documentation
              </Button>
            </Stack>
            
            {/* Terminal Preview */}
            <Paper 
              elevation={8} 
              sx={{ 
                bgcolor: "grey.900", 
                color: "white", 
                p: 3, 
                borderRadius: 3, 
                maxWidth: "600px", 
                mx: "auto",
                textAlign: "left"
              }}
            >
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Box sx={{ width: 12, height: 12, bgcolor: "red", borderRadius: "50%" }} />
                <Box sx={{ width: 12, height: 12, bgcolor: "yellow", borderRadius: "50%" }} />
                <Box sx={{ width: 12, height: 12, bgcolor: "green", borderRadius: "50%" }} />
                <Typography variant="body2" color="grey.400" sx={{ ml: 2 }}>
                  Terminal
                </Typography>
              </Stack>
              <Typography variant="body2" component="div" sx={{ fontFamily: "monospace" }}>
                <Typography color="success.main">$ npm create vite@latest my-react-app -- --template react</Typography>
                <Typography color="grey.500">✓ Project created successfully!</Typography>
                <Typography color="success.main">$ cd my-react-app && npm install</Typography>
                <Typography color="success.main">$ npm run dev</Typography>
                <Typography color="grey.500">🚀 Development server started at http://localhost:5173</Typography>
              </Typography>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box component="section" id="features" sx={{ py: 10, bgcolor: "white" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
              Why Choose React + Vite?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: "800px", mx: "auto" }}>
              Modern development tools that prioritize speed, efficiency, and developer experience
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: "100%", "&:hover": { boxShadow: 4 } }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ 
                    width: 48, 
                    height: 48, 
                    bgcolor: "primary.light", 
                    borderRadius: 2, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    mb: 3 
                  }}>
                    <FlashOn color="primary" sx={{ fontSize: "2rem" }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    Lightning Fast HMR
                  </Typography>
                  <Typography color="text.secondary">
                    Hot Module Replacement updates your app instantly without losing state. 
                    See changes in milliseconds, not seconds.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: "100%", "&:hover": { boxShadow: 4 } }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ 
                    width: 48, 
                    height: 48, 
                    bgcolor: "info.light", 
                    borderRadius: 2, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    mb: 3 
                  }}>
                    <Inventory color="info" sx={{ fontSize: "2rem" }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    Component Architecture
                  </Typography>
                  <Typography color="text.secondary">
                    Build reusable, composable components with React's powerful component system 
                    and modern hooks.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: "100%", "&:hover": { boxShadow: 4 } }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ 
                    width: 48, 
                    height: 48, 
                    bgcolor: "success.light", 
                    borderRadius: 2, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    mb: 3 
                  }}>
                    <Settings color="success" sx={{ fontSize: "2rem" }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    Optimized Builds
                  </Typography>
                  <Typography color="text.secondary">
                    Rollup-powered builds with tree-shaking, code splitting, and optimizations 
                    for production performance.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: "100%", "&:hover": { boxShadow: 4 } }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ 
                    width: 48, 
                    height: 48, 
                    bgcolor: "warning.light", 
                    borderRadius: 2, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    mb: 3 
                  }}>
                    <Smartphone color="warning" sx={{ fontSize: "2rem" }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    Mobile First
                  </Typography>
                  <Typography color="text.secondary">
                    Responsive design patterns and mobile-optimized components that work 
                    seamlessly across all devices.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: "100%", "&:hover": { boxShadow: 4 } }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ 
                    width: 48, 
                    height: 48, 
                    bgcolor: "secondary.light", 
                    borderRadius: 2, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    mb: 3 
                  }}>
                    <Code color="secondary" sx={{ fontSize: "2rem" }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    Modern JavaScript
                  </Typography>
                  <Typography color="text.secondary">
                    ES6+ support, TypeScript ready, and modern JavaScript features out of the box 
                    with zero configuration.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: "100%", "&:hover": { boxShadow: 4 } }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ 
                    width: 48, 
                    height: 48, 
                    bgcolor: "error.light", 
                    borderRadius: 2, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    mb: 3 
                  }}>
                    <Route color="error" sx={{ fontSize: "2rem" }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    Client-side Routing
                  </Typography>
                  <Typography color="text.secondary">
                    Built-in routing setup with React Router for seamless navigation and 
                    single-page app experience.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Component Showcase */}
      <Box component="section" id="components" sx={{ py: 10, bgcolor: "grey.50" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
              Sample Components
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: "800px", mx: "auto" }}>
              Explore pre-built components demonstrating React patterns and best practices
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            <Grid item xs={12} lg={6}>
              <Counter />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TodoList />
            </Grid>
            <Grid item xs={12} lg={6}>
              <ApiData />
            </Grid>
            <Grid item xs={12} lg={6}>
              <ContactForm />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Quick Start Guide */}
      <Box component="section" id="docs" sx={{ py: 10, bgcolor: "white" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
              Quick Start Guide
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: "800px", mx: "auto" }}>
              Get up and running with React + Vite in minutes
            </Typography>
          </Box>
          
          <Stack spacing={4}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
                  1. Create Your Project
                </Typography>
                <Paper 
                  sx={{ 
                    bgcolor: "grey.900", 
                    color: "white", 
                    p: 3, 
                    borderRadius: 2,
                    overflow: "auto"
                  }}
                >
                  <Typography variant="body2" component="div" sx={{ fontFamily: "monospace" }}>
                    <Typography color="success.main"># Create a new React + Vite project</Typography>
                    <Typography>npm create vite@latest my-react-app -- --template react</Typography>
                    <Typography>cd my-react-app</Typography>
                    <Typography>npm install</Typography>
                  </Typography>
                </Paper>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
                  2. Start Development Server
                </Typography>
                <Paper 
                  sx={{ 
                    bgcolor: "grey.900", 
                    color: "white", 
                    p: 3, 
                    borderRadius: 2,
                    overflow: "auto"
                  }}
                >
                  <Typography variant="body2" component="div" sx={{ fontFamily: "monospace" }}>
                    <Typography color="success.main"># Start the development server</Typography>
                    <Typography>npm run dev</Typography>
                    <Typography color="grey.500" sx={{ mt: 1 }}>➜  Local:   http://localhost:5173/</Typography>
                    <Typography color="grey.500">➜  Network: use --host to expose</Typography>
                  </Typography>
                </Paper>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
                  3. Build for Production
                </Typography>
                <Paper 
                  sx={{ 
                    bgcolor: "grey.900", 
                    color: "white", 
                    p: 3, 
                    borderRadius: 2,
                    overflow: "auto"
                  }}
                >
                  <Typography variant="body2" component="div" sx={{ fontFamily: "monospace" }}>
                    <Typography color="success.main"># Build optimized production bundle</Typography>
                    <Typography>npm run build</Typography>
                    <Typography color="grey.500" sx={{ mt: 1 }}>✓ Built in 1.23s</Typography>
                    <Typography color="grey.500">  dist/index.html                 0.46 kB</Typography>
                    <Typography color="grey.500">  dist/assets/index-a1b2c3d4.js  143.21 kB</Typography>
                  </Typography>
                </Paper>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}