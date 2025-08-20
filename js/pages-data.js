// Data for additional pages

const pagesData = {
    notifications: [
        {
            id: 'notif_1',
            type: 'like',
            user: { name: 'Emma Stone', avatar: 'ES' },
            content: 'liked your post about mountain hiking',
            timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
            isRead: false,
            relatedPost: 'post_1'
        },
        {
            id: 'notif_2',
            type: 'comment',
            user: { name: 'Mike Johnson', avatar: 'MJ' },
            content: 'commented on your post: "Looks amazing! Which trail was this?"',
            timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
            isRead: false,
            relatedPost: 'post_1'
        },
        {
            id: 'notif_3',
            type: 'friend',
            user: { name: 'Sarah Wilson', avatar: 'SW' },
            content: 'accepted your friend request',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            isRead: false
        },
        {
            id: 'notif_4',
            type: 'share',
            user: { name: 'David Brown', avatar: 'DB' },
            content: 'shared your photo',
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
            isRead: true,
            relatedPost: 'post_3'
        },
        {
            id: 'notif_5',
            type: 'friend',
            user: { name: 'Lisa Chen', avatar: 'LC' },
            content: 'sent you a friend request',
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
            isRead: true,
            actions: ['Accept', 'Decline']
        },
        {
            id: 'notif_6',
            type: 'love',
            user: { name: 'Alice Smith', avatar: 'AS' },
            content: 'reacted with ❤️ to your comment',
            timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
            isRead: true
        },
        {
            id: 'notif_7',
            type: 'comment',
            user: { name: 'Bob Wilson', avatar: 'BW' },
            content: 'also commented on Emma\'s post',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
            isRead: true
        }
    ],

    friends: {
        all: [
            {
                id: 'friend_1',
                name: 'Emma Stone',
                avatar: 'ES',
                mutualFriends: 12,
                friendsSince: '2019',
                isOnline: true,
                location: 'New York, NY',
                workplace: 'Google'
            },
            {
                id: 'friend_2',
                name: 'Mike Johnson',
                avatar: 'MJ',
                mutualFriends: 8,
                friendsSince: '2020',
                isOnline: false,
                lastSeen: '2 hours ago',
                location: 'San Francisco, CA',
                workplace: 'Meta'
            },
            {
                id: 'friend_3',
                name: 'Sarah Wilson',
                avatar: 'SW',
                mutualFriends: 15,
                friendsSince: '2018',
                isOnline: true,
                location: 'Los Angeles, CA',
                workplace: 'Netflix'
            },
            {
                id: 'friend_4',
                name: 'David Brown',
                avatar: 'DB',
                mutualFriends: 6,
                friendsSince: '2021',
                isOnline: false,
                lastSeen: '1 day ago',
                location: 'Seattle, WA',
                workplace: 'Amazon'
            },
            {
                id: 'friend_5',
                name: 'Lisa Chen',
                avatar: 'LC',
                mutualFriends: 9,
                friendsSince: '2019',
                isOnline: true,
                location: 'Boston, MA',
                workplace: 'MIT'
            },
            {
                id: 'friend_6',
                name: 'Alex Rodriguez',
                avatar: 'AR',
                mutualFriends: 4,
                friendsSince: '2022',
                isOnline: false,
                lastSeen: '3 hours ago',
                location: 'Miami, FL',
                workplace: 'Spotify'
            }
        ],
        
        requests: [
            {
                id: 'request_1',
                name: 'Jennifer Adams',
                avatar: 'JA',
                mutualFriends: 3,
                requestTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                location: 'Chicago, IL'
            },
            {
                id: 'request_2',
                name: 'Robert Taylor',
                avatar: 'RT',
                mutualFriends: 7,
                requestTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                location: 'Dallas, TX'
            },
            {
                id: 'request_3',
                name: 'Maria Garcia',
                avatar: 'MG',
                mutualFriends: 2,
                requestTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                location: 'Phoenix, AZ'
            }
        ],
        
        suggestions: [
            {
                id: 'suggestion_1',
                name: 'Chris Wilson',
                avatar: 'CW',
                mutualFriends: 5,
                reason: 'Friends with Emma Stone and 4 others',
                location: 'Portland, OR'
            },
            {
                id: 'suggestion_2',
                name: 'Anna Smith',
                avatar: 'AS',
                mutualFriends: 8,
                reason: 'You both went to Stanford University',
                location: 'San Jose, CA'
            },
            {
                id: 'suggestion_3',
                name: 'James Lee',
                avatar: 'JL',
                mutualFriends: 3,
                reason: 'Friends with Mike Johnson and 2 others',
                location: 'Austin, TX'
            }
        ]
    },

    marketplace: [
        {
            id: 'item_1',
            title: 'iPhone 14 Pro - Excellent Condition',
            price: '$899',
            location: 'New York, NY',
            seller: { name: 'Tech Store NYC', avatar: 'TS' },
            image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
            category: 'Electronics',
            condition: 'Like New',
            postedTime: new Date(Date.now() - 2 * 60 * 60 * 1000)
        },
        {
            id: 'item_2',
            title: 'Vintage Leather Sofa - Brown',
            price: '$450',
            location: 'Brooklyn, NY',
            seller: { name: 'Sarah M.', avatar: 'SM' },
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
            category: 'Furniture',
            condition: 'Good',
            postedTime: new Date(Date.now() - 5 * 60 * 60 * 1000)
        },
        {
            id: 'item_3',
            title: 'Mountain Bike - Trek X-Caliber',
            price: '$650',
            location: 'Queens, NY',
            seller: { name: 'Bike Shop', avatar: 'BS' },
            image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
            category: 'Sports',
            condition: 'Excellent',
            postedTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
        },
        {
            id: 'item_4',
            title: 'Nike Air Jordan 1 - Size 10',
            price: '$180',
            location: 'Manhattan, NY',
            seller: { name: 'John D.', avatar: 'JD' },
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
            category: 'Clothing',
            condition: 'Good',
            postedTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
        },
        {
            id: 'item_5',
            title: 'MacBook Pro 13" M2 Chip',
            price: '$1,299',
            location: 'Staten Island, NY',
            seller: { name: 'Electronics Hub', avatar: 'EH' },
            image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop',
            category: 'Electronics',
            condition: 'Like New',
            postedTime: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
        },
        {
            id: 'item_6',
            title: 'Dining Table Set - 6 Chairs',
            price: '$320',
            location: 'Bronx, NY',
            seller: { name: 'Home Decor Plus', avatar: 'HD' },
            image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop',
            category: 'Furniture',
            condition: 'Good',
            postedTime: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
        }
    ],

    videos: [
        {
            id: 'video_1',
            title: 'Amazing Wildlife Documentary - Lions in the Savanna',
            creator: { name: 'Nature Channel', avatar: 'NC' },
            thumbnail: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=600&h=300&fit=crop',
            duration: '15:42',
            views: '2.3M',
            likes: '45K',
            uploadTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            category: 'Documentary'
        },
        {
            id: 'video_2',
            title: 'Top 10 Travel Destinations 2024',
            creator: { name: 'Travel Vlogs', avatar: 'TV' },
            thumbnail: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=300&fit=crop',
            duration: '12:18',
            views: '890K',
            likes: '23K',
            uploadTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            category: 'Travel'
        },
        {
            id: 'video_3',
            title: 'Easy Pasta Recipe - 15 Minutes',
            creator: { name: 'Quick Kitchen', avatar: 'QK' },
            thumbnail: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=300&fit=crop',
            duration: '8:30',
            views: '1.2M',
            likes: '67K',
            uploadTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            category: 'Cooking'
        },
        {
            id: 'video_4',
            title: 'Tech Review: Latest Smartphone Features',
            creator: { name: 'Tech Insider', avatar: 'TI' },
            thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=300&fit=crop',
            duration: '18:45',
            views: '3.1M',
            likes: '89K',
            uploadTime: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
            category: 'Technology'
        },
        {
            id: 'video_5',
            title: 'Funny Cat Compilation 2024',
            creator: { name: 'Pet Comedy', avatar: 'PC' },
            thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=300&fit=crop',
            duration: '10:22',
            views: '5.7M',
            likes: '234K',
            uploadTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            category: 'Entertainment'
        },
        {
            id: 'video_6',
            title: 'Morning Workout Routine - 20 Minutes',
            creator: { name: 'Fitness Pro', avatar: 'FP' },
            thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=300&fit=crop',
            duration: '20:15',
            views: '1.8M',
            likes: '76K',
            uploadTime: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
            category: 'Sports'
        }
    ],

    games: [
        {
            id: 'game_1',
            title: 'Word Puzzle Master',
            category: 'Puzzle',
            image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&h=200&fit=crop',
            players: '2.4M',
            rating: 4.8,
            developer: 'Puzzle Games Inc',
            description: 'Challenge your vocabulary with thousands of word puzzles'
        },
        {
            id: 'game_2',
            title: 'City Builder 3D',
            category: 'Strategy',
            image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=200&fit=crop',
            players: '1.8M',
            rating: 4.6,
            developer: 'Strategy Studios',
            description: 'Build and manage your dream city'
        },
        {
            id: 'game_3',
            title: 'Farm Adventure',
            category: 'Simulation',
            image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=300&h=200&fit=crop',
            players: '3.2M',
            rating: 4.7,
            developer: 'Farm Games Co',
            description: 'Grow crops, raise animals, and build your farm empire'
        },
        {
            id: 'game_4',
            title: 'Space Explorer',
            category: 'Adventure',
            image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=200&fit=crop',
            players: '1.1M',
            rating: 4.5,
            developer: 'Cosmic Games',
            description: 'Explore the galaxy and discover new worlds'
        },
        {
            id: 'game_5',
            title: 'Soccer Manager',
            category: 'Sports',
            image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=300&h=200&fit=crop',
            players: '2.7M',
            rating: 4.9,
            developer: 'Sports Interactive',
            description: 'Manage your favorite soccer team to victory'
        },
        {
            id: 'game_6',
            title: 'Card Battle Arena',
            category: 'Card',
            image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&h=200&fit=crop',
            players: '890K',
            rating: 4.4,
            developer: 'Card Masters',
            description: 'Collect cards and battle other players'
        }
    ],

    gamingActivity: [
        {
            id: 'activity_1',
            user: { name: 'Emma Stone', avatar: 'ES' },
            game: 'Word Puzzle Master',
            action: 'achieved high score',
            score: '15,670',
            timestamp: new Date(Date.now() - 30 * 60 * 1000)
        },
        {
            id: 'activity_2',
            user: { name: 'Mike Johnson', avatar: 'MJ' },
            game: 'City Builder 3D',
            action: 'completed level 25',
            score: 'Level 25',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
        },
        {
            id: 'activity_3',
            user: { name: 'Sarah Wilson', avatar: 'SW' },
            game: 'Soccer Manager',
            action: 'won championship',
            score: 'Champion',
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
        },
        {
            id: 'activity_4',
            user: { name: 'David Brown', avatar: 'DB' },
            game: 'Farm Adventure',
            action: 'reached level 50',
            score: 'Level 50',
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
        }
    ],

    watchCategories: [
        { id: 'for-you', name: 'For You', icon: '🎯' },
        { id: 'live', name: 'Live', icon: '🔴' },
        { id: 'following', name: 'Following', icon: '👥' },
        { id: 'saved', name: 'Saved', icon: '🔖' },
        { id: 'recent', name: 'Recent', icon: '🕐' },
        { id: 'music', name: 'Music', icon: '🎵' },
        { id: 'sports', name: 'Sports', icon: '⚽' },
        { id: 'gaming', name: 'Gaming', icon: '🎮' },
        { id: 'news', name: 'News', icon: '📰' },
        { id: 'entertainment', name: 'Entertainment', icon: '🎬' }
    ],

    marketplaceCategories: [
        'All', 'Electronics', 'Furniture', 'Clothing', 'Sports', 'Vehicles', 'Home & Garden', 'Books', 'Toys', 'Music'
    ]
};

