// Utility functions
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Translation data
const translations = {
    'pt': {
        'nav.home': 'INÍCIO',
        'nav.about': 'SOBRE',
        'nav.skills': 'HABILIDADES',
        'nav.works': 'TRABALHOS',
        'nav.contact': 'CONTATO',
        'hero.subtitle': 'OLÁ, EU SOU',
        'hero.role': 'Desenvolvedor Front-End',
        'hero.description': 'Apaixonado por criar experiências web modernas e intuitivas. Do Brasil, trazendo criatividade e expertise técnica para cada projeto.',
        'hero.cta': 'Ver Meus Trabalhos',
        'about.title': 'Sobre Mim',
        'about.description': 'Sou um Desenvolvedor Front-End apaixonado com expertise em tecnologias web modernas. Adoro criar interfaces bonitas, funcionais e amigáveis que fazem a diferença. Baseado no Brasil, trago uma perspectiva única para cada projeto.',
        'about.stats.experience': 'Meses de Experiência',
        'about.stats.projects': 'Projetos',
        'about.stats.dedication': 'Dedicação',
        'skills.title': 'Minhas Habilidades',
        'skills.html.description': 'Marcação semântica e estilização moderna',
        'skills.js.description': 'Experiências dinâmicas e interativas',
        'skills.react.description': 'Desenvolvimento moderno baseado em componentes',
        'skills.python.description': 'Desenvolvimento backend e automação',
        'works.title': 'Meus Trabalhos',
        'contact.title': 'Vamos Trabalhar Juntos',
        'contact.description': 'Pronto para dar vida às suas ideias? Sempre estou animado para trabalhar em novos projetos e criar experiências digitais incríveis.',
        'contact.cta': 'Entrar em Contato'
    },
    'en': {
        'nav.home': 'HOME',
        'nav.about': 'ABOUT',
        'nav.skills': 'SKILLS',
        'nav.works': 'WORKS',
        'nav.contact': 'CONTACT',
        'hero.subtitle': 'HELLO, I\'M',
        'hero.role': 'Front-End Developer',
        'hero.description': 'Passionate about creating modern and intuitive web experiences. From Brazil, bringing creativity and technical expertise to every project.',
        'hero.cta': 'See My Work',
        'about.title': 'About Me',
        'about.description': 'I\'m a passionate Front-End Developer with expertise in modern web technologies. I love creating beautiful, functional, and user-friendly interfaces that make a difference. Based in Brazil, I bring a unique perspective to every project.',
        'about.stats.experience': 'Months Experience',
        'about.stats.projects': 'Projects',
        'about.stats.dedication': 'Dedication',
        'skills.title': 'My Skills',
        'skills.html.description': 'Semantic markup and modern styling',
        'skills.js.description': 'Dynamic and interactive experiences',
        'skills.react.description': 'Modern component-based development',
        'skills.python.description': 'Backend development and automation',
        'works.title': 'My Works',
        'contact.title': 'Let\'s Work Together',
        'contact.description': 'Ready to bring your ideas to life? I\'m always excited to work on new projects and create amazing digital experiences.',
        'contact.cta': 'Get In Touch'
    }
};

// Language management
class LanguageManager {
    constructor() {
        this.languageToggle = document.getElementById('languageToggle');
        this.languageIcon = this.languageToggle.querySelector('.language-icon');
        this.currentLanguage = localStorage.getItem('language') || 'en';
        
        this.init();
    }

    init() {
        // Set initial language
        this.setLanguage(this.currentLanguage);
        
        // Add event listener
        this.languageToggle.addEventListener('click', () => {
            this.toggleLanguage();
        });
    }

    setLanguage(language) {
        this.currentLanguage = language;
        localStorage.setItem('language', language);
        
        // Update icon
        this.languageIcon.textContent = language === 'pt' ? '🇧🇷' : '🇺🇸';
        
        // Translate all elements
        this.translatePage();
    }

    toggleLanguage() {
        const newLanguage = this.currentLanguage === 'en' ? 'pt' : 'en';
        this.setLanguage(newLanguage);
        
        // Add animation to icon
        this.languageIcon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            this.languageIcon.style.transform = 'rotate(0deg)';
        }, 300);
    }

    translatePage() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = translations[this.currentLanguage][key];
            if (translation) {
                element.textContent = translation;
            }
        });
    }
}

// Theme management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = this.themeToggle.querySelector('.theme-icon');
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        
        this.init();
    }

    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add event listener
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        
        // Update icon
        this.themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        
        // Add animation to icon
        this.themeIcon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            this.themeIcon.style.transform = 'rotate(0deg)';
        }, 300);
    }
}

