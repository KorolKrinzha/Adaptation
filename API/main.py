import time 
from flask import Flask, request
# from flaskext.mysql import MySQL
import mysql.connector
import env
from DBs import sing_new_user, auth_new_user, show_all_users


from QRs import create_QR





app = Flask(__name__)

@app.route("/api")
def test_connection():
    lastname = "Смирнов"
    firstname = "Артем"
    grade = "Матинфо"
    email = "e@mail.ru"
    password = "******"
    user_id = auth_new_user(email, password)
    print(user_id)

    sing_new_user(user_id, lastname, firstname, grade, email)

    
    
    
    return "Пользователь зареган"

@app.route("/api/users")
def show_users():
    return show_all_users()
    
    






@app.route("/api/createevent")
def create_new_event():
    event_URL = create_QR()
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
