import yaml from 'js-yaml';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  readTime: string;
  featured: boolean;
}

// Use Vite's import.meta.glob to import all YAML files in src/blog-posts
const blogPostFiles = import.meta.glob('../../src/blog-posts/*.yaml', { as: 'raw', eager: true });

export async function loadAllBlogPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];
  for (const path in blogPostFiles) {
    try {
      const yamlText = blogPostFiles[path] as string;
      const post = yaml.load(yamlText, {
        onWarning: (warning) => console.warn('YAML warning:', warning)
      }) as BlogPost;
      if (post && post.id) {
        // Ensure tags is always an array
        if (!Array.isArray(post.tags)) {
          post.tags = [];
        }
        posts.push(post);
      }
    } catch (error) {
      console.error(`Error loading blog post from ${path}:`, error);
    }
  }
  // Sort: featured first, then by date descending
  return posts.sort((a, b) => {
    if (a.featured === b.featured) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return b.featured ? 1 : -1;
  });
}

// Get all posts
export async function getAllPosts(): Promise<BlogPost[]> {
  return loadAllBlogPosts();
}

// Get featured posts
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const posts = await loadAllBlogPosts();
  return posts.filter(post => post.featured);
}

// Get post by ID
export async function getPostById(id: string): Promise<BlogPost | null> {
  const posts = await loadAllBlogPosts();
  return posts.find(post => post.id === id) || null;
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await loadAllBlogPosts();
  return posts.filter(post => post.tags.includes(tag));
}

// Get all unique tags
export async function getAllTags(): Promise<string[]> {
  const posts = await loadAllBlogPosts();
  const allTags = posts.flatMap(post => post.tags);
  return [...new Set(allTags)].sort();
} 