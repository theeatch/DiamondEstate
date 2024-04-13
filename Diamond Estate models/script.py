from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS

# Load the trained model
model = joblib.load('model2.joblib')

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    house_size = float(data['house_size'])
    num_bedrooms = int(data['num_bedrooms'])
    num_bathrooms = int(data['num_bathrooms'])
    year_built = int(data['year_built'])
    distance_from_city_center = float(data['distance_from_city_center'])

    input_data = [house_size, num_bedrooms, num_bathrooms, year_built, distance_from_city_center]
    predicted_price = model.predict([input_data])[0] * 10000

    response = {'predicted_price': predicted_price}
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
