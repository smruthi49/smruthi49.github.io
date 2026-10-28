// blog.js — Blog post loading, rendering, and sidebar injection
// Posts live in blog/posts/*.md and are listed in blog/index.json

window.BLOG = {
  posts: [],
  currentPost: null,

  // Load the post index from blog/index.json
  async loadIndex() {
    try {
      const res = await fetch('blog/index.json');
      if (!res.ok) throw new Error('no index');
      const data = await res.json();
      this.posts = data.posts || [];
      return this.posts;
    } catch {
      this.posts = [];
      return [];
    }
  },

  // Inject blog post items into the sidebar tree
  async renderSidebar() {
    const posts = await this.loadIndex();
    const container = document.getElementById('blogTree');
    if (!container) return;

    if (!posts.length) {
      container.innerHTML = `<div class="tree-loading">no posts yet</div>`;
      return;
    }

    container.innerHTML = posts.map(post => `
      <div class="tree-item" data-blog="${post.slug}">
        <span class="tree-indent"></span>
        <span class="file-icon md-icon">M↓</span>
        <span class="tree-label">${post.slug}.md</span>
      </div>
    `).join('');

    // Attach click handlers
    container.querySelectorAll('[data-blog]').forEach(item => {
      item.addEventListener('click', () => {
        const slug = item.dataset.blog;
        window.APP.openBlogPost(slug);
      });
    });
  },

  // Fetch and render a single blog post
  async renderPost(slug) {
    const post = this.posts.find(p => p.slug === slug);
    if (!post) return `<p class="page-error">Post not found: ${slug}</p>`;

    try {
      const res = await fetch(`blog/posts/${slug}.md`);
      if (!res.ok) throw new Error('not found');
      const raw = await res.text();
      const { meta, body } = this.parseFrontmatter(raw);

      const title = meta.title || post.title || slug;
      const date  = meta.date  || post.date  || '';
      const tags  = meta.tags  ? meta.tags.split(',').map(t => t.trim()) : (post.tags || []);
      const readTime = Math.max(1, Math.ceil(body.split(/\s+/).length / 200));

      return `
        <button class="back-btn" onclick="window.APP.navigate('blogposts')">← back to posts</button>
        <div class="blog-post-header">
          <div class="blog-post-title">${this.escapeHtml(title)}</div>
          <div class="blog-post-meta">
            <span>📅 ${date}</span>
            <span>⏱ ${readTime} min read</span>
            ${tags.length ? `<span>🏷 ${tags.join(', ')}</span>` : ''}
          </div>
          ${tags.length ? `<div class="tag-list" style="margin-top:10px">${tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
        </div>
        <div class="blog-post-body">${this.mdToHtml(body)}</div>
      `;
    } catch {
      return `<p class="page-error">Could not load post: ${slug}.md</p>`;
    }
  },

  // Render the blogposts index page body (list of cards)
  renderIndex() {
    const container = document.getElementById('blogPostList');
    if (!container) return;

    if (!this.posts.length) {
      container.innerHTML = `
        <div class="blog-empty">
          No posts yet. Check back soon!
        </div>
      `;
      return;
    }

    container.innerHTML = this.posts.map(post => `
      <div class="blog-card" onclick="window.APP.openBlogPost('${post.slug}')">
        <div class="blog-card-title">${this.escapeHtml(post.title)}</div>
        <div class="blog-card-meta">📅 ${post.date || 'undated'} · ⏱ ~${post.readTime || '?'} min</div>
        <div class="blog-card-desc">${this.escapeHtml(post.description || '')}</div>
        ${post.tags && post.tags.length ? `<div class="tag-list" style="margin-top:8px">${post.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
      </div>
    `).join('');
  },

  // Parse YAML-ish frontmatter from a .md file
  parseFrontmatter(raw) {
    const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!fmMatch) return { meta: {}, body: raw };
    const meta = {};
    fmMatch[1].split('\n').forEach(line => {
      const [k, ...v] = line.split(':');
      if (k && v.length) meta[k.trim()] = v.join(':').trim().replace(/^["']|["']$/g, '');
    });
    return { meta, body: fmMatch[2] };
  },

  // Minimal Markdown → HTML converter
  mdToHtml(md) {
    let html = md
      // Code blocks
      .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
        `<pre><code class="lang-${lang}">${this.escapeHtml(code.trimEnd())}</code></pre>`)
      // Headings
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm,  '<h2>$1</h2>')
      .replace(/^# (.+)$/gm,   '<h1>$1</h1>')
      // Blockquote
      .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
      // Horizontal rule
      .replace(/^---$/gm, '<hr/>')
      // Bold + italic
      .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/_(.+?)_/g, '<em>$1</em>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Links + images
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1"/>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
      // Unordered lists
      .replace(/^\s*[-*+] (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>[\s\S]*?<\/li>\n?)+/g, m => `<ul>${m}</ul>`)
      // Ordered lists
      .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
      // Paragraphs (wrap non-block lines)
      .replace(/^(?!<[a-z]|$)(.+)$/gm, '<p>$1</p>');

    return html;
  },

  escapeHtml(str = '') {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
};
