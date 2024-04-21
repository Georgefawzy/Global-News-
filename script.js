let countryLinks = document.querySelectorAll('ul li a');
window.addEventListener('load', function () {
    test('us', 'business'); // United States as default
});
countryLinks.forEach(link => {
    link.addEventListener('click', () => {
        let countryName = link.innerText;
        createDropdown(link.dataset.country);
        test(link.dataset.country); // Pass the country code to the test function
    });
});

async function test(countryCode, category = 'business') {
    try {
        let myData = await fetch(`https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${category}&apiKey=ae46c85acece4ed3851d87469568d3d0`);
        let responseData = await myData.json();
        let data = responseData.articles;
        displayData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayData(data) {
    let html = ``;
    data.forEach(article => {
        // Check if the article has a valid image URL
        let imageUrl = article.urlToImage ? article.urlToImage : 'istockphoto-1313303632-640x640.jpg';

        html += `
        <div class="card">
            <div class="card-img">
                <a href="${article.url}" target="_blank"> <!-- Add link around image -->
                    <img src="${imageUrl}" alt="">
                </a>
                <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.description}</p>
                    <a href="${article.url}" class="btn btn-primary" target="_blank">Read More</a> <!-- Add target="_blank" to open link in new tab -->
                </div>
            </div>
        </div>
        `;
    });
    document.getElementById("cards").innerHTML = html;
}

// Function to create dropdowns for each country
function createDropdown(country) {
    var dropdown = document.createElement("select");
    dropdown.setAttribute("id", country);

    var options = ["business", "health", "sports", "technology", "entertainment", "science"];

    options.forEach(function (option) {
        var optionElem = document.createElement("option");
        optionElem.text = option.charAt(0).toUpperCase() + option.slice(1); // Capitalize the first letter
        dropdown.add(optionElem);
    });

    // Event listener for dropdown change
    dropdown.addEventListener('change', function () {
        let selectedCategory = this.value.toLowerCase();
        test(country, selectedCategory);
    });

    document.getElementById("dropdowns").innerHTML = ''; // Clear previous dropdowns
    document.getElementById("dropdowns").appendChild(dropdown);
}

let today = new Date();

// Define Arabic days and months
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Extract the day, month, and year
let day = days[today.getDay()];
let date = today.getDate();
let month = months[today.getMonth()];
let year = today.getFullYear();

// Format the date
let formattedDate = `${day} ${date} ${month} ${year}`;

// Display today's date in the DOM
document.getElementById("todaysDate").textContent = formattedDate;

// Fetch weather data
const apiKey = "K9MS5B5Y7U5S4HFSQGX9V4VNN"; // Enter your Visual Crossing API key here

navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=metric&key=${apiKey}&contentType=json`)
        .then(response => response.json())
        .then(data => {
            // Extract weather information
            const weather = data.days[0].hours[0];
            const temperature = Math.round(weather.temp); // Temperature in Celsius
            const description = weather.conditions;

            // Display weather information in the DOM
            document.getElementById("weatherData").textContent = `Weather: ${temperature}° C ${description}`;
        })
        .catch(error => console.log("Error fetching weather data:", error));
}, error => {
    console.log(`Error getting geolocation: ${error}`);
});

const cards = document.querySelectorAll('.card')

window.addEventListener('scroll', checkBoxes)

checkBoxes()

function checkBoxes() {
    const triggerBottom = window.innerHeight / 5 * 4

    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top

        if (cardTop < triggerBottom) {
            card.classList.add('show')
        } else {
            card.classList.remove('show')
        }
    })
}

let btnOpen=document.getElementById("btn-open")

window.addEventListener("scroll", function() {
    if (window.scrollY > 200) {
        btnOpen.style.display = "block";
    } else {
        btnOpen.style.display = "none";
    }
});

btnOpen.addEventListener("click", function() {
    window.scroll({
        top: 0,
        behavior: "smooth"
    });
});
