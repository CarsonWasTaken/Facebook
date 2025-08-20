// UI Component Classes and Functions

class NotificationManager {
    constructor() {
        this.container = document.getElementById('notification');
        this.textElement = document.getElementById('notificationText');
        this.closeBtn = this.container.querySelector('.notification-close');
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.closeBtn?.addEventListener('click', () => this.hide());
        
        // Auto-hide after 5 seconds
        this.autoHideTimeout = null;
    }
    
    show(message, type = 'success', duration = 5000) {
        this.textElement.textContent = message;
        
        // Remove existing type classes
        this.container.classList.remove('error', 'warning', 'info');
        
        // Add new type class
        if (type !== 'success') {
            this.container.classList.add(type);
        }
        
        this.container.classList.add('show');
        
        // Clear existing timeout
        if (this.autoHideTimeout) {
            clearTimeout(this.autoHideTimeout);
        }
        
        // Set new timeout
        if (duration > 0) {
            this.autoHideTimeout = setTimeout(() => {
                this.hide();
            }, duration);
        }
    }
    
    hide() {
        this.container.classList.remove('show');
        if (this.autoHideTimeout) {
            clearTimeout(this.autoHideTimeout);
            this.autoHideTimeout = null;
        }
    }
    
    error(message, duration = 5000) {
        this.show(message, 'error', duration);
    }
    
    warning(message, duration = 5000) {
        this.show(message, 'warning', duration);
    }
    
    info(message, duration = 5000) {
        this.show(message, 'info', duration);
    }
}

class ModalManager {
    constructor() {
        this.modals = new Map();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target.id);
            }
        });
        
        // Close modals with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }
    
    registerModal(modalId, options = {}) {
        const modal = document.getElementById(modalId);
        if (!modal) return false;
        
        const closeBtn = modal.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal(modalId));
        }
        
        this.modals.set(modalId, {
            element: modal,
            options: options
        });
        
        return true;
    }
    
    openModal(modalId) {
        const modalData = this.modals.get(modalId);
        if (!modalData) return false;
        
        modalData.element.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus first input if available
        const firstInput = modalData.element.querySelector('input, textarea');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
        
        return true;
    }
    
    closeModal(modalId) {
        const modalData = this.modals.get(modalId);
        if (!modalData) return false;
        
        modalData.element.classList.remove('active');
        
        // Only restore scroll if no other modals are open
        const hasOpenModal = Array.from(this.modals.values())
            .some(modal => modal.element.classList.contains('active'));
        
        if (!hasOpenModal) {
            document.body.style.overflow = '';
        }
        
        return true;
    }
    
    closeAllModals() {
        this.modals.forEach((modalData, modalId) => {
            this.closeModal(modalId);
        });
    }
}

class PostRenderer {
    constructor() {
        this.container = document.getElementById('postsContainer');
    }
    
    renderPost(post) {
        const postElement = document.createElement('div');
        postElement.className = 'post fade-in';
        postElement.dataset.postId = post.id;
        
        const reactionEmojis = dataManager.getReactionEmojis(post.reactions);
        const reactionCount = dataManager.formatReactionCount(post.reactions);
        const timeString = dataManager.formatTimestamp(post.timestamp);
        
        postElement.innerHTML = `
            <div class="post-header">
                <div class="user-avatar">${post.avatar}</div>
                <div class="post-user-info">
                    <div class="post-username">${post.username}</div>
                    <div class="post-time">${timeString} · 🌍</div>
                </div>
                <button class="post-menu" data-post-id="${post.id}">⋯</button>
            </div>
            <div class="post-content">${this.formatPostContent(post.content)}</div>
            ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
            <div class="post-stats">
                <span>${reactionEmojis.join('')} ${reactionCount} ${reactionCount ? 'reactions' : ''}</span>
                <span>${post.comments} comments · ${post.shares} shares</span>
            </div>
            <div class="post-reactions">
                <button class="reaction-btn ${post.isLiked ? 'liked' : ''}" data-action="like" data-post-id="${post.id}">
                    👍 ${post.isLiked ? 'Liked' : 'Like'}
                </button>
                <button class="reaction-btn" data-action="comment" data-post-id="${post.id}">
                    💬 Comment
                </button>
                <button class="reaction-btn ${post.isShared ? 'shared' : ''}" data-action="share" data-post-id="${post.id}">
                    📤 ${post.isShared ? 'Shared' : 'Share'}
                </button>
            </div>
        `;
        
        this.setupPostEventListeners(postElement);
        return postElement;
    }
    
