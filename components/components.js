/* ============================================================
   TR경영연구소 | 공통 컴포넌트 로더
   헤더·푸터를 각 페이지에 자동으로 삽입합니다.
   
   ▶ 사용법
     각 HTML 페이지에 아래 두 줄을 추가하세요:
     <div id="header-placeholder"></div>  ← body 최상단
     <div id="footer-placeholder"></div>  ← body 최하단
     <script src="components/components.js"></script>
   ============================================================ */

(async function () {

  /* ── 1. 컴포넌트 파일을 불러와서 삽입하는 함수 ── */
  async function loadComponent(placeholderId, filePath) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;   // placeholder가 없으면 건너뜀

    try {
      const response = await fetch(filePath);
      if (!response.ok) throw new Error(`${filePath} 로드 실패`);
      const html = await response.text();
      placeholder.outerHTML = html;   // placeholder를 실제 HTML로 교체
    } catch (err) {
      console.warn('[components.js]', err.message);
    }
  }

  /* ── 2. 헤더·푸터 동시 로드 ── */
  await Promise.all([
    loadComponent('header-placeholder', 'components/header.html'),
    loadComponent('footer-placeholder', 'components/footer.html'),
  ]);

  /* ── 3. 현재 페이지에 해당하는 네비 링크 활성화 ── */
  const currentPage = location.pathname.split('/').pop().replace('.html', '') || 'index';
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ── 4. 모바일 햄버거 메뉴 토글 ── */
  const toggle = document.getElementById('menu-toggle');
  const nav    = document.getElementById('header-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.classList.toggle('active', isOpen);
    });

    // 메뉴 링크 클릭 시 모바일 메뉴 닫기
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('active');
      });
    });
  }

  /* ── 5. 스크롤 시 헤더 그림자 추가 ── */
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();   // 초기 실행
  }

})();
