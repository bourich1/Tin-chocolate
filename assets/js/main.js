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





















// fetch JSON data to cadeux page 
fetch("../../cadeux.json")
  .then((res) => res.json())
  .then((data) => {
    const products = data.products;
    products.forEach((p) => (p.quantity = 1));

    products.forEach((product) => {
      let card = `
        <div class="product-card">
          <div class="product-tumb">
            <img src=${product.img} alt="${product.name}">
          </div>
          <div class="product-details">
            <span class="product-catagory">${product.category}</span>
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <div class="product-bottom-details">
              ${
                product.prix
                  ? `<div class="product-price">${product.prix}DH</div>`
                  : `<div class="product-price"></div>`
              }
              <div class="product-actions">
    <button class="open-modal" data-id="${product.id}">
        <i class="fa-solid fa-eye"></i>
    </button>
    <button class="add-to-cart" data-id="${product.id}">
        <i class="fa-solid fa-plus"></i>
    </button>
</div>
            </div>
          </div>
        </div>`;
        

      if (product.category === "Nos Classiques") {
        document.querySelector(".nos-classiques").innerHTML += card;
      }else if(product.category === "Meilleures Cadeaux"){
        document.querySelector(".meilleures-cadeaux").innerHTML += card;
      }else{
        document.querySelector(".collection-ceramique").innerHTML += card;
      }
    });

    addProductToCart(products);
    setupModalOpen(products);
  })
  .catch((err) => console.log("Erreur:", err));


  // active btns

const links = document.querySelectorAll(".nav-links a");
const currentPage = window.location.pathname.split("/").pop();

links.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active-link");
  }

  link.addEventListener("click", () => {
    links.forEach(l => l.classList.remove("active-link"));
    link.classList.add("active-link");
  });
});







document.addEventListener("DOMContentLoaded", () => {
  showDataToCart();
});

// fetch JSON to botique page
fetch("../../products.json")
  .then((res) => res.json())
  .then((data) => {
    const products = data.products;
    products.forEach((p) => (p.quantity = 1));

    products.forEach((product) => {
      let card = `
        <div class="product-card">
          <div class="product-tumb">
            <img loading="lazy" src=${product.img} alt="${product.name}">
          </div>
          <div class="product-details">
            <span class="product-catagory">${product.category}</span>
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <div class="product-bottom-details">
              ${
                product.prix
                  ? `<div class="product-price">${product.prix}DH</div>`
                  : `<div class="product-price">Contact</div>`
              }
              <div class="product-actions">
    <button class="open-modal" data-id="${product.id}">
        <i class="fa-solid fa-eye"></i>
    </button>
    <button class="add-to-cart" data-id="${product.id}">
        <i class="fa-solid fa-plus"></i>
    </button>
</div>
            </div>
          </div>
        </div>`;

      if (product.category === "Nos Créations") {
        document.querySelector(".nos-Creations").innerHTML += card;
      } else if (product.category === "Nos Chocolats Classiques") {
        document.querySelector(".Nos-chocolats-classiques").innerHTML += card;
      } else if (product.category === "Nos Snacks") {
        document.querySelector(".nos-snacks").innerHTML += card;
      } else if (product.category === "Collections Spéciales") {
        document.querySelector(".collections-speciales").innerHTML += card;
      }
    });

    addProductToCart(products);
    setupModalOpen(products);
  })
  .catch((err) => console.log("Erreur:", err));

// add to cart
function addProductToCart(products) {
  let btns = document.querySelectorAll(".add-to-cart");

  btns.forEach((btn) => {
    let productId = btn.getAttribute("data-id");
    btn.addEventListener("click", () => {
      let product = products.find((p) => p.id === productId);
      managementCart(product);
      showDataToCart();
    });
  });
}

