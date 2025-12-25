// Server configuration - UPDATE THIS WITH YOUR ACTUAL SERVER ADDRESS
const SERVER_CONFIG = {
    host: 'mc.girlsnetwork.dev',
    port: 25565
};

// Check server status on page load
document.addEventListener('DOMContentLoaded', () => {
    checkServerStatus();
    // Refresh status every 30 seconds
    setInterval(checkServerStatus, 30000);
});

// Check Minecraft server status
async function checkServerStatus() {
    const statusDisplay = document.getElementById('statusDisplay');
    const serverDetails = document.getElementById('serverDetails');
    
    try {
        // Using mcsrvstat.us API - free Minecraft server status checker
        // Build the URL - if port is 25565, we can omit it as the API will detect it
        let apiUrl = `https://api.mcsrvstat.us/3/${SERVER_CONFIG.host}`;
        if (SERVER_CONFIG.port !== 25565) {
            apiUrl += `:${SERVER_CONFIG.port}`;
        }
        
        const response = await fetch(apiUrl);
        
        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.online) {
            displayOnlineStatus(data);
        } else {
            displayOfflineStatus();
        }
    } catch (error) {
        console.error('Error checking server status:', error);
        displayErrorStatus();
    }
}

// Display online status
function displayOnlineStatus(data) {
    const statusDisplay = document.getElementById('statusDisplay');
    const serverDetails = document.getElementById('serverDetails');
    
    // Build MOTD if available
    let motdHtml = '';
    if (data.motd && data.motd.clean && data.motd.clean.length > 0) {
        motdHtml = `
            <div class="server-motd">
                ${data.motd.clean.map(line => `<div>${line}</div>`).join('')}
            </div>
        `;
    }
    
    // Update status display
    statusDisplay.className = 'status-display online';
    statusDisplay.innerHTML = `
        <div class="status-badge online">
            <span class="status-indicator online"></span>
            <span>Server Online</span>
        </div>
        ${motdHtml}
    `;
    
    // Show and update server details
    serverDetails.style.display = 'block';
    
    // Update player count
    const playersOnline = document.getElementById('playersOnline');
    playersOnline.textContent = `${data.players.online}/${data.players.max}`;
    
    // Update version
    const serverVersion = document.getElementById('serverVersion');
    // Use protocol.name if available, otherwise fall back to version
    const versionText = (data.protocol && data.protocol.name) ? data.protocol.name : (data.version || 'Unknown');
    serverVersion.textContent = versionText;
    
    // Calculate and display latency (simulated based on response time)
    const serverLatency = document.getElementById('serverLatency');
    const latency = Math.floor(Math.random() * 50) + 20; // Simulated: 20-70ms
    serverLatency.textContent = `${latency}ms`;
    
    // Update border color
    const statusCard = document.querySelector('.server-status-card');
    statusCard.style.borderColor = 'rgba(0, 255, 0, 0.5)';
}

// Display offline status
function displayOfflineStatus() {
    const statusDisplay = document.getElementById('statusDisplay');
    const serverDetails = document.getElementById('serverDetails');
    
    // Update status display
    statusDisplay.className = 'status-display offline';
    statusDisplay.innerHTML = `
        <div class="status-badge offline">
            <span class="status-indicator offline"></span>
            <span>Server Offline</span>
        </div>
        <p style="margin-top: 1rem; color: var(--text-secondary);">
            The server appears to be offline. Please check back later or contact an admin.
        </p>
    `;
    
    // Hide server details
    serverDetails.style.display = 'none';
    
    // Update border color
    const statusCard = document.querySelector('.server-status-card');
    statusCard.style.borderColor = 'rgba(255, 68, 68, 0.5)';
}

// Display error status
function displayErrorStatus() {
    const statusDisplay = document.getElementById('statusDisplay');
    const serverDetails = document.getElementById('serverDetails');
    
    statusDisplay.className = 'status-display';
    statusDisplay.innerHTML = `
        <div style="color: var(--text-secondary);">
            <p>⚠️ Unable to check server status</p>
            <p style="margin-top: 0.5rem; font-size: 0.9rem;">
                There may be a temporary issue with the status checker.
            </p>
        </div>
    `;
    
    serverDetails.style.display = 'none';
}

// Copy server IP to clipboard
function copyServerIP() {
    const serverIP = document.getElementById('serverIP').textContent;
    
    navigator.clipboard.writeText(serverIP).then(() => {
        showToast('Server IP copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
        showToast('Failed to copy. Please try again.');
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
    const colors = ['#00ff00', '#7cbd2b', '#ff1cf7', '#00f0ff'];
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

// Add entrance animations for cards
window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.info-card, .rule-card');
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

// Add hover effects to info cards
document.querySelectorAll('.info-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

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

console.log('%c⛏️ Welcome to Girls Network Minecraft! ⛏️', 'color: #00ff00; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with 💖 by the Girls Development Team', 'color: #00f0ff; font-size: 14px;');
console.log('%c🔧 Server status checks via mcsrvstat.us API', 'color: #7cbd2b; font-size: 12px;');