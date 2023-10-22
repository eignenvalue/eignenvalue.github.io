document.addEventListener('DOMContentLoaded', function() {
    const ratingOptions = document.querySelectorAll('input[name="feedback"]');
    const submitButton = document.getElementById('submit');
    const graph = document.getElementById('rating-graph');
    const maxDataPoints = 7;
    const leafImage = document.getElementById('leafImage');
    const quoteDiv = document.getElementById('quote');
    const quoteText = document.querySelector('#quote p');
    const content = document.getElementById('content');

    // Get stored ratings or initialize an empty array
    const storedRatings = JSON.parse(localStorage.getItem('ratings')) || [];

    // Set up Chart.js data and options
    const chartData = {
        labels: ['Oldest','','','','','','Newest'],
        datasets: [{
            label: 'Last 7 Ratings',
            data: storedRatings.slice(-maxDataPoints),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 3
        }]
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 5
            }
        }
    };

    // Create a Chart.js chart
    const ratingChart = new Chart(graph, {
        type: 'line',
        data: chartData,
        options: chartOptions
    });

    // Handle the submit button click
    submitButton.addEventListener('click', function() {
        const selectedOption = document.querySelector('input[name="feedback"]:checked');
        if (selectedOption) {
            const rating = selectedOption.value;

            // Add the new rating to the array and store it in local storage
            storedRatings.push(parseFloat(rating));
            if (storedRatings.length > maxDataPoints) {
                storedRatings.shift(); // Remove the oldest rating if there are more than 5
            }
            localStorage.setItem('ratings', JSON.stringify(storedRatings));

            // Update the chart data
            ratingChart.data.datasets[0].data = storedRatings;
            ratingChart.update();
        }
        const rating = selectedOption.value;
        leafImage.style.transform = 'rotateY(180deg)';
        content.style.display='none';
        const quotes = {
            1: "I'm sorry to hear that. Tmr is a new day!",
            2: "It's okay. Things will get better.",
            3: "Not bad! Keep your spirits up!",
            4: "Great! You're doing well.",
            5: "Fantastic! Keep up the good work!"
        };
        // Display the quote after a delay (you can change the timing as needed)
        setTimeout(function() {
            quoteText.textContent = '"'+quotes[rating]+'"';
            quoteDiv.classList.remove('hidden');
        }, 0);
    });
});
