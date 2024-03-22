import sys
import cv2
import time
from constants import *
import os
from collections import deque
from picamera import PiCamera
from picamera.array import PiRGBArray
import requests
from dotenv import load_dotenv
import numpy as np
import threading

load_dotenv()
API_URL = os.getenv('AI_API_URL')

camera = PiCamera()
camera.resolution = SCREEN_RESOLUTION
camera.framerate = FRAME_RATE * 5
rawCapture = PiRGBArray(camera, size=SCREEN_RESOLUTION)

frames_deque = deque() 
lost_deque = deque()
lock = False
recording = False
count = 0

def videoToFrames(video_path):
    video = cv2.VideoCapture(video_path)

    if not video.isOpened():
        print('Video Error')

    frame_interval = 1
    frame_rate = int(video.get(cv2.CAP_PROP_FPS))
    num_frames_to_capture = frame_rate * frame_interval
    output_folder = 'resources/frames'
    
    frame_count = 0

def startRecording():
    global recording
    
    recording = True
    camera.start_recording(PATH + VIDEOS + 'violence.h264')
    camera.wait_recording(10)
    camera.stop_recording()
    recording = False

def makeRequest(frames):
    global lock
    global frames_deque
    frames_string = np.array(frames).tobytes()
    print('requesting...')
    response = requests.post(API_URL + '/predict', data=frames_string)
    print('done')

    frames_deque = deque()
    lock = False

    if response.status_code == 200:
        data = response.json()
        print(data)
        predict = data['prediction'][0]
        
        if predict[0] >= predict[1]:
            print('NO VIOLENCE')
        else:
            print('VIOLENCE DETECTED')
            threading.Thread(target=startRecording).start()

    else:
        print('ERROR OCCURED WHILE POSTING')

for frame in camera.capture_continuous(rawCapture, format='bgr', use_video_port=True):
    image = frame.array

    cv2.imshow('Camera', image)
    if count % 5 == 0:
        count = 0
        print('cap')
        vector = image.reshape((image.shape[0], image.shape[1], 3))

        print('lock', lock)
        print('recording', recording)
        print('frames', len(frames_deque))
        print('lost', len(lost_deque))

        if not lock and not recording:

            # Check lost_deque
            if len(lost_deque) != 0:
                if len(lost_deque) <= 8:
                    frames_deque = deque(lost_deque)
                    lost_deque = deque()
                else:
                    frames_deque = deque(lost_deque[0:8])
                    lost_deque = deque(lost_deque[8:])

            if len(frames_deque) >= 8:
                threading.Thread(target=makeRequest, args=(frames_deque,)).start()
                lock = True

            frames_deque.append(vector)
        elif lock:
            lost_deque.append(vector)
    count += 1
    if cv2.waitKey(1) and 0xFF == ord('q'):
        break

    rawCapture.truncate(0)

cv2.destroyAllWindows()
