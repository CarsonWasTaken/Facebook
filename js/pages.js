// Page Controllers for Facebook Clone

class PageManager {
    constructor() {
        this.currentPage = 'home';
        this.pages = new Map();
        this.setupPages();
    }

    setupPages() {
        // Create page containers
        this.createPageStructure();
        
        // Initialize page controllers
        this.pages.set('home', new HomePage());
        this.pages.set('notifications', new NotificationsPage());
        this.pages.set('friends', new FriendsPage());
        this.pages.set('marketplace', new MarketplacePage());
        this.pages.set('watch', new WatchPage());
        this.pages.set('gaming', new GamingPage());
    }

    createPageStructure() {
        const mainFeed = document.querySelector('.main-feed');
        
        // Create containers for each page
        const pageNames = ['notifications', 'friends', 'marketplace', 'watch', 'gaming'];
        
        pageNames.forEach(pageName => {
            const pageContainer = document.createElement('div');
            pageContainer.id = `${pageName}-page`;
            pageContainer.className = 'page-container';
            mainFeed.appendChild(pageContainer);
        });
    }

    navigateTo(pageName) {
        // Hide current page
        const currentPageElement = document.getElementById(`${this.currentPage}-page`) || 
                                 document.querySelector('.main-feed > :not(.page-container)');
        
        if (currentPageElement) {
            if (this.currentPage === 'home') {
                // Hide home page elements
                document.querySelectorAll('.stories-container, .post-creator, .posts-container').forEach(el => {
                    el.style.display = 'none';
                });
            } else {
                currentPageElement.classList.remove('active');
            }
        }

        // Show new page
        this.currentPage = pageName;
        
        if (pageName === 'home') {
            // Show home page elements
            document.querySelectorAll('.stories-container, .post-creator, .posts-container').forEach(el => {
                el.style.display = '';
            });
        } else {
            const newPageElement = document.getElementById(`${pageName}-page`);
            if (newPageElement) {
                newPageElement.classList.add('active');
                
                // Initialize page if needed
                const pageController = this.pages.get(pageName);
                if (pageController && typeof pageController.render === 'function') {
                    pageController.render();
                }
            }
        }

        // Update active navigation
        this.updateNavigation(pageName);
    }

    updateNavigation(pageName) {
        const navIconMap = {
            'home': 0,
            'friends': 1,
            'watch': 2,
            'marketplace': 3,
            'gaming': 4
        };

        const iconIndex = navIconMap[pageName];
        if (iconIndex !== undefined) {
            document.querySelectorAll('.nav-icon').forEach((icon, index) => {
                icon.classList.toggle('active', index === iconIndex);
            });
        }
    }
}

class HomePage {
    constructor() {
        // Home page is the default content
    }
}

class NotificationsPage {
    constructor() {
        this.container = document.getElementById('notifications-page');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Mark all as read button
        document.addEventListener('click', (e) => {
            if (e.target.matches('#markAllReadBtn')) {
                this.markAllAsRead();
            }
        });
    }

    render() {
        const notifications = pagesDataManager.getNotifications();
        const unreadCount = pagesDataManager.getUnreadNotificationCount();

        this.container.innerHTML = `
            <div class="page-header">
                <h1 class="page-title">Notifications</h1>
                <p class="page-subtitle">${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}</p>
                ${unreadCount > 0 ? '<button id="markAllReadBtn" class="btn-primary btn-small">Mark all as read</button>' : ''}
            </div>
            
            <div class="notifications-list">
                ${notifications.map(notification => this.renderNotification(notification)).join('')}
            </div>
        `;

        this.setupNotificationListeners();
    }

