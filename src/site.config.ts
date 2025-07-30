// Site-wide configuration for TinyNews
//
// This file contains all the customizable settings for your blog.
// Each setting below can be modified and will affect the actual behavior of your site.

import { BookOpen } from "lucide-react";

export interface SiteConfig {
  // ===== BASIC SITE INFORMATION =====
  title: string;                    // Site title (navbar and browser tab)
  logo: string;                     // Path to logo image (public/ directory)
  description: string;              // Site description (SEO and social sharing)
  
  // ===== BLOG PAGE CONFIGURATION =====
  blogPageTitle: string;            // Main heading on blog page
  blogPageDescription: string;      // Subtitle under the heading
  blogPageIcon: React.ElementType;  // Icon component (Lucide or custom)
  
  // ===== SEO CONFIGURATION =====
  seo: {
    defaultTitle: string;           // Default page title
    defaultDescription: string;     // Default meta description
    keywords: string[];             // Default keywords
    author: string;                 // Site author name
    language: string;               // Site language code
    siteUrl: string;                // Your domain URL
    ogImage: string;                // Default social media image
    twitterImage: string;           // Default Twitter image
    favicon: string;                // Favicon path
  };
  
  // ===== FEATURE TOGGLES =====
  features: {
    
    enableSearch: boolean;          // Enable/disable search functionality
    enableTags: boolean;            // Enable/disable tag filtering
    enableRelatedPosts: boolean;    // Show related posts on blog post pages
    enableReadingTime: boolean;     // Show reading time estimates
    enableBackToTop: boolean;       // Show back to top button
  };
  
  // ===== DISPLAY SETTINGS =====
  display: {
    showFeaturedPosts: boolean;     // Show featured posts section
    showPostDates: boolean;         // Show publication dates
    showPostAuthors: boolean;       // Show author names
    showPostTags: boolean;          // Show post tags
    showPostExcerpts: boolean;      // Show post excerpts
  };
  
  // ===== SOCIAL MEDIA LINKS =====
  social: {
    twitter?: string;               // Twitter profile URL
    github?: string;                // GitHub profile URL
    linkedin?: string;              // LinkedIn profile URL
    youtube?: string;               // YouTube channel URL
    instagram?: string;             // Instagram profile URL
    facebook?: string;              // Facebook page URL
  };
  
  // ===== FOOTER CONFIGURATION =====
  footer: {
    showSocialLinks: boolean;       // Show social media links in footer
    copyrightText: string;          // Custom copyright text
  };
}

export const siteConfig: SiteConfig = {
  // ===== BASIC SITE INFORMATION =====
  title: "Tinynews Blog",
  logo: "/favicon.png",
  description: "Insights, tutorials, and updates from Tiny News. Join us to make blogging easier!",
  
  // ===== BLOG PAGE CONFIGURATION =====
  blogPageTitle: "Updates",
  blogPageDescription: "Welcome to Tiny News! Here you'll find updates, guides, and tips from the Tiny News team.",
  blogPageIcon: BookOpen,
  
  // ===== SEO CONFIGURATION =====
  seo: {
    defaultTitle: "Tiny News Blog",
    defaultDescription: "Insights, tutorials, and updates from Tiny News. Join us to make blogging easier!",
    keywords: ["blog", "technology", "development", "tutorials", "insights", "web development"],
    author: "Your Name",
    language: "en",
    siteUrl: "https://blog.tinynews.site",
    ogImage: "/og-image.png",
    twitterImage: "/twitter-image.png",
    favicon: "/favicon.png",
  },
  
  // ===== FEATURE TOGGLES =====
  features: {
    enableSearch: true, // Set to false to completely disable search
    enableTags: false, // Set to false to hide tag filtering
    enableRelatedPosts: false, // Set to false to hide related posts
    enableReadingTime: false, // Set to false to hide reading time
    enableBackToTop: true,
  },
  
  // ===== DISPLAY SETTINGS =====
  display: {
    showFeaturedPosts: true,        // Set to false to hide featured posts section **IMPORTANT**: Remove featured posts from the blog page if set to false
    showPostDates: false,            // Set to false to hide publication dates
    showPostAuthors: false,          // Set to false to hide author names
    showPostTags: false,             // Set to false to hide post tags
    showPostExcerpts: true,         // Set to false to hide post excerpts
  },
  
  // ===== SOCIAL MEDIA LINKS =====
  // Remove or comment out any platforms you don't use
  social: {
   // twitter: "https://twitter.com/yourusername",
    github: "https://github.com/stefangotikj/tinynews-blog",
   // linkedin: "https://linkedin.com/in/yourusername",
    youtube: "https://youtube.com/@yourchannel",
    instagram: "https://instagram.com/tinynews.site",
    // facebook: "https://facebook.com/yourpage",
  },
  
  // ===== FOOTER CONFIGURATION =====
  footer: {
    showSocialLinks: true,          // Set to false to hide social links in footer
    copyrightText: "© 2025 Tiny News Blog. All rights reserved.",
  },
}; 