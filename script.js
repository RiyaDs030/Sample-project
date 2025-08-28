// Sample job data
const jobs = [
    {
        id: 1,
        title: "Senior Metallurgical Engineer",
        department: "Engineering",
        category: "engineering",
        location: "Jamshedpur, India",
        type: "Full-time",
        description: "Lead metallurgical processes and quality control initiatives in our steel manufacturing operations. Requires 5+ years experience in steel production.",
        requirements: ["Bachelor's degree in Metallurgy or Materials Engineering", "5+ years of experience", "Knowledge of steel production processes"],
        salary: "₹12-18 LPA"
    },
    {
        id: 2,
        title: "Operations Manager - Steel Plant",
        department: "Operations",
        category: "operations",
        location: "Kalinganagar, India",
        type: "Full-time",
        description: "Oversee daily operations of steel manufacturing units ensuring safety, quality and productivity. Lead cross-functional teams.",
        requirements: ["MBA or Engineering degree", "8+ years in operations", "Leadership experience"],
        salary: "₹15-25 LPA"
    },
    {
        id: 3,
        title: "Research Scientist - Materials",
        department: "R&D",
        category: "research",
        location: "Jamshedpur, India",
        type: "Full-time",
        description: "Conduct advanced research in materials science for next-generation steel products. Publish research findings and patent innovations.",
        requirements: ["PhD in Materials Science", "Research experience", "Publication record"],
        salary: "₹10-16 LPA"
    },
    {
        id: 4,
        title: "Business Development Manager",
        department: "Sales & Marketing",
        category: "management",
        location: "Mumbai, India",
        type: "Full-time",
        description: "Drive business growth through strategic partnerships and market expansion initiatives. Manage key client relationships.",
        requirements: ["MBA in Marketing/Sales", "5+ years in business development", "Industry knowledge"],
        salary: "₹12-20 LPA"
    },
    {
        id: 5,
        title: "Process Engineer - Hot Rolling",
        department: "Engineering",
        category: "engineering",
        location: "Kalinganagar, India",
        type: "Full-time",
        description: "Optimize hot rolling processes and implement continuous improvement initiatives. Work with advanced automation systems.",
        requirements: ["BE/BTech in Mechanical/Metallurgy", "3+ years experience", "Process optimization skills"],
        salary: "₹8-14 LPA"
    },
    {
        id: 6,
        title: "Safety Manager",
        department: "Health & Safety",
        category: "management",
        location: "Jamshedpur, India",
        type: "Full-time",
        description: "Lead safety initiatives and ensure compliance with health and safety regulations across operations. Implement safety training programs.",
        requirements: ["Safety Management certification", "5+ years in industrial safety", "Regulatory knowledge"],
        salary: "₹10-16 LPA"
    },
    {
        id: 7,
        title: "Data Analyst - Production",
        department: "Digital & Analytics",
        category: "engineering",
        location: "Pune, India",
        type: "Full-time",
        description: "Analyze production data to optimize processes and drive data-driven decision making. Work with IoT sensors and analytics platforms.",
        requirements: ["BTech/MTech in relevant field", "Python/R programming", "Data visualization skills"],
        salary: "₹6-12 LPA"
    },
    {
        id: 8,
        title: "Graduate Engineer Trainee",
        department: "Engineering",
        category: "engineering",
        location: "Multiple Locations",
        type: "Graduate Program",
        description: "12-month comprehensive training program for fresh engineering graduates across various disciplines including rotations.",
        requirements: ["BE/BTech from recognized university", "Fresh graduates", "CGPA 7.0+"],
        salary: "₹4.5-6 LPA"
    },
    {
        id: 9,
        title: "Quality Control Specialist",
        department: "Quality Assurance",
        category: "engineering",
        location: "Jamshedpur, India",
        type: "Full-time",
        description: "Ensure product quality through rigorous testing and inspection procedures. Implement quality management systems.",
        requirements: ["Engineering degree", "Quality management knowledge", "ISO certification preferred"],
        salary: "₹5-10 LPA"
    },
    {
        id: 10,
        title: "Supply Chain Manager",
        department: "Operations",
        category: "management",
        location: "Kolkata, India",
        type: "Full-time",
        description: "Manage end-to-end supply chain operations including procurement, logistics, and vendor management.",
        requirements: ["MBA/Engineering", "Supply chain experience", "Vendor management skills"],
        salary: "₹12-18 LPA"
    }
];

// DOM Elements
const header = document.getElementById('header');
const jobGrid = document.getElementById('job-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('job-modal');
const modalClose = document.getElementById('modal-close');
const contactForm = document.getElementById('contact-form');
const applicationForm = document.getElementById('application-form');
const loading = document.getElementById('loading');
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    addSearchFunctionality();
    addFloatingActionButton();
    renderJobs();
    initializeAnimations();
    setupTypingEffect();
}

