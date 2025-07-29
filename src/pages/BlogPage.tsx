import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { VirtualizedArticleGrid } from "@/components/VirtualizedArticleGrid";
import { BlogSearch } from "@/components/BlogSearch";
import { getAllPosts, BlogPost } from "@/lib/blog";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "../site.config";

const BlogPage = () => {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const articlesRef = useRef<HTMLDivElement>(null);

  // Load all posts
  useEffect(() => {
    const loadData = async () => {
      try {
        const posts = await getAllPosts();
        setAllPosts(posts);
        setFilteredPosts(posts); // Initialize filtered posts with all posts
      } catch (error) {
        console.error('Error loading blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Memoized featured and non-featured posts from filtered results
  const { featuredPosts, nonFeaturedPosts } = useMemo(() => {
    const featured = filteredPosts.filter(post => post.featured);
    const nonFeatured = filteredPosts.filter(post => !post.featured);
    return { featuredPosts: featured, nonFeaturedPosts: nonFeatured };
  }, [filteredPosts]);

  // Get all unique tags for search filters
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    allPosts.forEach(post => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }, [allPosts]);

  // Handle search results update
  const handleFilteredPostsChange = useCallback((posts: BlogPost[]) => {
    setFilteredPosts(posts);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section - More Compact */}
        <section className="py-8 px-6 sm:px-8 bg-gradient-to-b from-background to-secondary/20">
          <div className="max-w-7xl mx-auto text-center">
            {/* Icon and Title */}
            <div className="flex items-center justify-center gap-3 mb-4">
              {siteConfig.blogPageIcon && (
                <siteConfig.blogPageIcon className="h-8 w-8 text-accent animate-bounce-slow" />
              )}
              <h1 className="text-4xl font-bold">
                {siteConfig.blogPageTitle}
              </h1>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              {siteConfig.blogPageDescription}
            </p>

            {/* Stats */}
            <div className="flex justify-center items-center gap-6 mb-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Sparkles className="h-4 w-4 text-accent" />
                <span>{filteredPosts.length} of {allPosts.length} {allPosts.length === 1 ? 'Article' : 'Articles'}</span>
              </div>
            </div>
            {/* Decorative Divider */}
            <div className="flex justify-center">
              <span className="block w-24 h-0.5 rounded-full bg-gradient-to-r from-accent/40 via-accent to-accent/40 opacity-70" />
            </div>
          </div>
        </section>

        {/* Search Section - Only show if enabled */}
        {siteConfig.features.enableSearch && (
          <section className="py-6 px-6 sm:px-8 bg-gradient-to-br from-secondary/10 to-background">
            <div className="max-w-7xl mx-auto">
              <BlogSearch 
                posts={allPosts}
                onFilteredPostsChange={handleFilteredPostsChange}
                allTags={allTags}
              />
            </div>
          </section>
        )}

        {/* Featured Articles Section - Only show if enabled */}
        {siteConfig.display.showFeaturedPosts && featuredPosts.length > 0 && (
          <section className="py-6 px-6 sm:px-8 bg-gradient-to-br from-background via-secondary/10 to-background">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-xl font-bold mb-4 text-accent text-center">Featured Articles</h2>
              <VirtualizedArticleGrid 
                posts={featuredPosts} 
                isFeatured={true}
                itemsPerPage={6}
                showEndMessage={false}
              />
            </div>
          </section>
        )}

        {/* All Articles Section - More Compact */}
        <section className="py-6 px-6 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-bold mb-4 text-accent text-center">
              {featuredPosts.length > 0 ? 'All Articles' : 'Latest Articles'}
            </h2>
            
            {nonFeaturedPosts.length > 0 ? (
                          <VirtualizedArticleGrid 
              posts={nonFeaturedPosts} 
              isFeatured={false}
              itemsPerPage={siteConfig.display.postsPerPage}
              showEndMessage={true}
            />
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-4">
                  {filteredPosts.length === 0 && allPosts.length > 0 
                    ? "No articles match your search criteria. Try adjusting your filters."
                    : "No articles match your criteria."
                  }
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Empty State - No posts at all */}
        {allPosts.length === 0 && (
          <section className="py-12 px-6 sm:px-8">
            <div className="max-w-7xl mx-auto text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first blog post by adding a YAML file to the <code className="bg-secondary/20 px-2 py-1 rounded">src/blog-posts/</code> directory.
              </p>
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
              >
                Back to Home
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        )}
      </main>
      <Footer />
      {siteConfig.features.enableBackToTop && <BackToTop />}
    </div>
  );
};

export default BlogPage;