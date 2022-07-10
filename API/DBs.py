from IDs import create_ID, create_path
from DB_tools import DB_COMMIT, DB_JSON, DB_FETCH_ONE, DB_CHECK_EXISTENCE, \
password_hash_create, password_hash_check

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
    
def show_user():
    return

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
    
    return {"event_id":event[0],"title":event[1], 
            "description":event[2], "value": event[3], "dynamic":bool(event[4])}

#  Проверяет, статичный ли ивент. Если нет, 
def change_dynamic_event(event_id):
    return

def add_points_to_user(session_token, value, event_id):
    check_event_complision(session_token, event_id)
    # уеличиваем баллы у пользователя
    DB_COMMIT(f"UPDATE `lycusers` \
        SET `count` =`count`+ {value} WHERE `user_id`= '{session_token}'")
    
    return

def check_visited(session_token, event_id):
    
    return False

def add_visit(session_token, event_id):
    
    return

def check_event_complision(session_token, event_id):
    return