function setupEventListeners() {
    // Header scroll effect
    window.addEventListener('scroll', handleScroll);
    
    // Mobile menu toggle
    mobileMenu.addEventListener('click', toggleMobileMenu);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
    
    // Job filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', handleJobFilter);
    });
    
    // Modal controls
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', handleModalClick);
    
    // Form submissions
    contactForm.addEventListener('submit', handleContactForm);
    applicationForm.addEventListener('submit', handleApplicationForm);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
}

function handleScroll() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Update FAB visibility
    const fab = document.querySelector('.fab');
    if (fab) {
        if (window.scrollY > window.innerHeight) {
            fab.classList.add('visible');
        } else {
            fab.classList.remove('visible');
        }
    }
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    // Animate hamburger menu
    if (navMenu.classList.contains('active')) {
        mobileMenu.innerHTML = '✕';
    } else {
        mobileMenu.innerHTML = '☰';
    }
}

function handleSmoothScroll(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        // Close mobile menu if open
        navMenu.classList.remove('active');
        mobileMenu.innerHTML = '☰';
    }
}

function handleJobFilter(e) {
    // Update active filter
    filterBtns.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');

    // Filter jobs
    const filter = e.target.getAttribute('data-filter');
    const filteredJobs = filter === 'all' ? jobs : jobs.filter(job => job.category === filter);
    renderJobs(filteredJobs);
    
    // Clear search if active
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.value = '';
    }
}

function renderJobs(jobsToRender = jobs) {
    loading.style.display = 'block';
    jobGrid.innerHTML = '';
    
    setTimeout(() => {
        loading.style.display = 'none';
        
        if (jobsToRender.length === 0) {
            jobGrid.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: #666;">
                    <h3>No jobs found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }
        
        jobGrid.innerHTML = jobsToRender.map(job => `
            <div class="job-card" data-job-id="${job.id}">
                <div class="job-header">
                    <div>
                        <h3 class="job-title">${job.title}</h3>
                        <p class="job-department">${job.department}</p>
                        <p class="job-location">📍 ${job.location}</p>
                    </div>
                    <div style="text-align: right;">
                        <span class="job-type">${job.type}</span>
                        ${job.salary ? `<div style="color: #1e3c72; font-weight: 500; margin-top: 0.5rem; font-size: 0.9rem;">${job.salary}</div>` : ''}
                    </div>
                </div>
                <p class="job-description">${job.description}</p>
                <button class="btn btn-primary" style="margin-top: 1rem;" onclick="openJobModal(${job.id})">
                    Apply Now
                </button>
            </div>
        `).join('');
        
        // Re-initialize animations for new elements
        initializeJobCardAnimations();
    }, 500);
}

function openJobModal(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
        document.getElementById('modal-job-title').textContent = job.title;
        
        let modalContent = `
            <strong>Department:</strong> ${job.department}<br>
            <strong>Location:</strong> ${job.location}<br>
            <strong>Type:</strong> ${job.type}<br>
            ${job.salary ? `<strong>Salary:</strong> ${job.salary}<br>` : ''}
            <br>
            <strong>Description:</strong><br>
            ${job.description}
        `;
        
        if (job.requirements) {
            modalContent += `
                <br><br>
                <strong>Requirements:</strong>
                <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
                    ${job.requirements.map(req => `<li>${req}</li>`).join('')}
                </ul>
            `;
        }
        
        document.getElementById('modal-job-description').innerHTML = modalContent;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    applicationForm.reset();
}

