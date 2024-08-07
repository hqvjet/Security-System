import cv2
import numpy as np
import requests
from dotenv import load_dotenv
from constants import *
import os
from collections import deque
from picamera2 import Picamera2
from picamera2.encoders import H264Encoder
from picamera2.outputs import FfmpegOutput, FileOutput
import time

# Load environment variables
load_dotenv()
AI_API_URL = os.getenv('AI_API_URL')
SERVER_API_URL = os.getenv('SERVER_API_URL')

# Initialize camera
picam2 = Picamera2()
video_config = picam2.create_video_configuration(main={"size": SCREEN_RESOLUTION, "format": "RGB888"})
picam2.configure(video_config)
picam2.set_controls({"FrameRate": 30})

# Data structures for frames
frames_deque = deque()
lock = False
count = 0

def start_recording():
    vid_out = PATH + VIDEOS + f'violence_{time.strftime("%Y%m%d-%H%M%S")}.mp4'
    encoder = H264Encoder()
    output = FileOutput(vid_out)
    
    picam2.stop()
    picam2.start_and_record_video(output, duration=10)
    print('Recording started')
    time.sleep(10)  # Wait for recording to complete
    picam2.stop_recording()
    print('Recording stopped')
    
    # Restart the camera for normal operation
    picam2.start()

def make_request(frames):
    # Convert list of frames to bytes
    # temp = np.array(frames)
    # print(temp.shape)

    frames_bytes = b''.join([np.array(frame).tobytes() for frame in frames])
    print('Requesting...')
    try:
        response = requests.post(AI_API_URL, data=frames_bytes, timeout=10)
        print('Request completed')
        
        if response.status_code == 200:
            data = response.json()
            print(data)
            predict = data['prediction'][0]
            
            if predict[0] >= predict[1]:
                print('NO VIOLENCE')
            else:
                print('VIOLENCE DETECTED')
                start_recording()
        else:
            print('ERROR OCCURRED WHILE POSTING')
    except requests.exceptions.RequestException as e:
        print(f'REQUEST ERROR: {e}')
    

if __name__ == "__main__":
    picam2.start()
    
    try:
        while True:
            # Capture image from camera
            image = picam2.capture_array()
            image = cv2.resize(image, (500, 500))
            
            # Display the camera feed
            cv2.imshow('Camera', image)
            
            if count % 45 == 0:
                count = 0
                print(f'Frames: {len(frames_deque)}')
                
                if len(frames_deque) == 8:
                    # threading.Thread(target=make_request, args=(list(frames_deque),)).start()
                    make_request(list(frames_deque))
                    frames_deque = deque()
            
                frames_deque.append(image)

            
            count += 1
            
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
    
    finally:
        cv2.destroyAllWindows()
        picam2.stop()
