/* ============================================================
   TR경영연구소 | 공통 헤더/푸터 동작 스크립트

   ※ 헤더·푸터 "내용"은 더 이상 이 파일이 불러오지 않습니다.
     각 HTML 페이지에 헤더·푸터 마크업을 직접 작성해 두었고
     (로컬 파일로 열었을 때나 GitHub Pages 양쪽 모두 안정적으로
     보이도록 하기 위한 방식입니다), 이 스크립트는 아래 3가지
     "동작"만 담당합니다.

   1. 현재 페이지에 해당하는 네비 링크 활성화
   2. 모바일 햄버거 메뉴 토글
   3. 스크롤 시 헤더 그림자 추가

   ▶ 사용법: 각 HTML 페이지 마지막에 아래 한 줄만 추가하면 됩니다.
     <script src="components/components.js"></script>
   ============================================================ */

(function () {

  /* ── 1. 현재 페이지에 해당하는 네비 링크 활성화 ── */
  const currentPage = location.pathname.split('/').pop().replace('.html', '') || 'index';
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ── 2. 모바일 햄버거 메뉴 토글 ── */
  const toggle = document.getElementById('menu-toggle');
  const nav    = document.getElementById('header-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.classList.toggle('active', isOpen);
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('active');
      });
    });
  }

  /* ── 3. 스크롤 시 헤더 그림자 추가 ── */
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

})();
