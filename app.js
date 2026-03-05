/* =========================================
   DATOS DE PRODUCTOS
   ========================================= */
const products = [
    {
        id: 1,
        name: "Camiseta Selección Argentina Titular 2026",
        oldPrice: 128000,
        newPrice: 83000,
        shortDesc: "Camiseta oficial inspirada en el diseño utilizado por la Selección Argentina en la temporada 2026.",
        fullDesc: "Camiseta oficial inspirada en el diseño utilizado por la Selección Argentina en la temporada 2026.\nConfeccionada con materiales de alto rendimiento para brindar comodidad y frescura durante el uso deportivo o casual.\nDiseño icónico con los colores tradicionales y detalles representativos del fútbol argentino.\nIdeal para hinchas y jugadores que buscan calidad y estilo.",
        images: [
            "imagenes/titular/titular1.png",
            "imagenes/titular/titular2.png",
            "imagenes/titular/titular3.png"
        ],
        features: [
            "Tecnología ClimaCool",
            "Cuello redondo",

            "Manga corta",
            "Escudo oficial",
            "100% Poliéster",
            "Importado"
        ],
        rating: 4.5,
        reviews: 125
    },
    {
        id: 2,
        name: "Short Argentina adidas Titular 2026 Niño",
        oldPrice: 64500,
        newPrice: 48000,
        shortDesc: "Adentrate en el legado de los campeones con el Short Argentina adidas Titular 2026 Niño.",
        fullDesc: "Adentrate en el legado de los campeones con el Short Argentina adidas Titular 2026 Niño.\nInspirado en las camisetas utilizadas durante las tres victorias de la nación en la Copa del Mundo.\nCuenta con cintura elástica con cordón de ajuste para mayor seguridad y comodidad.\nTecnología Climacool para evacuar el sudor y mantener frescura durante el juego.\nDiseñado para niños activos que buscan comodidad y rendimiento.",
        images: [
            "imagenes/titular/short1.jpg",
            "imagenes/titular/short2.jpg",
            "imagenes/titular/short3.jpg",
            "imagenes/titular/short4.jpg"
        ],
        features: [
            "Cintura elástica",
            "Cordón de ajuste",
            "Tecnología Climacool",
            "Diseño infantil",
            "100% Poliéster",
            "Importado"
        ],
        rating: 5.0,
        reviews: 89
    },
    {
        id: 3,
        name: "Botines Argentina Pro 2026",
        oldPrice: 180000,
        newPrice: 144000,
        shortDesc: "Botines profesionales de alto rendimiento para el fútbol argentino.",
        fullDesc: "Botines profesionales de alto rendimiento diseñados para los mejores jugadores del fútbol argentino.\nCon tecnología de suela ligera y agarre óptimo en diferentes superficies.\nMateriales de alta calidad que garantizan durabilidad y confort.\nIdeal para partidos y entrenamientos de alto nivel.",
        images: [
            "imagenes/titular/titular10.png",
            "imagenes/titular/titular12.png",
            "imagenes/titular/titular13.png"
        ],
        features: [
            "Suela ligera",
            "Agarre óptimo",
            "Materiales de alta calidad",
            "Diseño ergonómico",
            "Importado"
        ],
        rating: 4.8,
        reviews: 203
    },
    {
        id: 4,
        name: "Remera Argentina Training 2026",
        oldPrice: 55000,
        newPrice: 38500,
        shortDesc: "Remera de entrenamiento oficial de la Selección Argentina.",
        fullDesc: "Remera de entrenamiento oficial de la Selección Argentina.\nConfeccionada con materiales transpirables para máximo confort durante el entrenamiento.\nDiseño moderno con los colores tradicionales de la selección.\nIdeal para uso deportivo o casual.",
        images: [
            "imagenes/titular/titular20.png",
            "imagenes/titular/titular21.png",
            "imagenes/titular/titular22.png"
        ],
        features: [
            "Material transpirable",
            "Tecnología climacool",
            "Diseño moderno",
            "Colores tradicionales",
            "Uso deportivo o casual",
            "Importado"
        ],
        rating: 4.0,
        reviews: 67
    }
];

/* =========================================
   ESTADO DE LA APLICACIÓN
   ========================================= */
let cart = [];
let wishlist = [];
let currentProductModal = null;
let currentShippingCost = 0;

/* =========================================
   PANTALLA DE CARGA
   ========================================= */
