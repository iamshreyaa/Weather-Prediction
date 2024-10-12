import pickle

model_names = ['temperature', 'wind', 'precipitation']

for model_name in model_names:
    try:
        with open(f'model_{model_name}.pkl', 'rb') as f:
            model = pickle.load(f)
        print(f"{model_name.capitalize()} model loaded successfully.")
    except Exception as e:
        print(f"Error loading {model_name} model:", e)