    formatPostContent(content) {
        // Simple hashtag and mention highlighting
        return content
            .replace(/#(\w+)/g, '<span style="color: var(--primary-blue); font-weight: 600;">#$1</span>')
            .replace(/@(\w+)/g, '<span style="color: var(--primary-blue); font-weight: 600;">@$1</span>')
            .replace(/\n/g, '<br>');
    }
    
    setupPostEventListeners(postElement) {
        // Reaction buttons
        postElement.querySelectorAll('.reaction-btn').forEach(btn => {
            btn.addEventListener('click', this.handleReactionClick.bind(this));
        });
        
        // Post menu
        const menuBtn = postElement.querySelector('.post-menu');
        if (menuBtn) {
            menuBtn.addEventListener('click', this.handlePostMenuClick.bind(this));
        }
        
        // Image click to expand
        const image = postElement.querySelector('.post-image');
        if (image) {
            image.addEventListener('click', () => {
                this.expandImage(image.src);
            });
        }
    }
    
    handleReactionClick(e) {
        const button = e.currentTarget;
        const action = button.dataset.action;
        const postId = button.dataset.postId;
        
        switch (action) {
            case 'like':
                this.toggleLike(postId, button);
                break;
            case 'comment':
                this.showCommentDialog(postId);
                break;
            case 'share':
                this.sharePost(postId, button);
                break;
        }
    }
    
    toggleLike(postId, button) {
        if (dataManager.togglePostReaction(postId, 'like')) {
            const post = dataManager.data.posts.find(p => p.id === postId);
            if (post) {
                button.classList.toggle('liked', post.isLiked);
                button.innerHTML = `👍 ${post.isLiked ? 'Liked' : 'Like'}`;
                this.updatePostStats(postId);
                
                if (post.isLiked) {
                    notifications.show('Post liked! 👍');
                }
            }
        }
    }
    
    sharePost(postId, button) {
        if (dataManager.sharePost(postId)) {
            const post = dataManager.data.posts.find(p => p.id === postId);
            if (post) {
                button.classList.toggle('shared', post.isShared);
                button.innerHTML = `📤 ${post.isShared ? 'Shared' : 'Share'}`;
                this.updatePostStats(postId);
                
                if (post.isShared) {
                    notifications.show('Post shared! 📤');
                }
            }
        }
    }
    
    showCommentDialog(postId) {
        // Simple implementation - could be expanded with a full comment system
        const comment = prompt('Write a comment:');
        if (comment && comment.trim()) {
            notifications.show('Comment added! 💬');
        }
    }
    
    updatePostStats(postId) {
        const post = dataManager.data.posts.find(p => p.id === postId);
        if (!post) return;
        
        const postElement = document.querySelector(`[data-post-id="${postId}"]`);
        if (!postElement) return;
        
        const statsElement = postElement.querySelector('.post-stats');
        const reactionEmojis = dataManager.getReactionEmojis(post.reactions);
        const reactionCount = dataManager.formatReactionCount(post.reactions);
        
        statsElement.innerHTML = `
            <span>${reactionEmojis.join('')} ${reactionCount} ${reactionCount ? 'reactions' : ''}</span>
            <span>${post.comments} comments · ${post.shares} shares</span>
        `;
    }
    
    handlePostMenuClick(e) {
        const postId = e.currentTarget.dataset.postId;
        const post = dataManager.data.posts.find(p => p.id === postId);
        
        if (!post) return;
        
        // Simple menu implementation
        const isOwnPost = post.userId === dataManager.data.currentUser.id;
        const actions = isOwnPost 
            ? ['Edit post', 'Delete post', 'Change privacy']
            : ['Hide post', 'Report post', 'Unfollow user'];
        
        const choice = prompt(`Choose an action:\n${actions.map((action, i) => `${i + 1}. ${action}`).join('\n')}`);
        
        if (choice === '2' && isOwnPost) {
            if (confirm('Are you sure you want to delete this post?')) {
                this.deletePost(postId);
            }
        }
    }
    
    deletePost(postId) {
        if (dataManager.deletePost(postId)) {
            const postElement = document.querySelector(`[data-post-id="${postId}"]`);
            if (postElement) {
                postElement.classList.add('fade-out');
                setTimeout(() => {
                    postElement.remove();
                }, 300);
            }
            notifications.show('Post deleted');
        }
    }
    
    expandImage(src) {
        // Create image modal
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 90vw; max-height: 90vh; padding: 0; background: transparent;">
                <img src="${src}" style="width: 100%; height: 100%; object-fit: contain;" alt="Expanded image">
                <button class="close-btn" style="position: absolute; top: 10px; right: 10px;">×</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        const closeBtn = modal.querySelector('.close-btn');
        const closeModal = () => {
            modal.remove();
            document.body.style.overflow = '';
        };
        
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
    
    renderAllPosts() {
        this.container.innerHTML = '';
        dataManager.data.posts.forEach(post => {
            this.container.appendChild(this.renderPost(post));
        });
    }
    
    prependPost(post) {
        const postElement = this.renderPost(post);
        this.container.insertBefore(postElement, this.container.firstChild);
    }
}

class ContactRenderer {
    constructor() {
        this.container = document.getElementById('contactsList');
        this.suggestionsContainer = document.getElementById('suggestionsList');
    }
    
    renderContact(contact) {
        const contactElement = document.createElement('div');
        contactElement.className = 'contact-item';
        contactElement.dataset.contactId = contact.id;
        
        contactElement.innerHTML = `
            <div class="contact-avatar">
                <div class="user-avatar">${contact.avatar}</div>
                ${contact.isOnline ? '<div class="online-indicator"></div>' : ''}
            </div>
            <div class="contact-info">
                <div>${contact.name}</div>
                ${!contact.isOnline && contact.lastSeen ? `<div class="text-sm text-secondary">${contact.lastSeen}</div>` : ''}
            </div>
        `;
        
        contactElement.addEventListener('click', () => {
            notifications.info(`Opening chat with ${contact.name}`);
        });
        
        return contactElement;
    }
    
    renderSuggestion(suggestion) {
        const suggestionElement = document.createElement('div');
        suggestionElement.className = 'contact-item';
        suggestionElement.dataset.suggestionId = suggestion.id;
        
        suggestionElement.innerHTML = `
            <div class="user-avatar">${suggestion.avatar}</div>
            <div style="flex: 1;">
                <div>${suggestion.name}</div>
                <div class="text-sm text-secondary">
                    ${suggestion.mutualFriends} mutual friend${suggestion.mutualFriends !== 1 ? 's' : ''}
                </div>
            </div>
            <div class="suggestion-actions">
                <button class="btn-small btn-primary" data-action="add">Add</button>
                <button class="btn-small btn-secondary" data-action="remove">Remove</button>
            </div>
        `;
        
        // Add event listeners for buttons
        suggestionElement.querySelectorAll('.btn-small').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = btn.dataset.action;
                
                if (action === 'add') {
                    this.addFriend(suggestion);
                    suggestionElement.remove();
                } else if (action === 'remove') {
                    suggestionElement.remove();
                    notifications.show('Suggestion removed');
                }
            });
        });
        
        return suggestionElement;
    }
    
    addFriend(suggestion) {
        // Convert suggestion to contact
        const newContact = {
            id: suggestion.id,
            name: suggestion.name,
            avatar: suggestion.avatar,
            isOnline: Math.random() > 0.5, // Random online status
            lastSeen: null
        };
        
        dataManager.addContact(newContact);
        this.renderAllContacts();
        notifications.show(`${suggestion.name} added to friends!`);
    }
    
    renderAllContacts() {
        this.container.innerHTML = '';
        dataManager.getContacts().forEach(contact => {
            this.container.appendChild(this.renderContact(contact));
        });
    }
    
    renderAllSuggestions() {
        this.suggestionsContainer.innerHTML = '';
        dataManager.data.suggestions.forEach(suggestion => {
            this.suggestionsContainer.appendChild(this.renderSuggestion(suggestion));
        });
    }
}

