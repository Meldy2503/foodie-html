// npx tailwindcss -i ./css/style.css -o ./css/output.css --watch

// Select elements for navbar
const navbar = document.getElementById("home-navbar");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const navBtns = document.querySelectorAll(".nav-btn");

// Scroll Event: Toggle class for navbar
if (navbar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// Mobile Menu: Toggle menu visibility
if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}

// Close Menu: When a nav link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});
// Close Menu: When a nav btn is clicked
navBtns.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Function to setup password toggles
function setupPasswordToggle(passwordId, toggleButtonId) {
  const passwordInput = document.getElementById(passwordId);
  const toggleButton = document.getElementById(toggleButtonId);

  if (toggleButton && passwordInput) {
    toggleButton.addEventListener("click", function (e) {
      e.preventDefault();
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      toggleButton.innerHTML = isPassword
        ? '<i class="fas fa-eye"></i>'
        : '<i class="fas fa-eye-slash"></i>';
    });
  }
}

// Function to open a modal and load its content
async function openModal(modalClass, contentPath) {
  // Initially Hide all modals
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.classList.add("hidden");
  });

  const modal = document.querySelector(`.${modalClass}`);
  if (!modal) return;
  modal.classList.remove("hidden");
  const contentContainer = modal.querySelector(".bg-white");
  if (!contentContainer) return;

  try {
    const response = await fetch(contentPath);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const content = await response.text();
    contentContainer.innerHTML = content;

    // Set up password toggles after content is loaded
    if (modalClass === "login-modal") {
      setupPasswordToggle("password", "toggle-password");
    } else if (modalClass === "register-modal") {
      setupPasswordToggle("register-password", "toggle-register-password");
      setupPasswordToggle("confirm-password", "toggle-confirm-password");
    }
  } catch (error) {
    console.error("Error loading modal content:", error);
  }
}

function setupGlobalEventListeners() {
  document.addEventListener("click", (event) => {
    // Open register modal
    if (event.target.matches(".open-register")) {
      event.preventDefault();
      openModal("register-modal", "/components/register.html");
    }

    // Open login modal
    if (event.target.matches(".open-login")) {
      event.preventDefault();
      openModal("login-modal", "/components/login.html");
    }

    // Close modal when clicking outside
    if (event.target.matches(".modal")) {
      event.target.classList.add("hidden");
    }

    // Close modal when the close button is clicked
    if (event.target.closest(".close-modal")) {
      const modal = event.target.closest(".modal");
      if (modal) {
        modal.classList.add("hidden");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupGlobalEventListeners();
});

// Function to load the footer
function loadFooter() {
  const footerElement = document.getElementById("footer");

  // Check if the footer element exists before loading
  if (!footerElement) {
    return;
  }
  fetch("../components/footer.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load footer");
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
    })
    .catch((error) => {
      console.error("Error loading footer:", error);
    });
}
// Call the footer function
loadFooter();

// Slider functionality for the home page themes section
const slider = document.getElementById("slider");
if (slider) {
  const slides = Array.from(slider.children);
  const totalOriginalSlides = 5;
  let currentIndex = 0;

  function updateSliderPosition(instant = false) {
    const slideWidth = slides[0].offsetWidth;
    if (instant) {
      slider.style.transition = "none";
      slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      slider.offsetHeight; // Force a reflow
      slider.style.transition = "transform 300ms ease-in-out";
    } else {
      slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
  }

  function slide(direction) {
    if (direction === "next") {
      currentIndex++;
      updateSliderPosition();
      if (currentIndex >= totalOriginalSlides) {
        setTimeout(() => {
          currentIndex = 0;
          updateSliderPosition(true);
        }, 300);
      }
    } else {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = totalOriginalSlides - 1;
      }
      updateSliderPosition();
    }
  }

  // Automatic sliding every 3 seconds
  setInterval(() => slide("next"), 3000);

  // Initialize slider
  window.addEventListener("resize", () => updateSliderPosition(true));
  updateSliderPosition();
}

// To add a loading spinner on page load
document.addEventListener("DOMContentLoaded", () => {
  const spinner = document.getElementById("spinner");
  // To simulate a delay to ensure the spinner is visible
  if (spinner) {
    setTimeout(() => {
      spinner.style.display = "none";
    }, 500);
  }
});

// Slider for the recommendation section
function setupRecommendationSlider(sliderId) {
  const slider = document.getElementById(sliderId);
  if (!slider) return;
  const slideContainer = slider.querySelector(".flex");
  const slides = Array.from(slideContainer.children);
  // Get buttons specifically within the slider's parent container
  const sliderParent = slider.parentElement;
  const prevButton = sliderParent.querySelector(
    '[aria-label="previous button"]'
  );
  const nextButton = sliderParent.querySelector('[aria-label="next button"]');
  let currentIndex = 0;
  let isTransitioning = false;
  let autoSlideInterval;
  // Clone first and last slides for smooth infinite loop
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  slideContainer.appendChild(firstClone);
  slideContainer.insertBefore(lastClone, slides[0]);
  // Adjust initial position to show first real slide
  slideContainer.style.transform = `translateX(-100%)`;
  function updateSliderPosition(useTransition = true) {
    if (!useTransition) {
      slideContainer.style.transition = "none";
    } else {
      slideContainer.style.transition = "transform 0.3s ease-in-out";
    }

    const translation = -(currentIndex + 1) * 100;
    slideContainer.style.transform = `translateX(${translation}%)`;

    if (!useTransition) {
      // Force a reflow to ensure the transition removal takes effect
      slideContainer.offsetHeight;
    }
  }

  function slide(direction) {
    if (isTransitioning) return;
    isTransitioning = true;
    // Reset auto-slide interval
    clearInterval(autoSlideInterval);
    startAutoSlide();

    if (direction === "next") {
      currentIndex++;
      updateSliderPosition();
      // If we've moved past the last real slide
      if (currentIndex >= slides.length) {
        setTimeout(() => {
          currentIndex = 0;
          updateSliderPosition(false);
        }, 300);
      }
    } else if (direction === "prev") {
      currentIndex--;
      updateSliderPosition();

      // If we've moved before the first real slide
      if (currentIndex < 0) {
        setTimeout(() => {
          currentIndex = slides.length - 1;
          updateSliderPosition(false);
        }, 300);
      }
    }
    setTimeout(() => {
      isTransitioning = false;
    }, 300);
  }
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => slide("next"), 4000);
  }

  // Add event listeners to buttons
  if (prevButton) {
    prevButton.addEventListener("click", () => slide("prev"));
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => slide("next"));
  }

  // Pause auto-sliding on hover
  slider.addEventListener("mouseenter", () => {
    clearInterval(autoSlideInterval);
  });

  slider.addEventListener("mouseleave", () => {
    startAutoSlide();
  });

  // Start auto-sliding
  startAutoSlide();
}

// Initialize the slider when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setupRecommendationSlider("recommendation-slider");
});
