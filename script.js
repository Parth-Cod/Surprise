// Love Letter Content (customizable)
const letterLines = [
    "My Dearest Valentine,",
    "",
    "From the moment you came into my life, every day has felt brighter, every moment more meaningful. You have this incredible way of making the ordinary feel extraordinary, and I find myself falling for you more with each passing day.",
    "",
    "Your smile lights up my darkest days, your laughter is the sweetest melody I've ever heard, and your presence brings a warmth to my heart that I never knew was possible. You make me want to be better, to dream bigger, and to love deeper.",
    "",
    "This Valentine's Day, and every day after, I want you to know that you are cherished, you are adored, and you are deeply loved.",
    "",
    "Thank you for being exactly who you are, and for choosing to share your heart with me.",
    "",
    "Forever yours,",
    "With all my love 💕"
];

// Love Reasons (customizable)
const loveReasons = [
    "Your beautiful smile that brightens my entire day",
    "The way you laugh makes my heart skip a beat",
    "How you always know exactly what to say to make me feel better",
    "Your kindness and compassion toward everyone you meet",
    "The way your eyes light up when you talk about things you love",
    "How you make me feel safe and loved just by being near",
    "Your incredible sense of humor that never fails to make me smile",
    "The way you believe in me even when I doubt myself",
    "How you turn ordinary moments into extraordinary memories",
    "Your courage to always be authentically yourself",
    "The way you listen when I need someone to talk to",
    "How your presence makes any place feel like home",
    "Your adorable quirks that make you uniquely you",
    "The way you care about the little things that matter to me",
    "How you inspire me to be a better person every day",
    "Your beautiful heart that loves so deeply and genuinely",
    "The way you make me feel like the luckiest person alive",
    "How you find joy in the simple pleasures of life",
    "Your strength and resilience through every challenge",
    "The way you dance like nobody's watching",
    "How you remember small details about things I've told you",
    "Your passion for the things and people you care about",
    "The way you make me feel understood and accepted",
    "How you're not afraid to be vulnerable with me",
    "Your incredible ability to see the good in people",
    "The way you hold my hand and make everything feel right",
    "How you challenge me to grow and see new perspectives",
    "Your beautiful soul that shines through everything you do",
    "The way you've changed my life in the most wonderful ways",
    "How loving you feels like coming home to where I belong"
];

// Create floating hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = ['❤️', '💕', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 6)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    document.getElementById('hearts-container').appendChild(heart);
    
    setTimeout(() => heart.remove(), 8000);
}

setInterval(createHeart, 300);

// Music control (using Web Audio API to generate simple tones)
let audioContext;
let musicPlaying = false;

// Keyboard accessibility for music control
document.getElementById('music-control').addEventListener('click', toggleMusic);
document.getElementById('music-control').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMusic();
    }
});

function toggleMusic() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    musicPlaying = !musicPlaying;
    document.getElementById('music-control').textContent = musicPlaying ? '🔊' : '🔇';
    document.getElementById('music-control').setAttribute('aria-label', 
        musicPlaying ? 'Mute background music' : 'Play background music');
    
    if (musicPlaying) {
        playBackgroundMusic();
    }
}

function playBackgroundMusic() {
    // Simple romantic melody using Web Audio API
    if (!musicPlaying || !audioContext) return;
    
    const notes = [523.25, 587.33, 659.25, 698.46, 783.99]; // C, D, E, F, G
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = randomNote;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
    
    setTimeout(() => playBackgroundMusic(), 1000);
}

// Initial Screen - Moving "No" button
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');

function moveNoButton() {
    const maxX = window.innerWidth - noBtn.offsetWidth - 40;
    const maxY = window.innerHeight - noBtn.offsetHeight - 40;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Yes button - Confetti and transition
yesBtn.addEventListener('click', function() {
    createConfetti();
    setTimeout(() => {
        switchScreen('initial-screen', 'countdown-screen');
        startCountdown();
    }, 2000);
});

function createConfetti() {
    const colors = ['#f5576c', '#f093fb', '#ff6b9d', '#ffd4d4', '#ffb5b5'];
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-20px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
    }
}

