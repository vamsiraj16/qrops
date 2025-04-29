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
  });