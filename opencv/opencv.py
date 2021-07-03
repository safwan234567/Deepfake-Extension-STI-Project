import cv2
import numpy as np
from matplotlib import pyplot as plt
import pandas as pd
import glob2
import os, fnmatch
#from pathlib import pathlib
import os.path
import mtcnn
from matplotlib.patches import Rectangle
from matplotlib.patches import Circle
from matplotlib import pyplot
from mtcnn.mtcnn import MTCNN
import imutils
import argparse
from skimage.metrics import structural_similarity as ssim

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

original = cv2.imread("image.jpg")
shopped = cv2.imread("image2.jpg")
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


# Calculate the Structural Similarity Index (SSMI)
(score, diff) = ssim(original, shopped, full=True)
diff = (diff * 255).astype('uint8')
print('SSIM: {}'.format(score))


# Finding the differences in Images

thresh = cv2.threshold(diff, 0, 255,cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)[1]
cnts = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
cnts = imutils.grab_contours(cnts)


# Displaying the images

# loop over the contours
for c in cnts:
 # compute the bounding box of the contour and then draw the
 # bounding box on both input images to represent where the two
 # images differ
 (x, y, w, h) = cv2.boundingRect(c)
 cv2.rectangle(original, (x, y), (x + w, y + h), (0, 0, 255), 2)
 cv2.rectangle(shopped, (x, y), (x + w, y + h), (0, 0, 255), 2)
 
# show the output images
# plt.imshow(“Original”, original)
plt.imshow(original)
# cv2.waitKey(0)

# draw an image with detected objects
def draw_image_with_boxes(filename, result_list, face_filename):
 # load the image
 data = pyplot.imread(filename)
 for i in range(len(result_list)):
    # get coordinates
    x1, y1, width, height = result_list[i]['box']
    x2, y2 = x1 + width, y1 + height
    # define subplot
    pyplot.subplot(1, len(result_list), i+1)
    pyplot.axis('off')
    # plot face
    pyplot.imshow(data[y1:y2, x1:x2])
    pyplot.savefig('Dataset/only_face/'+ face_filename)
    
# show the plot
pyplot.show()
# show the plot diff
pyplot.show(diff)