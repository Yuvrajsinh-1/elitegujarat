// District Page Specific JavaScript

// Add district-specific styles
const districtCSS = `
/* District Hero */
.district-hero {
    position: relative;
    height: 32rem;
    overflow: hidden;
}

@media (min-width: 768px) {
    .district-hero {
        height: 40rem;
    }
}

.district-hero .hero-bg {
    position: absolute;
    inset: 0;
}

.district-hero .hero-bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.district-hero .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.6), rgba(17, 24, 39, 0.8));
}

.district-hero .hero-content {
    position: relative;
    z-index: 10;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    padding: var(--spacing-4);
}

.back-link {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-2);
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    margin-bottom: var(--spacing-4);
    transition: color var(--transition-normal);
}

.back-link:hover {
    color: white;
}

.district-hero .hero-title {
    font-family: var(--font-display);
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: var(--spacing-6);
}

@media (min-width: 768px) {
    .district-hero .hero-title {
        font-size: 3.75rem;
    }
}

@media (min-width: 1024px) {
    .district-hero .hero-title {
        font-size: 4.5rem;
    }
}

.district-hero .hero-description {
    font-size: 1.25rem;
    color: #e5e7eb;
    margin-bottom: var(--spacing-6);
    max-width: 48rem;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
}

@media (min-width: 768px) {
    .district-hero .hero-description {
        font-size: 1.5rem;
    }
}

.hero-tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--spacing-2);
}

.hero-tags .tag {
    padding: var(--spacing-1) var(--spacing-3);
    background: rgba(255, 107, 53, 0.2);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 107, 53, 0.3);
    color: rgba(255, 255, 255, 0.9);
    border-radius: 9999px;
    font-size: 0.875rem;
}

/* Quick Info */
.quick-info {
    padding: var(--spacing-8) 0;
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border-color);
    transition: background-color var(--transition-normal);
}

.info-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-6);
}

@media (min-width: 768px) {
    .info-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

.info-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
    color: var(--text-secondary);
}

.info-item i {
    font-size: 1.25rem;
    color: var(--primary-500);
}

.info-content {
    /* No additional styles needed */
}

.info-title {
    font-weight: 600;
    color: var(--text-primary);
}

.info-text {
    font-size: 0.875rem;
}

/* District Content */
.district-content {
    padding: var(--spacing-12) 0;
}

.content-section {
    margin-bottom: var(--spacing-16);
}

.content-section:last-child {
    margin-bottom: 0;
}

.content-section .section-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
    margin-bottom: var(--spacing-8);
}

.section-icon {
    /* No additional styles needed */
}

.section-icon i {
    font-size: 1.5rem;
    color: var(--primary-500);
}

.content-section .section-title {
    font-family: var(--font-display);
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
}

/* Attractions */
.attractions-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-8);
}

@media (min-width: 768px) {
    .attractions-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .attractions-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

.attraction-card {
    background: var(--bg-primary);
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    transition: all var(--transition-normal);
}

.attraction-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
}

.attraction-image {
    /* No additional styles needed */
}

.attraction-image img {
    width: 100%;
    height: 12rem;
    object-fit: cover;
}

.attraction-content {
    padding: var(--spacing-6);
}

.attraction-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--spacing-3);
}

.attraction-name {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
}

.attraction-rating {
    display: flex;
    align-items: center;
    gap: var(--spacing-1);
}

.attraction-rating i {
    color: #fbbf24;
}

.attraction-rating span {
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.attraction-description {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-4);
    font-size: 0.875rem;
    line-height: 1.6;
}

.attraction-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
}

.detail-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-1);
}

.detail-item i {
    color: var(--primary-600);
}

[data-theme="dark"] .detail-item i {
    color: var(--primary-400);
}

.entry-free {
    color: #059669;
    font-weight: 500;
}

[data-theme="dark"] .entry-free {
    color: #34d399;
}

.entry-paid {
    color: #d97706;
    font-weight: 500;
}

[data-theme="dark"] .entry-paid {
    color: #fbbf24;
}

/* Hotels */
.hotels-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-8);
}

@media (min-width: 768px) {
    .hotels-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

.hotel-card {
    background: var(--bg-primary);
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    transition: all var(--transition-normal);
}

.hotel-card:hover {
    box-shadow: var(--shadow-xl);
}

.hotel-image {
    /* No additional styles needed */
}

.hotel-image img {
    width: 100%;
    height: 12rem;
    object-fit: cover;
}

.hotel-content {
    padding: var(--spacing-6);
}

.hotel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--spacing-3);
}

.hotel-name {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
}

.hotel-rating {
    display: flex;
    align-items: center;
    gap: var(--spacing-1);
}

.hotel-rating i {
    color: #fbbf24;
}

.hotel-rating span {
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.hotel-description {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-4);
    font-size: 0.875rem;
    line-height: 1.6;
}

.hotel-amenities {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-4);
}

.amenity {
    padding: var(--spacing-1) var(--spacing-2);
    background: var(--primary-100);
    color: var(--primary-700);
    border-radius: var(--spacing-1);
    font-size: 0.75rem;
}

[data-theme="dark"] .amenity {
    background: rgba(255, 107, 53, 0.1);
    color: var(--primary-300);
}

.hotel-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.hotel-price {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--primary-600);
}

[data-theme="dark"] .hotel-price {
    color: var(--primary-400);
}

.hotel-contact {
    display: flex;
    align-items: center;
    gap: var(--spacing-1);
    color: var(--text-secondary);
    font-size: 0.875rem;
}

.hotel-contact i {
    color: var(--text-tertiary);
}

/* Restaurants */
.restaurants-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-8);
}

@media (min-width: 768px) {
    .restaurants-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

.restaurant-card {
    background: var(--bg-primary);
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    transition: all var(--transition-normal);
}

.restaurant-card:hover {
    box-shadow: var(--shadow-xl);
}

.restaurant-image {
    /* No additional styles needed */
}

.restaurant-image img {
    width: 100%;
    height: 12rem;
    object-fit: cover;
}

.restaurant-content {
    padding: var(--spacing-6);
}

.restaurant-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--spacing-3);
}

.restaurant-name {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
}

.restaurant-rating {
    display: flex;
    align-items: center;
    gap: var(--spacing-1);
}

.restaurant-rating i {
    color: #fbbf24;
}

.restaurant-rating span {
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.restaurant-description {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-4);
    font-size: 0.875rem;
    line-height: 1.6;
}

.restaurant-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
}

.restaurant-info {
    /* No additional styles needed */
}

.cuisine-type {
    color: var(--primary-600);
    font-weight: 500;
    margin-bottom: var(--spacing-1);
}

[data-theme="dark"] .cuisine-type {
    color: var(--primary-400);
}

.specialty {
    color: var(--text-secondary);
}

.price-range {
    color: #059669;
    font-weight: 500;
}

[data-theme="dark"] .price-range {
    color: #34d399;
}

/* Animation delays for staggered effect */
.attraction-card:nth-child(2) { animation-delay: 0.1s; }
.attraction-card:nth-child(3) { animation-delay: 0.2s; }

.hotel-card:nth-child(2) { animation-delay: 0.1s; }

.restaurant-card:nth-child(2) { animation-delay: 0.1s; }
`;

