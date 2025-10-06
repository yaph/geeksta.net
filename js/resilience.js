// DOM Elements
const introScreen = document.getElementById('introScreen');
const challengeScreen = document.getElementById('challengeScreen');
const startChallengeBtn = document.getElementById('startChallenge');
const currentDayElement = document.getElementById('currentDay');
const completedDaysElement = document.getElementById('completedDays');
const challengeTitle = document.getElementById('challengeTitle');
const challengeDescription = document.getElementById('challengeDescription');
const completionMessage = document.getElementById('completionMessage');
const completeChallengeBtn = document.getElementById('completeChallenge');
const prevDayBtn = document.getElementById('prevDay');
const nextDayBtn = document.getElementById('nextDay');
const resetProgressBtn = document.getElementById('resetProgress');

// App State
let currentDay = 1;
let completedDays = JSON.parse(localStorage.getItem('completedDays')) || [];
let challenges = [];

// Initialize the app
function initApp() {
    updateProgress();

    // Find the lowest incomplete day, or default to day 1
    const allDays = challenges.map(c => c.day);
    const incompleteDays = allDays.filter(day => !completedDays.includes(day));
    currentDay = incompleteDays.length > 0 ? Math.min(...incompleteDays) : 1;

    showChallenge(currentDay);

    // Check if current day is already completed
    if (completedDays.includes(currentDay)) {
        showCompletionMessage();
    }
}

// Show the challenge for a specific day
function showChallenge(day) {
    const challenge = challenges.find(c => c.day === day);

    if (!challenge) return;

    currentDayElement.textContent = day;
    challengeTitle.textContent = `Day ${day}: ${challenge.title}`;

    // Update challenge description
    challengeDescription.innerHTML = `
        <p>${challenge.description}</p>
        <div class="challenge-tip">
            <strong>Why this works:</strong> ${challenge.tip}
        </div>
    `;

    // Update button states
    prevDayBtn.disabled = day === 1;
    nextDayBtn.disabled = day === challenges.length;

    // Show/hide completion message
    if (completedDays.includes(day)) {
        showCompletionMessage();
    } else {
        hideCompletionMessage();
    }
}

// Show completion message
function showCompletionMessage() {
    if (completedDays.length === challenges.length) {
        completionMessage.innerHTML = '<strong>Congratulations! You have completed all challenges!</strong>';
    }
    completionMessage.style.display = 'block';
    completeChallengeBtn.textContent = 'Completed!';
    completeChallengeBtn.disabled = true;
}

// Hide completion message
function hideCompletionMessage() {
    completionMessage.style.display = 'none';
    completeChallengeBtn.textContent = 'Mark as Complete';
    completeChallengeBtn.disabled = false;
}

// Update progress display
function updateProgress() {
    completedDaysElement.textContent = completedDays.length;
}

// Reset progress button
function resetProgress() {
    if (confirm('Reset all progress and start from Day 1?')) {
        completedDays = [];
        localStorage.removeItem('completedDays');
        currentDay = 1;

        challengeScreen.classList.add('hidden');
        introScreen.classList.remove('hidden');

        hideCompletionMessage();
        updateProgress();
    }
}

// Load challenges from JSON file
async function loadChallenges() {
    try {
        const response = await fetch('/data/resilience.json');
        const data = await response.json();
        challenges = data.challenges;

        // Show intro only if no challenges have been started
        if (completedDays.length === 0) {
            introScreen.classList.remove('hidden');
            challengeScreen.classList.add('hidden');
        } else {
            // User has already started - go directly to challenges
            introScreen.classList.add('hidden');
            challengeScreen.classList.remove('hidden');
            initApp();
        }
    } catch (error) {
        console.error('Error loading challenges:', error);
        document.getElementById('introScreen').innerHTML = `
            <h2>Error Loading Challenges</h2>
            <p>Please check if challenges.json exists and try refreshing the page.</p>
        `;
    }
}

// Event Listeners
startChallengeBtn.addEventListener('click', () => {
    introScreen.classList.add('hidden');
    challengeScreen.classList.remove('hidden');
    initApp();
});

completeChallengeBtn.addEventListener('click', () => {
    if (!completedDays.includes(currentDay)) {
        completedDays.push(currentDay);
        localStorage.setItem('completedDays', JSON.stringify(completedDays));
        updateProgress();
        showCompletionMessage();

        // Auto-advance to next incomplete day after a delay
        setTimeout(() => {
            const allDays = challenges.map(c => c.day);
            const incompleteDays = allDays.filter(day => !completedDays.includes(day));
            if (incompleteDays.length > 0) {
                currentDay = Math.min(...incompleteDays);
                showChallenge(currentDay);
            }
        }, 1500);
    }
});

prevDayBtn.addEventListener('click', () => {
    if (currentDay > 1) {
        currentDay--;
        showChallenge(currentDay);
    }
});

nextDayBtn.addEventListener('click', () => {
    if (currentDay < challenges.length) {
        currentDay++;
        showChallenge(currentDay);
    }
});

resetProgressBtn.addEventListener('click', resetProgress);

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', loadChallenges);