import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Filter, X, TrendingUp, Clock } from 'lucide-react';
import { BlogPost } from '@/lib/blog';
import { siteConfig } from '@/site.config';

interface BlogSearchProps {
  posts: BlogPost[];
  onFilteredPostsChange: (posts: BlogPost[]) => void;
  allTags: string[];
}

interface SearchSuggestion {
  type: 'tag' | 'author' | 'title';
  value: string;
  count: number;
}

export const BlogSearch = ({ posts, onFilteredPostsChange, allTags }: BlogSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fuzzy search function for better matching
  const fuzzySearch = (text: string, query: string): boolean => {
    const textLower = text.toLowerCase();
    const queryLower = query.toLowerCase();
    
    // Exact match
    if (textLower.includes(queryLower)) return true;
    
    // Word boundary matching
    const words = queryLower.split(' ').filter(word => word.length > 0);
    return words.every(word => textLower.includes(word));
  };

  // Generate search suggestions
  const searchSuggestions = useMemo((): SearchSuggestion[] => {
    if (!searchQuery || searchQuery.length < 2) return [];

    const suggestions: SearchSuggestion[] = [];
    const queryLower = searchQuery.toLowerCase();

    // Tag suggestions
    allTags.forEach(tag => {
      if (tag.toLowerCase().includes(queryLower)) {
        const count = posts.filter(post => post.tags.includes(tag)).length;
        suggestions.push({ type: 'tag', value: tag, count });
      }
    });

    // Author suggestions
    const authors = new Set(posts.map(post => post.author));
    authors.forEach(author => {
      if (author.toLowerCase().includes(queryLower)) {
        const count = posts.filter(post => post.author === author).length;
        suggestions.push({ type: 'author', value: author, count });
      }
    });

    // Title suggestions (first few words)
    posts.forEach(post => {
      const titleWords = post.title.split(' ').slice(0, 3).join(' ');
      if (titleWords.toLowerCase().includes(queryLower)) {
        suggestions.push({ type: 'title', value: post.title, count: 1 });
      }
    });

    // Remove duplicates and sort by relevance
    const uniqueSuggestions = suggestions.filter((suggestion, index, self) => 
      index === self.findIndex(s => s.value === suggestion.value)
    );

    return uniqueSuggestions
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [searchQuery, allTags, posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Search query filter with fuzzy matching
      const matchesSearch = searchQuery === '' || 
        fuzzySearch(post.title, searchQuery) ||
        fuzzySearch(post.excerpt, searchQuery) ||
        fuzzySearch(post.author, searchQuery) ||
        post.tags.some(tag => fuzzySearch(tag, searchQuery));

        // Tags filter - only apply if tags are enabled
  const matchesTags = !siteConfig.features.enableTags || selectedTags.length === 0 || 
    selectedTags.some(tag => post.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [posts, searchQuery, selectedTags]);

  // Update parent component when filtered posts change - using useEffect instead of useMemo
  useEffect(() => {
    onFilteredPostsChange(filteredPosts);
  }, [filteredPosts, onFilteredPostsChange]);

  // Handle search query changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setShowSuggestions(value.length >= 2);
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'tag') {
      setSelectedTags(prev => 
        prev.includes(suggestion.value) 
          ? prev.filter(t => t !== suggestion.value)
          : [...prev, suggestion.value]
      );
    } else {
      setSearchQuery(suggestion.value);
    }
    setShowSuggestions(false);
    
    // Add to recent searches
    if (!recentSearches.includes(suggestion.value)) {
      setRecentSearches(prev => [suggestion.value, ...prev.slice(0, 4)]);
    }
  };

  // Handle recent search click
  const handleRecentSearchClick = (search: string) => {
    setSearchQuery(search);
    setShowSuggestions(false);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setShowSuggestions(false);
  };

  const hasActiveFilters = searchQuery || selectedTags.length > 0;

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search articles by title, author, tags, or content..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={() => setShowSuggestions(searchQuery.length >= 2)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
        />
        
        {/* Search Suggestions Dropdown */}
        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="p-3 border-b border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Clock className="h-3 w-3" />
                  Recent searches
                </div>
                <div className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearchClick(search)}
                      className="w-full text-left px-2 py-1 text-sm hover:bg-accent/10 rounded text-foreground"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Suggestions */}
            {searchSuggestions.length > 0 && (
              <div className="p-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <TrendingUp className="h-3 w-3" />
                  Suggestions
                </div>
                <div className="space-y-1">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-2 py-1 text-sm hover:bg-accent/10 rounded flex items-center justify-between"
                    >
                      <span className="text-foreground">{suggestion.value}</span>
                      <span className="text-xs text-muted-foreground">
                        {suggestion.type} ({suggestion.count})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No suggestions */}
            {searchSuggestions.length === 0 && recentSearches.length === 0 && (
              <div className="p-3 text-sm text-muted-foreground text-center">
                No suggestions found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filter Toggle - Only show if tags are enabled */}
      {siteConfig.features.enableTags && (
        <>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Filter className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs bg-accent text-accent-foreground rounded-full">
                  {selectedTags.length + (searchQuery ? 1 : 0)}
                </span>
              )}
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-3 w-3" />
                Clear all
              </button>
            )}
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="p-4 border border-border rounded-lg bg-card mb-4">
              <h4 className="text-sm font-medium mb-3">Filter by tags</h4>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredPosts.length} of {posts.length} articles
        {hasActiveFilters && (
          <span className="ml-2">
            • <button onClick={clearFilters} className="text-accent hover:underline">Clear filters</button>
          </span>
        )}
      </div>
    </div>
  );
}; 