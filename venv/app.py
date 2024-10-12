# from flask import Flask, request, jsonify
# import json
# import joblib
# import numpy as np
# import os

# app = Flask(__name__)
# print("hello")
# # Load the pre-trained models
# try:
#     base_dir = os.path.dirname(os.path.abspath(__file__))
#     model_temp = joblib.load(os.path.join(base_dir, 'model_temperature.pkl'))
#     model_wind = joblib.load(os.path.join(base_dir, 'model_wind.pkl'))
#     model_precip = joblib.load(os.path.join(base_dir, 'model_precipitation.pkl'))   
#     print("Models loaded successfully.")
# except Exception as e:
#     print("Error loading models:", e)

# @app.route('/predict', methods=['POST'])
# def predict():
#     data = request.get_json()
#     print(data)
#     current_weather = data.get('current_weather')

#     if not current_weather:
#         return jsonify({"error": "No current weather data provided"}), 400

#     try:
#         # Extract features
#         temperature = current_weather['temperature']
#         wind_speed = current_weather['wind_speed']
#         precipitation = current_weather['precipitation']

#         # Prepare the input for the models
#         input_data = np.array([[temperature, wind_speed, precipitation]])

#         # Make predictions
#         predicted_temp = model_temp.predict(input_data)[0]
#         predicted_wind = model_wind.predict(input_data)[0]
#         predicted_precip = model_precip.predict(input_data)[0]

#         return jsonify({
#             "predicted_temperature": predicted_temp,
#             "predicted_wind_speed": predicted_wind,
#             "predicted_precipitation": predicted_precip
#         })

#     except Exception as e:
#         print(f"Error: {e}")  # Log the error
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(port=5001, debug=True)







# from flask import Flask, request, jsonify
# import pickle
# import numpy as np

# app = Flask(__name__)

# # Load the pre-trained models
# try:
#     with open('model_temperature.pkl', 'rb') as f:
#         model_temp = pickle.load(f)
#     with open('model_wind.pkl', 'rb') as f:
#         model_wind = pickle.load(f)
#     with open('model_precipitation.pkl', 'rb') as f:
#         model_precip = pickle.load(f)
#     print("Models loaded successfully.")
# except Exception as e:
#     print("Error loading models:", e)
#     model_temp = None
#     model_wind = None
#     model_precip = None

# @app.route('/predict', methods=['POST'])
# def predict():
#     if model_temp is None or model_wind is None or model_precip is None:
#         return jsonify({"error": "Models not loaded properly"}), 500

#     data = request.get_json()
#     print(data)
#     current_weather = data.get('current_weather')

#     if not current_weather:
#         return jsonify({"error": "No current weather data provided"}), 400

#     try:
#         # Extract features
#         temperature = current_weather['temperature']
#         wind_speed = current_weather['wind_speed']
#         precipitation = current_weather['precipitation']

#         # Prepare the input for the models
#         input_data = np.array([[temperature, wind_speed, precipitation]])

#         # Make predictions
#         predicted_temp = model_temp.predict(input_data)[0]
#         predicted_wind = model_wind.predict(input_data)[0]
#         predicted_precip = model_precip.predict(input_data)[0]

#         return jsonify({
#             "predicted_temperature": predicted_temp,
#             "predicted_wind_speed": predicted_wind,
#             "predicted_precipitation": predicted_precip
#         })

#     except Exception as e:
#         print(f"Error: {e}")  # Log the error
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(port=5001, debug=True)


from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the pre-trained models
models = {}
model_names = ['temperature', 'wind', 'precipitation']

for model_name in model_names:
    try:
        models[model_name] = joblib.load(f'model_{model_name}.pkl')
        print(f"{model_name.capitalize()} model loaded successfully. Type: {type(models[model_name])}")
    except Exception as e:
        print(f"Error loading {model_name} model:", e)

@app.route('/predict', methods=['POST'])
def predict():
    if any(model is None for model in models.values()):
        return jsonify({"error": "Models not loaded properly"}), 500

    data = request.get_json()
    current_weather = data.get('current_weather')

    if not current_weather:
        return jsonify({"error": "No current weather data provided"}), 400

    try:
        temperature = current_weather['temperature']
        wind_speed = current_weather['wind_speed']
        precipitation = current_weather['precipitation']

        input_data = np.array([[temperature, wind_speed, precipitation]])

        # Make predictions
        predicted_temp = round(models['temperature'].predict(input_data)[0], 2)
        predicted_wind = round(models['wind'].predict(input_data)[0], 2)
        predicted_precip = round(models['precipitation'].predict(input_data)[0], 2)

        return jsonify({
            "predicted_temperature": predicted_temp,
            "predicted_wind_speed": predicted_wind,
            "predicted_precipitation": predicted_precip
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)
