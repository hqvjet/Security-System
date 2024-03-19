import cv2
import time
from constants import *
import os
from collections import deque
from picamera import PiCamera
from picamera.array import PiRGBArray
import requests
import dotenv import load_dotenv

load_dotenv()
API_URL = os.getenv('API_URL')

camera = PiCamera()
camera.resolution = SCREEN_RESOLUTION
camera.framerate = FRAME_RATE
rawCapture = PiRGBArray(camera, size=SCREEN_RESOLUTION)
# cap = cv2.VideoCapture(0)

frames_dequeue = deque() 

# vid = cv2.VideoWriter_fourcc(*'H264')
# out = cv2.VideoWriter('output.mp4', vid, 8.0, (500, 500))
#
# if not cap.isOpened():
#     print('Camera not found')
#     exit()
# else:
#     print('Camera is on')

# cap.set(cv2.CAP_PROP_FRAME_WIDTH, 500)
# cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 500)

def videoToFrames(video_path):
    video = cv2.VideoCapture(video_path)

    if not video.isOpened():
        print('Video Error')

    frame_interval = 1
    frame_rate = int(video.get(cv2.CAP_PROP_FPS))
    num_frames_to_capture = frame_rate * frame_interval
    output_folder = 'resources/frames'
    
    frame_count = 0

def makeRequest(frames):
    payload = {
        'frames': frames
    }

    response = requests.post(API_URL, json=payload)

    if response.status_code == 200:
        data = response.json()
        print(data)
    else:
        print('ERROR OCCURED WHILE POSTING')

def vectorize():
    vectors = []
    for frame in frames_dequeue:
        vectors.append(frame.flatten())

    return vectors

for frame in camera.capture_continuous(rawCapture, format='bgr', use_video_port=True):
    image = frame.array
    # ret, frame = cap.read()
    #
    # if not ret:
    #     print('Cant read frame from camera')
    #     break
    # out.write(frame)
    cv2.imshow('Camera', image)

    if len(frames_dequeue) >= 8:
        vectorized_frames = vectorize()
        makeRequest(vectorized_frames)
        frames_dequeue.popleft()
        frames_dequeue.append(image)
    else:
        frames_dequeue.append(image)

    if cv2.waitKey(1) and 0xFF == ord('q'):
        break
    # time.sleep(FRAME_INTERVAL)
    rawCapture.truncate(0)

cv2.destroyAllWindows()
# finally:
#     cap.release()
#     out.release()
#     cv2.destroyAllWindows()