// Project data
const projectsData = {
    1: {
        title: "E-commerce Platform",
        description: "A full-stack e-commerce platform with user authentication, product management, shopping cart functionality, and payment integration. Features include responsive design, admin dashboard, and real-time inventory management.",
        features: [
            "User authentication & authorization",
            "Product catalog with search & filters",
            "Shopping cart & checkout process",
            "Payment gateway integration",
            "Admin dashboard for management",
            "Responsive mobile-first design"
        ]
    },
    2: {
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates, team collaboration, and project tracking. Built with Vue.js and Firebase for seamless real-time functionality.",
        features: [
            "Real-time task updates",
            "Team collaboration tools",
            "Project timeline tracking",
            "File sharing & attachments",
            "Progress analytics",
            "Mobile-responsive interface"
        ]
    },
    3: {
        title: "Weather Dashboard",
        description: "An interactive weather dashboard that displays real-time weather data with beautiful visualizations. Features include 7-day forecasts, hourly predictions, and location-based weather information.",
        features: [
            "Real-time weather data",
            "Interactive charts & graphs",
            "7-day weather forecast",
            "Location-based weather",
            "Weather alerts & notifications",
            "Responsive design"
        ]
    },
    4: {
        title: "Portfolio Website",
        description: "A modern, responsive portfolio website showcasing professional work and skills. Features smooth animations, interactive elements, and a clean, professional design that highlights projects and expertise.",
        features: [
            "Responsive design",
            "Smooth scroll animations",
            "Interactive project showcase",
            "Contact form integration",
            "Modern UI/UX design",
            "Cross-browser compatibility"
        ]
    },
    5: {
        title: "AI Chat Interface",
        description: "A modern chat interface with AI integration, featuring real-time messaging, intelligent responses, and a sleek user interface. Built with Next.js and TypeScript for optimal performance.",
        features: [
            "AI-powered chat responses",
            "Real-time messaging",
            "Modern UI/UX design",
            "TypeScript implementation",
            "Responsive design",
            "Performance optimization"
        ]
    }
};

