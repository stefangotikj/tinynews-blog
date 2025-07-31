# Site Configuration

This document outlines the site configuration options available in `src/site.config.ts`.

Additionally, this file controls which fields are enabled or disabled in the YAML creation process via `src/pages/AdminPage.tsx`, directly affecting the fields displayed in the AdminPage UI.

---

## Basic Site Information

- **title**: Site title (string) — Appears in the navbar and browser tab.  
- **logo**: Path to the logo image (string) — Relative path inside the `public/` directory.  
- **description**: Site description (string) — Used for SEO and social sharing.

---

## Blog Page Configuration

- **blogPageTitle**: Main heading on the blog page (string).  
- **blogPageDescription**: Subtitle under the heading (string).  
- **blogPageIcon**: Icon component for the blog page (React component) — e.g., Lucide React icon or a custom component.

---

## SEO Configuration

- **seo.defaultTitle**: Default page title (string).  
- **seo.defaultDescription**: Default meta description (string).  
- **seo.keywords**: Default keywords (string array).  
- **seo.author**: Site author name (string).  
- **seo.language**: Site language code (string).  
- **seo.siteUrl**: Your domain URL (string).  
- **seo.ogImage**: Default Open Graph image for social media (string).  
- **seo.twitterImage**: Default Twitter card image (string).  
- **seo.favicon**: Favicon path (string).

---

## Feature Toggles

- **enableSearch**: Enable or disable search functionality (boolean).  
- **enableTags**: Enable or disable tag filtering (boolean).  
- **enableRelatedPosts**: Show related posts on blog post pages (boolean).  
- **enableReadingTime**: Show estimated reading time on posts (boolean).  
- **enableBackToTop**: Show a back-to-top button on pages (boolean).

---

## Display Settings

- **showFeaturedPosts**: Show the featured posts section on the blog page (boolean).  
- **showPostDates**: Display publication dates on posts (boolean).  
- **showPostAuthors**: Display author names on posts (boolean).  
- **showPostTags**: Show post tags (boolean).  
- **showPostExcerpts**: Show excerpts or summaries of posts (boolean).

---

## Social Media Links

*(Optional — remove or comment out unused platforms)*

- **twitter**: Twitter profile URL (string).  
- **github**: GitHub profile URL (string).  
- **linkedin**: LinkedIn profile URL (string).  
- **youtube**: YouTube channel URL (string).  
- **instagram**: Instagram profile URL (string).  
- **facebook**: Facebook page URL (string).

---

## Footer Configuration

- **showSocialLinks**: Toggle showing social media links in the footer (boolean).  
- **copyrightText**: Custom copyright text (string).

---

Feel free to customize these settings in `src/site.config.ts` to tailor your TinyNews blog to your needs. Changes to feature toggles and display options will instantly affect your blog’s behavior and appearance.
