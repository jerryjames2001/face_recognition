import os
import numpy as np
import cv2 as cv

# Enable OpenCL
cv.ocl.setUseOpenCL(True)
print("OpenCL enabled:", cv.ocl.useOpenCL())

p = []
dir = r'D:\c programs\opencv\dataset'
for i in os.listdir(dir):
    p.append(i)

harr_cascade = cv.CascadeClassifier('recognition/harr_face.xml')
eye_cascade = cv.CascadeClassifier('recognition/haarcascade_eye.xml')  # Eye detection for alignment

features = []
labels = []

def align_face(face, eyes):
    """Align face based on the positions of the eyes."""
    if len(eyes) == 2:
        # Get the coordinates of the eyes
        eye1 = eyes[0]
        eye2 = eyes[1]
        
        # Determine which eye is left and which is right
        if eye1[0] < eye2[0]:
            left_eye, right_eye = eye1, eye2
        else:
            left_eye, right_eye = eye2, eye1
        
        # Calculate the angle to rotate the face to make eyes horizontal
        delta_x = right_eye[0] - left_eye[0]
        delta_y = right_eye[1] - left_eye[1]
        angle = np.degrees(np.arctan2(delta_y, delta_x))  # Angle in degrees
        
        # Get the center between the eyes and convert to integer
        center = (int((left_eye[0] + right_eye[0]) // 2), int((left_eye[1] + right_eye[1]) // 2))
        
        # Get the rotation matrix for the calculated angle
        M = cv.getRotationMatrix2D(center, angle, 1)
        
        # Rotate the image to align the face
        aligned_face = cv.warpAffine(face, M, (face.shape[1], face.shape[0]))
        return aligned_face
    return face

def create_train():
    for person in p:
        path = os.path.join(dir, person)
        label = p.index(person)
        
        for img in os.listdir(path):
            img_path = os.path.join(path, img)
            
            img_array = cv.imread(img_path)
            grey = cv.cvtColor(img_array, cv.COLOR_BGR2GRAY)
            grey_umat = cv.UMat(grey)  # Convert to UMat to use OpenCL
            faces_rect = harr_cascade.detectMultiScale(grey_umat, scaleFactor=1.1, minNeighbors=4)
            
            for (x, y, w, h) in faces_rect:
                face_roi = grey[y:y+h, x:x+w]  # Region of Interest (ROI) for the face
                
                # Detect eyes within the face region for alignment
                eyes = eye_cascade.detectMultiScale(face_roi)
                
                # Align the face based on detected eyes
                aligned_face = align_face(face_roi, eyes)
                
                features.append(aligned_face)
                labels.append(label)

create_train()
print("Training done-----------------")

features = np.array(features, dtype='object')
labels = np.array(labels)

face_recognizer = cv.face.LBPHFaceRecognizer_create()

# Train the recognizer
face_recognizer.train(features, labels)

# Save the trained model
face_recognizer.save('recognition/face_trained.yml')

# Save features and labels
np.save('recognition/features.npy', features)
np.save('recognition/labels.npy', labels)