function handleModalClick(e) {
    if (e.target === modal) {
        closeModal();
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Validate form
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    if (!validateEmail(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        return;
    }

    // Simulate form submission
    setTimeout(() => {
        showNotification('Thank you for your interest! We will get back to you soon.', 'success');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1000);
}

function handleApplicationForm(e) {
    e.preventDefault();
    
    const submitBtn = applicationForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    // Validate form
    const name = document.getElementById('applicant-name').value;
    const email = document.getElementById('applicant-email').value;
    const resume = document.getElementById('resume').files[0];
    
    if (!name || !email || !resume) {
        showNotification('Please fill in all required fields', 'error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        return;
    }
    
    if (resume && !resume.name.toLowerCase().endsWith('.pdf')) {
        showNotification('Please upload a PDF file for your resume', 'error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        return;
    }

    // Simulate application submission
    setTimeout(() => {
        showNotification('Application submitted successfully! We will review your application and get back to you soon.', 'success');
        applicationForm.reset();
        closeModal();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function handleKeyboard(e) {
    // Close modal with Escape key
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
    
    // Quick search with Ctrl+F or Cmd+F
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.focus();
        }
    }
}

function addSearchFunctionality() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'search-input';
    searchInput.placeholder = 'Search jobs by title, location, department, or salary...';
    
    const searchIcon = document.createElement('span');
    searchIcon.innerHTML = '🔍';
    searchIcon.className = 'search-icon';
    
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchIcon);
    
    const jobSection = document.querySelector('.job-filters');
    jobSection.parentNode.insertBefore(searchContainer, jobSection);
    
    // Search functionality with debouncing
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredJobs = jobs.filter(job => 
                job.title.toLowerCase().includes(searchTerm) ||
                job.location.toLowerCase().includes(searchTerm) ||
                job.department.toLowerCase().includes(searchTerm) ||
                job.description.toLowerCase().includes(searchTerm) ||
                (job.salary && job.salary.toLowerCase().includes(searchTerm))
            );
            renderJobs(filteredJobs);
            
            // Reset filters
            filterBtns.forEach(btn => btn.classList.remove('active'));
            document.querySelector('[data-filter="all"]').classList.add('active');
        }, 300);
    });
    
    // Search input focus effects
    searchInput.addEventListener('focus', () => {
        searchContainer.style.transform = 'scale(1.02)';
    });
    
    searchInput.addEventListener('blur', () => {
        searchContainer.style.transform = 'scale(1)';
    });
}

function addFloatingActionButton() {
    const fab = document.createElement('div');
    fab.innerHTML = '💼';
    fab.className = 'fab';
    fab.title = 'View All Jobs';
    
    document.body.appendChild(fab);
    
    // FAB click action
    fab.addEventListener('click', () => {
        document.getElementById('jobs').scrollIntoView({ behavior: 'smooth' });
    });
}

function initializeAnimations() {
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

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.opportunity-card, .culture-item, .step');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function initializeJobCardAnimations() {
    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function setupTypingEffect() {
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    window.addEventListener('load', () => {
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 50);
        }
    });
}

// Interactive hover effects for cards
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.opportunity-card, .job-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const xPercent = (x / rect.width - 0.5) * 2;
            const yPercent = (y / rect.height - 0.5) * 2;
            
            card.style.transform = `perspective(1000px) rotateX(${yPercent * 2}deg) rotateY(${xPercent * 2}deg) translateZ(10px)`;
        }
    });
});

// Reset card transforms when mouse leaves
document.addEventListener('mouseleave', () => {
    const cards = document.querySelectorAll('.opportunity-card, .job-card');
    cards.forEach(card => {
        card.style.transform = '';
    });
});

// Utility functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 3000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        ">
            ${message}
            <span onclick="this.parentElement.parentElement.remove()" style="
                float: right;
                margin-left: 1rem;
                cursor: pointer;
                font-weight: bold;
                opacity: 0.8;
            ">&times;</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification) {
            notification.remove();
        }
    }, 5000);
}
}

// Add slide in animation for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Advanced job filtering with multiple criteria
function createAdvancedFilter() {
    const advancedFilterContainer = document.createElement('div');
    advancedFilterContainer.style.cssText = `
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        margin-bottom: 2rem;
        border: 1px solid #e0e0e0;
    `;
    
    advancedFilterContainer.innerHTML = `
        <h4 style="margin-bottom: 1rem; color: #333;">Advanced Filters</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
            <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #555;">Location</label>
                <select id="location-filter" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                    <option value="">All Locations</option>
                    <option value="jamshedpur">Jamshedpur</option>
                    <option value="kalinganagar">Kalinganagar</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="pune">Pune</option>
                    <option value="kolkata">Kolkata</option>
                </select>
            </div>
            <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #555;">Experience Level</label>
                <select id="experience-filter" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                    <option value="">All Levels</option>
                    <option value="fresher">Fresher (0-2 years)</option>
                    <option value="mid">Mid-level (2-5 years)</option>
                    <option value="senior">Senior (5+ years)</option>
                </select>
            </div>
            <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #555;">Job Type</label>
                <select id="type-filter" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                    <option value="">All Types</option>
                    <option value="full-time">Full-time</option>
                    <option value="graduate program">Graduate Program</option>
                </select>
            </div>
            <div style="display: flex; align-items: end;">
                <button onclick="clearAllFilters()" style="
                    background: #f44336; 
                    color: white; 
                    border: none; 
                    padding: 8px 16px; 
                    border-radius: 4px; 
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: background 0.3s ease;
                ">Clear Filters</button>
            </div>
        </div>
    `;
    
    const jobSection = document.querySelector('.job-filters');
    jobSection.parentNode.insertBefore(advancedFilterContainer, jobSection.nextSibling);
    
    // Add event listeners for advanced filters
    document.getElementById('location-filter').addEventListener('change', applyAdvancedFilters);
    document.getElementById('experience-filter').addEventListener('change', applyAdvancedFilters);
    document.getElementById('type-filter').addEventListener('change', applyAdvancedFilters);
}

