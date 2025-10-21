// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Scroll to booking section
function scrollToBooking() {
    document.getElementById('booking').scrollIntoView({
        behavior: 'smooth'
    });
}

// Modal functionality
const modal = document.getElementById('bookingModal');
const closeModal = document.querySelector('.close');

function openBookingModal(serviceType) {
    const serviceNames = {
        'webinar': 'Har Ghar Yantra Webinar',
        'cosmic': 'Cosmic Code Report',
        'lalkitab': 'Lal Kitab Report',
        'fortune': 'Fortune Report Plus',
        'consultation': 'Personal Consultation Call',
        'finance': 'Finance Report',
        'occult': 'Occult Gurukul',
        'gems': 'Gemsmantra',
        'career': 'Career Report',
        'dosh': 'Kaal Sarp & Manglik Dosh Report',
        'fortune-basic': 'Fortune Report',
        'couple': 'Couple Kundali Matching'
    };
    
    document.getElementById('modalServiceName').textContent = serviceNames[serviceType] || 'Service Booking';
    document.getElementById('modalService').value = serviceType;
    modal.style.display = 'block';
}

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Form validation and submission
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            field.style.borderColor = '#28a745';
        }
    });
    
    // Email validation
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            emailField.style.borderColor = '#dc3545';
            isValid = false;
        }
    }
    
    // Phone validation
    const phoneField = form.querySelector('input[type="tel"]');
    if (phoneField && phoneField.value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(phoneField.value.replace(/\s/g, ''))) {
            phoneField.style.borderColor = '#dc3545';
            isValid = false;
        }
    }
    
    return isValid;
}

// Main appointment form submission
document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm(this)) {
        showNotification('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    const formData = new FormData(this);
    const appointmentData = Object.fromEntries(formData);
    
    // Add loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Booking...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        console.log('Appointment Data:', appointmentData);
        
        // Store appointment in localStorage for demo
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        appointmentData.id = Date.now();
        appointmentData.status = 'pending';
        appointmentData.createdAt = new Date().toISOString();
        appointments.push(appointmentData);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        
        showNotification('Appointment booked successfully! We will contact you soon.', 'success');
        this.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Send confirmation email (simulation)
        sendConfirmationEmail(appointmentData);
        
    }, 2000);
});

// Quick booking form submission
document.getElementById('quickBookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm(this)) {
        showNotification('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    const formData = new FormData(this);
    const bookingData = Object.fromEntries(formData);
    
    // Add loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Booking...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        console.log('Quick Booking Data:', bookingData);
        
        // Store booking in localStorage
        const bookings = JSON.parse(localStorage.getItem('quickBookings') || '[]');
        bookingData.id = Date.now();
        bookingData.status = 'pending';
        bookingData.createdAt = new Date().toISOString();
        bookings.push(bookingData);
        localStorage.setItem('quickBookings', JSON.stringify(bookings));
        
        showNotification('Service booked successfully! We will contact you soon.', 'success');
        this.reset();
        modal.style.display = 'none';
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Send confirmation
        sendConfirmationEmail(bookingData);
        
    }, 1500);
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 3000;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
}

