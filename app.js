// // if (process.env.NODE_ENV !== 'production'){
// //     require('dotenv').config();
// // }
// // const axios = require('axios');
// // const WEATHER_API = process.env.WEATHER_API

// // const express = require('express')
// // const app = express()

// // app.use(express.json())
// // app.use(express.static('public'))


// // //endpoint to fetch weather data
// // app.get('/api/weather', async (req,res) => {
// //     try{
// //         const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
// //             params: {
// //                 latitute: 15.5553,
// //                 longitude:73.7517,
// //                 hourly: 'temperature_2m,precipitation,wind_speed_10m'
// //             }
// //         }); res.json(response.data);
// //     }catch(err){
// //         console.error('error', err.message);
// //         res.status(500).json({message:'error in fetching data'});
// //     }
// // });

// // app.listen(3000,() => {
// //     console.log("server started")
// // })


//for entering latitude and  lingitude and getting it displayed on screen
// const axios = require('axios');
// const express = require('express');
// const app = express();

// // Serve static files like HTML, CSS, JS
// app.use(express.static('public'));

// // API to fetch weather data
// app.get('/api/weather', async (req, res) => {
//     const {latitude, longitude} = req.query;

//     if (!latitude || !longitude){
//         return res.status(400).json({message: 'provide with both'});
//     }
//     try {
//         const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
//             params: {
//                 latitude,
//                 longitude,
//                 hourly: 'temperature_2m,precipitation,wind_speed_10m'
//             }
//         });

//         //send fetched data to frontend
//         res.json(response.data);
//     } catch (error) {
//         if (error.response) {
//             // Log the error response from the API
//             console.error('Error Response:', error.response.data);
//         } else {
//             // Log other errors (e.g., network issues)
//             console.error('Error:', error.message);
//         }
//         res.status(500).json({ message: 'error in fetching data' });
//     }
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });



// const axios = require('axios');
// const express = require('express');
// const cors = require('cors');
// const app = express();

// // Enable CORS
// app.use(cors());

// // Serve static files like HTML, CSS, JS
// app.use(express.static('public'));

// // API to fetch weather data
// app.get('/api/weather', async (req, res) => {
//     const { latitude, longitude } = req.query;

//     // Validate input
//     if (!latitude || !longitude) {
//         return res.status(400).json({ message: 'Provide both latitude and longitude' });
//     }

//     try {
//         // Fetch weather data from the external API
//         const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
//             params: {
//                 latitude,
//                 longitude,
//                 hourly: 'temperature_2m,precipitation,wind_speed_10m',
//                 // Optionally, add more parameters based on the API documentation
//             }
//         });

//         // Log the full response for debugging
//         console.log('Weather API Response:', response.data);

//         // Check if the necessary data is available
//         if (!response.data.hourly || !response.data.hourly.temperature_2m || !response.data.hourly.wind_speed_10m || !response.data.hourly.precipitation) {
//             throw new Error('Missing data in response');
//         }
//         console.log('BC')
//         // Extract weather data
//         const weatherdata = {
//             temperature: response.data.hourly.temperature_2m[0],
//             wind_speed: response.data.hourly.wind_speed_10m[0],
//             precipitation: response.data.hourly.precipitation[0]
//         };
//         console.log(weatherdata)
//         console.log('BENTG')
//         // Send data to Flask for prediction
//         const flaskRes = await axios.post('http://127.0.0.1:5001/predict', {
//             current_weather: weatherdata
//         });
//         console.log('newmann')
//         // Combine data and respond
//         const combineddata = {
//             current: weatherdata,
//             prediction: flaskRes.data
//         };
//         res.json(combineddata);
//     } catch (error) {
//         // Improved error logging
//         console.error('API Error:', error.response ? error.response.data : error.message);
//         res.status(500).json({ 
//             message: 'Error from external API', 
//             error: error.response ? error.response.data : error.message 
//         });
//     }
// });


// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Node.js server is running on port ${PORT}`);
// });



const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors());
app.use(express.static('public'));
// Middleware to parse JSON
app.use(express.json());


// API to fetch weather data
app.get('/api/weather', async (req, res) => {
    const { latitude, longitude } = req.query;

    // Validate input
    if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Provide both latitude and longitude' });
    }

    try {
        // Fetch weather data from the external API
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
            params: {
                latitude,
                longitude,
                hourly: 'temperature_2m,precipitation,wind_speed_10m',
            }
        });

        // Extract weather data
        const weatherdata = {
            temperature: response.data.hourly.temperature_2m[0],
            wind_speed: response.data.hourly.wind_speed_10m[0],
            precipitation: response.data.hourly.precipitation[0]
        };

        // Send data to Flask for prediction
        const flaskRes = await axios.post('http://127.0.0.1:5001/predict', {
            current_weather: weatherdata
        });

        // Combine data and respond
        res.json({
            current: weatherdata,
            prediction: flaskRes.data
        });

    } catch (error) {
        console.error('API Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ 
            message: 'Error from external API', 
            error: error.response ? error.response.data : error.message 
        });
    }
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Node.js server is running on port ${PORT}`);
});
