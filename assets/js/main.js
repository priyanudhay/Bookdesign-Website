// main.js - JavaScript functionality for YouTbooks website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Mobile Menu Toggle (for pages using mobile-menu-button)
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Animated Counters
    function animateCounter(elementId, targetValue, duration, decimals = 0) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const startTime = Date.now();
        const startValue = 0;
        
        function updateCounter() {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            
            if (elapsedTime < duration) {
                const value = startValue + (targetValue - startValue) * (elapsedTime / duration);
                element.textContent = decimals > 0 ? value.toFixed(decimals) : Math.floor(value);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = decimals > 0 ? targetValue.toFixed(decimals) : targetValue;
            }
        }
        
        updateCounter();
    }

    // Start counter animations when they come into view
    const counters = document.querySelectorAll('.counter-element');
    
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const target = parseFloat(element.getAttribute('data-target'));
                    const decimals = parseInt(element.getAttribute('data-decimals') || '0');
                    animateCounter(element.id, target, 2000, decimals);
                    observer.unobserve(element);
                }
            });
        });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    // Fallback for index.html counters
    const booksCounter = document.getElementById('books-counter');
    const authorsCounter = document.getElementById('authors-counter');
    const ratingCounter = document.getElementById('rating-counter');
    
    if (booksCounter && authorsCounter && ratingCounter) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter('books-counter', 390, 2000);
                    animateCounter('authors-counter', 50, 2000);
                    animateCounter('rating-counter', 4.3, 2000, 1);
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counterObserver.observe(booksCounter);
    }

    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active', 'bg-primary', 'text-white');
                    btn.classList.add('bg-gray-200', 'text-gray-800');
                });
                
                // Add active class to clicked button
                this.classList.add('active', 'bg-primary', 'text-white');
                this.classList.remove('bg-gray-200', 'text-gray-800');
                
                const filter = this.getAttribute('data-filter');
                
                // Show/hide items based on filter
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Form Validation
    const contactForm = document.getElementById('contact-form');
    const ctaForm = document.getElementById('cta-form');
    const subscribeForm = document.getElementById('subscribe-form');
    
    // Contact Form Validation
    if (contactForm) {
        const formSuccess = document.getElementById('form-success');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const errorMessages = contactForm.querySelectorAll('.error-message');
            
            // Reset error messages
            errorMessages.forEach(message => {
                message.classList.add('hidden');
            });
            
            // Validate name
            const nameInput = contactForm.querySelector('#name');
            if (nameInput && !nameInput.value.trim()) {
                const nameError = nameInput.nextElementSibling;
                nameError.classList.remove('hidden');
                nameInput.classList.add('border-red-500');
                isValid = false;
            } else if (nameInput) {
                nameInput.classList.remove('border-red-500');
            }
            
            // Validate email
            const emailInput = contactForm.querySelector('#email');
            if (emailInput) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const emailError = emailInput.nextElementSibling;
                if (!emailPattern.test(emailInput.value)) {
                    emailError.classList.remove('hidden');
                    emailInput.classList.add('border-red-500');
                    isValid = false;
                } else {
                    emailError.classList.add('hidden');
                    emailInput.classList.remove('border-red-500');
                }
            }
            
            // Validate book type
            const bookTypeInput = contactForm.querySelector('#book-type');
            if (bookTypeInput) {
                const bookTypeError = bookTypeInput.nextElementSibling;
                if (bookTypeInput.value === "") {
                    bookTypeError.classList.remove('hidden');
                    bookTypeInput.classList.add('border-red-500');
                    isValid = false;
                } else {
                    bookTypeError.classList.add('hidden');
                    bookTypeInput.classList.remove('border-red-500');
                }
            }
            
            // Validate Services (at least one checkbox)
            const serviceCheckboxes = contactForm.querySelectorAll('input[name="services[]"]');
            if (serviceCheckboxes.length > 0) {
                const servicesError = document.querySelector('input[name="services[]"]').closest('div').nextElementSibling;
                let serviceChecked = false;
                serviceCheckboxes.forEach(checkbox => {
                    if (checkbox.checked) {
                        serviceChecked = true;
                    }
                });
                if (!serviceChecked) {
                    servicesError.classList.remove('hidden');
                    isValid = false;
                } else {
                    servicesError.classList.add('hidden');
                }
            }
            
            // Validate message
            const messageInput = contactForm.querySelector('#message');
            if (messageInput) {
                const messageError = messageInput.nextElementSibling;
                if (!messageInput.value.trim()) {
                    messageError.classList.remove('hidden');
                    messageInput.classList.add('border-red-500');
                    isValid = false;
                } else {
                    messageError.classList.add('hidden');
                    messageInput.classList.remove('border-red-500');
                }
            }
            
            if (isValid) {
                // If form is valid, show success message
                if (formSuccess) {
                    contactForm.reset();
                    contactForm.classList.add('hidden');
                    formSuccess.classList.remove('hidden');
                    
                    // For demo purposes, reset form after 5 seconds
                    setTimeout(() => {
                        contactForm.classList.remove('hidden');
                        formSuccess.classList.add('hidden');
                    }, 5000);
                } else {
                    // Fallback for other forms without success element
                    alert('Thank you for your message! We will contact you shortly.');
                    contactForm.reset();
                }
            }
        });
    }
    
    // CTA Form Validation
    if (ctaForm) {
        ctaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simple validation for demonstration
            alert('Thank you for your submission! We will contact you shortly.');
            ctaForm.reset();
        });
    }
    
    // Subscribe Form Validation
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simple validation for demonstration
            alert('Thank you for subscribing to our newsletter!');
            subscribeForm.reset();
        });
    }

    // Portfolio Modal Functionality
    const portfolioModal = document.getElementById('portfolio-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    
    if (portfolioModal && closeModalBtn && viewDetailsButtons.length > 0) {
        // Project details data
        const projectData = {
            1: {
                title: "Mystery Novel Cover",
                image: "https://placehold.co/600x800/e2e8f0/1e40af?text=Book+Cover+1",
                description: "A suspenseful cover design for a mystery thriller that captures the essence of the story. The design uses dark colors and symbolic imagery to create intrigue and attract the target audience.",
                services: "Cover design, typography selection, spine and back cover design, digital mockups for marketing.",
                feedback: "The cover perfectly captures the mood of my mystery novel. I've received numerous compliments from readers who said the cover was what initially drew them to the book."
            },
            2: {
                title: "Fantasy Series Cover",
                image: "https://placehold.co/600x800/e2e8f0/1e40af?text=Book+Cover+2",
                description: "An epic fantasy cover with detailed illustration that transports readers to a magical world. The artwork features a custom illustration with rich details and fantasy elements.",
                services: "Custom illustration, series branding, typography design, full wrap cover for hardcover and paperback.",
                feedback: "The illustration exceeded my expectations. The attention to detail and the way it captures the fantasy world I created is remarkable. Sales have increased significantly since the redesign."
            },
            3: {
                title: "Business Book Cover",
                image: "https://placehold.co/600x800/e2e8f0/1e40af?text=Book+Cover+3",
                description: "A professional, clean cover design for a business leadership book that conveys authority and expertise. The minimalist approach with strategic use of color creates a strong visual impact.",
                services: "Cover design, brand alignment, typography, author photo integration, marketing materials.",
                feedback: "The clean, professional design has helped position my book as a serious business resource. Many readers have commented that the cover design was what made them pick up the book first."
            },
            4: {
                title: "Novel Interior Design",
                image: "https://placehold.co/600x800/e2e8f0/1e40af?text=Interior+Layout+1",
                description: "Clean and elegant interior layout for fiction that enhances readability and reader experience. The design includes custom chapter headings, appropriate font selection, and balanced margins.",
                services: "Interior layout design, typography selection, chapter styling, page numbering, front and back matter design.",
                feedback: "The interior layout is beautiful and makes reading a pleasure. The font choices and spacing make the text easy to read, and the chapter headings add a touch of elegance."
            },
            5: {
                title: "Cookbook Layout",
                image: "https://placehold.co/600x800/e2e8f0/1e40af?text=Interior+Layout+2",
                description: "Recipe book layout with custom typography and image placement that makes cooking instructions clear and visually appealing. The design includes recipe cards, ingredient lists, and step-by-step instructions.",
                services: "Interior design, recipe formatting, image placement, typography, table of contents, index creation.",
                feedback: "The layout makes my recipes easy to follow while cooking. The way images and text are arranged is both practical and beautiful. My readers love how user-friendly the book is."
            },
            6: {
                title: "Interactive eBook",
                image: "https://placehold.co/600x800/e2e8f0/1e40af?text=eBook+Format+1",
                description: "EPUB with interactive elements and responsive design that works seamlessly across all e-readers and devices. The eBook includes interactive table of contents, hyperlinks, and embedded media.",
                services: "eBook conversion, interactive element creation, device testing, metadata optimization, distribution preparation.",
                feedback: "The interactive elements really enhance the reading experience. The eBook works perfectly on all devices, and the navigation is intuitive and user-friendly."
            },
            7: {
                title: "Academic eBook",
                image: "https://placehold.co/600x800/e2e8f0/1e40af?text=eBook+Format+2",
                description: "Complex academic content with footnotes, references, and tables formatted for digital reading. The design maintains scholarly standards while optimizing for digital devices.",
                services: "Academic formatting, reference linking, footnote optimization, table and figure formatting, index creation.",
                feedback: "The digital version of my academic work maintains all the necessary scholarly elements while being much more accessible and searchable. The reference linking is particularly valuable."
            },
            8: {
                title: "Children's Book Illustrations",
                image: "https://placehold.co/600x800/e2e8f0/1e40af?text=Illustration+1",
                description: "Colorful character designs for a children's storybook that capture imagination and delight young readers. The illustrations bring the story to life with vibrant colors and expressive characters.",
                services: "Character design, scene illustrations, color palette development, style consistency, print preparation.",
                feedback: "The illustrations are magical and have made my story come alive. Children are drawn to the colorful characters, and parents have told me the artwork is what makes them choose the book again and again."
            },
            9: {
                title: "Educational Diagrams",
                image: "https://placehold.co/600x800/e2e8f0/1e40af?text=Illustration+2",
                description: "Clear, informative diagrams for an educational textbook that simplify complex concepts. The illustrations use color coding, labels, and simplified visuals to enhance understanding.",
                services: "Technical illustration, diagram creation, educational content visualization, labeling, layout integration.",
                feedback: "The diagrams have significantly improved student comprehension of complex topics. The clear, visual explanations make teaching much more effective and engaging."
            }
        };
        
        // Open modal with project details
        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', function() {
                const projectId = this.getAttribute('data-id');
                const project = projectData[projectId];
                
                document.getElementById('modal-title').textContent = project.title;
                document.getElementById('modal-image').src = project.image;
                document.getElementById('modal-image').alt = project.title;
                document.getElementById('modal-description').textContent = project.description;
                document.getElementById('modal-services').textContent = project.services;
                document.getElementById('modal-feedback').textContent = project.feedback;
                
                portfolioModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            });
        });
        
        // Close modal
        closeModalBtn.addEventListener('click', function() {
            portfolioModal.classList.add('hidden');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
        
        // Close modal when clicking outside
        portfolioModal.addEventListener('click', function(e) {
            if (e.target === portfolioModal) {
                portfolioModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    } else {
        // Fallback for other pages with view-details buttons
        if (viewDetailsButtons.length > 0) {
            viewDetailsButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const portfolioItem = this.closest('.portfolio-item');
                    const title = portfolioItem.querySelector('h3').textContent;
                    const description = portfolioItem.querySelector('p').textContent;
                    
                    // In a real implementation, this would open a modal with more information
                    alert(`${title}\n${description}\n\nIn a real implementation, this would open a modal with more information and larger images.`);
                });
            });
        }
    }

    // Mobile Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    
    if (testimonialSlider && testimonialSlides.length > 0 && prevButton && nextButton) {
        let currentSlide = 0;
        
        // Show the first slide
        testimonialSlides[currentSlide].classList.remove('hidden');
        
        // Update slide indicators
        function updateIndicators() {
            const indicators = document.querySelectorAll('.slide-indicator');
            indicators.forEach((indicator, index) => {
                if (index === currentSlide) {
                    indicator.classList.add('bg-primary');
                    indicator.classList.remove('bg-gray-300');
                } else {
                    indicator.classList.remove('bg-primary');
                    indicator.classList.add('bg-gray-300');
                }
            });
        }
        
        // Next slide
        nextButton.addEventListener('click', function() {
            testimonialSlides[currentSlide].classList.add('hidden');
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            testimonialSlides[currentSlide].classList.remove('hidden');
            updateIndicators();
        });
        
        // Previous slide
        prevButton.addEventListener('click', function() {
            testimonialSlides[currentSlide].classList.add('hidden');
            currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
            testimonialSlides[currentSlide].classList.remove('hidden');
            updateIndicators();
        });
        
        // Initialize indicators
        updateIndicators();
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Testimonials Page Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevTestimonialBtn = document.getElementById('prev-testimonial');
    const nextTestimonialBtn = document.getElementById('next-testimonial');
    
    if (testimonialCards.length > 0 && prevTestimonialBtn && nextTestimonialBtn) {
        let currentIndex = 0;
        const maxVisible = window.innerWidth < 768 ? 1 : 3; // Show 1 on mobile, 3 on desktop
        
        // Initialize: Hide all cards except the first set
        testimonialCards.forEach((card, index) => {
            if (index < maxVisible) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Function to update visible cards
        function updateVisibleCards() {
            testimonialCards.forEach((card, index) => {
                // Calculate if this card should be visible based on current index
                const shouldBeVisible = index >= currentIndex && index < currentIndex + maxVisible;
                
                if (shouldBeVisible) {
                    card.classList.remove('hidden');
                    // Add fade-in animation
                    card.classList.add('animate-fadeIn');
                    setTimeout(() => {
                        card.classList.remove('animate-fadeIn');
                    }, 500);
                } else {
                    card.classList.add('hidden');
                }
            });
        }
        
        // Next button click handler
        nextTestimonialBtn.addEventListener('click', () => {
            if (currentIndex + maxVisible < testimonialCards.length) {
                currentIndex++;
                updateVisibleCards();
            }
        });
        
        // Previous button click handler
        prevTestimonialBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateVisibleCards();
            }
        });
        
        // Update on window resize
        window.addEventListener('resize', () => {
            const newMaxVisible = window.innerWidth < 768 ? 1 : 3;
            if (newMaxVisible !== maxVisible) {
                maxVisible = newMaxVisible;
                updateVisibleCards();
            }
        });
    }
});