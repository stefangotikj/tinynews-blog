# 📘 Usage Guide

## ✍️ Creating Your First Post

Blog posts are created as individual YAML files stored in the `src/blog-posts/` directory. Each YAML file represents a single blog post with structured metadata and Markdown content.

Alternatively, you can create visually using the AdminPage available at `/admin`, which generates these YAML files for you.

### Example:

```yaml
# src/blog-posts/hello-world.yaml
id: hello-world
slug: hello-world
title: Hello World
featured: true
excerpt: My first blog post with Tinynews
author: Your Name
date: 2024-07-27
tags:
  - introduction
  - getting-started
readTime: 3 min
content: |
  # Hello World

  Welcome to my new blog powered by **Tinynews**!

  This is incredibly easy to use:
  - Write in Markdown
  - Configure with YAML
  - Deploy anywhere

  Happy blogging! 🚀
```

## 🧱 YAML Post Structure

### Required Fields

* `id`: Unique identifier for the post
* `slug`: URL-friendly slug for routing
* `title`: The blog post title
* `date`: Publication date (YYYY-MM-DD)
* `content`: The actual blog content (Markdown supported)

### Optional Fields

These fields can be included in your YAML posts as needed. Their display can be toggled on or off in `site.config.ts` under the `display` settings.

- `excerpt`: Summary for previews  
- `featured`: Set to `true` if the post is highlighted on the homepage  
- `author`: Name of the author  
- `tags`: List of tags for filtering  
- `readTime`: Estimated reading time  

## 🖌️ Styling & Customization

### Tailwind CSS

* Global styles: `src/index.css`
* Components: `src/components/`
* Theme configuration: `tailwind.config.ts`

### Layout

* Blog listing: `src/pages/BlogPage.tsx`
* Single post: `src/pages/BlogPostPage.tsx`

### Add New Components

Create components in `src/components/` and import them where needed.

### Change Routing

Routing is handled in `src/App.tsx` using React Router.

## 🧩 Extending Features

You can extend or modify Tinynews by:

* Editing the `BlogPost` type in `src/lib/blog.ts`
* Updating rendering logic in `BlogPostPage.tsx`
* Adding new page routes in `App.tsx`

## 🖼️ Adding Images

Place your images in `public/` and reference them like this:

```markdown
![Alt text](/images/your-image.png)
```

## 🛠️ Migration Tips

To migrate from another platform:

* Export your posts to Markdown/YAML
* Write a script to generate files in `src/blog-posts/`

---
