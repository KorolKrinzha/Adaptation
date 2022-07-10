import mysql.connector
import env
import json
from werkzeug.security import generate_password_hash, check_password_hash

# ! Дбоваить валидаторы




def DB_COMMIT(statement):
    mydb = mysql.connector.connect(
    host=env.MYSQL_HOST,
    port=3306,
    user= env.MYSQL_USER,
    password = env.MYSQL_PASSWORD,
    database=env.MYSQL_DB    
)
    mycursor = mydb.cursor(buffered=True)

    mycursor.execute(statement)
    mydb.commit()
    
    mydb.close()
    mycursor.close()

    
    return

def DB_JSON(statement):
    mydb = mysql.connector.connect(
    host=env.MYSQL_HOST,
    port=3306,
    user= env.MYSQL_USER,
    password = env.MYSQL_PASSWORD,
    database=env.MYSQL_DB  
        
        )
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute(statement)
    row_headers = [x[0] for x in mycursor.description]
    rv = mycursor.fetchall()
    data = []
    for result in rv[::-1]:
        data.append(dict(zip(row_headers, result)))
    json_data = json.dumps(data)

    mydb.close()
    mycursor.close()

    return json_data


def DB_FETCH_ONE(statement):
    mydb = mysql.connector.connect(
    host=env.MYSQL_HOST,
    port=3306,
    user= env.MYSQL_USER,
    password = env.MYSQL_PASSWORD,
    database=env.MYSQL_DB  
        
        )
    mycursor = mydb.cursor(buffered=True)
    account = mycursor.execute(statement)
    account = list(mycursor.fetchone())
    
    return account

def DB_CHECK_EXISTENCE(statement):
    mydb = mysql.connector.connect(
    host=env.MYSQL_HOST,
    port=3306,
    user= env.MYSQL_USER,
    password = env.MYSQL_PASSWORD,
    database=env.MYSQL_DB  
        
        )
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute(statement)
    row_headers = [x[0] for x in mycursor.description]
    rv = mycursor.fetchall()
    data = []
    for result in rv[::-1]:
        data.append(dict(zip(row_headers, result)))
   
    existence_value = data[0]['COUNT(1)']
    return bool(existence_value)

def password_hash_create(password):
    password_hash = generate_password_hash(password)
    return password_hash

def password_hash_check(hash_password, password):
    
    return check_password_hash(hash_password, password)