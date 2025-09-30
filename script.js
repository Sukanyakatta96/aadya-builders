// DOM Elements
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('backToTop');
const disclaimerPopup = document.getElementById('disclaimerPopup');
const acceptDisclaimer = document.getElementById('acceptDisclaimer');
const siteVisitForm = document.getElementById('siteVisitForm');
const fadeElems = document.querySelectorAll('.fade-in');

// Brochure download
document.addEventListener('DOMContentLoaded', function () {
  const openBtn = document.getElementById('downloadBrochureBtn');
  const modal = document.getElementById('brochureModal');
  const closeBtn = document.getElementById('brochureClose');
  const form = document.getElementById('brochureForm');
  const phoneInput = document.getElementById('phoneDigits');
  const formWrapper = document.getElementById('formWrapper');
  const thankYouMessage = document.getElementById('thankYouMessage');

  // Default brochure path (always downloads this one)
  const brochurePath = '/asset/files/brochure.pdf';

  // Open modal (prevent link redirect)
  if (openBtn) {
    openBtn.addEventListener('click', function (e) {
      e.preventDefault(); 
      modal.style.display = 'block';
      document.documentElement.style.overflow = 'hidden';
    });
  }

  // Close modal
  function closeModal() {
    modal.style.display = 'none';
    document.documentElement.style.overflow = '';
    form.reset();
    phoneInput.value = '';
    formWrapper.style.display = 'block';
    thankYouMessage.style.display = 'none';
  }
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function (ev) {
    if (ev.target === modal) closeModal();
  });

  // Phone: only 10 digits allowed
  phoneInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').slice(0, 10);
  });

  // Form submit
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const agree = document.getElementById('agree');

    // Check required fields manually
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Extra check for agree box
    if (!agree.checked) {
      alert("⚠️ Please agree to the terms before submitting.");
      return;
    }

    formWrapper.style.display = 'none';
    thankYouMessage.style.display = 'block';

    try {
      const response = await fetch(brochurePath);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'brochure.pdf'; // default name
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      const a = document.createElement('a');
      a.href = brochurePath;
      a.download = 'brochure.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }

    setTimeout(closeModal, 3000);
  });
});


  // About Us slider
  const slides = document.querySelector('.slides');
  const slider = document.querySelector('.slider');
  let index = 0;
  let interval;

  // Clone first slide and append it to the end
  const firstClone = slides.children[0].cloneNode(true);
  slides.appendChild(firstClone);
  const totalSlides = slides.children.length;

  function showSlide(i) {
    slides.style.transition = "transform 0.5s ease-in-out";
    slides.style.transform = `translateX(-${i * 100}%)`;
  }

  function startSlider() {
    interval = setInterval(() => {
      index++;
      showSlide(index);

      // If we reach the clone (last slide), reset back to real first
      if (index === totalSlides - 1) {
        setTimeout(() => {
          slides.style.transition = "none"; // remove animation
          slides.style.transform = "translateX(0)"; // jump to first
          index = 0;
        }, 500); // wait for slide transition to finish
      }
    }, 3000);
  }

  function stopSlider() {
    clearInterval(interval);
  }

  // Start autoplay
  startSlider();

  // Pause on hover
  slider.addEventListener('mouseenter', stopSlider);
  slider.addEventListener('mouseleave', startSlider);

// Sticky Header
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navList.classList.toggle('active');
});

// Set active link when clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(nav => nav.classList.remove('active')); // clear old
    link.classList.add('active'); // set new
  });
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navList.classList.remove('active');
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
    });
});

// Back to Top Button
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Disclaimer Popup
if (!localStorage.getItem('disclaimerAccepted')) {
    disclaimerPopup.classList.remove('hidden');
}

acceptDisclaimer.addEventListener('click', () => {
    disclaimerPopup.classList.add('hidden');
    localStorage.setItem('disclaimerAccepted', 'true');
});

// Always reset to homepage on refresh
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
  }

  const hero = document.getElementById("hero");
  if (hero) {
    window.scrollTo(0, 0);
    setTimeout(() => {
      hero.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 10);
  }

  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => link.classList.remove("active"));

  const homeLink = document.querySelector('a[href="#hero"]');
  if (homeLink) {
    homeLink.classList.add("active");
  }
});

// Show button only after scrolling 100px down
window.addEventListener("scroll", function() {
  const backToTop = document.getElementById("backToTop");
  if (window.scrollY > 100) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }
});

