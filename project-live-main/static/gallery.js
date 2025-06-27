// Gallery Page JavaScript

// Gallery functionality
class GalleryManager {
    constructor() {
        this.currentFilter = 'all';
        this.currentImageIndex = 0;
        this.images = [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupImageModal();
        this.loadImages();
    }

    bindEvents() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterImages(e.target.dataset.filter);
                this.updateActiveFilter(e.target);
            });
        });

        // Gallery expand buttons
        const expandButtons = document.querySelectorAll('.gallery-expand');
        expandButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const imageSrc = btn.dataset.src;
                this.openImageModal(imageSrc);
            });
        });

        // Gallery items click
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const expandBtn = item.querySelector('.gallery-expand');
                const imageSrc = expandBtn.dataset.src;
                this.openImageModal(imageSrc, index);
            });
        });
    }

    filterImages(filter) {
        this.currentFilter = filter;
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            const category = item.dataset.category;
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                item.style.display = 'none';
            }
        });
    }

    updateActiveFilter(activeBtn) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    loadImages() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        this.images = Array.from(galleryItems).map(item => {
            const expandBtn = item.querySelector('.gallery-expand');
            const img = item.querySelector('img');
            const info = item.querySelector('.gallery-info');
            
            return {
                src: expandBtn.dataset.src,
                alt: img.alt,
                title: info.querySelector('h3').textContent,
                location: info.querySelector('p').textContent
            };
        });
    }

    setupImageModal() {
        const modal = document.getElementById('imageModal');
        const modalClose = document.getElementById('modalClose');
        const modalPrev = document.getElementById('modalPrev');
        const modalNext = document.getElementById('modalNext');
        const modalBackdrop = modal.querySelector('.modal-backdrop');

        // Close modal events
        modalClose.addEventListener('click', () => this.closeImageModal());
        modalBackdrop.addEventListener('click', () => this.closeImageModal());
        
        // Navigation events
        modalPrev.addEventListener('click', () => this.previousImage());
        modalNext.addEventListener('click', () => this.nextImage());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (modal.classList.contains('active')) {
                switch(e.key) {
                    case 'Escape':
                        this.closeImageModal();
                        break;
                    case 'ArrowLeft':
                        this.previousImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        break;
                }
            }
        });
    }

    openImageModal(imageSrc, index = 0) {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        
        this.currentImageIndex = index;
        modalImage.src = imageSrc;
        modalImage.alt = this.images[index]?.alt || '';
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add loading state
        modalImage.style.opacity = '0';
        modalImage.onload = () => {
            modalImage.style.opacity = '1';
        };
    }

    closeImageModal() {
        const modal = document.getElementById('imageModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    previousImage() {
        const visibleImages = this.getVisibleImages();
        if (visibleImages.length > 1) {
            this.currentImageIndex = this.currentImageIndex > 0 
                ? this.currentImageIndex - 1 
                : visibleImages.length - 1;
            this.updateModalImage();
        }
    }

    nextImage() {
        const visibleImages = this.getVisibleImages();
        if (visibleImages.length > 1) {
            this.currentImageIndex = this.currentImageIndex < visibleImages.length - 1 
                ? this.currentImageIndex + 1 
                : 0;
            this.updateModalImage();
        }
    }

    getVisibleImages() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        return Array.from(galleryItems).filter(item => 
            item.style.display !== 'none' && 
            (this.currentFilter === 'all' || item.dataset.category === this.currentFilter)
        );
    }

    updateModalImage() {
        const modalImage = document.getElementById('modalImage');
        const visibleImages = this.getVisibleImages();
        
        if (visibleImages[this.currentImageIndex]) {
            const expandBtn = visibleImages[this.currentImageIndex].querySelector('.gallery-expand');
            const img = visibleImages[this.currentImageIndex].querySelector('img');
            
            modalImage.style.opacity = '0';
            modalImage.src = expandBtn.dataset.src;
            modalImage.alt = img.alt;
            
            modalImage.onload = () => {
                modalImage.style.opacity = '1';
            };
        }
    }
}

