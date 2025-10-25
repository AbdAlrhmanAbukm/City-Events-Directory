// City Events Directory - Main JavaScript File

// Sample Events Data
const eventsData = [
    {
        id: 1,
        title: "Eastern Music Festival",
        description: "Amazing musical performances from famous artists",
        date: "2024-03-15",
        time: "7:00 PM",
        location: "City Theater",
        category: "Music",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop",
        featured: true
    },
    {
        id: 2,
        title: "Local Football Championship",
        description: "Exciting matches between the best local teams",
        date: "2024-03-20",
        time: "6:00 PM",
        location: "City Sports Stadium",
        category: "Sports",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
        featured: true
    },
    {
        id: 3,
        title: "Modern Art Exhibition",
        description: "Creative artworks from local artists",
        date: "2024-03-25",
        time: "10:00 AM",
        location: "Arts Center",
        category: "Culture",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=400&fit=crop",
        featured: true
    },
    {
        id: 4,
        title: "Family Cooking Workshop",
        description: "Learn new recipes with the family",
        date: "2024-03-30",
        time: "4:00 PM",
        location: "Cooking School",
        category: "Family",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop",
        featured: false
    },
    {
        id: 5,
        title: "Modern Technology Lecture",
        description: "Latest developments in the world of technology",
        date: "2024-04-05",
        time: "7:30 PM",
        location: "Conference Hall",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
        featured: false
    },
    {
        id: 6,
        title: "Annual Charity Event",
        description: "Charity event to support the needy",
        date: "2024-04-10",
        time: "8:00 PM",
        location: "Culture Palace",
        category: "Charity",
        image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=400&fit=crop",
        featured: false
    },
    {
        id: 7,
        title: "Local Food Festival",
        description: "Taste the best local dishes",
        date: "2024-04-15",
        time: "5:00 PM",
        location: "City Square",
        category: "Family",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=400&fit=crop",
        featured: false
    },
    {
        id: 8,
        title: "Arabic Poetry Competition",
        description: "Poetry competition for creative youth",
        date: "2024-04-20",
        time: "6:30 PM",
        location: "Poetry House",
        category: "Culture",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
        featured: false
    }
];

// Global variables
let filteredEvents = [...eventsData];
let currentPage = 'index';

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    loadEvents();
});

// Initialize page based on type
function initializePage() {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop().split('.')[0];
    
    switch(pageName) {
        case 'index':
            currentPage = 'index';
            loadFeaturedEvents();
            break;
        case 'events':
            currentPage = 'events';
            loadAllEvents();
            break;
        case 'event':
            currentPage = 'event';
            loadEventDetails();
            break;
        case 'contact':
            currentPage = 'contact';
            setupContactForm();
            break;
    }
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // فلترة الفعاليات
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterEvents);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterEvents);
    }
    
    if (dateFilter) {
        dateFilter.addEventListener('change', filterEvents);
    }
    
    // تصنيفات سريعة
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.querySelector('.card-title').textContent;
            filterByCategory(category);
        });
    });
}

// تحميل الفعاليات البارزة
function loadFeaturedEvents() {
    const featuredEvents = eventsData.filter(event => event.featured);
    const container = document.getElementById('eventsContainer');
    
    if (container) {
        container.innerHTML = '';
        featuredEvents.slice(0, 6).forEach(event => {
            const eventCard = createEventCard(event);
            container.appendChild(eventCard);
        });
    }
}

// تحميل جميع الفعاليات
function loadAllEvents() {
    const container = document.getElementById('eventsGrid');
    if (container) {
        displayEvents(filteredEvents, container);
    }
}

// تحميل تفاصيل الفعالية
function loadEventDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(urlParams.get('id')) || 1;
    const event = eventsData.find(e => e.id === eventId);
    
    if (event) {
        // تحديث النصوص
        document.getElementById('eventTitle').textContent = event.title;
        document.getElementById('eventDescription').textContent = event.description;
        document.getElementById('eventDate').textContent = event.date;
        document.getElementById('eventTime').textContent = event.time;
        document.getElementById('eventLocation').textContent = event.location;
        document.getElementById('eventCategory').textContent = event.category;
        
        // تحديث الصورة
        const eventImage = document.getElementById('eventImage');
        if (eventImage) {
            eventImage.src = event.image;
            eventImage.alt = event.title;
        }
    }
}

