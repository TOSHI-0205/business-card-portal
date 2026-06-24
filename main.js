/**
 * 背景動画の自動再生（iOS等のフォールバック）
 */
(function () {
  var video = document.querySelector(".video-bg__video");
  if (!video) return;

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    video.pause();
    return;
  }

  video.play().catch(function () {
    document.addEventListener(
      "touchstart",
      function playOnInteraction() {
        video.play();
        document.removeEventListener("touchstart", playOnInteraction);
      },
      { once: true, passive: true }
    );
  });
})();

/**
 * スクロール表示アニメーション
 * セクションが画面に入ったら .is-visible を付与
 */
(function () {
  const targets = document.querySelectorAll(
    ".section__header, .card--featured, .link-grid"
  );

  targets.forEach(function (el) {
    el.classList.add("reveal");
  });

  if (!("IntersectionObserver" in window)) {
    targets.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
})();