// Send email notification to Astro Kumud
function sendEmailNotification(data) {
    // Send to Astro Kumud's email
    const emailData = {
        to: 'kumudmmaarik@gmail.com',
        subject: `New Appointment Booking - ${data.service || 'General Consultation'}`,
        body: `
New appointment booking received:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Service: ${data.service || 'Not specified'}
Preferred Date: ${data.date || 'Not specified'}
Preferred Time: ${data.time || 'Not specified'}
Birth Date: ${data.birthdate || 'Not provided'}
Birth Time: ${data.birthtime || 'Not provided'}
Birth Place: ${data.birthplace || 'Not provided'}
Message: ${data.message || 'No additional message'}

Booking ID: ${data.id}
Booking Time: ${new Date(data.createdAt).toLocaleString()}
        `
    };
    
    // Using EmailJS for client-side email sending
    // You'll need to set up EmailJS account and replace with your service details
    console.log('Sending email notification:', emailData);
    
    // For now, we'll use mailto as a fallback
    const mailtoLink = `mailto:kumudmmaarik@gmail.com?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;
    
    // Open email client (optional - you can remove this if you don't want to open email client)
    // window.open(mailtoLink);
    
    return emailData;
}

// Simulate sending confirmation email
function sendConfirmationEmail(data) {
    console.log('Sending confirmation email to:', data.email);
    console.log('Appointment/Booking details:', data);
    
    // Send notification to Astro Kumud
    sendEmailNotification(data);
    
    // In a real application, this would make an API call to your backend
    // which would then send an actual email using a service like SendGrid, Mailgun, etc.
}

// Set minimum date to today for date inputs
document.addEventListener('DOMContentLoaded', function() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    
    dateInputs.forEach(input => {
        if (input.name === 'date') { // Only for appointment date, not birth date
            input.min = today;
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(139, 0, 0, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #8B0000, #A0522D)';
        header.style.backdropFilter = 'none';
    }
});

// Animate service cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// WhatsApp integration (optional)
function openWhatsApp(message = '') {
    const phoneNumber = '918210490151'; // Astro Kumud's WhatsApp number
    const encodedMessage = encodeURIComponent(message || 'Hi, I would like to book an appointment for astrology consultation with Astro Kumud.');
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// Add WhatsApp floating button
document.addEventListener('DOMContentLoaded', () => {
    const whatsappButton = document.createElement('div');
    whatsappButton.innerHTML = '<i class="fab fa-whatsapp"></i>';
    whatsappButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        background: #25D366;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
        transition: transform 0.3s ease;
    `;
    
    whatsappButton.addEventListener('click', () => openWhatsApp());
    whatsappButton.addEventListener('mouseenter', () => {
        whatsappButton.style.transform = 'scale(1.1)';
    });
    whatsappButton.addEventListener('mouseleave', () => {
        whatsappButton.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(whatsappButton);
});

// Form field real-time validation
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.style.borderColor = '#dc3545';
            } else if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                input.style.borderColor = emailRegex.test(input.value) ? '#28a745' : '#dc3545';
            } else if (input.type === 'tel' && input.value) {
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                input.style.borderColor = phoneRegex.test(input.value.replace(/\s/g, '')) ? '#28a745' : '#dc3545';
            } else if (input.value.trim()) {
                input.style.borderColor = '#28a745';
            } else {
                input.style.borderColor = '#e9ecef';
            }
        });
        
        input.addEventListener('focus', () => {
            input.style.borderColor = '#8B0000';
        });
    });
});

// Local storage management for appointments
function getAppointments() {
    return JSON.parse(localStorage.getItem('appointments') || '[]');
}

function getQuickBookings() {
    return JSON.parse(localStorage.getItem('quickBookings') || '[]');
}

// Admin panel functionality (for demo purposes)
function showAdminPanel() {
    const appointments = getAppointments();
    const quickBookings = getQuickBookings();
    
    console.log('=== ADMIN PANEL ===');
    console.log('Appointments:', appointments);
    console.log('Quick Bookings:', quickBookings);
    console.log('Total Bookings:', appointments.length + quickBookings.length);
}