// Pages data manager
class PagesDataManager {
    constructor() {
        this.data = { ...pagesData };
        this.loadFromStorage();
    }

    // Notifications
    getNotifications() {
        return this.data.notifications.sort((a, b) => b.timestamp - a.timestamp);
    }

    markNotificationAsRead(notificationId) {
        const notification = this.data.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.isRead = true;
            this.saveToStorage();
        }
    }

    markAllNotificationsAsRead() {
        this.data.notifications.forEach(n => n.isRead = true);
        this.saveToStorage();
    }

    addNotification(notification) {
        this.data.notifications.unshift({
            id: `notif_${Date.now()}`,
            timestamp: new Date(),
            isRead: false,
            ...notification
        });
        this.saveToStorage();
    }

    getUnreadNotificationCount() {
        return this.data.notifications.filter(n => !n.isRead).length;
    }

    // Friends
    getFriends() {
        return this.data.friends.all;
    }

    getFriendRequests() {
        return this.data.friends.requests;
    }

    getFriendSuggestions() {
        return this.data.friends.suggestions;
    }

    acceptFriendRequest(requestId) {
        const request = this.data.friends.requests.find(r => r.id === requestId);
        if (request) {
            // Move to friends list
            this.data.friends.all.push({
                ...request,
                friendsSince: new Date().getFullYear().toString(),
                isOnline: Math.random() > 0.5
            });
            
            // Remove from requests
            this.data.friends.requests = this.data.friends.requests.filter(r => r.id !== requestId);
            
            this.saveToStorage();
            return true;
        }
        return false;
    }

    declineFriendRequest(requestId) {
        this.data.friends.requests = this.data.friends.requests.filter(r => r.id !== requestId);
        this.saveToStorage();
    }

    removeFriend(friendId) {
        this.data.friends.all = this.data.friends.all.filter(f => f.id !== friendId);
        this.saveToStorage();
    }

    sendFriendRequest(suggestionId) {
        const suggestion = this.data.friends.suggestions.find(s => s.id === suggestionId);
        if (suggestion) {
            // Remove from suggestions
            this.data.friends.suggestions = this.data.friends.suggestions.filter(s => s.id !== suggestionId);
            this.saveToStorage();
            return true;
        }
        return false;
    }

    // Marketplace
    getMarketplaceItems(category = 'All') {
        if (category === 'All') {
            return this.data.marketplace;
        }
        return this.data.marketplace.filter(item => item.category === category);
    }

    getMarketplaceCategories() {
        return this.data.marketplaceCategories;
    }

    // Videos/Watch
    getVideos(category = 'for-you') {
        // In a real app, this would filter by category
        return this.data.videos;
    }

    getWatchCategories() {
        return this.data.watchCategories;
    }

    likeVideo(videoId) {
        const video = this.data.videos.find(v => v.id === videoId);
        if (video) {
            const currentLikes = parseInt(video.likes.replace('K', '000').replace('M', '000000'));
            video.likes = this.formatCount(currentLikes + 1);
            this.saveToStorage();
        }
    }

    // Gaming
    getGames() {
        return this.data.games;
    }

    getGamingActivity() {
        return this.data.gamingActivity.sort((a, b) => b.timestamp - a.timestamp);
    }

    playGame(gameId) {
        const game = this.data.games.find(g => g.id === gameId);
        if (game) {
            // Add to recent activity
            this.data.gamingActivity.unshift({
                id: `activity_${Date.now()}`,
                user: { name: 'John Doe', avatar: 'JD' },
                game: game.title,
                action: 'started playing',
                score: 'New Game',
                timestamp: new Date()
            });
            this.saveToStorage();
            return game;
        }
        return null;
    }

    // Utility functions
    formatCount(count) {
        if (count < 1000) return count.toString();
        if (count < 1000000) return (count / 1000).toFixed(1) + 'K';
        return (count / 1000000).toFixed(1) + 'M';
    }

    formatTimestamp(timestamp) {
        const now = new Date();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m`;
        if (hours < 24) return `${hours}h`;
        if (days < 7) return `${days}d`;

        return timestamp.toLocaleDateString();
    }

    // Storage
    saveToStorage() {
        try {
            localStorage.setItem('facebookPagesData', JSON.stringify(this.data));
        } catch (error) {
            console.warn('Could not save pages data to localStorage:', error);
        }
    }

    loadFromStorage() {
        try {
            const saved = localStorage.getItem('facebookPagesData');
            if (saved) {
                const parsedData = JSON.parse(saved);
                this.data = { ...this.data, ...parsedData };
                
                // Convert timestamp strings back to Date objects
                this.data.notifications.forEach(notif => {
                    if (typeof notif.timestamp === 'string') {
                        notif.timestamp = new Date(notif.timestamp);
                    }
                });
                
                this.data.gamingActivity.forEach(activity => {
                    if (typeof activity.timestamp === 'string') {
                        activity.timestamp = new Date(activity.timestamp);
                    }
                });
            }
        } catch (error) {
            console.warn('Could not load pages data from localStorage:', error);
        }
    }
}

// Create global instance
const pagesDataManager = new PagesDataManager();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PagesDataManager, pagesDataManager, pagesData };
}
