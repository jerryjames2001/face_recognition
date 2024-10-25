import os
from datetime import datetime, timedelta
import cv2 as cv
import numpy as np
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')  # Update with your MongoDB URI if needed
db = client['mini_project']  # Use your existing database
logs_collection = db['logs']  # Collection for logs

# Define the directory to save log images
log_image_dir = r'D:\face_recognition\Face-Recognition-System\logs'
os.makedirs(log_image_dir, exist_ok=True)  # Create the directory if it doesn't exist

# Enable OpenCL
cv.ocl.setUseOpenCL(True)
print("OpenCL enabled:", cv.ocl.useOpenCL())

# Load Haar cascades
harr_cascade = cv.CascadeClassifier('Face-Recognition-System/recognition/harr_face.xml')
eye_cascade = cv.CascadeClassifier('Face-Recognition-System/recognition/haarcascade_eye.xml')

# Load trained model
face_recognizer = cv.face.LBPHFaceRecognizer_create()
face_recognizer.read('Face-Recognition-System/recognition/face_trained.yml')

# Load saved labels from the training period
people = np.load('Face-Recognition-System/recognition/labels.npy', allow_pickle=True)
print("Loaded people labels:", people)

# people = []
# for i in os.listdir(r'D:\c programs\opencv\dataset'):
#     people.append(i)

capture = cv.VideoCapture(0)

while True:
    isTrue, frame = capture.read()
    
    if not isTrue:
        break

    grey = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
    faces_rect = harr_cascade.detectMultiScale(grey, scaleFactor=1.1, minNeighbors=4)
    
    for (x, y, w, h) in faces_rect:
        face_roi = grey[y:y+h, x:x+w]  # Region of Interest (ROI) for the face
        eyes = eye_cascade.detectMultiScale(face_roi)
        label, confidence = face_recognizer.predict(face_roi)
        
        if confidence < 55:  # Adjust confidence threshold
            name = people[label]
            cv.putText(frame, f'{name} ({confidence:.2f})', (x, y - 10), cv.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

            # Check for existing logs for the recognized person
            now = datetime.now()
            min_time = now - timedelta(minutes=1)

            existing_log = logs_collection.find_one({
                'suspect_id': label,
                'time': {'$gte': min_time}
            })

            if existing_log is None:  # If no log exists within the last minute
                # Save the screenshot as an image file
                screenshot_path = os.path.join(log_image_dir, f'{name}_{now.strftime("%Y%m%d_%H%M%S")}.jpg')
                cv.imwrite(screenshot_path, frame[y:y+h, x:x+w])  # Save the image to disk

                # Create a log entry
                log_entry = {
                    'suspect_id': label,
                    'screenshot': screenshot_path,  # Store the path to the saved image
                    'time': now,
                    'cam_id': 1  # Replace with your cam ID logic
                }
                logs_collection.insert_one(log_entry)
                print(f"Logged: {log_entry}")
        else:
            cv.putText(frame, 'Unknown', (x, y - 10), cv.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
        
        # Draw a rectangle around the face
        cv.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

    cv.imshow("Detected Face", frame)

    if cv.waitKey(1) & 0xFF == ord('q'):
        break

capture.release()
cv.destroyAllWindows()
