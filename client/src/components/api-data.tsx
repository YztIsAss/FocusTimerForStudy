import { useState } from "react";
import { 
  Card, 
  CardContent, 
  Button, 
  Typography, 
  Box, 
  Avatar, 
  Stack, 
  Skeleton, 
  CircularProgress 
} from "@mui/material";
import { Refresh, Person } from "@mui/icons-material";

interface UserData {
  name: string;
  email: string;
  location: string;
}

export default function ApiData() {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: "John Doe",
    email: "john@example.com",
    location: "San Francisco, CA"
  });

  const fetchData = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate random user data
    const names = ["Alice Smith", "Bob Johnson", "Carol Williams", "David Brown", "Eva Davis"];
    const emails = ["alice@example.com", "bob@example.com", "carol@example.com", "david@example.com", "eva@example.com"];
    const locations = ["New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ"];
    
    const randomIndex = Math.floor(Math.random() * names.length);
    
    setUserData({
      name: names[randomIndex],
      email: emails[randomIndex],
      location: locations[randomIndex]
    });
    
    setIsLoading(false);
  };

  return (
    <Card sx={{ height: "100%" }}>
      <Box sx={{ bgcolor: "grey.900", color: "white", p: 2 }}>
        <Typography variant="h6" component="h3">
          API Data Fetching
        </Typography>
        <Typography variant="body2" color="grey.300">
          Loading states and error handling
        </Typography>
      </Box>
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Button
            onClick={fetchData}
            disabled={isLoading}
            variant="contained"
            color="primary"
            fullWidth
            startIcon={
              isLoading ? <CircularProgress size={20} /> : <Refresh />
            }
          >
            Fetch User Data
          </Button>
          
          {isLoading ? (
            <Box sx={{ bgcolor: "grey.50", borderRadius: 2, p: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Skeleton variant="circular" width={48} height={48} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="75%" />
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="85%" />
                </Box>
              </Stack>
            </Box>
          ) : (
            <Box sx={{ bgcolor: "grey.50", borderRadius: 2, p: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: "primary.main", width: 48, height: 48 }}>
                  <Person />
                </Avatar>
                <Box>
                  <Typography variant="h6" component="h4">
                    {userData.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {userData.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {userData.location}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
