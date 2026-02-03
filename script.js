// Love Letter Content (customizable)
const letterLines = [
    "My Dearest Yashvi,",
    "",
    "As I sit here writing this, I'm thinking about you just like I do every single day. I cannot explain how much you mean to me, but I'll try my best with these words.",
    "",
    "From that special day on January 18th, 2021, when I asked you to be mine, my life changed forever. You said yes, and in that moment, I became the luckiest person alive. You are my high school love, my first true love, and the love I want to keep in my life forever.",
    "",
    "These past five years of long distance haven't been easy. Different time zones, countless missed hugs and kisses, saying goodbye on calls when I just want to hold you close it's been tough for both of us. But here we are, stronger than ever. And that strength? It comes from YOU.",
    "",
    "Your beautiful smile that makes my day amazing even if it's boring or too hectic, the way you talk to me, your lovely voice that gives me peace these the things I live for. You are the most wonderful and beautiful person, and loving you feels like coming home to where I belong.",
    "",
    "I am so proud and lucky that you are my Girlfriend. You are my comfort, my strength, my safe place, and my future. When I miss you, I stare at your pictures and our pictures and smile. You are the only one who I wouldn't mind losing sleep for, the one I can never get tired of talking to, the one who crosses my mind constantly throughout the day, the one who can make me smile without even trying.",
    "",
    "You have never given up on me, on us, on our love even when things got hard, even when the distance felt unbearable. Your patience, understanding, and loyalty are rare and beautiful. You held on when situations got tough, and you made me understand that our love for each other is permanent.",
    "",
    "Thank you for believing in me even when I doubt myself, for being exactly who you are, and for choosing to share your heart with me every single day. I promise to keep choosing you, just like you have always chosen me.",
    "",
    "This Valentine's Day, I want you to know: You are cherished, you are adored, and you are endlessly loved.",
    "",
    "Happy Valentine's Day, my beautiful girl. I love you to the moon and back, I love you 3000, I love you so much, I love you infinitely.",
    "",
    "Forever yours,",
    "Parth 💕"
];

// Love Reasons (customizable)
const loveReasons = [
    "Your beautiful smile that lights up my entire world, even across oceans and time zones",
    "The way you've never given up on us, holding on through five years of long distance",
    "How you make me feel like the most special person alive, just by being yourself",
    "Your neverending talks make me feel important and loved, no matter how busy life gets",
    "The way you gets annoyed when I tease you, it's the cutest thing ever",
    "Your incredible strength and resilience - you turn tough goodbyes into hope for tomorrow",
    "How talking to you never gets boring, no matter how long we've been together",
    "The way you believe in our relationship even when situations get hard",
    "Your patience and understanding that make this long distance bearable",
    "How you're always in my mind constantly throughout the day, my safe place, my home and my future"
];

// Quiz functionality
let currentQuestion = 1;
const totalQuestions = 3;
const quizAnswers = {};

// Question 1: Multiple Choice
document.querySelectorAll('.quiz-option').forEach(option => {
    option.addEventListener('click', function() {
        // Disable all options
        const allOptions = document.querySelectorAll('.quiz-option');
        allOptions.forEach(opt => {
            opt.style.pointerEvents = 'none';
        });

        const isCorrect = this.getAttribute('data-answer') === 'correct';
        const feedback = document.getElementById('feedback-1');

        if (isCorrect) {
            this.classList.add('correct');
            feedback.textContent = '✨ Perfect! You remember our special day! ✨';
            feedback.classList.add('correct', 'show');
            
            // Save answer
            quizAnswers.proposalDate = 'January 18, 2021';
            
            // Move to next question after delay
            setTimeout(() => {
                nextQuestion();
            }, 2000);
        } else {
            this.classList.add('wrong');
            feedback.textContent = '💕 Not quite, but I love that you\'re here with me!';
            feedback.classList.add('wrong', 'show');
            
            // Show correct answer after a moment
            setTimeout(() => {
                document.querySelector('[data-answer="correct"]').classList.add('correct');
                setTimeout(() => {
                    quizAnswers.proposalDate = 'January 18, 2021';
                    nextQuestion();
                }, 2000);
            }, 1500);
        }
    });
});

