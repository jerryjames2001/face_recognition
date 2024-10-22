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
eye_cascade = cv.CascadeClassifier('recognition/haarcascade_eye.xml')

features = []
labels = []

def preprocess_image(image):
    """Preprocess the image by applying several enhancements."""
    # Convert to grayscale (already implemented)
    grey = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
    
    # Apply histogram equalization for better contrast
    grey_eq = cv.equalizeHist(grey)
    
    # Normalize the pixel values to [0, 1]
    normalized = grey_eq / 255.0
    
    return normalized

def align_face(face, eyes):
    """Align face based on the positions of the eyes."""
    if len(eyes) == 2:
        eye1 = eyes[0]
        eye2 = eyes[1]

        if eye1[0] < eye2[0]:
            left_eye, right_eye = eye1, eye2
        else:
            left_eye, right_eye = eye2, eye1

        delta_x = right_eye[0] - left_eye[0]
        delta_y = right_eye[1] - left_eye[1]
        angle = np.degrees(np.arctan2(delta_y, delta_x))
        
        center = (int((left_eye[0] + right_eye[0]) // 2), int((left_eye[1] + right_eye[1]) // 2))
        
        M = cv.getRotationMatrix2D(center, angle, 1)
        
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
            
            # Preprocess the image
            processed_img = preprocess_image(img_array)
            
            # Detect faces
            faces_rect = harr_cascade.detectMultiScale(processed_img, scaleFactor=1.1, minNeighbors=4)
            
            for (x, y, w, h) in faces_rect:
                face_roi = processed_img[y:y+h, x:x+w]  # Extract the face region
                
                # Detect eyes within the face region for alignment
                eyes = eye_cascade.detectMultiScale(face_roi)
                
                # Align the face based on detected eyes
                aligned_face = align_face(face_roi, eyes)
                
                # Resize face to a fixed size (e.g., 80x80)
                resized_face = cv.resize(aligned_face, (80, 80))
                
                # Store the processed face and its corresponding label
                features.append(resized_face)
                labels.append(label)

create_train()
print("Training done-----------------")

# Convert features and labels to numpy arrays
features = np.array(features, dtype='object')
labels = np.array(labels)

# Train the recognizer
face_recognizer = cv.face.LBPHFaceRecognizer_create()
face_recognizer.train(features, labels)

# Save the trained model
face_recognizer.save('recognition/face_trained.yml')

# Save features and labels for future use
np.save('recognition/features.npy', features)
np.save('recognition/labels.npy', labels)
