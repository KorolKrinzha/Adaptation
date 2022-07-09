import mysql.connector
import env
import json

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