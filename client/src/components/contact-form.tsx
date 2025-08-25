import { useState } from "react";
import { 
  Card, 
  CardContent, 
  Button, 
  TextField, 
  Typography, 
  Box, 
  Stack,
  Alert,
  Snackbar
} from "@mui/material";
import { Send } from "@mui/icons-material";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setShowError(true);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setShowSuccess(true);
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <>
      <Card sx={{ height: "100%" }}>
        <Box sx={{ bgcolor: "grey.900", color: "white", p: 2 }}>
          <Typography variant="h6" component="h3">
            Contact Form
          </Typography>
          <Typography variant="body2" color="grey.300">
            Form validation and submission
          </Typography>
        </Box>
        <CardContent sx={{ p: 3 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                variant="outlined"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                startIcon={<Send />}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success">
          Your message has been sent successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
      >
        <Alert onClose={() => setShowError(false)} severity="error">
          Please fill in all fields
        </Alert>
      </Snackbar>
    </>
  );
}