window.addEventListener('load', () => {
    setTimeout(() => {

        document.body.classList.add('loaded');

        // 🔥 FORZAR DESBLOQUEO DEL SCROLL (SOLUCIÓN SEGURA)
        document.body.style.overflowY = "auto";
        document.body.style.overflowX = "hidden";

        // 🔥 Ocultar loader completamente
        const loader = document.getElementById("loading-screen");
        if (loader) {
            loader.style.display = "none";
        }

        showToast('¡Bienvenido a Modo Var!', 'success');

    }, 2000);
});

/* =========================================
   NAVEGACIÓN ENTRE SECCIONES
   ========================================= */
function showSection(sectionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active-section');
        section.classList.add('hidden-section');
    });

    // Mostrar la sección seleccionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden-section');
        targetSection.classList.add('active-section');
    }

    // Actualizar enlaces activos
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick').includes(sectionId)) {
            link.classList.add('active');
        }
    });

// Cerrar carrito si se navega
const cartOverlay = document.getElementById('cart-overlay');
if (cartOverlay && cartOverlay.classList.contains('active')) {
    toggleCart();
}

// Cerrar checkout si se navega

const checkoutForm = document.getElementById('checkout-form');
if(checkoutForm && checkoutForm.classList.contains('active')){
    hideCheckout();
}
    // Scroll al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* =========================================
   MENÚ MÓVIL
   ========================================= */
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

/* =========================================
   MODAL DE PRODUCTO
   ========================================= */
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    currentProductModal = product;

    // Llenar datos básicos
    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-old-price').textContent = formatPrice(product.oldPrice);
    document.getElementById('modal-new-price').textContent = formatPrice(product.newPrice);
    document.getElementById('modal-desc-short').textContent = product.shortDesc;
    document.getElementById('modal-desc-full').textContent = product.fullDesc;
    
    // Llenar características
    const featuresList = document.getElementById('modal-features');
    featuresList.innerHTML = '';
    product.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });

    // Llenar imágenes
    const mainImg = document.getElementById('modal-img-main');
    mainImg.src = product.images[0];
    
    const thumbnailsContainer = document.querySelector('.thumbnails');
    thumbnailsContainer.innerHTML = '';
    
    product.images.forEach((imgSrc, index) => {
        const thumb = document.createElement('img');
        thumb.src = imgSrc;
        thumb.style.width = '60px';
        thumb.style.height = '60px';
        thumb.style.objectFit = 'cover';
        thumb.style.cursor = 'pointer';
        thumb.style.border = index === 0 ? '2px solid var(--arg-blue)' : '1px solid #ccc';
        thumb.style.borderRadius = '4px';
        thumb.onclick = () => {
            mainImg.src = imgSrc;
            document.querySelectorAll('.thumbnails img').forEach(t => t.style.border = '1px solid #ccc');
            thumb.style.border = '2px solid var(--arg-blue)';
        };
        thumbnailsContainer.appendChild(thumb);
    });

    // Mostrar modal
    document.getElementById('product-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    document.getElementById('product-modal').style.display = 'none';
    currentProductModal = null;
    document.body.style.overflow = 'auto';
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modal = document.getElementById('product-modal');
    if (event.target == modal) {
        closeProductModal();
    }
}

/* =========================================
   CARRITO DE COMPRAS
   ========================================= */

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    showToast('Producto agregado al carrito', 'success');
}

function addToCartFromModal() {
    if (currentProductModal) {
        addToCart(currentProductModal.id);
        closeProductModal();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    showToast('Producto eliminado del carrito', 'info');
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSubtotalPrice = document.getElementById('cart-subtotal-price');
    const cartShippingPrice = document.getElementById('cart-shipping-price');
    const cartTotalPrice = document.getElementById('cart-total-price');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.newPrice * item.quantity;
    });

    if (subtotal >= 120000) {
        currentShippingCost = 0;
        cartShippingPrice.textContent = 'GRATIS';
    } else {
        currentShippingCost = 5000;
        cartShippingPrice.textContent = '$5.000';
    }

    const total = subtotal + currentShippingCost;

    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-msg" style="text-align:center;padding:30px;">
                <i class="fas fa-shopping-basket" style="font-size:2rem;"></i>
                <p>Tu carrito está vacío.</p>
            </div>
        `;
    } else {
        cart.forEach(item => {
            const itemTotal = item.newPrice * item.quantity;

            const itemDiv = document.createElement('div');
            itemDiv.style.padding = '15px';
            itemDiv.style.borderBottom = '1px solid #eee';

            itemDiv.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="display:flex; gap:15px; align-items:center;">
                        <img src="${item.images[0]}" 
                        alt="${item.name}" 
                        style="width:60px;height:60px;object-fit:cover;border-radius:4px;">
                        <div>
                            <strong>${item.name}</strong><br>
                            <small>Cant: ${item.quantity}</small><br>
                            <small>${formatPrice(item.newPrice)} c/u</small>
                        </div>
                    </div>
                    <div style="text-align:right;">
                        <div style="font-weight:bold;">
                            ${formatPrice(itemTotal)}
                        </div>
                        <button 
                        onclick="removeFromCart(${item.id})"
                        style="color:red;border:none;background:none;cursor:pointer;font-size:0.8rem;">
                            <i class="fas fa-trash"></i> Eliminar
                        </button>
                    </div>
                </div>
            `;

            cartItemsContainer.appendChild(itemDiv);
        });
    }

    cartSubtotalPrice.textContent = formatPrice(subtotal);
    cartTotalPrice.textContent = formatPrice(total);
}