    renderNotification(notification) {
        const timeString = pagesDataManager.formatTimestamp(notification.timestamp);
        const badgeIcon = this.getBadgeIcon(notification.type);

        return `
            <div class="notification-item ${!notification.isRead ? 'unread' : ''}" data-notification-id="${notification.id}">
                <div class="notification-avatar">
                    <div class="user-avatar">${notification.user.avatar}</div>
                    <div class="notification-badge ${notification.type}">${badgeIcon}</div>
                </div>
                <div class="notification-content">
                    <div class="notification-text">
                        <strong>${notification.user.name}</strong> ${notification.content}
                    </div>
                    <div class="notification-time">${timeString}</div>
                    ${notification.actions ? `
                        <div class="notification-actions">
                            ${notification.actions.map(action => 
                                `<button class="btn-small ${action === 'Accept' ? 'btn-primary' : 'btn-secondary'}" 
                                        data-action="${action.toLowerCase()}" 
                                        data-notification-id="${notification.id}">
                                    ${action}
                                </button>`
                            ).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    getBadgeIcon(type) {
        const icons = {
            'like': '👍',
            'love': '❤️',
            'comment': '💬',
            'share': '📤',
            'friend': '👥'
        };
        return icons[type] || '📢';
    }

    setupNotificationListeners() {
        this.container.querySelectorAll('.notification-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.matches('button')) {
                    this.handleNotificationClick(item.dataset.notificationId);
                }
            });
        });

        this.container.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleNotificationAction(
                    e.target.dataset.action,
                    e.target.dataset.notificationId
                );
            });
        });
    }

    handleNotificationClick(notificationId) {
        pagesDataManager.markNotificationAsRead(notificationId);
        this.updateNotificationBadge();
        
        // Re-render to update visual state
        this.render();
        
        notifications.info('Notification opened');
    }

    handleNotificationAction(action, notificationId) {
        if (action === 'accept') {
            notifications.success('Friend request accepted!');
        } else if (action === 'decline') {
            notifications.info('Friend request declined');
        }
        
        // Remove the notification
        pagesDataManager.data.notifications = pagesDataManager.data.notifications.filter(
            n => n.id !== notificationId
        );
        pagesDataManager.saveToStorage();
        
        this.render();
        this.updateNotificationBadge();
    }

    markAllAsRead() {
        pagesDataManager.markAllNotificationsAsRead();
        this.updateNotificationBadge();
        this.render();
        notifications.success('All notifications marked as read');
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
}

class FriendsPage {
    constructor() {
        this.container = document.getElementById('friends-page');
        this.currentTab = 'all';
    }

    render() {
        this.container.innerHTML = `
            <div class="page-header">
                <h1 class="page-title">Friends</h1>
                <p class="page-subtitle">Connect with people you know</p>
            </div>
            
            <div class="friends-tabs">
                <button class="friends-tab ${this.currentTab === 'all' ? 'active' : ''}" data-tab="all">
                    All Friends (${pagesDataManager.getFriends().length})
                </button>
                <button class="friends-tab ${this.currentTab === 'requests' ? 'active' : ''}" data-tab="requests">
                    Requests (${pagesDataManager.getFriendRequests().length})
                </button>
                <button class="friends-tab ${this.currentTab === 'suggestions' ? 'active' : ''}" data-tab="suggestions">
                    Suggestions (${pagesDataManager.getFriendSuggestions().length})
                </button>
            </div>
            
            <div class="friends-content">
                ${this.renderTabContent()}
            </div>
        `;

        this.setupFriendsListeners();
    }

    renderTabContent() {
        switch (this.currentTab) {
            case 'all':
                return this.renderFriendsList();
            case 'requests':
                return this.renderFriendRequests();
            case 'suggestions':
                return this.renderFriendSuggestions();
            default:
                return '';
        }
    }

