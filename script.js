const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeText = document.getElementById('theme-text');
let currentTheme = 'dark';

themeToggle.addEventListener('click', () => {
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Dark Mode';
        currentTheme = 'light';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.textContent = '🌜';
        themeText.textContent = 'Light Mode';
        currentTheme = 'dark';
    }
    
});

function createRipple(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = 'ripple';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

const cards = document.querySelectorAll('.project-card, .skill-card');
cards.forEach(card => {
    card.addEventListener('mousedown', () => {
        card.style.transform = 'translateY(-2px)';
    });
    
    card.addEventListener('mouseup', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

const canvas = document.getElementById('canvas-background');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawStarryBackground();
}

window.addEventListener('resize', resizeCanvas);

function drawStarryBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const starCount = Math.floor(canvas.width * canvas.height / 800);
    for (let i = 0; i < starCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.5;
        const opacity = Math.random() * 0.8 + 0.2;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
    }
    
    const constellationCount = Math.floor(canvas.width / 200);
    for (let i = 0; i < constellationCount; i++) {
        drawConstellation();
    }
}

function drawConstellation() {
    const centerX = Math.random() * canvas.width;
    const centerY = Math.random() * canvas.height;
    const pointCount = Math.floor(Math.random() * 6) + 4;
    const points = [];
    
    for (let i = 0; i < pointCount; i++) {
        const distance = Math.random() * 100 + 20;
        const angle = Math.random() * Math.PI * 2;
        points.push({
            x: centerX + Math.cos(angle) * distance,
            y: centerY + Math.sin(angle) * distance
        });
    }
    
    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, Math.random() * 1.8 + 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`;
        ctx.fill();
    });
    
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    
    if (pointCount > 4) {
        ctx.moveTo(points[1].x, points[1].y);
        ctx.lineTo(points[3].x, points[3].y);
    }
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 0.5;
    ctx.stroke();
}

resizeCanvas();