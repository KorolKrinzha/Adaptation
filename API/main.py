import time 
from flask import Flask, request
from QRs import create_QR




app = Flask(__name__)

@app.route("/api/createevent")
def create_new_event():
    event_URL = QR_generator()
    return {'url': f'event/{event_URL}'}

@app.route("/api/signuser", methods=['POST'])
def create_new_user():
    print(request.data)
    return "OK"

@app.route("/api/user")
def show_user_info():
    return ""

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}
