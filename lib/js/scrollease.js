const ScrollEase = {
  init: function () {
    if (!CSS.supports("animation-timeline: view()")) {
      console.warn("⚠️ animation-timeline not supported, using JS polyfill.");
      const elements = document.querySelectorAll("[data-scrollease]");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              let el = entry.target;
              let animation = el.getAttribute("data-scrollease");
              let duration =
                el.getAttribute("data-scrollease-duration") || "1s";
              let delay = el.getAttribute("data-scrollease-delay") || "0s";
              let easing =
                el.getAttribute("data-scrollease-easing") || "ease-out";
              el.style.animation = `${animation} ${duration} ${easing} ${delay} both`;
              setTimeout(
                () => observer.unobserve(el),
                parseFloat(delay) * 1000 + 100
              );
            }
          });
        },
        { threshold: 0.2 }
      );
      elements.forEach((el) => observer.observe(el));
    }
  },
};
