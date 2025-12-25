// Discord invite links - UPDATE THESE WITH YOUR ACTUAL INVITE LINKS
const INVITE_LINKS = {
    'MAIN_INVITE_LINK': 'https://discord.gg/transfemme',
    'CHESS_INVITE_LINK': 'https://discord.gg/kGUU7aWS5P',
    'MINECRAFT_INVITE_LINK': 'https://discord.gg/YOUR_MINECRAFT_INVITE',
    'PHOTO_INVITE_LINK': 'https://discord.gg/btWWpmW59k',
    'DND_INVITE_LINK': 'https://discord.gg/NRRNeMW55b'
};

// Copy invite link to clipboard and show toast
function copyInvite(event, linkKey) {
    event.preventDefault();
    
    const inviteLink = INVITE_LINKS[linkKey];
    
    // Copy to clipboard
    navigator.clipboard.writeText(inviteLink).then(() => {
        showToast('Invite link copied to clipboard!');
        
        // Optional: Open Discord invite in new tab
        //setTimeout(() => {
        //    window.open(inviteLink, '_blank');
        //}, 500);
    }).catch(err => {
        console.error('Failed to copy:', err);
        showToast('Failed to copy link. Please try again.');
    });
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const messageEl = toast.querySelector('.toast-message');
    
    messageEl.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Enhanced particle effect on mouse move
const createParticle = (x, y) => {
    const particle = document.createElement('div');
    const colors = ['#ff1cf7', '#00f0ff', '#b026ff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: ${randomColor};
        border-radius: 50%;
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        box-shadow: 0 0 10px ${randomColor};
        animation: particleFade 1.5s ease-out forwards;
        z-index: 5;
    `;
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1500);
};

// Throttle mouse move events
let lastParticleTime = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastParticleTime > 80) {
        createParticle(e.clientX, e.clientY);
        lastParticleTime = now;
    }
});

// Add particle animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFade {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(
                ${Math.random() * 60 - 30}px,
                ${Math.random() * 60 - 30}px
            ) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add entrance animations for server cards
window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.server-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = `fadeInUp 0.6s ease forwards`;
            card.style.opacity = '0';
        }, index * 100);
    });
});

// Add fadeInUp animation
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(fadeInStyle);

// Add hover effects to server cards
document.querySelectorAll('.server-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Random glitch effect occasionally
setInterval(() => {
    const glitchElements = document.querySelectorAll('.glitch');
    if (Math.random() > 0.7) {
        glitchElements.forEach(el => {
            el.style.animation = 'none';
            setTimeout(() => {
                el.style.animation = 'glitch-skew 5s infinite linear alternate-reverse';
            }, 10);
        });
    }
}, 5000);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

console.log('%c🌸 Welcome to Girls Network Servers! 🌸', 'color: #ff1cf7; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with 💖 by the Girls Development Team', 'color: #00f0ff; font-size: 14px;');