// Lazy loading for gallery images
class LazyLoader {
    constructor() {
        this.init();
    }

    init() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            images.forEach(img => this.loadImage(img));
        }
    }

    loadImage(img) {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in-out';
        
        const newImg = new Image();
        newImg.onload = () => {
            img.style.opacity = '1';
        };
        newImg.src = img.src;
    }
}

// Gallery animations
class GalleryAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.animateOnScroll();
        this.addHoverEffects();
    }

    animateOnScroll() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        galleryItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
            observer.observe(item);
        });
    }

    addHoverEffects() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'scale(1.02)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'scale(1)';
            });
        });
    }
}

// Add gallery-specific CSS
const galleryCSS = `
/* Gallery Hero */
.gallery-hero {
    position: relative;
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.gallery-hero .hero-bg {
    position: absolute;
    inset: 0;
}

.gallery-hero .hero-bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.gallery-hero .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.6), rgba(17, 24, 39, 0.8));
}

.gallery-hero .hero-content {
    position: relative;
    z-index: 10;
    text-align: center;
    color: white;
    padding: var(--spacing-4);
}

.gallery-hero .hero-title {
    font-family: var(--font-display);
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: var(--spacing-4);
}

.gallery-hero .hero-description {
    font-size: 1.25rem;
    color: #e5e7eb;
    max-width: 48rem;
    margin: 0 auto;
}

/* Gallery Filters */
.gallery-filters {
    padding: var(--spacing-8) 0;
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border-color);
}

.filter-buttons {
    display: flex;
    justify-content: center;
    gap: var(--spacing-4);
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

/* Gallery Grid */
.gallery-grid-section {
    padding: var(--spacing-12) 0;
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-6);
}

.gallery-item {
    position: relative;
    border-radius: 1rem;
    overflow: hidden;
    cursor: pointer;
    transition: all var(--transition-normal);
    background: var(--bg-primary);
    box-shadow: var(--shadow-lg);
}

.gallery-item:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
}

.gallery-item img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    transition: transform var(--transition-slow);
}

.gallery-item:hover img {
    transform: scale(1.05);
}

.gallery-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: var(--spacing-4);
    opacity: 0;
    transition: opacity var(--transition-normal);
}

.gallery-item:hover .gallery-overlay {
    opacity: 1;
}

.gallery-info h3 {
    color: white;
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: var(--spacing-1);
}

.gallery-info p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.875rem;
}

.gallery-expand {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--transition-normal);
}

.gallery-expand:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
}

/* Image Modal */
.image-modal {
    position: fixed;
    inset: 0;
    z-index: 60;
    display: none;
    align-items: center;
    justify-content: center;
}

.image-modal.active {
    display: flex;
}

.modal-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(5px);
}

.modal-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-close {
    position: absolute;
    top: -3rem;
    right: 0;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--transition-normal);
}

.modal-close:hover {
    background: rgba(255, 255, 255, 0.2);
}

#modalImage {
    max-width: 100%;
    max-height: 100%;
    border-radius: 0.5rem;
    transition: opacity var(--transition-normal);
}

.modal-nav {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-4);
    pointer-events: none;
}

.modal-prev,
.modal-next {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--transition-normal);
    pointer-events: auto;
}

.modal-prev:hover,
.modal-next:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
}

/* Responsive Design */
@media (max-width: 768px) {
    .gallery-hero .hero-title {
        font-size: 2rem;
    }
    
    .gallery-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-4);
    }
    
    .filter-buttons {
        gap: var(--spacing-2);
    }
    
    .filter-btn {
        padding: var(--spacing-1) var(--spacing-4);
        font-size: 0.875rem;
    }
}
`;

// Inject gallery CSS
const galleryStyle = document.createElement('style');
galleryStyle.textContent = galleryCSS;
document.head.appendChild(galleryStyle);

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GalleryManager();
    new LazyLoader();
    new GalleryAnimations();
});