class StoryViewer {
    constructor() {
        this.modal = document.getElementById('storyModal');
        this.userAvatar = document.getElementById('storyUserAvatar');
        this.username = document.getElementById('storyUsername');
        this.time = document.getElementById('storyTime');
        this.content = document.getElementById('storyContent');
        this.progressBar = this.modal.querySelector('.progress-bar');
        this.closeBtn = document.getElementById('closeStoryModal');
        
        this.currentStoryIndex = 0;
        this.stories = [];
        this.progressTimeout = null;
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.closeBtn.addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
        
        // Navigate stories with arrow keys
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('active')) return;
            
            if (e.key === 'ArrowLeft') this.previousStory();
            if (e.key === 'ArrowRight') this.nextStory();
            if (e.key === 'Escape') this.close();
        });
    }
    
    open(storyId) {
        this.stories = dataManager.getStories();
        this.currentStoryIndex = this.stories.findIndex(s => s.id === storyId);
        
        if (this.currentStoryIndex === -1) {
            this.currentStoryIndex = 0;
        }
        
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.showCurrentStory();
    }
    
    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.clearProgress();
    }
    
    showCurrentStory() {
        if (this.currentStoryIndex < 0 || this.currentStoryIndex >= this.stories.length) {
            this.close();
            return;
        }
        
        const story = this.stories[this.currentStoryIndex];
        
        this.userAvatar.textContent = story.avatar;
        this.username.textContent = story.username;
        this.time.textContent = dataManager.formatTimestamp(story.timestamp);
        
        this.content.style.background = story.background;
        this.content.innerHTML = `<div class="story-text">${story.content}</div>`;
        
        // Mark as viewed
        dataManager.markStoryAsViewed(story.id);
        
        this.startProgress();
    }
    
    startProgress() {
        this.clearProgress();
        this.progressBar.style.width = '0%';
        this.progressBar.style.animation = 'none';
        
        // Force reflow
        this.progressBar.offsetHeight;
        
        this.progressBar.style.animation = 'progressBar 5s linear forwards';
        
        this.progressTimeout = setTimeout(() => {
            this.nextStory();
        }, 5000);
    }
    
    clearProgress() {
        if (this.progressTimeout) {
            clearTimeout(this.progressTimeout);
            this.progressTimeout = null;
        }
        this.progressBar.style.animation = 'none';
    }
    
    nextStory() {
        this.clearProgress();
        this.currentStoryIndex++;
        this.showCurrentStory();
    }
    
    previousStory() {
        this.clearProgress();
        this.currentStoryIndex--;
        this.showCurrentStory();
    }
}

