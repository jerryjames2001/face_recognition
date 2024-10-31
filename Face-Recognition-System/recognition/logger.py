import os
import cv2 as cv
import numpy as np
from pymongo import MongoClient
from datetime import datetime, timedelta
import sys

# Receive IP address from arguments
camera_ip = sys.argv[1]
camera_url = f'http://{camera_ip}/video'

# Connect to the camera
capture = cv.VideoCapture(camera_url)
if not capture.isOpened():
    print(f"Error: Unable to connect to the camera at {camera_ip}")
    sys.exit(1)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['mini_project']
logs_collection = db['logs']

# Directory for saving log images
log_image_dir = r'D:\face_recognition\Face-Recognition-System\logs'
os.makedirs(log_image_dir, exist_ok=True)

# Enable OpenCL
cv.ocl.setUseOpenCL(True)

# Load Haar cascades and trained model
harr_cascade = cv.CascadeClassifier(r'D:\face_recognition\Face-Recognition-System\recognition\harr_face.xml')
eye_cascade = cv.CascadeClassifier(r'D:\face_recognition\Face-Recognition-System\recognition\haarcascade_eye.xml')
face_recognizer = cv.face.LBPHFaceRecognizer_create()
face_recognizer.read(r'D:\face_recognition\Face-Recognition-System\recognition\face_trained.yml')
people = np.load(r'D:\face_recognition\Face-Recognition-System\recognition\labels.npy', allow_pickle=True)

# Main capture loop
while True:
    isTrue, frame = capture.read()
    if not isTrue:
        break

    grey = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
    faces_rect = harr_cascade.detectMultiScale(grey, scaleFactor=1.1, minNeighbors=4)

    for (x, y, w, h) in faces_rect:
        face_roi = grey[y:y+h, x:x+w]
        label, confidence = face_recognizer.predict(face_roi)

        if confidence < 55:  # Adjust threshold as needed
            name = people[label]
            cv.putText(frame, f'{name} ({confidence:.2f})', (x, y - 10), cv.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

            now = datetime.now()
            min_time = now - timedelta(minutes=1)

            existing_log = logs_collection.find_one({
                'suspect_id': label,
                'time': {'$gte': min_time}
            })

            if existing_log is None:
                screenshot_path = os.path.join(log_image_dir, f'{name}_{now.strftime("%Y%m%d_%H%M%S")}.jpg')
                cv.imwrite(screenshot_path, frame[y:y+h, x:x+w])
                log_entry = {'suspect_id': label, 'screenshot': screenshot_path, 'time': now, 'cam_id': camera_ip}
                logs_collection.insert_one(log_entry)
        else:
            cv.putText(frame, 'Unknown', (x, y - 10), cv.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)

        cv.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

    cv.imshow("Detected Face", frame)
    if cv.waitKey(1) & 0xFF == ord('q'):
        break

capture.release()
cv.destroyAllWindows()