// Question 2: Best Memory
const answer2Textarea = document.getElementById('answer-2');
const charCount2 = document.getElementById('char-count-2');

answer2Textarea.addEventListener('input', function() {
    const currentLength = this.value.length;
    charCount2.textContent = currentLength;
    
    if (currentLength > 450) {
        charCount2.style.color = '#ff6b6b';
    } else if (currentLength > 350) {
        charCount2.style.color = '#ffd93d';
    } else {
        charCount2.style.color = '#666';
    }
});

document.getElementById('form-2').addEventListener('submit', function(e) {
    e.preventDefault();
    const answer = answer2Textarea.value.trim();
    
    if (answer) {
        quizAnswers.bestMemory = answer;
        localStorage.setItem('quiz-best-memory', answer);
        nextQuestion();
    }
});

// Question 3: Dream Destination
const answer3Textarea = document.getElementById('answer-3');
const charCount3 = document.getElementById('char-count-3');

answer3Textarea.addEventListener('input', function() {
    const currentLength = this.value.length;
    charCount3.textContent = currentLength;
    
    if (currentLength > 450) {
        charCount3.style.color = '#ff6b6b';
    } else if (currentLength > 350) {
        charCount3.style.color = '#ffd93d';
    } else {
        charCount3.style.color = '#666';
    }
});

document.getElementById('form-3').addEventListener('submit', function(e) {
    e.preventDefault();
    const answer = answer3Textarea.value.trim();
    
    if (answer) {
        quizAnswers.dreamDestination = answer;
        localStorage.setItem('quiz-dream-destination', answer);
        
        // Save all quiz data
        localStorage.setItem('quiz-completed', 'true');
        localStorage.setItem('quiz-all-answers', JSON.stringify(quizAnswers));
        
        // Move to valentine question with celebration
        celebrateQuizCompletion();
    }
});

function nextQuestion() {
    const currentQ = document.getElementById(`question-${currentQuestion}`);
    currentQuestion++;
    
    if (currentQuestion <= totalQuestions) {
        const nextQ = document.getElementById(`question-${currentQuestion}`);
        
        // Update progress bar
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        progressFill.style.width = `${(currentQuestion / totalQuestions) * 100}%`;
        progressText.textContent = `Question ${currentQuestion} of ${totalQuestions}`;
        
        // Animate transition
        currentQ.classList.remove('active');
        setTimeout(() => {
            nextQ.classList.add('active');
        }, 300);
    }
}

function celebrateQuizCompletion() {
    // Create celebration confetti
    createConfetti();
    
    setTimeout(() => {
        switchScreen('quiz-screen', 'initial-screen');
    }, 1500);
}

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
        switchScreen('initial-screen', 'letter-screen');
        openLetterAnimation();
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

// Open Love Letter Animation
function openLetterAnimation() {
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
            // Show final message
            document.getElementById('jar').style.display = 'none';
            document.getElementById('progress').style.display = 'none';
            document.getElementById('final-message').style.display = 'block';
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
        setTimeout(() => {
            document.getElementById('jar').style.display = 'none';
            document.getElementById('progress').style.display = 'none';
            document.getElementById('final-message').style.display = 'block';
            
            // Auto-download responses when she completes the jar
            setTimeout(() => {
                const hasResponses = localStorage.getItem('quiz-best-memory') || 
                                   localStorage.getItem('quiz-dream-destination') || 
                                   localStorage.getItem('valentine-feelings');
                
                if (hasResponses && !localStorage.getItem('auto-downloaded')) {
                    if (confirm('🎉 Congratulations on completing the journey together!\n\n💾 Would you like to download all of Yashvi\'s responses as a keepsake?')) {
                        downloadResponsesFile();
                        localStorage.setItem('auto-downloaded', 'true');
                    }
                }
            }, 2000);
        }, 500);
    } else {
        // Return focus to jar
        jarElement.focus();
    }
});

