document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Handle scroll events
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      // Animate elements on scroll
      handleScrollAnimations();
    });
    
    // Mobile menu toggle
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
      
      // Update icon based on menu state
      const isOpen = !mobileMenu.classList.contains('hidden');
      
      if (isOpen) {
        mobileMenuButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        `;
      } else {
        mobileMenuButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        `;
      }
    });
    
    // Close mobile menu when clicking a nav link
    const mobileNavLinks = mobileMenu.querySelectorAll('.nav-link');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        `;
      });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Calculate offset based on navbar height
          const navbarHeight = navbar.offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Handle scroll animations
    function handleScrollAnimations() {
      const animatedElements = document.querySelectorAll('.animate');
      
      animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
          // Get animation type from class names
          if (element.classList.contains('fade-in')) {
            element.classList.add('visible');
          } else if (element.classList.contains('slide-in-left')) {
            element.classList.add('visible');
          } else if (element.classList.contains('slide-in-right')) {
            element.classList.add('visible');
          } else if (element.classList.contains('zoom-in')) {
            element.classList.add('visible');
          }
          
          // Apply delay if specified
          const delay = element.getAttribute('data-delay');
          if (delay) {
            element.style.transitionDelay = `${delay}ms`;
          }
        }
      });
    }
    
    // Initialize scroll animations
    handleScrollAnimations();
    
    // Back to top button functionality
    const backToTopButton = document.createElement('div');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m18 15-6-6-6 6"/>
      </svg>
    `;
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Business Advisory 3D Carousel with Scroll Effect and Arrows
    (function() {
      const track = document.querySelector('.advisory-carousel-track');
      const items = Array.from(document.querySelectorAll('.advisory-carousel-item'));
      const leftBtn = document.querySelector('.advisory-carousel-arrow.left');
      const rightBtn = document.querySelector('.advisory-carousel-arrow.right');
      if (!track || !items.length) return;

      let current = 0;
      let isScrolling = false;
      function updateCarousel() {
        items.forEach((item, i) => {
          item.classList.remove('active', 'left', 'right');
          item.style.zIndex = 1;
          if (i === current) {
            item.classList.add('active');
            item.style.zIndex = 3;
          } else if (i === (current - 1 + items.length) % items.length) {
            item.classList.add('left');
            item.style.zIndex = 2;
          } else if (i === (current + 1) % items.length) {
            item.classList.add('right');
            item.style.zIndex = 2;
          }
        });
      }
      updateCarousel();

      // Arrow buttons
      if (leftBtn && rightBtn) {
        leftBtn.addEventListener('click', () => {
          current = (current - 1 + items.length) % items.length;
          updateCarousel();
        });
        rightBtn.addEventListener('click', () => {
          current = (current + 1) % items.length;
          updateCarousel();
        });
      }

      // Scroll event (mouse wheel)
      track.addEventListener('wheel', (e) => {
        if (isScrolling) return;
        isScrolling = true;
        if (e.deltaY > 0 || e.deltaX > 0) {
          current = (current + 1) % items.length;
        } else if (e.deltaY < 0 || e.deltaX < 0) {
          current = (current - 1 + items.length) % items.length;
        }
        updateCarousel();
        setTimeout(() => { isScrolling = false; }, 400);
      });

      // Touch swipe for mobile
      let startX = 0;
      track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
      });
      track.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        if (Math.abs(endX - startX) > 30) {
          if (endX < startX) {
            current = (current + 1) % items.length;
          } else {
            current = (current - 1 + items.length) % items.length;
          }
          updateCarousel();
        }
      });

      // 3D tilt effect for active item
      items.forEach(item => {
        item.addEventListener('mousemove', (e) => {
          if (!item.classList.contains('active')) return;
          const rect = item.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * 8; // max 8deg
          const rotateY = ((x - centerX) / centerX) * 8;
          item.style.transform = `translate(-50%, -50%) scale(1.08) rotateY(${rotateY}deg) rotateX(${-rotateX}deg)`;
        });
        item.addEventListener('mouseleave', () => {
          if (item.classList.contains('active')) {
            item.style.transform = 'translate(-50%, -50%) scale(1.08)';
          } else {
            item.style.transform = '';
          }
        });
      });
    })();
  });