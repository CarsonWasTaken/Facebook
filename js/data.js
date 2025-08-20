// Sample data for the Facebook clone
const sampleData = {
    currentUser: {
        id: 'user_1',
        name: 'John Doe',
        avatar: 'JD',
        email: 'john.doe@email.com'
    },
    
    contacts: [
        {
            id: 'user_2',
            name: 'Emma Stone',
            avatar: 'ES',
            isOnline: true,
            lastSeen: null
        },
        {
            id: 'user_3',
            name: 'Mike Johnson',
            avatar: 'MJ',
            isOnline: true,
            lastSeen: null
        },
        {
            id: 'user_4',
            name: 'Sarah Lee',
            avatar: 'SL',
            isOnline: false,
            lastSeen: '2 hours ago'
        },
        {
            id: 'user_5',
            name: 'Daniel Taylor',
            avatar: 'DT',
            isOnline: true,
            lastSeen: null
        },
        {
            id: 'user_6',
            name: 'Lisa Wilson',
            avatar: 'LW',
            isOnline: false,
            lastSeen: '1 day ago'
        },
        {
            id: 'user_7',
            name: 'Alex Brown',
            avatar: 'AB',
            isOnline: true,
            lastSeen: null
        },
        {
            id: 'user_8',
            name: 'Jessica Davis',
            avatar: 'JD',
            isOnline: false,
            lastSeen: '3 hours ago'
        }
    ],
    
    suggestions: [
        {
            id: 'group_1',
            name: 'Tech Startup Group',
            avatar: 'TK',
            type: 'group',
            mutualFriends: 2,
            description: 'A community for tech entrepreneurs'
        },
        {
            id: 'group_2',
            name: 'Photography Club',
            avatar: 'PH',
            type: 'group',
            mutualFriends: 5,
            description: 'Share your best shots'
        },
        {
            id: 'user_9',
            name: 'Maria Garcia',
            avatar: 'MG',
            type: 'user',
            mutualFriends: 3,
            description: 'Works at Google'
        },
        {
            id: 'user_10',
            name: 'Chris Wilson',
            avatar: 'CW',
            type: 'user',
            mutualFriends: 7,
            description: 'Mutual friend: Emma Stone'
        }
    ],
    
    posts: [
        {
            id: 'post_1',
            userId: 'user_2',
            username: 'Alice Smith',
            avatar: 'AL',
            content: 'Just finished an amazing hiking trip in the mountains! The views were absolutely breathtaking. Nature has a way of putting everything into perspective. 🏔️ #hiking #nature #adventure',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            reactions: {
                like: 15,
                love: 8,
                wow: 1
            },
            comments: 5,
            shares: 2,
            isLiked: false,
            isShared: false
        },
        {
            id: 'post_2',
            userId: 'user_3',
            username: 'Bob Johnson',
            avatar: 'BM',
            content: 'Excited to announce that our team just launched our new project! It\'s been months of hard work, but seeing it come together is incredibly rewarding. Thanks to everyone who supported us along the way! 🚀',
            image: null,
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
            reactions: {
                like: 45,
                love: 20,
                celebrate: 2
            },
            comments: 12,
            shares: 8,
            isLiked: false,
            isShared: false
        },
        {
            id: 'post_3',
            userId: 'user_4',
            username: 'Carol Williams',
            avatar: 'CM',
            content: 'Recipe of the day: Homemade pizza! 🍕 There\'s nothing quite like making pizza from scratch. The dough, the sauce, the toppings - every step is pure joy. Who else loves cooking from scratch?',
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=300&fit=crop',
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
            reactions: {
                like: 28,
                love: 15
            },
            comments: 18,
            shares: 4,
            isLiked: false,
            isShared: false
        },
        {
            id: 'post_4',
            userId: 'user_5',
            username: 'David Smith',
            avatar: 'DS',
            content: 'Beautiful sunset from my balcony tonight. Sometimes the best moments are the quiet ones. 🌅✨ Hope everyone is having a wonderful evening!',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop&auto=format&q=80',
            timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
            reactions: {
                like: 32,
                love: 12
            },
            comments: 7,
            shares: 3,
            isLiked: false,
            isShared: false
        },
        {
            id: 'post_5',
            userId: 'user_6',
            username: 'Emma Stone',
            avatar: 'ES',
            content: 'Had an incredible coffee tasting session today! ☕ Learning about different brewing methods and flavor profiles. Coffee culture is so fascinating. Any fellow coffee enthusiasts here?',
            image: null,
            timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
            reactions: {
                like: 19,
                love: 6
            },
            comments: 9,
            shares: 1,
            isLiked: false,
            isShared: false
        }
    ],
    
    stories: [
        {
            id: 'story_1',
            userId: 'user_2',
            username: 'Alice',
            avatar: 'AL',
            content: 'Having an amazing day! 🌟',
            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
            timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
            viewed: false
        },
        {
            id: 'story_2',
            userId: 'user_3',
            username: 'Bob',
            avatar: 'BM',
            content: 'Working on something exciting! 💻',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
            viewed: false
        },
        {
            id: 'story_3',
            userId: 'user_4',
            username: 'Carol',
            avatar: 'CM',
            content: 'Cooking adventures continue! 👩‍🍳',
            background: 'linear-gradient(45deg, #f093fb, #f5576c)',
            timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000),
            viewed: false
        },
        {
            id: 'story_4',
            userId: 'user_5',
            username: 'David',
            avatar: 'DS',
            content: 'Perfect weather for a walk! 🚶‍♂️',
            background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
            timestamp: new Date(Date.now() - 9 * 60 * 60 * 1000),
            viewed: false
        }
    ],
    
    searchSuggestions: [
        { type: 'user', name: 'Emma Stone', avatar: 'ES' },
        { type: 'user', name: 'Mike Johnson', avatar: 'MJ' },
        { type: 'group', name: 'Photography Club', avatar: 'PH' },
        { type: 'page', name: 'Tech News Daily', avatar: 'TN' },
        { type: 'recent', name: 'mountain hiking', icon: '🔍' },
        { type: 'recent', name: 'pizza recipe', icon: '🔍' }
    ]
};