// Location search functionality
const indianCities = [
    'Mumbai, Maharashtra', 'Delhi, Delhi', 'Bangalore, Karnataka', 'Hyderabad, Telangana',
    'Ahmedabad, Gujarat', 'Chennai, Tamil Nadu', 'Kolkata, West Bengal', 'Surat, Gujarat',
    'Pune, Maharashtra', 'Jaipur, Rajasthan', 'Lucknow, Uttar Pradesh', 'Kanpur, Uttar Pradesh',
    'Nagpur, Maharashtra', 'Indore, Madhya Pradesh', 'Thane, Maharashtra', 'Bhopal, Madhya Pradesh',
    'Visakhapatnam, Andhra Pradesh', 'Pimpri-Chinchwad, Maharashtra', 'Patna, Bihar', 'Vadodara, Gujarat',
    'Ghaziabad, Uttar Pradesh', 'Ludhiana, Punjab', 'Agra, Uttar Pradesh', 'Nashik, Maharashtra',
    'Faridabad, Haryana', 'Meerut, Uttar Pradesh', 'Rajkot, Gujarat', 'Kalyan-Dombivli, Maharashtra',
    'Vasai-Virar, Maharashtra', 'Varanasi, Uttar Pradesh', 'Srinagar, Jammu and Kashmir', 'Aurangabad, Maharashtra',
    'Dhanbad, Jharkhand', 'Amritsar, Punjab', 'Navi Mumbai, Maharashtra', 'Allahabad, Uttar Pradesh',
    'Ranchi, Jharkhand', 'Howrah, West Bengal', 'Coimbatore, Tamil Nadu', 'Jabalpur, Madhya Pradesh',
    'Gwalior, Madhya Pradesh', 'Vijayawada, Andhra Pradesh', 'Jodhpur, Rajasthan', 'Madurai, Tamil Nadu',
    'Raipur, Chhattisgarh', 'Kota, Rajasthan', 'Chandigarh, Chandigarh', 'Guwahati, Assam',
    'Solapur, Maharashtra', 'Hubli-Dharwad, Karnataka', 'Tiruchirappalli, Tamil Nadu', 'Bareilly, Uttar Pradesh',
    'Mysore, Karnataka', 'Tiruppur, Tamil Nadu', 'Gurgaon, Haryana', 'Aligarh, Uttar Pradesh',
    'Jalandhar, Punjab', 'Bhubaneswar, Odisha', 'Salem, Tamil Nadu', 'Warangal, Telangana',
    'Guntur, Andhra Pradesh', 'Bhiwandi, Maharashtra', 'Saharanpur, Uttar Pradesh', 'Gorakhpur, Uttar Pradesh',
    'Bikaner, Rajasthan', 'Amravati, Maharashtra', 'Noida, Uttar Pradesh', 'Jamshedpur, Jharkhand',
    'Bhilai, Chhattisgarh', 'Cuttack, Odisha', 'Firozabad, Uttar Pradesh', 'Kochi, Kerala',
    'Nellore, Andhra Pradesh', 'Bhavnagar, Gujarat', 'Dehradun, Uttarakhand', 'Durgapur, West Bengal',
    'Asansol, West Bengal', 'Rourkela, Odisha', 'Nanded, Maharashtra', 'Kolhapur, Maharashtra',
    'Ajmer, Rajasthan', 'Akola, Maharashtra', 'Gulbarga, Karnataka', 'Jamnagar, Gujarat',
    'Ujjain, Madhya Pradesh', 'Loni, Uttar Pradesh', 'Siliguri, West Bengal', 'Jhansi, Uttar Pradesh',
    'Ulhasnagar, Maharashtra', 'Jammu, Jammu and Kashmir', 'Sangli-Miraj & Kupwad, Maharashtra', 'Mangalore, Karnataka',
    'Erode, Tamil Nadu', 'Belgaum, Karnataka', 'Ambattur, Tamil Nadu', 'Tirunelveli, Tamil Nadu',
    'Malegaon, Maharashtra', 'Gaya, Bihar', 'Jalgaon, Maharashtra', 'Udaipur, Rajasthan',
    'Maheshtala, West Bengal', 'Davanagere, Karnataka', 'Kozhikode, Kerala', 'Kurnool, Andhra Pradesh',
    'Rajpur Sonarpur, West Bengal', 'Rajahmundry, Andhra Pradesh', 'Bokaro, Jharkhand', 'South Dumdum, West Bengal',
    'Bellary, Karnataka', 'Patiala, Punjab', 'Gopalpur, Odisha', 'Agartala, Tripura',
    'Bhagalpur, Bihar', 'Muzaffarnagar, Uttar Pradesh', 'Bhatpara, West Bengal', 'Panihati, West Bengal',
    'Latur, Maharashtra', 'Dhule, Maharashtra', 'Rohtak, Haryana', 'Korba, Chhattisgarh',
    'Bhilwara, Rajasthan', 'Berhampur, Odisha', 'Muzaffarpur, Bihar', 'Ahmednagar, Maharashtra',
    'Mathura, Uttar Pradesh', 'Kollam, Kerala', 'Avadi, Tamil Nadu', 'Kadapa, Andhra Pradesh',
    'Kamarhati, West Bengal', 'Sambalpur, Odisha', 'Bilaspur, Chhattisgarh', 'Shahjahanpur, Uttar Pradesh',
    'Satara, Maharashtra', 'Bijapur, Karnataka', 'Rampur, Uttar Pradesh', 'Shivamogga, Karnataka',
    'Chandrapur, Maharashtra', 'Junagadh, Gujarat', 'Thrissur, Kerala', 'Alwar, Rajasthan',
    'Bardhaman, West Bengal', 'Kulti, West Bengal', 'Kakinada, Andhra Pradesh', 'Nizamabad, Telangana',
    'Parbhani, Maharashtra', 'Tumkur, Karnataka', 'Khammam, Telangana', 'Ozhukarai, Puducherry',
    'Bihar Sharif, Bihar', 'Panipat, Haryana', 'Darbhanga, Bihar', 'Bally, West Bengal',
    'Aizawl, Mizoram', 'Dewas, Madhya Pradesh', 'Ichalkaranji, Maharashtra', 'Karnal, Haryana',
    'Bathinda, Punjab', 'Jalna, Maharashtra', 'Eluru, Andhra Pradesh', 'Kirari Suleman Nagar, Delhi',
    'Barabanki, Uttar Pradesh', 'Purnia, Bihar', 'Satna, Madhya Pradesh', 'Mau, Uttar Pradesh',
    'Sonipat, Haryana', 'Farrukhabad, Uttar Pradesh', 'Sagar, Madhya Pradesh', 'Rourkela, Odisha',
    'Durg, Chhattisgarh', 'Imphal, Manipur', 'Ratlam, Madhya Pradesh', 'Hapur, Uttar Pradesh',
    'Arrah, Bihar', 'Anantapur, Andhra Pradesh', 'Karimnagar, Telangana', 'Etawah, Uttar Pradesh',
    'Ambarnath, Maharashtra', 'North Dumdum, West Bengal', 'Bharatpur, Rajasthan', 'Begusarai, Bihar',
    'New Delhi, Delhi', 'Gandhidham, Gujarat', 'Baranagar, West Bengal', 'Tiruvottiyur, Tamil Nadu',
    'Puducherry, Puducherry', 'Sikar, Rajasthan', 'Thoothukudi, Tamil Nadu', 'Rewa, Madhya Pradesh',
    'Mirzapur, Uttar Pradesh', 'Raichur, Karnataka', 'Pali, Rajasthan', 'Ramagundam, Telangana',
    'Haridwar, Uttarakhand', 'Vijayanagaram, Andhra Pradesh', 'Katihar, Bihar', 'Nagarcoil, Tamil Nadu',
    'Sri Ganganagar, Rajasthan', 'Karawal Nagar, Delhi', 'Mango, Jharkhand', 'Thanjavur, Tamil Nadu',
    'Bulandshahr, Uttar Pradesh', 'Uluberia, West Bengal', 'Murwara, Madhya Pradesh', 'Sambhal, Uttar Pradesh',
    'Singrauli, Madhya Pradesh', 'Nadiad, Gujarat', 'Secunderabad, Telangana', 'Naihati, West Bengal',
    'Yamunanagar, Haryana', 'Bidhan Nagar, West Bengal', 'Pallavaram, Tamil Nadu', 'Bidar, Karnataka',
    'Munger, Bihar', 'Panchkula, Haryana', 'Burhanpur, Madhya Pradesh', 'Raurkela Industrial Township, Odisha',
    'Kharagpur, West Bengal', 'Dindigul, Tamil Nadu', 'Gandhinagar, Gujarat', 'Hospet, Karnataka',
    'Nangloi Jat, Delhi', 'Malda, West Bengal', 'Ongole, Andhra Pradesh', 'Deoghar, Jharkhand',
    'Chapra, Bihar', 'Haldia, West Bengal', 'Khandwa, Madhya Pradesh', 'Nandyal, Andhra Pradesh',
    'Chittoor, Andhra Pradesh', 'Morena, Madhya Pradesh', 'Amroha, Uttar Pradesh', 'Anand, Gujarat',
    'Bhind, Madhya Pradesh', 'Bhalswa Jahangir Pur, Delhi', 'Madhyamgram, West Bengal', 'Bhiwani, Haryana'
];

