import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

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
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Success!",
      description: "Your message has been sent successfully."
    });
    
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gray-900 text-white p-4">
        <h3 className="text-lg font-semibold">Contact Form</h3>
        <p className="text-gray-300 text-sm">Form validation and submission</p>
      </div>
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90"
          >
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </div>
  );
}
