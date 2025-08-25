import { useState } from "react";
import { Card, CardContent, Button, Typography, Box, Stack } from "@mui/material";
import { Remove, Add, RestartAlt } from "@mui/icons-material";

export default function Counter() {
  const [count, setCount] = useState(42);

  return (
    <Card sx={{ height: "100%" }}>
      <Box sx={{ bgcolor: "grey.900", color: "white", p: 2 }}>
        <Typography variant="h6" component="h3">
          Interactive Counter
        </Typography>
        <Typography variant="body2" color="grey.300">
          State management with React hooks
        </Typography>
      </Box>
      <CardContent sx={{ p: 4, textAlign: "center" }}>
        <Typography 
          variant="h1" 
          component="div" 
          color="primary" 
          sx={{ fontWeight: "bold", fontSize: "4rem", mb: 3 }}
        >
          {count}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            onClick={() => setCount(count - 1)}
            variant="contained"
            color="error"
            size="large"
            startIcon={<Remove />}
          >
            Decrease
          </Button>
          <Button
            onClick={() => setCount(42)}
            variant="outlined"
            size="large"
            startIcon={<RestartAlt />}
          >
            Reset
          </Button>
          <Button
            onClick={() => setCount(count + 1)}
            variant="contained"
            color="success"
            size="large"
            startIcon={<Add />}
          >
            Increase
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
