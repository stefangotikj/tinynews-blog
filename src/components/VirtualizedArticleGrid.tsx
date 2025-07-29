import { useState, useEffect, useRef, useCallback } from 'react';
import { ArticleCard } from './ArticleCard';
import { BlogPost } from '@/lib/blog';

interface VirtualizedArticleGridProps {
  posts: BlogPost[];
  isFeatured?: boolean;
  itemsPerPage?: number;
  showEndMessage?: boolean;
}

export const VirtualizedArticleGrid = ({ 
  posts, 
  isFeatured = false, 
  itemsPerPage = 12,
  showEndMessage = true
}: VirtualizedArticleGridProps) => {
  const [visiblePosts, setVisiblePosts] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [hasLoadedInitial, setHasLoadedInitial] = useState(false);
  const [loadStartTime, setLoadStartTime] = useState<number>(Date.now());
  const [loadTime, setLoadTime] = useState<number>(0);
  const loadingRef = useRef<HTMLDivElement>(null);

  // Calculate visible posts based on current page
  useEffect(() => {
    const startIndex = 0;
    const endIndex = currentPage * itemsPerPage;
    const newVisiblePosts = posts.slice(startIndex, endIndex);
    
    setVisiblePosts(newVisiblePosts);
    setHasMore(endIndex < posts.length);
    
    // Mark that we've loaded the initial set
    if (!hasLoadedInitial && newVisiblePosts.length > 0) {
      setHasLoadedInitial(true);
    }

    // Calculate load time when all articles are loaded
    if (endIndex >= posts.length && hasLoadedInitial && showEndMessage) {
      const endTime = Date.now();
      const elapsed = endTime - loadStartTime;
      setLoadTime(elapsed);
    }
  }, [posts, currentPage, itemsPerPage, hasLoadedInitial, loadStartTime, showEndMessage]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore) {
          setCurrentPage(prev => prev + 1);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore]);

  const renderPost = useCallback((post: BlogPost) => (
    <ArticleCard key={post.id} post={post} isFeatured={isFeatured} />
  ), [isFeatured]);

  const formatLoadTime = (ms: number) => {
    if (ms < 1000) {
      return `${ms}ms`;
    } else {
      const seconds = (ms / 1000).toFixed(2);
      return `${seconds}s`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visiblePosts.map(renderPost)}
      </div>

      {/* Loading Indicator */}
      {hasMore && (
        <div ref={loadingRef} className="flex justify-center py-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent"></div>
            <span className="text-sm">Loading more articles...</span>
          </div>
        </div>
      )}

      {/* End of list indicator - only show if enabled and we've loaded initial content and there's no more */}
      {showEndMessage && !hasMore && hasLoadedInitial && posts.length > 0 && visiblePosts.length > 0 && (
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 text-muted-foreground rounded-full text-sm">
            <span className="w-2 h-2 bg-accent rounded-full"></span>
            All articles loaded in {formatLoadTime(loadTime)}
          </div>
        </div>
      )}
    </div>
  );
}; 