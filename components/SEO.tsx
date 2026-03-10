import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  type?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  canonical,
  ogImage,
  type = 'website'
}) => {
  useEffect(() => {
    // Title
    document.title = title;

    // Helper to set meta tags
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Basic SEO
    setMeta('name', 'description', description);

    // Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', 'OCTOLAB');
    setMeta('property', 'og:locale', 'sr_RS');
    if (ogImage) setMeta('property', 'og:image', ogImage);

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    // Canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }

    // Cleanup
    return () => {
      document.title = 'OCTOLAB | Precision Research';
    };
  }, [title, description, canonical, ogImage, type]);

  return null;
};
