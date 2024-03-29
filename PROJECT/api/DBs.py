from IDs import create_ID, create_path
from DB_tools import DB_COMMIT, DB_JSON, DB_FETCH_ONE, DB_CHECK_EXISTENCE, \
password_hash_create, password_hash_check, current_date

# ! TODO обработка ошибок

# ---ПРОВЕРКА ПОЛЬЗОВАТЕЛЕЙ---
def check_user(user_ID):    
    exists = DB_CHECK_EXISTENCE("""SELECT COUNT(1) FROM lycusers \
        WHERE user_id = %(user_ID)s""",{'user_ID':user_ID})
    return exists

def check_admin(session_token):
    exists = DB_CHECK_EXISTENCE("""SELECT COUNT(1) FROM lycauth WHERE `user_id`=%(user_id)s AND `auth`=1;""", 
                                {'user_id':session_token})    
    return exists

# ---ДОБАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ В СИСТЕМУ---
def auth_new_user(email,password):
        user_id = create_ID()
        password = password_hash_create(password)
        DB_COMMIT("""INSERT INTO `lycauth`
            (`user_id`, `email`, `password`, `auth`)\
            VALUES (%(user_id)s,%(email)s,%(password)s,false)""",
            {
                'user_id':user_id,
                'email':email,
                'password':password
            })
        
        return user_id
    
    
def check_email(email):
    exists = DB_CHECK_EXISTENCE("""SELECT COUNT(1) FROM lycusers WHERE `email`=%(email)s""", 
                                {'email':email})    
    
    return exists

# ! Сделать проверку на уникальность почты
def sign_new_user(user_id, lastname, firstname, grade, email):    
    DB_COMMIT("""INSERT INTO `lycusers`
        (`user_id`,`lastname`,`firstname`,`grade`,`email`, `count`) 
        VALUES (%(user_id)s,%(lastname)s, %(firstname)s, %(grade)s, %(email)s, 0)""",{
            'user_id':user_id,
            'lastname':lastname,
            'firstname':firstname,
            'grade':grade,
            'email':email})
        
    return ""

def login_user(email, password):
    try:
     
        account = DB_FETCH_ONE("SELECT * FROM lycauth WHERE email=%(email)s", {'email':email})
    except:
        account = []
    if len(account)==0:
        return ''
    else:
        user_id = account[0]
        hash_password = account[2]

        if password_hash_check(hash_password, password):
            return user_id
        
    
    
        
    return ''


    





# ---ОБЫЧНЫЙ ПОЛЬЗОВАТЕЛЬ В СИСТЕМЕ---    

# --ЛИЧНЫЙ КАБИНЕТ--   
def show_score(session_token):
    user = DB_FETCH_ONE("""SELECT * FROM `lycusers` WHERE `user_id` = %(session_token)s""",{"session_token":session_token})   
    
    return {'lastname': user[1], 'firstname': user[2], 'count': user[5], 'events': user[6]}

def show_user_events(session_token):
    event_list = DB_JSON("""
                         SELECT lycevents.title, lycvisits.event_id FROM lycevents
        INNER JOIN lycvisits ON
            lycvisits.event_id = lycevents.event_id 
            WHERE lycvisits.user_id = %(session_token)s""",{'session_token':session_token})
    
    return event_list

def add_comment(session_token,comment,event_id):
    DB_COMMIT( """INSERT INTO user_comments
        (user_id, event_id,comment, comment_time) 
        VALUES (%(user_id)s,%(event_id)s, %(comment)s,now())""",
        {'user_id':session_token, 'event_id':event_id, 'comment':comment})
    return

# --ПОСЕЩЕНИЕ ИВЕНТА--
def show_event(event_PATH):    
    # делает проверку, есть ли ивент с таким путем. Если есть, возращает инфу
    event = DB_FETCH_ONE("""SELECT * FROM `lycevents` WHERE `url` = %(event_PATH)s""",
                         {'event_PATH':event_PATH}
                         )
    
    return {"event_id":event[0],"title":event[1], 
            "description":event[2], "value": event[3], "dynamic":bool(event[4])}

    
def add_points_to_user(session_token, value, event_id):
    # уеличиваем баллы у пользователя
    DB_COMMIT("""UPDATE `lycusers` \
        SET `count` =`count`+ %(value)s WHERE `user_id`= %(session_token)s""",
        {"value":value,
         "session_token":session_token})
    
    return


# ---АДМИН В СИСТЕМЕ--- 

