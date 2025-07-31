# Site Configuration

This document outlines the site configuration options in `src/site.config.ts`.

Additionally, this file controls which fields are enabled or disabled in the YAML creation process via `src/pages/AdminPage.tsx`, directly affecting the fields displayed in the AdminPage UI.

## Basic Site Information

*   **title**: Site title (string) - Appears in the navbar and browser tab.
*   **logo**: Path to the logo image (string) -  Path to the logo image in the `public/` directory.
*   **description**: Site description (string) - Used for SEO and social sharing.

## Blog Page Configuration

*   **blogPageTitle**: Main heading on the blog page (string)
*   **blogPageDescription**: Subtitle under the heading (string)
*   **blogPageIcon**: Icon component for the blog page (React component) - A Lucide React icon or custom component.

## SEO Configuration

*   **seo.defaultTitle**: Default page title (string)
*   **seo.defaultDescription**: Default meta description (string)
*   **seo.keywords**: Default keywords (string array)
*   **seo.author**: Site author name (string)
*   **seo.language**: Site language code (string)
*   **seo.siteUrl**: Your domain URL (string)
*   **seo.ogImage**: Default social media image (string)
*   **seo.twitterImage**: Default Twitter image (string)
*   **seo.favicon**: Favicon path (string)

## Social Media Links

*   **social.twitter**: Twitter profile URL (string, optional)
*   **social.github**: GitHub profile URL (string, optional)
*   **social.linkedin**: LinkedIn profile URL (string, optional)
*   **social.youtube**: YouTube channel URL (string, optional)
*   **social.instagram**: Instagram profile URL (string, optional)
*   **social.facebook**: Facebook page URL (string, optional)

## Footer Configuration

*   **footer.showSocialLinks**: Show social media links in the footer (boolean)
*   **footer.copyrightText**: Custom copyright text (string)