function setupLocationSearch() {
    const birthplaceInput = document.getElementById('birthplace');
    const suggestionsDiv = document.getElementById('locationSuggestions');
    
    if (!birthplaceInput || !suggestionsDiv) return;
    
    birthplaceInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length < 2) {
            suggestionsDiv.style.display = 'none';
            return;
        }
        
        const filteredCities = indianCities.filter(city => 
            city.toLowerCase().includes(query)
        ).slice(0, 5); // Show max 5 suggestions
        
        if (filteredCities.length > 0) {
            suggestionsDiv.innerHTML = filteredCities
                .map(city => `<div class="location-item" onclick="selectLocation('${city}')">${city}</div>`)
                .join('');
            suggestionsDiv.style.display = 'block';
        } else {
            suggestionsDiv.style.display = 'none';
        }
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!birthplaceInput.contains(e.target) && !suggestionsDiv.contains(e.target)) {
            suggestionsDiv.style.display = 'none';
        }
    });
}

function selectLocation(city) {
    document.getElementById('birthplace').value = city;
    document.getElementById('locationSuggestions').style.display = 'none';
}

// Initialize location search when DOM is loaded
document.addEventListener('DOMContentLoaded', setupLocationSearch);

// Security Features
class SecurityManager {
    constructor() {
        this.rateLimitMap = new Map();
        this.maxRequests = 5;
        this.timeWindow = 60000; // 1 minute
        this.blockedIPs = new Set();
        this.initSecurity();
    }

