# Blog Posts

This document explains how to create and manage blog posts in TinyNews.

## Creating a New Blog Post

1.  Create a new YAML file in the `src/blog-posts/` directory.
2.  The file name will be the ID of the post
3.  Add the following fields to the YAML file:

    ```yaml
    id: your-post-id
    title: Your Post Title
    excerpt: A brief excerpt of your post.
    content: | # Use a multiline string for Markdown content
      Your Markdown content here.
    author: Your Name
    date: YYYY-MM-DD
    tags: [tag1, tag2, tag3]
    readTime: 5 min read
    featured: false # Set to true to feature the post
    ```

## Blog Post Fields

*   **id**: A unique identifier for the post (string).
*   **title**: The title of the blog post (string).
*   **excerpt**: A short summary of the post (string).
*   **content**: The full content of the post in Markdown format (string).
*   **author**: The author of the post (string).
*   **date**: The publication date of the post (YYYY-MM-DD) (string).
*   **tags**: An array of tags associated with the post (string array).
*   **readTime**: An estimated reading time for the post (string).
*   **featured**: A boolean indicating whether the post should be featured (boolean).


## Using the Visual Editor to Create a New Blog Post

To simplify post creation and editing, TinyNews includes an **AdminPage** — a visual editor interface that allows you to create, edit, and preview blog posts without manually editing YAML files.

- The AdminPage provides an intuitive form where you can enter all the blog post fields such as **title**, **excerpt**, **author**, **date**, **tags**, **read time**, and **featured** status.
- You can write and format the post content directly in **Markdown**, with live previews to see how the post will look.
- This visual editor eliminates the need to handle YAML files directly, making blog management accessible even if you're not familiar with YAML syntax.
- To access the AdminPage, navigate to `/admin` (or the appropriate route in your app). You’ll find tools to create new posts or update existing ones with ease.

> **Important:** The AdminPage and its related data or configuration files are intended for **local use only**.  
> It is recommended to add any data files or folders created or modified by the AdminPage to your `.gitignore` file to avoid committing temporary or draft content to your repository or production environment.