function toggleCart() {
    const cartOverlay = document.getElementById('cart-overlay');
    if (!cartOverlay) return;

    cartOverlay.classList.toggle('active');

    const checkoutForm = document.getElementById('checkout-form');

    // Si el checkout está abierto, cerrarlo
    if (checkoutForm && checkoutForm.classList.contains('active')) {
        hideCheckout();
    }
}

/* =========================================
   CHECKOUT
   ========================================= */

function showCheckout() {
    if (!cart || cart.length === 0) {
        showToast('Tu carrito está vacío', 'error');
        return;
    }

    const checkoutForm = document.getElementById('checkout-form');
    const cartItems = document.getElementById('cart-items-container');
    const cartFooter = document.getElementById('cart-footer');

    if (!checkoutForm) {
        console.error("checkout-form no existe en el HTML");
        return;
    }

    // Ocultar carrito
    if (cartItems) cartItems.style.display = 'none';
    if (cartFooter) cartFooter.style.display = 'none';

    // Mostrar checkout
    checkoutForm.classList.add('active');
    checkoutForm.style.display = 'flex';

    updateCheckoutSummary();
}

function hideCheckout() {
    const checkoutForm = document.getElementById('checkout-form');
    const cartItems = document.getElementById('cart-items-container');
    const cartFooter = document.getElementById('cart-footer');

    if (!checkoutForm) return;

    // Ocultar checkout
    checkoutForm.classList.remove('active');
    checkoutForm.style.display = 'none';

    // Volver a mostrar carrito
    if (cartItems) cartItems.style.display = 'block';
    if (cartFooter) cartFooter.style.display = 'block';
}

function updateCheckoutSummary() {
    const summaryItems = document.getElementById('checkout-summary-items');
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const checkoutShipping = document.getElementById('checkout-shipping');
    const checkoutTotal = document.getElementById('checkout-total');

    if (!summaryItems || !checkoutSubtotal || !checkoutShipping || !checkoutTotal) {
        console.error("Faltan elementos del checkout en el HTML");
        return;
    }

    let summary = '';
    let subtotal = 0;

    if (!cart || cart.length === 0) {
        summaryItems.innerHTML = `
            <div style="text-align:center;padding:10px;">
                Tu carrito está vacío
            </div>
        `;
        checkoutSubtotal.textContent = '$0';
        checkoutShipping.textContent = '$0';
        checkoutTotal.textContent = '$0';
        return;
    }

    cart.forEach(item => {
        const itemTotal = item.newPrice * item.quantity;
        subtotal += itemTotal;

        summary += `
            <div style="display:flex;justify-content:space-between;margin-bottom:10px;">
                <span>${item.name} (x${item.quantity})</span>
                <span>${formatPrice(itemTotal)}</span>
            </div>
        `;
    });

    summaryItems.innerHTML = summary;
    checkoutSubtotal.textContent = formatPrice(subtotal);

    if (subtotal >= 120000) {
        currentShippingCost = 0;
        checkoutShipping.textContent = 'GRATIS';
    } else {
        currentShippingCost = 5000;
        checkoutShipping.textContent = '$5.000';
    }

    const total = subtotal + currentShippingCost;
    checkoutTotal.textContent = formatPrice(total);
}

/* =========================================
   WISHLIST
   ========================================= */
function wishlistToggle(productId) {
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast('Producto eliminado de favoritos', 'info');
    } else {
        wishlist.push(productId);
        showToast('Producto agregado a favoritos', 'success');
    }
}

