import { Box, Container, Typography, Link, Stack, IconButton, Divider, Grid } from "@mui/material";
import { FlashOn, GitHub, Twitter, LinkedIn } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "grey.900", color: "white", py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <FlashOn color="primary" />
              <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                React + Vite
              </Typography>
            </Stack>
            <Typography variant="body2" color="grey.400">
              Fast, modern web development with React and Vite. Build amazing applications with lightning speed.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link href="#" color="grey.400" sx={{ textDecoration: "none", "&:hover": { color: "white" } }}>
                Getting Started
              </Link>
              <Link href="#" color="grey.400" sx={{ textDecoration: "none", "&:hover": { color: "white" } }}>
                Documentation
              </Link>
              <Link href="#" color="grey.400" sx={{ textDecoration: "none", "&:hover": { color: "white" } }}>
                Examples
              </Link>
              <Link href="#" color="grey.400" sx={{ textDecoration: "none", "&:hover": { color: "white" } }}>
                API Reference
              </Link>
            </Stack>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Resources
            </Typography>
            <Stack spacing={1}>
              <Link href="#" color="grey.400" sx={{ textDecoration: "none", "&:hover": { color: "white" } }}>
                React Docs
              </Link>
              <Link href="#" color="grey.400" sx={{ textDecoration: "none", "&:hover": { color: "white" } }}>
                Vite Guide
              </Link>
              <Link href="#" color="grey.400" sx={{ textDecoration: "none", "&:hover": { color: "white" } }}>
                Community
              </Link>
              <Link href="#" color="grey.400" sx={{ textDecoration: "none", "&:hover": { color: "white" } }}>
                Support
              </Link>
            </Stack>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Connect
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton 
                color="inherit" 
                sx={{ color: "grey.400", "&:hover": { color: "white" } }}
              >
                <GitHub />
              </IconButton>
              <IconButton 
                color="inherit" 
                sx={{ color: "grey.400", "&:hover": { color: "white" } }}
              >
                <Twitter />
              </IconButton>
              <IconButton 
                color="inherit" 
                sx={{ color: "grey.400", "&:hover": { color: "white" } }}
              >
                <LinkedIn />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
        
        <Divider sx={{ borderColor: "grey.800", my: 6 }} />
        
        <Box textAlign="center">
          <Typography variant="body2" color="grey.400">
            © 2025 React + Vite. Built with ❤️ for developers.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