class SearchManager {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.suggestionsContainer = document.getElementById('searchSuggestions');
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.searchInput.addEventListener('input', this.handleSearch.bind(this));
        this.searchInput.addEventListener('focus', this.showSuggestions.bind(this));
        this.searchInput.addEventListener('blur', () => {
            // Delay hiding to allow clicking on suggestions
            setTimeout(() => this.hideSuggestions(), 200);
        });
        
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.hideSuggestions();
            }
        });
    }
    
    handleSearch(e) {
        const query = e.target.value;
        
        if (query.length === 0) {
            this.showDefaultSuggestions();
        } else {
            this.showSearchResults(query);
        }
    }
    
    showDefaultSuggestions() {
        this.renderSuggestions(dataManager.data.searchSuggestions);
    }
    
    showSearchResults(query) {
        const results = dataManager.search(query);
        this.renderSuggestions(results);
    }
    
    renderSuggestions(suggestions) {
        this.suggestionsContainer.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'search-suggestion';
            
            const icon = suggestion.avatar ? 
                `<div class="user-avatar" style="width: 32px; height: 32px; font-size: 12px;">${suggestion.avatar}</div>` :
                `<span style="font-size: 20px;">${suggestion.icon || '🔍'}</span>`;
            
            item.innerHTML = `
                ${icon}
                <div>
                    <div>${suggestion.name}</div>
                    ${suggestion.username ? `<div class="text-sm text-secondary">${suggestion.username}</div>` : ''}
                </div>
            `;
            
            item.addEventListener('click', () => {
                this.selectSuggestion(suggestion);
            });
            
            this.suggestionsContainer.appendChild(item);
        });
        
        this.showSuggestions();
    }
    
    selectSuggestion(suggestion) {
        this.searchInput.value = suggestion.name;
        this.hideSuggestions();
        
        if (suggestion.type === 'user') {
            notifications.info(`Viewing ${suggestion.name}'s profile`);
        } else if (suggestion.type === 'post') {
            notifications.info('Viewing post');
        } else {
            notifications.info(`Searching for "${suggestion.name}"`);
        }
    }
    
    showSuggestions() {
        this.suggestionsContainer.style.display = 'block';
    }
    
    hideSuggestions() {
        this.suggestionsContainer.style.display = 'none';
    }
}

