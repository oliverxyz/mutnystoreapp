const products = [
    { id: 1, name: 'Aorus NVIDIA RTX 3060', price: 49900, category: 'gpu', image: 'assets/products/gpu/RTX3060.png' },
    { id: 2, name: 'Aorus NVIDIA RTX 3070', price: 59900, category: 'gpu', image: 'assets/products/gpu/RTX3070.png' },
    { id: 3, name: 'Aorus NVIDIA RTX 3080', price: 69900, category: 'gpu', image: 'assets/products/gpu/RTX3080.png' },
    { id: 4, name: 'Aorus Model X 12th PC', price: 219900, category: 'desktop', image: 'assets/products/desktop/MODELX12.png' },
    { id: 5, name: 'Aorus Model S 11th PC', price: 189900, category: 'desktop', image: 'assets/products/desktop/MODELX11.png' },
    { id: 6, name: 'Aorus Model S 12th PC', price: 199900, category: 'desktop', image: 'assets/products/desktop/MODELS12.png' },
    { id: 7, name: 'Aorus Z790 XTREME Motherboard', price: 19900, category: 'motherboard', image: 'assets/products/motherboard/Z790XTREME.png' },
    { id: 8, name: 'Aorus Z790M ELITE Motherboard', price: 18900, category: 'motherboard', image: 'assets/products/motherboard/Z790MELITE.png' },
    { id: 9, name: 'Aorus B550 ELITE Motherboard', price: 12900, category: 'motherboard', image: 'assets/products/motherboard/B550ELITE.png' },
    { id: 10, name: 'Aorus 17X (2024) Laptop', price: 219900, category: 'laptop', image: 'assets/products/laptop/17X.png' },
    { id: 11, name: 'Aorus 15 (2024) Laptop', price: 149900, category: 'laptop', image: 'assets/products/laptop/15.png' },
    { id: 12, name: 'Aorus 7 (2023) Laptop', price: 119900, category: 'laptop', image: 'assets/products/laptop/7.png' },
];

let currentCategory = 'all';
let maxPrice = 500000;
let cart = [];

// Функция отображения продуктов
function displayProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    products.forEach(product => {
        if (product.price <= maxPrice) {
            const productElement = document.createElement('div');
            productElement.className = 'product';
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Цена: ${product.price} руб.</p>
                <button onclick="addToCart(${product.id})">Add to basket</button>
            `;
            productsContainer.appendChild(productElement);
        }
    });
}

// Модальное окно информации о разработчике
const developerModal = document.getElementById("developerModal");
const developerBtn = document.getElementById("developerInfo");
const developerSpan = developerModal.querySelector(".close");

developerBtn.onclick = function() {
    developerModal.style.display = "block";
}

developerSpan.onclick = function() {
    developerModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == developerModal) {
        developerModal.style.display = "none";
    }
}

// Функция фильтрации по категории
function showCategory(category) {
    currentCategory = category;
    filterProducts();
}

// Функция фильтрации продуктов
function filterProducts() {
    if (currentCategory === 'all') {
        displayProducts(products.filter(product => product.price <= maxPrice));
    } else {
        const filteredProducts = products.filter(product => product.category === currentCategory && product.price <= maxPrice);
        displayProducts(filteredProducts);
    }
}

// Функция добавления в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartCount();
        updateCartModal();
    }
}

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('productModalTitle').textContent = product.name;
        document.getElementById('productModalImage').src = product.image;
        document.getElementById('productModalDescription').textContent = 'Detailed description of ' + product.name;
        document.getElementById('productModalPriceValue').textContent = product.price;
        document.getElementById('productModal').style.display = 'block';
    }
}

// Слушатель событий для закрытия модального окна продукта
document.getElementById('closeProductModal').onclick = function() {
    document.getElementById('productModal').style.display = 'none';
}

// Закрытие модального окна при нажатии за его пределами
window.onclick = function(event) {
    const productModal = document.getElementById('productModal');
    if (event.target == productModal) {
        productModal.style.display = 'none';
    }
}

// Обновление функции displayProducts, чтобы включить кнопку "Подробнее".
function displayProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    products.forEach(product => {
        if (product.price <= maxPrice) {
            const productElement = document.createElement('div');
            productElement.className = 'product';
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Цена: ${product.price} руб.</p>
                <div class="product-buttons">
                    <button onclick="addToCart(${product.id})" class="action-button">Add to basket</button>
                    <button onclick="openProductModal(${product.id})" class="action-button">More Info</button>
                </div>
            `;
            productsContainer.appendChild(productElement);
        }
    });
}



// Функция обновления счетчика корзины
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Функция обновления модального окна корзины
function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <p>${item.name} - ${item.price} RUB x ${item.quantity}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total;
}

// Функция удаления из корзины
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        updateCartCount();
        updateCartModal();
    }
}

// Настройка слайдера цены
const priceSlider = document.getElementById('priceSlider');
const priceValue = document.getElementById('priceValue');

priceSlider.addEventListener('input', function() {
    maxPrice = this.value;
    priceValue.textContent = maxPrice;
    filterProducts();
});

// Инициализация отображения цены
priceValue.textContent = priceSlider.value;

// Переключатель темы
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('class', 'dark-theme');
    } else {
        document.documentElement.setAttribute('class', '');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

// Настройка модального окна корзины
const modal = document.getElementById('cartModal');
const cartButton = document.getElementById('cartButton');
const closeButton = document.getElementsByClassName('close')[0];

cartButton.onclick = function() {
    modal.style.display = 'block';
}

closeButton.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Настройка слайдера баннеров
const banners = document.querySelectorAll('.banner');
let currentBanner = 0;

function showNextBanner() {
    banners[currentBanner].classList.remove('active');
    currentBanner = (currentBanner + 1) % banners.length;
    banners[currentBanner].classList.add('active');
}

// Показывать следующий баннер каждые 5 секунд
setInterval(showNextBanner, 5000);

// Показать первый баннер при загрузке страницы
banners[0].classList.add('active');

// Настройка навигации
const homeSection = document.getElementById('home');
const catalogSection = document.getElementById('catalog');
const warrantySection = document.getElementById('warranty');
const feedbackSection = document.getElementById('feedback');
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        if (targetId === 'home') {
            homeSection.style.display = 'block';
            catalogSection.style.display = 'none';
            warrantySection.style.display = 'none';
            feedbackSection.style.display = 'none';
        } else if (targetId === 'catalog') {
            homeSection.style.display = 'none';
            catalogSection.style.display = 'flex';
            warrantySection.style.display = 'none';
            feedbackSection.style.display = 'none';
            filterProducts();
        } else if (targetId === 'warranty') {
            homeSection.style.display = 'none';
            catalogSection.style.display = 'none';
            warrantySection.style.display = 'block';
            feedbackSection.style.display = 'none';
        } else if (targetId === 'feedback') {
            homeSection.style.display = 'none';
            catalogSection.style.display = 'none';
            warrantySection.style.display = 'none';
            feedbackSection.style.display = 'flex';
        }
    });
});

// Инициализация страницы
document.addEventListener('DOMContentLoaded', function() {
    homeSection.style.display = 'block';
    catalogSection.style.display = 'none';
    updateCartCount();
    filterProducts();
});