# --СКОРБОРД--
def show_all_users():
    users = DB_JSON("SELECT * FROM lycusers",{})
    return users

# --СТРАНИЦА ИВЕНТОВ--
def create_event(title, description, value, dynamic=False):
    event_ID = create_ID()
    event_url = create_path()
    
    DB_COMMIT("""INSERT INTO `lycevents`
            (`event_id`,`title`,`description`,`value`,`dynamic`, `url`, `activated`, `create_time`) 
            VALUES 
            (%(event_id)s,%(title)s, %(description)s,%(value)s, %(dynamic)s, %(event_url)s, true,now());""",{
                'event_id':event_ID,
                'title': title,
                'description': description,
                'value':value,
                'dynamic':dynamic,
                'event_url':event_url
            })
    
    return {'event_ID': event_ID, 'event_url':event_url}

def edit_event(event_id, title, description,value):
    try:
        DB_COMMIT("""UPDATE `lycevents` SET title=%(title)s, description=%(description)s, value=%(value)s 
              WHERE `event_id`=%(event_id)s""",
              {'title':title,
               'description':description,
               'value':value,
               'event_id':event_id})
    except Exception as e:
        print(str(e))
        
    return 

def delete_event(event_id):
    DB_COMMIT("""DELETE FROM `lycvisits` WHERE `event_id`=%(event_id)s;""", 
              {'event_id':event_id})
    DB_COMMIT("""DELETE FROM `lycevents` WHERE `event_id`=%(event_id)s;""", 
              {'event_id':event_id})
    
    return

def reactivate_event(event_id):
    DB_COMMIT(""" 
              UPDATE lycevents SET activated = NOT activated WHERE event_id=%(event_id)s
              """, {"event_id":event_id})
    return
    
    
    
def show_all_events():
    events = DB_JSON("SELECT * FROM `lycevents` ORDER BY create_time ASC",{})
    return events

# --ЛОГИ--
def show_logs():
    logs = DB_JSON(""" 
                SELECT (@cnt := @cnt + 1) AS log_id, lycusers.lastname, lycusers.firstname, 
                lycevents.title, lycevents.activated, lycvisits.visit_time, lycvisits.event_id
                FROM lycvisits
                INNER JOIN lycusers ON lycvisits.user_id = lycusers.user_id
                INNER JOIN lycevents ON lycevents.event_id = lycvisits.event_id 
                CROSS JOIN (select @cnt :=0) as increment
                ORDER BY lycvisits.visit_time ASC
                """, {})
        
    return logs

def show_comments():
    comments = DB_JSON(""" 
    SELECT lycevents.event_id, 
    lycevents.title, 
    lycevents.activated,
    user_comments.comment_time,
    user_comments.comment,
    user_comments.event_id,
    user_comments.comment_id FROM lycevents 
    INNER JOIN user_comments 
    ON user_comments.event_id = lycevents.event_id 
    ORDER BY user_comments.comment_time ASC
                       """, {})
    return comments


# ---ДЕЙСТВИЯ ИВЕНТОВ---
def check_dynamic(event_id):
    exists = DB_CHECK_EXISTENCE("""SELECT COUNT(1) FROM lycevents WHERE `event_id`=%(event_id)s AND `dynamic`=true""",{'event_id':event_id})
    return exists

def change_dynamic_event(event_id):
    new_url = create_path()
    DB_COMMIT("""UPDATE `lycevents` SET url=%(new_url)s WHERE `event_id`=%(event_id)s""",
              {'new_url':new_url,
               'event_id':event_id})
        
    return {'event_id':event_id, 'event_url':new_url}



def check_visited(session_token, event_id):
    visited = DB_CHECK_EXISTENCE("""SELECT COUNT(1) FROM lycvisits WHERE
        `event_id` = %(event_id)s and `user_id` = %(session_token)s""",
        {'event_id':event_id,
         'session_token':session_token})
    
    return visited

def check_activated(event_id):
    activated = DB_CHECK_EXISTENCE(""" 
                                   SELECT COUNT(1) FROM lycevents WHERE
        `event_id` = %(event_id)s and `activated` = true
                                   """,{'event_id':event_id} )
    return activated

def add_visit(session_token, event_id):
    visit_time = current_date()
    
    DB_COMMIT("""INSERT INTO `lycvisits` (`event_id`,`user_id`,`visit_time`) 
        VALUES (%(event_id)s,%(session_token)s, now())""",
        {'event_id':event_id,
         'session_token':session_token})
    
    
    return