class PostCreator {
    constructor() {
        this.modal = document.getElementById('postModal');
        this.textarea = document.getElementById('modalTextarea');
        this.postBtn = document.getElementById('modalPostBtn');
        this.privacySelect = document.getElementById('privacySelect');
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.textarea.addEventListener('input', this.handleTextareaChange.bind(this));
        this.postBtn.addEventListener('click', this.createPost.bind(this));
        
        // Character counter
        this.textarea.addEventListener('input', this.updateCharacterCount.bind(this));
    }
    
    handleTextareaChange() {
        const hasContent = this.textarea.value.trim().length > 0;
        this.postBtn.disabled = !hasContent;
    }
    
    updateCharacterCount() {
        const count = this.textarea.value.length;
        const maxLength = 5000;
        
        // Add character counter if it doesn't exist
        let counter = this.modal.querySelector('.character-counter');
        if (!counter) {
            counter = document.createElement('div');
            counter.className = 'character-counter text-sm text-secondary';
            counter.style.textAlign = 'right';
            counter.style.marginTop = '8px';
            this.textarea.parentNode.insertBefore(counter, this.postBtn);
        }
        
        counter.textContent = `${count}/${maxLength}`;
        counter.style.color = count > maxLength * 0.9 ? 'var(--danger-red)' : 'var(--text-secondary)';
        
        this.postBtn.disabled = count === 0 || count > maxLength;
    }
    
    createPost() {
        const content = this.textarea.value.trim();
        const privacy = this.privacySelect.value;
        
        if (!content) return;
        
        const newPost = dataManager.createPost(content, privacy);
        
        // Add to UI
        if (window.postRenderer) {
            window.postRenderer.prependPost(newPost);
        }
        
        // Clear form
        this.textarea.value = '';
        this.postBtn.disabled = true;
        
        // Remove character counter
        const counter = this.modal.querySelector('.character-counter');
        if (counter) counter.remove();
        
        // Close modal
        if (window.modalManager) {
            window.modalManager.closeModal('postModal');
        }
        
        notifications.show('Post created successfully! 🎉');
    }
    
    open() {
        if (window.modalManager) {
            window.modalManager.openModal('postModal');
        }
    }
}

class DropdownManager {
    constructor() {
        this.activeDropdown = null;
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        document.addEventListener('click', this.handleDocumentClick.bind(this));
        
        // Setup dropdown triggers
        document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleDropdown(trigger);
            });
        });
    }
    
    toggleDropdown(trigger) {
        const dropdown = trigger.querySelector('.dropdown-menu');
        if (!dropdown) return;
        
        if (this.activeDropdown && this.activeDropdown !== dropdown) {
            this.closeDropdown(this.activeDropdown);
        }
        
        const isOpen = dropdown.classList.contains('active');
        
        if (isOpen) {
            this.closeDropdown(dropdown);
        } else {
            this.openDropdown(dropdown);
        }
    }
    
    openDropdown(dropdown) {
        dropdown.classList.add('active');
        this.activeDropdown = dropdown;
    }
    
    closeDropdown(dropdown) {
        dropdown.classList.remove('active');
        if (this.activeDropdown === dropdown) {
            this.activeDropdown = null;
        }
    }
    
    handleDocumentClick(e) {
        if (this.activeDropdown && !e.target.closest('.dropdown-trigger')) {
            this.closeDropdown(this.activeDropdown);
        }
    }
}

// Initialize global instances
const notifications = new NotificationManager();
const modalManager = new ModalManager();
const postRenderer = new PostRenderer();
const contactRenderer = new ContactRenderer();
const storyViewer = new StoryViewer();
const searchManager = new SearchManager();
const postCreator = new PostCreator();
const dropdownManager = new DropdownManager();

// Make instances globally available
window.notifications = notifications;
window.modalManager = modalManager;
window.postRenderer = postRenderer;
window.contactRenderer = contactRenderer;
window.storyViewer = storyViewer;
window.searchManager = searchManager;
window.postCreator = postCreator;
window.dropdownManager = dropdownManager;
