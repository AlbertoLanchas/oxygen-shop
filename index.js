const d = document,
  w = window;

d.addEventListener("DOMContentLoaded", (e) => {
  scrollTopButton(".scroll-top-btn");
  contactFormValidation();
  getScrollPercent();
  slider();
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
function contactFormValidation() {
  const $form = d.querySelector(".questions__form"),
    $inputs = d.querySelectorAll(".questions__form [required]");

  $inputs.forEach((input) => {
    const $span = d.createElement("span");
    $span.id = input.name;
    $span.textContent = input.title;
    $span.classList.add("contact-form-error", "none");
    input.insertAdjacentElement("afterend", $span);
  });

  d.addEventListener("keyup", (e) => {
    if (e.target.matches(".contact-form [required]")) {
      let $input = e.target,
        pattern = $input.pattern || $input.dataset.pattern;

      if (pattern && $input.value !== "") {
        let regex = new RegExp(pattern);
        return !regex.exec($input.value)
          ? d.getElementById($input.name).classList.add("is-active")
          : d.getElementById($input.name).classList.remove("is-active");
      }

      if (!pattern) {
        return $input.value === ""
          ? d.getElementById($input.name).classList.add("is-active")
          : d.getElementById($input.name).classList.remove("is-active");
      }
    }
  });

  d.addEventListener("submit", (e) => {
    e.preventDefault();
    const $loader = d.querySelector(".contact-form-loader"),
      $response = d.querySelector(".contact-form-response");

    $loader.classList.remove("none");

    setTimeout(() => {
      $loader.classList.add("none");
      $response.classList.remove("none");
      $form.reset();

      setTimeout(() => {
        $response.classList.add("none");
      }, 3000);
    }, 3000);
  });
}

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

//SLIDER
function slider() {
  const $nextBtn = d.querySelector(".slider-btn .next");
  const $prevBtn = d.querySelector(".slider-btn .prev");
  const $slides = d.querySelectorAll(".slider-slide");

  let i = 0;

  d.addEventListener("click", (e) => {
    if (e.target === $prevBtn) {
      e.preventDefault();
      $slides[i].classList.remove("active");
      i--;

      if (i < 0) {
        i = $slides.length - 1;
      }
      $slides[i].classList.add("active");
    }
  });

  d.addEventListener("click", (e) => {
    if (e.target === $nextBtn) {
      e.preventDefault();
      $slides[i].classList.remove("active");
      i++;

      if (i > $slides.length - 1) {
        i = 0;
      }
      $slides[i].classList.add("active");
    }
  });
}
