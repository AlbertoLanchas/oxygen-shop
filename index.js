const d = document,
  w = window;

d.addEventListener("DOMContentLoaded", (e) => {
  hamburguerMenu(".panel-btn", ".panel", ".panel-cross");
  closeModal(".modal-close", ".modal");
  scrollTopButton(".scroll-top-btn");
  modalValidation();
  getScrollPercent();
  slider();
  openModal();
  getCurrency();
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

//NAME

document.getElementById("name").addEventListener("change", nameValidation);

function nameValidation() {
  let nameInput = document.getElementById("name");
  let formName = nameInput.value;

  if (formName.length > 200 || formName.length < 2) {
    nameInput.style.border = "2px solid red";
    return false;
  } else {
    nameInput.style.border = "0px";
    nameInput.style.borderBottom = "2px solid green";
    return true;
  }
}

//EMAIL
document.getElementById("email").addEventListener("change", emailValidation);
function emailValidation() {
  let pattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let inputEmail = document.getElementById("email");
  let formEmail = inputEmail.value;

  if (pattern.test(formEmail)) {
    inputEmail.style.border = "0px";
    inputEmail.style.borderBottom = "2px solid green";
    return true;
  } else {
    inputEmail.style.border = "2px solid red";
    return false;
  }
}

//CHECKBOX

document
  .getElementById("checkboxForm")
  .addEventListener("change", checkboxValidation);

function checkboxValidation() {
  let checkbox = document.getElementById("checkboxForm");
  let checkDiv = document.getElementById("checkboxDiv");
  if (checkbox.checked) {
    checkDiv.style.border = "2px solid green";
    return true;
  } else {
    checkDiv.style.border = "2px solid red";
    return false;
  }
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

//HAMBURGUER BUTTON

function hamburguerMenu(menuBtn, panel, menuCross) {
  // hamburguerMenu(".panel-btn", ".panel", ".menu a");
  d.addEventListener("click", (e) => {
    if (e.target.matches(menuBtn) || e.target.matches(`${menuBtn} *`)) {
      d.querySelector(panel).classList.toggle("is-active");
      d.querySelector(menuBtn).classList.toggle("is-active");
    }

    // if (e.target.matches(menuCross) || e.target.matches(`${menuCross} *`)) {
    //   d.querySelector(panel).classList.toggle("is-active");
    //   d.querySelector(menuCross).classList.toggle("is-active");
    // }
  });
}

//MODAL

function openModal() {
  d.addEventListener("scroll", () => {
    if (getScrollPercent() >= 25) {
      d.querySelector(".modal").classList.add("is-open");
    }
  });
  setTimeout(() => {
    d.querySelector(".modal").classList.add("is-open");
  }, 5000);
}

function closeModal(modalBtn, modalSection) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(modalBtn) || e.target.matches(`${modalBtn} *`)) {
      d.querySelector(modalSection).classList.remove("is-open");
    }
    d.addEventListener("keydown", (e) => {
      if (e.key === "Escape")
        d.querySelector(modalSection).classList.remove("is-open");
    });
  });
}

document
  .getElementById("emailModal")
  .addEventListener("change", modalValidation);
function modalValidation() {
  let pattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let inputModal = document.getElementById("emailModal");
  let formModal = inputModal.value;

  if (pattern.test(formModal)) {
    inputModal.style.border = "0px";
    inputModal.style.borderBottom = "2px solid green";
    return true;
  } else {
    inputModal.style.border = "2px solid red";
    return false;
  }
}

//Selector de Monedas
const api =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json";

let allCurrencies;

const getCurrency = async () => {
  await fetch(api)
    .then((response) => response.json())
    .then((data) => (allCurrencies = data))
    .catch((error) => console.log(error));

  let eur = allCurrencies.usd.eur;
  let gbp = allCurrencies.usd.gbp;

  document.getElementById("basicPrice").innerHTML = "$" + 0;
  document.getElementById("professionalPrice").innerHTML = "$" + 25;
  document.getElementById("premiumPrice").innerHTML = "$" + 60;

  let select = document.getElementById("pricingSelect");

  select.addEventListener("change", () => {
    let indice = select.selectedIndex;

    switch (indice) {
      case 0:
        document.getElementById("basicPrice").innerHTML = `£${Math.round(
          0 * gbp
        )}`;
        document.getElementById("professionalPrice").innerHTML = `£${Math.round(
          25 * gbp
        )}`;
        document.getElementById("premiumPrice").innerHTML = `£${Math.round(
          60 * gbp
        )}`;
        break;
      case 1:
        document.getElementById("basicPrice").innerHTML =
          "€" + Math.round(0 * eur);
        document.getElementById("professionalPrice").innerHTML =
          "€" + Math.round(25 * eur);
        document.getElementById("premiumPrice").innerHTML =
          "€" + Math.round(60 * eur);
        break;
      case 2:
        document.getElementById("basicPrice").innerHTML = "$" + 0;
        document.getElementById("professionalPrice").innerHTML = "$" + 25;
        document.getElementById("premiumPrice").innerHTML = "$" + 60;
    }
  });
};

//ENVIAR DATOS DEL FORMULARIO

let form = document.getElementById("form");

const formValidation = () => {
  return nameValidation() && emailValidation() && checkboxValidation();
};
form.addEventListener("submit", formValidation);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (formValidation()) {
    let formName = document.getElementById("name").value;
    let formEmail = document.getElementById("email").value;
    let url = "https://jsonplaceholder.typicode.com/posts";

    const infoForm = JSON.stringify({ name: formName, email: formEmail });

    await fetch(url, { method: "POST", body: infoForm })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.log(error));

    const getData = async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    };
  }
});
