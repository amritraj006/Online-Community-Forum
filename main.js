//Page1 Js

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    let currentIndex = 0;
    let autoSlideInterval;
    const slideDuration = 5000; // 5 seconds per slide
    
    // Initialize slider
    function initSlider() {
        updateSlide();
        startAutoSlide();
        
        // Add touch events for mobile swipe (only needed for mobile)
        if (window.innerWidth <= 768) {
            const slider = document.querySelector('.slide-wrapper');
            let touchStartX = 0;
            let touchEndX = 0;
            
            slider.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                clearInterval(autoSlideInterval);
            }, {passive: true});
            
            slider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
                startAutoSlide();
            }, {passive: true});
        }
    }
    
    // Handle swipe gestures
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchStartX - touchEndX > swipeThreshold) {
            nextSlide();
        } else if (touchEndX - touchStartX > swipeThreshold) {
            prevSlide();
        }
    }
    
    // Update slide visibility and indicators
    function updateSlide() {
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active');
                slide.style.animation = 'zoomIn 1.5s ease-out forwards';
            } else {
                slide.classList.remove('active');
                slide.style.animation = '';
            }
        });
        
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        animateContent();
    }
    
    // Animate content elements
    function animateContent() {
        const contentElements = document.querySelectorAll('.slide-content, .slide-title, .slide-subtitle, .slide-buttons, .slide-stats');
        contentElements.forEach(el => {
            el.style.animation = 'none';
            void el.offsetWidth;
            const animationClass = el.classList[0].split(' ')[0];
            el.style.animation = `${animationClass.includes('title') ? 'fadeInUp 1s ease-out 0.3s both' : 
                                animationClass.includes('subtitle') ? 'fadeInUp 1s ease-out 0.5s both' :
                                animationClass.includes('buttons') ? 'fadeInUp 1s ease-out 0.7s both' :
                                animationClass.includes('stats') ? 'fadeInUp 1s ease-out 0.9s both' :
                                'fadeInUp 1s ease-out 0.1s both'}`;
        });
    }
    
    // Next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlide();
        resetAutoSlide();
    }
    
    // Previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlide();
        resetAutoSlide();
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSlide();
        resetAutoSlide();
    }
    
    // Auto-slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, slideDuration);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Only add click events if buttons exist (for desktop)
    if (prevBtn && nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
    }
    
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            goToSlide(index);
        });
    });
    
    // Initialize slider
    initSlider();
    
    // Pause auto-slide when window loses focus
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(autoSlideInterval);
        } else {
            resetAutoSlide();
        }
    });
});


//page 4 announcements

