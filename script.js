document.addEventListener('DOMContentLoaded', () => {
    // Main View Containers
    const homeScreen = document.getElementById('home-screen');
    const profileScreen = document.getElementById('profile-screen');
    const affirmationScreen = document.getElementById('affirmation-screen');
    const resourcesScreen = document.getElementById('resources-screen');
    const inputModal = document.getElementById('input-modal');

    // Central Navigation Controller to completely eliminate view overlapping
    function switchScreen(targetScreen) {
        if (!targetScreen) return;

        // Gather all main layout screens in the app
        const allScreens = [homeScreen, profileScreen, affirmationScreen, resourcesScreen];
        
        // Hide every screen completely
        allScreens.forEach(screen => {
            if (screen) {
                screen.classList.add('hidden');
            }
        });

        // Show exclusively the target screen
        targetScreen.classList.remove('hidden');
    }

    // ==========================================================================
    // 1. HOME DASHBOARD ROUTING
    // ==========================================================================
    const bubbleNextBtn = document.querySelector('.bubble-next-btn');
    if (bubbleNextBtn) {
        bubbleNextBtn.addEventListener('click', () => {
            switchScreen(profileScreen);
        });
    }

    const homeProfileNavBtn = document.getElementById('home-profile-nav');
    if (homeProfileNavBtn) {
        homeProfileNavBtn.addEventListener('click', () => {
            switchScreen(profileScreen);
        });
    }

    // ==========================================================================
    // 2. PROFILE EDITOR MODAL SETUP
    // ==========================================================================
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const saveProfileBtn = document.getElementById('save-profile-btn');
    
    const usernameInput = document.getElementById('username-input');
    const displayUsername = document.getElementById('display-username');
    const interestsList = document.getElementById('interests-list');

    if (editProfileBtn && inputModal) {
        editProfileBtn.addEventListener('click', () => {
            if (displayUsername) {
                usernameInput.value = displayUsername.textContent === "[Username]" ? "" : displayUsername.textContent;
            }
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
            if (usernameInput && usernameInput.value.trim() !== "" && displayUsername) {
                displayUsername.textContent = usernameInput.value.trim();
            }
            inputModal.classList.add('hidden');
        });
    }

    // ==========================================================================
    // 3. PROFILE INTEREST INJECTION
    // ==========================================================================
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

    // ==========================================================================
    // 4. OLD SCREEN-TO-SCREEN ROUTING LINKS
    // ==========================================================================
    const profilePlusNavBtn = document.getElementById('profile-plus-nav');
    if (profilePlusNavBtn) {
        profilePlusNavBtn.addEventListener('click', () => {
            switchScreen(affirmationScreen);
        });
    }

    const affProfileNavBtn = document.getElementById('aff-profile-nav');
    if (affProfileNavBtn) {
        affProfileNavBtn.addEventListener('click', () => {
            switchScreen(profileScreen);
        });
    }

    // ==========================================================================
    // 5. GLOBAL BOOK NAVIGATION ROUTING (RESOURCES LOOKUP)
    // ==========================================================================
    const bookNavButtons = document.querySelectorAll('.nav-icon img[src*="book.jpg"]');
    if (bookNavButtons.length > 0) {
        bookNavButtons.forEach(button => {
            const parentIconWrapper = button.closest('.nav-icon');
            if (parentIconWrapper) {
                parentIconWrapper.style.cursor = 'pointer';
                parentIconWrapper.addEventListener('click', () => {
                    switchScreen(resourcesScreen);
                    
                    // Synchronize bottom highlight states
                    document.querySelectorAll('.nav-icon').forEach(icon => icon.classList.remove('active', 'active-nav'));
                    parentIconWrapper.classList.add('active-nav');
                });
            }
        });
    }

    // Resources Back Links
    const resProfileNav = document.getElementById('res-profile-nav');
    const resPlusNav = document.getElementById('res-plus-nav');

    if (resProfileNav) {
        resProfileNav.addEventListener('click', () => {
            switchScreen(homeScreen);
        });
    }

    if (resPlusNav) {
        resPlusNav.addEventListener('click', () => {
            switchScreen(affirmationScreen);
        });
    }

    // ==========================================================================
    // 6. GLOBAL PLUS NAVIGATION ROUTING (AFFIRMATION LOOKUP)
    // ==========================================================================
    const plusNavButtons = document.querySelectorAll('.nav-icon img[src*="plus.jpg"]');
    if (plusNavButtons.length > 0) {
        plusNavButtons.forEach(button => {
            const parentIconWrapper = button.closest('.nav-icon');
            if (parentIconWrapper) {
                parentIconWrapper.style.cursor = 'pointer';
                parentIconWrapper.addEventListener('click', () => {
                    switchScreen(affirmationScreen);
                    
                    // Synchronize bottom highlight states across menu layers
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
