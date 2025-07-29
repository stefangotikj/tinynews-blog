import { FileText, Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Drawer, DrawerContent } from "./ui/drawer";
import { useState } from "react";
import { siteConfig } from "../site.config";

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSectionClick = (sectionId: string) => {
    if (location.pathname === "/") {
      // If on home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If on another page, navigate to home page first, then scroll after a delay
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Small delay to ensure page has loaded
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 text-2xl font-bold tracking-tight text-accent hover:text-accent/80 transition-colors">
              <img src={siteConfig.logo} alt={siteConfig.title} />
              <span>{siteConfig.title}</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          {/* No additional desktop navigation needed */}
          
          {/* Mobile Hamburger */}
          {/* Remove the mobile hamburger menu button */}
        </div>
      </div>
      
      {/* Mobile Drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent>
          {/* No additional mobile navigation needed */}
        </DrawerContent>
      </Drawer>
    </nav>
  );
}