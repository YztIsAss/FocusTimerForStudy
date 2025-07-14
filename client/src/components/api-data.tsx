import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, User } from "lucide-react";

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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gray-900 text-white p-4">
        <h3 className="text-lg font-semibold">API Data Fetching</h3>
        <p className="text-gray-300 text-sm">Loading states and error handling</p>
      </div>
      <div className="p-8">
        <div className="space-y-4">
          <Button
            onClick={fetchData}
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90 w-full"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Fetch User Data
          </Button>
          
          {isLoading ? (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-gray-300 h-12 w-12"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{userData.name}</h4>
                  <p className="text-gray-600">{userData.email}</p>
                  <p className="text-sm text-gray-500">{userData.location}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