function updateProgress() {
    const progressText = `${currentReasonIndex} of ${loveReasons.length} reasons revealed`;
    document.getElementById('progress').textContent = progressText;
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
    const bestMemory = localStorage.getItem('quiz-best-memory');
    const dreamDestination = localStorage.getItem('quiz-dream-destination');
    const modal = document.getElementById('comments-modal');
    const commentsDiv = document.getElementById('saved-comments');
    
    let content = '';
    
    if (bestMemory || dreamDestination || feelings) {
        if (bestMemory) {
            content += `<h3 style="color: #f5576c; margin-top: 0;">Best Memory Together:</h3><p>${bestMemory}</p><br>`;
        }
        if (dreamDestination) {
            content += `<h3 style="color: #f5576c;">Dream Destination:</h3><p>${dreamDestination}</p><br>`;
        }
        if (feelings) {
            content += `<h3 style="color: #f5576c;">Her Feelings:</h3><p>${feelings}</p>`;
        }
        commentsDiv.innerHTML = content;
    } else {
        commentsDiv.innerHTML = '<p class="no-comments">No responses yet... She hasn\'t shared her thoughts.</p>';
    }
    
    modal.classList.add('show');
    
    // Focus on close button for accessibility
    document.getElementById('close-modal').focus();
});

// Download all responses as text file
function downloadResponsesFile() {
    const bestMemory = localStorage.getItem('quiz-best-memory');
    const dreamDestination = localStorage.getItem('quiz-dream-destination');
    const feelings = localStorage.getItem('valentine-feelings');
    const revealedReasons = JSON.parse(localStorage.getItem('revealed-reasons') || '[]');
    
    if (!bestMemory && !dreamDestination && !feelings) {
        alert('ℹ️ No responses to download yet!\n\nYashvi hasn\'t filled out any responses.');
        return;
    }
    
    // Get current date and time
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    const timeStr = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    // Build the text content
    let content = '';
    content += '═══════════════════════════════════════════════════════\n';
    content += '          YASHVI\'S RESPONSES - VALENTINE\'S DAY 2026\n';
    content += '═══════════════════════════════════════════════════════\n\n';
    content += `Downloaded: ${dateStr} at ${timeStr}\n\n`;
    content += '───────────────────────────────────────────────────────\n\n';
    
    // Quiz Question 1
    content += '📅 QUESTION 1: When did I propose to you?\n';
    content += '   Answer: January 18, 2021\n\n';
    content += '───────────────────────────────────────────────────────\n\n';
    
    // Quiz Question 2
    if (bestMemory) {
        content += '💭 QUESTION 2: What is your best memory of me?\n\n';
        content += wrapText(bestMemory, 60);
        content += '\n\n───────────────────────────────────────────────────────\n\n';
    }
    
    // Quiz Question 3
    if (dreamDestination) {
        content += '🌍 QUESTION 3: Where would you like to go with me?\n\n';
        content += wrapText(dreamDestination, 60);
        content += '\n\n───────────────────────────────────────────────────────\n\n';
    }
    
    // Feelings
    if (feelings) {
        content += '💕 HER FEELINGS FOR ME:\n\n';
        content += wrapText(feelings, 60);
        content += '\n\n───────────────────────────────────────────────────────\n\n';
    }
    
    // Jar progress
    if (revealedReasons.length > 0) {
        content += `🫙 JAR OF LOVE PROGRESS:\n`;
        content += `   Revealed ${revealedReasons.length} out of 10 reasons\n\n`;
        content += '───────────────────────────────────────────────────────\n\n';
    }
    
    content += '\n';
    content += '═══════════════════════════════════════════════════════\n';
    content += '          These precious words will be treasured forever\n';
    content += '                        With all my love ❤️\n';
    content += '═══════════════════════════════════════════════════════\n';
    
    // Create and download the file
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    // Format filename with date
    const filename = `Yashvi_Responses_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}.txt`;
    link.download = filename;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    // Show success message
    alert(`✅ File downloaded successfully!\n\nFilename: ${filename}\n\nCheck your downloads folder.`);
}

// Helper function to wrap text for better readability
function wrapText(text, maxLength) {
    const words = text.split(' ');
    let lines = [];
    let currentLine = '   '; // Indent
    
    words.forEach(word => {
        if ((currentLine + word).length > maxLength) {
            lines.push(currentLine);
            currentLine = '   ' + word + ' ';
        } else {
            currentLine += word + ' ';
        }
    });
    
    if (currentLine.trim()) {
        lines.push(currentLine);
    }
    
    return lines.join('\n');
}