function wishlistToggleFromModal() {
    if (currentProductModal) {
        wishlistToggle(currentProductModal.id);
    }
}

/* =========================================
   FORMULARIOS
   ========================================= */

// Newsletter
document.getElementById('newsletter-form-el').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    showToast('¡Gracias por suscribirte! Recibirás novedades pronto.', 'success');
    this.reset();
});

// Checkout (CORREGIDO)
document.getElementById('checkout-form-el').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validar términos
    const termsCheckbox = this.querySelector('.checkout-terms input[type="checkbox"]');
    if (!termsCheckbox.checked) {
        showToast('Debes aceptar los términos y condiciones', 'error');
        return;
    }
    
    // Validar campos requeridos
    const name = document.getElementById('checkout-name').value;
    const dni = document.getElementById('checkout-dni').value;
    const phone = document.getElementById('checkout-phone').value;
    const address = document.getElementById('checkout-address').value;
    const neighborhood = document.getElementById('checkout-neighborhood').value;
    
    if(!name || !dni || !phone || !address || !neighborhood){
        showToast("Completa todos los datos requeridos", "error");
        return;
    }
    
    // Llamar a la función de WhatsApp
    checkoutToWhatsApp();
});

// Contacto
document.getElementById('contact-form-el').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validar campos
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;
    
    if (!name || !email || !message) {
        showToast('Por favor completa todos los campos requeridos', 'error');
        return;
    }
    
    // Simular envío
    const btn = this.querySelector('.btn-submit-contact');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    btn.disabled = true;
    
    setTimeout(() => {
        showToast('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.', 'success');
        
        // Resetear formulario
        this.reset();
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
        btn.disabled = false;
    }, 1500);
});

/* =========================================
   FUNCIONES DE UTILIDAD
   ========================================= */
function formatPrice(price) {
    return new Intl.NumberFormat('es-AR', { 
        style: 'currency', 
        currency: 'ARS',
        minimumFractionDigits: 0
    }).format(price);
}

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Animación de entrada
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

/* =========================================
   BARRA DE BÚSQUEDA
   ========================================= */
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm.length > 2) {
            const productsGrid = document.querySelector('.products-grid');
            const productCards = productsGrid.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                const productName = card.querySelector('.product-name').textContent.toLowerCase();
                if (productName.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        } else {
            const productCards = document.querySelectorAll('.product-card');
            productCards.forEach(card => {
                card.style.display = 'block';
            });
        }
    });
}

/* =========================================
   SELECCIÓN DE TALLA EN MODAL
   ========================================= */
const sizeButtons = document.querySelectorAll('.size-btn');
sizeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        sizeButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

/* =========================================
   SCROLL SUAVE PARA ANCLAJES
   ========================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Evitar el caso href="#" que rompe querySelector
        if (!href || href === '#') return;

        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* =========================================
   EFECTO PARALLAX EN HERO
   ========================================= */
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / 700);
        }
    });
}

/* =========================================
   BARRA DE PROGRESO DE CARGA
   ========================================= */
const loadingProgress = document.querySelector('.loading-progress');
if (loadingProgress) {
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        loadingProgress.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 100);
}

/* =========================================
   NOTIFICACIÓN DE CARRITO ACTUALIZADO
   ========================================= */
const originalUpdateCartUI = updateCartUI;
updateCartUI = function() {
    originalUpdateCartUI();
    
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.classList.add('pulse');
        setTimeout(() => {
            cartCount.classList.remove('pulse');
        }, 500);
    }
};

/* =========================================
   VALIDACIÓN DE FORMULARIOS
   ========================================= */
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'red';
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            showToast('Por favor completa todos los campos requeridos', 'error');
        }
    });
    
    // Limpiar estilos al editar
    form.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('input', function() {
            this.style.borderColor = '#ddd';
        });
    });
});

/* =========================================
   ANIMACIONES DE ENTRADA
   ========================================= */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .category-item, .review-card, .shipping-card, .payment-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

/* =========================================
   CARRITO LOCAL STORAGE
   ========================================= */

// Guardar carrito en localStorage
function saveCart() {
    if (!cart) return;
    localStorage.setItem('modovar_cart', JSON.stringify(cart));
}

// Cargar carrito desde localStorage
function loadCart() {
    const savedCart = localStorage.getItem('modovar_cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (error) {
            console.error("Error cargando carrito:", error);
            cart = [];
        }
    }
    if (!Array.isArray(cart)) {
        cart = [];
    }
    updateCartUI();
}