// manage cart
function managementCart(product) {
  let cartListCheck = JSON.parse(localStorage.getItem("products")) || [];

  let findProduct = cartListCheck.find((p) => p.id === product.id);

  const finalPrice = product.selectedOption ? product.selectedOption.prix : product.prix ?? 0;

  if (findProduct) {
    cartListCheck = cartListCheck.map((p) =>
      p.id === product.id
        ? {
            ...p,
            quantity: p.quantity + 1,
            prix: finalPrice,
            selectedOption: product.selectedOption ? { ...product.selectedOption } : p.selectedOption
          }
        : p
    );
  } else {
    cartListCheck.push({
      ...product,
      quantity: 1,
      prix: finalPrice,
      selectedOption: product.selectedOption ? { ...product.selectedOption } : null,
    });
  }

  localStorage.setItem("products", JSON.stringify(cartListCheck));
}



// show data in cart
let cartItems = document.querySelector(".cart-items");
function showDataToCart() {
  let products = JSON.parse(localStorage.getItem("products")) || [];

  cartItems.innerHTML = products
    .map((product) => {
      let { img, name, prix, quantity } = product;
      return `
      <div class="cart-item">
        <div class="cart-item-img"><img src="${img}" alt="${name}"></div>
        <div class="cart-item-details">
          <div class="cart-item-title">${name}</div>
          ${prix ? `<div class="cart-item-price">${prix} Dhs</div>` : `<div class="cart-item-price">Contact for prix</div>`}
          <div class="flex">
            <div class="cart-item-quantity">
              <button class="decrease-qty" data-id="${product.id}">-</button>
              <span>${quantity}</span>
              <button class="increase-qty" data-id="${product.id}">+</button>
            </div>
            <button class="remove-item" data-id="${product.id}">Remove</button>
          </div>
        </div>
      </div>
    `;
    })
    .join("");
  setupCartActions();
  updateTotal();
  updateCartBadge();
}

// add quantity

function setupCartActions() {
  let increaseBtns = document.querySelectorAll(".increase-qty");
  let decreaseBtns = document.querySelectorAll(".decrease-qty");
  let removeBtns = document.querySelectorAll(".remove-item");

  increaseBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let id = btn.getAttribute("data-id");
      changeQuantity(id, "increase");
    });
  });

  decreaseBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let id = btn.getAttribute("data-id");
      changeQuantity(id, "decrease");
    });
  });
  // remove
  removeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let id = btn.getAttribute("data-id");
      removeItem(id);
    });
  });
}
// change quantity
function changeQuantity(id, type) {
  let cart = JSON.parse(localStorage.getItem("products")) || [];

  cart = cart.map((product) => {
    if (product.id === id) {
      if (type === "increase") {
        return { ...product, quantity: product.quantity + 1 };
      }

      if (type === "decrease" && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 };
      }
    }
    return product;
  });

  localStorage.setItem("products", JSON.stringify(cart));
  showDataToCart();
}
// remove
function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem("products")) || [];

  cart = cart.filter((product) => product.id !== id);

  localStorage.setItem("products", JSON.stringify(cart));
  showDataToCart();
}
// update total
function updateTotal() {
  let cart = JSON.parse(localStorage.getItem("products")) || [];
  let total = 0;

  cart.forEach((product) => {
    total += (product.prix || 0) * product.quantity;
  });

  document.querySelector(".total-price").innerHTML = total + " DH";
}
// update badge
function updateCartBadge() {
  let cart = JSON.parse(localStorage.getItem("products")) || [];
  let count = cart.reduce((sum, item) => sum + item.quantity, 0);

  document.querySelector(".cart-count").innerText = count;
}

// modal

// ==== ELEMENTS ====
const modalOverlay = document.getElementById("modalOverlay");
const modalImage = document.querySelector(".modal-image");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalStars = document.getElementById("modalStars");
const modalDescription = document.getElementById("modalDescription");
const modalWeight = document.getElementById("modalWeight");
const modalPrice = document.getElementById("modalPrice");
const modalOptions = document.getElementById("modalOptions");
const modalMainPrice = document.getElementById("modalMainPrice");
const closeModalBtn = document.getElementById("closeModal");

