/* ========================================
   Canaan Ed & Tech - Main JavaScript
   Author: Your Name
   Date: 2024
======================================== */

// ========== WAIT FOR DOM TO LOAD ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MOBILE MENU TOGGLE ==========
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger icon
            this.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }
    
    // ========== SCROLL TO TOP BUTTON ==========
    const scrollTopBtn = document.getElementById('scroll-top');
    
    if (scrollTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
        
        // Scroll to top when clicked
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ========== SMOOTH SCROLLING FOR ANCHOR LINKS ==========
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default and smooth scroll if href is not just "#"
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ========== ANIMATED COUNTER FOR STATS ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const observerOptions = {
            threshold: 0.5
        };
        
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        };
        
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50; // Divide into 50 steps
        const duration = 2000; // 2 seconds
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (target === 95 ? '%' : '+');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (target === 95 ? '%' : '+');
            }
        }, stepTime);
    }
    
    // ========== CONTACT FORM VALIDATION AND SUBMISSION ==========
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Character counter for message textarea
        const messageField = document.getElementById('message');
        const charCount = document.getElementById('char-count');
        
        if (messageField && charCount) {
            messageField.addEventListener('input', function() {
                const count = this.value.length;
                charCount.textContent = count;
                
                if (count > 450) {
                    charCount.style.color = '#e74c3c';
                } else {
                    charCount.style.color = '#666';
                }
            });
        }
        
        // Form validation functions
        function validateName(input) {
            const value = input.value.trim();
            const errorElement = document.getElementById(input.id + '-error');
            
            if (value.length < 2) {
                input.classList.add('invalid');
                if (errorElement) {
                    errorElement.textContent = 'Name must be at least 2 characters';
                    errorElement.classList.add('show');
                }
                return false;
            } else {
                input.classList.remove('invalid');
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
                return true;
            }
        }
        
        function validateEmail(input) {
            const value = input.value.trim();
            const errorElement = document.getElementById(input.id + '-error');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailPattern.test(value)) {
                input.classList.add('invalid');
                if (errorElement) {
                    errorElement.textContent = 'Please enter a valid email address';
                    errorElement.classList.add('show');
                }
                return false;
            } else {
                input.classList.remove('invalid');
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
                return true;
            }
        }
        
        function validatePhone(input) {
            const value = input.value.trim();
            const errorElement = document.getElementById(input.id + '-error');
            const phonePattern = /^[0-9]{10}$/;
            const cleanPhone = value.replace(/\D/g, '');
            
            if (!phonePattern.test(cleanPhone)) {
                input.classList.add('invalid');
                if (errorElement) {
                    errorElement.textContent = 'Please enter a valid 10-digit phone number';
                    errorElement.classList.add('show');
                }
                return false;
            } else {
                input.classList.remove('invalid');
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
                return true;
            }
        }
        
        function validateSelect(input) {
            const errorElement = document.getElementById(input.id + '-error');
            
            if (input.value === '') {
                input.classList.add('invalid');
                if (errorElement) {
                    errorElement.textContent = 'Please select an option';
                    errorElement.classList.add('show');
                }
                return false;
            } else {
                input.classList.remove('invalid');
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
                return true;
            }
        }
        
        function validateMessage(input) {
            const value = input.value.trim();
            const errorElement = document.getElementById(input.id + '-error');
            
            if (value.length < 20) {
                input.classList.add('invalid');
                if (errorElement) {
                    errorElement.textContent = 'Please write at least 20 characters';
                    errorElement.classList.add('show');
                }
                return false;
            } else {
                input.classList.remove('invalid');
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
                return true;
            }
        }
        
        // Real-time validation on blur
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        if (firstName) firstName.addEventListener('blur', () => validateName(firstName));
        if (lastName) lastName.addEventListener('blur', () => validateName(lastName));
        if (email) email.addEventListener('blur', () => validateEmail(email));
        if (phone) phone.addEventListener('blur', () => validatePhone(phone));
        if (subject) subject.addEventListener('change', () => validateSelect(subject));
        if (message) message.addEventListener('blur', () => validateMessage(message));
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            
            if (firstName) isValid = validateName(firstName) && isValid;
            if (lastName) isValid = validateName(lastName) && isValid;
            if (email) isValid = validateEmail(email) && isValid;
            if (phone) isValid = validatePhone(phone) && isValid;
            if (subject) isValid = validateSelect(subject) && isValid;
            if (message) isValid = validateMessage(message) && isValid;
            
            if (isValid) {
                // Show success message
                const successMessage = document.getElementById('success-message');
                if (successMessage) {
                    successMessage.classList.add('show');
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                // Log form data (in production, this would be sent to a server)
                console.log('Form Data Submitted:');
                console.log('Name:', firstName.value, lastName.value);
                console.log('Email:', email.value);
                console.log('Phone:', phone.value);
                console.log('Subject:', subject.value);
                console.log('Domain:', document.getElementById('domain')?.value || 'Not selected');
                console.log('Message:', message.value);
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    contactForm.reset();
                    if (charCount) charCount.textContent = '0';
                    if (successMessage) successMessage.classList.remove('show');
                }, 3000);
            } else {
                // Scroll to first error
                const firstInvalid = contactForm.querySelector('.invalid');
                if (firstInvalid) {
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
        
        // Reset form functionality
        contactForm.addEventListener('reset', function() {
            // Remove all validation states
            const invalidElements = contactForm.querySelectorAll('.invalid');
            invalidElements.forEach(el => el.classList.remove('invalid'));
            
            const errorElements = contactForm.querySelectorAll('.error-message.show');
            errorElements.forEach(el => el.classList.remove('show'));
            
            const successMessage = document.getElementById('success-message');
            if (successMessage) successMessage.classList.remove('show');
            
            if (charCount) charCount.textContent = '0';
        });
    }
    
    // ========== ACTIVE NAVIGATION LINK BASED ON SCROLL ==========
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a');
    
    function activateNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    if (sections.length > 0) {
        window.addEventListener('scroll', activateNavLink);
    }
    
    // ========== ADD ANIMATION ON SCROLL ==========
    const animateOnScroll = document.querySelectorAll('.feature-card, .service-card, .value-card, .domain-card');
    
    if (animateOnScroll.length > 0) {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animateOnScroll.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
            scrollObserver.observe(element);
        });
    }
    
    // ========== CONSOLE MESSAGE ==========
    console.log('%c🎓 Canaan Ed & Tech - Website Loaded Successfully!', 'color: #667eea; font-size: 16px; font-weight: bold;');
    console.log('%cDeveloped as part of Web Development Internship Program', 'color: #764ba2; font-size: 12px;');
    
}); // End of DOMContentLoaded