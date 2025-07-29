// Site-wide configuration for TinyNews
//
// - title: The main site title (used in navigation and <title> tag)
// - logo: Path to the site logo image
// - description: General site description (for SEO, social, etc.)
// - blogPageTitle: Title for the blog page (e.g., 'Blog', 'Stories', 'Journal')
// - blogPageDescription: Subtitle/description for the blog page (shows under the title)
// - blogPageIcon: Icon component for the blog page header (Lucide or custom)

import { BookOpen } from "lucide-react";

export interface SiteConfig {
  title: string;
  logo: string;
  description: string;
  blogPageTitle: string;
  blogPageDescription: string;
  blogPageIcon: React.ElementType;
}

export const siteConfig: SiteConfig = {
  // Main site title (appears in navbar and browser tab)
  title: "My Awesome Blog",
  // Path to your logo image (public/ directory or external URL)
  logo: "/favicon.png",
  // Short description for your site (used for SEO and social sharing)
  description: "Insights, tutorials, and stories from a curious mind. Join me on my journey through tech, life, and creativity!",
  // Blog page title (big heading on the blog page)
  blogPageTitle: "News",
  // Blog page subtitle/description (shows under the blog title)
  blogPageDescription: "Welcome to my blog! Here you'll find thoughts, guides, and inspiration on web development, design, and more.",
  // Icon for the blog page header (Lucide icon or your own React component)
  blogPageIcon: BookOpen,
}; 