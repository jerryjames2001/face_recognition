import cv2 as cv
import numpy as np
import os

# Enable OpenCL
cv.ocl.setUseOpenCL(True)
print("OpenCL enabled:", cv.ocl.useOpenCL())

# Load Haar cascades
harr_cascade = cv.CascadeClassifier('recognition/harr_face.xml')
eye_cascade = cv.CascadeClassifier('recognition/haarcascade_eye.xml')

# Load trained model
face_recognizer = cv.face.LBPHFaceRecognizer_create()
face_recognizer.read('recognition/face_trained.yml')

# Load people labels
people = []
for i in os.listdir(r'D:\c programs\opencv\dataset'):
    people.append(i)

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
        
        # Get the center between the eyes
        center = (int((left_eye[0] + right_eye[0]) / 2), int((left_eye[1] + right_eye[1]) / 2))
        
        # Ensure center is in correct format
        if isinstance(center, tuple) and len(center) == 2 and all(isinstance(c, int) for c in center):
            # Get the rotation matrix5 for the calculated angle
            M = cv.getRotationMatrix2D(center, angle, 1)
            
            # Rotate the image to align the face
            aligned_face = cv.warpAffine(face, M, (face.shape[1], face.shape[0]))
            return aligned_face
        else:
            raise ValueError("Center must be a tuple of two integers.")
    return face

def rescale_frame(frame, scale):
    """Rescale frame to display in a good way."""
    width = int(frame.shape[1] * scale)
    height = int(frame.shape[0] * scale)
    dimensions = (width, height)
    return cv.resize(frame, dimensions, interpolation=cv.INTER_AREA)

capture = cv.VideoCapture(0)

while True:
    isTrue, frame = capture.read()
    
    if not isTrue:
        break
    
    # Rescale frame for display
    img = rescale_frame(frame, scale=0.9)
    
    # Convert img to UMat for GPU processing if desired
    img_umat = cv.UMat(img)
    grey = cv.cvtColor(img_umat, cv.COLOR_BGR2GRAY)
    grey_np = grey.get()  # Convert UMat to NumPy array for further processing

    faces_rect = harr_cascade.detectMultiScale(grey_np, scaleFactor=1.1, minNeighbors=4)
    
    for (x, y, w, h) in faces_rect:
        face_roi = grey_np[y:y+h, x:x+w]  # Region of Interest (ROI) for the face
        
        # Detect eyes within the face region for alignment
        eyes = eye_cascade.detectMultiScale(face_roi)
        
        # Align the face based on detected eyes
        aligned_face = align_face(face_roi, eyes)
        
        # Predict the label of the face
        label, confidence = face_recognizer.predict(aligned_face)
        
        if confidence < 55:  # Set a threshold for confidence
            name = people[label]
            cv.putText(img, f'{name} ({confidence:.2f})', (x, y - 10), cv.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)
        else:
            cv.putText(img, 'Unknown', (x, y - 10), cv.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
        
        # Draw a rectangle around the face
        cv.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
    
    cv.imshow("Detected Face", img)

    if cv.waitKey(1) & 0xFF == ord('q'):
        break

capture.release()
cv.destroyAllWindows()
