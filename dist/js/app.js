// Kompiliertes/öffentliches JS (entspricht aktuell src/js/app.js).
// Wenn du einen Bundler verwendest, kannst du diesen Code aus src/js
// hierher builden lassen.

document.addEventListener("DOMContentLoaded", () => {
    console.log("Xtrabuff Bento-Galerie geladen (public/js/app.js).");

    // Hero-Slider
    const heroSlider = document.querySelector(".hero-slider");
    if (heroSlider) {
        const slides = Array.from(heroSlider.querySelectorAll(".hero-slide"));
        const dots = Array.from(heroSlider.querySelectorAll(".hero-dot"));

        if (slides.length > 0 && dots.length > 0) {
            let currentIndex = 0;
            let intervalId;

            function setSlide(index) {
                slides.forEach((slide, i) => {
                    slide.classList.toggle("is-active", i === index);
                });
                dots.forEach((dot, i) => {
                    dot.classList.toggle("is-active", i === index);
                });
                currentIndex = index;
            }

            function nextSlide() {
                const nextIndex = (currentIndex + 1) % slides.length;
                setSlide(nextIndex);
            }

            function startAuto() {
                stopAuto();
                intervalId = setInterval(nextSlide, 5000); // alle 5 Sekunden wechseln
            }

            function stopAuto() {
                if (intervalId) {
                    clearInterval(intervalId);
                    intervalId = undefined;
                }
            }

            dots.forEach((dot) => {
                dot.addEventListener("click", () => {
                    const index = Number(dot.getAttribute("data-slide")) || 0;
                    setSlide(index);
                    startAuto();
                });
            });

            setSlide(0);
            startAuto();
        }
    }

    // Countdown (Ende Juni 2026)
    const countdownEl = document.querySelector(".countdown-time");
    if (countdownEl) {
        const targetAttr = countdownEl.getAttribute("data-countdown-target");
        const targetDate = targetAttr ? new Date(targetAttr) : new Date("2026-06-30T23:59:59");

        function updateCountdown() {
            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();

            if (diff <= 0) {
                countdownEl.textContent = "00:00:00:00";
                return;
            }

            const totalSeconds = Math.floor(diff / 1000);
            const days = Math.floor(totalSeconds / (24 * 3600));
            const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            const dd = String(days).padStart(2, "0");
            const hh = String(hours).padStart(2, "0");
            const mm = String(minutes).padStart(2, "0");
            const ss = String(seconds).padStart(2, "0");

            countdownEl.textContent = `${dd}:${hh}:${mm}:${ss}`;
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const menuIcon = document.getElementById("menu-icon");
    const closeIcon = document.getElementById("close-icon");

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener("click", () => {
            const isHidden = mobileMenu.classList.contains("hidden");
            
            if (isHidden) {
                mobileMenu.classList.remove("hidden");
                menuIcon.classList.add("hidden");
                closeIcon.classList.remove("hidden");
            } else {
                mobileMenu.classList.add("hidden");
                menuIcon.classList.remove("hidden");
                closeIcon.classList.add("hidden");
            }
        });
    }

    // Mobile Dropdown Toggle
    const mobileDropdownToggles = document.querySelectorAll(".mobile-dropdown-toggle");
    mobileDropdownToggles.forEach((toggle) => {
        toggle.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            const dropdown = toggle.closest(".mobile-dropdown");
            const content = dropdown?.querySelector(".mobile-dropdown-content");
            const svg = toggle.querySelector("svg");

            if (content) {
                const isHidden = content.classList.contains("hidden");
                
                // Schließe alle anderen Dropdowns
                document.querySelectorAll(".mobile-dropdown-content").forEach((otherContent) => {
                    if (otherContent !== content) {
                        otherContent.classList.add("hidden");
                        const otherSvg = otherContent.closest(".mobile-dropdown")?.querySelector(".mobile-dropdown-toggle svg");
                        if (otherSvg) {
                            otherSvg.style.transform = "rotate(0deg)";
                        }
                    }
                });

                if (isHidden) {
                    content.classList.remove("hidden");
                    if (svg) {
                        svg.style.transform = "rotate(180deg)";
                    }
                } else {
                    content.classList.add("hidden");
                    if (svg) {
                        svg.style.transform = "rotate(0deg)";
                    }
                }
            }
        });
    });

    // Schließe Mobile Menu beim Klick außerhalb
    document.addEventListener("click", (e) => {
        if (mobileMenu && mobileMenuToggle) {
            const isClickInside = mobileMenu.contains(e.target) || mobileMenuToggle.contains(e.target);
            if (!isClickInside && !mobileMenu.classList.contains("hidden")) {
                mobileMenu.classList.add("hidden");
                if (menuIcon) menuIcon.classList.remove("hidden");
                if (closeIcon) closeIcon.classList.add("hidden");
            }
        }
    });
});