    initSecurity() {
        // Disable right-click context menu (basic protection)
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        // Disable F12, Ctrl+Shift+I, Ctrl+U
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.key === 'u')) {
                e.preventDefault();
                this.showSecurityWarning();
            }
        });

        // Monitor for suspicious activity
        this.monitorSuspiciousActivity();
    }

    checkRateLimit(identifier) {
        const now = Date.now();
        const userRequests = this.rateLimitMap.get(identifier) || [];
        
        // Remove old requests outside time window
        const recentRequests = userRequests.filter(time => now - time < this.timeWindow);
        
        if (recentRequests.length >= this.maxRequests) {
            this.blockedIPs.add(identifier);
            return false;
        }
        
        recentRequests.push(now);
        this.rateLimitMap.set(identifier, recentRequests);
        return true;
    }

    sanitizeInput(input) {
        if (typeof input !== 'string') return input;
        
        return input
            .replace(/[<>]/g, '') // Remove potential HTML tags
            .replace(/javascript:/gi, '') // Remove javascript: protocol
            .replace(/on\w+=/gi, '') // Remove event handlers
            .trim();
    }

    validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    validatePhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{9,14}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    showSecurityWarning() {
        showNotification('Security Warning: Unauthorized access attempt detected!', 'error');
    }

    monitorSuspiciousActivity() {
        let clickCount = 0;
        let lastClickTime = 0;

        document.addEventListener('click', () => {
            const now = Date.now();
            if (now - lastClickTime < 100) { // Clicks too fast
                clickCount++;
                if (clickCount > 10) {
                    this.showSecurityWarning();
                    clickCount = 0;
                }
            } else {
                clickCount = 0;
            }
            lastClickTime = now;
        });
    }
}

// Initialize security manager
const security = new SecurityManager();

