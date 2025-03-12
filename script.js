const wheel = document.getElementById('wheel');
const resultText = document.getElementById('result-text');
const spinButton = document.getElementById('spin-button');
const confettiContainer = document.getElementById('confetti-container');
const spinSound = document.getElementById('spin-sound');
const winSound = document.getElementById('win-sound');

const segments = ['15% discount code', '1-month free', '500 eshot sends free', '10 job adverts free', '25% discount code', '2 weeks free'];
const segmentCount = segments.length;
const degreeIncrement = 360 / segmentCount;

const segmentColors = ['#006cd6', '#71bf44', '#e01a22', '#ffa500', '#024594', '#4488d5']; // Array of colors

function createSegments() {
    for (let i = -1; i < segmentCount; i++) {
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
        const winningSegmentIndex = Math.floor((390 - actualRotation) / degreeIncrement);
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