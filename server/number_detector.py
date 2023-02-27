import numpy as np
from numpy import argmax
import sys, json

import cv2
import math
from scipy import ndimage

from keras.models import load_model
import base64


def getBestShift(img):
    cy,cx = ndimage.center_of_mass(img)

    rows,cols = img.shape
    shiftx = np.round(cols/2.0-cx).astype(int)
    shifty = np.round(rows/2.0-cy).astype(int)

    return shiftx,shifty

def shift(img,sx,sy):
    rows,cols = img.shape
    M = np.float32([[1,0,sx],[0,1,sy]])
    shifted = cv2.warpAffine(img,M,(cols,rows))
    return shifted


def analyze_number(uri):

    #If we want / have a local image path instead of a data uri
    #gray = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    
    encoded_data = uri.split(',')[1]
    
    #deprecated
    #nparr = np.fromstring(base64.b64decode(encoded_data), np.uint8)
    
    nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)    
    
    gray = cv2.imdecode(nparr, cv2.IMREAD_GRAYSCALE)
    # resize the images and invert it (black background)
    gray = cv2.resize(255-gray, (28, 28))
    
    
    # added
    (thresh, gray) = cv2.threshold(gray, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
    while np.sum(gray[0]) == 0:
        gray = gray[1:]
    
    while np.sum(gray[:,0]) == 0:
        gray = np.delete(gray,0,1)
    
    while np.sum(gray[-1]) == 0:
        gray = gray[:-1]
    
    while np.sum(gray[:,-1]) == 0:
        gray = np.delete(gray,-1,1)
    
    rows,cols = gray.shape
    
    if rows > cols:
        factor = 20.0/rows
        rows = 20
        cols = int(round(cols*factor))
        gray = cv2.resize(gray, (cols,rows))
    else:
        factor = 20.0/cols
        cols = 20
        rows = int(round(rows*factor))
        gray = cv2.resize(gray, (cols, rows))
    
    
    colsPadding = (int(math.ceil((28-cols)/2.0)),int(math.floor((28-cols)/2.0)))
    rowsPadding = (int(math.ceil((28-rows)/2.0)),int(math.floor((28-rows)/2.0)))
    gray = np.lib.pad(gray,(rowsPadding,colsPadding),'constant')
    
    
    shiftx,shifty = getBestShift(gray)
    shifted = shift(gray,shiftx,shifty)
    gray = shifted
    
    gray = gray.reshape(1, 28, 28, 1)
    # prepare pixel data
    gray = gray.astype('float32')
    gray /= 255.0
    
    model = load_model('final_model.h5')
    # predict the class
    predict_value = model.predict(gray)
    digit = argmax(predict_value)
    # print(digit)
    return digit
    

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

if __name__ == '__main__':
    # Can change to add image upload as well but for now we are using uri
    # uri = sys.argv[1]
    lines = read_in()
    final_num = analyze_number(lines)
    print(final_num)
