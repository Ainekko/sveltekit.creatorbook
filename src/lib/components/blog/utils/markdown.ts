// src/lib/utils/markdown.ts
import { marked } from 'marked';

// Configure marked options
marked.setOptions({
  breaks: true, // Convert \n to <br>
  gfm: true, // GitHub Flavored Markdown
  headerIds: true, // Add IDs to headers for anchor links
  mangle: false, // Don't escape autolinked email addresses
});

// Custom renderer for better HTML output
const renderer = new marked.Renderer();

// Customize heading rendering with anchor links
renderer.heading = (text, level) => {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
  return `
    <h${level} id="${escapedText}">
      <a href="#${escapedText}" class="heading-anchor" aria-hidden="true">#</a>
      ${text}
    </h${level}>
  `;
};

// Customize link rendering (open external links in new tab)
renderer.link = (href, title, text) => {
  const isExternal = href?.startsWith('http') && !href.includes(window.location.hostname);
  const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
  const titleAttr = title ? ` title="${title}"` : '';
  return `<a href="${href}"${target}${titleAttr}>${text}</a>`;
};

// Customize code block rendering with language indicator
renderer.code = (code, language) => {
  const lang = language || 'plaintext';
  return `
    <div class="code-block">
      <div class="code-header">
        <span class="code-language">${lang}</span>
      </div>
      <pre><code class="language-${lang}">${code}</code></pre>
    </div>
  `;
};

marked.use({ renderer });

/**
 * Convert markdown to HTML
 * @param markdown - Raw markdown string
 * @returns Sanitized HTML string
 */
export function renderMarkdown(markdown: string): string {
  if (!markdown) return '';
  
  try {
    return marked.parse(markdown) as string;
  } catch (error) {
    console.error('Markdown parsing error:', error);
    return '<p>Error rendering content</p>';
  }
}

/**
 * Extract plain text from markdown (useful for excerpts)
 * @param markdown - Raw markdown string
 * @param maxLength - Maximum length of output
 * @returns Plain text string
 */
export function extractPlainText(markdown: string, maxLength = 200): string {
  if (!markdown) return '';
  
  // Remove markdown syntax
  let text = markdown
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1') // Remove italic
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links
    .replace(/`(.+?)`/g, '$1') // Remove inline code
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .trim();
  
  if (text.length > maxLength) {
    text = text.substring(0, maxLength) + '...';
  }
  
  return text;
}

/**
 * Calculate reading time based on word count
 * @param markdown - Raw markdown string
 * @param wordsPerMinute - Average reading speed (default: 200)
 * @returns Reading time in minutes
 */
export function calculateReadingTime(markdown: string, wordsPerMinute = 200): number {
  if (!markdown) return 0;
  
  const words = markdown.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Generate table of contents from markdown headings
 * @param markdown - Raw markdown string
 * @returns Array of heading objects with text, level, and slug
 */
export function generateTableOfContents(markdown: string) {
  if (!markdown) return [];
  
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings = [];
  let match;
  
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const slug = text.toLowerCase().replace(/[^\w]+/g, '-');
    
    headings.push({ level, text, slug });
  }
  
  return headings;
}