// Scroll smoothly to top when clicked
document.getElementById("backToTop").addEventListener("click", function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Initially hide back-to-top
document.getElementById("backToTop").style.display = "none";


// Form Validation
siteVisitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    if (name && email && phone && message) {
        alert('Thank you for your request! We will contact you shortly to confirm your site visit.');
        siteVisitForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Scroll Animations
function checkFade() {
    fadeElems.forEach(elem => {
        const elemTop = elem.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elemTop < windowHeight - 100) {
            elem.classList.add('appear');
        }
    });
}

window.addEventListener('scroll', checkFade);
window.addEventListener('load', checkFade);

// chatbot

let chatState = 'initial';
let formData = {};

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning!";
    if (hour < 18) return "Good Afternoon!";
    return "Good Evening!";
}

function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.classList.contains('open') ? closeChat() : openChat();
}

function openChat() {
    document.getElementById('chatWindow').classList.add('open');
    document.getElementById('notificationDot').style.display = 'none';
}

function closeChat() {
    document.getElementById('chatWindow').classList.remove('open');
}

function addMessage(content, isBot = true, isHtml = false) {
    const chatBody = document.getElementById('chatBody');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isBot ? 'bot' : 'user'}`;
    messageDiv.innerHTML = `<div class="message-bubble">${content}</div>`;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function showGreeting() {
    if (chatState !== 'initial') return;
    const greeting = getGreeting();
    addMessage(`${greeting} I'm here to help you find your dream villa.`);
    setTimeout(() => showContactForm(), 500);
}

function showContactForm() {
    chatState = 'form';
    const formHtml = `
        <div class="contact-form" id="contactForm">
            <div class="form-row">
                <label for="userName">Full Name *</label>
                <input type="text" id="userName" placeholder="Enter your name" required>
                <div class="error-msg" id="nameError"></div>
            </div>
            <div class="form-row">
                <label for="userEmail">Email Address *</label>
                <input type="email" id="userEmail" placeholder="Enter your email" required>
                <div class="error-msg" id="emailError"></div>
            </div>
            <div class="form-row">
                <label for="userPhone">Phone Number *</label>
                <input type="tel" id="userPhone" placeholder="Enter 10-digit phone number" maxlength="10" required>
                <div class="error-msg" id="phoneError"></div>
            </div>
            <div class="consent-row">
                <input type="checkbox" id="consent" required>
                <div class="consent-text">I consent to being contacted by Aadya Real Estate via calls/WhatsApp/SMS for property information.</div>
            </div>
            <button type="button" class="submit-btn" onclick="submitForm()" id="submitBtn">
                Submit Details
            </button>
        </div>
    `;
    addMessage(formHtml, true, true);

    // Add phone number input validation (scoped to the contact form)
    setTimeout(() => {
        const formEl = document.getElementById('contactForm') || document.querySelector('.contact-form');
        if (!formEl) return;
        const phoneInput = formEl.querySelector('#userPhone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
            });
        }
    }, 100);
}

function validateForm() {
    const formEl = document.getElementById('contactForm') || document.querySelector('.contact-form');
    if (!formEl) return false;

    const nameInput = formEl.querySelector('#userName');
    const emailInput = formEl.querySelector('#userEmail');
    const phoneInput = formEl.querySelector('#userPhone');
    const consentInput = formEl.querySelector('#consent');

    const nameError = formEl.querySelector('#nameError');
    const emailError = formEl.querySelector('#emailError');
    const phoneError = formEl.querySelector('#phoneError');

    const name = (nameInput?.value || '').trim();
    const email = (emailInput?.value || '').trim();
    const phone = (phoneInput?.value || '').trim();
    const consent = !!consentInput?.checked;

    let isValid = true;

    // Clear previous errors
    if (nameError) nameError.textContent = '';
    if (emailError) emailError.textContent = '';
    if (phoneError) phoneError.textContent = '';
    nameInput?.classList.remove('error');
    emailInput?.classList.remove('error');
    phoneInput?.classList.remove('error');

    if (!name) {
        if (nameError) nameError.textContent = 'Name is required';
        nameInput?.classList.add('error');
        isValid = false;
    }
    if (!email) {
        if (emailError) emailError.textContent = 'Email is required';
        emailInput?.classList.add('error');
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (emailError) emailError.textContent = 'Please enter a valid email';
        emailInput?.classList.add('error');
        isValid = false;
    }
    if (!phone) {
        if (phoneError) phoneError.textContent = 'Phone number is required';
        phoneInput?.classList.add('error');
        isValid = false;
    } else if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
        if (phoneError) phoneError.textContent = 'Please enter a valid 10-digit phone number';
        phoneInput?.classList.add('error');
        isValid = false;
    }

    if (!consent) {
        addMessage("Please check the consent box to proceed.", true);
        isValid = false;
    }

    return isValid;
}

