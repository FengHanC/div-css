/**
 * div-css — Portfolio v2
 * 交互：导航、搜索、暗色模式、动画
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ====== DOM 引用 ====== */
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelectorAll('.nav-link');
  const pageTitle = document.querySelector('.page-title');
  const searchInput = document.querySelector('.search-input');
  const themeToggle = document.getElementById('themeToggle');

  /* ====== 移动端菜单切换 ====== */
  function toggleSidebar() {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
    hamburger.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleSidebar);
  overlay.addEventListener('click', closeSidebar);

  navLinks.forEach(link => {
    link.addEventListener('click', closeSidebar);
  });

  /* ====== 导航高亮 ====== */
  const sectionNames = {
    home: '首页',
    projects: '项目',
    featured: '精选',
    about: '关于',
    contact: '联系',
  };

  function updateActiveNav(sectionId) {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === sectionId);
    });
    pageTitle.textContent = sectionNames[sectionId] || '首页';
  }

  // Intersection Observer
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0,
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateActiveNav(entry.target.id);
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  /* ====== 搜索过滤项目 ====== */
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
      if (!query) {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
        card.style.display = '';
        return;
      }

      const text = card.textContent.toLowerCase();
      const tags = (card.dataset.tags || '').toLowerCase();
      const match = text.includes(query) || tags.includes(query);

      if (match) {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
        card.style.display = '';
      } else {
        card.style.opacity = '0.3';
        card.style.transform = 'scale(0.95)';
      }
    });
  });

  // Escape 清空搜索
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      searchInput.dispatchEvent(new Event('input'));
      searchInput.blur();
    }
  });

  /* ====== 暗色模式切换 ====== */
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.querySelector('.theme-icon').textContent =
      theme === 'dark' ? '☀️' : '🌙';
    themeToggle.querySelector('span:last-child').textContent =
      theme === 'dark' ? '亮色模式' : '暗色模式';
  }

  // 初始化主题
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  setTheme(initialTheme);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* ====== 键盘快捷键 ====== */
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K: 聚焦搜索
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
    // Escape: 关菜单
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });

  /* ====== 初始化完成 ====== */
  console.log('✅ Portfolio v2 loaded');
  console.log('💡 快捷键: Ctrl+K 搜索');
});