// Auto-download when jar is completed
function showFinalMessage() {
    document.getElementById('jar').style.display = 'none';
    document.getElementById('progress').style.display = 'none';
    document.getElementById('final-message').style.display = 'block';
    
    // Auto-download responses when she completes the jar
    setTimeout(() => {
        const hasResponses = localStorage.getItem('quiz-best-memory') || 
                           localStorage.getItem('quiz-dream-destination') || 
                           localStorage.getItem('valentine-feelings');
        
        if (hasResponses && !localStorage.getItem('auto-downloaded')) {
            if (confirm('🎉 Congratulations on completing the journey together!\n\n💾 Would you like to download all of Yashvi\'s responses as a keepsake?')) {
                downloadResponsesFile();
                localStorage.setItem('auto-downloaded', 'true');
            }
        }
    }, 2000);
}

// Download button click handler
document.getElementById('download-btn').addEventListener('click', downloadResponsesFile);

// Restart jar button
document.getElementById('restart-jar-btn').addEventListener('click', function() {
    // Reset jar state
    currentReasonIndex = 0;
    revealedReasons = [];
    localStorage.removeItem('revealed-reasons');
    localStorage.removeItem('auto-downloaded');
    
    // Show jar again
    document.getElementById('jar').style.display = 'block';
    document.getElementById('progress').style.display = 'block';
    document.getElementById('final-message').style.display = 'none';
    
    // Update progress
    updateProgress();
    
    // Show success message
    alert('🔄 Jar reset! You can now discover all the reasons again! 💕');
});

// Refresh/Start Over button
document.getElementById('refresh-btn').addEventListener('click', function() {
    const currentScreen = document.querySelector('.screen.active');
    const screenId = currentScreen ? currentScreen.id : '';
    
    // If on quiz screen, just refresh
    if (screenId === 'quiz-screen') {
        if (confirm('🔄 Start the quiz over from the beginning?\n\nThis will refresh the page.')) {
            location.reload();
        }
        return;
    }
    
    // If they have data, warn them
    const hasData = localStorage.getItem('quiz-best-memory') || 
                   localStorage.getItem('quiz-dream-destination') || 
                   localStorage.getItem('valentine-feelings') ||
                   localStorage.getItem('revealed-reasons');
    
    if (hasData) {
        if (confirm('🔄 Start over from the very beginning?\n\n⚠️ This will keep your saved responses but restart the experience.\n\nContinue?')) {
            location.reload();
        }
    } else {
        if (confirm('🔄 Restart the experience?')) {
            location.reload();
        }
    }
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
    const bestMemory = localStorage.getItem('quiz-best-memory');
    const dreamDestination = localStorage.getItem('quiz-dream-destination');
    const revealedCount = JSON.parse(localStorage.getItem('revealed-reasons') || '[]').length;
    const hasData = feelings || bestMemory || dreamDestination || revealedCount > 0;
    
    if (!hasData) {
        alert('ℹ️ No data to reset!');
        return;
    }
    
    let message = '⚠️ Reset ALL data?\n\nThis will delete:\n';
    if (bestMemory) {
        message += `• Quiz answer: Best memory\n`;
    }
    if (dreamDestination) {
        message += `• Quiz answer: Dream destination\n`;
    }
    if (feelings) {
        const preview = feelings.length > 50 ? feelings.substring(0, 50) + '...' : feelings;
        message += `• Her feelings: "${preview}"\n`;
    }
    if (revealedCount > 0) {
        message += `• Jar progress (${revealedCount} reasons revealed)\n`;
    }
    message += '\n⚠️ Make sure you\'ve downloaded her responses first!\n';
    message += '\nAre you ABSOLUTELY sure?';
    
    if (confirm(message)) {
        if (confirm('⚠️ Last chance! This cannot be undone!')) {
            localStorage.removeItem('valentine-feelings');
            localStorage.removeItem('revealed-reasons');
            localStorage.removeItem('quiz-best-memory');
            localStorage.removeItem('quiz-dream-destination');
            localStorage.removeItem('quiz-completed');
            localStorage.removeItem('quiz-all-answers');
            localStorage.removeItem('auto-downloaded');
            alert('✅ All data has been cleared!\n\nRefreshing the page...');
            location.reload();
        }
    }
});