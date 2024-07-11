import os
import cv2
import re
import pandas as pd
from sklearn.utils import shuffle
from sklearn.model_selection import train_test_split
from constants import *
from models.TSN import TSN
import tensorflow as tf
import numpy as np
from tensorflow.keras import utils
# from models.CNN import CNN

def padding(frames):
  np_frames = []
  for frame in frames:

    if len(frame) < MAX_FRAME:
      numb = MAX_FRAME - len(frame)
      for _ in range(numb):
        frame.append(np.zeros((500, 500, 3), dtype=np.uint8))

    elif len(frame) > MAX_FRAME:
      frame = frame[:MAX_FRAME]
    
    # for img in frame:
    #   print(np.array(img).shape)
    # print('.')
    np_frames.append(np.array(frame))

  return np.array(np_frames)

def vectorizedImages():
  data = {'frames' : [], 'type': []}
  img_name = 'V_1'
  image_files = sorted([file for file in os.listdir(PATH + IMAGE_DATASET + 'violence/') if file.endswith('.jpg')])
  frames = []
  for image_name in image_files:
    if image_name.endswith('.jpg'):
      image_path = os.path.join(PATH + IMAGE_DATASET + 'violence/', image_name)
      print(image_path)
      file_name, frame_number = re.split(r'\.mp4_frame|\.avi_frame', image_name)
      frame_number = int(frame_number.split('.')[0])
      
      if file_name != img_name:
        img_name = file_name
        data['frames'].append(frames)
        frames = []
        data['type'].append(1)

      img = cv2.imread(image_path)
      img = cv2.resize(img, DEFAULT_IMAGE_DIMENSION)
      frames.append(img)
  
  if len(frames) != 0:
    data['frames'].append(frames)
    data['type'].append(1)
    frames = []

  image_files = sorted([file for file in os.listdir(PATH + IMAGE_DATASET + 'non_violence/') if file.endswith('.jpg')])
  img_name = 'NV_1'
  for image_name in image_files:
    if image_name.endswith('.jpg'):
      image_path = os.path.join(PATH + IMAGE_DATASET + 'non_violence/', image_name)
      print(image_path)
      file_name, frame_number = re.split(r'\.mp4_frame|\.avi_frame', image_name)
      frame_number = int(frame_number.split('.')[0])
      
      if file_name != img_name:
        img_name = file_name
        data['frames'].append(frames)
        frames = []
        data['type'].append(0)

      img = cv2.imread(image_path)
      img = cv2.resize(img, DEFAULT_IMAGE_DIMENSION)
      frames.append(img)

  if len(frames) != 0:
    data['frames'].append(frames)
    data['type'].append(0)

  df = pd.DataFrame(data)
  df = shuffle(df)

  print(df.shape)

  train, test = train_test_split(df, test_size=0.1)
  train, valid = train_test_split(train, test_size=0.1)

  train.to_pickle(PATH + VECTORIZED_DATASET + 'train.pkl')
  valid.to_pickle(PATH + VECTORIZED_DATASET + 'valid.pkl')
  test.to_pickle(PATH + VECTORIZED_DATASET + 'test.pkl')

  print('VECTORIZATION HAS DONE!....................')

def train():
  train = pd.read_pickle(PATH + VECTORIZED_DATASET + 'train.pkl')
  valid = pd.read_pickle(PATH + VECTORIZED_DATASET + 'valid.pkl')
  test = pd.read_pickle(PATH + VECTORIZED_DATASET + 'test.pkl')

  train_input = train['frames'].to_numpy()
  train_output = train['type'].to_numpy()
  valid_input = valid['frames'].to_numpy()
  valid_output = valid['type'].to_numpy()
  test_input = test['frames'].to_numpy()
  test_output = test['type'].to_numpy()

  print('PADDING DATA!..............................')
  train_input = padding(train_input)
  valid_input = padding(valid_input)
  test_input = padding(test_input)

  train_output = np.array([utils.to_categorical(label, num_classes=2) for label in train_output])
  valid_output = np.array([utils.to_categorical(label, num_classes=2) for label in valid_output])
  test_output = np.array([utils.to_categorical(label, num_classes=2) for label in test_output])
  print(type(train_input[0]))

  tsn_model = TSN(train_input, train_output, valid_input, valid_output)
  # tsn_model.trainModel()
  tsn_model.testModel(test_input, test_output)