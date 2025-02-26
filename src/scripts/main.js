const carouselTrack = document.querySelector(".carousel-track");
const carouselSlides = document.querySelectorAll(".carousel-track__slide");
let size = carouselSlides[0].clientWidth;

const checkbox = document.querySelector(".checkbox");

const buttons = document.querySelectorAll(".carousel__button");
const prevButton = buttons[0];
const nextButton = buttons[1];

const form = document.forms.form;
const inputs = document.querySelectorAll(".feedback__form input");

const burgermenu = document.querySelector(".burgermenu");
const burgermenuToggle = document.querySelector(".burgermenu-toggle");

let intervalID;
let counter = 1;

form.reset();

// Show main slide
counter++;
carouselTrack.style.transform = "translateX(" + -size * counter + "px";

burgermenuToggle.addEventListener("click", () => {
  burgermenu.hidden = !burgermenu.hidden;
});

intervalID = setInterval(() => {
  nextSlide();
}, 5000);

prevButton.addEventListener("click", () => {
  prevSlide();
});

nextButton.addEventListener("click", () => {
  nextSlide();
});

carouselTrack.addEventListener("transitionend", () => {
  if (carouselSlides[counter].dataset.clone === "last") {
    size = carouselSlides[0].clientWidth;
    carouselTrack.style.transition = "none";
    counter = carouselSlides.length - 2;
    carouselTrack.style.transform = "translateX(" + -size * counter + "px";
  }

  if (carouselSlides[counter].dataset.clone === "first") {
    size = carouselSlides[0].clientWidth;
    carouselTrack.style.transition = "none";
    counter = carouselSlides.length - counter;
    carouselTrack.style.transform = "translateX(" + -size * counter + "px";
  }
});

checkbox.addEventListener("mousedown", () => {
  if (checkbox.dataset.checked === "false") {
    checkbox.dataset.checked = "true";
    clearInterval(intervalID);
    return;
  }

  intervalID = setInterval(() => {
    nextSlide();
  }, 5000);

  checkbox.dataset.checked = "false";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  for (const input of inputs) {
    if (input.value == "") {
      validateInputs(input);
      return;
    }
  }

  form.children[4].innerText = "Отправлено!";
});

for (const input of inputs) {
  input.addEventListener("blur", () => {
    validateInputs(input);
  });
}

function validateInputs(input) {
  const set = new Set([
    {
      name: "name",
      regExp: /^[a-zA-Z]{1,20}$/,
      errMessage: "Invalid name.",
    },
    {
      name: "phone",
      regExp:
        /^(?:\+38)?(?:\(0[0-9][0-9]\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|0[0-9][0-9][ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|0[0-9][0-9][0-9]{7})$/gm,
      errMessage: "Invalid phone.",
    },
    {
      name: "email",
      regExp: /^[\w\.-]{1,}@[a-zA-Z]{0,}\.[a-zA-Z]{2,4}$/,
      errMessage: "Invalid email.",
    },
  ]);

  set.forEach((item) => {
    if (item.name !== input.name) return;

    if (!item.regExp.test(input.value) || !input.value === "") {
      if (input.nextElementSibling) {
        input.nextElementSibling.remove();
      }

      const span = document.createElement("span");
      span.className = "error";
      span.innerHTML = item.errMessage;
      input.parentNode.append(span);
    } else {
      if (input.nextElementSibling) {
        input.nextElementSibling.remove();
      }
    }
  });
}

function prevSlide() {
  if (counter <= 0) return;

  size = carouselSlides[0].clientWidth;
  carouselTrack.style.transition = "transform 0.4s ease-in-out";
  counter--;
  carouselTrack.style.transform = "translateX(" + -size * counter + "px";
}

function nextSlide() {
  if (counter >= carouselSlides.length - 1) return;

  size = carouselSlides[0].clientWidth;
  carouselTrack.style.transition = "transform 0.4s ease-in-out";
  counter++;
  carouselTrack.style.transform = "translateX(" + -size * counter + "px";
}

const introduction = document.querySelector(".introduction");

const infographics = document.querySelector(".infographics");
const infographicsItems = document.querySelectorAll(".infographics__item");

window.addEventListener("scroll", (event) => {
  let introOffsetY = window.scrollY + introduction.getBoundingClientRect().top;

  if (introOffsetY <= window.scrollY) {
    document.querySelector(".blockquote").style.right = "0";
  }

  let infoOffsetY =
    window.scrollY - infographics.getBoundingClientRect().top + infographics.getBoundingClientRect().height;

  if (infoOffsetY >= window.scrollY) {
    for (const item of infographicsItems) {
      if (infographicsItems[0] === item || infographicsItems[2] === item) {
        item.style.top = 0;
      } else {
        item.style.bottom = 0;
      }
    }
  }
});
