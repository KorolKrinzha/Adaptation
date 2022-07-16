import mysql.connector
import env
import time
import json
import csv
from werkzeug.security import generate_password_hash, check_password_hash

# ! Дбоваить проверку почты


        


def DB_COMMIT(statement,values):
    mydb = mysql.connector.connect(
    host=env.MYSQL_HOST,
    port=3306,
    user= env.MYSQL_USER,
    password = env.MYSQL_PASSWORD,
    database=env.MYSQL_DB    
)
    mycursor = mydb.cursor(buffered=True)

    mycursor.execute(statement,values)
    mydb.commit()
    
    mydb.close()
    mycursor.close()

    
    return

def DB_JSON(statement,values):
    mydb = mysql.connector.connect(
    host=env.MYSQL_HOST,
    port=3306,
    user= env.MYSQL_USER,
    password = env.MYSQL_PASSWORD,
    database=env.MYSQL_DB  
        
        )
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute(statement,values)
    row_headers = [x[0] for x in mycursor.description]
    rv = mycursor.fetchall()
    data = []
    for result in rv[::-1]:
        data.append(dict(zip(row_headers, result)))
    json_data = json.dumps(data)

    mydb.close()
    mycursor.close()

    return json_data


def DB_FETCH_ONE(statement,values):
    mydb = mysql.connector.connect(
    host=env.MYSQL_HOST,
    port=3306,
    user= env.MYSQL_USER,
    password = env.MYSQL_PASSWORD,
    database=env.MYSQL_DB  
        
        )
    mycursor = mydb.cursor(buffered=True)
    account = mycursor.execute(statement,values)
    try:
        account = list(mycursor.fetchone())
    except:
        account = []
    
    mycursor.close()
    mydb.close()
    
    return account

def DB_CHECK_EXISTENCE(statement,values):
    mydb = mysql.connector.connect(
    host=env.MYSQL_HOST,
    port=3306,
    user= env.MYSQL_USER,
    password = env.MYSQL_PASSWORD,
    database=env.MYSQL_DB  
        
        )
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute(statement,values)
    row_headers = [x[0] for x in mycursor.description]
    rv = mycursor.fetchall()
    data = []
    for result in rv[::-1]:
        data.append(dict(zip(row_headers, result)))
   
    existence_value = data[0]['COUNT(1)']
    return bool(existence_value)

def export_to_csv(table_name):
    
    filepath = f"../public/CSV/{table_name}.csv"
    filename = f"{table_name}.csv"
    mydb = mysql.connector.connect(
    host=env.MYSQL_HOST,
    port=3306,
    user= env.MYSQL_USER,
    password = env.MYSQL_PASSWORD,
    database=env.MYSQL_DB  
        
        )
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute(f"SELECT * FROM {table_name}")
    with open (filepath, "w", newline='', encoding='utf-8') as csv_file:
        csv_writer = csv.writer(csv_file)
        csv_writer.writerow([i[0] for i in mycursor.description])
        csv_writer.writerows(mycursor)

        
    return filename 

def password_hash_create(password):
    password_hash = generate_password_hash(password)
    return password_hash

def password_hash_check(hash_password, password):    
    return check_password_hash(hash_password, password)

def current_date():
    result = time.strftime('%Y-%m-%d %H:%M:%S')
    return result

