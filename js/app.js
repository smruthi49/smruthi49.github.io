// app.js — Main application logic

window.APP = {
  currentPage: 'about',
  settings: {
    theme: 'dark',
    fontSize: 14,
    lineNumbers: true,
  },

  // ── Init ──────────────────────────────────────────────────────────────────
  async init() {
    this.loadSettings();
    this.applyTheme(this.settings.theme, true);
    this.applyFontSize(this.settings.fontSize, true);
    this.syncSettingsUI();
    this.bindEvents();
    await BLOG.renderSidebar();
    // navigate to about on load
    this.navigate('about');

    // Hash-based direct links
    var hash = location.hash.replace('#', '');
    if (hash && hash !== 'about') {
      if (hash.startsWith('blog:')) {
        this.openBlogPost(hash.replace('blog:', ''));
      } else if (typeof PAGES[hash] === 'function') {
        this.navigate(hash);
      }
    }
  },

  // ── Navigation ────────────────────────────────────────────────────────────
  async navigate(page) {
    this.currentPage = page;

    var labelMap = {
      'connect-github':   'github.js',
      'connect-linkedin': 'linkedin.js',
      'connect-x':        'x.js'
    };
    var label  = labelMap[page] || (page + '.md');
    var folder = page.startsWith('connect-') ? 'connect' : 'portfolio';

    // Sidebar highlight
    document.querySelectorAll('.tree-item').forEach(function(el) {
      el.classList.toggle('active', el.dataset.page === page);
    });

    // Auto-expand relevant section
    if (page.startsWith('connect-')) {
      var cs = document.getElementById('connectSection');
      if (cs) cs.classList.add('open');
    }
    if (page === 'blogposts') {
      var bs = document.getElementById('blogSection');
      if (bs) bs.classList.add('open');
    }
    if (page === 'misc' || page === 'community') {
      var ms = document.getElementById('miscSection');
      if (ms) ms.classList.add('open');
    }

    // Tab
    this.openTab(page, label);

    // Render
    var contentFn = PAGES[page];
    var html = contentFn ? contentFn() : '<p class="page-error">Page not found: ' + page + '</p>';
    document.getElementById('pageContent').innerHTML = html;

    // Post-render hooks
    if (page === 'blogposts') {
      if (!BLOG.posts.length) await BLOG.loadIndex();
      BLOG.renderIndex();
    }
    if (page === 'skills') {
      requestAnimationFrame(function() {
        document.querySelectorAll('.skill-bar-fill').forEach(function(bar) {
          var w = bar.style.width;
          bar.style.width = '0';
          setTimeout(function() { bar.style.width = w; }, 60);
        });
      });
    }

    // Chrome
    document.getElementById('breadcrumb').textContent = folder + ' / ' + label;
    document.getElementById('statusFile').textContent = label;
    history.replaceState(null, '', '#' + page);

    this.updateLineNumbers();
    document.getElementById('pageContent').scrollTop = 0;
  },

  // ── Blog post ─────────────────────────────────────────────────────────────
  async openBlogPost(slug) {
    var label = slug + '.md';
    this.currentPage = 'blog:' + slug;

    document.querySelectorAll('.tree-item').forEach(function(el) { el.classList.remove('active'); });
    var blogItem = document.querySelector('[data-blog="' + slug + '"]');
    if (blogItem) {
      blogItem.classList.add('active');
      var bs = document.getElementById('blogSection');
      if (bs) bs.classList.add('open');
    }

    this.openTab('blog:' + slug, label);

    var el = document.getElementById('pageContent');
    el.innerHTML = '<div class="page-loading">Loading&hellip;</div>';
    var html = await BLOG.renderPost(slug);
    el.innerHTML = html;

    document.getElementById('breadcrumb').textContent = 'blog / ' + label;
    document.getElementById('statusFile').textContent = label;
    history.replaceState(null, '', '#blog:' + slug);
    this.updateLineNumbers();
    el.scrollTop = 0;
  },

  // ── Tabs ──────────────────────────────────────────────────────────────────
  openTab(page, label) {
    var tabBar = document.getElementById('tabBar');
    var existing = tabBar.querySelector('[data-tab="' + page + '"]');

    if (existing) {
      tabBar.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); });
      existing.classList.add('active');
      return;
    }

    var tab = document.createElement('div');
    tab.className = 'tab active';
    tab.dataset.tab = page;
    tab.innerHTML = '<span class="tab-file-icon">M&#x2193;</span>'
      + '<span class="tab-label">' + label + '</span>'
      + '<button class="tab-close">&#x00D7;</button>';

    tabBar.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); });
    tabBar.appendChild(tab);

    var self = this;
    tab.addEventListener('click', function(e) {
      if (e.target.classList.contains('tab-close')) return;
      if (page.startsWith('blog:')) {
        self.openBlogPost(page.replace('blog:', ''));
      } else {
        self.navigate(page);
      }
    });

    tab.querySelector('.tab-close').addEventListener('click', function(e) {
      e.stopPropagation();
      self.closeTab(tab, page);
    });

    tab.scrollIntoView({ behavior: 'smooth', inline: 'end' });
  },

  closeTab(tabEl, page) {
    var tabBar = document.getElementById('tabBar');
    var tabs   = Array.from(tabBar.querySelectorAll('.tab'));
    var idx    = tabs.indexOf(tabEl);
    var wasActive = tabEl.classList.contains('active');
    tabEl.remove();

    if (wasActive) {
      var remaining = Array.from(tabBar.querySelectorAll('.tab'));
      if (remaining.length) {
        var next = remaining[Math.min(idx, remaining.length - 1)];
        var np = next.dataset.tab;
        if (np.startsWith('blog:')) {
          this.openBlogPost(np.replace('blog:', ''));
        } else {
          this.navigate(np);
        }
      } else {
        this.navigate('about');
      }
    }
  },

  // ── Line numbers ──────────────────────────────────────────────────────────
  updateLineNumbers() {
    var gutter = document.getElementById('lineNumbers');
    if (!this.settings.lineNumbers) {
      gutter.innerHTML = '';
      gutter.style.display = 'none';
      return;
    }
    gutter.style.display = '';
    requestAnimationFrame(function() {
      var content = document.getElementById('pageContent');
      var lineH = 23.8;
      var count = Math.max(30, Math.ceil(content.scrollHeight / lineH));
      var html = '';
      for (var i = 1; i <= count; i++) html += '<div>' + i + '</div>';
      gutter.innerHTML = html;
      content.onscroll = function() { gutter.scrollTop = content.scrollTop; };
    });
  },

  // ── Theme ─────────────────────────────────────────────────────────────────
  applyTheme(theme, skipSave) {
    document.documentElement.setAttribute('data-theme', theme);
    this.settings.theme = theme;
    var names = { dark: 'Dark', light: 'Light', monokai: 'Monokai', solarized: 'Solarized', nord: 'Nord' };
    document.getElementById('statusTheme').textContent = names[theme] || theme;
    if (!skipSave) this.saveSettings();
  },

  applyFontSize(size, skipSave) {
    document.documentElement.style.fontSize = size + 'px';
    this.settings.fontSize = parseInt(size);
    if (!skipSave) this.saveSettings();
  },

  syncSettingsUI() {
    document.getElementById('themeSelect').value = this.settings.theme;
    document.getElementById('fontSizeSelect').value = this.settings.fontSize;
    document.getElementById('lineNumToggle').checked = this.settings.lineNumbers;
  },

  // ── Persistence ───────────────────────────────────────────────────────────
  saveSettings() {
    try { localStorage.setItem('vscode-portfolio-settings', JSON.stringify(this.settings)); } catch(e) {}
  },
  loadSettings() {
    try {
      var s = JSON.parse(localStorage.getItem('vscode-portfolio-settings') || '{}');
      if (s.theme)      this.settings.theme      = s.theme;
      if (s.fontSize)   this.settings.fontSize   = s.fontSize;
      if (typeof s.lineNumbers === 'boolean') this.settings.lineNumbers = s.lineNumbers;
    } catch(e) {}
  },

  // ── Search ────────────────────────────────────────────────────────────────
  allItems() {
    var pages = Object.keys(PAGES).map(function(k) {
      var labelMap = { 'connect-github': 'github.js', 'connect-linkedin': 'linkedin.js',
                       'connect-x': 'x.js' };
      return { type: 'page', page: k, label: labelMap[k] || k + '.md' };
    });
    var posts = BLOG.posts.map(function(p) {
      return { type: 'blog', page: p.slug, label: p.slug + '.md', title: p.title };
    });
    return pages.concat(posts);
  },

  search(query) {
    if (!query.trim()) return [];
    var q = query.toLowerCase();
    return this.allItems().filter(function(item) {
      return item.label.toLowerCase().indexOf(q) !== -1
          || (item.title || '').toLowerCase().indexOf(q) !== -1;
    }).slice(0, 8);
  },

  // ── Events ────────────────────────────────────────────────────────────────
  bindEvents() {
    var self = this;

    // File tree items
    document.querySelectorAll('.tree-item[data-page]').forEach(function(item) {
      item.addEventListener('click', function() { self.navigate(item.dataset.page); });
    });

    // Blog index link
    var blogIndexItem = document.querySelector('.tree-item.active-blog[data-page="blogposts"]');
    if (blogIndexItem) {
      blogIndexItem.addEventListener('click', function() { self.navigate('blogposts'); });
    }

    // Section expand/collapse
    document.querySelectorAll('.tree-section-header').forEach(function(header) {
      header.addEventListener('click', function() {
        var section = document.getElementById(header.dataset.section);
        if (section) section.classList.toggle('open');
      });
    });

    // Activity: Explorer
    document.getElementById('explorerToggle').addEventListener('click', function() {
      var sidebar = document.getElementById('sidebar');
      var panel   = document.getElementById('searchPanel');
      var tree    = document.querySelector('.file-tree');
      panel.style.display = 'none';
      tree.style.display  = '';
      sidebar.classList.toggle('collapsed');
      document.getElementById('explorerToggle').classList.toggle('active', !sidebar.classList.contains('collapsed'));
      document.getElementById('searchToggle').classList.remove('active');
    });

    // Activity: Search
    document.getElementById('searchToggle').addEventListener('click', function() {
      var sidebar = document.getElementById('sidebar');
      var panel   = document.getElementById('searchPanel');
      var tree    = document.querySelector('.file-tree');
      var isOpen  = panel.style.display !== 'none';
      if (isOpen) {
        panel.style.display = 'none';
        tree.style.display  = '';
        sidebar.classList.add('collapsed');
        document.getElementById('searchToggle').classList.remove('active');
      } else {
        sidebar.classList.remove('collapsed');
        tree.style.display  = 'none';
        panel.style.display = '';
        document.getElementById('searchToggle').classList.add('active');
        document.getElementById('explorerToggle').classList.remove('active');
        document.getElementById('searchInput').focus();
      }
    });

    // Search input
    document.getElementById('searchInput').addEventListener('input', function(e) {
      var results   = self.search(e.target.value);
      var container = document.getElementById('searchResults');
      if (!results.length) { container.innerHTML = ''; return; }
      container.innerHTML = results.map(function(r) {
        return '<div class="search-result-item" data-type="' + r.type + '" data-page="' + r.page + '">'
          + '<span class="file-icon md-icon" style="margin-right:6px">M&#x2193;</span>' + r.label + '</div>';
      }).join('');
      container.querySelectorAll('.search-result-item').forEach(function(el) {
        el.addEventListener('click', function() {
          if (el.dataset.type === 'blog') self.openBlogPost(el.dataset.page);
          else self.navigate(el.dataset.page);
          document.getElementById('searchPanel').style.display = 'none';
          document.querySelector('.file-tree').style.display = '';
          document.getElementById('searchToggle').classList.remove('active');
          document.getElementById('explorerToggle').classList.add('active');
        });
      });
    });

    // Sidebar collapse button
    document.getElementById('sidebarCollapse').addEventListener('click', function() {
      document.getElementById('sidebar').classList.toggle('collapsed');
    });

    // Settings open
    document.getElementById('settingsBtn').addEventListener('click', function() {
      self.syncSettingsUI();
      document.getElementById('settingsModal').style.display = 'flex';
    });

    // Settings close
    document.getElementById('modalClose').addEventListener('click', function() {
      document.getElementById('settingsModal').style.display = 'none';
    });
    document.getElementById('settingsModal').addEventListener('click', function(e) {
      if (e.target === e.currentTarget) e.currentTarget.style.display = 'none';
    });

    // Theme select
    document.getElementById('themeSelect').addEventListener('change', function(e) {
      self.applyTheme(e.target.value);
    });

    // Font size
    document.getElementById('fontSizeSelect').addEventListener('change', function(e) {
      self.applyFontSize(e.target.value);
    });

    // Line numbers
    document.getElementById('lineNumToggle').addEventListener('change', function(e) {
      self.settings.lineNumbers = e.target.checked;
      self.updateLineNumbers();
      self.saveSettings();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        document.getElementById('sidebar').classList.toggle('collapsed');
      }
      if (e.key === 'Escape') {
        document.getElementById('settingsModal').style.display = 'none';
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', function() { APP.init(); });