function applyAdvancedFilters() {
    const locationFilter = document.getElementById('location-filter').value.toLowerCase();
    const experienceFilter = document.getElementById('experience-filter').value;
    const typeFilter = document.getElementById('type-filter').value.toLowerCase();
    
    let filteredJobs = jobs.filter(job => {
        const locationMatch = !locationFilter || job.location.toLowerCase().includes(locationFilter);
        const typeMatch = !typeFilter || job.type.toLowerCase().includes(typeFilter);
        
        let experienceMatch = true;
        if (experienceFilter) {
            const jobTitle = job.title.toLowerCase();
            const jobDesc = job.description.toLowerCase();
            
            switch (experienceFilter) {
                case 'fresher':
                    experienceMatch = jobTitle.includes('graduate') || jobTitle.includes('trainee') || 
                                    jobDesc.includes('fresh') || jobDesc.includes('0-2 years');
                    break;
                case 'mid':
                    experienceMatch = jobDesc.includes('3+') || jobDesc.includes('2-5') || 
                                    jobDesc.includes('mid-level');
                    break;
                case 'senior':
                    experienceMatch = jobDesc.includes('5+') || jobDesc.includes('senior') || 
                                    jobTitle.includes('manager') || jobTitle.includes('lead');
                    break;
            }
        }
        
        return locationMatch && experienceMatch && typeMatch;
    });
    
    renderJobs(filteredJobs);
    
    // Reset category filters
    filterBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-filter="all"]').classList.add('active');
}

function clearAllFilters() {
    document.getElementById('location-filter').value = '';
    document.getElementById('experience-filter').value = '';
    document.getElementById('type-filter').value = '';
    
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.value = '';
    }
    
    filterBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-filter="all"]').classList.add('active');
    
    renderJobs(jobs);
    showNotification('All filters cleared', 'info');
}

// Job bookmarking functionality
let bookmarkedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];

function toggleBookmark(jobId) {
    const index = bookmarkedJobs.indexOf(jobId);
    if (index > -1) {
        bookmarkedJobs.splice(index, 1);
        showNotification('Job removed from bookmarks', 'info');
    } else {
        bookmarkedJobs.push(jobId);
        showNotification('Job bookmarked successfully', 'success');
    }
    
    localStorage.setItem('bookmarkedJobs', JSON.stringify(bookmarkedJobs));
    updateBookmarkButtons();
}

function updateBookmarkButtons() {
    const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
    bookmarkBtns.forEach(btn => {
        const jobId = parseInt(btn.dataset.jobId);
        if (bookmarkedJobs.includes(jobId)) {
            btn.innerHTML = '❤️';
            btn.style.color = '#f44336';
        } else {
            btn.innerHTML = '🤍';
            btn.style.color = '#ccc';
        }
    });
}

// Enhanced job card rendering with bookmark functionality
function renderJobsWithBookmarks(jobsToRender = jobs) {
    loading.style.display = 'block';
    jobGrid.innerHTML = '';
    
    setTimeout(() => {
        loading.style.display = 'none';
        
        if (jobsToRender.length === 0) {
            jobGrid.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: #666;">
                    <h3>No jobs found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }
        
        jobGrid.innerHTML = jobsToRender.map(job => `
            <div class="job-card" data-job-id="${job.id}">
                <div class="job-header">
                    <div>
                        <h3 class="job-title">${job.title}</h3>
                        <p class="job-department">${job.department}</p>
                        <p class="job-location">📍 ${job.location}</p>
                    </div>
                    <div style="text-align: right; position: relative;">
                        <button class="bookmark-btn" data-job-id="${job.id}" onclick="toggleBookmark(${job.id})" style="
                            background: none;
                            border: none;
                            font-size: 1.5rem;
                            cursor: pointer;
                            position: absolute;
                            top: -10px;
                            right: -10px;
                            padding: 5px;
                            transition: transform 0.2s ease;
                        ">🤍</button>
                        <span class="job-type">${job.type}</span>
                        ${job.salary ? `<div style="color: #1e3c72; font-weight: 500; margin-top: 0.5rem; font-size: 0.9rem;">${job.salary}</div>` : ''}
                    </div>
                </div>
                <p class="job-description">${job.description}</p>
                <div style="display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap;">
                    <button class="btn btn-primary" onclick="openJobModal(${job.id})">
                        Apply Now
                    </button>
                    <button class="btn btn-secondary" onclick="shareJob(${job.id})" style="
                        background: transparent;
                        color: #1e3c72;
                        border: 2px solid #1e3c72;
                        padding: 8px 16px;
                        font-size: 0.9rem;
                    ">
                        Share
                    </button>
                </div>
            </div>
        `).join('');
        
        updateBookmarkButtons();
        initializeJobCardAnimations();
    }, 500);
}

