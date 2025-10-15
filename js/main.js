// ====================================
// Main JavaScript - zuhoor Website
// ====================================

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = mobileMenuToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
      if (navbarMenu.classList.contains('active')) {
        if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
        if (index === 1) span.style.opacity = '0';
        if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        span.style.transform = 'none';
        span.style.opacity = '1';
      }
    });
  });
}

// Smooth Scroll for Navigation Links
const navLinks = document.querySelectorAll('.nav-link, .footer-nav a');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Close mobile menu if open
        if (navbarMenu.classList.contains('active')) {
          navbarMenu.classList.remove('active');
          const spans = mobileMenuToggle.querySelectorAll('span');
          spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
          });
        }
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
});

// Active Navigation on Scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});


// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

// Clients Review Auto Slider
const reviewMembers = document.querySelectorAll('.clientsReview-member');
const dots = document.querySelectorAll('.dot');
let currentReview = 0;
let reviewInterval = null;
const REVIEW_DELAY = 3000; // 3 ثواني لكل رأي

function showReview(index) {
  reviewMembers.forEach((member, i) => {
    member.style.transition = "opacity 0.8s ease";
    if (i === index) {
      member.classList.add("active");
      member.style.display = "flex";
      requestAnimationFrame(() => (member.style.opacity = "1"));
    } else {
      member.style.opacity = "0";
      setTimeout(() => (member.style.display = "none"), 500);
      member.classList.remove("active");
    }
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}


function nextReview() {
  currentReview = (currentReview + 1) % reviewMembers.length;
  showReview(currentReview);
}

function startAutoReview() {
  stopAutoReview();
  reviewInterval = setInterval(nextReview, REVIEW_DELAY);
}

function stopAutoReview() {
  if (reviewInterval) {
    clearInterval(reviewInterval);
    reviewInterval = null;
  }
}

// تهيئة الـ slider
if (reviewMembers.length > 0) {
  // إخفاء جميع الآراء أولاً
  reviewMembers.forEach(member => {
    member.style.display = 'none';
    member.style.opacity = '0';
  });
  
  // إظهار الرأي الأول
  showReview(0);
  
  // إضافة event listeners للنقاط
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentReview = index;
      showReview(currentReview);
      startAutoReview();
    });
  });
  
  // إيقاف التشغيل التلقائي عند التمرير
  const sliderContainer = document.querySelector('.clientsReview-slider');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoReview);
    sliderContainer.addEventListener('mouseleave', startAutoReview);
  }
  
  // بدء التشغيل التلقائي
  startAutoReview();
}

// Portfolio Image Modal
const clientItems = document.querySelectorAll('.client-item');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeBtn = document.querySelector('.close-btn');

// فتح الـ modal عند النقر على الصورة
clientItems.forEach(item => {
  item.addEventListener('click', () => {
    const imageSrc = item.getAttribute('data-image');
    modalImage.src = imageSrc;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // منع التمرير
  });
});

// إغلاق الـ modal
function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; // إعادة التمرير
}

// إغلاق عند النقر على زر الإغلاق
if (closeBtn) {
  closeBtn.addEventListener('click', closeModal);
}

// إغلاق عند النقر خارج الصورة
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// إغلاق بمفتاح ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'block') {
    closeModal();
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const userEmail = form.querySelector('input[type="email"]').value.trim();

    if (userEmail === "") {
      alert("من فضلك أدخل بريدك الإلكتروني قبل المتابعة.");
      return;
    }

    const companyEmail = "zhwrmedia@gmail.com";
    const subject = encodeURIComponent("تواصل من موقع شركة ظهور");
    const body = encodeURIComponent(`مرحبًا،\n\nأنا (${userEmail}) وأود التواصل معكم بخصوص...`);

    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${companyEmail}&su=${subject}&body=${body}`, "_blank");
  });
});