// Countdown Timer
function startCountdown() {
    const valentinesDay = new Date('2026-02-14T00:00:00');
    
    function updateCountdown() {
        const now = new Date();
        const diff = valentinesDay - now;
        
        if (diff <= 0) {
            openLetter();
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Skip button
document.getElementById('skip-btn').addEventListener('click', openLetter);

// Open Love Letter
function openLetter() {
    switchScreen('countdown-screen', 'letter-screen');
    setTimeout(() => {
        document.getElementById('envelope-flap').classList.add('open');
        setTimeout(() => {
            document.getElementById('letter').classList.add('show');
            // Hide the envelope after letter is fully visible
            setTimeout(() => {
                document.querySelector('.envelope').classList.add('hide');
                // Start typing animation after envelope disappears
                setTimeout(() => {
                    startTypingAnimation();
                }, 500);
            }, 1500);
        }, 800);
    }, 500);
}

// Line-by-line typing animation - FIXED SPACING BUG
function startTypingAnimation() {
    const letterContent = document.getElementById('letter-content');
    const continueBtn = document.getElementById('continue-from-letter');
    
    // Clear any existing content
    letterContent.innerHTML = '';
    
    let lineIndex = 0;
    const typingSpeed = 600; // milliseconds between each line
    
    function typeLine() {
        if (lineIndex < letterLines.length) {
            const line = letterLines[lineIndex];
            
            // Handle empty lines as paragraph breaks
            if (line === '') {
                const breakElement = document.createElement('span');
                breakElement.className = 'paragraph-break';
                letterContent.appendChild(breakElement);
            } else {
                const lineElement = document.createElement('span');
                lineElement.className = 'line';
                // FIXED: Removed extra space that was causing spacing bug
                lineElement.textContent = line;
                
                letterContent.appendChild(lineElement);
                
                // Add space only between words on the same line
                if (lineIndex < letterLines.length - 1 && letterLines[lineIndex + 1] !== '') {
                    letterContent.appendChild(document.createTextNode(' '));
                }
                
                // Trigger animation
                setTimeout(() => {
                    lineElement.classList.add('typing');
                }, 50);
            }
            
            lineIndex++;
            setTimeout(typeLine, typingSpeed);
        } else {
            // Show continue button after all lines are typed
            setTimeout(() => {
                continueBtn.classList.add('show');
            }, 500);
        }
    }
    
    typeLine();
}

// Continue from letter
document.getElementById('continue-from-letter').addEventListener('click', function() {
    switchScreen('letter-screen', 'feelings-screen');
});

// CHARACTER COUNTER for Feelings Textarea
const feelingsTextarea = document.getElementById('feelings-text');
const charCount = document.getElementById('char-count');

feelingsTextarea.addEventListener('input', function() {
    const currentLength = this.value.length;
    charCount.textContent = currentLength;
    
    // Change color when approaching limit
    if (currentLength > 900) {
        charCount.style.color = '#ff6b6b';
    } else if (currentLength > 700) {
        charCount.style.color = '#ffd93d';
    } else {
        charCount.style.color = 'white';
    }
});

// Feelings Form
document.getElementById('feelings-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const feelings = document.getElementById('feelings-text').value;
    localStorage.setItem('valentine-feelings', feelings);
    
    this.style.display = 'none';
    document.getElementById('thank-you').style.display = 'block';
});

document.getElementById('continue-to-jar').addEventListener('click', function() {
    switchScreen('feelings-screen', 'jar-screen');
    loadJarProgress();
});

// Jar of Love
let currentReasonIndex = 0;
let revealedReasons = [];

function loadJarProgress() {
    const saved = localStorage.getItem('revealed-reasons');
    if (saved) {
        revealedReasons = JSON.parse(saved);
        currentReasonIndex = revealedReasons.length;
        updateProgress();
        
        if (currentReasonIndex >= loveReasons.length) {
            showFinalMessage();
        }
    }
}

function saveProgress() {
    localStorage.setItem('revealed-reasons', JSON.stringify(revealedReasons));
}

// KEYBOARD ACCESSIBILITY for Jar
const jarElement = document.getElementById('jar');

jarElement.addEventListener('click', handleJarInteraction);
jarElement.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleJarInteraction();
    }
});

function handleJarInteraction() {
    if (currentReasonIndex >= loveReasons.length) {
        return;
    }
    
    jarElement.classList.add('shake');
    setTimeout(() => jarElement.classList.remove('shake'), 500);
    
    setTimeout(() => {
        showReason();
    }, 500);
}

function showReason() {
    const note = document.getElementById('note');
    const reason = loveReasons[currentReasonIndex];
    
    document.getElementById('note-number').textContent = `Reason ${currentReasonIndex + 1} of ${loveReasons.length}`;
    document.getElementById('note-text').textContent = reason;
    
    note.classList.add('show');
    
    // Focus on the note for screen readers
    note.setAttribute('tabindex', '-1');
    note.focus();
}

document.getElementById('next-reason').addEventListener('click', function() {
    const note = document.getElementById('note');
    note.classList.remove('show');
    
    revealedReasons.push(currentReasonIndex);
    currentReasonIndex++;
    saveProgress();
    updateProgress();
    
    if (currentReasonIndex >= loveReasons.length) {
        setTimeout(showFinalMessage, 500);
    } else {
        // Return focus to jar
        jarElement.focus();
    }
});

function updateProgress() {
    const progressText = `${currentReasonIndex} of ${loveReasons.length} reasons revealed`;
    document.getElementById('progress').textContent = progressText;
}

function showFinalMessage() {
    document.getElementById('jar').style.display = 'none';
    document.getElementById('progress').style.display = 'none';
    document.getElementById('final-message').style.display = 'block';
}