// Contact management
class ContactManager {
    constructor() {
        this.contactModal = document.getElementById('contactModal');
        this.contactButton = document.getElementById('contactButton');
        this.contactForm = document.getElementById('contactForm');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Open contact modal
        if (this.contactButton) {
            this.contactButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.openContactModal();
            });
        }

        // Close contact modal
        const closeBtn = this.contactModal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeContactModal();
            });
        }

        // Close modal on background click
        if (this.contactModal) {
            this.contactModal.addEventListener('click', (e) => {
                if (e.target === this.contactModal) {
                    this.closeContactModal();
                }
            });
        }

        // Handle form submission
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission();
            });
        }

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.contactModal.classList.contains('show')) {
                this.closeContactModal();
            }
        });
    }

    openContactModal() {
        this.contactModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        const firstInput = this.contactForm.querySelector('input');
        if (firstInput) {
            firstInput.focus();
        }
    }

    closeContactModal() {
        this.contactModal.classList.remove('show');
        document.body.style.overflow = '';
        
        // Reset form
        this.contactForm.reset();
    }

    async handleFormSubmission() {
        const formData = new FormData(this.contactForm);
        const contactData = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        try {
            // Try to send to PHP backend first
            const response = await fetch('contact-handler.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactData)
            });

            const result = await response.json();

            if (result.success) {
                // Also save to localStorage as backup
                this.saveContactToStorage(contactData);
                
                // Show success message
                this.showSuccessMessage();
                
                // Close modal
                this.closeContactModal();
            } else {
                throw new Error(result.error || 'Erro desconhecido');
            }
            
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            
            // Fallback to localStorage if backend fails
            try {
                this.saveContactToStorage(contactData);
                this.showSuccessMessage();
                this.closeContactModal();
            } catch (fallbackError) {
                console.error('Erro no fallback:', fallbackError);
                this.showErrorMessage();
            }
        }
    }

    saveContactToStorage(contactData) {
        // Get existing contacts
        let contacts = JSON.parse(localStorage.getItem('portfolio_contacts') || '[]');
        
        // Add new contact
        contacts.push(contactData);
        
        // Save back to localStorage
        localStorage.setItem('portfolio_contacts', JSON.stringify(contacts));
        
        console.log('Contato salvo:', contactData);
        console.log('Total de contatos:', contacts.length);
    }

    showSuccessMessage() {
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>Mensagem enviada com sucesso!</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    showErrorMessage() {
        // Create error notification
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-exclamation-circle"></i>
                <span>Erro ao enviar mensagem. Tente novamente.</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Method to get all contacts (for admin purposes)
    getAllContacts() {
        return JSON.parse(localStorage.getItem('portfolio_contacts') || '[]');
    }
}

// Modal management
class WorksManager {
    constructor() {
        this.modal = document.getElementById('projectModal');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Work card click handlers
        const workCards = document.querySelectorAll('.work-card');
        workCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = card.getAttribute('data-project');
                this.openModal(projectId);
            });
        });

        // Modal close handlers
        const closeBtn = document.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeModal();
            });
        }

        // Close modal on background click
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('show')) {
                this.closeModal();
            }
        });
    }

    openModal(projectId) {
        const project = projectsData[projectId];
        if (!project) return;

        // Populate modal content
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDescription').textContent = project.description;
        
        const featuresList = document.getElementById('modalFeatures');
        featuresList.innerHTML = '';
        project.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });

        // Show modal
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';

        // Focus on close button
        const closeBtn = document.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.focus();
        }
    }

    closeModal() {
        this.modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Navigation management
class NavigationManager {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.header = document.querySelector('.header');
        this.lastScrollY = 0;
        this.scrollThreshold = 100;
        this.setupNavigation();
        this.setupScrollAnimation();
    }

    setupScrollAnimation() {
        let ticking = false;
        let scrollTimeout;
        
        const updateHeader = () => {
            const currentScrollY = window.pageYOffset;
            
            // Show header when scrolled past threshold
            if (currentScrollY > this.scrollThreshold) {
                this.header.classList.add('scrolled');
                
                // Add delay for smoother animation
                clearTimeout(scrollTimeout);
                
                if (currentScrollY > this.lastScrollY + 5) {
                    // Scrolling down - hide header
                    scrollTimeout = setTimeout(() => {
                        this.header.classList.remove('scrolled-up');
                        this.header.classList.add('scrolled-down');
                    }, 150);
                } else if (currentScrollY < this.lastScrollY - 5) {
                    // Scrolling up - show header
                    this.header.classList.remove('scrolled-down');
                    this.header.classList.add('scrolled-up');
                }
            } else {
                // Hide header when at top
                this.header.classList.remove('scrolled', 'scrolled-up', 'scrolled-down');
            }
            
            this.lastScrollY = currentScrollY;
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick, { passive: true });
        
        // Show header on mouse move near top
        document.addEventListener('mousemove', (e) => {
            if (e.clientY < 100 && window.pageYOffset > this.scrollThreshold) {
                this.header.classList.remove('scrolled-down');
                this.header.classList.add('scrolled-up');
            }
        });
    }

    setupNavigation() {
        // Smooth scrolling
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    this.scrollToSection(targetSection);
                    this.updateActiveLink(link);
                }
            });
        });

        // Active link on scroll
        window.addEventListener('scroll', debounce(() => {
            this.updateActiveLinkOnScroll();
        }, 100));
    }

    scrollToSection(section) {
        section.classList.add('slide-in');
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        setTimeout(() => {
            section.classList.remove('slide-in');
        }, 1000);
    }

    updateActiveLink(activeLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
        
        // Add has-active class to nav-links container
        const navLinksContainer = document.querySelector('.nav-links');
        if (navLinksContainer) {
            navLinksContainer.classList.add('has-active');
        }
    }

    updateActiveLinkOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const navLinksContainer = document.querySelector('.nav-links');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        let hasActive = false;
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                hasActive = true;
            }
        });
        
        // Update has-active class on container
        if (navLinksContainer) {
            if (hasActive) {
                navLinksContainer.classList.add('has-active');
            } else {
                navLinksContainer.classList.remove('has-active');
            }
        }
    }
}

// Animation management
class AnimationManager {
    constructor() {
        this.setupHoverEffects();
        this.setupLoadingAnimation();
    }

    setupHoverEffects() {
        // Button hover effects
        const buttons = document.querySelectorAll('.cta-button, .contact-button');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'scale(1.05)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'scale(1)';
            });
        });

        // Skills hover effects
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-10px)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0)';
            });
        });

        // Hero circle hover effect
        const purpleCircle = document.querySelector('.red-circle');
        if (purpleCircle) {
            purpleCircle.addEventListener('mouseenter', () => {
                purpleCircle.style.transform = 'scale(1.05)';
                purpleCircle.style.boxShadow = '0 25px 70px rgba(99, 102, 241, 0.5)';
            });
            
            purpleCircle.addEventListener('mouseleave', () => {
                purpleCircle.style.transform = 'scale(1)';
                purpleCircle.style.boxShadow = '0 20px 60px rgba(99, 102, 241, 0.4)';
            });
        }


    }

    setupLoadingAnimation() {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });
    }
}

// Main application class
class PortfolioApp {
    constructor() {
        this.languageManager = new LanguageManager();
        this.themeManager = new ThemeManager();
        this.worksManager = new WorksManager();
        this.contactManager = new ContactManager();
        this.navigationManager = new NavigationManager();
        this.animationManager = new AnimationManager();
        this.initialize();
    }

    initialize() {
        console.log('Caio Marani Portfolio - Site carregado com sucesso!');
        this.setupGlobalEventListeners();
    }

    setupGlobalEventListeners() {
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
