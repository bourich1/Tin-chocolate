// nav bar
document.querySelector(".nav-menu").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.add("show-menu");
});
document.querySelector(".nav-close").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.remove("show-menu");
});

// our partners slide
$(document).ready(function () {
  $(".customer-logos").slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 768,
        setting: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 520,
        setting: {
          slidesToShow: 3,
        },
      },
    ],
  });
});

// show and close cart
document.querySelector(".cart-toggle-btn").addEventListener("click", () => {
  document.querySelector(".cart-sidebar").classList.add("open");
});
document.querySelector(".close-cart").addEventListener("click", () => {
  document.querySelector(".cart-sidebar").classList.remove("open");
});

// slide

const myslide = document.querySelectorAll(".myslide"),
  dot = document.querySelectorAll(".dot");
let counter = 1;
slidefun(counter);

let timer = setInterval(autoSlide, 8000);
function autoSlide() {
  counter += 1;
  slidefun(counter);
}
function plusSlides(n) {
  counter += n;
  slidefun(counter);
  resetTimer();
}
function currentSlide(n) {
  counter = n;
  slidefun(counter);
  resetTimer();
}
function resetTimer() {
  clearInterval(timer);
  timer = setInterval(autoSlide, 8000);
}
function slidefun(n) {
  let i;
  for (i = 0; i < myslide.length; i++) {
    myslide[i].style.display = "none";
  }
  for (i = 0; i < dot.length; i++) {
    dot[i].className = dot[i].className.replace(" active", "");
  }
  if (n > myslide.length) {
    counter = 1;
  }
  if (n < 1) {
    counter = myslide.length;
  }
  myslide[counter - 1].style.display = "block";
  dot[counter - 1].className += " active";
}

// active btns

// 1. fetch JSON
fetch("../../products.json")
  .then((res) => res.json())
  .then((data) => {
    const products = data.products;

    products.forEach((product) => {
      // إنشاء Card ديال المنتوج
      let card = ` <div class="card" data-category=${
        product.category
      } data-id=${product.id}>
                    <div class="card-header">
                        <img src="assets/images/prudact.png"  loading="lazy" alt=${product.name}>
                    </div>
                    <div class="card-body">
                        <h3 class="name">${product.name}</h3>
                        <div class="card-footer">
                            ${product.prix ? `<div class="prix">${product.prix} DH</div>`: `<div class="prix">nothing</div>`}
                            <div class="btn-add-to-cart">
                                <i class="fa-solid fa-plus"></i>
                            </div>
                        </div>
                    </div>
                </div>`;
      document.querySelector(".prudacts").innerHTML += card;
        });
  })
  .catch((err) => console.log("Erreur:", err));
