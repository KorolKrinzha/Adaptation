import time 
from functools import wraps
from flask import Flask, request, send_from_directory, abort
import mysql.connector
import env
import json


# взаиодействие с пользователями
from DBs import sign_new_user, login_user, auth_new_user, check_admin, check_user

# взаимодействие обычного пользователя с ивентами
from DBs import show_event, check_visited, add_points_to_user, add_visit, check_dynamic, change_dynamic_event, show_score, show_user_events 

# взаимодействие админа с ивентами и пользователями
from DBs import show_all_events, show_all_users, create_event, edit_event, delete_event

from QRs import create_QR
from DB_tools import export_to_csv




app = Flask(__name__)


def admin_role(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        try:
            session_token = request.cookies['session_token']
            if check_admin(session_token): return f(*args, **kwargs)
            else: return abort(404)
        except: return abort(404)
    return wrap

def user_role(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        try:
            session_token = request.cookies['session_token']
            if check_user(session_token): return f(*args, **kwargs)
            else: return abort(404)
        except: return abort(404)
    return wrap
    

def api_check_user(request):
    if 'session_token' in request.cookies:        
        session_token = request.cookies['session_token']
        
        return check_user(session_token)
    else:
        return False    

def api_check_admin(request):
    if 'session_token' in request.cookies:        
        session_token = request.cookies['session_token']
        
            
        return check_admin(session_token)
    else:
        return False
    

# @app.route("/api/check_user", methods=['POST'])


# @app.route("/api/check_admin", methods=['POST', 'GET'])




@app.route("/api", methods=['GET'])
@user_role
def test_connection():    
    return "WELCOME TO API"

@app.route("/api/admin", methods=['GET'])
@admin_role
def test_admin():
    return "WELCOME TO API:ADMIN"
    

@app.route("/api/admin/users")
def api_admin_users():
    return show_all_users()
    
    
@app.route("/api/admin/events")
def api_admin_events():
    return show_all_events()




@app.route("/api/admin/createevent", methods=['POST'])
def api_admin_createevent():
    post_data = request.data
    data_json = json.loads(post_data.decode('utf-8'))
    title = data_json['title']
    description = data_json['description']
    value = data_json['value']
    dynamic = True if data_json['dynamic']=='on' else False
    event_creditentials = create_event(title, description, value, dynamic)
    create_QR(event_creditentials['event_ID'], event_creditentials['event_url'])
    
    
    
    
    return {'url': f'event/{title}'}


@app.route("/api/admin/deleteevent", methods=['POST'])
def api_admin_deleteevent():
    post_data = request.data
    try:
        data_json = json.loads(post_data.decode('utf-8'))
    except:
        return
    event_id = data_json['event_id']
    try:
        delete_event(event_id)
        return {'statusSuccess':True}
    except:
        return {'statusSuccess':False}
    
    return ''

@app.route("/api/admin/editevent", methods=['POST'])
def api_admin_editevent():
    post_data = request.data
    try:
        data_json = json.loads(post_data.decode('utf-8'))
    except Exception as e:
        print(str(e))
    event_id = data_json['event_id']
    title = data_json['title']
    description = data_json['description']
    value = data_json['value']
    print(event_id)
    try:
        edit_event(event_id, title, description, value)
        
        return {'statusSuccess':True}
    except:
        return {'statusSuccess':False}

    
    

@app.route("/api/signuser", methods=['POST'])
def api_signuser():
    try:
        post_data = request.data
        data_json = json.loads(post_data.decode('utf-8'))
        firstname = data_json['firstname']
        lastname = data_json['lastname']
        grade = data_json['grade']

        email = data_json['email']
        password = data_json['password']
        
        user_id = auth_new_user(email, password)
        sign_new_user(user_id, lastname, firstname, grade, email)
        
        return {'statusSuccess':True, 'session_token':user_id}
    except:
        return {'statusSuccess':False}
        
    
@app.route("/api/loginuser", methods=['POST'])
def api_loginuser():
    
    try:
        post_data = request.data
        data_json = json.loads(post_data.decode('utf-8'))

        email = data_json['email']
        password = data_json['password']
        user_id = login_user(email, password) 
        if user_id!="Login Failed":
            return {'statusSuccess':True, 'session_token':user_id}
        
        return {'statusSuccess':False}
        

    except:
        return {'statusSuccess':False}


@app.route('/api/event/<event_PATH>', methods=['POST'])
def api_event(event_PATH):
    if 'session_token' in request.cookies:
        
        session_token = request.cookies['session_token']
        
        response = show_event(event_PATH)    
        if not check_visited(session_token, response["event_id"]):
            
            add_points_to_user(session_token, response['value'], response['event_id'])
            add_visit(session_token, response['event_id'])
            
        if check_dynamic(response['event_id']):
            print("saaaas")
            
            new_event_creditentials = change_dynamic_event(response["event_id"])
            create_QR(new_event_creditentials['event_id'], new_event_creditentials['event_url'])
        
        return response
        
            

    else:
        return {'statusSuccess':False}
    
    
    
    return {'statusSuccess':False}
         

@app.route("/api/score", methods=['POST'])
def api_score():
    session_token = request.cookies['session_token']
    user_info = show_score(session_token)     
    
    return user_info

@app.route("/api/score/events", methods=['GET'])
def api_score_events():
    session_token = request.cookies['session_token']
    events = show_user_events(session_token)
    
    
    return events

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

@app.route("/api/export/users/csv", methods=['GET'])
def api_export_users():
    filename = export_to_csv("lycusers")
    return send_from_directory('../public/CSV', filename, as_attachment=True)

@app.route("/QR/<event_id>")
def QR_event(event_id):
    try:
        filename = f'{event_id}.png'
        return send_from_directory('../public/QR/', filename)
    except:
        abort(404)
    
