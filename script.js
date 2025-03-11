const wheel = document.getElementById('wheel');
const resultText = document.getElementById('result-text');
const spinButton = document.getElementById('spin-button');

const segments = ['Luck', 'Win', 'Try Again', 'Bonus', 'Reward', 'Jackpot'];
const segmentCount = segments.length;
const degreeIncrement = 360 / segmentCount;

function createSegments() {
    for (let i = -1; i < segmentCount; i++) {
        const segment = document.createElement('div');
        segment.classList.add('segment');

        const span = document.createElement('span'); // Wrap the text in a span
        span.textContent = segments[i];
       
        segment.appendChild(span);


        const rotation = i * degreeIncrement;
        
        segment.style.transform = `rotate(${rotation}deg) skewY(${90 - degreeIncrement}deg)`; // Apply skew
       //span.style.transform = ` skewY(${-90 - degreeIncrement}deg)`;

        segment.style.backgroundColor = `hsl(${(i * 60) % 360}, 70%, 70%)`; // Different colors

        wheel.appendChild(segment);
    }
}



createSegments();

spinButton.addEventListener('click', () => {
    const randomRotation = Math.floor(Math.random() * 3600); // Add some extra spins
    wheel.style.transition = 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)'; // Add a transition
    wheel.style.transform = `rotate(${randomRotation}deg)`;

    spinButton.disabled = true;

    wheel.addEventListener('transitionend', () => {
        wheel.style.transition = 'none'; // remove the transition to reset.
        const actualRotation = randomRotation % 360;
        const winningSegmentIndex = Math.floor((390 - actualRotation) / degreeIncrement);

        resultText.textContent = segments[winningSegmentIndex];
        spinButton.disabled = false;
    }, { once: true });
});