import time 
from functools import wraps
from flask import Flask, request, send_from_directory, abort, Response
import mysql.connector
import env
import json


# взаиодействие с пользователями
from DBs import sign_new_user, check_email, login_user, auth_new_user, check_admin, check_user

# взаимодействие обычного пользователя с ивентами
from DBs import show_event, check_visited, add_points_to_user, add_visit, check_dynamic, change_dynamic_event, show_score, show_user_events 

# взаимодействие админа с ивентами и пользователями
from DBs import show_all_events, show_all_users, show_logs, create_event, edit_event, delete_event

from QRs import create_QR, update_QR,export_QR_codes, delete_QR
from DB_tools import export_to_csv




app = Flask(__name__)

# ---Protected routes---
def admin_role(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        try:
            session_token = request.cookies['session_token']
            if check_admin(session_token): return f(*args, **kwargs)
            else: return abort(404)
        except Exception as e: 
            print(e)
            return abort(404)
    return wrap

def user_role(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        try:
            session_token = request.cookies['session_token']
            if check_user(session_token): return f(*args, **kwargs)
            else: return abort(404)
        except Exception as e: 
            print(e)
            return abort(404) 
    return wrap
    


# ---ПРОВЕРКА ПОЛЬЗОВАТЕЛЕЙ---

@app.route("/api/check_user", methods=['POST', 'GET'])
def api_check_user():
    if 'session_token' in request.cookies:        
        session_token = request.cookies['session_token']
        try:
            response = str(check_user(session_token))
            return response
        except:
            return str(False) 
        
    else:
        return str(False)    


@app.route("/api/check_admin", methods=['POST', 'GET'])
def api_check_admin():
    if 'session_token' in request.cookies:        
        session_token = request.cookies['session_token']
        try:
            response = str(check_admin(session_token))
            return response
        except:
            return str(False) 
        
    else:
        return str(False)    


# ---ТЕСТИРОВАНИЕ API---
@app.route("/api", methods=['GET'])
def test_connection():    
    return "WELCOME TO API"


@app.route("/api/user", methods=['GET'])
@user_role
def test_user():    
    return "WELCOME TO API:USER"


@app.route("/api/admin", methods=['GET'])
@admin_role
def test_admin():
    return "WELCOME TO API:ADMIN"
    

    
    
# ---ДОБАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ В СИСТЕМУ---
@app.route("/api/signuser", methods=['POST'])
def api_signuser():
    post_data = request.data
    data_json = json.loads(post_data.decode('utf-8'))
    firstname = data_json['firstname']
    lastname = data_json['lastname']
    grade = data_json['grade']

    email = data_json['email']
    password = data_json['password']  
    if not(check_email(email)):     
        try:   
            user_id = auth_new_user(email, password)
            sign_new_user(user_id, lastname, firstname, grade, email)
            return {'session_token':user_id}
        except Exception as e:
            print(e)
            return Response(response='Ошибка при регистрации. Пожалуйста, попробуйте еще раз', status=500)
    else: return Response(response='Данная почта уже используется. Пожалуйста, попробуйте еще раз', status=500)
        
        
    
    return Response(response='Ошибка при регистрации. Пожалуйста, попробуйте еще раз', status=500)
        
    
@app.route("/api/loginuser", methods=['POST'])
def api_loginuser():
    
    try:
        post_data = request.data
        data_json = json.loads(post_data.decode('utf-8'))

        email = data_json['email']
        password = data_json['password']
        user_id = login_user(email, password) 
        if (len(user_id)>0):
            print('!!!')
            return {'session_token':user_id}
        
        return Response(response='Данный аккаунт не найден. Пожалуйста, проверьте введенные даннные',
                        status=500)
        

    except Exception as e:
        print(e)
        return Response(response='Данный аккаунт не найден. Пожалуйста, проверьте введенные даннные',
                        status=500)



         
# ---ОБЫЧНЫЙ ПОЛЬЗОВАТЕЛЬ В СИСТЕМЕ---    
@app.route("/api/score", methods=['POST'])
@user_role
def api_score():
    session_token = request.cookies['session_token']
    try:
        user_info = show_score(session_token)     
    
        return user_info
    except:
        abort(404)

@app.route("/api/score/events", methods=['GET'])
@user_role
def api_score_events():
    session_token = request.cookies['session_token']
    events = show_user_events(session_token)    
    
    return events

@app.route('/api/event/<event_PATH>', methods=['POST'])
@user_role
def api_event(event_PATH):
        
    session_token = request.cookies['session_token']
    
    response = show_event(event_PATH) 
    try:   
        if not check_visited(session_token, response["event_id"]):
            
            add_points_to_user(session_token, response['value'], response['event_id'])
            add_visit(session_token, response['event_id'])
            
        if check_dynamic(response['event_id']):
            
            new_event_creditentials = change_dynamic_event(response["event_id"])
            update_QR(new_event_creditentials['event_id'], new_event_creditentials['event_url'], response['title'])
        
        return response      
    
    except:
        abort(404)
            


    
    
    
    

# ---АДМИН В СИСТЕМЕ---


@app.route("/api/admin/users")
@admin_role
def api_admin_users():
    return show_all_users()
    
    
@app.route("/api/admin/events")
@admin_role
def api_admin_events():
    return show_all_events()


@app.route("/api/admin/logs")
@admin_role
def api_admin_logs():  
    return show_logs()




@app.route("/api/admin/createevent", methods=['POST'])
@admin_role
def api_admin_createevent():
    post_data = request.data
    data_json = json.loads(post_data.decode('utf-8'))
    title = data_json['title']
    description = data_json['description']
    value = data_json['value']
    dynamic = True if data_json['dynamic']=='on' else False
    event_creditentials = create_event(title, description, value, dynamic)
    create_QR(event_creditentials['event_ID'], event_creditentials['event_url'],dynamic, title )
    
    
    
    
    return Response(status=200)


@app.route("/api/admin/deleteevent", methods=['POST'])
@admin_role
def api_admin_deleteevent():
    post_data = request.data
    data_json = json.loads(post_data.decode('utf-8'))
    event_id = data_json['event_id']
    try:
        delete_event(event_id)
        delete_QR(event_id)
        
    except Exception as e:
        print(e)
        return abort(500)
    
    return Response(status=200)

@app.route("/api/admin/editevent", methods=['POST'])
@admin_role
def api_admin_editevent():
    post_data = request.data
    data_json = json.loads(post_data.decode('utf-8'))

    event_id = data_json['event_id']
    title = data_json['title']
    description = data_json['description']
    value = data_json['value']
    
    try:
        edit_event(event_id, title, description, value)
        
        return Response(status=200)
    except:
        return abort(500)


# ---ЭКСПОРТИРОВАНИЕ ФАЙЛОВ---
@app.route("/api/export/users/csv", methods=['GET'])
@admin_role
def api_export_users():
    filename = export_to_csv("lycusers")
    return send_from_directory('./api_public/CSV', filename, as_attachment=True)


@app.route("/api/export/events/zip", methods=['GET'])
@admin_role
def api_export_events():
    filename = export_QR_codes()
    return send_from_directory('./api_public/ZIP', f'{filename}.zip')


# ---ФАЙЛЫ---
@app.route("/QR/<event_id>")
def QR_event(event_id):
    try:
        filename = f'{event_id}.png'
        return send_from_directory('./api_public/QR/', filename)
    except:
        abort(404)
    
@app.route("/QRDYNAMIC/<event_id>")
def QRDYNAMIC_event(event_id):
    try:
        filename = f'{event_id}.png'
        return send_from_directory('./api_public/QRDYNAMIC/', filename)
    except:
        abort(404)


if __name__ == 'main':
    app.run(debug=True, host='0.0.0.0')