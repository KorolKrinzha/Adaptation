from uuid import uuid4

def create_path():
    random_name = str(uuid4())
    random_name = random_name.replace("-","")
    return random_name

def create_ID():
    random_ID = str(uuid4())
    return random_ID