function submitForm() {
    if (!validateForm()) return;

    const formEl = document.getElementById('contactForm') || document.querySelector('.contact-form');
    if (!formEl) return;

    const name = formEl.querySelector('#userName')?.value.trim() || '';
    const email = formEl.querySelector('#userEmail')?.value.trim() || '';
    const phone = formEl.querySelector('#userPhone')?.value.trim() || '';
    formData = { name, email, phone };

    const submitBtn = formEl.querySelector('#submitBtn') || formEl.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.innerHTML = 'Submitting...';
        submitBtn.disabled = true;
    }

    // Simulate fast API call
    setTimeout(() => {
        formEl.remove();
        addMessage(`<div class="success-msg">✅ Thank you ${name}! Our sales team will contact you within 24 hours.</div>`, true, true);
        chatState = 'thankyou';
        setTimeout(() => showMainMenu(), 1000);
    }, 800);
}

function showMainMenu() {
    chatState = 'menu';
    const menuHtml = `
        <div class="quick-btns">
            <button class="quick-btn" onclick="downloadBrochure()">Download Brochure </button>
            <button class="quick-btn" onclick="showFAQs()">❓ FAQs</button>
            <button class="quick-btn" onclick="showContactOptions()">📞 Contact</button>
        </div>
    `;
    addMessage("How can I assist you further?", true);
    addMessage(menuHtml, true, true);
}

function downloadBrochure() {
    chatState = 'brochure';
    addMessage("📄 Downloading our villa brochure...", true);
    try {
        const link = document.createElement('a');
        link.href = 'assets/villa-brochure.pdf';
        link.download = 'Aadya-Villa-Brochure.pdf';
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => {
            addMessage("✅ Villa brochure downloaded successfully!", true);
            addMessage("Would you like to schedule a site visit or need more information?", true);
            const followUpHtml = `
                <div class="quick-btns">
                    <button class="quick-btn" onclick="scheduleVisit()">📅 Schedule Visit</button>
                    <button class="quick-btn" onclick="showContactOptions()">📞 Contact Sales</button>
                    <button class="quick-btn" onclick="showMainMenu()">← Main Menu</button>
                </div>
            `;
            addMessage(followUpHtml, true, true);
        }, 1000);
    } catch (err) {
        addMessage("⚠️ Failed to download brochure. Please try again later.", true);
    }
}

function showFAQs() {
    chatState = 'faqs';
    const faqsHtml = `
        <div class="faq-item" onclick="toggleFAQ(this)">
            <div class="faq-question">📍 Where are the villas located? <span>+</span></div>
            <div class="faq-answer">Our villas are located in prime areas of Patancheruvu, Hyderabad with excellent connectivity to major IT hubs and amenities.</div>
        </div>
        <div class="faq-item" onclick="toggleFAQ(this)">
            <div class="faq-question">✅ Are the projects RERA approved? <span>+</span></div>
            <div class="faq-answer">Yes, all our projects are RERA approved and registered. This project holds the RERA ID: P02400003456.</div>
        </div>
        <div class="faq-item" onclick="toggleFAQ(this)">
            <div class="faq-question">💰 What are the price ranges? <span>+</span></div>
            <div class="faq-answer">Each villa is priced between ₹2 Cr and ₹3 Cr. You can pay 50% upfront, with the remaining amount payable later. Flexible payment plans and bank loan assistance are available.</div>
        </div>
        <div class="faq-item" onclick="toggleFAQ(this)">
            <div class="faq-question">🏡 What amenities are included? <span>+</span></div>
            <div class="faq-answer">Clubhouse, swimming pool, gym, children's play area, landscaped gardens, jogging & cycling tracks, indoor games, 24/7 security and covered parking.</div>
        </div>
        <div class="faq-item" onclick="toggleFAQ(this)">
            <div class="faq-question">📅 When can I get possession? <span>+</span></div>
            <div class="faq-answer">All villas are currently under construction, with possession scheduled within 12–18 months from booking.</div>
        </div>
        <button class="back-btn" onclick="showMainMenu()">← Back to Menu</button>
    `;
    addMessage("Here are answers to frequently asked questions:", true);
    addMessage(faqsHtml, true, true);
}

