// Districts Page JavaScript

// Districts filtering and management
class DistrictsManager {
    constructor() {
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.bindEvents();
        this.addAnimations();
        this.updateCounts();
    }

    bindEvents() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterDistricts(e.target.dataset.filter);
                this.updateActiveFilter(e.target);
            });
        });

        // Add hover effects to district cards
        const districtCards = document.querySelectorAll('.district-card-mini');
        districtCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (!card.closest('.coming-soon')) {
                    card.style.transform = 'translateY(-8px)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    filterDistricts(filter) {
        this.currentFilter = filter;
        const districtItems = document.querySelectorAll('.district-item');
        
        districtItems.forEach(item => {
            const category = item.dataset.category;
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                item.style.display = 'none';
            }
        });

        this.updateCounts();
    }

    updateActiveFilter(activeBtn) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    updateCounts() {
        const availableCount = document.querySelectorAll('.district-item.available').length;
        const comingSoonCount = document.querySelectorAll('.district-item.coming-soon').length;
        const totalCount = availableCount + comingSoonCount;

        // Update progress bar
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (progressFill && progressText) {
            const percentage = (availableCount / totalCount) * 100;
            progressFill.style.width = `${percentage}%`;
            progressText.textContent = `${availableCount} of ${totalCount} districts available`;
        }
    }

    addAnimations() {
        // Animate district cards on scroll
        const districtItems = document.querySelectorAll('.district-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        districtItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `opacity 0.6s ease-out ${index * 0.05}s, transform 0.6s ease-out ${index * 0.05}s`;
            observer.observe(item);
        });
    }
}

// Add districts-specific CSS
const districtsCSS = `
/* Districts Hero */
.districts-hero {
    position: relative;
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.districts-hero .hero-bg {
    position: absolute;
    inset: 0;
}

.districts-hero .hero-bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.districts-hero .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.6), rgba(17, 24, 39, 0.8));
}

.districts-hero .hero-content {
    position: relative;
    z-index: 10;
    text-align: center;
    color: white;
    padding: var(--spacing-4);
}

.districts-hero .hero-title {
    font-family: var(--font-display);
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: var(--spacing-4);
}

.districts-hero .hero-description {
    font-size: 1.25rem;
    color: #e5e7eb;
    max-width: 48rem;
    margin: 0 auto;
}

/* All Districts Section */
.all-districts-section {
    padding: var(--spacing-16) 0;
}

.districts-filter {
    display: flex;
    justify-content: center;
    gap: var(--spacing-4);
    margin-bottom: var(--spacing-12);
    flex-wrap: wrap;
}

.filter-btn {
    padding: var(--spacing-2) var(--spacing-6);
    background: var(--bg-primary);
    border: 2px solid var(--border-color);
    border-radius: 9999px;
    color: var(--text-secondary);
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-normal);
}

.filter-btn:hover,
.filter-btn.active {
    background: var(--primary-500);
    border-color: var(--primary-500);
    color: white;
    transform: translateY(-2px);
}

/* Districts Grid */
.all-districts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-6);
    margin-bottom: var(--spacing-16);
}

.district-item {
    transition: all var(--transition-normal);
}

.district-card-mini {
    background: var(--bg-primary);
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    transition: all var(--transition-normal);
    height: 100%;
    display: flex;
    flex-direction: column;
}

.district-card-mini:hover {
    box-shadow: var(--shadow-xl);
}

.district-image-mini {
    position: relative;
    height: 200px;
    overflow: hidden;
}

.district-image-mini img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-slow);
}

.district-card-mini:hover .district-image-mini img {
    transform: scale(1.05);
}

.coming-soon-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 2rem;
}

.district-content-mini {
    padding: var(--spacing-4);
    flex: 1;
    display: flex;
    flex-direction: column;
}

.district-name-mini {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--spacing-2);
}

.district-desc-mini {
    color: var(--text-secondary);
    font-size: 0.875rem;
    margin-bottom: var(--spacing-4);
    flex: 1;
}

.district-status {
    display: flex;
    align-items: center;
    gap: var(--spacing-1);
    margin-bottom: var(--spacing-4);
    font-size: 0.875rem;
    font-weight: 500;
}

.available-status {
    color: #059669;
}

.coming-soon-status {
    color: #d97706;
}

[data-theme="dark"] .available-status {
    color: #34d399;
}

[data-theme="dark"] .coming-soon-status {
    color: #fbbf24;
}

.district-link-mini {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-2) var(--spacing-4);
    background: var(--primary-500);
    color: white;
    text-decoration: none;
    border-radius: 0.5rem;
    font-weight: 500;
    transition: all var(--transition-normal);
    border: none;
    cursor: pointer;
    font-size: 0.875rem;
}

.district-link-mini:hover {
    background: var(--primary-600);
    transform: translateY(-2px);
}

.district-link-mini.disabled {
    background: var(--gray-400);
    cursor: not-allowed;
    transform: none;
}

.district-link-mini.disabled:hover {
    background: var(--gray-400);
    transform: none;
}

[data-theme="dark"] .district-link-mini.disabled {
    background: var(--gray-600);
}

/* Coming Soon Notice */
.coming-soon-notice {
    background: linear-gradient(135deg, var(--primary-50), var(--secondary-50));
    border-radius: 1.5rem;
    padding: var(--spacing-8);
    text-align: center;
    border: 1px solid var(--border-color);
}

[data-theme="dark"] .coming-soon-notice {
    background: linear-gradient(135deg, rgba(255, 107, 53, 0.05), rgba(59, 130, 246, 0.05));
}

.notice-content {
    max-width: 32rem;
    margin: 0 auto;
}

.notice-content i {
    font-size: 3rem;
    color: var(--primary-500);
    margin-bottom: var(--spacing-4);
}

.notice-content h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--spacing-3);
}

.notice-content p {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-6);
    line-height: 1.6;
}

.progress-info {
    /* No additional styles needed */
}

.progress-bar {
    width: 100%;
    height: 0.5rem;
    background: var(--gray-200);
    border-radius: 9999px;
    overflow: hidden;
    margin-bottom: var(--spacing-2);
}

[data-theme="dark"] .progress-bar {
    background: var(--gray-700);
}

.progress-fill {
    height: 100%;
    background: linear-gradient(to right, var(--primary-500), var(--secondary-500));
    border-radius: 9999px;
    transition: width 0.5s ease-in-out;
}

.progress-text {
    font-size: 0.875rem;
    color: var(--text-secondary);
    font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
    .districts-hero .hero-title {
        font-size: 2rem;
    }
    
    .all-districts-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-4);
    }
    
    .districts-filter {
        gap: var(--spacing-2);
    }
    
    .filter-btn {
        padding: var(--spacing-1) var(--spacing-4);
        font-size: 0.875rem;
    }
    
    .coming-soon-notice {
        padding: var(--spacing-6);
    }
    
    .notice-content i {
        font-size: 2rem;
    }
    
    .notice-content h3 {
        font-size: 1.25rem;
    }
}

@media (max-width: 480px) {
    .all-districts-grid {
        grid-template-columns: 1fr;
    }
    
    .district-image-mini {
        height: 160px;
    }
    
    .district-content-mini {
        padding: var(--spacing-3);
    }
}
`;

// Inject districts CSS
const districtsStyle = document.createElement('style');
districtsStyle.textContent = districtsCSS;
document.head.appendChild(districtsStyle);

// Initialize districts page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DistrictsManager();
});