// document.addEventListener("DOMContentLoaded", () => {
//     const windElement = document.querySelector('.detail:nth-child(1) .value');
//     const tempElement = document.querySelector('.detail:nth-child(2) .value');
//     const precipitationElement = document.querySelector('.detail:nth-child(3) .value');




//     fetch('/api/weather')
//     .then(response => response.json())
//     .then(data => {
//         const hourlyData = data.hourly;
//         const windSpeed = hourlyData.wind_speed_10m[0];
//         const temperature = hourlyData.temperature_2m[0];
//         const precipitation = hourlyData.precipitation[0];


//         windElement.textContent = `${windSpeed} m/s`;
//         tempElement.textContent = `${temperature} °C`;
//         precipitationElement.textContent = `${precipitation} mm`;
//     })
//     .catch(error => {
//         console.error('error fetching the data',error);
//     });
// });


//only for showing current data
// document.addEventListener("DOMContentLoaded", () => {
//     const getweatherbtn = document.getElementById('get-weather');

//     getweatherbtn.addEventListener('click', async() => {
//         const latitude = document.getElementById("latitude").value;
//         const longitude = document.getElementById("longitude").value;


//         if (!latitude || !longitude){
//             alert("enter both");
//             return;
//         }
//         try{
//             const response = await fetch(`/api/weather?latitude=${latitude}&longitude=${longitude}`)
//             const data = await response.json();

//             document.getElementById("wind").textContent = data.hourly.wind_speed_10m[0] + " m/s";
//             document.getElementById("temperature").textContent = data.hourly.temperature_2m[0] + " deg C";
//             document.getElementById("precipitation").textContent = data.hourly.precipitation[0] + " mm";
//         }catch(err){
//             console.log(err);
//             res.status(500).json({message:'cannot fetch data'});
//             alert('cannot fetch data');
//         }
//     });
// });

document.addEventListener("DOMContentLoaded", () => {
    const getWeatherBtn = document.getElementById("get-weather");

    getWeatherBtn.addEventListener("click", async () => {
        const latitude = document.getElementById("latitude").value;
        const longitude = document.getElementById("longitude").value;

        if (!latitude || !longitude) {
            alert("Please enter both latitude and longitude");
            return;
        }

        try {
            // Fetch weather and predictions from Node.js backend
            const response = await axios.get(`/api/weather?latitude=${latitude}&longitude=${longitude}`);
            const data = response.data;

            // Display current weather data
            document.getElementById("wind").textContent = data.current.wind_speed + ' m/s';
            document.getElementById("temperature").textContent = data.current.temperature + ' °C';
            document.getElementById("precipitation").textContent = data.current.precipitation + ' mm';

            // Display predicted weather data
            document.getElementById("predicted-wind").textContent = data.prediction.predicted_wind_speed + ' m/s';
            document.getElementById("predicted-temperature").textContent = data.prediction.predicted_temperature + ' °C';
            document.getElementById("predicted-precipitation").textContent = data.prediction.predicted_precipitation + ' mm';
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data');
        }
    });
});
