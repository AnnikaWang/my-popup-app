document.addEventListener('DOMContentLoaded', () => {
    // 1. Home Dashboard Setup
    const homeScreen = document.getElementById('home-screen');
    const profileScreen = document.getElementById('profile-screen');
    const bubbleNextBtn = document.querySelector('.bubble-next-btn');

    if (bubbleNextBtn && homeScreen && profileScreen) {
        bubbleNextBtn.addEventListener('click', () => {
            homeScreen.classList.add('hidden');
            profileScreen.classList.remove('hidden');
        });
    }

    // 2. Navigation Routing
    const homeProfileNavBtn = document.getElementById('home-profile-nav');
    if (homeProfileNavBtn && homeScreen && profileScreen) {
        homeProfileNavBtn.addEventListener('click', () => {
            homeScreen.classList.add('hidden');
            profileScreen.classList.remove('hidden');
        });
    }

    // 3. Profile Editor Modal Setup
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const inputModal = document.getElementById('input-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const saveProfileBtn = document.getElementById('save-profile-btn');
    
    const usernameInput = document.getElementById('username-input');
    const displayUsername = document.getElementById('display-username');
    const interestsList = document.getElementById('interests-list');

    if (editProfileBtn && inputModal) {
        editProfileBtn.addEventListener('click', () => {
            usernameInput.value = displayUsername.textContent === "[Username]" ? "" : displayUsername.textContent;
            inputModal.classList.remove('hidden');
        });
    }

    if (closeModalBtn && inputModal) {
        closeModalBtn.addEventListener('click', () => {
            inputModal.classList.add('hidden');
        });
    }

    if (saveProfileBtn && inputModal) {
        saveProfileBtn.addEventListener('click', () => {
            if (usernameInput && usernameInput.value.trim() !== "") {
                displayUsername.textContent = usernameInput.value.trim();
            }
            inputModal.classList.add('hidden');
        });
    }

    // 4. Quick Interest Injection Bar
    const directInterestInput = document.getElementById('direct-interest-input');
    const addInterestBtn = document.getElementById('add-interest-btn');

    if (addInterestBtn) {
        addInterestBtn.addEventListener('click', () => {
            if (!directInterestInput || !interestsList) return;
            const textValue = directInterestInput.value.trim();
            if (textValue !== "") {
                const newBullet = document.createElement('li');
                newBullet.textContent = textValue;
                interestsList.appendChild(newBullet);
                directInterestInput.value = "";
            }
        });
    }

    // 5. Screen Navigation: Profile -> Affirmation
    const profilePlusNavBtn = document.getElementById('profile-plus-nav');
    const currentProfileScreen = document.getElementById('profile-screen');
    const currentAffirmationScreen = document.getElementById('affirmation-screen');

    if (profilePlusNavBtn && currentProfileScreen && currentAffirmationScreen) {
        profilePlusNavBtn.addEventListener('click', () => {
            currentProfileScreen.classList.add('hidden');       
            currentAffirmationScreen.classList.remove('hidden'); 
        });
    }

    // 6. Return Routing: Affirmation -> Profile
    const affProfileNavBtn = document.getElementById('aff-profile-nav');
    if (affProfileNavBtn && currentAffirmationScreen && currentProfileScreen) {
        affProfileNavBtn.addEventListener('click', () => {
            currentAffirmationScreen.classList.add('hidden');
            currentProfileScreen.classList.remove('hidden');
        });
    }

        // ==========================================================================
    // 5. BOOK NAVIGATION TABS ROUTING (RESOURCES SCREEN LOOKUP)
    // ==========================================================================
    
    // Select the resources view screen container layout frame
    const resourcesScreen = document.getElementById('resources-screen');
    
    // Find every navigation icon holding your book image across all panels
    const bookNavButtons = document.querySelectorAll('.nav-icon img[src*="book.jpg"]');

    if (resourcesScreen && bookNavButtons.length > 0) {
        bookNavButtons.forEach(button => {
            // Target the parent circle wrapper node to capture click bounds safely
            const parentIconWrapper = button.closest('.nav-icon');
            
            if (parentIconWrapper) {
                parentIconWrapper.style.cursor = 'pointer'; // Ensure arrow cursor state maps cleanly
                
                parentIconWrapper.addEventListener('click', () => {
                    // 1. Target and hide all active viewport screens instantly
                    document.querySelectorAll('.view-panel').forEach(panel => {
                        panel.classList.add('hidden');
                    });
                    
                    // 2. Un-hide your custom "xoxo" info menu container grid
                    resourcesScreen.classList.remove('hidden');
                    
                    // 3. Clear active states across sibling menu layers and pin focus to this selection
                    document.querySelectorAll('.nav-icon').forEach(icon => icon.classList.remove('active', 'active-nav'));
                    parentIconWrapper.classList.add('active');
                });
            }
        });
    }

    // Connect return routing links for home and plus actions inside resources screen
    const resProfileNav = document.getElementById('res-profile-nav');
    const resPlusNav = document.getElementById('res-plus-nav');

    if (resProfileNav && homeScreen) {
        resProfileNav.addEventListener('click', () => {
            resourcesScreen.classList.add('hidden');
            homeScreen.classList.remove('hidden');
        });
    }

    if (resPlusNav && affirmationScreen) {
        resPlusNav.addEventListener('click', () => {
            resourcesScreen.classList.add('hidden');
            affirmationScreen.classList.remove('hidden');
        });
    }

        // ==========================================================================
    // 6. PLUS NAVIGATION TABS ROUTING (AFFIRMATION SCREEN LOOKUP)
    // ==========================================================================
    
    // Select the affirmation view screen container layout frame
    const targetAffirmationScreen = document.getElementById('affirmation-screen');
    
    // Find every navigation icon holding your plus image across all panels
    const plusNavButtons = document.querySelectorAll('.nav-icon img[src*="plus.jpg"]');

    if (targetAffirmationScreen && plusNavButtons.length > 0) {
        plusNavButtons.forEach(button => {
            // Target the parent circle wrapper node to capture click bounds safely
            const parentIconWrapper = button.closest('.nav-icon');
            
            if (parentIconWrapper) {
                parentIconWrapper.addEventListener('click', () => {
                    // 1. Target and hide all active viewport screens instantly
                    document.querySelectorAll('.view-panel').forEach(panel => {
                        panel.classList.add('hidden');
                    });
                    
                    // 2. Reveal your custom affirmation canvas view deck
                    targetAffirmationScreen.classList.remove('hidden');
                    
                    // 3. Update the active visual indicators across menu layers
                    document.querySelectorAll('.nav-icon').forEach(icon => icon.classList.remove('active', 'active-nav'));
                    parentIconWrapper.classList.add('active-nav');
                });
            }
        });
    }



});

// Global layout utility configurations
function selectMeme(element) {
    document.querySelectorAll('.meme-box').forEach(box => box.classList.remove('selected'));
    element.classList.add('selected');
}

