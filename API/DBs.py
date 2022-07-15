from IDs import create_ID, create_path
from DB_tools import DB_COMMIT, DB_JSON, DB_FETCH_ONE, DB_CHECK_EXISTENCE, \
password_hash_create, password_hash_check, current_date

# ! TODO


def auth_new_user(email,password):
        user_id = create_ID()
        password = password_hash_create(password)
        DB_COMMIT(f"INSERT INTO `LycAuth`\
            (`user_id`, `email`, `password`, `auth`)\
                VALUES ('{user_id}','{email}','{password}',false)")
        
        return user_id

# ! Сделать проверку на уникальность почты
def sign_new_user(user_id, lastname, firstname, grade, email):    
    DB_COMMIT(f"INSERT INTO `LycUsers`\
        (`user_id`,`lastname`,`firstname`,`grade`,`email`, `count`, `eventlist`) \
        VALUES ('{user_id}','{lastname}', '{firstname}', '{grade}', '{email}', 0, '[]');")    
    return ""

def login_user(email, password):
    try:
     
        account = DB_FETCH_ONE(f"SELECT * FROM LycAuth WHERE email='{email}'")
    except:
        account = []
    if len(account)==0:
        return "Login Failed"
    else:
        user_id = account[0]
        hash_password = account[2]

        if password_hash_check(hash_password, password):
            return user_id
    
        
    return "Login Failed"
    

def show_all_users():
    users = DB_JSON("SELECT * FROM LycUsers")
    return users
    
def show_user(session_token):
    # print(session_token)
    user = DB_FETCH_ONE(f"SELECT * FROM `lycusers` WHERE `user_id` = '{session_token}'")
    
    
    return {'lastname': user[1], 'firstname': user[2], 'count': user[5], 'events': user[6]}

def show_user_events(session_token):
    event_list = DB_JSON(f"SELECT lycevents.title, lycvisits.event_id FROM lycevents \
        INNER JOIN lycvisits ON \
            lycvisits.event_id = lycevents.event_id where lycvisits.user_id = '{session_token}'")
    
    return event_list

def check_user(user_ID):
    
    exists = DB_CHECK_EXISTENCE(f"SELECT COUNT(1) FROM lycusers \
        WHERE user_id = '{user_ID}'")
    return exists

def check_admin(user_ID):
    
    return

def create_event(title, description, value, dynamic=False):
    event_ID = create_ID()
    event_url = create_path()
    DB_COMMIT(f"INSERT INTO `LycEvents`\
        (`event_id`,`title`,`description`,`value`,`dynamic`, `url`) \
        VALUES \
            ('{event_ID}','{title}', '{description}',{value}, {dynamic}, '{event_url}');")
    return {'event_ID': event_ID, 'event_url':event_url}

def show_event(event_PATH):
    
    # делает проверку, есть ли ивент с таким путем. Если есть, возращает инфу
    event = DB_FETCH_ONE(f"SELECT * FROM `lycevents` WHERE `url` = '{event_PATH}'")
    try:
    
        return {"event_id":event[0],"title":event[1], 
            "description":event[2], "value": event[3], "dynamic":bool(event[4])}
    except:
        return ''
    
    
def show_all_events():
    events = DB_JSON("SELECT * FROM `lycevents`")
    return events

#  Проверяет, статичный ли ивент. Если нет, 
def check_dynamic(event_id):
    exists = DB_CHECK_EXISTENCE(f"SELECT COUNT(1) FROM lycevents WHERE `event_id`='{event_id}' AND `dynamic`=1")
    return exists

def change_dynamic_event(event_id):
    new_url = create_path()
    DB_COMMIT(f"UPDATE `lycevents` SET url='{new_url}' WHERE `event_id`='{event_id}'")
        
    return {'event_id':event_id, 'event_url':new_url}

def add_points_to_user(session_token, value, event_id):
    # уеличиваем баллы у пользователя
    DB_COMMIT(f"UPDATE `lycusers` \
        SET `count` =`count`+ {value} WHERE `user_id`= '{session_token}'")
    
    return

def check_visited(session_token, event_id):
    visited = DB_CHECK_EXISTENCE(f"SELECT COUNT(1) FROM lycvisits WHERE \
        `event_id` = '{event_id}' and `user_id` = '{session_token}'")
    
    return visited

def add_visit(session_token, event_id):
    visit_time = current_date()
    DB_COMMIT(f"INSERT INTO `lycvisits` (`event_id`,`user_id`,`visit_time`) \
        VALUES ('{event_id}','{session_token}', date(now()))")
    
    
    return

def editevent(event_id, title, description,value):
    try:
        DB_COMMIT(f"UPDATE `lycevents` SET title='{title}', description='{description}', value={value} \
              WHERE `event_id`='{event_id}'")
    except Exception as e:
        print(str(e))
        
    return 