    renderFriendsList() {
        const friends = pagesDataManager.getFriends();
        
        return `
            <div class="friends-grid">
                ${friends.map(friend => `
                    <div class="friend-card">
                        <div class="friend-cover"></div>
                        <div class="friend-avatar-large">${friend.avatar}</div>
                        <div class="friend-info">
                            <div class="friend-name">${friend.name}</div>
                            <div class="friend-meta">
                                ${friend.mutualFriends} mutual friends • Friends since ${friend.friendsSince}
                                <br>
                                ${friend.isOnline ? '🟢 Online' : `⚫ ${friend.lastSeen || 'Offline'}`}
                            </div>
                            <div class="friend-actions">
                                <button class="btn-small btn-primary" data-action="message" data-friend-id="${friend.id}">
                                    💬 Message
                                </button>
                                <button class="btn-small btn-secondary" data-action="unfriend" data-friend-id="${friend.id}">
                                    👤 Unfriend
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderFriendRequests() {
        const requests = pagesDataManager.getFriendRequests();
        
        if (requests.length === 0) {
            return '<div class="text-center p-16">No pending friend requests</div>';
        }
        
        return `
            <div class="friends-grid">
                ${requests.map(request => `
                    <div class="friend-card">
                        <div class="friend-cover"></div>
                        <div class="friend-avatar-large">${request.avatar}</div>
                        <div class="friend-info">
                            <div class="friend-name">${request.name}</div>
                            <div class="friend-meta">
                                ${request.mutualFriends} mutual friends
                                <br>
                                ${pagesDataManager.formatTimestamp(request.requestTime)}
                            </div>
                            <div class="friend-actions">
                                <button class="btn-small btn-primary" data-action="accept" data-request-id="${request.id}">
                                    ✓ Accept
                                </button>
                                <button class="btn-small btn-secondary" data-action="decline" data-request-id="${request.id}">
                                    ✗ Decline
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderFriendSuggestions() {
        const suggestions = pagesDataManager.getFriendSuggestions();
        
        return `
            <div class="friends-grid">
                ${suggestions.map(suggestion => `
                    <div class="friend-card">
                        <div class="friend-cover"></div>
                        <div class="friend-avatar-large">${suggestion.avatar}</div>
                        <div class="friend-info">
                            <div class="friend-name">${suggestion.name}</div>
                            <div class="friend-meta">
                                ${suggestion.reason}
                            </div>
                            <div class="friend-actions">
                                <button class="btn-small btn-primary" data-action="add" data-suggestion-id="${suggestion.id}">
                                    👥 Add Friend
                                </button>
                                <button class="btn-small btn-secondary" data-action="remove" data-suggestion-id="${suggestion.id}">
                                    ✗ Remove
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    setupFriendsListeners() {
        // Tab switching
        this.container.querySelectorAll('.friends-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.currentTab = e.target.dataset.tab;
                this.render();
            });
        });

        // Friend actions
        this.container.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFriendAction(e.target);
            });
        });
    }

    handleFriendAction(button) {
        const action = button.dataset.action;
        const friendId = button.dataset.friendId;
        const requestId = button.dataset.requestId;
        const suggestionId = button.dataset.suggestionId;

        switch (action) {
            case 'message':
                notifications.info(`Opening chat with friend`);
                break;
            case 'unfriend':
                if (confirm('Are you sure you want to unfriend this person?')) {
                    pagesDataManager.removeFriend(friendId);
                    notifications.success('Friend removed');
                    this.render();
                }
                break;
            case 'accept':
                pagesDataManager.acceptFriendRequest(requestId);
                notifications.success('Friend request accepted!');
                this.render();
                break;
            case 'decline':
                pagesDataManager.declineFriendRequest(requestId);
                notifications.info('Friend request declined');
                this.render();
                break;
            case 'add':
                pagesDataManager.sendFriendRequest(suggestionId);
                notifications.success('Friend request sent!');
                this.render();
                break;
            case 'remove':
                button.closest('.friend-card').remove();
                notifications.info('Suggestion removed');
                break;
        }
    }
}

class MarketplacePage {
    constructor() {
        this.container = document.getElementById('marketplace-page');
        this.currentCategory = 'All';
    }

    render() {
        const categories = pagesDataManager.getMarketplaceCategories();
        const items = pagesDataManager.getMarketplaceItems(this.currentCategory);

        this.container.innerHTML = `
            <div class="page-header">
                <h1 class="page-title">Marketplace</h1>
                <p class="page-subtitle">Buy and sell in your community</p>
            </div>
            
            <div class="marketplace-filters">
                ${categories.map(category => `
                    <button class="filter-btn ${this.currentCategory === category ? 'active' : ''}" 
                            data-category="${category}">
                        ${category}
                    </button>
                `).join('')}
            </div>
            
            <div class="marketplace-grid">
                ${items.map(item => this.renderMarketplaceItem(item)).join('')}
            </div>
        `;

        this.setupMarketplaceListeners();
    }

