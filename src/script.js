// Add particle effect on mouse move
const createParticle = (x, y) => {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        animation: particleFade 1s ease-out forwards;
        z-index: 0;
    `;
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1000);
};

// Throttle mouse move events
let lastParticleTime = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastParticleTime > 100) {
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
                ${Math.random() * 40 - 20}px,
                ${Math.random() * 40 - 20}px
            ) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Dynamic title animation
const title = document.querySelector('.title');
const originalText = title.textContent;
let charIndex = 0;

const typeWriter = () => {
    if (charIndex === 0) {
        title.textContent = '';
    }
    
    if (charIndex < originalText.length) {
        title.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 150);
    }
};

// Start typewriter effect after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// Add subtle rotation to loader on hover
const loader = document.querySelector('.loader');
loader.addEventListener('mouseenter', () => {
    loader.style.animationDuration = '0.5s';
});

loader.addEventListener('mouseleave', () => {
    loader.style.animationDuration = '1s';
});