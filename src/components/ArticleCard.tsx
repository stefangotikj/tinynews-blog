import { memo } from 'react';
import { Calendar, Clock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/lib/blog';
import { siteConfig } from '@/site.config';

interface ArticleCardProps {
  post: BlogPost;
  isFeatured?: boolean;
}

export const ArticleCard = memo(({ post, isFeatured = false }: ArticleCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="group relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:border-accent/20 hover:-translate-y-1">
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute top-3 right-3 z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent/90 text-accent-foreground text-xs font-medium rounded-full shadow-sm">
            <span className="w-1.5 h-1.5 bg-accent-foreground rounded-full"></span>
            Featured
          </div>
        </div>
      )}
      
      <div className="p-5">
        {/* Title */}
        <h3 className={`text-lg font-semibold mb-3 line-clamp-2 group-hover:text-accent transition-colors ${isFeatured ? 'pr-16' : ''}`}>
          <Link to={`/blog/${post.id}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>
        
        {/* Excerpt */}
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
          {post.excerpt}
        </p>
        
        {/* Meta Info */}
        <div className="flex items-center text-xs text-muted-foreground mb-4">
          {siteConfig.display.showPostDates && (
            <>
              <Calendar className="h-3.5 w-3.5 mr-1" />
              {formatDate(post.date)}
            </>
          )}
          {siteConfig.display.showPostDates && siteConfig.features.enableReadingTime && (
            <span className="mx-1.5">•</span>
          )}
          {siteConfig.features.enableReadingTime && (
            <>
              <Clock className="h-3.5 w-3.5 mr-1" />
              {post.readTime}
            </>
          )}
        </div>
        
        {/* Tags */}
        {siteConfig.display.showPostTags && post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.slice(0, 2).map(tag => (
              <span 
                key={tag} 
                className={`px-2 py-1 text-xs rounded-md font-medium ${
                  isFeatured 
                    ? 'bg-accent/10 text-accent' 
                    : 'bg-secondary/50 text-secondary-foreground'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Read More Link */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          {siteConfig.display.showPostAuthors && (
            <span className="text-xs text-muted-foreground">By {post.author}</span>
          )}
          <Link 
            to={`/blog/${post.id}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:text-accent/80 transition-colors"
          >
            Read more
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  );
});

ArticleCard.displayName = 'ArticleCard'; 