// Authentication System
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.initAuth();
    }

    initAuth() {
        // Check if user is already logged in
        const savedUser = localStorage.getItem('astroKumudUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUIForLoggedInUser();
        }
    }

    async loginWithGoogle(credential) {
        try {
            // Decode JWT token (in production, verify on server)
            const payload = JSON.parse(atob(credential.split('.')[1]));
            
            const user = {
                id: payload.sub,
                name: payload.name,
                email: payload.email,
                picture: payload.picture,
                loginMethod: 'google',
                loginTime: new Date().toISOString()
            };

            this.currentUser = user;
            localStorage.setItem('astroKumudUser', JSON.stringify(user));
            this.updateUIForLoggedInUser();
            closeLoginModal();
            showNotification(`Welcome ${user.name}!`, 'success');
            
            return user;
        } catch (error) {
            console.error('Google login error:', error);
            showNotification('Login failed. Please try again.', 'error');
            return null;
        }
    }

    async loginWithEmail(email, password) {
        // In production, this would make an API call to your backend
        const identifier = `${email}_${Date.now()}`;
        
        if (!security.checkRateLimit(identifier)) {
            showNotification('Too many login attempts. Please try again later.', 'error');
            return null;
        }

        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                // For demo purposes, accept any email/password combination
                const user = {
                    id: Date.now(),
                    name: email.split('@')[0],
                    email: email,
                    loginMethod: 'email',
                    loginTime: new Date().toISOString()
                };

                this.currentUser = user;
                localStorage.setItem('astroKumudUser', JSON.stringify(user));
                this.updateUIForLoggedInUser();
                closeLoginModal();
                showNotification(`Welcome ${user.name}!`, 'success');
                resolve(user);
            }, 1000);
        });
    }

    async signupWithEmail(userData) {
        const identifier = `${userData.email}_${Date.now()}`;
        
        if (!security.checkRateLimit(identifier)) {
            showNotification('Too many signup attempts. Please try again later.', 'error');
            return null;
        }

        // Validate password strength
        if (!this.validatePassword(userData.password)) {
            showNotification('Password must be at least 8 characters with uppercase, lowercase, and number.', 'error');
            return null;
        }

        if (userData.password !== userData.confirmPassword) {
            showNotification('Passwords do not match.', 'error');
            return null;
        }

        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                const user = {
                    id: Date.now(),
                    name: userData.fullName,
                    email: userData.email,
                    phone: userData.phone,
                    loginMethod: 'email',
                    signupTime: new Date().toISOString()
                };

                this.currentUser = user;
                localStorage.setItem('astroKumudUser', JSON.stringify(user));
                this.updateUIForLoggedInUser();
                closeLoginModal();
                showNotification(`Welcome ${user.name}! Account created successfully.`, 'success');
                resolve(user);
            }, 1500);
        });
    }

    validatePassword(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        
        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('astroKumudUser');
        this.updateUIForLoggedOutUser();
        showNotification('Logged out successfully.', 'success');
    }

    updateUIForLoggedInUser() {
        const loginBtn = document.querySelector('.login-btn');
        if (loginBtn && this.currentUser) {
            loginBtn.textContent = `Hi, ${this.currentUser.name.split(' ')[0]}`;
            loginBtn.onclick = () => this.showUserMenu();
        }
    }

    updateUIForLoggedOutUser() {
        const loginBtn = document.querySelector('.login-btn');
        if (loginBtn) {
            loginBtn.textContent = 'Login';
            loginBtn.onclick = () => showLoginModal();
        }
    }

    showUserMenu() {
        // Create user menu dropdown
        const existingMenu = document.querySelector('.user-menu');
        if (existingMenu) {
            existingMenu.remove();
            return;
        }

        const menu = document.createElement('div');
        menu.className = 'user-menu';
        menu.innerHTML = `
            <div class="user-menu-content">
                <div class="user-info">
                    <strong>${this.currentUser.name}</strong>
                    <small>${this.currentUser.email}</small>
                </div>
                <hr>
                <a href="#" onclick="authManager.showProfile()">My Profile</a>
                <a href="#" onclick="authManager.showBookings()">My Bookings</a>
                <a href="#" onclick="authManager.logout()">Logout</a>
            </div>
        `;

        document.body.appendChild(menu);

        // Position menu
        const loginBtn = document.querySelector('.login-btn');
        const rect = loginBtn.getBoundingClientRect();
        menu.style.position = 'fixed';
        menu.style.top = `${rect.bottom + 10}px`;
        menu.style.right = '20px';
        menu.style.zIndex = '3000';

        // Close menu when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closeMenu(e) {
                if (!menu.contains(e.target) && !loginBtn.contains(e.target)) {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            });
        }, 100);
    }

    showProfile() {
        document.querySelector('.user-menu')?.remove();
        showNotification('Profile feature coming soon!', 'info');
    }

    showBookings() {
        document.querySelector('.user-menu')?.remove();
        const appointments = getAppointments();
        const quickBookings = getQuickBookings();
        const userBookings = [...appointments, ...quickBookings].filter(booking => 
            booking.email === this.currentUser.email
        );
        
        console.log('Your Bookings:', userBookings);
        showNotification(`You have ${userBookings.length} booking(s). Check console for details.`, 'info');
    }
}

