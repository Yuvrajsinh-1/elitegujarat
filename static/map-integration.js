// Map Integration for Location Services

class MapIntegration {
    constructor() {
        this.init();
    }

    init() {
        // Initialize map functionality
        this.setupMapButtons();
        this.setupLocationServices();
    }

    setupMapButtons() {
        // Add event listeners for map buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.map-btn') || e.target.closest('.location-btn')) {
                e.preventDefault();
                const button = e.target.closest('.map-btn') || e.target.closest('.location-btn');
                const location = button.dataset.location || button.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
                
                if (location) {
                    this.openLocationMap(location);
                }
            }
        });
    }

    setupLocationServices() {
        // Setup geolocation services
        this.userLocation = null;
        this.getUserLocation();
    }

    getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    console.log('User location obtained:', this.userLocation);
                },
                (error) => {
                    console.log('Geolocation error:', error.message);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 600000
                }
            );
        }
    }

    openLocationMap(location, coordinates = null) {
        // Create and show map modal
        this.showMapModal(location, coordinates);
    }

    showMapModal(location, coordinates) {
        // Remove existing modal if any
        const existingModal = document.getElementById('mapModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Create map modal
        const modal = document.createElement('div');
        modal.id = 'mapModal';
        modal.className = 'map-modal';
        modal.innerHTML = `
            <div class="map-modal-content">
                <div class="map-modal-header">
                    <h3>Location: ${location}</h3>
                    <button class="map-modal-close" onclick="closeMapModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="map-modal-body">
                    <div class="map-options">
                        <button class="map-option-btn" onclick="openGoogleMaps('${location}')">
                            <i class="fab fa-google"></i>
                            <span>Open in Google Maps</span>
                        </button>
                        <button class="map-option-btn" onclick="openAppleMaps('${location}')">
                            <i class="fas fa-map"></i>
                            <span>Open in Apple Maps</span>
                        </button>
                        <button class="map-option-btn" onclick="getDirections('${location}')">
                            <i class="fas fa-directions"></i>
                            <span>Get Directions</span>
                        </button>
                        <button class="map-option-btn" onclick="shareLocation('${location}')">
                            <i class="fas fa-share"></i>
                            <span>Share Location</span>
                        </button>
                    </div>
                    <div class="map-embed">
                        <iframe 
                           
                            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBnc8Wn661rHKFKKJvMalGsz-re5YBLFis&q=${encodeURIComponent(location)}"

                            width="100%" 
                            height="300" 
                            style="border:0;" 
                            allowfullscreen="" 
                            loading="lazy" 
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                    <div class="location-info">
                        <div class="info-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${location}</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-clock"></i>
                            <span>Best visited during daylight hours</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-info-circle"></i>
                            <span>Check local timings before visiting</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Add animation
        setTimeout(() => {
            modal.querySelector('.map-modal-content').style.transform = 'scale(1)';
            modal.querySelector('.map-modal-content').style.opacity = '1';
        }, 10);
    }

    closeMapModal() {
        const modal = document.getElementById('mapModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    openGoogleMaps(location) {
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
        window.open(url, '_blank');
    }

    openAppleMaps(location) {
        const url = `https://maps.apple.com/?q=${encodeURIComponent(location)}`;
        window.open(url, '_blank');
    }

    getDirections(location) {
        if (this.userLocation) {
            const url = `https://www.google.com/maps/dir/${this.userLocation.lat},${this.userLocation.lng}/${encodeURIComponent(location)}`;
            window.open(url, '_blank');
        } else {
            const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location)}`;
            window.open(url, '_blank');
        }
    }

    shareLocation(location) {
        if (navigator.share) {
            navigator.share({
                title: `Location: ${location}`,
                text: `Check out this location in Gujarat: ${location}`,
                url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`
            });
        } else {
            // Fallback to copying to clipboard
            const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
            navigator.clipboard.writeText(url).then(() => {
                this.showToast('Location link copied to clipboard!');
            });
        }
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

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

// Global functions for onclick handlers
function openLocationMap(location, coordinates = null) {
    window.mapIntegration.openLocationMap(location, coordinates);
}

function closeMapModal() {
    window.mapIntegration.closeMapModal();
}

function openGoogleMaps(location) {
    window.mapIntegration.openGoogleMaps(location);
}

function openAppleMaps(location) {
    window.mapIntegration.openAppleMaps(location);
}

function getDirections(location) {
    window.mapIntegration.getDirections(location);
}

function shareLocation(location) {
    window.mapIntegration.shareLocation(location);
}

// Initialize map integration when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.mapIntegration = new MapIntegration();
});

