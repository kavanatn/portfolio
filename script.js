// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Typing effect for hero section
const heroTitle = document.querySelector('.hero h1');
const originalText = heroTitle.innerHTML;
heroTitle.innerHTML = '';

function typeWriter(text, i = 0) {
  if (i < text.length) {
    heroTitle.innerHTML += text.charAt(i);
    i++;
    setTimeout(() => typeWriter(text, i), 100);
  }
}

typeWriter(originalText);

// Parallax effect for hero image
const heroImage = document.querySelector('.hero-image');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  heroImage.style.transform = `translateY(${scrollY * 0.5}px)`;
});

// Animations for sections
gsap.from('.hero-content', {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: 'power3.out'
});

gsap.from('.hero-image', {
  opacity: 0,
  scale: 0.8,
  duration: 1,
  delay: 0.5,
  ease: 'power3.out'
});

gsap.from('.service-card', {
  scrollTrigger: {
    trigger: '.services',
    start: 'top 80%'
  },
  opacity: 0,
  y: 50,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power3.out'
});

gsap.from('.work-card', {
  scrollTrigger: {
    trigger: '.works',
    start: 'top 80%'
  },
  opacity: 0,
  scale: 0.9,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power3.out'
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Form validation and submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (validateForm()) {
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    try {
      // Simulating form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      showNotification('Message sent successfully!', 'success');
      contactForm.reset();
    } catch (error) {
      console.error('Error:', error);
      showNotification('Failed to send message. Please try again later.', 'error');
    }
  }
});

function validateForm() {
  const name = document.querySelector('input[name="name"]');
  const email = document.querySelector('input[name="email"]');
  const message = document.querySelector('textarea[name="message"]');
  let isValid = true;

  if (name.value.trim() === '') {
    showError(name, 'Name is required');
    isValid = false;
  } else {
    removeError(name);
  }

  if (email.value.trim() === '') {
    showError(email, 'Email is required');
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    showError(email, 'Please enter a valid email');
    isValid = false;
  } else {
    removeError(email);
  }

  if (message.value.trim() === '') {
    showError(message, 'Message is required');
    isValid = false;
  } else {
    removeError(message);
  }

  return isValid;
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showError(input, message) {
  const formControl = input.parentElement;
  const errorElement = formControl.querySelector('.error-message') || document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  if (!formControl.querySelector('.error-message')) {
    formControl.appendChild(errorElement);
  }
  input.classList.add('error');
}

function removeError(input) {
  const formControl = input.parentElement;
  const errorElement = formControl.querySelector('.error-message');
  if (errorElement) {
    formControl.removeChild(errorElement);
  }
  input.classList.remove('error');
}

function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  gsap.fromTo(notification, 
    { y: -50, opacity: 0 }, 
    { y: 20, opacity: 1, duration: 0.5, ease: 'power3.out' }
  );

  setTimeout(() => {
    gsap.to(notification, { 
      y: -50, 
      opacity: 0, 
      duration: 0.5, 
      ease: 'power3.in',
      onComplete: () => notification.remove()
    });
  }, 3000);
}
// Automatically swipe through the images
const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
    let index = 0;
    const items = carousel.querySelectorAll('.carousel-item');

    setInterval(() => {
        index = (index + 1) % items.length;
        carousel.scrollTo({
            left: carousel.clientWidth * index,
            behavior: 'smooth',
        });
    }, 3000); // Change every 3 seconds
});


// Interactive service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, { 
      scale: 1.05, 
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      duration: 0.3 
    });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { 
      scale: 1, 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      duration: 0.3 
    });
  });
});

const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');

// Add auto-scroll functionality
let index = 0;
setInterval(() => {
    index = (index + 1) % items.length;
    carousel.scrollTo({
        left: carousel.clientWidth * index,
        behavior: 'smooth',
    });
}, 3000); // Adjust time interval


