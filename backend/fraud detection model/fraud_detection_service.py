from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the pre-trained model
model = joblib.load('fraud_detection_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    amount = data['amount']
    is_high_amount = amount > 10000
    features = np.array([[amount, is_high_amount]])
    prediction = model.predict(features)
    is_fraudulent = prediction[0] == 1
    return jsonify({'is_fraudulent': is_fraudulent})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
