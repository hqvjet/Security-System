import tensorflow as tf
from train import vectorizedImages, train

def checkForGPU():
    if tf.test.is_gpu_available():
        print("USING GPU....................................")
    else:
        print("USING CPU....................................")

if __name__ == '__main__':
    checkForGPU()
    # vectorizedImages()
    train()