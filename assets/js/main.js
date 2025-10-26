// City Events Directory - Main JavaScript File

// Function to filter events by category
function filterByCategory(category) {
    // Redirect to events page with category parameter
    window.location.href = `events.html?category=${encodeURIComponent(category)}`;
}

// Apply category filter from URL
function applyCategoryFilter() {
    const category = new URLSearchParams(window.location.search).get('category');
    if (category) {
        setTimeout(() => {
            const filter = document.getElementById('categoryFilter');
            if (filter) {
                filter.value = category;
                filterEvents();
            }
        }, 100);
    }
}

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
        image: "assets/img/event1.jpg",
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
        image: "assets/img/event2.jpg",
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
        image: "assets/img/event3.jpg",
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
        image: "assets/img/event4.jpg",
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
        image: "assets/img/event5.jpg",
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
        image: "assets/img/event6.jpg",
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
        image: "assets/img/event7.jpg",
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
        image: "assets/img/event8.jpg",
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

// Load all events
function loadAllEvents() {
    const container = document.getElementById('eventsGrid');
    if (container) {
        displayEvents(filteredEvents, container);
    }
}

// Load event details
function loadEventDetails() {
    const eventId = parseInt(new URLSearchParams(window.location.search).get('id')) || 1;
    const event = eventsData.find(e => e.id === eventId);
    
    if (event) {
        document.getElementById('eventTitle').textContent = event.title;
        document.getElementById('eventDescription').textContent = event.description;
        document.getElementById('eventDate').textContent = event.date;
        document.getElementById('eventTime').textContent = event.time;
        document.getElementById('eventLocation').textContent = event.location;
        document.getElementById('eventCategory').textContent = event.category;
        
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

// Filter events
function filterEvents() {
    const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || '';
    const date = document.getElementById('dateFilter')?.value || '';
    
    filteredEvents = eventsData.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(search) || 
                            event.description.toLowerCase().includes(search);
        const matchesCategory = !category || event.category === category;
        const matchesDate = filterByDate(event.date, date);
        
        return matchesSearch && matchesCategory && matchesDate;
    });
    
    if (currentPage === 'events') {
        loadAllEvents();
    }
}

// Filter by date
function filterByDate(eventDate, filter) {
    if (!filter) return true;
    
    const today = new Date();
    const event = new Date(eventDate);
    
    switch(filter) {
        case 'today': return event.toDateString() === today.toDateString();
        case 'week': return event >= today && event <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        case 'month': return event >= today && event <= new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
        default: return true;
    }
}


// Clear filters
function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('dateFilter').value = '';
    filteredEvents = [...eventsData];
    loadAllEvents();
}

// Setup contact form
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleContactForm);
    }
}

// Handle contact form
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
        showAlert('Your message has been sent successfully! We will contact you soon.', 'success');
        document.getElementById('contactForm').reset();
    }
}

// Validate contact form
function validateContactForm(data) {
    let isValid = true;
    
    // Validate name
    if (!data.name.trim()) {
        showFieldError('contactName', 'Name is required');
        isValid = false;
    } else {
        clearFieldError('contactName');
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
        showFieldError('contactEmail', 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(data.email)) {
        showFieldError('contactEmail', 'Invalid email format');
        isValid = false;
    } else {
        clearFieldError('contactEmail');
    }
    
    // Validate subject
    if (!data.subject) {
        showFieldError('contactSubject', 'Subject is required');
        isValid = false;
    } else {
        clearFieldError('contactSubject');
    }
    
    // Validate message
    if (!data.message.trim()) {
        showFieldError('contactMessage', 'Message is required');
        isValid = false;
    } else {
        clearFieldError('contactMessage');
    }
    
    // Validate agreement
    if (!data.agreement) {
        showFieldError('contactAgreement', 'You must agree to the terms');
        isValid = false;
    } else {
        clearFieldError('contactAgreement');
    }
    
    return isValid;
}

// Show field error
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.getElementById(fieldId + 'Error');
    
    field.classList.add('is-invalid');
    if (errorDiv) {
        errorDiv.textContent = message;
    }
}

// Clear field error
function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.getElementById(fieldId + 'Error');
    
    field.classList.remove('is-invalid');
    if (errorDiv) {
        errorDiv.textContent = '';
    }
}

// Show alert message
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
        
        // Remove alert automatically after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
}

// Add to calendar
function addToCalendar() {
    showAlert('Event added to calendar successfully!', 'success');
}

// Share event
function shareEvent() {
    if (navigator.share) {
        navigator.share({
            title: document.getElementById('eventTitle').textContent,
            text: document.getElementById('eventDescription').textContent,
            url: window.location.href
        });
    } else {
        // Copy link to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showAlert('Event link copied to clipboard!', 'success');
        });
    }
}

// Submit booking
function submitBooking() {
    const form = document.getElementById('bookingForm');
    const formData = new FormData(form);
    
    // Validate data
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
        showAlert('Your booking has been confirmed successfully! We will contact you soon.', 'success');
        const modal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
        modal.hide();
        form.reset();
    } else {
        showAlert('Please fill in all required fields', 'danger');
    }
}

// Load events (general function)
function loadEvents() {
    if (currentPage === 'index') {
        loadFeaturedEvents();
    } else if (currentPage === 'events') {
        loadAllEvents();
    }
}

// Export functions for global use
window.filterEvents = filterEvents;
window.clearFilters = clearFilters;
window.addToCalendar = addToCalendar;
window.shareEvent = shareEvent;
window.submitBooking = submitBooking;

