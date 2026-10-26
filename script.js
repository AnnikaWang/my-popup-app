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
    
    // Set the initial startup view
    switchScreen(homeScreen);

    // ==========================================================================
    // ELECTRON IPC CONTROLLERS FOR WINDOW DOT TITLES (CLOSE & MINIMIZE)
    // ==========================================================================
    const ipcRenderer = window.require ? window.require('electron').ipcRenderer : null;

    const closeDot = document.querySelector('.dot.close');
    if (closeDot && ipcRenderer) {
        closeDot.addEventListener('click', () => {
            ipcRenderer.send('window-control-close');
        });
    }

    const minimizeDot = document.querySelector('.dot.minimize');
    if (minimizeDot && ipcRenderer) {
        minimizeDot.addEventListener('click', () => {
            ipcRenderer.send('window-control-minimize');
        });
    }

    // ==========================================================================
    // 1. HOME DASHBOARD ROUTING (UPDATED WITH DYNAMIC DATA LOG & RANDOM QUOTE)
    // ==========================================================================
    
    // An array holding 10 unique, therapeutic affirmations
    const affirmationsList = [
        "I am free to make mistakes",
        "My imperfections are what make me human",
        "I am capable of handling whatever comes my way",
        "It is okay to take things one step at a time",
        "I am proud of how far I have come already",
        "My feelings are valid, and it is okay to rest",
        "I am gentle with myself and my progress",
        "I have the strength to create a beautiful day",
        "Nobody is perfect all the time",
        "I am resilient, patient, and continually adapting",
        "It is okay to have bad days", 
        "My mistakes do not define my worth"
    ];

    const bubbleSaveBtn = document.getElementById('bubble-save-btn') || document.querySelector('.bubble-save-btn');
    
    if (bubbleSaveBtn) {
        bubbleSaveBtn.addEventListener('click', () => {
            const selectedMemeBox = document.querySelector('.meme-box.selected');
            const logContainer = document.getElementById('log-container');
            
            if (!selectedMemeBox) {
                alert("Please click and select a meme cat icon first before saving!");
                return;
            }

            // 1. DATA LOG GENERATION (Profile Log Updates)
            const catMeaning = selectedMemeBox.getAttribute('data-meaning') || "unknown";
            const today = new Date();
            const day = today.getDate();
            const year = today.getFullYear();
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const monthText = months[today.getMonth()];

            let suffix = "th";
            if (day === 1 || day === 21 || day === 31) suffix = "st";
            else if (day === 2 || day === 22) suffix = "nd";
            else if (day === 3 || day === 23) suffix = "rd";

            const newLogEntry = document.createElement('div');
            newLogEntry.className = 'log-entry';
            newLogEntry.style.display = 'flex';
            newLogEntry.style.gap = '8px';
            newLogEntry.style.alignItems = 'baseline';
            
            newLogEntry.innerHTML = `
                <span class="star-icon">☆</span> 
                <span class="log-text">${day}<sup>${suffix}</sup> ${monthText} ${year} - '${catMeaning}' cat</span>
            `;

            if (logContainer) {
                logContainer.appendChild(newLogEntry);
            }

            // 2. RANDOM AFFIRMATION PICKER
            const displayElement = document.getElementById('home-affirmation-display');
            if (displayElement) {
                // Calculate a random integer index from 0 up to 9
                const randomIndex = Math.floor(Math.random() * affirmationsList.length);
                const randomChoice = affirmationsList[randomIndex];
                
                // Inject the chosen phrase wrapped inside stylized typographical quotes
                displayElement.textContent = `“${randomChoice}”`;
            }

            // 3. IN-PLACE HOME SCREEN LAYOUT SWITCH
            const inputView = document.querySelector('.mood-selection-view');
            const resultView = document.querySelector('.saved-affirmation-view');
            
            if (inputView && resultView) {
                inputView.classList.add('hidden');
                resultView.classList.remove('hidden');
                console.log("Home screen updated with a random affirmation card.");
            }
        });
    }

    // RETAINED: Manual navigation icon link routing to profile screen
    const homeProfileNavBtn = document.getElementById('home-profile-nav');
    if (homeProfileNavBtn) {
        homeProfileNavBtn.addEventListener('click', () => {
            if (profileScreen) {
                switchScreen(profileScreen);
            }
        });
    }

    // RETAINED: In-bubble redirect button routing to profile logs
    const bubbleProfileRedirectBtn = document.getElementById('bubble-profile-redirect-btn');
    if (bubbleProfileRedirectBtn && profileScreen) {
        bubbleProfileRedirectBtn.addEventListener('click', () => {
            switchScreen(profileScreen);
            
            document.querySelectorAll('.nav-icon').forEach(icon => icon.classList.remove('active', 'active-nav'));
            const homeProfileNav = document.getElementById('home-profile-nav');
            if (homeProfileNav) homeProfileNav.classList.add('active');
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
                    
                    document.querySelectorAll('.nav-icon').forEach(icon => icon.classList.remove('active', 'active-nav'));
                    parentIconWrapper.classList.add('active-nav');
                });
            }
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
                    
                    document.querySelectorAll('.nav-icon').forEach(icon => icon.classList.remove('active', 'active-nav'));
                    parentIconWrapper.classList.add('active-nav');
                });
            }
        });
    }

    // ==========================================================================
    // 7. GLOBAL HOME NAV BACK LINK ROUTING (UPDATED WITH SUB-VIEW RESET)
    // ==========================================================================
    const globalHomeButtons = document.querySelectorAll('.nav-icon img[src*="home.jpg"]');
    globalHomeButtons.forEach(button => {
        const parentIconWrapper = button.closest('.nav-icon');
        if (parentIconWrapper) {
            parentIconWrapper.style.cursor = 'pointer';
            parentIconWrapper.addEventListener('click', () => {
                // 1. Core screen switchboard transition back to dashboard frame
                switchScreen(homeScreen);
                
                // 2. RESET SUB-VIEWS: Restores the mood scale selection grid for next check-in
                const inputView = document.querySelector('.mood-selection-view');
                const resultView = document.querySelector('.saved-affirmation-view');
                if (inputView && resultView) {
                    inputView.classList.remove('hidden'); // Brings back the meme scale grid and save button
                    resultView.classList.add('hidden');    // Hides the daily text box preview
                }
            });
        }
    });


    // ==========================================================================
    // 8. EXTERNAL RESOURCES URL REDIRECT ROUTING CONTROLLER
    // ==========================================================================
    const resourceLinks = document.querySelectorAll('.external-link');
    
    if (resourceLinks.length > 0) {
        resourceLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); 
                
                const targetUrl = link.getAttribute('data-url');
                
                if (targetUrl && ipcRenderer) {
                    ipcRenderer.send('open-external-url', targetUrl);
                } else if (targetUrl) {
                    window.open(targetUrl, '_blank');
                }
            });
        });
    }
}); // FIXED: Cleanly seals the DOMContentLoaded main loop block wrapper

// ==========================================================================
// GLOBAL LAYOUT CONFIGURATIONS (MUST STAY OUTSIDE DOMCONTENTLOADED)
// ==========================================================================
function selectMeme(element) {
    document.querySelectorAll('.meme-box').forEach(box => box.classList.remove('selected'));
    element.classList.add('selected');
}
