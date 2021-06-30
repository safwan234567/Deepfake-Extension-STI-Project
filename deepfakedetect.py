import numpy as np
import cv2
import pafy
import os, fnmatch
import matplotlib.pyplot as plt
import pandas as pd
import glob2
from pathlib import Path
from mtcnn.mtcnn import MTCNN
# from skimage import measure

# reading video fame
# Create a VideoCapture object and read from input file
def extract_multiple_videos(intput_filenames):
    """Extract video files into sequence of images."""
    i = 1  # Counter of first video
    # Iterate file names:
    cap = cv2.VideoCapture(intput_filenames)
    if (cap.isOpened()== False):
            print("Error opening file")

    # Empty output folder
    files = glob2.glob("./frames/*")
    for f in files:
        os.remove(f)
        
    # Keep iterating break
    while True:
        ret, frame = cap.read()  # Read frame from first video
                
        if ret:
            pwd = os.path.dirname(os.path.realpath(__file__))
            cv2.imwrite(os.path.join(pwd , "frames", str(i) + '.jpg'), frame)  # Write frame to JPEG file (1.jpg, 2.jpg, ...)
            #cv2.imshow('frame', frame)  # Display frame for testing
            i += 1 # Advance file counter
        else:
            # Break the interal loop when res status is False.
            break
    cv2.waitKey(50) #Wait 50msec
    cap.release()

url = input("Paste video link here: ")
# create video object
video = pafy.new(url)
# extract information about best resolution video available 
bestResolutionVideo = video.getbest()
# download the video as downloadedvid.mp4
bestResolutionVideo.download("downloadedvid.mp4")

cap = cv2.VideoCapture("downloadedvid.mp4")
# while(True): Commented for now since it doesnt work
#     #Capture frame-by-frame
#     ret, frame = cap.read()
#     #Our operations on the frame come here
#     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#     #Display the resulting frame
#     cv2.imshow('frame',gray)
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

#When everything done, release the capture
cap.release()

extract_multiple_videos("downloadedvid.mp4")

cv2.destroyAllWindows()