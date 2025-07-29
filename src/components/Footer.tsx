import { TestTube } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { siteConfig } from "../site.config";

export function Footer() {
  return (
    <footer className="w-full py-8 bg-background border-t border-border text-center text-muted-foreground text-sm">
      <div className="mb-2 font-semibold text-accent">Tinynews</div>
      <div className="mb-2">Built with Tinynews &middot; Open source YAML-powered blog system</div>
      <div>
        &copy; {new Date().getFullYear()} Tinynews &middot; <a href="https://github.com/stefangotikj/tinynews-blog" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">GitHub</a>
      </div>
    </footer>
  );
}