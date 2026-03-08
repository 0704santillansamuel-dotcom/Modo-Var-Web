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
    // Validar carrito (CORREGIDO: Usamos 'cart' global)
    if(!cart || cart.length === 0){
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

    // CORREGIDO: Usamos 'cart' global en lugar de window.ModoVar.cart
    cart.forEach(item=>{
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
        items: cart, // CORREGIDO: Usamos 'cart' global
        total,
        date: new Date().toLocaleString(),
        status: "Pendiente"
    });

    localStorage.setItem("modovar_orders", JSON.stringify(orders));

    // Limpiar carrito (CORREGIDO: Usamos 'cart' global)
    cart = [];
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

/* =========================================
   SISTEMA DE AUTENTICACIÓN Y GESTIÓN DE DATOS
   ========================================= */

// Claves de LocalStorage
const DB_KEYS = {
    USERS: 'modovar_users',
    ORDERS: 'modovar_orders',
    PRODUCTS: 'modovar_products',
    CURRENT_USER: 'modovar_current_user'
};

// Objeto principal de la aplicación
const app = {
    currentUser: null,
    products: [],
    orders: [],
    users: [],
    currentOrderNumber: null, // Para editar estado de pedido

    // Inicialización
    init: function() {
        this.initDB();
        this.loadSession();
        this.updateAuthUI();
        this.loadProducts();
        this.loadOrders();
        this.loadUsers();
    },

    // Inicializar Base de Datos si no existe
    initDB: function() {
        // Usuarios
        if (!localStorage.getItem(DB_KEYS.USERS)) {
            const initialUsers = [
                { id: 1, username: 'admin', password: '1234', role: 'admin', createdAt: new Date().toISOString() },
                { id: 2, username: 'user', password: '1234', role: 'user', createdAt: new Date().toISOString() }
            ];
            localStorage.setItem(DB_KEYS.USERS, JSON.stringify(initialUsers));
        }
        // Productos
        if (!localStorage.getItem(DB_KEYS.PRODUCTS)) {
            const initialProducts = [
                {
                    id: 1,
                    name: "Camiseta Selección Argentina Titular 2026",
                    oldPrice: 128000,
                    newPrice: 83000,
                    shortDesc: "Camiseta oficial inspirada en el diseño utilizado por la Selección Argentina en la temporada 2026.",
                    fullDesc: "Camiseta oficial inspirada en el diseño utilizado por la Selección Argentina en la temporada 2026. Confeccionada con materiales de alto rendimiento.",
                    images: ["imagenes/titular/titular1.png", "imagenes/titular/titular2.png"],
                    category: "Camisetas",
                    subcategory: "Adulto",
                    sizes: ["S", "M", "L", "XL"],
                    shipping: true,
                    rating: 4.5
                },
                {
                    id: 2,
                    name: "Short Argentina adidas Titular 2026 Niño",
                    oldPrice: 64500,
                    newPrice: 48000,
                    shortDesc: "Adentrate en el legado de los campeones con el Short Argentina adidas Titular 2026 Niño.",
                    fullDesc: "Adentrate en el legado de los campeones con el Short Argentina adidas Titular 2026 Niño. Tecnología Climacool.",
                    images: ["imagenes/titular/short1.jpg"],
                    category: "Shorts",
                    subcategory: "Niño",
                    sizes: ["S", "M", "L"],
                    shipping: true,
                    rating: 5.0
                }
            ];
            localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(initialProducts));
        }
    },

    // Cargar datos desde LocalStorage
    loadProducts: function() {
        this.products = JSON.parse(localStorage.getItem(DB_KEYS.PRODUCTS)) || [];
    },
    loadOrders: function() {
        this.orders = JSON.parse(localStorage.getItem(DB_KEYS.ORDERS)) || [];
    },
    loadUsers: function() {
        this.users = JSON.parse(localStorage.getItem(DB_KEYS.USERS)) || [];
    },

    // =========================================
    // AUTENTICACIÓN
    // =========================================
    loadSession: function() {
        const savedUser = localStorage.getItem(DB_KEYS.CURRENT_USER);
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateAuthUI();
        }
    },

    saveSession: function() {
        if (this.currentUser) {
            localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(this.currentUser));
        } else {
            localStorage.removeItem(DB_KEYS.CURRENT_USER);
        }
    },

    updateAuthUI: function() {
        // Actualizar botones de navegación si existen
        const loginBtn = document.getElementById('login-btn');
        const adminBtn = document.getElementById('admin-btn');
        const logoutBtn = document.getElementById('logout-btn');
        
        if (loginBtn) loginBtn.style.display = this.currentUser ? 'none' : 'inline-block';
        if (adminBtn) adminBtn.style.display = this.currentUser && this.currentUser.role === 'admin' ? 'inline-block' : 'none';
        if (logoutBtn) logoutBtn.style.display = this.currentUser ? 'inline-block' : 'none';
    },

    handleLogin: function(e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;
        const errorDiv = document.getElementById('login-error');

        const user = this.users.find(u => u.username === username && u.password === password);

        if (user) {
            this.currentUser = user;
            this.saveSession();
            this.updateAuthUI();
            errorDiv.style.display = 'none';
            showToast(`¡Bienvenido ${user.username}!`, 'success');
            this.closeAuthModal();
            
            // Redirección automática según rol
            if (user.role === 'admin') {
                this.openAdminPanel();
            } else {
                this.router('home');
            }
        } else {
            errorDiv.style.display = 'block';
            errorDiv.textContent = 'Usuario o contraseña incorrectos';
            showToast('Error de autenticación', 'error');
        }
    },

    handleRegister: function(e) {
        e.preventDefault();
        const username = document.getElementById('register-username').value.trim();
        const password = document.getElementById('register-password').value;
        const confirm = document.getElementById('register-confirm').value;
        const errorDiv = document.getElementById('register-error');

        if (password !== confirm) {
            errorDiv.style.display = 'block';
            errorDiv.textContent = 'Las contraseñas no coinciden';
            showToast('Error de registro', 'error');
            return;
        }

        if (this.users.find(u => u.username === username)) {
            errorDiv.style.display = 'block';
            errorDiv.textContent = 'El usuario ya existe';
            showToast('Error de registro', 'error');
            return;
        }

        const newUser = {
            id: Date.now(),
            username: username,
            password: password,
            role: 'user',
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        localStorage.setItem(DB_KEYS.USERS, JSON.stringify(this.users));

        showToast('Usuario registrado con éxito', 'success');
        document.getElementById('register-form').reset();
        errorDiv.style.display = 'none';
        this.switchAuthTab('login');
    },

    logout: function() {
        this.currentUser = null;
        this.saveSession();
        this.updateAuthUI();
        showToast('Sesión cerrada', 'info');
        this.router('home');
    },

    // =========================================
    // MODALES Y NAVEGACIÓN
    // =========================================
    closeAuthModal: function() {
        document.getElementById('auth-modal').style.display = 'none';
    },

    openAuthModal: function() {
        if (this.currentUser) {
            if (this.currentUser.role === 'admin') {
                this.openAdminPanel();
            } else {
                this.openUserOrdersModal();
            }
        } else {
            document.getElementById('auth-modal').style.display = 'flex';
        }
    },

    switchAuthTab: function(tab) {
        document.querySelectorAll('.auth-tab').forEach(tabBtn => {
            tabBtn.classList.remove('active');
        });
        document.querySelectorAll('.auth-form').forEach(form => {
            form.style.display = 'none';
        });

        if (tab === 'login') {
            document.querySelector('.auth-tab:first-child').classList.add('active');
            document.getElementById('login-form').style.display = 'flex';
        } else {
            document.querySelector('.auth-tab:last-child').classList.add('active');
            document.getElementById('register-form').style.display = 'flex';
        }
    },

    openAdminPanel: function() {
        document.getElementById('admin-panel').style.display = 'flex';
        this.loadAdminProducts();
        this.loadAdminOrders();
        this.loadAdminUsers();
    },

    closeAdminPanel: function() {
        document.getElementById('admin-panel').style.display = 'none';
    },

    openUserOrdersModal: function() {
        document.getElementById('user-orders-modal').style.display = 'flex';
        this.loadUserOrders();
    },

    closeUserOrdersModal: function() {
        document.getElementById('user-orders-modal').style.display = 'none';
    },

    // =========================================
    // GESTIÓN DE PRODUCTOS (ADMIN)
    // =========================================
    loadAdminProducts: function() {
        const productsList = document.getElementById('admin-products-list');
        productsList.innerHTML = '';

        if (this.products.length === 0) {
            productsList.innerHTML = '<p style="text-align:center;padding:20px;">No hay productos registrados</p>';
            return;
        }

        this.products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'admin-item';
            productItem.innerHTML = `
                <div class="admin-item-info">
                    <h4>${product.name}</h4>
                    <p>Categoría: ${product.category} - ${product.subcategory}</p>
                    <p>Precio: ${formatPrice(product.newPrice)}</p>
                    <p>Tallas: ${product.sizes.join(', ')}</p>
                </div>
                <div class="admin-item-actions">
                    <button class="btn-edit" onclick="app.editProduct(${product.id})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn-delete" onclick="app.deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            `;
            productsList.appendChild(productItem);
        });
    },

    resetProductForm: function() {
        document.getElementById('admin-add-product').reset();
        document.getElementById('admin-prod-id').value = '';
        document.getElementById('admin-product-sizes').value = 'S, M, L, XL';
        document.getElementById('admin-product-shipping').checked = false;
    },

    saveProduct: function(e) {
        e.preventDefault();
        const id = document.getElementById('admin-prod-id').value;
        const name = document.getElementById('admin-product-name').value.trim();
        const category = document.getElementById('admin-product-category').value;
        const subcategory = document.getElementById('admin-product-subcategory').value;
        const price = parseFloat(document.getElementById('admin-product-price').value);
        const promoPrice = parseFloat(document.getElementById('admin-product-promo').value) || 0;
        const shortDesc = document.getElementById('admin-product-short-desc').value.trim();
        const longDesc = document.getElementById('admin-product-long-desc').value.trim();
        const sizes = document.getElementById('admin-product-sizes').value.split(',').map(s => s.trim());
        const images = document.getElementById('admin-product-images').value.split(',').map(s => s.trim());
        const shipping = document.getElementById('admin-product-shipping').checked;

        if (!name || !category || !subcategory || !price) {
            showToast('Nombre, categoría, subcategoría y precio son obligatorios', 'error');
            return;
        }

        const productData = {
            id: id ? parseInt(id) : Date.now(),
            name: name,
            category: category,
            subcategory: subcategory,
            oldPrice: promoPrice > 0 ? price : price * 1.5,
            newPrice: promoPrice > 0 ? promoPrice : price,
            shortDesc: shortDesc,
            fullDesc: longDesc,
            sizes: sizes,
            images: images.length > 0 ? images : ['imagenes/default.png'],
            shipping: shipping,
            rating: 0,
            reviews: 0
        };

        if (id) {
            // Editar
            const index = this.products.findIndex(p => p.id == id);
            if (index !== -1) {
                this.products[index] = productData;
                showToast('Producto actualizado', 'success');
            }
        } else {
            // Nuevo
            this.products.push(productData);
            showToast('Producto agregado', 'success');
        }

        localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(this.products));
        this.resetProductForm();
        this.loadAdminProducts();
    },

    editProduct: function(id) {
        const product = this.products.find(p => p.id === id);
        if (product) {
            document.getElementById('admin-prod-id').value = product.id;
            document.getElementById('admin-product-name').value = product.name;
            document.getElementById('admin-product-category').value = product.category;
            document.getElementById('admin-product-subcategory').value = product.subcategory;
            document.getElementById('admin-product-price').value = product.oldPrice;
            document.getElementById('admin-product-promo').value = product.newPrice;
            document.getElementById('admin-product-short-desc').value = product.shortDesc;
            document.getElementById('admin-product-long-desc').value = product.fullDesc;
            document.getElementById('admin-product-sizes').value = product.sizes.join(', ');
            document.getElementById('admin-product-images').value = product.images.join(', ');
            document.getElementById('admin-product-shipping').checked = product.shipping;
            showToast('Producto cargado para edición', 'info');
        }
    },

    deleteProduct: function(id) {
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            this.products = this.products.filter(p => p.id !== id);
            localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(this.products));
            this.loadAdminProducts();
            showToast('Producto eliminado', 'success');
        }
    },

    // =========================================
    // GESTIÓN DE PEDIDOS (ADMIN)
    // =========================================
    loadAdminOrders: function() {
        const ordersList = document.getElementById('admin-orders-list');
        ordersList.innerHTML = '';

        if (this.orders.length === 0) {
            ordersList.innerHTML = '<p style="text-align:center;padding:20px;">No hay pedidos registrados</p>';
            return;
        }

        this.orders.forEach(order => {
            const orderItem = document.createElement('div');
            orderItem.className = 'admin-item';
            orderItem.innerHTML = `
                <div class="admin-item-info">
                    <h4>Orden: ${order.orderNumber}</h4>
                    <p>Cliente: ${order.customer.name}</p>
                    <p>Fecha: ${new Date(order.date).toLocaleDateString()}</p>
                    <p>Total: ${formatPrice(order.total)}</p>
                    <p>Estado: <strong>${order.status}</strong></p>
                </div>
                <div class="admin-item-actions">
                    <button class="btn-edit" onclick="app.viewOrderDetails('${order.orderNumber}')">
                        <i class="fas fa-eye"></i> Ver Detalles
                    </button>
                </div>
            `;
            ordersList.appendChild(orderItem);
        });
    },

    viewOrderDetails: function(orderNumber) {
        const order = this.orders.find(o => o.orderNumber === orderNumber);
        if (order) {
            this.currentOrderNumber = orderNumber;
            const modalBody = document.getElementById('order-detail-body');
            let itemsHtml = '';
            order.items.forEach(item => {
                itemsHtml += `<li>${item.name} x${item.quantity} - ${formatPrice(item.newPrice * item.quantity)}</li>`;
            });

            modalBody.innerHTML = `
                <p><strong>Cliente:</strong> ${order.customer.name}</p>
                <p><strong>Dirección:</strong> ${order.customer.address}, ${order.customer.neighborhood}</p>
                <p><strong>Fecha:</strong> ${new Date(order.date).toLocaleString()}</p>
                <p><strong>Total:</strong> ${formatPrice(order.total)}</p>
                <p><strong>Estado Actual:</strong> ${order.status}</p>
                <ul>${itemsHtml}</ul>
            `;
            document.getElementById('order-status-select').value = order.status;
            document.getElementById('order-detail-modal').style.display = 'flex';
        }
    },

    updateOrderStatus: function() {
        const newStatus = document.getElementById('order-status-select').value;
        const orderIndex = this.orders.findIndex(o => o.orderNumber === this.currentOrderNumber);
        
        if (orderIndex !== -1) {
            this.orders[orderIndex].status = newStatus;
            localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(this.orders));
            this.loadAdminOrders();
            showToast('Estado actualizado', 'success');
        }
    },


    // =========================================
    // GESTIÓN DE USUARIOS (ADMIN)
    // =========================================
    loadAdminUsers: function() {
        const usersList = document.getElementById('admin-users-list');
        usersList.innerHTML = '';

        if (this.users.length === 0) {
            usersList.innerHTML = '<p style="text-align:center;padding:20px;">No hay usuarios registrados</p>';
            return;
        }

        this.users.forEach(user => {
            const userItem = document.createElement('div');
            userItem.className = 'admin-item';
            userItem.innerHTML = `
                <div class="admin-item-info">
                    <h4>${user.username}</h4>
                    <p>Rol: ${user.role}</p>
                    <p>Registrado: ${new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
                <div class="admin-item-actions">
                    <button class="btn-delete" onclick="app.deleteUser(${user.id})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            `;
            usersList.appendChild(userItem);
        });
    },

    deleteUser: function(id) {
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
            this.users = this.users.filter(u => u.id !== id);
            localStorage.setItem(DB_KEYS.USERS, JSON.stringify(this.users));
            this.loadAdminUsers();
            showToast('Usuario eliminado', 'success');
        }
    },

    // =========================================
    // HISTORIAL DE COMPRAS (USUARIO)
    // =========================================
    loadUserOrders: function() {
        const userOrders = this.orders.filter(o => o.customer.userId === this.currentUser.id);
        const ordersList = document.getElementById('user-orders-list');
        
        if (userOrders.length === 0) {
            ordersList.innerHTML = '<p style="text-align:center;padding:20px;">No tienes compras registradas</p>';
            return;
        }
        
        ordersList.innerHTML = '';
        userOrders.forEach(order => {
            const orderItem = document.createElement('div');
            orderItem.className = 'user-order-item';
            orderItem.innerHTML = `
                <h4>Orden: ${order.orderNumber}</h4>
                <p class="order-date">Fecha: ${new Date(order.date).toLocaleDateString()}</p>
                <p>Productos: ${order.items.length}</p>
                <p class="order-total">Total: ${formatPrice(order.total)}</p>
                <p class="order-status">Estado: <strong>${order.status}</strong></p>
            `;
            ordersList.appendChild(orderItem);
        });
    },

    // =========================================
    // UTILIDADES
    // =========================================
    showAdminSection: function(section) {
        document.querySelectorAll('.admin-section').forEach(sec => {
            sec.style.display = 'none';
        });
        document.querySelectorAll('.admin-nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.getElementById(`admin-${section}`).style.display = 'block';
        event.target.classList.add('active');
    },

    router: function(viewId) {
        // Ocultar todas las vistas
        document.querySelectorAll('.view').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
        
        // Mostrar vista seleccionada
        const target = document.getElementById(`view-${viewId}`);
        if (target) {
            target.style.display = 'block';
            window.scrollTo(0, 0);
        }

        // Actualizar estado activo en nav
        const navLink = document.querySelector(`.nav-link[onclick="app.router('${viewId}')"]`);
        if (navLink) navLink.classList.add('active');
    }
};

// Inicializar al cargar
document.addEventListener("DOMContentLoaded", () => {
    app.init();
});

// Función auxiliar para formatear precio (si no existe en el código global)
if (typeof formatPrice === 'undefined') {
    function formatPrice(price) {
        return new Intl.NumberFormat('es-AR', { 
            style: 'currency', 
            currency: 'ARS',
            minimumFractionDigits: 0
        }).format(price);
    }
}

// Función auxiliar para Toast (si no existe en el código global)
if (typeof showToast === 'undefined') {
    function showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
}