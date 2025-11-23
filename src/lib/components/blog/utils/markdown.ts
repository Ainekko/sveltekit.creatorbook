// src/lib/components/blog/utils/markdown.ts
import { marked } from 'marked';

// Create a custom renderer
const renderer = {
  heading(token: any) {
    const text = token.text;
    const depth = token.depth;
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    return `
      <h${depth} id="${escapedText}">
        <a href="#${escapedText}" class="heading-anchor" aria-hidden="true">#</a>
        ${text}
      </h${depth}>
    `;
  },

  link(token: any) {
    const href = token.href;
    const title = token.title;
    const text = token.text;
    const isExternal = href?.startsWith('http') && !href.includes(window.location.hostname);
    const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
    const titleAttr = title ? ` title="${title}"` : '';
    return `<a href="${href}"${target}${titleAttr}>${text}</a>`;
  },

  code(token: any) {
    const text = token.text;
    const lang = token.lang;
    const language = lang || 'plaintext';
    return `
      <div class="code-block">
        <div class="code-header">
          <span class="code-language">${language}</span>
        </div>
        <pre><code class="language-${language}">${text}</code></pre>
      </div>
    `;
  }
};

// Configure marked
marked.use({
  renderer,
  gfm: true,
  breaks: true,
  headerIds: true,
  mangle: false,
});

/**
 * Fix malformed tables where text is mixed with table syntax
 * This handles the specific case where a paragraph is embedded in the first table cell
 */
function fixMalformedTables(markdown: string): string {
  // Find pattern: | Long text content... | Header1 | Header2 | Header3 |
  // followed by: | :--- | :--- | :--- |
  const malformedPattern = /\| ([^|]{50,}?) \| ([^|\n]+?) \| ([^|\n]+?) \| ([^|\n]+?) \|\n\| :?-+:? \| :?-+:? \| :?-+:? \|/g;

  let fixed = markdown.replace(malformedPattern, (match, longText, header1, header2, header3) => {
    // Extract the long text as a paragraph
    const text = longText.trim();

    // Reconstruct as proper table with blank lines
    return `\n\n${text}\n\n| ${header1} | ${header2} | ${header3} |\n| :--- | :--- | :--- |`;
  });

  // Alternative pattern for 3-column tables
  const pattern3Col = /\| ([^|]{50,}?) \| ([^|\n]+?) \| ([^|\n]+?) \|\n\| :?-+:? \| :?-+:? \|/g;

  fixed = fixed.replace(pattern3Col, (match, longText, header1, header2) => {
    const text = longText.trim();
    return `\n\n${text}\n\n| ${header1} | ${header2} |\n| :--- | :--- |`;
  });

  // Ensure blank lines around all tables
  fixed = fixed.replace(/([^\n])\n(\| [^|]+? \|[^\n]*\n\| :?-+:?)/g, '$1\n\n$2');
  fixed = fixed.replace(/(\| [^|]+? \|[^\n]*)\n([^\n|])/g, '$1\n\n$2');

  return fixed;
}

/**
 * Render markdown to HTML
 * @param markdown - Raw markdown string
 * @returns Sanitized HTML string
 */
export function renderMarkdown(markdown: string): string {
  if (!markdown) return '';

  try {
    // Fix malformed tables
    const fixedMarkdown = fixMalformedTables(markdown);

    // Parse the markdown
    const html = marked.parse(fixedMarkdown, {
      async: false,
    }) as string;

    return html;
  } catch (error) {
    console.error('Markdown parsing error:', error);
    return '<p>Error rendering content</p>';
  }
}

/**
 * Extract plain text from markdown
 */
export function extractPlainText(markdown: string, maxLength = 200): string {
  if (!markdown) return '';

  let text = markdown
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/\|/g, ' ')
    .replace(/\n/g, ' ')
    .trim();

  if (text.length > maxLength) {
    text = text.substring(0, maxLength) + '...';
  }

  return text;
}

/**
 * Calculate reading time
 */
export function calculateReadingTime(markdown: string, wordsPerMinute = 200): number {
  if (!markdown) return 0;

  const words = markdown.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Generate table of contents
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

/**
 * Debug function to test table parsing
 */
export function debugTableParsing(markdown: string): void {
  console.log('=== TABLE DEBUG ===');

  // Show the problematic section
  const tableSection = markdown.match(/\| [^|]{50,}[\s\S]{0,500}/);
  if (tableSection) {
    console.log('Found malformed table section:', tableSection[0].substring(0, 300));
  }

  const fixed = fixMalformedTables(markdown);
  const tableInFixed = fixed.match(/\n\n\| [^|\n]+ \|[^\n]*\n\| :?-+:?[\s\S]{0,500}/);
  if (tableInFixed) {
    console.log('\nFixed table section:', tableInFixed[0].substring(0, 300));
  }

  const html = renderMarkdown(markdown);

  if (html.includes('<table>')) {
    console.log('\n✅ Table successfully parsed!');
    const tableHtml = html.match(/<table>[\s\S]*?<\/table>/);
    if (tableHtml) {
      console.log('Table HTML preview:', tableHtml[0].substring(0, 800));
    }
  } else {
    console.log('\n❌ Table not parsed');
    console.log('This usually means the markdown table syntax is invalid');
  }

  // Check if prose class will apply styles
  console.log('\n📋 CSS Debugging:');
  console.log('- Make sure the content is wrapped in class="prose"');
  console.log('- Check browser DevTools to see if table has any styles applied');
  console.log('- Look for: .prose table { ... } in the Styles panel');
}