// Data management functions
class DataManager {
    constructor() {
        this.data = { ...sampleData };
        this.loadFromStorage();
    }
    
    // Local storage management
    saveToStorage() {
        try {
            localStorage.setItem('facebookCloneData', JSON.stringify({
                posts: this.data.posts,
                contacts: this.data.contacts,
                stories: this.data.stories
            }));
        } catch (error) {
            console.warn('Could not save to localStorage:', error);
        }
    }
    
    loadFromStorage() {
        try {
            const saved = localStorage.getItem('facebookCloneData');
            if (saved) {
                const parsedData = JSON.parse(saved);
                // Merge saved data with sample data
                this.data = {
                    ...this.data,
                    ...parsedData
                };
                // Convert timestamp strings back to Date objects
                this.data.posts.forEach(post => {
                    if (typeof post.timestamp === 'string') {
                        post.timestamp = new Date(post.timestamp);
                    }
                });
                this.data.stories.forEach(story => {
                    if (typeof story.timestamp === 'string') {
                        story.timestamp = new Date(story.timestamp);
                    }
                });
            }
        } catch (error) {
            console.warn('Could not load from localStorage:', error);
        }
    }
    
    // Post management
    createPost(content, privacy = 'public', image = null) {
        const newPost = {
            id: `post_${Date.now()}`,
            userId: this.data.currentUser.id,
            username: this.data.currentUser.name,
            avatar: this.data.currentUser.avatar,
            content: content.trim(),
            image: image,
            timestamp: new Date(),
            reactions: {},
            comments: 0,
            shares: 0,
            isLiked: false,
            isShared: false,
            privacy: privacy
        };
        
        this.data.posts.unshift(newPost);
        this.saveToStorage();
        return newPost;
    }
    
