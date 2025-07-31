import { useState, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar as CalendarIcon, Plus, X, FileText, Download, Copy, Check, Settings, Sparkles, CheckCircle } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { siteConfig } from "../site.config";

// Simple date formatter to avoid date-fns dependency
const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatDateForYaml = (date: Date) => {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
};

interface BlogPostForm {
  id: string;
  slug: string;
  featured: boolean;
  title: string;
  excerpt: string;
  author: string;
  date: Date;
  tags: string[];
  readTime: string;
  content: string;
}

const AdminPage = () => {
  const [formData, setFormData] = useState<BlogPostForm>({
    id: '',
    slug: '',
    featured: false,
    title: '',
    excerpt: '',
    author: siteConfig.seo.author, // Pre-fill with site author
    date: new Date(),
    tags: [],
    readTime: '',
    content: ''
  });

  const [currentTag, setCurrentTag] = useState('');
  const [generatedYaml, setGeneratedYaml] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });
  const fileDownloadRef = useRef<HTMLAnchorElement>(null);

  const handleInputChange = (field: keyof BlogPostForm, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-generate slug from title
    if (field === 'title' && value) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({
        ...prev,
        slug: slug,
        id: slug
      }));
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const generateYaml = () => {
    const yamlContent = `id: ${formData.id}
slug: ${formData.slug}
featured: ${formData.featured}
title: ${formData.title}
excerpt: ${formData.excerpt}
author: ${formData.author}
date: ${formatDateForYaml(formData.date)}
tags:${formData.tags.map(tag => `\n  - ${tag}`).join('')}
readTime: ${formData.readTime}
content: |
  ${formData.content.split('\n').join('\n  ')}`;

    setGeneratedYaml(yamlContent);
    setShowPreview(true);
  };

  const downloadYaml = () => {
    if (!generatedYaml) return;
    
    const blob = new Blob([generatedYaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    
    if (fileDownloadRef.current) {
      fileDownloadRef.current.href = url;
      fileDownloadRef.current.download = `${formData.slug}.yaml`;
      fileDownloadRef.current.click();
    }
    
    URL.revokeObjectURL(url);
  };

  const saveToProject = async () => {
    if (!generatedYaml || !formData.slug) return;

    const fileName = `${formData.slug}.yaml`;
    
    // Try to use the File System Access API (Chrome/Edge)
    if ('showDirectoryPicker' in window) {
      try {
        // Let user select the src/blog-posts directory
        const dirHandle = await (window as any).showDirectoryPicker();
        
        // Create the file
        const fileHandle = await dirHandle.getFileHandle(fileName, {
          create: true
        });
        
        // Write the content
        const writable = await fileHandle.createWritable();
        await writable.write(generatedYaml);
        await writable.close();
        
    // Alert with better messaging based on config
    alert(`✅ ${fileName} has been saved directly to the selected directory!\n\nYour new post "${formData.title}" is ready to publish.`);
        return;
      } catch (error) {
        if ((error as any).name !== 'AbortError') {
          console.error('Error saving file:', error);
        }
        // Fall back to download if user cancels or error occurs
      }
    }
    
    // Fallback: Download to Downloads folder
    const blob = new Blob([generatedYaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    alert(`📁 ${fileName} saved to Downloads!\n\nNext: Move to src/blog-posts/ directory and your post "${formData.title}" will appear on ${siteConfig.title}.`);
  };

  const copyToClipboard = async () => {
    if (!generatedYaml) return;
    
    try {
      await navigator.clipboard.writeText(generatedYaml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      slug: '',
      featured: false,
      title: '',
      excerpt: '',
      author: '',
      date: new Date(),
      tags: [],
      readTime: '',
      content: ''
    });
    setGeneratedYaml('');
    setShowPreview(false);
    setCopied(false);
  };

  const isFormValid = formData.title && formData.slug && formData.excerpt && formData.author && formData.content;

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        {/* Header - Match your blog design */}
        <section className="py-8 px-6 sm:px-8 bg-gradient-to-b from-background to-secondary/20">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Settings className="h-8 w-8 text-accent animate-bounce-slow" />
              <h1 className="text-4xl font-bold">Post Management</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Create and manage blog posts for  {siteConfig.title}
            </p>
            
            {/* Stats */}
            <div className="flex justify-center items-center gap-6 mb-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Sparkles className="h-4 w-4 text-accent" />
                <span>Author: {siteConfig.seo.author}</span>
              </div>
            </div>
            
            {/* Decorative Divider */}
            <div className="flex justify-center">
              <span className="block w-24 h-0.5 rounded-full bg-gradient-to-r from-accent/40 via-accent to-accent/40 opacity-70" />
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-6 px-6 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Form */}
              <Card className="bg-gradient-to-br from-background via-secondary/10 to-background">
                <CardHeader>
                  <CardTitle className="text-accent">Create New Post</CardTitle>
                  <CardDescription>
                    Generate a new YAML blog post for {siteConfig.title}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter post title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                  </div>

                  {/* Slug (auto-generated but editable) */}
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      placeholder="post-slug"
                      value={formData.slug}
                      onChange={(e) => handleInputChange('slug', e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      Auto-generated from title, but you can edit it
                    </p>
                  </div>

                  {/* Featured Toggle - Only show if site config enables featured posts */}
                  {siteConfig.display.showFeaturedPosts && (
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) => handleInputChange('featured', checked)}
                      />
                      <Label htmlFor="featured">Featured Post</Label>
                    </div>
                  )}

                  {/* Excerpt */}
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt *</Label>
                    <Textarea
                      id="excerpt"
                      placeholder="Brief description of the post"
                      value={formData.excerpt}
                      onChange={(e) => handleInputChange('excerpt', e.target.value)}
                      rows={3}
                    />
                  </div>

                  {/* Author - Pre-filled from config, conditionally shown */}
                  {siteConfig.display.showPostAuthors && (
                    <div className="space-y-2">
                      <Label htmlFor="author">Author *</Label>
                      <Input
                        id="author"
                        placeholder="Author name"
                        value={formData.author}
                        onChange={(e) => handleInputChange('author', e.target.value)}
                      />
                    </div>
                  )}

                  {/* Date - Only show if enabled in config */}
                  {siteConfig.display.showPostDates && (
                    <div className="space-y-2">
                      <Label>Publication Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.date ? formatDate(formData.date) : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.date}
                            onSelect={(date) => date && handleInputChange('date', date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}

                  {/* Tags - Only show if enabled in config */}
                  {siteConfig.display.showPostTags && (
                    <div className="space-y-2">
                      <Label>Tags</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a tag"
                          value={currentTag}
                          onChange={(e) => setCurrentTag(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        />
                        <Button type="button" size="sm" onClick={addTag}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                              {tag}
                              <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => removeTag(tag)}
                              />
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Read Time - Only show if enabled in config */}
                  {siteConfig.features.enableReadingTime && (
                    <div className="space-y-2">
                      <Label htmlFor="readTime">Read Time</Label>
                      <Input
                        id="readTime"
                        placeholder="e.g., 5 min"
                        value={formData.readTime}
                        onChange={(e) => handleInputChange('readTime', e.target.value)}
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="space-y-2">
                    <Label htmlFor="content">Content *</Label>
                    <Textarea
                      id="content"
                      placeholder="Write your blog post content in Markdown..."
                      value={formData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      rows={10}
                      className="font-mono text-sm"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      onClick={generateYaml} 
                      disabled={!isFormValid}
                      className="flex-1 bg-accent hover:bg-accent/90"
                    >
                      Generate YAML
                    </Button>
                    <Button variant="outline" onClick={resetForm}>
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Preview */}
              <Card className="bg-gradient-to-br from-secondary/10 to-background">
                <CardHeader>
                  <CardTitle className="text-accent">YAML Preview</CardTitle>
                  <CardDescription>
                    Generated content for {siteConfig.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {showPreview && generatedYaml ? (
                    <div className="space-y-4">
                      <Alert>
                        <FileText className="h-4 w-4" />
                        <AlertDescription>
                          Ready to save! Click "Save to Project" to download <code>{formData.slug}.yaml</code> and move it to <code>src/blog-posts/</code>
                        </AlertDescription>
                      </Alert>
                      
                      <div className="relative">
                        <pre className="bg-secondary/20 p-4 rounded-lg text-sm overflow-auto max-h-96 whitespace-pre-wrap">
                          {generatedYaml}
                        </pre>
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={saveToProject} className="bg-green-600 hover:bg-green-700">
                          <Download className="h-4 w-4 mr-2" />
                          Save to Project
                        </Button>
                        <Button onClick={copyToClipboard} variant="outline" size="sm">
                          {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                          {copied ? 'Copied!' : 'Copy'}
                        </Button>
                      </div>
                      
                      <a ref={fileDownloadRef} style={{ display: 'none' }} />
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>Fill out the form and click "Generate YAML" to see the preview</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Success Modal */}
        <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
          <DialogContent className="sm:max-w-md bg-gradient-to-br from-background via-secondary/20 to-background border-accent/20">
            <DialogHeader className="text-center pb-2">
              <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <DialogTitle className="text-xl font-bold text-center">
                {successMessage.title}
              </DialogTitle>
              <DialogDescription className="text-center text-muted-foreground pt-2">
                {successMessage.description}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-center pt-4">
              <Button 
                onClick={() => setShowSuccessModal(false)}
                className="bg-accent hover:bg-accent/90 min-w-24"
              >
                Perfect!
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;