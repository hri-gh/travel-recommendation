// Section Toggling
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Fetch JSON Data
async function fetchData() {
    try {
        const response = await fetch('travel_recommendation_api.json');
        const data = await response.json();
        console.log('Fetched Data:', data); // Log data to verify
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Search Recommendations
async function searchRecommendations() {
    const input = document.getElementById('searchInput').value.toLowerCase().trim();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (!input) {
        resultsDiv.innerHTML = '<p>Please enter a search term.</p>';
        return;
    }

    const data = await fetchData();
    if (!data) {
        resultsDiv.innerHTML = '<p>Error loading recommendations.</p>';
        return;
    }

    let results = [];

    // Search logic for keywords: beach, temple, country
    if (input.includes('beach')) {
        results = data.beaches;
    } else if (input.includes('temple')) {
        results = data.temples;
    } else {
        // Search for countries or cities
        data.countries.forEach(country => {
            if (country.name.toLowerCase().includes(input)) {
                results.push(...country.cities);
            } else {
                country.cities.forEach(city => {
                    if (city.name.toLowerCase().includes(input)) {
                        results.push(city);
                    }
                });
            }
        });
    }

    // Display results
    if (results.length === 0) {
        resultsDiv.innerHTML = '<p>No recommendations found.</p>';
        return;
    }

    results.forEach(item => {
        const card = document.createElement('div');
        card.className = 'result-card';
        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        `;
        resultsDiv.appendChild(card);
    });
}

// Clear Results
function clearResults() {
    document.getElementById('searchInput').value = '';
    document.getElementById('results').innerHTML = '';
}

// Contact Form Submission (Basic Alert for Demo)
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Form submitted! (This is a demo.)');
    this.reset();
});

// Optional: Display Country Time (Example for a country)
function displayCountryTime() {
    const options = {
        timeZone: 'America/New_York',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    const time = new Date().toLocaleTimeString('en-US', options);
    console.log('Current time in New York:', time);
    // Optionally, append time to results or a specific section
}

// Initialize
showSection('home');
displayCountryTime(); // Optional time display