// Esperar a que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
    loadCart();
});

// Guardar carrito cada vez que se agrega producto
const originalAddToCart = addToCart;
addToCart = function(productId) {
    originalAddToCart(productId);
    saveCart();
};

// Guardar carrito cuando se elimina producto
const originalRemoveFromCart = removeFromCart;
removeFromCart = function(productId) {
    originalRemoveFromCart(productId);
    saveCart();
};

/* =========================================
   INICIALIZACIÓN
   ========================================= */

console.log('Modo Var - Tienda Online Iniciada');
console.log(`Productos cargados: ${products.length}`);
console.log(`Carrito inicial: ${cart.length} items`);

/* =========================================
   MANEJO DE ERRORES
   ========================================= */
window.addEventListener('error', (e) => {
    console.error('Error en Modo Var:', e.message);
});

/* =========================================
   FUNCIONES EXTRA
   ========================================= */

function getCartTotal() {
    let total = 0;
    cart.forEach(item => {
        total += item.newPrice * item.quantity;
    });
    return total;
}

function getCartItemCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function clearCart() {
    cart = [];
    updateCartUI();
}

// abrir checkout desde botón externo
function checkout() {
    if (!cart || cart.length === 0) {
        showToast('Tu carrito está vacío', 'error');
        return;
    }
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartOverlay && !cartOverlay.classList.contains('active')) {
        cartOverlay.classList.add('active');
    }
    showCheckout();
}

// Exportar funciones para uso global
window.ModoVar = {
    products,
    wishlist,
    addToCart,
    removeFromCart,
    updateCartUI,
    toggleCart,
    showCheckout,
    hideCheckout,
    openProductModal,
    closeProductModal,
    showSection,
    formatPrice,
    showToast,
    getCartTotal,
    getCartItemCount,
    clearCart,
    checkout
};

document.addEventListener("DOMContentLoaded", () => {
    document.body.style.overflowY = "auto";
    document.body.style.overflowX = "hidden";
    if (typeof loadCart === "function") {
        loadCart();
    }
});

/* =========================================================
   INICIALIZACIÓN
========================================================= */

function generateOrderNumber(){
    return "MV-" + Date.now().toString().slice(-8);
}

function checkoutToWhatsApp(){
    // Validar carrito
    if(!window.ModoVar.cart || window.ModoVar.cart.length === 0){
        showToast("El carrito está vacío","error");
        return;
    }

    // Validar campos requeridos
    const name = document.getElementById("checkout-name").value;
    const dni = document.getElementById("checkout-dni").value;
    const phone = document.getElementById("checkout-phone").value;
    const address = document.getElementById("checkout-address").value;
    const neighborhood = document.getElementById("checkout-neighborhood").value;

    if(!name || !dni || !phone || !address || !neighborhood){
        showToast("Completa todos los datos requeridos","error");
        return;
    }

    const orderNumber = generateOrderNumber();

    let message = `
✅ *Pedido Confirmado*
🛒 Nº Orden: ${orderNumber}

👤 Cliente: ${name}
📌 DNI: ${dni}
📞 Teléfono: ${phone}

🏠 Dirección: ${address}
🏘 Barrio: ${neighborhood}

📦 Productos:
`;

    let total = 0;

    window.ModoVar.cart.forEach(item=>{
        let itemTotal = item.newPrice * item.quantity;
        total += itemTotal;

        message += `
- ${item.name} x${item.quantity}
  ${formatPrice(itemTotal)}
`;
    });

    message += `
💰 Total: ${formatPrice(total)}

📲 Escríbenos para coordinar el pago y envío.
`;

    const whatsappNumber = "5491154733455";

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

    // Guardar orden
    const orders = JSON.parse(localStorage.getItem("modovar_orders")) || [];

    orders.push({
        orderNumber,
        customer:{
            name,
            dni,
            phone,
            address,
            neighborhood
        },
        items: window.ModoVar.cart,
        total,
        date: new Date().toLocaleString(),
        status: "Pendiente"
    });

    localStorage.setItem("modovar_orders", JSON.stringify(orders));

    // Limpiar carrito
    window.ModoVar.cart = [];
    updateCartUI();
    saveCart();

    showToast("Pedido generado correctamente", "success");

    setTimeout(()=>{
        window.location.href = url;
    }, 1500);
}

// Asegurar que checkoutToWhatsApp esté disponible globalmente
window.checkoutToWhatsApp = checkoutToWhatsApp;

/* =========================================================
   FIN DEL ARCHIVO
========================================================= */