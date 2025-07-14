import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Zap className="text-primary text-xl" />
              <span className="text-xl font-bold text-gray-900">React + Vite</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("components")}
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Components
            </button>
            <button
              onClick={() => scrollToSection("docs")}
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Docs
            </button>
            <Button className="bg-primary text-white hover:bg-primary/90">
              Get Started
            </Button>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("home")}
                className="text-gray-700 hover:text-primary transition-colors duration-200 text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="text-gray-700 hover:text-primary transition-colors duration-200 text-left"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("components")}
                className="text-gray-700 hover:text-primary transition-colors duration-200 text-left"
              >
                Components
              </button>
              <button
                onClick={() => scrollToSection("docs")}
                className="text-gray-700 hover:text-primary transition-colors duration-200 text-left"
              >
                Docs
              </button>
              <Button className="bg-primary text-white hover:bg-primary/90 w-full">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