    togglePostReaction(postId, reactionType = 'like') {
        const post = this.data.posts.find(p => p.id === postId);
        if (!post) return false;
        
        if (post.isLiked && reactionType === 'like') {
            // Remove like
            post.isLiked = false;
            post.reactions.like = (post.reactions.like || 1) - 1;
        } else {
            // Add/change reaction
            if (!post.isLiked && reactionType === 'like') {
                post.isLiked = true;
                post.reactions.like = (post.reactions.like || 0) + 1;
            }
        }
        
        this.saveToStorage();
        return true;
    }
    
    sharePost(postId) {
        const post = this.data.posts.find(p => p.id === postId);
        if (!post) return false;
        
        post.isShared = !post.isShared;
        if (post.isShared) {
            post.shares += 1;
        } else {
            post.shares = Math.max(0, post.shares - 1);
        }
        
        this.saveToStorage();
        return true;
    }
    
    deletePost(postId) {
        const index = this.data.posts.findIndex(p => p.id === postId);
        if (index === -1) return false;
        
        this.data.posts.splice(index, 1);
        this.saveToStorage();
        return true;
    }
    
    // Contact management
    getContacts() {
        return this.data.contacts;
    }
    
    addContact(contact) {
        this.data.contacts.push(contact);
        this.saveToStorage();
    }
    
    removeContact(contactId) {
        const index = this.data.contacts.findIndex(c => c.id === contactId);
        if (index !== -1) {
            this.data.contacts.splice(index, 1);
            this.saveToStorage();
            return true;
        }
        return false;
    }
    
    // Story management
    getStories() {
        // Filter out stories older than 24 hours
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        this.data.stories = this.data.stories.filter(story => 
            story.timestamp > oneDayAgo
        );
        return this.data.stories;
    }
    
    createStory(content, background) {
        const newStory = {
            id: `story_${Date.now()}`,
            userId: this.data.currentUser.id,
            username: this.data.currentUser.name,
            avatar: this.data.currentUser.avatar,
            content: content,
            background: background,
            timestamp: new Date(),
            viewed: false
        };
        
        this.data.stories.unshift(newStory);
        this.saveToStorage();
        return newStory;
    }
    
    markStoryAsViewed(storyId) {
        const story = this.data.stories.find(s => s.id === storyId);
        if (story) {
            story.viewed = true;
            this.saveToStorage();
        }
    }
    
    // Search functionality
    search(query) {
        if (!query.trim()) return this.data.searchSuggestions;
        
        const results = [];
        const lowerQuery = query.toLowerCase();
        
        // Search users
        this.data.contacts.forEach(contact => {
            if (contact.name.toLowerCase().includes(lowerQuery)) {
                results.push({
                    type: 'user',
                    name: contact.name,
                    avatar: contact.avatar,
                    id: contact.id
                });
            }
        });
        
        // Search posts
        this.data.posts.forEach(post => {
            if (post.content.toLowerCase().includes(lowerQuery)) {
                results.push({
                    type: 'post',
                    name: post.content.substring(0, 50) + '...',
                    avatar: post.avatar,
                    id: post.id,
                    username: post.username
                });
            }
        });
        
        return results.slice(0, 10); // Limit results
    }
    
    // Utility functions
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
    
    formatReactionCount(reactions) {
        const total = Object.values(reactions).reduce((sum, count) => sum + count, 0);
        if (total === 0) return '';
        if (total < 1000) return total.toString();
        if (total < 1000000) return (total / 1000).toFixed(1) + 'K';
        return (total / 1000000).toFixed(1) + 'M';
    }
    
    getReactionEmojis(reactions) {
        const emojiMap = {
            like: '👍',
            love: '❤️',
            wow: '😮',
            celebrate: '🎉',
            laugh: '😂',
            angry: '😠',
            sad: '😢'
        };
        
        return Object.keys(reactions)
            .filter(type => reactions[type] > 0)
            .map(type => emojiMap[type] || '👍')
            .slice(0, 3);
    }
}

// Create global data manager instance
const dataManager = new DataManager();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DataManager, dataManager, sampleData };
}
