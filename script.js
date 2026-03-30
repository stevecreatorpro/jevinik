// ==========================================
// JEVINIK RESTAURANT - INTERACTIVE SCRIPT
// ==========================================

// Menu Data
const menuData = [
    {
        id: 1,
        category: 'mains',
        name: 'Edikang Ikong',
        description: 'Efik vegetable soup with assorted meats and fresh peppers',
        price: { small: 2500, regular: 4000, large: 6000 },
        spice: '🌶️🌶️',
        portion: 'Serves 2-3 people'
    },
    {
        id: 2,
        category: 'mains',
        name: 'Pepper Soup (Goat)',
        description: 'Traditional hot pepper broth with tender goat meat',
        price: { small: 3000, regular: 5000, large: 8000 },
        spice: '🌶️🌶️🌶️',
        portion: 'Individual or group'
    },
    {
        id: 3,
        category: 'mains',
        name: 'Jollof Rice & Grilled Fish',
        description: 'Aromatic Nigerian Jollof with perfectly grilled fish fillet',
        price: { small: 2800, regular: 4500, large: 7000 },
        spice: '🌶️',
        portion: 'Individual serving'
    },
    {
        id: 4,
        category: 'soups',
        name: 'Creamy Egusi Soup',
        description: 'Rich melon seed soup with spinach, goat, and dried fish',
        price: { small: 2000, regular: 3500, large: 5500 },
        spice: '🌶️🌶️',
        portion: 'Serves 3-4 people'
    },
    {
        id: 5,
        category: 'soups',
        name: 'Ofe Owerri',
        description: 'Spicy Igbo soup with palm oil, meat, and vegetables',
        price: { small: 2200, regular: 3800, large: 6000 },
        spice: '🌶️🌶️🌶️',
        portion: 'Serves 2-3 people'
    },
    {
        id: 6,
        category: 'soups',
        name: 'Okra Soup',
        description: 'Smooth okra-based soup with shrimp and palm oil essence',
        price: { small: 1800, regular: 3000, large: 4500 },
        spice: '🌶️',
        portion: 'Serves 2-3 people'
    },
    {
        id: 7,
        category: 'sides',
        name: 'Garri & Egusi Balls',
        description: 'Traditional cassava preparation with melon balls',
        price: { single: 1500 },
        spice: 'Mild',
        portion: 'Individual'
    },
    {
        id: 8,
        category: 'sides',
        name: 'Fried Plantains',
        description: 'Golden-fried ripe plantains with irresistible crunch',
        price: { single: 1200 },
        spice: 'None',
        portion: 'Individual'
    },
    {
        id: 9,
        category: 'sides',
        name: 'Maize Pudding',
        description: 'Sweet corn pudding with coconut milk and spices',
        price: { single: 800 },
        spice: 'Mild',
        portion: 'Individual'
    },
    {
        id: 10,
        category: 'drinks',
        name: 'Fresh Coconut Water',
        description: 'Cold fresh coconut water served in shell',
        price: { single: 500 },
        spice: 'None',
        portion: 'Single'
    },
    {
        id: 11,
        category: 'drinks',
        name: 'Hibiscus Tea (Zobo)',
        description: 'Refreshing Caribbean-style hibiscus drink, chilled',
        price: { single: 600 },
        spice: 'None',
        portion: 'Single glass'
    },
    {
        id: 12,
        category: 'drinks',
        name: 'Fresh Mango Smoothie',
        description: 'Smooth blend of ripe mango with yogurt and honey',
        price: { single: 800 },
        spice: 'None',
        portion: 'Single glass'
    }
];

// ==========================================
// INITIALIZE ON PAGE LOAD
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeMenu();
    initializeMobileMenu();
    initializeForms();
    initializeQueueSimulation();
    initializeFilterButtons();
});

// ==========================================
// MENU RENDERING
// ==========================================

function initializeMenu() {
    const menuGrid = document.getElementById('menuGrid');
    renderMenuItems('all');
}

function renderMenuItems(filter) {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';

    const filtered = filter === 'all' 
        ? menuData 
        : menuData.filter(item => item.category === filter);

    filtered.forEach(item => {
        const menuCard = createMenuCard(item);
        menuGrid.appendChild(menuCard);
    });

    // Animate cards
    const cards = menuGrid.querySelectorAll('.menu-item-card');
    cards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
    });
}

