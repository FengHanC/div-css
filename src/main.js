/**
 * div-css — Main Application
 * 现代 JavaScript 模块：导航交互、搜索、移动端菜单
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ====== DOM 引用 ====== */
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelectorAll('.nav-link');
  const pageTitle = document.querySelector('.page-title');
  const searchInput = document.querySelector('.search-input');
  const settingsBtn = document.querySelector('.settings-btn');

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

  // 导航切换后自动关菜单（移动端）
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeSidebar();
    });
  });

  /* ====== 导航高亮 & 页面标题切换 ====== */
  const sectionNames = {
    home: '首页',
    news: '资讯',
    events: '活动',
    about: '关于',
    contact: '联系',
  };

  function updateActiveNav(sectionId) {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === sectionId);
    });
    pageTitle.textContent = sectionNames[sectionId] || '首页';
  }

  // Intersection Observer: 滚动时高亮当前区域
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

  /* ====== 搜索功能 ====== */
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
      // 清空搜索时恢复所有内容
      document.querySelectorAll('.gallery-item, .content-card').forEach(el => {
        el.style.opacity = '1';
        el.style.filter = 'none';
      });
      return;
    }

    // 简单过滤：匹配标题和描述的文案
    const allCards = document.querySelectorAll('.content-card, .gallery-item');
    allCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const match = text.includes(query);
      card.style.opacity = match ? '1' : '0.2';
      card.style.filter = match ? 'none' : 'grayscale(1)';
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

  /* ====== 设置按钮交互 ====== */
  settingsBtn.addEventListener('click', () => {
    settingsBtn.classList.toggle('active');
    if (settingsBtn.classList.contains('active')) {
      settingsBtn.style.background = 'var(--color-accent)';
      settingsBtn.innerHTML = '<span>✓ 已设置</span>';
      setTimeout(() => {
        settingsBtn.classList.remove('active');
        settingsBtn.innerHTML = `
          <img src="/images/set.png" alt="设置图标" class="icon-set" />
          <span>设置</span>
        `;
        settingsBtn.style.background = '';
      }, 1500);
    }
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

  /* ====== 页面加载完成提示 ====== */
  console.log('✅ div-css 现代重构版已加载');
  console.log('💡 快捷键: Ctrl+K 搜索');
});
