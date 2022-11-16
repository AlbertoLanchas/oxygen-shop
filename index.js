const d = document,
  w = window;

d.addEventListener("DOMContentLoaded", (e) => {
  scrollTopButton(".scroll-top-btn");
  contactFormValidation();
  getScrollPercent();
});

function scrollTopButton(btn) {
  const $scrollBtn = d.querySelector(btn);

  w.addEventListener("scroll", (e) => {
    let scrollTop = window.scrollY || d.documentElement.scrollTop;
    if (scrollTop > 400) {
      $scrollBtn.classList.remove("hidden");
    } else {
      $scrollBtn.classList.add("hidden");
    }
  });

  d.addEventListener("click", (e) => {
    setTimeout(() => {
      if (e.target.matches(btn)) {
        w.scrollTo({ behavior: "smooth", top: 0 });
      }
    }, 2000);
  });
}

//FORM VALIDATION

// SCROLL PORCENTAJE
function getScrollPercent() {
  return Math.floor(
    ((document.documentElement["scrollTop"] || document.body["scrollTop"]) /
      ((document.documentElement["scrollHeight"] ||
        document.body["scrollHeight"]) -
        document.documentElement.clientHeight)) *
      100
  );
}

d.addEventListener("scroll", (e) => {
  let scroll = document.querySelector("#scroll-porcentaje");
  scroll.style.width = `${getScrollPercent()}%`;
  getScrollPercent();
});
