from flask import Blueprint, request, jsonify
from loadModel import getModel
import numpy as np

model = Blueprint('model', __name__)
tsn_model = getModel()

@model.post('/predict')
def predict():
    data = request.get_data()
    frames = np.frombuffer(data, dtype=np.uint8).reshape(8, 500, 500, 3)
    print(frames.shape)

    prediction = tsn_model.predict(np.array([frames])).tolist()
    
    return jsonify({'prediction': prediction})
    
