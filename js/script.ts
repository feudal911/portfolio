// Types
interface WorkItem {
    preview: HTMLElement;
    details: HTMLElement;
    closeButton: HTMLElement;
}

interface ModalState {
    isOpen: boolean;
    currentModal: HTMLElement | null;
}

// State management
const modalState: ModalState = {
    isOpen: false,
    currentModal: null
};

// Utility functions
const debounce = (func: Function, wait: number): Function => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const preventScroll = (): void => {
    document.body.classList.add('modal-open');
    document.documentElement.style.overflow = 'hidden';
};

const allowScroll = (): void => {
    document.body.classList.remove('modal-open');
    document.documentElement.style.overflow = '';
};

// Modal management
class ModalManager {
    private static instance: ModalManager;
    private workItems: WorkItem[] = [];

    private constructor() {
        this.initializeWorkItems();
        this.setupEventListeners();
    }

    static getInstance(): ModalManager {
        if (!ModalManager.instance) {
            ModalManager.instance = new ModalManager();
        }
        return ModalManager.instance;
    }

    private initializeWorkItems(): void {
        const workItemElements = document.querySelectorAll('.work-item');
        
        workItemElements.forEach((item: Element) => {
            const preview = item.querySelector('.work-preview') as HTMLElement;
            const details = item.querySelector('.work-details') as HTMLElement;
            const closeButton = item.querySelector('.close-work') as HTMLElement;

            if (preview && details && closeButton) {
                this.workItems.push({
                    preview,
                    details,
                    closeButton
                });
            }
        });
    }

    private setupEventListeners(): void {
        // Work item click handlers
        this.workItems.forEach(({ preview, details, closeButton }) => {
            // Open modal
            preview.addEventListener('click', (e: Event) => {
                e.preventDefault();
                e.stopPropagation();
                this.openModal(details);
            });

            // Close modal via button
            closeButton.addEventListener('click', (e: Event) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeModal(details);
            });

            // Close modal via background click
            details.addEventListener('click', (e: Event) => {
                if (e.target === details) {
                    this.closeModal(details);
                }
            });
        });

        // Global escape key handler
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Escape' && modalState.isOpen) {
                this.closeCurrentModal();
            }
        });

        // Prevent scroll when modal is open
        document.addEventListener('scroll', debounce(() => {
            if (modalState.isOpen) {
                window.scrollTo(0, 0);
            }
        }, 10));
    }

    private openModal(modal: HTMLElement): void {
        // Close any existing modal first
        this.closeCurrentModal();

        // Open new modal
        modal.classList.add('active');
        modalState.isOpen = true;
        modalState.currentModal = modal;
        preventScroll();

        // Focus management
        const closeButton = modal.querySelector('.close-work') as HTMLElement;
        if (closeButton) {
            closeButton.focus();
        }
    }

    private closeModal(modal: HTMLElement): void {
        modal.classList.remove('active');
        modalState.isOpen = false;
        modalState.currentModal = null;
        allowScroll();
    }

    private closeCurrentModal(): void {
        if (modalState.currentModal) {
            this.closeModal(modalState.currentModal);
        }
    }
}

// Navigation management
class NavigationManager {
    private navLinks: NodeListOf<Element>;
    private sections: NodeListOf<Element>;

    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.setupNavigation();
    }

    private setupNavigation(): void {
        // Smooth scrolling
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e: Event) => {
                e.preventDefault();
                const targetId = (link as HTMLElement).getAttribute('href');
                const targetSection = document.querySelector(targetId!);
                
                if (targetSection) {
                    this.scrollToSection(targetSection as HTMLElement);
                    this.updateActiveLink(link as HTMLElement);
                }
            });
        });

        // Active link on scroll
        window.addEventListener('scroll', debounce(() => {
            this.updateActiveLinkOnScroll();
        }, 100));
    }

    private scrollToSection(section: HTMLElement): void {
        section.classList.add('slide-in');
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        setTimeout(() => {
            section.classList.remove('slide-in');
        }, 1000);
    }

    private updateActiveLink(activeLink: HTMLElement): void {
        this.navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    private updateActiveLinkOnScroll(): void {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id') || '';
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
}

// Animation management
class AnimationManager {
    constructor() {
        this.setupHoverEffects();
        this.setupLoadingAnimation();
    }

    private setupHoverEffects(): void {
        // Button hover effects
        const buttons = document.querySelectorAll('.cta-button, .contact-button');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                (button as HTMLElement).style.transform = 'scale(1.05)';
            });
            
            button.addEventListener('mouseleave', () => {
                (button as HTMLElement).style.transform = 'scale(1)';
            });
        });

        // Skills hover effects
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                (item as HTMLElement).style.transform = 'translateY(-10px)';
            });
            
            item.addEventListener('mouseleave', () => {
                (item as HTMLElement).style.transform = 'translateY(0)';
            });
        });

        // Hero circle hover effect
        const purpleCircle = document.querySelector('.red-circle');
        if (purpleCircle) {
            purpleCircle.addEventListener('mouseenter', () => {
                (purpleCircle as HTMLElement).style.transform = 'scale(1.05)';
                (purpleCircle as HTMLElement).style.boxShadow = '0 25px 70px rgba(99, 102, 241, 0.5)';
            });
            
            purpleCircle.addEventListener('mouseleave', () => {
                (purpleCircle as HTMLElement).style.transform = 'scale(1)';
                (purpleCircle as HTMLElement).style.boxShadow = '0 20px 60px rgba(99, 102, 241, 0.4)';
            });
        }
    }

    private setupLoadingAnimation(): void {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });
    }
}

// Main application class
class PortfolioApp {
    private modalManager: ModalManager;
    private navigationManager: NavigationManager;
    private animationManager: AnimationManager;

    constructor() {
        this.modalManager = ModalManager.getInstance();
        this.navigationManager = new NavigationManager();
        this.animationManager = new AnimationManager();
        this.initialize();
    }

    private initialize(): void {
        console.log('Caio Marani Portfolio - Site carregado com sucesso!');
        
        // Additional initialization if needed
        this.setupGlobalEventListeners();
    }

    private setupGlobalEventListeners(): void {
        // Prevent any scroll interference when modal is open
        window.addEventListener('scroll', () => {
            if (modalState.isOpen) {
                window.scrollTo(0, 0);
            }
        });

        // Handle window resize
        window.addEventListener('resize', debounce(() => {
            // Handle responsive adjustments if needed
        }, 250));
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});
