// Main JavaScript file for Spangtik Adventure Website

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ===== Navbar functionality =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('#header');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a nav item
    document.querySelectorAll('.nav-menu a').forEach(navItem => {
        navItem.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = '#fff';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'transparent';
            header.style.boxShadow = 'none';
        }
    });

    // ===== Smooth scrolling for anchor links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('#header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Trip booking form validation =====
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const requiredFields = bookingForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Show success message (in a real app, this would submit the form data)
                const formSuccess = document.createElement('div');
                formSuccess.className = 'form-success';
                formSuccess.innerHTML = '<p>Thank you for your booking request! We will contact you shortly.</p>';
                
                bookingForm.innerHTML = '';
                bookingForm.appendChild(formSuccess);
            }
        });
    }

    // ===== Newsletter subscription =====
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim()) {
                // Show success message
                const successMsg = document.getElementById('newsletter-success');
                if (successMsg) {
                    successMsg.style.display = 'block';
                    emailInput.value = '';
                }
            }
        });
    }

    // ===== Initialize animated counters =====
    const counters = document.querySelectorAll('.counter');
    
    function startCounter() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 100;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(startCounter, 30);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Start counters when the section comes into view
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        window.addEventListener('scroll', function() {
            const sectionPosition = statsSection.getBoundingClientRect();
            const screenPosition = window.innerHeight;
            
            if (sectionPosition.top < screenPosition && sectionPosition.bottom > 0) {
                startCounter();
            }
        });
    }

    // ===== Show/hide the back-to-top button based on scroll position =====
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 700) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== Simple live chat simulation =====
    const chatIcon = document.querySelector('.chat-icon');
    const chatWindow = document.querySelector('.chat-window');
    const chatClose = document.querySelector('.chat-close');
    const chatForm = document.querySelector('.chat-form');
    
    if (chatIcon && chatWindow) {
        chatIcon.addEventListener('click', function() {
            chatWindow.classList.toggle('active');
        });
        
        if (chatClose) {
            chatClose.addEventListener('click', function() {
                chatWindow.classList.remove('active');
            });
        }
        
        if (chatForm) {
            chatForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const messageInput = document.getElementById('chat-message');
                if (messageInput && messageInput.value.trim()) {
                    // In a real application, this would send the message to a backend system
                    const chatMessages = document.querySelector('.chat-messages');
                    const userMessage = document.createElement('div');
                    userMessage.className = 'chat-message user-message';
                    userMessage.textContent = messageInput.value;
                    
                    chatMessages.appendChild(userMessage);
                    messageInput.value = '';
                    
                    // Simulate automated response
                    setTimeout(function() {
                        const botMessage = document.createElement('div');
                        botMessage.className = 'chat-message bot-message';
                        botMessage.textContent = 'Thank you for your message. Our team will get back to you shortly.';
                        
                        chatMessages.appendChild(botMessage);
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    }, 1000);
                }
            });
        }
    }

    // ===== Interactive gallery/image slider =====
    const gallerySlider = document.querySelector('.gallery-slider');
    if (gallerySlider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        gallerySlider.addEventListener('mousedown', function(e) {
            isDown = true;
            startX = e.pageX - gallerySlider.offsetLeft;
            scrollLeft = gallerySlider.scrollLeft;
        });
        
        gallerySlider.addEventListener('mouseleave', function() {
            isDown = false;
        });
        
        gallerySlider.addEventListener('mouseup', function() {
            isDown = false;
        });
        
        gallerySlider.addEventListener('mousemove', function(e) {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - gallerySlider.offsetLeft;
            const walk = (x - startX) * 2;
            gallerySlider.scrollLeft = scrollLeft - walk;
        });
    }
});
