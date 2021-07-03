import numpy as np
import cv2
import pafy
import os, fnmatch
import matplotlib.pyplot as plt
import pandas as pd
import glob2
from pathlib import Path
from mtcnn.mtcnn import MTCNN
from skimage import measure
from skimage.metrics import structural_similarity as ssim
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

def mse(imageA, imageB):
    # the 'Mean Squared Error' between the two images is the
    # sum of the squared difference between the two images;
    # NOTE: the two images must have the same dimension
    err = np.sum((imageA.astype("float") - imageB.astype("float")) ** 2)
    err /= float(imageA.shape[0] * imageA.shape[1])
    # return the MSE, the lower the error, the more "similar"
    # the two images are
    return err

def compare_images(imageA, imageB, title):
    # compute the mean squared error and structural similarity
    # index for the images
    m = mse(imageA, imageB)
    s = ssim(imageA, imageB)
    # setup the figure
    fig = plt.figure(title)
    plt.suptitle("MSE: %.2f, SSIM: %.2f" % (m, s))
    # show first image
    ax = fig.add_subplot(1, 2, 1)
    plt.imshow(imageA, cmap = plt.cm.gray)
    plt.axis("off")
    # show the second image
    ax = fig.add_subplot(1, 2, 2)
    plt.imshow(imageB, cmap = plt.cm.gray)
    plt.axis("off")
    # show the images
    plt.show()

if False:
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

original = cv2.imread("./real/maxresdefault.jpg")
shopped = cv2.imread("./frames/1.jpg")
# convert the images to grayscale
original = cv2.cvtColor(original, cv2.COLOR_BGR2GRAY)
shopped = cv2.cvtColor(shopped, cv2.COLOR_BGR2GRAY)

# initialize the figure
fig = plt.figure("Images")
images = ("Original", original), ("modified", shopped)
# loop over the images
for (i, (name, image)) in enumerate(images):
    # show the image
    ax = fig.add_subplot(1, 3, i + 1)
    ax.set_title(name)
    plt.imshow(image, cmap = plt.cm.gray)
    plt.axis("off")
# show the figure
plt.show()
# compare the images
compare_images(original, original, "Original vs. Original")
compare_images(original, shopped, "Original vs. Modified")
# cv2.subtract(original)
# img3 = original-shopped
image3 = cv2.absdiff(original, shopped)
image3
is_all_zero = not np.any(image3)
if is_all_zero:
    print('Array contains only 0')
else:
    print('Array has non-zero items too')

#When everything done, release the capture
cap.release()

extract_multiple_videos("downloadedvid.mp4")

cv2.destroyAllWindows()