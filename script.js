document.addEventListener('DOMContentLoaded', () => {
    // Get the audio element and volume slider
    const audioElement = document.getElementById('background-audio');
    const volumeSlider = document.getElementById('volume-slider');

    // Set the initial volume from the slider value
    audioElement.volume = volumeSlider.value;

    // Add an event listener to update the audio volume when the slider value changes
    volumeSlider.addEventListener('input', (event) => {
        audioElement.volume = event.target.value;
    });

    // Existing visit counter code
    const counterElement = document.getElementById('counter');
    let visitCount = localStorage.getItem('visitCount');
    if (visitCount === null) {
        visitCount = 0;
    }
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem('visitCount', visitCount);
    counterElement.textContent = visitCount;

    // Typewriter effect code
    const textElement = document.getElementById('typewriter-text');
    const text = "Welcome to my personal bio link page.";
    let index = 0;
    let isDeleting = false;
    const typingSpeed = 100; // Speed of typing in ms
    const deletingSpeed = 50; // Speed of deleting in ms
    const pauseDuration = 1000; // Pause before retyping

    function type() {
        if (index <= text.length) {
            textElement.textContent = text.slice(0, index) + '|';
            index++;
            setTimeout(type, isDeleting ? deletingSpeed / 2 : typingSpeed);
        } else {
            setTimeout(() => {
                isDeleting = true;
                index--;
                type();
            }, pauseDuration);
        }
    }

    function deleteText() {
        if (index >= 0) {
            textElement.textContent = text.slice(0, index) + '|';
            index--;
            setTimeout(deleteText, deletingSpeed);
        } else {
            isDeleting = false;
            setTimeout(type, pauseDuration);
        }
    }

    function startTypingEffect() {
        if (isDeleting) {
            deleteText();
        } else {
            type();
        }
    }

    startTypingEffect();

    // Chart.js Dstat graph code
    const ctx = document.getElementById('dstatGraph').getContext('2d');

    const dstatGraph = new Chart(ctx, {
        type: 'line', // Define the type of chart
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // Sample data for the x-axis
            datasets: [{
                label: 'CPU Usage',
                data: [65, 59, 80, 81, 56, 55, 40], // Sample data for the y-axis
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false
            }, {
                label: 'Memory Usage',
                data: [28, 48, 40, 19, 86, 27, 90], // Sample data for the y-axis
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Month'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Usage (%)'
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    });
});