function createMenuCard(item) {
    const card = document.createElement('div');
    card.className = 'menu-item-card';
    
    let priceHtml = '';
    if (item.price.small) {
        priceHtml = `
            <div class="grid grid-cols-3 gap-2 mb-3 text-sm">
                <div class="text-center">
                    <p class="text-gray-600">Small</p>
                    <p class="font-bold text-gold">₦${item.price.small}</p>
                </div>
                <div class="text-center">
                    <p class="text-gray-600">Regular</p>
                    <p class="font-bold text-gold">₦${item.price.regular}</p>
                </div>
                <div class="text-center">
                    <p class="text-gray-600">Large</p>
                    <p class="font-bold text-gold">₦${item.price.large}</p>
                </div>
            </div>
        `;
    } else {
        priceHtml = `<p class="text-xl font-bold text-gold mb-3">₦${item.price.single}</p>`;
    }

    card.innerHTML = `
        <div class="menu-item-image">
            <i class="fas fa-utensils text-5xl opacity-50"></i>
        </div>
        <div class="p-6">
            <h3 class="text-xl font-bold text-dark-brown mb-2">${item.name}</h3>
            <p class="text-gray-600 mb-4 text-sm">${item.description}</p>
            ${priceHtml}
            <div class="flex items-center justify-between mb-4">
                <span class="text-sm text-terracotta">${item.spice}</span>
                <span class="portion-badge">${item.portion}</span>
            </div>
            <button class="w-full bg-gold text-dark-brown py-2 rounded-lg font-bold hover:bg-opacity-90 transition" onclick="orderViaWhatsApp('${item.name}')">
                <i class="fas fa-phone"></i> Order
            </button>
        </div>
    `;
    
    return card;
}

// ==========================================
// FILTER FUNCTIONALITY
// ==========================================

function initializeFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-gold', 'text-dark-brown');
                btn.classList.add('border-2', 'border-gold', 'text-gold');
            });
            
            // Add active class to clicked button
            this.classList.add('active', 'bg-gold', 'text-dark-brown');
            this.classList.remove('border-2', 'border-gold', 'text-gold');
            
            // Filter menu
            const filter = this.getAttribute('data-filter');
            renderMenuItems(filter);
        });
    });
}

// ==========================================
// WHATSAPP INTEGRATION
// ==========================================

