import { TestTube } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { siteConfig } from "../site.config";

export function Footer() {
  return (
    <footer className="w-full py-8 bg-background border-t border-border text-center text-muted-foreground text-sm">
      <div className="mb-2 font-semibold text-accent">{siteConfig.title}</div>
      <div className="mb-2">{siteConfig.description}</div>
      
      {/* Social Links - Only show if enabled */}
      {siteConfig.footer.showSocialLinks && (
        <div className="mb-4 flex justify-center gap-4">
          {siteConfig.social.twitter && (
            <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
              Twitter
            </a>
          )}
          {siteConfig.social.github && (
            <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
              GitHub
            </a>
          )}
          {siteConfig.social.linkedin && (
            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
              LinkedIn
            </a>
          )}
          {siteConfig.social.youtube && (
            <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
              YouTube
            </a>
          )}
          {siteConfig.social.instagram && (
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
              Instagram
            </a>
          )}
          {siteConfig.social.facebook && (
            <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
              Facebook
            </a>
          )}
        </div>
      )}

{/* 
  🙏 Kindly do not remove this footer credit.
  Showing support helps the developers continue building and maintaining this project.
  Thank you for respecting the effort that went into Tinynews.
*/}

      <div>
        {siteConfig.footer.copyrightText}
        {siteConfig.footer && (
          <>
            &middot; Built with <a href="https://github.com/stefangotikj/tinynews-blog" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">Tinynews</a>
          </>
        )}
      </div>
    </footer>
  );
}