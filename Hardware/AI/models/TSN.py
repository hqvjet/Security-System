from keras.layers import Input, Dense, TimeDistributed, LSTM, Dropout, MaxPooling2D, Conv2D, Flatten
from keras.models import Model, load_model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras import layers, models
from keras.callbacks import EarlyStopping, ModelCheckpoint
import numpy as np
from sklearn.metrics import classification_report, accuracy_score
from constants import *
from keras.utils import plot_model
import matplotlib.pyplot as plt
from tensorflow.keras.applications.resnet50 import ResNet50
from tensorflow.keras import utils

class TSN:

    def __init__(
            self,
            train_input,
            train_output,
            valid_input,
            valid_output
    ):
        self.input = None
        self.train_input = train_input
        self.train_output = train_output
        self.valid_input = valid_input
        self.valid_output = valid_output

        self.output = self.getOutput()
        self.model = self.buildModel()

    def getOutput(self):
        self.input = Input(shape=SHAPE)
        resnet = ResNet50(weights='imagenet', include_top=False, pooling='avg', input_shape=SHAPE)
        for layer in resnet.layers:
            layer.trainable = False

        self.input = layers.Input(shape=(MAX_FRAME, *SHAPE))
        feature_vectors = layers.TimeDistributed(resnet)(self.input)
        lstm_out = layers.LSTM(256)(feature_vectors)
        outputs = layers.Dense(FINAL_LAYER_NUMBER, activation='softmax')(lstm_out)

        return outputs

    def buildModel(self):
        model_TSN = models.Model(inputs=self.input, outputs=self.output)

        opt = Adam(learning_rate=LR)
        model_TSN.compile(loss='binary_crossentropy', optimizer=opt, metrics=['accuracy'])
        model_TSN.summary()
        
        plot_model(model_TSN, to_file=PATH + SUMMARY + TSN_SUMMARY, show_shapes=True, show_layer_names=True)

        return model_TSN

    def trainModel(self):
        early_stopping = EarlyStopping(monitor='val_loss', patience=STOP_PATIENCE, verbose=0, mode='min')
        checkpoint = ModelCheckpoint(PATH + MODEL + TSN_MODEL, save_best_only=True, monitor='val_accuracy', mode='max', verbose=1)
        history = self.model.fit(
            self.train_input,
            self.train_output,
            epochs=EPOCH,
            batch_size=BATCH_SIZE,
            verbose=1,
            validation_data=(self.valid_input, self.valid_output),
            callbacks=[early_stopping, checkpoint]
        )

        plt.figure()
        plt.plot(history.history['accuracy'], label='Train Accuracy')
        plt.plot(history.history['loss'], label='Train Loss')
        plt.title('TSN Model')
        plt.ylabel('Value')
        plt.xlabel('Epoch')
        plt.legend()
        plt.savefig(PATH + CHART + TSN_CHART)
        plt.close()

        return self.model
    
    def testModel(self, test_input, test_output):
        self.model = load_model(PATH + MODEL + TSN_MODEL)
        y_pred = self.model.predict(test_input)
        pred = np.argmax(y_pred, axis=1)
        report = classification_report(test_output, utils.to_categorical(pred, num_classes=2))
        acc = accuracy_score(test_output, utils.to_categorical(pred, num_classes=2))
        acc_line = f'Accuracy: {acc}\n'
        report += acc_line
        print(report)

        with open(PATH + REPORT + TSN_REPORT, 'w') as file:
            print(report, file=file)

        print(f"Classification report saved to {PATH + REPORT + TSN_REPORT}..................")