    renderMarketplaceItem(item) {
        const timeString = pagesDataManager.formatTimestamp(item.postedTime);
        
        return `
            <div class="marketplace-item" data-item-id="${item.id}">
                <div class="marketplace-image" style="background-image: url('${item.image}')"></div>
                <div class="marketplace-info">
                    <div class="marketplace-price">${item.price}</div>
                    <div class="marketplace-title">${item.title}</div>
                    <div class="marketplace-location">📍 ${item.location} • ${timeString}</div>
                    <div class="marketplace-seller">
                        <div class="seller-avatar">${item.seller.avatar}</div>
                        <span>${item.seller.name}</span>
                    </div>
                </div>
            </div>
        `;
    }

    setupMarketplaceListeners() {
        // Category filters
        this.container.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentCategory = e.target.dataset.category;
                this.render();
            });
        });

        // Item clicks
        this.container.querySelectorAll('.marketplace-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.handleItemClick(item.dataset.itemId);
            });
        });
    }

    handleItemClick(itemId) {
        const item = pagesDataManager.data.marketplace.find(i => i.id === itemId);
        if (item) {
            notifications.info(`Viewing ${item.title} - ${item.price}`);
            // In a real app, this would open a detailed view
        }
    }
}

class WatchPage {
    constructor() {
        this.container = document.getElementById('watch-page');
        this.currentCategory = 'for-you';
    }

    render() {
        const categories = pagesDataManager.getWatchCategories();
        const videos = pagesDataManager.getVideos(this.currentCategory);

        this.container.innerHTML = `
            <div class="watch-container">
                <div class="watch-sidebar">
                    <div class="page-header">
                        <h2 class="page-title">Watch</h2>
                    </div>
                    
                    <div class="watch-categories">
                        ${categories.map(category => `
                            <div class="watch-category ${this.currentCategory === category.id ? 'active' : ''}" 
                                 data-category="${category.id}">
                                <div class="watch-category-icon">${category.icon}</div>
                                <span>${category.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="watch-main">
                    ${videos.map(video => this.renderVideo(video)).join('')}
                </div>
            </div>
        `;

        this.setupWatchListeners();
    }

    renderVideo(video) {
        const timeString = pagesDataManager.formatTimestamp(video.uploadTime);
        
        return `
            <div class="video-card" data-video-id="${video.id}">
                <div class="video-thumbnail">
                    <img src="${video.thumbnail}" alt="${video.title}">
                    <div class="video-overlay">
                        <button class="play-button">▶</button>
                    </div>
                    <div class="video-duration">${video.duration}</div>
                </div>
                
                <div class="video-info">
                    <h3 class="video-title">${video.title}</h3>
                    
                    <div class="video-meta">
                        <div class="video-author">
                            <div class="user-avatar" style="width: 32px; height: 32px; font-size: 12px;">
                                ${video.creator.avatar}
                            </div>
                            <span>${video.creator.name}</span>
                        </div>
                        <span>•</span>
                        <span>${video.views} views</span>
                        <span>•</span>
                        <span>${timeString}</span>
                    </div>
                    
                    <div class="video-stats">
                        <div class="video-actions">
                            <button class="video-action" data-action="like" data-video-id="${video.id}">
                                <span>👍</span>
                                <span>${video.likes}</span>
                            </button>
                            <button class="video-action" data-action="comment" data-video-id="${video.id}">
                                <span>💬</span>
                                <span>Comment</span>
                            </button>
                            <button class="video-action" data-action="share" data-video-id="${video.id}">
                                <span>📤</span>
                                <span>Share</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupWatchListeners() {
        // Category switching
        this.container.querySelectorAll('.watch-category').forEach(category => {
            category.addEventListener('click', (e) => {
                this.currentCategory = e.currentTarget.dataset.category;
                this.render();
            });
        });

        // Video actions
        this.container.querySelectorAll('.video-action').forEach(action => {
            action.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleVideoAction(e.currentTarget);
            });
        });

        // Play button clicks
        this.container.querySelectorAll('.play-button, .video-thumbnail').forEach(element => {
            element.addEventListener('click', (e) => {
                const videoCard = e.target.closest('.video-card');
                this.playVideo(videoCard.dataset.videoId);
            });
        });
    }

