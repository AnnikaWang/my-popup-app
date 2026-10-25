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
    switchScreen(homeScreen);

    // ==========================================================================
    // 1. HOME DASHBOARD ROUTING (UPDATED WITH DYNAMIC DATA LOG LOGIC)
    // ==========================================================================
    const bubbleSaveBtn = document.getElementById('bubble-save-btn') || document.querySelector('.bubble-save-btn');
    
    if (bubbleSaveBtn) {
        bubbleSaveBtn.addEventListener('click', () => {
            // 1. Locate the currently selected cat mascot box element block
            const selectedMemeBox = document.querySelector('.meme-box.selected');
            const logContainer = document.getElementById('log-container');
            
            if (!selectedMemeBox) {
                alert("Please click and select a meme cat icon first before saving!");
                return;
            }

            // 2. Fetch the corresponding custom meaning text description
            const catMeaning = selectedMemeBox.getAttribute('data-meaning') || "unknown";

            // 3. Generate dynamic timestamp dates matching your exact design requirements
            const today = new Date();
            const day = today.getDate();
            const year = today.getFullYear();
            
            // Month abbreviation array dictionary mapping
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const monthText = months[today.getMonth()];

            // Calculate standard ordinal indicator suffixes (st, nd, rd, th)
            let suffix = "th";
            if (day === 1 || day === 21 || day === 31) suffix = "st";
            else if (day === 2 || day === 22) suffix = "nd";
            else if (day === 3 || day === 23) suffix = "rd";

            // 4. Construct the structural layout with the cute star bullet point
            const newLogEntry = document.createElement('div');
            newLogEntry.className = 'log-entry';
            newLogEntry.style.display = 'flex';
            newLogEntry.style.gap = '8px';
            newLogEntry.style.alignItems = 'baseline';
            
            // Builds your string text parameter match: ☆ Xth Month Year - 'meaning' cat
            newLogEntry.innerHTML = `
                <span class="star-icon">☆</span> 
                <span class="log-text">${day}<sup>${suffix}</sup> ${monthText} ${year} - '${catMeaning}' cat</span>
            `;

            // 5. Inject the newly generated node directly to your Profile Log block
            if (logContainer) {
                logContainer.appendChild(newLogEntry);
            }

            // 6. Transition cleanly to the profile dashboard view panel card
            if (profileScreen) {
                switchScreen(profileScreen);
            }
        });
    }

    // RETAINED: Keeps your manual nav icons routing to the profile screen active
    const homeProfileNavBtn = document.getElementById('home-profile-nav');
    if (homeProfileNavBtn) {
        homeProfileNavBtn.addEventListener('click', () => {
            if (profileScreen) {
                switchScreen(profileScreen);
            }
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
        // ==========================================================================
        // 7. GLOBAL HOME NAVIGATION ROUTING (GLOBAL HOME ICON LOOKUP)
        // ==========================================================================
        // Finds every home icon button instance across all hidden and visible views
        const globalHomeButtons = document.querySelectorAll('.nav-home-btn, .nav-icon img[src*="home.jpg"]');
        
        if (globalHomeButtons.length > 0 && homeScreen) {
            globalHomeButtons.forEach(button => {
                // Target the parent wrapper node to ensure safe, clean click bounds
                const parentIconWrapper = button.classList.contains('nav-icon') ? button : button.closest('.nav-icon');
                
                if (parentIconWrapper) {
                    parentIconWrapper.style.cursor = 'pointer';
                    
                    parentIconWrapper.addEventListener('click', () => {
                        // 1. Instantly drop all views and switch cleanly back to the dashboard 
                        switchScreen(homeScreen);
                        
                        // 2. Synchronize navigation highlight ring mechanics
                        document.querySelectorAll('.nav-icon').forEach(icon => icon.classList.remove('active', 'active-nav'));
                        
                        // Find the home icon inside the target home screen navigation bar and set it active
                        const primaryHomeIcon = homeScreen.querySelector('.top-nav .nav-icon');
                        if (primaryHomeIcon) {
                            primaryHomeIcon.classList.add('active');
                        }
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