function orderViaWhatsApp(dishName) {
    const message = `Hi Jevinik! I'd like to order ${dishName}. Please send me available options and pricing.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/2348057828087?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

function initializeMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(8px, 8px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(8px, -8px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });
    
    // Close menu when link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.querySelectorAll('span').forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });
}

// ==========================================
// QUEUE SIMULATION
// ==========================================

function initializeQueueSimulation() {
    // Simulate queue status changes
    updateQueueStatus();
    setInterval(updateQueueStatus, 30000); // Update every 30 seconds
}

function updateQueueStatus() {
    const waitTimeEl = document.getElementById('waitTime');
    const queueCountEl = document.getElementById('queueCount');
    
    // Simulate varying wait times (5-30 minutes)
    const waitTime = Math.floor(Math.random() * 25) + 5;
    waitTimeEl.textContent = `${waitTime} mins`;
    
    // Simulate queue count (0-15 parties)
    const queueCount = Math.floor(Math.random() * 15);
    queueCountEl.textContent = queueCount;
}

// ==========================================
// FORM HANDLING
// ==========================================

function initializeForms() {
    // Reservation Form
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleReservation();
        });
    }

    // Catering Form
    const cateringForm = document.getElementById('cateringForm');
    if (cateringForm) {
        cateringForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleCatering();
        });
    }

    // VIP Form
    const vipForm = document.getElementById('vipForm');
    if (vipForm) {
        vipForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleVIP();
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContact();
        });
    }
}

function handleReservation() {
    const form = document.getElementById('reservationForm');
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const guests = document.getElementById('guests').value;
    const time = document.getElementById('time').value;
    const diningType = document.getElementById('dining-type').value;

    // Validate form
    if (!name || !phone || !guests || !time || !diningType) {
        alert('Please fill in all required fields');
        return;
    }

    // Show success message
    showSuccessMessage('reservationSuccess');
    
    // Send WhatsApp notification (simulated)
    const message = `Reservation Request: ${name} | ${guests} guests | ${time} | ${diningType} | Contact: ${phone}`;
    console.log('Reservation submitted:', message);
    
    // Reset form
    setTimeout(() => {
        form.reset();
        hideSuccessMessage('reservationSuccess');
    }, 3000);
}

function handleCatering() {
    const form = document.getElementById('cateringForm');
    const eventName = document.getElementById('cater-name').value;
    const contact = document.getElementById('cater-contact').value;
    const phone = document.getElementById('cater-phone').value;
    const guests = document.getElementById('cater-guests').value;
    const date = document.getElementById('cater-date').value;

    if (!eventName || !contact || !phone || !guests || !date) {
        alert('Please fill in all required fields');
        return;
    }

    showSuccessMessage('cateringSuccess');
    console.log('Catering quote requested:', { eventName, contact, phone, guests, date });
    
    setTimeout(() => {
        form.reset();
        hideSuccessMessage('cateringSuccess');
    }, 3000);
}

function handleVIP() {
    const form = document.getElementById('vipForm');
    const name = document.getElementById('vip-name').value;
    const phone = document.getElementById('vip-phone').value;
    const date = document.getElementById('vip-date').value;
    const guests = document.getElementById('vip-guests').value;
    const occasion = document.getElementById('vip-occasion').value;

    if (!name || !phone || !date || !guests || !occasion) {
        alert('Please fill in all required fields');
        return;
    }

    showSuccessMessage('vipSuccess');
    console.log('VIP booking requested:', { name, phone, date, guests, occasion });
    
    setTimeout(() => {
        form.reset();
        hideSuccessMessage('vipSuccess');
    }, 3000);
}

function handleContact() {
    const form = document.getElementById('contactForm');
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;

    if (!name || !email || !subject || !message) {
        alert('Please fill in all required fields');
        return;
    }

    showSuccessMessage('contactSuccess');
    console.log('Message submitted:', { name, email, subject, message });
    
    setTimeout(() => {
        form.reset();
        hideSuccessMessage('contactSuccess');
    }, 3000);
}

// ==========================================
// SUCCESS MESSAGE HELPERS
// ==========================================

function showSuccessMessage(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('show');
    }
}

function hideSuccessMessage(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.remove('show');
    }
}

// ==========================================
// SMOOTH SCROLL ENHANCEMENT
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// ADD ANIMATION STYLES DYNAMICALLY
// ==========================================

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// ANALYTICS TRACKING (Basic)
// ==========================================

function trackEvent(eventName, eventData) {
    // Log to console for development
    console.log('Event:', eventName, eventData);
    
    // In production, send to Google Analytics or similar
    /*
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    */
}

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.closest('button')) {
        const buttonText = e.target.textContent.trim();
        trackEvent('button_click', {
            button_name: buttonText
        });
    }
});

// Track form submissions
document.addEventListener('submit', function(e) {
    if (e.target.id) {
        trackEvent('form_submission', {
            form_name: e.target.id
        });
    }
});

// ==========================================
// DELIVERY ORDER HANDLING
// ==========================================

function initializeDeliveryForm() {
    const deliveryForm = document.getElementById('deliveryForm');
    if (deliveryForm) {
        deliveryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleDeliveryOrder();
        });
    }

    // Update total price when items are selected
    const deliveryItems = document.querySelectorAll('.delivery-item');
    deliveryItems.forEach(item => {
        item.addEventListener('change', updateDeliveryTotal);
    });
}

function updateDeliveryTotal() {
    const selectedItems = document.querySelectorAll('.delivery-item:checked');
    let total = 0;

    selectedItems.forEach(item => {
        total += parseInt(item.dataset.price);
    });

    document.getElementById('totalPrice').textContent = `₦${total.toLocaleString()}`;
}

function handleDeliveryOrder() {
    const selectedItems = Array.from(document.querySelectorAll('.delivery-item:checked'))
        .map(item => ({
            name: item.value,
            price: parseInt(item.dataset.price)
        }));

    if (selectedItems.length === 0) {
        alert('Please select at least one item');
        return;
    }

    const name = document.getElementById('delivery-name').value;
    const phone = document.getElementById('delivery-phone').value;
    const location = document.getElementById('delivery-location').value;
    const paymentMethod = document.getElementById('payment-method').value;
    const notes = document.getElementById('delivery-notes').value;

    if (!name || !phone || !location || !paymentMethod) {
        alert('Please fill in all required fields');
        return;
    }

    // Calculate total
    const totalAmount = selectedItems.reduce((sum, item) => sum + item.price, 0);

    // Create delivery order object
    const deliveryOrder = {
        id: Date.now(),
        name: name,
        phone: phone,
        items: selectedItems,
        location: location,
        totalAmount: totalAmount,
        paymentMethod: paymentMethod,
        notes: notes,
        timestamp: new Date().toISOString(),
        status: 'pending'
    };

    // Save to localStorage
    let deliveries = JSON.parse(localStorage.getItem('jevinikDeliveries')) || [];
    deliveries.push(deliveryOrder);
    localStorage.setItem('jevinikDeliveries', JSON.stringify(deliveries));

    // Show success message
    const successMsg = document.getElementById('deliverySuccess');
    successMsg.classList.add('show');

    // Reset form
    document.getElementById('deliveryForm').reset();
    document.querySelectorAll('.delivery-item').forEach(item => item.checked = false);
    updateDeliveryTotal();

    // Hide success message after 5 seconds
    setTimeout(() => {
        successMsg.classList.remove('show');
    }, 5000);

    // Send WhatsApp notification to owner
    const itemsList = selectedItems.map(item => `${item.name} - ₦${item.price}`).join('\n');
    const message = `New Delivery Order!\n\nCustomer: ${name}\nPhone: ${phone}\n\nItems:\n${itemsList}\n\nTotal: ₦${totalAmount}\nLocation: ${location}\nPayment: ${paymentMethod}`;
    
    console.log('Order saved:', deliveryOrder);
}

// Initialize delivery form on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeDeliveryForm();
});
