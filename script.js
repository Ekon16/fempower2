// Al cargar el DOM, inicializamos la aplicación
document.addEventListener("DOMContentLoaded", () => {

   /* === SLIDER === */
   let slideIndex = 0;
   const slides = document.querySelectorAll('.slide');
   const totalSlides = slides.length;
   const prev = document.querySelector('.prev');
   const next = document.querySelector('.next');
 
   function showSlide(index) {
     if (index >= totalSlides) {
       slideIndex = 0;
     } else if (index < 0) {
       slideIndex = totalSlides - 1;
     } else {
       slideIndex = index;
     }
     const slidesWrapper = document.querySelector('.slides');
     if (slidesWrapper) {
       slidesWrapper.style.transform = `translateX(-${slideIndex * 100}%)`;
     }
     // Actualizar indicadores del slider
     if (indicators.length) {
       indicators.forEach(dot => dot.classList.remove('active'));
       indicators[slideIndex].classList.add('active');
     }
   }
 
   // Mejora 3: Agregar indicadores de posición (puntos) al slider
   const sliderSection = document.querySelector('.slider');
   const indicators = [];
   if (sliderSection && totalSlides > 1) {
     const indicatorsContainer = document.createElement('div');
     indicatorsContainer.className = 'indicators';
     for (let i = 0; i < totalSlides; i++) {
       const dot = document.createElement('span');
       dot.className = 'indicator-dot';
       if (i === 0) dot.classList.add('active');
       dot.addEventListener('click', () => showSlide(i));
       indicatorsContainer.appendChild(dot);
       indicators.push(dot);
     }
     sliderSection.appendChild(indicatorsContainer);
   }
 
   // Controles del slider (flechas prev/next)
   if (prev && next) {
     prev.addEventListener('click', () => showSlide(slideIndex - 1));
     next.addEventListener('click', () => showSlide(slideIndex + 1));
     setInterval(() => showSlide(slideIndex + 1), 5000);
     // Mejora 5: Permitir control del slider con teclado (Enter/Espacio)
     prev.addEventListener('keydown', (e) => {
       if (e.key === 'Enter' || e.key === ' ') {
         e.preventDefault();
         showSlide(slideIndex - 1);
       }
     });
     next.addEventListener('keydown', (e) => {
       if (e.key === 'Enter' || e.key === ' ') {
         e.preventDefault();
         showSlide(slideIndex + 1);
       }
     });
   }
 
   // Inicializar slider en la primera diapositiva
   showSlide(slideIndex);
 
  // Configuración de IndexedDB
  let db;
  const request = indexedDB.open("fempowerDB", 1);
  request.onupgradeneeded = (e) => {
    db = e.target.result;
    // Crear almacenes de objetos (stores) para usuarios, productos, carrito y compras
    const userStore = db.createObjectStore("users", { keyPath: "email" });
    const productStore = db.createObjectStore("products", { keyPath: "id" });
    const cartStore = db.createObjectStore("cart", { keyPath: "cartId", autoIncrement: true });
    const orderStore = db.createObjectStore("orders", { keyPath: "orderId", autoIncrement: true });
    orderStore.createIndex("byUser", "userEmail", { unique: false });
    // Datos iniciales de productos (solo la primera vez)
    const initialProducts = [
      {
        id: "radiance-revive",
        name: "Radiance Revive",
        description: "Dale un resplandor natural a tu piel con Radiance Revive, la fórmula ideal para combatir la piel opaca, seca y con imperfecciones. Enriquecida con Vitamina A y C, junto con un exclusivo blend de Colágeno y Ácido Hialurónico, esta poderosa combinación ayuda a revitalizar la piel desde el interior, mejorando la hidratación y reduciendo manchas. Disfruta de una piel más luminosa, uniforme y radiante todos los días.",
        problem: "Piel opaca, reseca, con manchas e imperfecciones.",
        composition: "Vitamina A (principal) + Vitamina C + Blend de Colágeno y Ácido Hialurónico.",
        benefit: "Revitaliza la piel, ayuda a eliminar manchas y devuelve el brillo natural.",
        price: "$49.99",
        image: "src/radiance-revive.png",
        category: "Piel",
        stock: 50
      },
      {
        id: "anti-aging-shield",
        name: "Anti-Aging Shield",
        description: "El tiempo avanza, pero tu piel no tiene que reflejarlo. Anti-Aging Shield es la solución definitiva contra arrugas, líneas de expresión y el daño causado por el estrés ambiental. Gracias a la acción antioxidante de Vitamina E, Vitamina C, Coenzima Q10 y Resveratrol, protege y repara la piel desde el interior, combatiendo los signos del envejecimiento y restaurando su firmeza. Vive cada día con una piel más joven y saludable.",
        problem: "Aparición de arrugas, líneas de expresión y daño por estrés ambiental.",
        composition: "Vitamina E (principal) + Vitamina C + Coenzima Q10 + Resveratrol.",
        benefit: "Protege y repara la piel, reduciendo los signos del envejecimiento.",
        price: "$59.99",
        image: "src/anti-aging-shield.png",
        category: "Piel",
        stock: 50
      },
      {
        id: "firm-elastic",
        name: "Firm & Elastic",
        description: "Recupera la firmeza y elasticidad de tu piel con Firm & Elastic, un suplemento diseñado para fortalecer la estructura cutánea y prevenir la flacidez. Con Vitamina C, Colágeno y Ácido Hialurónico, esta fórmula única mejora la tonicidad de la piel, proporcionándole una hidratación profunda y un aspecto rejuvenecido. Ideal para quienes buscan una piel más firme, suave y radiante.",
        problem: "Pérdida de firmeza y elasticidad en la piel.",
        composition: "Vitamina C (principal) + Colágeno + Ácido Hialurónico.",
        benefit: "Refuerza la estructura cutánea, aumentando la firmeza y tonificando la piel.",
        price: "$39.99",
        image: "src/firm-elastic.png",
        category: "Piel",
        stock: 50
      },
      {
        id: "clear-complexion",
        name: "Clear Complexion",
        description: "Despídete del acné y el exceso de grasa con Clear Complexion. Especialmente formulado con Vitamina B3 (Niacina), Zinc y Extracto de Té Verde, este potente suplemento equilibra la producción de sebo, reduce la inflamación y previene la aparición de brotes. Si buscas una piel más limpia, uniforme y sin imperfecciones, esta es la solución natural que estabas esperando.",
        problem: "Brotes de acné y exceso de sebo.",
        composition: "Vitamina B3 (Niacina) (principal) + Zinc + Extracto de Té Verde.",
        benefit: "Regula la producción de sebo, reduce la inflamación y ayuda a mantener una piel equilibrada.",
        price: "$44.99",
        image: "src/clear-complexion.png",
        category: "Salud",
        stock: 50
      },
      {
        id: "detox-glow",
        name: "Detox Glow",
        description: "Renueva tu piel desde adentro con Detox Glow, la fórmula que desintoxica y elimina impurezas acumuladas en la piel. Gracias a la combinación de Vitamina C, Ácido Alfa Lipoico y Probióticos, este suplemento estimula la renovación celular y aporta luminosidad, brindándote un cutis fresco y saludable.",
        problem: "Piel sin vitalidad y opaca por la acumulación de toxinas.",
        composition: "Vitamina C (principal) + Ácido Alfa Lipoico + Probióticos.",
        benefit: "Desintoxica y estimula la renovación celular, aportando luminosidad.",
        price: "$54.99",
        image: "src/detox-glow.png",
        category: "Piel",
        stock: 50
      },
      {
        id: "vital-balance",
        name: "Vital Balance",
        description: "Encuentra el equilibrio perfecto con Vital Balance, el suplemento diseñado para aumentar la energía y estabilizar el bienestar hormonal. Con Vitamina B6, B12, Ginseng y Omega-3, esta fórmula te ayuda a combatir la fatiga, mantener la vitalidad y mejorar el estado de ánimo, reflejando bienestar en todo tu cuerpo.",
        problem: "Falta de energía y desequilibrios hormonales que afectan la apariencia.",
        composition: "Vitamina B6 (principal) + Vitamina B12 + Ginseng + Omega-3.",
        benefit: "Aumenta la vitalidad, ayuda a equilibrar las hormonas y mejora el aspecto general.",
        price: "$64.99",
        image: "src/vital-balance.png",
        category: "Hormonas",
        stock: 50
      },
      {
        id: "beauty-boost",
        name: "Beauty Boost",
        description: "Brilla desde la raíz con Beauty Boost, el secreto para un cabello más fuerte y unas uñas saludables. Formulado con Biotina (Vitamina B7), Vitamina D y Colágeno, este suplemento fortalece la fibra capilar, reduce la caída y estimula el crecimiento del cabello, al mismo tiempo que nutre y endurece las uñas.",
        problem: "Cabello sin brillo y uñas quebradizas.",
        composition: "Biotina (Vitamina B7) (principal) + Vitamina D + Colágeno.",
        benefit: "Fortalece el cabello y las uñas, promoviendo un crecimiento sano.",
        price: "$34.99",
        image: "src/beauty-boost.png",
        category: "Cabello",
        stock: 50
      },
      {
        id: "calm-restore",
        name: "Calm & Restore",
        description: "El estrés no solo afecta tu mente, también impacta tu piel. Calm & Restore es la solución ideal para pieles sensibles o reactivas, formulada con Vitamina B5, Magnesio y Extracto de Manzanilla. Esta combinación reduce la inflamación, calma irritaciones y ayuda a restaurar el equilibrio natural de la piel.",
        problem: "Estrés que provoca irritación y brotes en la piel.",
        composition: "Vitamina B5 (principal) + Magnesio + Extracto de Manzanilla.",
        benefit: "Calma y reduce la irritación cutánea, ayudando a mitigar los efectos del estrés.",
        price: "$29.99",
        image: "src/calm-restore.png",
        category: "Piel",
        stock: 50
      },
      {
        id: "immune-radiance",
        name: "Immune Radiance",
        description: "Refuerza tu piel y tu sistema inmunológico con Immune Radiance, una combinación perfecta de Vitamina D, Vitamina C y Probióticos. Este suplemento potencia las defensas naturales de tu cuerpo, promoviendo una piel más saludable, luminosa y protegida contra agresiones externas.",
        problem: "Piel apagada y sin brillo debido a un sistema inmunológico debilitado.",
        composition: "Vitamina D (principal) + Vitamina C + Probióticos.",
        benefit: "Refuerza el sistema inmunológico y devuelve luminosidad a la piel.",
        price: "$39.99",
        image: "src/immune-radiance.png",
        category: "Piel",
        stock: 50
      }
    ];
    
    initialProducts.forEach(prod => productStore.add(prod));
  };
  request.onsuccess = (e) => {
    db = e.target.result;
    // Variables de estado
    let currentUserEmail = localStorage.getItem("loggedUser") || null;  // usuario actualmente autenticado (email) o null si invitado
    let appliedDiscount = 0;  // porcentaje de descuento aplicado (0 = ninguno, 0.10 = 10%, etc.)

    /** Actualiza el indicador del carrito en la cabecera **/
    function updateCartCount() {
      const cartCountSpan = document.getElementById("cart-count");
      if (!cartCountSpan) return;
      // Contar items del carrito para el usuario actual o invitado
      const userKey = currentUserEmail || "guest";
      const tx = db.transaction("cart", "readonly");
      const store = tx.objectStore("cart");
      const request = store.getAll();
      request.onsuccess = () => {
        const items = request.result;
        // Filtrar por usuario correspondiente
        const userItems = items.filter(item => item.userEmail === userKey);
        // Sumar cantidades
        const totalCount = userItems.reduce((sum, it) => sum + it.quantity, 0);
        cartCountSpan.textContent = totalCount;
      };
    }

    /** Mostrar popup de promoción en inicio si no se ha cerrado anteriormente **/
    function showPromoIfNeeded() {
      const promoModal = document.getElementById("promoModal");
      if (promoModal) {
        const promoClosed = localStorage.getItem("promoClosed");
        if (!promoClosed) {
          // Mostrar el popup
          promoModal.style.display = "block";
          const closeBtn = promoModal.querySelector(".close");
          closeBtn.addEventListener("click", () => {
            promoModal.style.display = "none";
            localStorage.setItem("promoClosed", "yes");
          });
        }
      }
    }

    /** Maneja el menú hamburguesa en móviles **/
    function setupHamburgerMenu() {
      const hamburger = document.querySelector(".hamburger");
      const nav = document.querySelector("nav.main-nav");
      if (hamburger && nav) {
        hamburger.addEventListener("click", () => {
          // Alternar clases para mostrar/ocultar menú móvil
          nav.classList.toggle("mobile-menu");
          nav.classList.toggle("active");
        });
        // Cerrar menú móvil al hacer clic en un enlace
        nav.querySelectorAll("ul.menu li a").forEach(link => {
          link.addEventListener("click", () => {
            nav.classList.remove("active");
            nav.classList.remove("mobile-menu");
          });
        });
      }
    }

    /** Cargar lista de productos (inicio y página productos) **/
    function loadProductList() {
      const productListEl = document.getElementById("productList");
      if (!productListEl) return;
      // Obtener todos los productos de IndexedDB
      const tx = db.transaction("products", "readonly");
      const store = tx.objectStore("products");
      const getReq = store.getAll();
      getReq.onsuccess = () => {
        let products = getReq.result;
        // Función para renderizar productos según filtro
        function renderProducts(filterCategory = "", searchTerm = "") {
          productListEl.innerHTML = "";  // limpiar lista
          const filtered = products.filter(product => {
            const matchesCategory = !filterCategory || product.category === filterCategory;
            const matchesSearch = !searchTerm || 
              product.name.toLowerCase().includes(searchTerm) || 
              product.benefit.toLowerCase().includes(searchTerm);
            return matchesCategory && matchesSearch;
          });
          filtered.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("product");
            card.innerHTML = `
              <img src="${product.image}" alt="${product.name}">
              <h3>${product.name}</h3>
              <p>${product.benefit}</p>
              <button class="btn view-product" data-id="${product.id}">Ver Producto</button>
            `;
            productListEl.appendChild(card);
          });
        }
        // Renderizar inicialmente todos
        renderProducts();

        // Configurar filtrado por categoría y búsqueda
        const searchInput = document.getElementById("searchInput");
        const filterSelect = document.getElementById("filterSelect");
        const searchBtn = document.getElementById("searchBtn");
        if (searchBtn && searchInput && filterSelect) {
          searchBtn.addEventListener("click", () => {
            const term = searchInput.value.toLowerCase();
            const category = filterSelect.value;
            renderProducts(category, term);
          });
        }
        // Manejar clic en botón "Ver Producto"
        productListEl.addEventListener("click", (e) => {
          const btn = e.target.closest(".view-product");
          if (btn) {
            const prodId = btn.getAttribute("data-id");
            window.location.href = `product-template.html#${prodId}`;
          }
        });
      };
    }

    document.addEventListener("DOMContentLoaded", function() {
      const productContainer = document.getElementById("productContainer");
      if (!productContainer) return;
    
      // Obtener el ID del producto desde la URL
      const prodId = window.location.hash.substring(1);
      if (!prodId) {
        productContainer.innerHTML = "<p>No se ha especificado ningún producto.</p>";
        return;
      }
    
      // Abrimos la base de datos IndexedDB
      const request = indexedDB.open("fempowerDB", 1);
      request.onsuccess = function(event) {
        const db = event.target.result;
        const tx = db.transaction("products", "readonly");
        const store = tx.objectStore("products");
        const req = store.get(prodId);
    
        req.onsuccess = function() {
          const product = req.result;
          if (!product) {
            productContainer.innerHTML = "<p>Producto no encontrado.</p>";
            return;
          }
    
          // Generar la galería de imágenes (si tiene más de una imagen)
          let galleryHTML = "";
          if (product.gallery && product.gallery.length) {
            galleryHTML = `
              <div class="product-gallery">
                ${product.gallery.map(img => `<img src="${img}" alt="${product.name}" class="gallery-thumb">`).join('')}
              </div>
            `;
          }
    
          // Mostrar los detalles del producto
          productContainer.innerHTML = `
            <div class="product-detail-container">
              <div class="product-image">
                <img src="${product.image}" alt="${product.name}" id="mainProductImage">
                ${galleryHTML}
              </div>
              <div class="product-info">
                <h1>${product.name}</h1>
                <p>${product.description}</p>
                <h3>Problema:</h3>
                <p>${product.problem}</p>
                <h3>Composición:</h3>
                <p>${product.composition}</p>
                <h3>Beneficio:</h3>
                <p>${product.benefit}</p>
                <p class="price">${product.price}</p>
                <div class="quantity-container">
                  <label for="quantity">Cantidad</label>
                  <input type="number" id="quantity" value="1" min="1" />
                </div>
                <div class="buttons-container">
                  <button class="btn add-to-cart" data-id="${product.id}">Agregar al carrito</button>
                  <button class="btn buy-now">Comprar ahora</button>
                </div>
              </div>
            </div>
          `;
    
          // Manejar la funcionalidad de agregar al carrito
          document.querySelector(".add-to-cart").addEventListener("click", () => {
            const quantity = parseInt(document.getElementById("quantity").value) || 1;
            addToCart(product.id, quantity);
          });
    
          // Manejar la compra inmediata
          document.querySelector(".buy-now").addEventListener("click", () => {
            const quantity = parseInt(document.getElementById("quantity").value) || 1;
            addToCart(product.id, quantity);
            window.location.href = "cart.html";
          });
    
          // Permitir cambiar la imagen principal al hacer clic en miniaturas
          document.querySelectorAll(".gallery-thumb").forEach(thumb => {
            thumb.addEventListener("click", () => {
              document.getElementById("mainProductImage").src = thumb.src;
            });
          });
        };
      };
    
      // Función para agregar al carrito en IndexedDB
      function addToCart(productId, quantity) {
        const request = indexedDB.open("fempowerDB", 1);
        request.onsuccess = function(event) {
          const db = event.target.result;
          const tx = db.transaction("cart", "readwrite");
          const store = tx.objectStore("cart");
          
          store.get(productId).onsuccess = function(event) {
            const existingItem = event.target.result;
            if (existingItem) {
              existingItem.quantity += quantity;
              store.put(existingItem);
            } else {
              store.add({ id: productId, quantity: quantity });
            }
            updateCartCount();
            alert("Producto agregado al carrito.");
          };
        };
      }
    
      // Actualizar contador del carrito en el header
      function updateCartCount() {
        const request = indexedDB.open("fempowerDB", 1);
        request.onsuccess = function(event) {
          const db = event.target.result;
          const tx = db.transaction("cart", "readonly");
          const store = tx.objectStore("cart");
          store.getAll().onsuccess = function(event) {
            const cartItems = event.target.result;
            const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            document.getElementById("cart-count").textContent = totalCount;
          };
        };
      }
    });
    
function loadProductDetail() {
  const productContainer = document.getElementById("productContainer");
  if (!productContainer) return;
  const prodId = window.location.hash.substring(1);
  if (!prodId) {
    productContainer.innerHTML = "<p>No se especificó ningún producto.</p>";
    return;
  }

  // Obtener el producto específico de IndexedDB
  const tx = db.transaction("products", "readonly");
  const store = tx.objectStore("products");
  const req = store.get(prodId);
  
  req.onsuccess = () => {
    const product = req.result;
    if (!product) {
      productContainer.innerHTML = "<p>Producto no encontrado.</p>";
      return;
    }

    // Construir HTML del detalle del producto
    let galleryHTML = "";
    // Si el producto tiene una galería de imágenes adicionales
    if (product.gallery && product.gallery.length) {
      galleryHTML = `
        <div class="product-gallery">
          ${product.gallery.map(img => `<img src="${img}" alt="${product.name}" class="gallery-thumb">`).join('')}
        </div>
      `;
    }

    productContainer.innerHTML = `
      <div class="product-detail-container">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" id="mainProductImage">
          ${galleryHTML}
        </div>
        <div class="product-info">
          <h1>${product.name}</h1>
          <p class="product-description">${product.description}</p> <!-- 🔥 Descripción añadida -->
          <h3>Problema:</h3>
          <p>${product.problem}</p>
          <h3>Composición:</h3>
          <p>${product.composition}</p>
          <h3>Beneficio:</h3>
          <p>${product.benefit}</p>
          <p class="price">${product.price}</p>
          <div class="quantity-container">
            <label for="quantity">Cantidad</label>
            <input type="number" id="quantity" value="1" min="1" />
          </div>
          <div class="buttons-container">
            <button class="btn add-to-cart">Agregar al carrito</button>
            <button class="btn buy-now">Comprar ahora</button>
          </div>
        </div>
      </div>
    `;

    // Permitir cambiar la imagen principal al hacer clic en miniaturas
    const thumbs = productContainer.querySelectorAll(".gallery-thumb");
    const mainImg = productContainer.querySelector("#mainProductImage");
    thumbs.forEach(thumb => {
      thumb.addEventListener("click", () => {
        mainImg.src = thumb.src;
      });
    });

    // Manejar clic en "Agregar al carrito" y "Comprar ahora"
    productContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-to-cart") || e.target.classList.contains("buy-now")) {
        const quantityInput = document.getElementById("quantity");
        const qty = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
        addItemToCart(product.id, qty);
        alert("Producto añadido al carrito.");
        updateCartCount();
        if (e.target.classList.contains("buy-now")) {
          window.location.href = "cart.html";
        }
      }
    });
  };
}

    /** Cargar detalle de un producto en la página de producto **/
    function loadProductDetail() {
      const productContainer = document.getElementById("productContainer");
      if (!productContainer) return;
      const prodId = window.location.hash.substring(1);
      if (!prodId) {
        productContainer.innerHTML = "<p>No se especificó ningún producto.</p>";
        return;
      }
      // Obtener el producto específico de la base de datos
      const tx = db.transaction("products", "readonly");
      const store = tx.objectStore("products");
      const req = store.get(prodId);
      req.onsuccess = () => {
        const product = req.result;
        if (!product) {
          productContainer.innerHTML = "<p>Producto no encontrado.</p>";
          return;
        }
        // Construir HTML del detalle del producto
        let galleryHTML = "";
        // Si el producto tiene una galería de imágenes adicionales
        if (product.gallery && product.gallery.length) {
          galleryHTML = `
            <div class="product-gallery">
              ${product.gallery.map(img => `<img src="${img}" alt="${product.name}" class="gallery-thumb">`).join('')}
            </div>
          `;
        }
        productContainer.innerHTML = `
          <div class="product-detail-container">
            <div class="product-image">
              <img src="${product.image}" alt="${product.name}" id="mainProductImage">
              ${galleryHTML}
            </div>
            <div class="product-info">
              <h1>${product.name}</h1>
              <p>${product.description}</p>
              <h3>Problema:</h3>
              <p>${product.problem}</p>
              <h3>Composición:</h3>
              <p>${product.composition}</p>
              <h3>Beneficio:</h3>
              <p>${product.benefit}</p>
              <p class="price">${product.price}</p>
              <div class="quantity-container">
                <label for="quantity">Cantidad</label>
                <input type="number" id="quantity" value="1" min="1" />
              </div>
              <div class="buttons-container">
                <button class="btn add-to-cart">Agregar al carrito</button>
                <button class="btn buy-now">Comprar ahora</button>
              </div>
            </div>
          </div>
        `;
        // Habilitar cambio de imagen principal al clicar miniaturas
        const thumbs = productContainer.querySelectorAll(".gallery-thumb");
        const mainImg = productContainer.querySelector("#mainProductImage");
        thumbs.forEach(thumb => {
          thumb.addEventListener("click", () => {
            mainImg.src = thumb.src;
          });
        });
        // Manejar clic en "Agregar al carrito" y "Comprar ahora"
        productContainer.addEventListener("click", (e) => {
          if (e.target.classList.contains("add-to-cart") || e.target.classList.contains("buy-now")) {
            const quantityInput = document.getElementById("quantity");
            const qty = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
            addItemToCart(product.id, qty);
            alert("Producto añadido al carrito.");
            updateCartCount();
            if (e.target.classList.contains("buy-now")) {
              // Si es "Comprar ahora", vamos al carrito para proceder al pago
              window.location.href = "cart.html";
            }
          }
        });
      };
    }

    /** Agregar un producto (y cantidad) al carrito en IndexedDB **/
    function addItemToCart(productId, quantity) {
      const userKey = currentUserEmail || "guest";
      const tx = db.transaction("cart", "readwrite");
      const store = tx.objectStore("cart");
      // Ver si ya existe ese producto en el carrito del usuario
      const getAllReq = store.getAll();
      getAllReq.onsuccess = () => {
        const items = getAllReq.result;
        let existingItem = items.find(item => item.userEmail === userKey && item.productId === productId);
        if (existingItem) {
          // Si ya está, sumamos la cantidad
          existingItem.quantity += quantity;
          store.put(existingItem);  // actualizar registro
        } else {
          // Si no existe, creamos nuevo item
          const newItem = { productId: productId, quantity: quantity, userEmail: userKey };
          store.add(newItem);
        }
      };
    }

    /** Cargar contenido del carrito en la página cart.html **/
    function loadCartPage() {
      const cartItemsBody = document.getElementById("cartItemsBody");
      if (!cartItemsBody) return;
      const emptyMsg = document.getElementById("emptyCart");
      const cartTotalElem = document.getElementById("cartTotal");
      // Obtener todos los items de carrito del usuario actual (o invitado)
      const userKey = currentUserEmail || "guest";
      const tx = db.transaction(["cart", "products"], "readonly");
      const cartStore = tx.objectStore("cart");
      const cartReq = cartStore.getAll();
      cartReq.onsuccess = () => {
        let cartItems = cartReq.result.filter(item => item.userEmail === userKey);
        if (cartItems.length === 0) {
          // Carrito vacío
          document.getElementById("cartItemsSection").style.display = "none";
          if (emptyMsg) emptyMsg.style.display = "block";
        } else {
          document.getElementById("cartItemsSection").style.display = "block";
          if (emptyMsg) emptyMsg.style.display = "none";
        }
        // Renderizar filas de la tabla del carrito
        let total = 0;
        cartItemsBody.innerHTML = "";
        cartItems.forEach(item => {
          const prod = db.transaction("products", "readonly").objectStore("products").get(item.productId);
          prod.onsuccess = () => {
            const product = prod.result;
            const priceNum = parseFloat(product.price.replace("$", "")) || 0;
            const subtotal = priceNum * item.quantity;
            total += subtotal;
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${product.name}</td>
              <td>${product.price}</td>
              <td><input type="number" min="1" value="${item.quantity}" data-id="${item.cartId}" class="cart-qty"></td>
              <td>$${subtotal.toFixed(2)}</td>
              <td><button class="btn remove-item" data-id="${item.cartId}">Eliminar</button></td>
            `;
            cartItemsBody.appendChild(row);
            updateTotalDisplay();
          };
        });
        // Función para actualizar la visualización del total (con descuento si aplica)
        function updateTotalDisplay() {
          // Recalcular total sumando de la tabla (en caso de cambios en cantidades)
          total = 0;
          cartItemsBody.querySelectorAll("tr").forEach(row => {
            const priceText = row.children[1].innerText; // precio con $
            const qtyVal = parseInt(row.querySelector(".cart-qty").value) || 1;
            const priceVal = parseFloat(priceText.replace("$", "")) || 0;
            total += priceVal * qtyVal;
          });
          // Aplicar descuento si existe
          let displayTotal = total;
          if (appliedDiscount > 0) {
            displayTotal = total * (1 - appliedDiscount);
          }
          cartTotalElem.innerHTML = `<strong>Total: $${displayTotal.toFixed(2)}</strong>`;
        }
        // Event: cambio de cantidad en inputs
        cartItemsBody.addEventListener("input", (e) => {
          if (e.target.classList.contains("cart-qty")) {
            const newQty = parseInt(e.target.value) || 1;
            if (newQty < 1) { e.target.value = 1; return; }
            const itemId = Number(e.target.getAttribute("data-id"));
            // Actualizar cantidad en IndexedDB
            const updateTx = db.transaction("cart", "readwrite");
            const store = updateTx.objectStore("cart");
            const getReq = store.get(itemId);
            getReq.onsuccess = () => {
              const item = getReq.result;
              if (item) {
                item.quantity = newQty;
                store.put(item);
              }
            };
            // Recalcular totales en la interfaz
            updateTotalDisplay();
          }
        });
        // Event: eliminar un item del carrito
        cartItemsBody.addEventListener("click", (e) => {
          if (e.target.classList.contains("remove-item")) {
            const cartId = Number(e.target.getAttribute("data-id"));
            const delTx = db.transaction("cart", "readwrite");
            const store = delTx.objectStore("cart");
            store.delete(cartId);
            // Remover la fila de la tabla directamente
            e.target.closest("tr").remove();
            // Actualizar total
            updateTotalDisplay();
            // Si quedó vacío, mostrar mensaje de carrito vacío
            if (!cartItemsBody.querySelector("tr")) {
              document.getElementById("cartItemsSection").style.display = "none";
              if (emptyMsg) emptyMsg.style.display = "block";
            }
            // Actualizar contador en header
            updateCartCount();
          }
        });
        // Event: aplicar código promocional
        const applyBtn = document.getElementById("applyPromo");
        const promoInput = document.getElementById("promoCode");
        const promoMsg = document.getElementById("promoMessage");
        if (applyBtn && promoInput) {
          applyBtn.addEventListener("click", () => {
            const code = promoInput.value.trim().toUpperCase();
            if (code === "PROMO10") {
              appliedDiscount = 0.10;  // 10% de descuento
              promoMsg.textContent = "¡Descuento del 10% aplicado!";
              promoMsg.style.color = "green";
            } else if (code) {
              appliedDiscount = 0;
              promoMsg.textContent = "Código no válido";
              promoMsg.style.color = "red";
            }
            updateTotalDisplay();
          });
        }
        // Event: enviar formulario de pago
        const paymentForm = document.getElementById("paymentForm");
        if (paymentForm) {
          paymentForm.addEventListener("submit", (e) => {
            e.preventDefault();
            // Validar datos de pago
            const name = document.getElementById("cardName").value.trim();
            const number = document.getElementById("cardNumber").value.replace(/\s+/g, ""); // quitar espacios
            const exp = document.getElementById("cardExp").value.trim();
            const cvv = document.getElementById("cardCVV").value.trim();
            // Validaciones simples
            if (name === "" || number === "" || exp === "" || cvv === "") {
              alert("Por favor, complete todos los campos de pago.");
              return;
            }
            // Validar número de tarjeta (16 dígitos numéricos por simplicidad)
            const numberDigits = number.replace(/\D/g, "");
            if (numberDigits.length < 13 || numberDigits.length > 19 || isNaN(Number(numberDigits))) {
              alert("Número de tarjeta inválido.");
              return;
            }
            // Validar fecha de expiración (formato MM/AA)
            const expRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
            if (!expRegex.test(exp)) {
              alert("Fecha de expiración inválida. Use formato MM/AA.");
              return;
            }
            // Validar CVV (3 o 4 dígitos)
            if (!/^\d{3,4}$/.test(cvv)) {
              alert("CVV inválido.");
              return;
            }
            if (!currentUserEmail) {
              alert("Debes iniciar sesión para completar la compra.");
              return;
            }
            // Si todas las validaciones pasan, procesar la "compra"
            processOrder();
          });
        }
        // Función para registrar la compra en IndexedDB
        function processOrder() {
          // Crear un registro de pedido (orden) con los datos actuales
          const orderTx = db.transaction(["orders", "cart", "products", "users"], "readwrite");
          const orderStore = orderTx.objectStore("orders");
          const cartStoreRW = orderTx.objectStore("cart");
          const productsStoreRW = orderTx.objectStore("products");
          const newOrder = {
            userEmail: currentUserEmail,
            date: new Date().toISOString(),
            items: [],
            total: 0,
            discountCode: appliedDiscount > 0 ? "PROMO10" : null
          };
          // Recalcular total real con descuento
          newOrder.total = appliedDiscount > 0 ? total * (1 - appliedDiscount) : total;
          // Llenar items con detalles (nombre, qty, precio unitario) y actualizar stock
          cartItems.forEach(item => {
            const prodReq = productsStoreRW.get(item.productId);
            prodReq.onsuccess = () => {
              const product = prodReq.result;
              if (product) {
                newOrder.items.push({
                  productId: product.id,
                  name: product.name,
                  quantity: item.quantity,
                  price: product.price
                });
                // Reducir el stock del producto
                product.stock = Math.max(0, product.stock - item.quantity);
                productsStoreRW.put(product);
              }
            };
          });
          // Agregar orden a la base de datos
          orderStore.add(newOrder);
          // Limpiar el carrito del usuario
          cartItems.forEach(item => {
            cartStoreRW.delete(item.cartId);
          });
          // Vaciar interfaz de carrito y actualizar contador
          cartItemsBody.innerHTML = "";
          updateCartCount();
          // Notificar éxito al usuario
          alert("¡Compra realizada con éxito! Puedes ver los detalles en Mi Cuenta.");
          window.location.href = "cuenta.html";
        }
      };
    }

    /** Configuración de la página Mi Cuenta (login/registro/perfil) **/
    function setupAccountPage() {
      const loginForm = document.getElementById("loginForm");
      const registerForm = document.getElementById("registerForm");
      const accountDetails = document.getElementById("accountDetails");
      const loginSection = document.getElementById("loginSection");
      const registerSection = document.getElementById("registerSection");
      const profileEmailSpan = document.getElementById("profileEmail");
      const profileNameSpan = document.getElementById("profileName");

      // Mostrar secciones según si el usuario está logueado o no
      function refreshAccountUI() {
        if (currentUserEmail) {
          // Usuario logueado: mostrar detalles, ocultar formularios
          loginSection.style.display = "none";
          registerSection.style.display = "none";
          accountDetails.style.display = "block";
          // Rellenar información del perfil
          profileEmailSpan.textContent = currentUserEmail;
          // Obtener nombre del usuario desde IndexedDB
          const tx = db.transaction("users", "readonly");
          const store = tx.objectStore("users");
          const req = store.get(currentUserEmail);
          req.onsuccess = () => {
            const user = req.result;
            if (user) {
              profileNameSpan.textContent = user.name || "";
            }
          };
          // Cargar historial de compras
          loadOrderHistory();
        } else {
          // No logueado: mostrar login/registro, ocultar detalles
          accountDetails.style.display = "none";
          loginSection.style.display = "block";
          registerSection.style.display = "none";
        }
      }

      // Cargar historial de compras del usuario actual
      function loadOrderHistory() {
        const historyDiv = document.getElementById("orderHistory");
        if (!historyDiv) return;
        historyDiv.innerHTML = "";
        const tx = db.transaction("orders", "readonly");
        const store = tx.objectStore("orders");
        const index = store.index("byUser");
        const ordersReq = index.getAll(currentUserEmail);
        ordersReq.onsuccess = () => {
          const orders = ordersReq.result;
          if (orders.length === 0) {
            historyDiv.innerHTML = "<p>No has realizado compras aún.</p>";
          } else {
            orders.forEach(order => {
              const date = new Date(order.date).toLocaleString();
              const orderElem = document.createElement("div");
              orderElem.classList.add("order");
              let itemsHTML = "<ul>";
              order.items.forEach(it => {
                itemsHTML += `<li>${it.name} (x${it.quantity})</li>`;
              });
              itemsHTML += "</ul>";
              orderElem.innerHTML = `<p><strong>Fecha:</strong> ${date} – <strong>Total:</strong> $${parseFloat(order.total).toFixed(2)}</p>${itemsHTML}`;
              historyDiv.appendChild(orderElem);
            });
          }
        };
      }

      // Mostrar formulario de registro
      const showRegLink = document.getElementById("showRegister");
      if (showRegLink) {
        showRegLink.addEventListener("click", () => {
          loginSection.style.display = "none";
          registerSection.style.display = "block";
        });
      }
      // Mostrar formulario de login
      const showLoginLink = document.getElementById("showLogin");
      if (showLoginLink) {
        showLoginLink.addEventListener("click", () => {
          registerSection.style.display = "none";
          loginSection.style.display = "block";
        });
      }
      // Evento de login
      if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const email = document.getElementById("loginUser").value.trim();
          const pass = document.getElementById("loginPass").value;
          if (!email || !pass) return;
          const tx = db.transaction("users", "readonly");
          const store = tx.objectStore("users");
          const req = store.get(email);
          req.onsuccess = () => {
            const user = req.result;
            if (user && user.password === pass) {
              // Inicio de sesión exitoso
              currentUserEmail = user.email;
              localStorage.setItem("loggedUser", currentUserEmail);
              // Si había items de invitado en el carrito, asignarlos al usuario
              mergeGuestCartIntoUser();
              refreshAccountUI();
              updateCartCount();
            } else {
              alert("Credenciales incorrectas. Verifica tu email y contraseña.");
            }
          };
        });
      }
      // Evento de registro
      if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const name = document.getElementById("regName").value.trim();
          const email = document.getElementById("regEmail").value.trim();
          const pass = document.getElementById("regPass").value;
          const passConf = document.getElementById("regPassConfirm").value;
          if (!name || !email || !pass) {
            alert("Completa todos los campos de registro.");
            return;
          }
          if (pass !== passConf) {
            alert("Las contraseñas no coinciden.");
            return;
          }
          // Crear nuevo usuario en la base de datos
          const tx = db.transaction("users", "readwrite");
          const store = tx.objectStore("users");
          const newUser = { email: email, name: name, password: pass };
          const addReq = store.add(newUser);
          addReq.onsuccess = () => {
            alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
            // Mostrar formulario de login automáticamente
            registerSection.style.display = "none";
            loginSection.style.display = "block";
            document.getElementById("loginUser").value = email;
          };
          addReq.onerror = () => {
            alert("No se pudo registrar. Es posible que el email ya esté registrado.");
          };
        });
      }
      // Evento de logout
      const logoutBtn = document.getElementById("logoutBtn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          localStorage.removeItem("loggedUser");
          currentUserEmail = null;
          alert("Has cerrado sesión.");
          // Regresar a vista de login
          refreshAccountUI();
          updateCartCount();
        });
      }
      // Eventos para editar nombre de perfil
      const editNameBtn = document.getElementById("editNameBtn");
      const saveNameBtn = document.getElementById("saveNameBtn");
      const cancelEditNameBtn = document.getElementById("cancelEditName");
      const editNameField = document.getElementById("editNameField");
      if (editNameBtn && saveNameBtn) {
        editNameBtn.addEventListener("click", () => {
          editNameField.style.display = "block";
          document.getElementById("newName").value = profileNameSpan.textContent;
          editNameBtn.disabled = true;
        });
        cancelEditNameBtn.addEventListener("click", () => {
          editNameField.style.display = "none";
          editNameBtn.disabled = false;
        });
        saveNameBtn.addEventListener("click", () => {
          const newName = document.getElementById("newName").value.trim();
          if (!newName) {
            alert("El nombre no puede estar vacío.");
            return;
          }
          // Actualizar nombre en IndexedDB
          const tx = db.transaction("users", "readwrite");
          const store = tx.objectStore("users");
          const req = store.get(currentUserEmail);
          req.onsuccess = () => {
            const user = req.result;
            if (user) {
              user.name = newName;
              store.put(user);
              profileNameSpan.textContent = newName;
            }
          };
          editNameField.style.display = "none";
          editNameBtn.disabled = false;
        });
      }
      // Función para traspasar items de carrito de invitado al usuario logueado
      function mergeGuestCartIntoUser() {
        const tx = db.transaction("cart", "readwrite");
        const store = tx.objectStore("cart");
        const req = store.getAll();
        req.onsuccess = () => {
          const items = req.result;
          items.forEach(item => {
            if (item.userEmail === "guest") {
              // Si el usuario ya tenía ese producto en su carrito, sumar cantidades
              const duplicate = items.find(it => it.userEmail === currentUserEmail && it.productId === item.productId);
              if (duplicate) {
                duplicate.quantity += item.quantity;
                store.put(duplicate);
                store.delete(item.cartId); // eliminar el registro de invitado
              } else {
                // Actualizar item invitado al nuevo usuario
                item.userEmail = currentUserEmail;
                store.put(item);
              }
            }
          });
        };
      }

      // Inicializar la vista de la cuenta
      refreshAccountUI();
    }

    /** Manejar formulario de Contacto **/
    function setupContactForm() {
      const contactForm = document.getElementById("contactForm");
      if (!contactForm) return;
      const feedbackMsg = document.getElementById("contactFeedback");
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // Simular envío de mensaje de contacto
        contactForm.style.display = "none";
        if (feedbackMsg) {
          feedbackMsg.style.display = "block";
        }
      });
    }

    // Ejecutar configuraciones según la página actual
    setupHamburgerMenu();
    updateCartCount();
    showPromoIfNeeded();
    loadProductList();
    loadProductDetail();
    loadCartPage();
    setupAccountPage();
    setupContactForm();
  };
  request.onerror = () => {
    console.error("Error al abrir la base de datos.");
  };
});


document.addEventListener("DOMContentLoaded", function() {
  /* === MENÚ HAMBURGUESA === */
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", function() {
      mobileMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
    });

    document.querySelectorAll(".mobile-menu .submenu > a").forEach(submenu => {
      submenu.addEventListener("click", function(e) {
        e.preventDefault();
        this.parentElement.classList.toggle("active");
      });
    });
  }
});


document.addEventListener("DOMContentLoaded", function() {
  const newsletterForm = document.getElementById("newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const email = this.querySelector("input").value.trim();

      if (email) {
        alert("¡Gracias por suscribirte! 🎉");
        this.reset();
      } else {
        alert("Por favor, introduce un correo válido.");
      }
    });
  }
});



document.addEventListener("DOMContentLoaded", function() {
  const promoModal = document.getElementById("promoModal");
  const closeBtn = promoModal.querySelector(".close");
  const closeButton = promoModal.querySelector(".close-btn");

  // Mostrar el popup después de 2 segundos al cargar la página
  setTimeout(() => {
    promoModal.style.display = "flex";
  }, 2000);

  // Función para cerrar el popup
  function closePopup() {
    promoModal.style.display = "none";
  }

  closeBtn.addEventListener("click", closePopup);
  closeButton.addEventListener("click", closePopup);
});


document.addEventListener("DOMContentLoaded", function() {
  const subscribeButton = document.querySelector(".newsletter button");
  const subscriptionModal = document.getElementById("subscriptionModal");
  const closeModal = subscriptionModal.querySelector(".close");

  // Asegurar que el formulario NO se muestre automáticamente al cargar la página
  subscriptionModal.style.display = "none";

  // Mostrar el formulario cuando se haga clic en "Suscribirme"
  subscribeButton.addEventListener("click", function(e) {
    e.preventDefault();
    subscriptionModal.style.display = "flex";
  });

  // Cerrar el formulario cuando se haga clic en la "X"
  closeModal.addEventListener("click", function() {
    subscriptionModal.style.display = "none";
  });

  // Cerrar modal al hacer clic fuera del formulario
  window.addEventListener("click", function(e) {
    if (e.target === subscriptionModal) {
      subscriptionModal.style.display = "none";
    }
  });

  // Manejo del envío del formulario
  const subscriptionForm = document.getElementById("subscriptionForm");

  subscriptionForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Obtener datos del formulario
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const dob = document.getElementById("dob").value;
    const frequency = document.querySelector('input[name="frequency"]:checked').value;
    const termsAccepted = document.getElementById("terms").checked;
    const newsletterAccepted = document.getElementById("newsletter").checked;

    // Obtener intereses seleccionados
    const selectedInterests = [];
    document.querySelectorAll('input[name="interests"]:checked').forEach((checkbox) => {
      selectedInterests.push(checkbox.value);
    });

    if (!termsAccepted) {
      alert("Debes aceptar los términos y condiciones para suscribirte.");
      return;
    }

    // Simular el almacenamiento en LocalStorage
    const subscriberData = {
      name,
      surname,
      dob,
      interests: selectedInterests,
      frequency,
      newsletterAccepted,
    };

    localStorage.setItem("subscriberData", JSON.stringify(subscriberData));

    alert("¡Gracias por suscribirte! 🎉");

    // Cerrar el modal después de suscribirse
    subscriptionModal.style.display = "none";
  });

  /* === POPUP DE PROMOCIÓN === */
  const promoModal = document.getElementById("promoModal");
  const promoCloseBtn = promoModal.querySelector(".close");
  const promoCloseButton = promoModal.querySelector(".close-btn");

  // Mostrar el popup de promoción solo una vez por sesión
  if (!sessionStorage.getItem("promoShown")) {
    setTimeout(() => {
      promoModal.style.display = "flex";
      sessionStorage.setItem("promoShown", "true");
    }, 2000);
  }

  // Cerrar el popup de promoción
  function closePromoPopup() {
    promoModal.style.display = "none";
  }

  promoCloseBtn.addEventListener("click", closePromoPopup);
  promoCloseButton.addEventListener("click", closePromoPopup);
});





document.addEventListener("DOMContentLoaded", function() {
  const reviewForm = document.getElementById("reviewForm");

  reviewForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const product = document.getElementById("product").value;
    const message = document.getElementById("message").value;

    const newReview = document.createElement("div");
    newReview.classList.add("review");
    newReview.innerHTML = `
      <h3>📝 ${name} - ${age} años <span>(${product})</span></h3>
      <p>"${message}"</p>
    `;

    document.querySelector(".testimonials").appendChild(newReview);

    alert("¡Gracias por compartir tu experiencia! 🎉");
    reviewForm.reset();
  });
});