// === FUNCTION TO OPEN MODAL ===
let currentModalProduct = null;
function openProductModal(product) {
  currentModalProduct = product;
  // IMAGE
  modalImage.innerHTML = product.img
    ? `<img src="${product.img}" alt="${product.name}">`
    : `<div class="placeholder-img"><i class="fas fa-image"></i> No Image</div>`;

  // CATEGORY
  modalCategory.textContent = product.category || "";

  // TITLE
  modalTitle.textContent = product.name || "";

  // DESCRIPTION
  modalDescription.textContent = product.description || "";

  // STARS
  let stars = "";
  const fullStars = Math.floor(product.stars || 0);
  for (let i = 0; i < fullStars; i++) stars += "★";
  modalStars.textContent = stars || "★★★★★";

  // WEIGHT
  modalWeight.textContent = product.weight ? product.weight + "g" : product.pieces;

  // PRICE
  modalPrice.textContent = product.prix ? product.prix + " DH" : "—";
  modalMainPrice.textContent = product.prix ? product.prix + " DH" : "—";

  // OPTIONS
  if (product.options && product.options.length > 0) {
    modalOptions.innerHTML = `
            <h3 class="options-title">Options</h3>
            <div class="options-list">
                ${product.options
                  .map(
                    (opt) => `
                    <button class="option-btn" data-price="${opt.prix}">
                        ${opt.weight ? opt.weight : opt.pieces}
                        <span class="option-details">${opt.pieces ? opt.pieces : opt.weight} pieces — ${opt.prix} DH</span>
                    </button>
                `
                  )
                  .join("")}
            </div>
        `;
  } else {
    modalOptions.innerHTML = "";
  }

  // OPTION SELECT EVENT (to change main price)
  const optionBtns = document.querySelectorAll(".option-btn");
  optionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      optionBtns.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      modalMainPrice.textContent = btn.dataset.price + " DH";

      // 🔥 حفظ الـ OPTION المختار داخل الـ product
      currentModalProduct.selectedOption = {
        size: btn.textContent.trim(),
        prix: Number(btn.dataset.price),
      };

      // تحديث السعر الأساسي داخل object
      currentModalProduct.prix = Number(btn.dataset.price);
    });
  });

  modalOverlay.classList.add("active");
}

// === CLOSE MODAL ===
function closeProductModal() {
  modalOverlay.classList.remove("active");
}

closeModalBtn.addEventListener("click", closeProductModal);

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeProductModal();
});

// ==== CLICK PRODUCT CARD TO OPEN MODAL ====
function setupModalOpen(products) {
  const infoBtns = document.querySelectorAll(".open-modal");

  infoBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-id");
      const product = products.find((p) => p.id === id);
      openProductModal(product);
    });
  });
}

const modalAddToCartBtn = document.querySelector(
  ".modal-add-to-cart .add-to-cart"
);
const toast = document.getElementById("toast");
modalAddToCartBtn.addEventListener("click", () => {
  if (currentModalProduct) {
    const productToAdd = {
      ...currentModalProduct,
      quantity: 1,
      prix: currentModalProduct.selectedOption 
             ? currentModalProduct.selectedOption.prix 
             : currentModalProduct.prix ?? 0,
    };

    managementCart(productToAdd); 
    showDataToCart();
    modalOverlay.classList.remove("active");

    // toast
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
  }
});



function addToCart(product, selectedOption = null) {
  const item = {
    id: product.id,
    name: product.name,
    img: product.img,
    category: product.category,
    price: selectedOption ? selectedOption.prix : product.prix,
    option: selectedOption ? selectedOption.size : null,
    qty: 1,
  };

  cart.push(item);
  updateCartUI();
}


function openCheckoutModal() {
  let cart = JSON.parse(localStorage.getItem("products")) || [];
  let html = "";

  cart.forEach((item) => {
    html += `
      <div class="product-line">
        <div>
          <strong>${item.name}</strong>
          ${item.selectedOption ? `<div class="option">Option: ${item.selectedOption.size}</div>` : ""}
        </div>
        <span>${item.prix} DH × ${item.quantity}</span>
      </div>
    `;
  });

  document.getElementById("checkoutProducts").innerHTML = html;
  document.getElementById("checkoutModal").classList.add("active");
}

const checkoutModal = document.getElementById("checkoutModal");
const closeCheckoutBtn = document.querySelector(".close-checkout");

const checkoutBtn = document.querySelector(".checkout-btn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", openCheckoutModal);
}