// Add map-specific CSS
const mapCSS = `
/* Map Modal Styles */
.map-modal {
    position: fixed;
    inset: 0;
    z-index: 60;
    background: rgba(0, 0, 0, 0.8);
    display: none;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-4);
    overflow-y: auto;
}

.map-modal.active {
    display: flex;
    animation: fadeIn 0.3s ease-out;
}

.map-modal-content {
    width: 100%;
    max-width: 48rem;
    background: var(--bg-primary);
    border-radius: 1rem;
    box-shadow: var(--shadow-2xl);
    transform: scale(0.9);
    opacity: 0;
    transition: all 0.3s ease-out;
    max-height: 90vh;
    overflow-y: auto;
}

.map-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-4);
    border-bottom: 1px solid var(--border-color);
}

.map-modal-header h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
}

.map-modal-close {
    background: none;
    border: none;
    padding: var(--spacing-2);
    color: var(--text-tertiary);
    cursor: pointer;
    border-radius: 0.5rem;
    transition: all var(--transition-normal);
}

.map-modal-close:hover {
    color: var(--text-secondary);
    background: var(--bg-tertiary);
}

.map-modal-body {
    padding: var(--spacing-4);
}

.map-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-3);
    margin-bottom: var(--spacing-4);
}

.map-option-btn {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    padding: var(--spacing-3);
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    color: var(--text-primary);
    text-decoration: none;
    cursor: pointer;
    transition: all var(--transition-normal);
    font-size: 0.875rem;
}

.map-option-btn:hover {
    background: var(--primary-50);
    border-color: var(--primary-200);
    color: var(--primary-600);
    transform: translateY(-2px);
}

[data-theme="dark"] .map-option-btn:hover {
    background: rgba(255, 107, 53, 0.1);
    border-color: rgba(255, 107, 53, 0.3);
    color: var(--primary-400);
}

.map-option-btn i {
    font-size: 1rem;
}

.map-embed {
    border-radius: 0.5rem;
    overflow: hidden;
    margin-bottom: var(--spacing-4);
    box-shadow: var(--shadow-md);
}

.map-embed iframe {
    width: 100%;
    height: 300px;
    border: none;
}

.location-info {
    background: var(--bg-secondary);
    border-radius: 0.5rem;
    padding: var(--spacing-4);
}

.location-info .info-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-2);
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.location-info .info-item:last-child {
    margin-bottom: 0;
}

.location-info .info-item i {
    color: var(--primary-500);
    width: 1rem;
    text-align: center;
}

/* Map Button Styles */
.map-btn {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    padding: var(--spacing-2) var(--spacing-4);
    background: var(--secondary-500);
    color: white;
    border: none;
    border-radius: 0.5rem;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-normal);
}

.map-btn:hover {
    background: var(--secondary-600);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.map-btn i {
    font-size: 0.875rem;
}

/* District Actions */
.district-actions {
    display: flex;
    gap: var(--spacing-3);
    flex-wrap: wrap;
}

.district-btn {
    flex: 1;
    min-width: 140px;
}

.map-btn {
    flex: 0 0 auto;
}

/* Location Button for Attractions */
.location-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-1);
    padding: var(--spacing-1) var(--spacing-2);
    background: var(--secondary-100);
    color: var(--secondary-700);
    border: none;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    cursor: pointer;
    transition: all var(--transition-normal);
}

.location-btn:hover {
    background: var(--secondary-200);
    color: var(--secondary-800);
}

[data-theme="dark"] .location-btn {
    background: rgba(59, 130, 246, 0.1);
    color: var(--secondary-400);
}

[data-theme="dark"] .location-btn:hover {
    background: rgba(59, 130, 246, 0.2);
    color: var(--secondary-300);
}

/* Toast Notification */
.toast {
    position: fixed;
    bottom: var(--spacing-4);
    right: var(--spacing-4);
    background: var(--gray-900);
    color: white;
    padding: var(--spacing-3) var(--spacing-4);
    border-radius: 0.5rem;
    box-shadow: var(--shadow-lg);
    transform: translateY(100px);
    opacity: 0;
    transition: all 0.3s ease-out;
    z-index: 70;
    font-size: 0.875rem;
}

.toast.show {
    transform: translateY(0);
    opacity: 1;
}

[data-theme="dark"] .toast {
    background: var(--gray-100);
    color: var(--gray-900);
}

/* Responsive Design */
@media (max-width: 768px) {
    .map-modal-content {
        margin: var(--spacing-4);
        max-height: calc(100vh - 2rem);
    }
    
    .map-options {
        grid-template-columns: 1fr;
    }
    
    .district-actions {
        flex-direction: column;
    }
    
    .map-btn {
        justify-content: center;
    }
    
    .map-embed iframe {
        height: 250px;
    }
}

@media (max-width: 480px) {
    .map-modal {
        padding: var(--spacing-2);
    }
    
    .map-modal-header {
        padding: var(--spacing-3);
    }
    
    .map-modal-body {
        padding: var(--spacing-3);
    }
    
    .map-embed iframe {
        height: 200px;
    }
}
`;

// Inject map CSS
const mapStyle = document.createElement('style');
mapStyle.textContent = mapCSS;
document.head.appendChild(mapStyle);