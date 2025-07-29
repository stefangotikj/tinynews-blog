[![Netlify Status](https://api.netlify.com/api/v1/badges/8a936b36-290f-4658-b038-e6f2f4e3b61d/deploy-status)](https://app.netlify.com/projects/yaml/deploys)

# 📰 Tinynews

<img width="1033" height="315" alt="image" src="https://github.com/user-attachments/assets/62736e04-7f0b-48d2-b1cf-b47747f1644b" />

[🔗 Live Demo](https://tinynews.site/blog)  


---

## ✨ Features

- ⚡ **Lightning Fast** – Static generation with instant loading  
- 📝 **YAML-Powered** – Write posts in structured YAML with Markdown content  
- 🛠️ **Developer First** – TypeScript, modern tooling, Git-based workflow  
- 📱 **Responsive Design** – Beautiful on desktop, tablet, and mobile  
- 🌍 **Deploy Anywhere** – Works with Vercel, Netlify, GitHub Pages, and more  
- 🏷️ **Tagging System** – Organize posts with tags and featured articles  
- 🔎 **SEO Ready** – Clean URLs, meta tags, and semantic HTML  
- 🎯 **Zero Dependencies** – No database, no vendor lock-in  

---

## 🚀 Quick Start

### 🧪 Want the minimal blog-only version?

👉 Use [**tinynews-blog**](https://github.com/stefangotikj/tinynews-blog.git):
```bash
git clone https://github.com/stefangotikj/tinynews-blog.git
cd tinynews
npm install
npm run dev
```

## 🎨 Example Customizations

### Minimal Blog
```typescript
export const siteConfig: SiteConfig = {
  title: "My Blog",
  logo: "/logo.png",
  description: "A simple blog about technology.",
  blogPageTitle: "Blog",
  blogPageDescription: "Latest posts and updates.",
  blogPageIcon: BookOpen,
  features: {
    enableSearch: false,            // Disable search
    enableTags: false,              // Disable tags
    enableRelatedPosts: false,      // Disable related posts
    enableReadingTime: false,       // Disable reading time
    enableAuthorInfo: false,        // Disable author info
    enableSocialSharing: false,     // Disable social sharing
    enableDarkMode: false,          // Disable dark mode
    enableBackToTop: false,         // Disable back to top
  },
  display: {
    postsPerPage: 6,                // Show fewer posts
    showFeaturedPosts: false,       // Hide featured posts
    showPostDates: false,           // Hide dates
    showPostAuthors: false,         // Hide authors
    showPostTags: false,            // Hide tags
    showPostExcerpts: false,        // Hide excerpts
  },
  // ... other settings
};
```

## 🚀 How It Works

Every setting in the configuration file is **actually used** by the components:

- **`enableSearch: false`** → Search bar completely disappears
- **`enableTags: false`** → Tag filtering is disabled
- **`enableDarkMode: false`** → Theme toggle disappears
- **`showPostDates: false`** → Publication dates are hidden
- **`postsPerPage: 6`** → Only 6 posts shown per page

## 📝 Best Practices

1. **Start Simple**: Begin with basic settings and add complexity as needed
2. **Test Changes**: Always test your configuration changes
3. **Use Descriptive Names**: Make your titles and descriptions clear
4. **Optimize for SEO**: Use relevant keywords naturally
5. **Be Consistent**: Use consistent branding across all settings

## 🔧 Next Steps

After configuring your site:

1. **Add Your Content**: Create blog posts in `src/blog-posts/`
2. **Customize Styling**: Modify `src/index.css` for custom styles
3. **Deploy**: Build and deploy your blog

The configuration system is designed to be **simple, functional, and actually work**!
