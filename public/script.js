const wheel = document.getElementById('wheel');
const resultText = document.getElementById('result-text');
const spinButton = document.getElementById('spin-button');
const confettiContainer = document.getElementById('confetti-container');
const spinSound = document.getElementById('spin-sound');
const winSound = document.getElementById('win-sound');
const pointer = document.getElementById('pointer'); // Get the pointer element
const holding = document.getElementById('holding'); // Get the pointer element
const player = document.getElementById('player'); // Get the pointer element

const segments = ['+30 job adverts free ', '25% discount code', '15% discount code',
    '+1 months access free', '+2 weeks access free ', '+15 job adverts free', '7-day free trial with 50 downloads'];
const segmentCount = segments.length;
const degreeIncrement = 360 / segmentCount;

const segmentColors = ['#006cd6', '#71bf44', '#005da4', '#ffa500', '#024594', '#4488d5', '#e01a22']; // Array of colors

function createSegments() {
    for (let i = 0; i < segmentCount; i++) {
        const segment = document.createElement('div');
        segment.classList.add('segment');

        const span = document.createElement('span'); // Wrap the text in a span
        span.textContent = segments[i];
       
        segment.appendChild(span);

        resultText.style.display = 'none';
        const rotation = i * degreeIncrement;
        
        segment.style.transform = `rotate(${rotation}deg) skewY(${90 - degreeIncrement}deg)`; // Apply skew
       //span.style.transform = ` skewY(${-90 - degreeIncrement}deg)`;

       segment.style.backgroundColor = segmentColors[i % segmentColors.length]; // Get color from array

        wheel.appendChild(segment);
    }
}



createSegments();

// Slow rotation before click
let slowRotation = 0;
let slowRotateAnimationId; // Store the animation frame ID

function slowRotate() {
    slowRotation += 0.1;
    wheel.style.transform = `rotate(${slowRotation}deg)`;
    slowRotateAnimationId = requestAnimationFrame(slowRotate);
}

slowRotate();

function createConfetti() {
    const confettiCount = 100; // Adjust the number of confetti pieces
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color
        confetti.style.animationDelay = `${Math.random() * 1}s`; // Random delay
        confettiContainer.appendChild(confetti);
    }
}


player.addEventListener('click', () => {
    player.style.display = 'none';
})





holding.addEventListener('click', () => {
    holding.style.display = 'none';
    wheel.style.transition = 'none';
    cancelAnimationFrame(slowRotateAnimationId); // Stop the slow rotation
})

wheel.addEventListener('click', () => {
    const randomRotation = Math.floor(Math.random() * 3600); // Add some extra spins
    wheel.style.transition = 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)'; // Add a transition
    wheel.style.transform = `rotate(${randomRotation}deg)`;
    resultText.style.display = 'none';
   
    spinSound.currentTime = 0; // Reset sound if already playing
    spinSound.play();

    wheel.addEventListener('transitionend', () => {
        wheel.style.transition = 'none'; // remove the transition to reset.
        const actualRotation = randomRotation % 360;
        const winningSegmentIndex = Math.floor((370 - actualRotation) / degreeIncrement);
        resultText.style.display = 'block';
        resultText.textContent = segments[winningSegmentIndex];

        spinSound.pause();
        spinSound.currentTime = 0;
        winSound.play();

        createConfetti(); // Create confetti
        setTimeout(() => {
            resulttext.style.display = 'none';
            confettiContainer.innerHTML = ''; // Remove confetti
            winSound.pause();
            winSound.currentTime = 0;
        }, 3000);
        
    }, { once: true });
});