// Create event card
function createEventCard(event) {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-sm-6 mb-4';
    
    col.innerHTML = `
        <div class="card event-card h-100">
            <img src="${event.image}" class="card-img-top" alt="${event.title}" onerror="this.src='assets/img/placeholder.jpg'">
            <div class="card-body">
                <h5 class="card-title">${event.title}</h5>
                <p class="card-text">${event.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted">
                        <i class="fas fa-calendar me-1"></i>
                        ${event.date}
                    </small>
                    <span class="badge bg-primary">${event.category}</span>
                </div>
                <div class="mt-3">
                    <a href="event.html?id=${event.id}" class="btn btn-primary btn-sm">
                        <i class="fas fa-eye me-1"></i>
                        Details
                    </a>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// Display events
function displayEvents(events, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    if (events.length === 0) {
        document.getElementById('noResults').style.display = 'block';
        return;
    }
    
    document.getElementById('noResults').style.display = 'none';
    
    events.forEach(event => {
        const eventCard = createEventCard(event);
        container.appendChild(eventCard);
    });
}

// فلترة الفعاليات
function filterEvents() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || '';
    const dateFilter = document.getElementById('dateFilter')?.value || '';
    
    filteredEvents = eventsData.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm) ||
                            event.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || event.category === category;
        const matchesDate = filterByDate(event.date, dateFilter);
        
        return matchesSearch && matchesCategory && matchesDate;
    });
    
    if (currentPage === 'events') {
        loadAllEvents();
    }
}

// فلترة حسب التاريخ
function filterByDate(eventDate, filter) {
    if (!filter) return true;
    
    const today = new Date();
    const event = new Date(eventDate);
    
    switch(filter) {
        case 'today':
            return event.toDateString() === today.toDateString();
        case 'week':
            const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
            return event >= today && event <= weekFromNow;
        case 'month':
            const monthFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
            return event >= today && event <= monthFromNow;
        default:
            return true;
    }
}

// فلترة حسب التصنيف
function filterByCategory(category) {
    if (currentPage === 'events') {
        document.getElementById('categoryFilter').value = category;
        filterEvents();
    } else {
        window.location.href = `events.html?category=${encodeURIComponent(category)}`;
    }
}

// مسح الفلاتر
function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('dateFilter').value = '';
    filteredEvents = [...eventsData];
    loadAllEvents();
}

// إعداد نموذج الاتصال
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleContactForm);
    }
}

// معالجة نموذج الاتصال
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        phone: document.getElementById('contactPhone').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value,
        agreement: document.getElementById('contactAgreement').checked
    };
    
    if (validateContactForm(formData)) {
        showAlert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
        document.getElementById('contactForm').reset();
    }
}

// التحقق من صحة نموذج الاتصال
function validateContactForm(data) {
    let isValid = true;
    
    // التحقق من الاسم
    if (!data.name.trim()) {
        showFieldError('contactName', 'الاسم مطلوب');
        isValid = false;
    } else {
        clearFieldError('contactName');
    }
    
    // التحقق من البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
        showFieldError('contactEmail', 'البريد الإلكتروني مطلوب');
        isValid = false;
    } else if (!emailRegex.test(data.email)) {
        showFieldError('contactEmail', 'صيغة البريد الإلكتروني غير صحيحة');
        isValid = false;
    } else {
        clearFieldError('contactEmail');
    }
    
    // التحقق من الموضوع
    if (!data.subject) {
        showFieldError('contactSubject', 'الموضوع مطلوب');
        isValid = false;
    } else {
        clearFieldError('contactSubject');
    }
    
    // التحقق من الرسالة
    if (!data.message.trim()) {
        showFieldError('contactMessage', 'الرسالة مطلوبة');
        isValid = false;
    } else {
        clearFieldError('contactMessage');
    }
    
    // التحقق من الموافقة
    if (!data.agreement) {
        showFieldError('contactAgreement', 'يجب الموافقة على الشروط');
        isValid = false;
    } else {
        clearFieldError('contactAgreement');
    }
    
    return isValid;
}

// عرض خطأ في الحقل
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.getElementById(fieldId + 'Error');
    
    field.classList.add('is-invalid');
    if (errorDiv) {
        errorDiv.textContent = message;
    }
}

// مسح خطأ الحقل
function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.getElementById(fieldId + 'Error');
    
    field.classList.remove('is-invalid');
    if (errorDiv) {
        errorDiv.textContent = '';
    }
}

// عرض رسالة تنبيه
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
        
        // إزالة التنبيه تلقائياً بعد 5 ثوان
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
}

// إضافة للتقويم
function addToCalendar() {
    showAlert('تم إضافة الفعالية للتقويم بنجاح!', 'success');
}

// مشاركة الفعالية
function shareEvent() {
    if (navigator.share) {
        navigator.share({
            title: document.getElementById('eventTitle').textContent,
            text: document.getElementById('eventDescription').textContent,
            url: window.location.href
        });
    } else {
        // نسخ الرابط للحافظة
        navigator.clipboard.writeText(window.location.href).then(() => {
            showAlert('تم نسخ رابط الفعالية للحافظة!', 'success');
        });
    }
}

// إرسال الحجز
function submitBooking() {
    const form = document.getElementById('bookingForm');
    const formData = new FormData(form);
    
    // التحقق من صحة البيانات
    let isValid = true;
    const requiredFields = ['bookingName', 'bookingEmail', 'bookingPhone'];
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });
    
    if (isValid) {
        showAlert('تم تأكيد حجزك بنجاح! سنتواصل معك قريباً.', 'success');
        const modal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
        modal.hide();
        form.reset();
    } else {
        showAlert('يرجى ملء جميع الحقول المطلوبة', 'danger');
    }
}

// تحميل الفعاليات (دالة عامة)
function loadEvents() {
    if (currentPage === 'index') {
        loadFeaturedEvents();
    } else if (currentPage === 'events') {
        loadAllEvents();
    }
}

// تأثيرات بصرية



// تصدير الوظائف للاستخدام العام
window.filterEvents = filterEvents;
window.clearFilters = clearFilters;
window.addToCalendar = addToCalendar;
window.shareEvent = shareEvent;
window.submitBooking = submitBooking;
window.toggleDarkMode = toggleDarkMode;