// Inject district-specific CSS
const districtStyle = document.createElement('style');
districtStyle.textContent = districtCSS;
document.head.appendChild(districtStyle);

// District Page Enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scroll to sections
    addSectionNavigation();
    
    // Add image lazy loading
    addLazyLoading();
    
    // Add interactive card effects
    addCardInteractions();
    
    // Add breadcrumb navigation
    addBreadcrumbs();
});

function addSectionNavigation() {
    // Create floating navigation for sections
    const sections = document.querySelectorAll('.content-section');
    if (sections.length > 0) {
        const nav = document.createElement('div');
        nav.className = 'section-nav';
        nav.innerHTML = `
            <div class="section-nav-content">
                <a href="#attractions" class="section-nav-link active">
                    <i class="fas fa-camera"></i>
                    <span>Attractions</span>
                </a>
                <a href="#hotels" class="section-nav-link">
                    <i class="fas fa-building"></i>
                    <span>Hotels</span>
                </a>
                <a href="#restaurants" class="section-nav-link">
                    <i class="fas fa-utensils"></i>
                    <span>Restaurants</span>
                </a>
            </div>
        `;
        
        // Add CSS for section navigation
        const navCSS = `
            .section-nav {
                position: fixed;
                top: 50%;
                right: 2rem;
                transform: translateY(-50%);
                z-index: 30;
                display: none;
            }
            
            @media (min-width: 1280px) {
                .section-nav {
                    display: block;
                }
            }
            
            .section-nav-content {
                background: var(--bg-primary);
                border-radius: 0.5rem;
                box-shadow: var(--shadow-lg);
                border: 1px solid var(--border-color);
                padding: var(--spacing-2);
            }
            
            .section-nav-link {
                display: flex;
                align-items: center;
                gap: var(--spacing-2);
                padding: var(--spacing-2) var(--spacing-3);
                color: var(--text-secondary);
                text-decoration: none;
                border-radius: 0.25rem;
                transition: all var(--transition-normal);
                font-size: 0.875rem;
                margin-bottom: var(--spacing-1);
            }
            
            .section-nav-link:last-child {
                margin-bottom: 0;
            }
            
            .section-nav-link:hover,
            .section-nav-link.active {
                background: var(--primary-50);
                color: var(--primary-600);
            }
            
            [data-theme="dark"] .section-nav-link:hover,
            [data-theme="dark"] .section-nav-link.active {
                background: rgba(255, 107, 53, 0.1);
                color: var(--primary-400);
            }
            
            .section-nav-link i {
                font-size: 1rem;
            }
        `;
        
        const navStyle = document.createElement('style');
        navStyle.textContent = navCSS;
        document.head.appendChild(navStyle);
        
        document.body.appendChild(nav);
        
        // Add IDs to sections
        sections.forEach((section, index) => {
            const sectionNames = ['attractions', 'hotels', 'restaurants'];
            section.id = sectionNames[index] || `section-${index}`;
        });
        
        // Handle navigation clicks
        nav.addEventListener('click', (e) => {
            if (e.target.closest('.section-nav-link')) {
                e.preventDefault();
                const link = e.target.closest('.section-nav-link');
                const targetId = link.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    
                    // Update active state
                    nav.querySelectorAll('.section-nav-link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
        
        // Update active state on scroll
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY + 100;
            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const navLinks = nav.querySelectorAll('.section-nav-link');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    if (navLinks[index]) {
                        navLinks[index].classList.add('active');
                    }
                }
            });
        });
    }
}

function addLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease-in-out';
                
                const newImg = new Image();
                newImg.onload = () => {
                    img.style.opacity = '1';
                };
                newImg.src = img.src;
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

function addCardInteractions() {
    // Add click-to-expand functionality for cards
    const cards = document.querySelectorAll('.attraction-card, .hotel-card, .restaurant-card');
    
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't expand if clicking on interactive elements
            if (e.target.closest('a, button')) return;
            
            card.classList.toggle('expanded');
            
            // Add expanded state CSS if not already added
            if (!document.querySelector('#card-expanded-css')) {
                const expandedCSS = `
                    .attraction-card.expanded,
                    .hotel-card.expanded,
                    .restaurant-card.expanded {
                        transform: scale(1.02);
                        z-index: 10;
                        position: relative;
                    }
                    
                    .attraction-card,
                    .hotel-card,
                    .restaurant-card {
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                `;
                
                const expandedStyle = document.createElement('style');
                expandedStyle.id = 'card-expanded-css';
                expandedStyle.textContent = expandedCSS;
                document.head.appendChild(expandedStyle);
            }
        });
    });
}

function addBreadcrumbs() {
    // Add breadcrumb navigation
    const breadcrumbHTML = `
        <nav class="breadcrumbs">
            <div class="container">
                <ol class="breadcrumb-list">
                    <li class="breadcrumb-item">
                        <a href="index.html">
                            <i class="fas fa-home"></i>
                            Home
                        </a>
                    </li>
                    <li class="breadcrumb-separator">
                        <i class="fas fa-chevron-right"></i>
                    </li>
                    <li class="breadcrumb-item">
                        <span>Districts</span>
                    </li>
                    <li class="breadcrumb-separator">
                        <i class="fas fa-chevron-right"></i>
                    </li>
                    <li class="breadcrumb-item active">
                        <span>Kutch</span>
                    </li>
                </ol>
            </div>
        </nav>
    `;
    
    // Insert breadcrumbs after header
    const header = document.querySelector('.header');
    if (header) {
        header.insertAdjacentHTML('afterend', breadcrumbHTML);
    }
    
    // Add breadcrumb CSS
    const breadcrumbCSS = `
        .breadcrumbs {
            background: var(--bg-secondary);
            border-bottom: 1px solid var(--border-color);
            padding: var(--spacing-3) 0;
            font-size: 0.875rem;
        }
        
        .breadcrumb-list {
            display: flex;
            align-items: center;
            gap: var(--spacing-2);
            list-style: none;
            margin: 0;
            padding: 0;
        }
        
        .breadcrumb-item {
            /* No additional styles needed */
        }
        
        .breadcrumb-item a {
            display: flex;
            align-items: center;
            gap: var(--spacing-1);
            color: var(--text-secondary);
            text-decoration: none;
            transition: color var(--transition-normal);
        }
        
        .breadcrumb-item a:hover {
            color: var(--primary-600);
        }
        
        [data-theme="dark"] .breadcrumb-item a:hover {
            color: var(--primary-400);
        }
        
        .breadcrumb-item.active span {
            color: var(--text-primary);
            font-weight: 500;
        }
        
        .breadcrumb-separator {
            color: var(--text-tertiary);
            font-size: 0.75rem;
        }
    `;
    
    const breadcrumbStyle = document.createElement('style');
    breadcrumbStyle.textContent = breadcrumbCSS;
    document.head.appendChild(breadcrumbStyle);
}