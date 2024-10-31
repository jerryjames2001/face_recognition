import cv2 as cv
import argparse
import sys

print("Starting Connection Check")

# Parse arguments for IP address
parser = argparse.ArgumentParser(description="Connect to camera IP address")
parser.add_argument("ipaddress", type=str, help="IP address of the camera")
args = parser.parse_args()
camera_ip = args.ipaddress
camera_url = f'http://{camera_ip}/video'

# Attempt to connect to the camera URL
capture = cv.VideoCapture(camera_url)
if not capture.isOpened():
    print(f"Error: Unable to connect to the camera at {camera_ip}")
    sys.exit(1)  # Exit with non-zero code for failure

print("Camera connection successful")
capture.release()
sys.exit(0)  # Exit with code 0 for success
