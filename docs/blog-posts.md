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
