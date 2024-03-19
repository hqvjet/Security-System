from flask import Blueprint, request, jsonify
from loadModel import load_model
import numpy as np

model = Blueprint('model', __name__)
tsn_model = load_model()

@model.post('/predict')
def predict():
    data = request.get_json()
    frames = np.array(data.get('frames'))
    
    prediction = tsn_model.predict(frames).tolist()
    
    return jsonify({'prediction': prediction})
    
