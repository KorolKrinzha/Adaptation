from IDs import create_ID, create_path
from DB_tools import DB_COMMIT, DB_JSON, DB_FETCH_ONE, password_hash_create, password_hash_check

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
    return

def check_user_is_admin(user_ID):
    return


def show_event(event_PATH):
    # делает проверку, есть ли ивент с таким путем. Если есть, возращает инфу
    event_id = "123"
    title = "Sas"
    description = "sas"
    value = 1
    return {"event_id":123,"title":event_PATH, "description":description, "value": value}

#  Проверяет, статичный ли ивент. Если нет, 
def change_dynamic_event(event_id):
    return
