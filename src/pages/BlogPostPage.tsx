import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { getPostById, getAllPosts, BlogPost } from "@/lib/blog";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import ReactMarkdown from 'react-markdown';

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when component mounts (when navigating to a new post)
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const loadPost = async () => {
      if (!id) return;
      
      try {
        const [currentPost, allPosts] = await Promise.all([
          getPostById(id),
          getAllPosts()
        ]);

        if (!currentPost) {
          navigate('/blog');
          return;
        }

        setPost(currentPost);

        // Get related posts (same tags, excluding current post)
        const related = allPosts
          .filter(p => p.id !== id && Array.isArray(p.tags) && Array.isArray(currentPost.tags) && p.tags.some(tag => currentPost.tags.includes(tag)))
          .slice(0, 3);
        setRelatedPosts(related);
      } catch (error) {
        console.error('Error loading blog post:', error);
        navigate('/blog');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id, navigate]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16 sm:pt-20">
        {/* Article Header */}
        <section className="py-10 sm:py-16 md:py-20 px-4 sm:px-8 bg-gradient-to-br from-background via-secondary/20 to-background shadow-lg rounded-b-2xl">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link 
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4 sm:mb-8 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-base sm:text-lg">Back to Blog</span>
            </Link>

            {/* Featured Badge */}
            {post.featured && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4 sm:mb-6 animate-pulse">
                <span className="w-2 h-2 bg-accent rounded-full animate-ping"></span>
                <span className="font-bold tracking-wide">Featured Article</span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-lg sm:text-xl text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-muted-foreground mb-4 sm:mb-6">
              {post.author && (
                <div className="flex items-center gap-2">
                  <span className="bg-accent/20 rounded-full px-2 py-1 text-accent font-semibold">By</span>
                  <span className="font-medium text-foreground">{post.author}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="bg-accent/20 rounded-full p-1"><Calendar className="h-4 w-4 text-accent" /></span>
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-accent/20 rounded-full p-1"><Clock className="h-4 w-4 text-accent" /></span>
                <span>{post.readTime}</span>
              </div>
            </div>
           {/* Divider */}
           <div className="w-full h-1 bg-gradient-to-r from-accent/30 via-accent/60 to-accent/30 rounded-full mb-6 opacity-60" />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-2 mb-6 sm:mb-8">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-4 py-1 bg-accent/20 text-accent-foreground text-sm rounded-full font-semibold shadow-sm min-w-[44px] min-h-[36px] flex items-center justify-center hover:bg-accent/40 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Article Content */}
        <section className="py-10 sm:py-16 md:py-20 px-4 sm:px-8">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-base md:prose-lg max-w-none animate-fade-in">
              <ReactMarkdown 
                components={{
                  // Enhanced styling for better readability
                  h1: ({ children }) => <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 mt-8 first:mt-0 text-foreground">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 mt-8 text-foreground">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 mt-6 text-foreground">{children}</h3>,
                  h4: ({ children }) => <h4 className="text-base sm:text-lg font-semibold mb-2 mt-4 text-foreground">{children}</h4>,
                  p: ({ children }) => <p className="mb-3 sm:mb-4 leading-relaxed text-foreground">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-4 sm:mb-6 space-y-2 pl-4">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-4 sm:mb-6 space-y-2 pl-4">{children}</ol>,
                  li: ({ children }) => <li className="text-foreground">{children}</li>,
                  code: ({ children, className }) => {
                    if (className?.includes('language-')) {
                      return (
                        <pre className="bg-secondary/50 border border-border p-3 sm:p-4 rounded-lg overflow-x-auto mb-4 sm:mb-6 text-xs sm:text-sm">
                          <code className={`${className} text-foreground`}>{children}</code>
                        </pre>
                      );
                    }
                    return <code className="bg-secondary/50 px-2 py-1 rounded text-xs sm:text-sm text-accent font-mono">{children}</code>;
                  },
                  pre: ({ children }) => (
                    <pre className="bg-secondary/50 border border-border p-3 sm:p-4 rounded-lg overflow-x-auto mb-4 sm:mb-6 text-xs sm:text-sm">
                      {children}
                    </pre>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-accent pl-4 sm:pl-6 py-2 my-4 sm:my-6 bg-secondary/20 rounded-r-lg italic text-muted-foreground">
                      {children}
                    </blockquote>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto mb-4 sm:mb-6">
                      <table className="w-full border-collapse border border-border rounded-lg overflow-hidden">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="border border-border px-2 sm:px-4 py-2 sm:py-3 bg-secondary font-semibold text-left text-foreground">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-border px-2 sm:px-4 py-2 sm:py-3 text-foreground">
                      {children}
                    </td>
                  ),
                  hr: () => <hr className="my-6 sm:my-8 border-border" />,
                  // Enhanced links with better styling
                  a: ({ node, ...props }) => (
                    <a 
                      {...props} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-accent hover:text-accent/80 underline underline-offset-2 decoration-2 hover:decoration-accent/50 transition-all min-w-[44px] min-h-[36px] inline-flex items-center" 
                    />
                  ),
                  // Enhanced images with better styling
                  img: ({ node, alt, ...props }) => (
                    <div className="my-6 sm:my-8">
                      <img 
                        {...props} 
                        alt={alt}
                        loading="lazy" 
                        className="max-w-full h-auto rounded-lg shadow-lg border border-border mx-auto" 
                      />
                      {alt && (
                        <p className="text-center text-xs sm:text-sm text-muted-foreground mt-2 italic">
                          {alt}
                        </p>
                      )}
                    </div>
                  ),
                }}
                remarkPlugins={[]}
                rehypePlugins={[]}
              >
                {post.content}
              </ReactMarkdown>
            </article>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-10 sm:py-16 md:py-20 px-4 sm:px-8 bg-gradient-to-br from-secondary/10 to-background">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
                {relatedPosts.map(relatedPost => (
                  <article key={relatedPost.id} className="card-elegant hover-lift transition-all duration-500 group shadow-md hover:shadow-xl hover:scale-[1.025] bg-background rounded-xl">
                    <div className="p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 line-clamp-2">
                        <Link to={`/blog/${relatedPost.id}`} className="hover:text-accent transition-colors group-hover:text-accent">
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-4 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                        <span>{formatDate(relatedPost.date)}</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                      {relatedPost.tags && relatedPost.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2 sm:mt-3">
                          {relatedPost.tags.slice(0, 2).map(tag => (
                            <span 
                              key={tag} 
                              className="px-3 py-1 bg-accent/20 text-accent-foreground text-xs rounded-full font-semibold shadow-sm min-w-[36px] min-h-[28px] flex items-center justify-center"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default BlogPostPage;