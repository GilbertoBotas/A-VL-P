const welcomeMessage = document.querySelector('.welcome-message');
const startButton = document.querySelector('.start-button');
const giftContainer = document.querySelector('.gift-container');
const giftBox = document.querySelector('.gift-box');
const gallery = document.querySelector('.gallery');
const floatingHeartsContainer = document.querySelector('.floating-hearts');
const musicToggle = document.querySelector('.music-toggle');
let isOpen = false;
let isPlaying = false;

// Create audio element
const bgMusic = new Audio('assets/audio/background-music.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.3; // Reduce volume to background music level

// Event listener for start button
startButton.addEventListener('click', () => {
    welcomeMessage.classList.add('hide');

    // Play music when user interacts
    bgMusic.play();
    isPlaying = true;
    musicToggle.innerHTML = '<i class="fas fa-pause"></i>';

    setTimeout(() => {
        giftContainer.classList.add('show');
        createHeartBurst();
    }, 500);
});

// Event listener for gift box
giftBox.addEventListener('click', () => {
    if (!isOpen) {
        giftBox.classList.add('open');
        setTimeout(() => {
            gallery.classList.add('show');
            createHeartBurst();
            playConfetti();
        }, 1000);
        isOpen = true;
    }
});

// Music toggle
musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    } else {
        bgMusic.play();
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
});

// function to create heart
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');

    // Random position
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '100vh';

    // Random size
    const size = Math.random() * 15 + 10;
    heart.style.width = size + 'px';
    heart.style.height = size + 'px';

    // Random animation duration
    const duration = Math.random() * 3 + 2;
    heart.style.animation = `
        heartBeat ${duration}s infinite,
        float ${duration * 2}s linear
    `;

    // Random rotation
    heart.style.transform = `rotate(${Math.random() * 360}deg)`;

    floatingHeartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, duration * 2000);
}

// function for burst effect
function createHeartBurst() {
    for (let i = 0; i < 30; i++) {
        setTimeout(createHeart, i * 100);
    }
}

// Create floating hearts periodicly
setInterval(() => {
    if (Math.random() > 0.7) {
        createHeart();
    }
}, 500);

// Fungsi untuk efek confetti
function playConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ffffff', '#ff4081'];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-20px';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.opacity = Math.random();
        confetti.style.transition = 'all 1s ease';

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.style.top = '100vh';
            confetti.style.transform = `rotate(${Math.random() * 360 + 720}deg)`;
        }, 50);

        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Animasi untuk floating
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: rotate(45deg) translateY(0) translateX(0);
            opacity: 1;
        }
        100% {
            transform: rotate(45deg) translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Preload images
const images = document.querySelectorAll('img');
images.forEach(img => {
    const temp = new Image();
    temp.src = img.src;
});

// Add touch events for mobile
let touchStartY;
gallery.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

gallery.addEventListener('touchmove', (e) => {
    const touchY = e.touches[0].clientY;
    const diff = touchStartY - touchY;

    if (Math.abs(diff) > 5) {
        e.preventDefault();
        gallery.scrollTop += diff;
        touchStartY = touchY;
    }
});

// Add gallery item hover effect
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        createHeartBurst();
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

const imageContent = {
    'romantic-moment-1': {
        title: 'Nosso Primeiro Encontro',
        description: 'O momento em que nossos corações dançaram juntos pela primeira vez, criando memórias que durariam a vida toda.',
        quote: '"Toda história de amor é linda, mas a nossa é a minha favorita."'
    },
    'romantic-moment-2': {
        title: 'Lindo Pôr do Sol Juntos',
        description: 'Observando o sol pintar o céu em tons de amor, enquanto nossos corações se aproximavam.',
        quote: '"A melhor coisa para se segurar na vida é um ao outro."'
    },
    'romantic-moment-3': {
        title: 'Noite Perfeita',
        description: 'Sob a luz do luar, cada momento com você torna-se mágico e inesquecível.',
        quote: '"Em seus braços é onde eu pertenço."'
    },
    'romantic-moment-4': {
        title: 'Doces Memórias',
        description: 'Cada sorriso, cada risada, cada momento terno constrói nossa bela história juntos.',
        quote: '"Você é o meu hoje e todos os meus amanhãs."'
    },
    'romantic-moment-5': {
        title: 'Momentos Preciosos',
        description: 'Cada segundo ao seu lado é um tesouro que guardo com todo carinho.',
        quote: '"Onde quer que você esteja, é o meu lugar favorito."'
    },
    'romantic-moment-6': {
        title: 'Felicidade Pura',
        description: 'Ver você sorrir é o que dá sentido aos meus dias e alegria à minha alma.',
        quote: '"Meu coração é e sempre será seu."'
    },

};

// Add resize handler
window.addEventListener('resize', () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    if (window.innerWidth < 768) {
        gallery.style.height = 'calc(var(--vh, 1vh) * 75)';
    } else {
        gallery.style.height = 'calc(var(--vh, 1vh) * 85)';
    }
});

// Update gallery item click listeners
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        const imageId = `romantic-moment-${index + 1}`;
        const content = imageContent[imageId];

        modalImage.src = item.querySelector('img').src;
        modalImage.alt = item.querySelector('img').alt;
        modalTitle.textContent = content.title;
        modalDescription.textContent = content.description;
        modalQuote.textContent = content.quote;

        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);

        createHeartBurst();
    });
});

// Close modal events
closeModal.addEventListener('click', closeModalFunction);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunction();
    }
});

function closeModalFunction() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Close modal with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModalFunction();
    }
});