    handleVideoAction(button) {
        const action = button.dataset.action;
        const videoId = button.dataset.videoId;

        switch (action) {
            case 'like':
                pagesDataManager.likeVideo(videoId);
                notifications.success('Video liked! 👍');
                this.render();
                break;
            case 'comment':
                notifications.info('Comments feature coming soon! 💬');
                break;
            case 'share':
                notifications.success('Video shared! 📤');
                break;
        }
    }

    playVideo(videoId) {
        const video = pagesDataManager.data.videos.find(v => v.id === videoId);
        if (video) {
            notifications.info(`Playing: ${video.title} 🎬`);
            // In a real app, this would open a video player
        }
    }
}

class GamingPage {
    constructor() {
        this.container = document.getElementById('gaming-page');
        this.currentTab = 'play';
    }

    render() {
        const games = pagesDataManager.getGames();
        const activities = pagesDataManager.getGamingActivity();

        this.container.innerHTML = `
            <div class="page-header">
                <div class="gaming-header">
                    <h1 class="page-title">Gaming</h1>
                    <span>🎮</span>
                </div>
                <p class="page-subtitle">Play games and connect with friends</p>
            </div>
            
            <div class="gaming-tabs">
                <button class="gaming-tab ${this.currentTab === 'play' ? 'active' : ''}" data-tab="play">
                    Play Games
                </button>
                <button class="gaming-tab ${this.currentTab === 'activity' ? 'active' : ''}" data-tab="activity">
                    Friends Activity
                </button>
                <button class="gaming-tab ${this.currentTab === 'tournaments' ? 'active' : ''}" data-tab="tournaments">
                    Tournaments
                </button>
            </div>
            
            <div class="gaming-content">
                ${this.renderTabContent(games, activities)}
            </div>
        `;

        this.setupGamingListeners();
    }

    renderTabContent(games, activities) {
        switch (this.currentTab) {
            case 'play':
                return this.renderGames(games);
            case 'activity':
                return this.renderActivity(activities);
            case 'tournaments':
                return this.renderTournaments();
            default:
                return '';
        }
    }

    renderGames(games) {
        return `
            <div class="games-grid">
                ${games.map(game => `
                    <div class="game-card" data-game-id="${game.id}">
                        <div class="game-image" style="background-image: url('${game.image}')"></div>
                        <div class="game-info">
                            <div class="game-title">${game.title}</div>
                            <div class="game-category">${game.category}</div>
                            <div class="game-players">
                                <span>👥</span>
                                <span>${game.players} players</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderActivity(activities) {
        return `
            <div class="gaming-activities">
                ${activities.map(activity => `
                    <div class="gaming-activity">
                        <div class="activity-header">
                            <div class="user-avatar">${activity.user.avatar}</div>
                            <div class="activity-game">
                                <div class="activity-game-title">${activity.user.name}</div>
                                <div class="activity-time">
                                    ${activity.action} in ${activity.game} • ${pagesDataManager.formatTimestamp(activity.timestamp)}
                                </div>
                            </div>
                            <div class="activity-score">${activity.score}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderTournaments() {
        return `
            <div class="tournaments-section">
                <div class="text-center p-16">
                    <h3>🏆 Tournaments Coming Soon!</h3>
                    <p class="text-secondary">Compete with friends in exciting gaming tournaments</p>
                    <button class="btn-primary" style="margin-top: 16px;">Get Notified</button>
                </div>
            </div>
        `;
    }

    setupGamingListeners() {
        // Tab switching
        this.container.querySelectorAll('.gaming-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.currentTab = e.target.dataset.tab;
                this.render();
            });
        });

        // Game clicks
        this.container.querySelectorAll('.game-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.playGame(card.dataset.gameId);
            });
        });
    }

    playGame(gameId) {
        const game = pagesDataManager.playGame(gameId);
        if (game) {
            notifications.success(`Starting ${game.title}! 🎮`);
            // In a real app, this would launch the game
        }
    }
}

// Initialize Page Manager
const pageManager = new PageManager();

// Make it globally available
window.pageManager = pageManager;
