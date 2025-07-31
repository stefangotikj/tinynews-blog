import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import NotFound from "./pages/NotFound";
import { siteConfig } from "./site.config";

// Lazy load the Blog pages
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
  </div>
);

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  
  useEffect(() => {
    if (location.pathname.startsWith("/blog")) {
      document.title = `${siteConfig.blogPageTitle} | ${siteConfig.title}`;
    } else if (location.pathname === "/admin") {
      document.title = `Admin | ${siteConfig.title}`;
    } else {
      document.title = siteConfig.title;
    }
  }, [location]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          {/* Default route shows BlogPage */}
          <Route path="/" element={
            <Suspense fallback={<PageLoader />}>
              <BlogPage />
            </Suspense>
          } />
          <Route path="/blog" element={
            <Suspense fallback={<PageLoader />}>
              <BlogPage />
            </Suspense>
          } />
          <Route path="/blog/:id" element={
            <Suspense fallback={<PageLoader />}>
              <BlogPostPage />
            </Suspense>
          } />
          <Route path="/admin" element={
            <Suspense fallback={<PageLoader />}>
              <AdminPage />
            </Suspense>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;