document.addEventListener('DOMContentLoaded', function() {
    // Initialize wow.js for scroll animations
    new WOW({
        offset: 100,
        mobile: false,
        live: true
    }).init();

    // DOM Elements
    const container = document.getElementById('announcementsContainer');
    const newAnnouncementBtn = document.getElementById('newAnnouncementBtn');
    const announcementModal = document.getElementById('announcementModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const announcementForm = document.getElementById('announcementForm');
    
    // Sample announcements data
    let sampleAnnouncements = [
        {
            id: 1,
            title: "Midterm Exam Schedule Released",
            content: "The schedule for midterm exams has been published on the university portal. Please check your personalized schedule and report any conflicts to the academic office by Friday.",
            category: "academic",
            date: new Date().toISOString().split('T')[0],
            author: "Academic Office",
            comments: 12,
            likes: 45,
            important: true
        },
        {
            id: 2,
            title: "Career Fair Next Week - 50+ Companies Attending",
            content: "Annual campus career fair will be held on October 25-26 in the Student Center. Over 50 companies will be participating including Google, Amazon, and Microsoft. Bring multiple copies of your resume and dress professionally!",
            category: "opportunity",
            date: "2023-10-10",
            author: "Career Services",
            comments: 8,
            likes: 32,
            important: false
        },
        {
            id: 3,
            title: "Library Extended Hours During Exam Period",
            content: "Starting this week, the main library will be open until 2 AM during weekdays to accommodate students preparing for midterms. Security will be present until closing time.",
            category: "general",
            date: "2023-10-05",
            author: "Library Services",
            comments: 5,
            likes: 28,
            important: false
        }
    ];

    // Initialize with sample data
    renderAnnouncements(sampleAnnouncements);

    // Event Listeners
    newAnnouncementBtn.addEventListener('click', function() {
        this.classList.add('animate__animated', 'animate__pulse');
        setTimeout(() => {
            this.classList.remove('animate__animated', 'animate__pulse');
            openModal();
        }, 300);
    });

    closeModalBtn.addEventListener('click', function() {
        closeModalWithAnimation();
    });

    cancelBtn.addEventListener('click', function() {
        closeModalWithAnimation();
    });
    
    announcementForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission();
    });

    // Functions
    function renderAnnouncements(announcements) {
        container.innerHTML = '';
        
        announcements.forEach((announcement, index) => {
            const card = createAnnouncementCard(announcement, index);
            container.appendChild(card);
            
            // Add animation with delay
            setTimeout(() => {
                card.classList.add('animate__animated', 'animate__fadeInUp');
            }, index * 100);
        });
    }

    function createAnnouncementCard(announcement, index) {
        const card = document.createElement('div');
        const floatingClass = announcement.important ? 'floating-card' : '';
        const urgentClass = announcement.category === 'urgent' ? 'border-l-4 border-red-500' : '';
        
        card.className = `announcement-card bg-white rounded-xl shadow-md overflow-hidden ${floatingClass} ${urgentClass} relative wow`;
        card.dataset.id = announcement.id;
        
        // Determine badge color based on category
        const badgeClass = `badge badge-${announcement.category} inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-3`;
        
        card.innerHTML = `
            <div class="p-7">
                <div class="flex justify-between items-start">
                    <div>
                        <span class="${badgeClass}">${announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)}</span>
                        <h3 class="mt-1 text-xl font-semibold text-gray-800">${announcement.title}</h3>
                    </div>
                    <span class="text-sm text-gray-500">${formatDate(announcement.date)}</span>
                </div>
                <p class="mt-4 text-gray-600 leading-relaxed">${announcement.content}</p>
                <div class="mt-6 flex items-center justify-between">
                    <span class="text-sm text-gray-500">Posted by <span class="font-medium">${announcement.author}</span></span>
                    <div class="flex space-x-4">
                        <button class="comment-btn flex items-center text-gray-500 hover:text-indigo-600 transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
                            </svg>
                            <span class="comment-count">${announcement.comments}</span>
                        </button>
                        <button class="like-btn flex items-center text-gray-500 hover:text-red-500 transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                            </svg>
                            <span class="like-count">${announcement.likes}</span>
                        </button>
                    </div>
                </div>
            </div>
            ${announcement.important ? '<div class="absolute top-0 right-0 bg-yellow-400 text-xs font-bold px-2 py-1 transform rotate-12 translate-x-2 -translate-y-2 shadow-sm">IMPORTANT</div>' : ''}
        `;
        
        // Add interaction effects
        const likeBtn = card.querySelector('.like-btn');
        const commentBtn = card.querySelector('.comment-btn');
        
        likeBtn.addEventListener('click', function() {
            const announcementId = parseInt(card.dataset.id);
            const announcement = sampleAnnouncements.find(a => a.id === announcementId);
            if (announcement) {
                announcement.likes++;
                this.querySelector('.like-count').textContent = announcement.likes;
                this.classList.add('animate__animated', 'animate__heartBeat');
                setTimeout(() => {
                    this.classList.remove('animate__animated', 'animate__heartBeat');
                }, 1000);
            }
        });
        
        commentBtn.addEventListener('click', function() {
            const announcementId = parseInt(card.dataset.id);
            const announcement = sampleAnnouncements.find(a => a.id === announcementId);
            if (announcement) {
                announcement.comments++;
                this.querySelector('.comment-count').textContent = announcement.comments;
                this.classList.add('animate__animated', 'animate__bounce');
                setTimeout(() => {
                    this.classList.remove('animate__animated', 'animate__bounce');
                }, 1000);
            }
        });
        
        return card;
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    function openModal() {
        announcementModal.classList.remove('hidden');
        // Reset animation
        const modalContent = announcementModal.querySelector('.wow');
        modalContent.classList.remove('animate__zoomOut');
        modalContent.classList.add('animate__zoomIn');
    }

    function closeModalWithAnimation() {
        const modalContent = announcementModal.querySelector('.wow');
        modalContent.classList.remove('animate__zoomIn');
        modalContent.classList.add('animate__animated', 'animate__zoomOut');
        setTimeout(closeModal, 300);
    }

    function closeModal() {
        announcementModal.classList.add('hidden');
    }

    function handleFormSubmission() {
        const submitBtn = announcementForm.querySelector('button[type="submit"]');
        submitBtn.classList.add('animate__animated', 'animate__pulse');
        setTimeout(() => {
            submitBtn.classList.remove('animate__animated', 'animate__pulse');
            createNewAnnouncement();
        }, 300);
    }

    function createNewAnnouncement() {
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const category = document.getElementById('category').value;
        
        if (!title.trim() || !content.trim()) {
            alert('Please fill in all fields');
            return;
        }
        
        const newAnnouncement = {
            id: sampleAnnouncements.length > 0 ? Math.max(...sampleAnnouncements.map(a => a.id)) + 1 : 1,
            title,
            content,
            category,
            date: new Date().toISOString().split('T')[0],
            author: "You",
            comments: 0,
            likes: 0,
            important: category === 'urgent'
        };
        
        // Save current scroll position
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add new announcement
        sampleAnnouncements.unshift(newAnnouncement);
        renderAnnouncements(sampleAnnouncements);
        
        // Reset form and close modal
        announcementForm.reset();
        closeModalWithAnimation();
        
        // Restore scroll position and highlight new card
        setTimeout(() => {
            window.scrollTo({
                top: currentScroll,
                behavior: 'auto'
            });
            
            const newCard = container.firstChild;
            if (newCard) {
                newCard.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.5)';
                setTimeout(() => {
                    newCard.style.boxShadow = '';
                }, 3000);
            }
        }, 100);
    }
});








document.addEventListener('DOMContentLoaded', function() {
    // Video Modal functionality
    const videoModal = document.getElementById('videoModal');
    const watchVideoBtn = document.getElementById('watchVideoBtn');
    const closeVideoBtn = document.getElementById('closeVideoBtn');
    const videoPlayer = document.getElementById('videoPlayer');
    
    // Toggle video modal
    watchVideoBtn.addEventListener('click', function() {
        videoModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    closeVideoBtn.addEventListener('click', function() {
        videoModal.classList.remove('show');
        document.body.style.overflow = '';
        // Stop the video when modal is closed
        videoPlayer.src = videoPlayer.src; // This resets the iframe
    });
    
    // Close modal when clicking outside the video
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            videoModal.classList.remove('show');
            document.body.style.overflow = '';
            videoPlayer.src = videoPlayer.src;
        }
    });
    
    // Existing slideshow functionality
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        let newIndex = (currentSlide + 1) % slides.length;
        showSlide(newIndex);
    }
    
    function prevSlide() {
        let newIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(newIndex);
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            showSlide(parseInt(this.getAttribute('data-index')));
        });
    });
    
    // Auto-advance slides
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const slideWrapper = document.querySelector('.slide-wrapper');
    slideWrapper.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slideWrapper.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 5000));
});