// Initialize auth manager
const authManager = new AuthManager();

// Google Sign-In callback
function handleCredentialResponse(response) {
    authManager.loginWithGoogle(response.credential);
}

// Login Modal Functions
function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    showLoginForm(); // Reset to login form
}

function showSignupForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
    document.querySelector('.auth-switch').style.display = 'none';
    document.getElementById('signupSwitch').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
    document.querySelector('.auth-switch').style.display = 'block';
    document.getElementById('signupSwitch').style.display = 'none';
}

// Enhanced form validation with security
function validateFormSecure(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        // Sanitize input
        field.value = security.sanitizeInput(field.value);
        
        if (!field.value.trim()) {
            field.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            field.style.borderColor = '#28a745';
        }
    });
    
    // Email validation
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
        if (!security.validateEmail(emailField.value)) {
            emailField.style.borderColor = '#dc3545';
            isValid = false;
        }
    }
    
    // Phone validation
    const phoneField = form.querySelector('input[type="tel"]');
    if (phoneField && phoneField.value) {
        if (!security.validatePhone(phoneField.value)) {
            phoneField.style.borderColor = '#dc3545';
            isValid = false;
        }
    }

    // reCAPTCHA validation
    const recaptcha = form.querySelector('.g-recaptcha');
    if (recaptcha) {
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            showNotification('Please complete the reCAPTCHA verification.', 'error');
            isValid = false;
        }
    }
    
    return isValid;
}

// Login form handler
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const email = formData.get('email');
            const password = formData.get('password');
            
            if (!security.validateEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            const submitBtn = e.target.querySelector('.submit-btn');
            submitBtn.textContent = 'Logging in...';
            submitBtn.disabled = true;
            
            try {
                await authManager.loginWithEmail(email, password);
            } finally {
                submitBtn.textContent = 'Login';
                submitBtn.disabled = false;
            }
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const userData = Object.fromEntries(formData);
            
            // Validate all fields
            if (!security.validateEmail(userData.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            if (!security.validatePhone(userData.phone)) {
                showNotification('Please enter a valid phone number.', 'error');
                return;
            }
            
            const submitBtn = e.target.querySelector('.submit-btn');
            submitBtn.textContent = 'Creating Account...';
            submitBtn.disabled = true;
            
            try {
                await authManager.signupWithEmail(userData);
            } finally {
                submitBtn.textContent = 'Sign Up';
                submitBtn.disabled = false;
            }
        });
    }
});

