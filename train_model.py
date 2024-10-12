'''import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

data = pd.read_csv('/Users/shreyapanwar/Desktop/vscode/express-project/nodejs/temp/weather_data.csv')

x = data[['Temperature_C', 'Wind_Speed_kmh', 'Precipitation_mm']]
y_temp = data['target_temp']
y_wind = data['target_wind']
y_prep = data['target_prep']


x_train,x_test,y_temp_train,y_temp_test,y_wind_train,y_wind_test,y_prep_train,y_prep_test = train_test_split(x,y_temp,y_wind,y_prep, test_size=0.2, random_state=42)


#model train
model_temp = RandomForestClassifier()
model_temp.fit(x_train,y_temp_train)

model_wind = RandomForestClassifier()
model_wind.fit(x_train,y_wind_train)

model_prep = RandomForestClassifier()
model_prep.fit(x_train,y_prep_train)

#save to disk
joblib.dump(model_temp,'model_temp.pkl')
joblib.dump(model_wind,'model_wind.pkl')
joblib.dump(model_prep,'model_prep.pkl')

print('model trained and saved!')'''

import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import joblib

# Load your historical weather data into a Pandas DataFrame
data = pd.read_csv('/Users/shreyapanwar/Desktop/vscode/express-project/nodejs/temp/weather_data.csv')  # Example data file with weather history
data = data.iloc[:1000]
# Create lagged features
data['lag_temperature'] = data['Temperature_C'].shift(1)
data['lag_wind_speed'] = data['Wind_Speed_kmh'].shift(1)
data['lag_precipitation'] = data['Precipitation_mm'].shift(1)

# Drop rows with NaN values resulting from lagging
data = data.dropna()

# Define features and targets
X = data[['lag_temperature', 'lag_wind_speed', 'lag_precipitation']]  # Features
y_temp = data['Temperature_C']  # Target: Next day's temperature
y_wind = data['Wind_Speed_kmh']    # Target: Next day's wind speed
y_precip = data['Precipitation_mm']  # Target: Next day's precipitation

# Split the data into training and testing sets
X_train, X_test, y_temp_train, y_temp_test, y_wind_train, y_wind_test, y_precip_train, y_precip_test = train_test_split(X, y_temp, y_wind, y_precip, test_size=0.2, random_state=42)

# Train models for each target using Random Forest
model_temp = RandomForestRegressor()
model_temp.fit(X_train, y_temp_train)

model_wind = RandomForestRegressor()
model_wind.fit(X_train, y_wind_train)

model_precip = RandomForestRegressor()
model_precip.fit(X_train, y_precip_train)

# Save the trained models to disk
joblib.dump(model_temp, 'model_temperature.pkl')
joblib.dump(model_wind, 'model_wind.pkl')
joblib.dump(model_precip, 'model_precipitation.pkl')

print("Models trained and saved!")