// Screen transitions
function switchScreen(fromScreen, toScreen) {
    const from = document.getElementById(fromScreen);
    const to = document.getElementById(toScreen);
    
    from.style.opacity = '0';
    setTimeout(() => {
        from.classList.remove('active');
        to.classList.add('active');
        setTimeout(() => {
            to.style.opacity = '1';
        }, 50);
    }, 500);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Animate name typing effect
    animateNameTyping();
    
    // Create initial hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(createHeart, i * 300);
    }
    
    // Secret admin mode: Press Ctrl + Shift + A to show admin controls
    let adminMode = false;
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
            e.preventDefault();
            adminMode = !adminMode;
            const adminControls = document.getElementById('admin-controls');
            if (adminMode) {
                adminControls.classList.add('show');
                // Announce to screen readers
                const announcement = document.createElement('div');
                announcement.setAttribute('role', 'status');
                announcement.setAttribute('aria-live', 'polite');
                announcement.className = 'visually-hidden';
                announcement.textContent = 'Admin controls are now ' + (adminMode ? 'visible' : 'hidden');
                document.body.appendChild(announcement);
                setTimeout(() => announcement.remove(), 1000);
            } else {
                adminControls.classList.remove('show');
            }
        }
    });
    
    // Prevent accidental tab close
    window.addEventListener('beforeunload', function(e) {
        const currentScreen = document.querySelector('.screen.active');
        if (currentScreen && currentScreen.id !== 'initial-screen') {
            e.preventDefault();
            e.returnValue = '';
            return '';
        }
    });
});

// Animate name with typing effect
function animateNameTyping() {
    const nameElement = document.getElementById('name-text');
    const name = 'Yashvi';
    nameElement.textContent = '';
    
    let index = 0;
    const typingInterval = setInterval(() => {
        if (index < name.length) {
            nameElement.textContent += name[index];
            index++;
            
            // Create a small heart burst on each letter
            if (index > 0) {
                createHeartBurst(nameElement);
            }
        } else {
            clearInterval(typingInterval);
        }
    }, 150);
}

// Create heart burst effect for name typing
function createHeartBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const heart = document.createElement('div');
    heart.textContent = ['💕', '💖', '💗'][Math.floor(Math.random() * 3)];
    heart.style.position = 'fixed';
    heart.style.left = centerX + 'px';
    heart.style.top = centerY + 'px';
    heart.style.fontSize = '20px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.animation = 'burst-up 1s ease-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 1000);
}

// Add burst animation to CSS if not already present
if (!document.getElementById('burst-animation-style')) {
    const style = document.createElement('style');
    style.id = 'burst-animation-style';
    style.textContent = `
        @keyframes burst-up {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-50px) scale(0.5);
            }
        }
    `;
    document.head.appendChild(style);
}

// View Comments Button
document.getElementById('view-comments-btn').addEventListener('click', function() {
    const feelings = localStorage.getItem('valentine-feelings');
    const modal = document.getElementById('comments-modal');
    const commentsDiv = document.getElementById('saved-comments');
    
    if (feelings) {
        commentsDiv.innerHTML = `<p>${feelings}</p>`;
    } else {
        commentsDiv.innerHTML = '<p class="no-comments">No comments yet... She hasn\'t shared her feelings.</p>';
    }
    
    modal.classList.add('show');
    
    // Focus on close button for accessibility
    document.getElementById('close-modal').focus();
});

// Close Modal - Click and Keyboard
document.getElementById('close-modal').addEventListener('click', closeModal);
document.getElementById('close-modal').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        closeModal();
    }
});

function closeModal() {
    document.getElementById('comments-modal').classList.remove('show');
}

// Close modal when clicking outside
document.getElementById('comments-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Escape key to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('comments-modal');
        if (modal.classList.contains('show')) {
            closeModal();
        }
    }
});

// Reset Button
document.getElementById('reset-btn').addEventListener('click', function() {
    const feelings = localStorage.getItem('valentine-feelings');
    const revealedCount = JSON.parse(localStorage.getItem('revealed-reasons') || '[]').length;
    const hasData = feelings || revealedCount > 0;
    
    if (!hasData) {
        alert('ℹ️ No data to reset!');
        return;
    }
    
    let message = '⚠️ Reset ALL data?\n\nThis will delete:\n';
    if (feelings) {
        const preview = feelings.length > 50 ? feelings.substring(0, 50) + '...' : feelings;
        message += `• Her feelings: "${preview}"\n`;
    }
    if (revealedCount > 0) {
        message += `• Jar progress (${revealedCount} reasons revealed)\n`;
    }
    message += '\nAre you ABSOLUTELY sure?';
    
    if (confirm(message)) {
        if (confirm('⚠️ Last chance! This cannot be undone!')) {
            localStorage.removeItem('valentine-feelings');
            localStorage.removeItem('revealed-reasons');
            alert('✅ All data has been cleared!\n\nRefreshing the page...');
            location.reload();
        }
    }
});