closeCheckoutBtn.addEventListener("click", () => {
  checkoutModal.classList.remove("active");
});

checkoutModal.addEventListener("click", (e) => {
  if (e.target === checkoutModal) {
    checkoutModal.classList.remove("active");
  }
});


// wtsp commend
const confirmBtn = document.querySelector(".confirm-btn");

confirmBtn.addEventListener("click", () => {
  const name = document.getElementById("name")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();
  const address = document.getElementById("address")?.value.trim();

  if (!name || !phone || !address) {
    alert("⛔ الرجاء ملء جميع البيانات الشخصية (الاسم، الهاتف، العنوان)");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("products")) || [];
  if (cart.length === 0) {
    alert("السلة فارغة!");
    return;
  }

  let message = "🛒 طلبية جديدة من المتجر:\n\n";
  message += `👤 الاسم: ${name}\n`;
  message += `📞 الهاتف: ${phone}\n`;
  message += `📍 العنوان: ${address}\n\n`;
  message += "📦 المنتجات:\n";

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name}`;
    if (item.selectedOption) message += ` (الخيار: ${item.selectedOption.size})`;
    message += ` × ${item.quantity} = ${(item.prix ?? item.price) * item.quantity} درهم\n`;
  });

  let total = cart.reduce((sum, item) => sum + (item.prix ?? item.price) * item.quantity, 0);
  message += `\n💰 المجموع الكلي: ${total} درهم`;

  const phoneNumber = "212600000000";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
  
  localStorage.removeItem("products");
  
  document.getElementById("checkoutModal")?.classList.remove("active");
  
  setTimeout(() => {
    alert("✅ تم إرسال طلبك بنجاح! سيتم الاتصال بك لتأكيد الطلب.");
  }, 500);
});




// animation for celebrite

function Confetti() {
  var canvas = document.getElementById("confetti");
  var ctx = canvas.getContext("2d");

  var W = window.innerWidth;
  var H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  var mp = 150;
  var types = ["circle", "circle", "triangle", "triangle", "line"];
  var colors = [
    [238, 96, 169],
    [68, 213, 217],
    [245, 187, 152],
    [144, 148, 188],
    [235, 234, 77]
  ];
  var angles = [
    [4, 0, 4, 4],
    [2, 2, 0, 4],
    [0, 4, 2, 2],
    [0, 4, 4, 4]
  ];

  var particles = [];
  for (var i = 0; i < mp; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 4 + 1,
      d: Math.random() * mp,
      l: Math.floor(Math.random() * 65 - 30),
      a: angles[Math.floor(Math.random() * angles.length)],
      c: colors[Math.floor(Math.random() * colors.length)],
      t: types[Math.floor(Math.random() * types.length)]
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (var i = 0; i < mp; i++) {
      var p = particles[i];
      var op = p.r <= 3 ? 0.4 : 0.8;

      if (p.t === "circle") {
        ctx.fillStyle = "rgba(" + p.c + ", " + op + ")";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      } 
      else if (p.t === "triangle") {
        ctx.fillStyle = "rgba(" + p.c + ", " + op + ")";
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.r * p.a[0], p.y + p.r * p.a[1]);
        ctx.lineTo(p.x + p.r * p.a[2], p.y + p.r * p.a[3]);
        ctx.closePath();
        ctx.fill();
      } 
      else if (p.t === "line") {
        ctx.strokeStyle = "rgba(" + p.c + "," + op + ")";
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.l, p.y + p.r * 5);
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    update();
  }

  function update() {
    for (var i = 0; i < mp; i++) {
      var p = particles[i];
      p.y += Math.cos(p.d) + 1 + p.r / 2;
      p.x += Math.sin(0) * 2;

      if (p.x > W + 5 || p.x < -5 || p.y > H) {
        particles[i] = {
          x: Math.random() * W,
          y: -10,
          r: p.r,
          d: p.d,
          l: p.l,
          a: p.a,
          c: p.c,
          t: p.t
        };
      }
    }
  }

  // LOOP ديما 🔥
  setInterval(draw, 23);
}

window.onload = Confetti;
