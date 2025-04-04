document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById('sidebar');
    const toggleSidebar = document.getElementById('toggleSidebar');
    const closeSidebar = document.getElementById('closeSidebar');

    toggleSidebar.addEventListener('click', () => {
        sidebar.classList.toggle('open'); // Open/close sidebar
    });

    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('open'); // Close sidebar
    });

});


//Page 4 Announcements

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
    
    // Enhanced sample announcements data
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
        },
        {
            id: 4,
            title: "URGENT: Campus Wi-Fi Maintenance Tonight",
            content: "Critical maintenance on campus Wi-Fi will occur tonight from 1 AM to 4 AM. There will be intermittent connectivity issues during this window. Plan your work accordingly.",
            category: "urgent",
            date: new Date().toISOString().split('T')[0],
            author: "IT Services",
            comments: 15,
            likes: 10,
            important: true
        }
    ];

    // Initialize with sample data
    renderAnnouncements(sampleAnnouncements);

    // Event Listeners with animation effects
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

    // Enhanced Functions
    function renderAnnouncements(announcements) {
        container.innerHTML = '';
        
        announcements.forEach((announcement, index) => {
            const card = createAnnouncementCard(announcement, index);
            container.appendChild(card);
            
            // Add staggered animation
            card.style.animationDelay = `${index * 0.15}s`;
            card.classList.add('wow', 'animate__fadeInUp');
        });
    }

    function createAnnouncementCard(announcement) {
        const card = document.createElement('div');
        const floatingClass = announcement.important ? 'floating-card' : '';
        const urgentClass = announcement.category === 'urgent' ? 'border-l-4 border-red-500' : '';
        
        card.className = `announcement-card bg-white rounded-xl shadow-md overflow-hidden ${floatingClass} ${urgentClass} relative`;
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
        // Reset animation in case it was previously closed with zoomOut
        const modalContent = announcementModal.querySelector('.wow');
        modalContent.classList.remove('animate__zoomOut');
        modalContent.classList.add('animate__zoomIn');
    }

    function closeModalWithAnimation() {
        announcementModal.querySelector('.wow').classList.add('animate__animated', 'animate__zoomOut');
        setTimeout(closeModal, 300);
    }

    function closeModal() {
        announcementModal.classList.add('hidden');
        // Reset animation for next open
        const modalContent = announcementModal.querySelector('.wow');
        modalContent.classList.remove('animate__zoomOut');
    }

    function handleFormSubmission() {
        // Add submit animation
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
        
        // Add new announcement to the beginning of the array
        sampleAnnouncements.unshift(newAnnouncement);
        
        // Render announcements
        renderAnnouncements(sampleAnnouncements);
        
        // Reset form and close modal with animation
        announcementForm.reset();
        closeModalWithAnimation();
        
        // Restore scroll position after rendering
        setTimeout(() => {
            window.scrollTo({
                top: currentScroll,
                behavior: 'auto'
            });
            
            // Highlight the new announcement
            const newCard = container.firstChild;
            if (newCard) {
                newCard.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.5)';
                newCard.style.transition = 'box-shadow 0.5s ease';
                
                // Remove highlight after 3 seconds
                setTimeout(() => {
                    newCard.style.boxShadow = '';
                }, 3000);
            }
        }, 100); // Small delay to ensure rendering is complete
    }

    // Optional: Add keyboard shortcut for new announcement (Ctrl+Alt+N)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'n') {
            e.preventDefault();
            newAnnouncementBtn.click();
        }
    });
});



