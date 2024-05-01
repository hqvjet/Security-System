from keras.models import load_model
from constants import *

def getModel():
    model = load_model(PATH + MODEL + TSN_MODEL)

    return model