// Job sharing functionality
function shareJob(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
        const shareData = {
            title: `${job.title} - Tata Steel Careers`,
            text: `Check out this job opportunity: ${job.title} at ${job.location}`,
            url: `${window.location.href}#job-${job.id}`
        };
        
        if (navigator.share) {
            navigator.share(shareData);
        } else {
            // Fallback for browsers that don't support Web Share API
            const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
            navigator.clipboard.writeText(shareText).then(() => {
                showNotification('Job link copied to clipboard!', 'success');
            });
        }
    }
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', () => {
    // Override the original renderJobs function
    window.renderJobs = renderJobsWithBookmarks;
    
    // Add advanced filters after a short delay
    setTimeout(() => {
        createAdvancedFilter();
    }, 1000);
});

// Performance optimization: Lazy loading for job cards
function setupLazyLoading() {
    const observerOptions = {
        rootMargin: '100px 0px',
        threshold: 0.1
    };
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const jobCard = entry.target;
                jobCard.classList.add('loaded');
                imageObserver.unobserve(jobCard);
            }
        });
    }, observerOptions);
    
    // Observe all job cards
    document.querySelectorAll('.job-card').forEach(card => {
        imageObserver.observe(card);
    });
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }
    
    // Ctrl/Cmd + B to show bookmarked jobs
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        showBookmarkedJobs();
    }
});

function showBookmarkedJobs() {
    if (bookmarkedJobs.length === 0) {
        showNotification('No bookmarked jobs found', 'info');
        return;
    }
    
    const bookmarkedJobsList = jobs.filter(job => bookmarkedJobs.includes(job.id));
    renderJobs(bookmarkedJobsList);
    
    // Reset filters
    filterBtns.forEach(btn => btn.classList.remove('active'));
    
    showNotification(`Showing ${bookmarkedJobsList.length} bookmarked jobs`, 'success');
}

// Analytics and tracking (simulation)
function trackJobView(jobId) {
    // Simulate analytics tracking
    console.log(`Job viewed: ${jobId}`);
    
    // Store in localStorage for demo purposes
    let jobViews = JSON.parse(localStorage.getItem('jobViews')) || {};
    jobViews[jobId] = (jobViews[jobId] || 0) + 1;
    localStorage.setItem('jobViews', JSON.stringify(jobViews));
}

function trackJobApplication(jobId) {
    console.log(`Job application started: ${jobId}`);
    
    let jobApplications = JSON.parse(localStorage.getItem('jobApplications')) || [];
    jobApplications.push({
        jobId,
        timestamp: Date.now()
    });
    localStorage.setItem('jobApplications', JSON.stringify(jobApplications));
}

// Enhanced modal with tracking
const originalOpenJobModal = window.openJobModal;
window.openJobModal = function(jobId) {
    trackJobView(jobId);
    originalOpenJobModal(jobId);
};

// Add application tracking to the application form
const originalHandleApplicationForm = handleApplicationForm;
window.handleApplicationForm = function(e) {
    const jobTitle = document.getElementById('modal-job-title').textContent;
    const job = jobs.find(j => j.title === jobTitle);
    if (job) {
        trackJobApplication(job.id);
    }
    originalHandleApplicationForm(e);
};

// Error handling and retry mechanism
function withRetry(fn, maxRetries = 3) {
    return function(...args) {
        let retries = 0;
        
        function attempt() {
            try {
                return fn.apply(this, args);
            } catch (error) {
                if (retries < maxRetries) {
                    retries++;
                    console.warn(`Attempt ${retries} failed, retrying...`, error);
                    setTimeout(attempt, 1000 * retries);
                } else {
                    console.error('Max retries reached:', error);
                    showNotification('Something went wrong. Please try again.', 'error');
                }
            }
        }
        
        return attempt();
    };
}

// Service Worker registration for offline support (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for global access
window.openJobModal = openJobModal;
window.toggleBookmark = toggleBookmark;
window.shareJob = shareJob;
window.clearAllFilters = clearAllFilters;