function toggleFAQ(element) {
    const answer = element.querySelector('.faq-answer');
    const icon = element.querySelector('.faq-question span');
    if (answer.classList.contains('show')) {
        answer.classList.remove('show');
        icon.textContent = '+';
    } else {
        // Close all other FAQs
        document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('show'));
        document.querySelectorAll('.faq-question span').forEach(i => i.textContent = '+');
        // Open clicked FAQ
        answer.classList.add('show');
        icon.textContent = '−';
    }
}

function showContactOptions() {
    chatState = 'contact';
    const contactHtml = `
        <div class="contact-links">
            <a href="mailto:sales@aadyarealestate.com?subject=Villa Inquiry&body=Hi, I'm interested in your villa projects. Please share more details." class="contact-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                Email Us
            </a>
            <a href="tel:+917702185555" class="contact-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                Call Now
            </a>
            <a href="https://wa.me/917702185555?text=Hi%2C%20I%27m%20interested%20in%20your%20villa%20projects.%20Please%20share%20details." target="_blank" class="contact-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                </svg>
                WhatsApp Chat
            </a>
        </div>
        <button class="back-btn" onclick="showMainMenu()">← Back to Menu</button>
    `;
    addMessage("Choose your preferred contact method:", true);
    addMessage(contactHtml, true, true);
}

function scheduleVisit() {
    addMessage("📅 Great choice! I'll help you schedule a visit to our villa project.");
    const scheduleHtml = `
        <div class="contact-form">
            <p style="font-size: 13px; color: #666; margin-bottom: 10px;">Our sales team will contact you within 24 hours to confirm your preferred date and time.</p>
            <div class="quick-btns">
                <button class="quick-btn" onclick="confirmSchedule('today')">📅 Today</button>
                <button class="quick-btn" onclick="confirmSchedule('tomorrow')">📅 Tomorrow</button>
                <button class="quick-btn" onclick="confirmSchedule('weekend')">📅 This Weekend</button>
            </div>
        </div>
    `;
    addMessage(scheduleHtml, true, true);
}

function confirmSchedule(timeframe) {
    let timeText = '';
    switch(timeframe) {
        case 'today': timeText = 'today'; break;
        case 'tomorrow': timeText = 'tomorrow'; break;
        case 'weekend': timeText = 'this weekend'; break;
    }
    addMessage(`✅ Perfect! Your site visit is scheduled for ${timeText}.`);
    addMessage("Our sales executive will call you shortly to confirm the exact time and provide directions to the site.");
    setTimeout(() => {
        const followUpHtml = `
            <div class="quick-btns">
                <button class="quick-btn" onclick="showContactOptions()">📞 Contact Sales</button>
                <button class="quick-btn" onclick="showFAQs()">❓ More Questions</button>
                <button class="quick-btn" onclick="showMainMenu()">← Main Menu</button>
            </div>
        `;
        addMessage("Anything else I can help you with?", true);
        addMessage(followUpHtml, true, true);
    }, 2000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeChat();
    if (e.ctrlKey && e.key === 'm') toggleChat();
});

// Click outside to close
document.addEventListener('click', function(e) {
    const container = document.querySelector('.chatbot-container');
    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow.classList.contains('open') && !container.contains(e.target)) {
        closeChat();
    }
});

// Prevent form submission on Enter key in input fields
document.addEventListener('keypress', function(e) {
    if (e.target.tagName === 'INPUT' && e.key === 'Enter') {
        e.preventDefault();
        if (e.target.closest('.contact-form')) {
            submitForm();
        }
    }
});

// Auto-scroll chat body when new messages are added
const observer = new MutationObserver(function() {
    const chatBody = document.getElementById('chatBody');
    chatBody.scrollTop = chatBody.scrollHeight;
});
document.addEventListener('DOMContentLoaded', function() {
    const chatBody = document.getElementById('chatBody');
    observer.observe(chatBody, { childList: true });
});

// Disclimer hold 
document.addEventListener('DOMContentLoaded', function () {
    const acceptBtn = document.getElementById('acceptDisclaimer');
    const disclaimerPopup = document.getElementById('disclaimerPopup');
    const video = document.getElementById('homepageVideo');

    if (acceptBtn) {
        acceptBtn.addEventListener('click', function () {
            // Hide disclaimer popup
            disclaimerPopup.style.display = 'none';

            // ✅ Start homepage video
            if (video) {
                video.play().catch(err => {
                    console.log("Autoplay blocked, user must click play:", err);
                });
            }

            // ✅ Open chatbot after 2s
            setTimeout(() => {
                if (typeof chatState !== "undefined" && chatState === 'initial') {
                    openChat();
                    showGreeting();
                }
            }, 2000);
        });
    }
});
