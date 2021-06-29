import numpy as np
import cv2
import pafy

url = input("Paste video link here:")
# create video object
video = pafy.new(url)
# extract information about best resolution video available 
bestResolutionVideo = video.getbest()
# download the video as downloadedvid.mp4
bestResolutionVideo.download("downloadedvid.mp4")

cap = cv2.VideoCapture("downloadedvid.mp4")
while(True):
    #Capture frame-by-frame
   ret, frame = cap.read()
    #Our operations on the frame come here
   gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    #Display the resulting frame
   cv2.imshow('frame',gray)
   if cv2.waitKey(1) & 0xFF == ord('q'):
       break
#When everything done, release the capture
cap.release()
cv2.destroyAllWindows()