// Update existing form submissions to use secure validation
const originalAppointmentSubmit = document.getElementById('appointmentForm');
if (originalAppointmentSubmit) {
    originalAppointmentSubmit.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateFormSecure(this)) {
            showNotification('Please fill in all required fields correctly.', 'error');
            return;
        }
        
        // Check rate limiting
        const userIdentifier = this.querySelector('input[name="email"]').value;
        if (!security.checkRateLimit(userIdentifier)) {
            showNotification('Too many booking attempts. Please try again later.', 'error');
            return;
        }
        
        // Continue with original booking logic...
        const formData = new FormData(this);
        const appointmentData = Object.fromEntries(formData);
        
        // Sanitize all inputs
        Object.keys(appointmentData).forEach(key => {
            appointmentData[key] = security.sanitizeInput(appointmentData[key]);
        });
        
        // Add user info if logged in
        if (authManager.currentUser) {
            appointmentData.userId = authManager.currentUser.id;
            appointmentData.userLoginMethod = authManager.currentUser.loginMethod;
        }
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Booking...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            console.log('Secure Appointment Data:', appointmentData);
            
            const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
            appointmentData.id = Date.now();
            appointmentData.status = 'pending';
            appointmentData.createdAt = new Date().toISOString();
            appointmentData.ipAddress = 'hidden'; // In production, get from server
            appointments.push(appointmentData);
            localStorage.setItem('appointments', JSON.stringify(appointments));
            
            showNotification('Appointment booked successfully! We will contact you soon.', 'success');
            this.reset();
            
            // Reset reCAPTCHA
            if (typeof grecaptcha !== 'undefined') {
                grecaptcha.reset();
            }
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            sendConfirmationEmail(appointmentData);
        }, 2000);
    });
}

// Expose admin function to console for demo
window.showAdminPanel = showAdminPanel;
window.authManager = authManager;
window.security = security;
// E
nhanced Netlify Form Handling for Email Notifications
function handleNetlifyFormSubmission(form) {
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Show success message
    setTimeout(() => {
        showNotification('Booking submitted successfully! You will be redirected...', 'success');
    }, 1000);
}

// Override existing form handlers for Netlify integration
document.addEventListener('DOMContentLoaded', function() {
    // Remove existing event listeners and add Netlify-compatible ones
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        // Clone form to remove existing event listeners
        const newForm = appointmentForm.cloneNode(true);
        appointmentForm.parentNode.replaceChild(newForm, appointmentForm);
        
        newForm.addEventListener('submit', function(e) {
            if (!validateFormSecure(this)) {
                e.preventDefault();
                showNotification('Please fill in all required fields correctly.', 'error');
                return;
            }
            
            // Check rate limiting
            const userIdentifier = this.querySelector('input[name="email"]').value;
            if (!security.checkRateLimit(userIdentifier)) {
                e.preventDefault();
                showNotification('Too many booking attempts. Please try again later.', 'error');
                return;
            }
            
            // Add user info if logged in
            if (authManager.currentUser) {
                const userIdField = document.createElement('input');
                userIdField.type = 'hidden';
                userIdField.name = 'userId';
                userIdField.value = authManager.currentUser.id;
                this.appendChild(userIdField);
                
                const loginMethodField = document.createElement('input');
                loginMethodField.type = 'hidden';
                loginMethodField.name = 'userLoginMethod';
                loginMethodField.value = authManager.currentUser.loginMethod;
                this.appendChild(loginMethodField);
            }
            
            // Add timestamp
            const timestampField = document.createElement('input');
            timestampField.type = 'hidden';
            timestampField.name = 'submissionTime';
            timestampField.value = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
            this.appendChild(timestampField);
            
            handleNetlifyFormSubmission(this);
            // Form will submit normally to Netlify
        });
    }
    
    const quickBookingForm = document.getElementById('quickBookingForm');
    if (quickBookingForm) {
        quickBookingForm.addEventListener('submit', function(e) {
            if (!validateFormSecure(this)) {
                e.preventDefault();
                showNotification('Please fill in all required fields correctly.', 'error');
                return;
            }
            
            // Add timestamp
            const timestampField = document.createElement('input');
            timestampField.type = 'hidden';
            timestampField.name = 'submissionTime';
            timestampField.value = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
            this.appendChild(timestampField);
            
            handleNetlifyFormSubmission(this);
            // Form will submit normally to Netlify
        });
    }
});

// Email notification setup instructions
console.log(`
🕉️ ASTRO KUMUD - EMAIL SETUP COMPLETE

📧 Email Notifications Setup:
1. Deploy to Netlify
2. Go to Site Settings > Forms
3. Set notification email to: kumudmmaarik@gmail.com
4. Enable form notifications

📋 All bookings will be sent to your Gmail automatically!

🔗 After deployment, configure:
- Netlify Forms notifications
- Email templates
- Spam filtering

📱 Backup notification via WhatsApp: +91 8210490151
`);