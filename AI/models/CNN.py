from keras.layers import Input, Embedding, Conv2D, MaxPool2D, Flatten, Dense, Concatenate, Dropout, Average, Reshape, GlobalMaxPool2D
from keras.models import Model, load_model
from tensorflow.keras.optimizers import Adam
from keras.callbacks import EarlyStopping, ModelCheckpoint
import numpy as np
from sklearn.metrics import classification_report, accuracy_score
from constants import *
from tensorflow.keras import utils
from keras.utils import plot_model
import matplotlib.pyplot as plt

class CNN:

    def __init__(
            self,
            train_title,
            train_text,
            train_rating,
            val_title,
            val_text,
            val_rating,
            vocab_size,
            embedding_matrix
    ):
        self.title_input = None
        self.text_input = None
        self.train_title = train_title
        self.train_text = train_text
        self.train_rating = train_rating
        self.val_title = val_title
        self.val_text = val_text
        self.val_rating = val_rating
        self.vocab_size = vocab_size
        self.embedding_matrix = embedding_matrix
        self.output = self.getOutput() 
        self.model = self.buildModel()

    def getOutput(self):
        # Input for title
        num_filters = 256
        filter_sizes = [3, 4, 5, 6]
        DROP = 0.3
        
        self.title_input = Input(shape=(self.train_title.shape[1],))
        title_embedding = Embedding(self.vocab_size, EMBEDDING_DIM, input_length=self.train_title.shape[1], weights=[self.embedding_matrix], trainable=TRAINABLE)(self.title_input)
        reshape_title = Reshape((self.train_title.shape[1], EMBEDDING_DIM, 1))(title_embedding)
        
        title_conv_blocks = []
        for filter_size in filter_sizes:
            title_conv = Conv2D(num_filters, kernel_size=(filter_size, EMBEDDING_DIM), padding='valid', kernel_initializer='normal', activation='relu')(reshape_title)
            title_pool = MaxPool2D(pool_size=(self.train_title.shape[1] - filter_size + 1, 1), strides=(1,1), padding='valid')(title_conv)
            # title_pool = GlobalMaxPool2D()(title_conv)
            title_conv_blocks.append(title_pool)
        title_concat = Concatenate(axis=1)(title_conv_blocks)
        title_flat = Flatten()(title_concat)
        title_drop = Dropout(DROP)(title_flat)

        # Input for text
        self.text_input = Input(shape=(self.train_text.shape[1],))
        text_embedding = Embedding(self.vocab_size, EMBEDDING_DIM, input_length=self.train_text.shape[1], weights=[self.embedding_matrix], trainable=TRAINABLE)(self.text_input)
        reshape_text = Reshape((self.train_text.shape[1], EMBEDDING_DIM, 1))(text_embedding)
        text_conv_blocks = []
        for filter_size in filter_sizes:
            text_conv = Conv2D(num_filters, kernel_size=(filter_size, EMBEDDING_DIM), padding='valid', kernel_initializer='normal', activation='relu')(reshape_text)
            text_pool = MaxPool2D(pool_size=(self.train_text.shape[1] - filter_size + 1, 1), strides=(1,1), padding='valid')(text_conv)
            # text_pool = GlobalMaxPool2D()(text_conv)
            text_conv_blocks.append(text_pool)
        text_concat = Concatenate(axis=1)(text_conv_blocks)
        text_flat = Flatten()(text_concat)
        text_drop = Dropout(DROP)(text_flat)

        # Average two inputs
        average = Average()([title_drop, text_drop])

        # Additional layers of the model
        # dense = Dense(256, activation='relu')(average)
        dense = Dense(128, activation='relu')(average)
        dense = Dense(64, activation='relu')(dense)

        return Dense(3, activation='softmax')(dense)

    def buildModel(self):
        # Build the model
        model_CNN = Model(inputs=[self.title_input, self.text_input], outputs=self.output)

        opt = Adam(learning_rate=0.00001)
        model_CNN.compile(loss='categorical_crossentropy', optimizer=opt, metrics=['accuracy'])
        model_CNN.summary()
        
        plot_model(model_CNN, to_file=PATH + MODEL_IMAGE + CNN_IMAGE, show_shapes=True, show_layer_names=True)

        return model_CNN

    def trainModel(self):
        early_stopping = EarlyStopping(monitor='val_accuracy', patience=STOP_PATIENCE, verbose=0, mode='max')
        checkpoint = ModelCheckpoint(PATH + MODEL + CNN_MODEL, save_best_only=True, monitor='val_accuracy', mode='max', verbose=1)
        history = self.model.fit(
            [np.array(self.train_title), np.array(self.train_text)],
            self.train_rating,
            epochs=EPOCH,
            batch_size=BATCH_SIZE,
            verbose=1,
            validation_data=([np.array(self.val_title), np.array(self.val_text)], self.val_rating),
            callbacks=[early_stopping, checkpoint]
        )

        # self.model.save(PATH + MODEL + CNN_MODEL)

        plt.figure()
        plt.plot(history.history['accuracy'], label='Train Accuracy')
        plt.plot(history.history['loss'], label='Train Loss')
        plt.title('CNN Model')
        plt.ylabel('Value')
        plt.xlabel('Epoch')
        plt.legend()
        plt.savefig(PATH + CHART + CNN_CHART)
        plt.close()

        return self.model
    
    def testModel(self, x_test, y_test):
        self.model = load_model(PATH + MODEL + CNN_MODEL)
        y_pred = self.model.predict(x_test)
        pred = np.argmax(y_pred, axis=1)
        report = classification_report(y_test, utils.to_categorical(pred, num_classes=3))
        acc = accuracy_score(y_test, utils.to_categorical(pred, num_classes=3))
        acc_line = f'Accuracy: {acc}\n'
        report += acc_line
        print(report)

        with open(PATH + REPORT + CNN_REPORT, 'w') as file:
            print(report, file=file)

        print(f"Classification report saved to {PATH + REPORT + CNN_REPORT}..................")