// Main Application Logic

class FacebookApp {
    constructor() {
        this.isInitialized = false;
        this.initializeApp();
    }
    
    async initializeApp() {
        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.init());
            } else {
                this.init();
            }
        } catch (error) {
            console.error('Failed to initialize app:', error);
            notifications.error('Failed to load application');
        }
    }
    
    init() {
        console.log('🚀 Initializing Facebook Clone...');
        
        // Register modals
        this.setupModals();
        
        // Setup navigation
        this.setupNavigation();
        
        // Setup post creation
        this.setupPostCreation();
        
        // Setup stories
        this.setupStories();
        
        // Setup sidebar interactions
        this.setupSidebar();
        
        // Load initial data
        this.loadInitialData();
        
        // Setup auto-refresh
        this.setupAutoRefresh();
        
        // Setup keyboard shortcuts
        this.setupKeyboardShortcuts();
        
        // Setup intersection observer for infinite scroll
        this.setupInfiniteScroll();
        
        this.isInitialized = true;
        console.log('✅ Facebook Clone initialized successfully!');
        
        // Show welcome message
        setTimeout(() => {
            notifications.show('Welcome to Facebook Clone! 👋', 'info', 3000);
            this.updateNotificationBadge();
        }, 1000);
    }
    
    setupModals() {
        modalManager.registerModal('postModal');
        modalManager.registerModal('storyModal');
    }
    
    setupNavigation() {
        // Navigation icons
        document.querySelectorAll('.nav-icon').forEach((icon, index) => {
            icon.addEventListener('click', () => this.handleNavigation(index, icon));
        });
        
        // Mobile navigation (if exists)
        document.querySelectorAll('.mobile-nav-item').forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleMobileNavigation(index, item);
            });
        });
    }
    
    handleNavigation(index, icon) {
        // Remove active class from all icons
        document.querySelectorAll('.nav-icon').forEach(i => i.classList.remove('active'));
        icon.classList.add('active');
        
        const actions = [
            () => this.goToHome(),
            () => this.goToFriends(),
            () => this.goToWatch(),
            () => this.goToMarketplace(),
            () => this.goToGaming(),
            () => this.showNotifications(),
            () => this.goToMessenger()
        ];
        
        if (actions[index]) {
            actions[index]();
        }
    }
    
    handleMobileNavigation(index, item) {
        // Remove active class from all items
        document.querySelectorAll('.mobile-nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        const actions = [
            () => this.goToHome(),
            () => this.goToFriends(),
            () => this.goToWatch(),
            () => this.goToMarketplace(),
            () => this.showProfile()
        ];
        
        if (actions[index]) {
            actions[index]();
        }
    }
    
    setupPostCreation() {
        // Main post input
        const postInput = document.getElementById('postInput');
        if (postInput) {
            postInput.addEventListener('click', () => postCreator.open());
        }
        
        // Post action buttons
        document.getElementById('liveVideoBtn')?.addEventListener('click', () => {
            notifications.info('Live video feature coming soon! 📹');
        });
        
        document.getElementById('photoVideoBtn')?.addEventListener('click', () => {
            this.handlePhotoUpload();
        });
        
        document.getElementById('feelingBtn')?.addEventListener('click', () => {
            this.handleFeelingActivity();
        });
    }
    
    setupStories() {
        // Create story button
        document.getElementById('createStoryBtn')?.addEventListener('click', () => {
            this.createStory();
        });
        
        // Story items
        document.querySelectorAll('.story:not(.create-story)').forEach(story => {
            story.addEventListener('click', () => {
                const userId = story.dataset.user;
                const storyData = dataManager.getStories().find(s => s.username === userId);
                if (storyData) {
                    storyViewer.open(storyData.id);
                }
            });
        });
    }
    
    setupSidebar() {
        // Left sidebar items
        document.querySelectorAll('.left-sidebar .sidebar-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const text = item.textContent.trim();
                notifications.info(`Navigating to ${text}`);
            });
        });
        
        // Show more button
        document.getElementById('showMoreBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleSidebarExpansion();
        });
    }
    
    loadInitialData() {
        // Load posts
        postRenderer.renderAllPosts();
        
        // Load contacts
        contactRenderer.renderAllContacts();
        
        // Load suggestions
        contactRenderer.renderAllSuggestions();
        
        // Update online status randomly
        this.updateOnlineStatus();
    }
    
    setupAutoRefresh() {
        // Auto-refresh online status every 30 seconds
        setInterval(() => {
            this.updateOnlineStatus();
        }, 30000);
        
        // Auto-save data every 60 seconds
        setInterval(() => {
            dataManager.saveToStorage();
        }, 60000);
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Only handle shortcuts when not typing
            if (e.target.matches('input, textarea')) return;
            
            switch (e.key) {
                case 'c':
                case 'C':
                    if (e.ctrlKey || e.metaKey) break; // Allow Ctrl+C
                    postCreator.open();
                    e.preventDefault();
                    break;
                    
                case 'h':
                case 'H':
                    this.goToHome();
                    e.preventDefault();
                    break;
                    
                case 'f':
                case 'F':
                    if (e.ctrlKey || e.metaKey) break; // Allow Ctrl+F
                    this.goToFriends();
                    e.preventDefault();
                    break;
                    
                case '/':
                    document.getElementById('searchInput')?.focus();
                    e.preventDefault();
                    break;
            }
        });
    }
    
    setupInfiniteScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadMorePosts();
                }
            });
        }, {
            rootMargin: '100px'
        });
        
        // Create a sentinel element
        const sentinel = document.createElement('div');
        sentinel.id = 'scroll-sentinel';
        sentinel.style.height = '1px';
        
        const postsContainer = document.getElementById('postsContainer');
        if (postsContainer) {
            postsContainer.appendChild(sentinel);
            observer.observe(sentinel);
        }
    }
    
    // Navigation methods
    goToHome() {
        pageManager.navigateTo('home');
        notifications.info('Welcome back to your News Feed! 🏠');
    }
    
    goToFriends() {
        pageManager.navigateTo('friends');
    }
    
    goToWatch() {
        pageManager.navigateTo('watch');
    }
    
    goToMarketplace() {
        pageManager.navigateTo('marketplace');
    }
    
    goToGaming() {
        pageManager.navigateTo('gaming');
    }
    
    showNotifications() {
        pageManager.navigateTo('notifications');
    }
    
    goToMessenger() {
        notifications.info('Messenger - Feature coming soon! 💬');
    }
    
    showProfile() {
        notifications.info('Profile page - Feature coming soon! 👤');
    }
    
    // Feature methods
    handlePhotoUpload() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*,video/*';
        input.multiple = true;
        
        input.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            if (files.length > 0) {
                notifications.info(`Selected ${files.length} file(s). Upload feature coming soon! 📷`);
                postCreator.open();
            }
        });
        
        input.click();
    }
    
    handleFeelingActivity() {
        const feelings = [
            '😊 happy', '😢 sad', '😍 in love', '😎 cool', 
            '🤔 thoughtful', '😴 tired', '🎉 excited', '😋 hungry',
            '🏃‍♂️ exercising', '🍕 eating', '📚 reading', '🎵 listening to music'
        ];
        
        const activities = [
            '🏠 at home', '🏢 at work', '🍽️ at restaurant', '🎬 watching movie',
            '✈️ traveling', '🏖️ at beach', '🏔️ hiking', '🚗 driving'
        ];
        
        const randomFeeling = feelings[Math.floor(Math.random() * feelings.length)];
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        
        const choice = confirm(`Add "${randomFeeling}" or "${randomActivity}" to your post?`);
        if (choice) {
            postCreator.open();
            setTimeout(() => {
                const textarea = document.getElementById('modalTextarea');
                if (textarea) {
                    textarea.value = `Feeling ${randomFeeling} ${randomActivity} `;
                    textarea.focus();
                    postCreator.handleTextareaChange();
                }
            }, 100);
        }
    }
    
    createStory() {
        const content = prompt('What\'s your story today?');
        if (content && content.trim()) {
            const backgrounds = [
                'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                'linear-gradient(45deg, #667eea, #764ba2)',
                'linear-gradient(45deg, #f093fb, #f5576c)',
                'linear-gradient(45deg, #4facfe, #00f2fe)',
                'linear-gradient(45deg, #43e97b, #38f9d7)',
                'linear-gradient(45deg, #fa709a, #fee140)'
            ];
            
            const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
            const story = dataManager.createStory(content.trim(), randomBackground);
            
            notifications.show('Story created! 📱');
            this.refreshStories();
        }
    }
    
    toggleSidebarExpansion() {
        const btn = document.getElementById('showMoreBtn');
        const shortcuts = document.querySelector('.sidebar-shortcuts');
        
        if (btn && shortcuts) {
            const isExpanded = shortcuts.style.display !== 'none';
            shortcuts.style.display = isExpanded ? 'none' : 'block';
            btn.innerHTML = `
                <div class="sidebar-icon">${isExpanded ? '⬇️' : '⬆️'}</div>
                ${isExpanded ? 'See more' : 'See less'}
            `;
        }
    }
    
    updateOnlineStatus() {
        const contacts = dataManager.getContacts();
        contacts.forEach(contact => {
            // Randomly update online status
            if (Math.random() < 0.1) { // 10% chance to change status
                contact.isOnline = !contact.isOnline;
                if (!contact.isOnline) {
                    const timeOptions = ['2m', '5m', '15m', '1h', '2h'];
                    contact.lastSeen = timeOptions[Math.floor(Math.random() * timeOptions.length)] + ' ago';
                }
            }
        });
        
        contactRenderer.renderAllContacts();
    }
    
    loadMorePosts() {
        // Simulate loading more posts
        if (this.isLoadingPosts) return;
        
        this.isLoadingPosts = true;
        
        setTimeout(() => {
            // Generate random post
            const users = ['Alice Smith', 'Bob Johnson', 'Carol Williams', 'David Brown', 'Emma Davis'];
            const avatars = ['AS', 'BJ', 'CW', 'DB', 'ED'];
            const contents = [
                'Just had an amazing coffee! ☕',
                'Beautiful sunset today 🌅',
                'Working on something exciting! 💻',
                'Weekend vibes 🎉',
                'Grateful for good friends 💚'
            ];
            
            const randomIndex = Math.floor(Math.random() * users.length);
            const newPost = {
                id: `post_${Date.now()}`,
                userId: `user_${randomIndex + 10}`,
                username: users[randomIndex],
                avatar: avatars[randomIndex],
                content: contents[Math.floor(Math.random() * contents.length)],
                image: Math.random() > 0.5 ? 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop' : null,
                timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
                reactions: { like: Math.floor(Math.random() * 20) },
                comments: Math.floor(Math.random() * 10),
                shares: Math.floor(Math.random() * 5),
                isLiked: false,
                isShared: false
            };
            
            const postElement = postRenderer.renderPost(newPost);
            document.getElementById('postsContainer').appendChild(postElement);
            
            this.isLoadingPosts = false;
        }, 1000);
    }
    
    refreshStories() {
        // Refresh stories display
        const storiesContainer = document.querySelector('.stories-container');
        if (storiesContainer) {
            // This would typically re-render all stories
            // For now, just show a notification
            notifications.info('Stories updated!');
        }
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    updateNotificationBadge() {
        const badge = document.querySelector('.notification-badge');
        const unreadCount = pagesDataManager.getUnreadNotificationCount();
        
        if (badge) {
            if (unreadCount > 0) {
                badge.textContent = unreadCount;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        }
    }
    
    // Error handling
    handleError(error, context = 'Unknown') {
        console.error(`Error in ${context}:`, error);
        notifications.error(`Something went wrong. Please try again.`);
    }
}

// Initialize the application
const app = new FacebookApp();

// Make app globally available for debugging
window.app = app;

// Service worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Handle online/offline status
window.addEventListener('online', () => {
    notifications.show('You\'re back online! 🌐', 'success');
});

window.addEventListener('offline', () => {
    notifications.warning('You\'re offline. Some features may not work. 📡');
});

// Handle visibility change (tab switching)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('App is now hidden');
    } else {
        console.log('App is now visible');
        // Refresh data when user comes back
        if (app.isInitialized) {
            app.updateOnlineStatus();
        }
    }
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`🚀 App loaded in ${loadTime.toFixed(2)}ms`);
});

// Error boundary for unhandled errors
window.addEventListener('error', (e) => {
    console.error('Unhandled error:', e.error);
    notifications.error('An unexpected error occurred');
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    notifications.error('An unexpected error occurred');
    e.preventDefault();
});

console.log('📱 Facebook Clone - Main script loaded');
