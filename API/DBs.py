from IDs import create_ID, create_path
from DB_tools import DB_COMMIT, DB_JSON, password_hash_create

# ! TODO
def auth_new_user(email,password):
        user_id = create_ID()
        password = password_hash_create(password)
        DB_COMMIT(f"INSERT INTO `LycAuth`\
            (`user_id`, `email`, `password`, `auth`)\
                VALUES ('{user_id}','{email}','{password}',false)")
        
        return user_id

def sing_new_user(user_id, lastname, firstname, grade, email):    
    DB_COMMIT(f"INSERT INTO `LycUsers`\
        (`user_id`,`lastname`,`firstname`,`grade`,`email`, `count`, `eventlist`) \
        VALUES ('{user_id}','{lastname}', '{firstname}', '{grade}', '{email}', 0, '[]');")    
    return ""


def show_all_users():
    users = DB_JSON("SELECT * FROM LycUsers")
    return users
    
def show_user():
    return

def check_user(user_ID):
    return

def check_user_is_admin(user_ID):
    return


