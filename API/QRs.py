import qrcode
from env import SITELINK
from shutil import make_archive
from os import remove



    
# создает QR и возвращает имя файла
def create_QR(event_ID, event_path, dynamic):     
    qr = qrcode.QRCode(
        version=1,
        box_size=10
       
    )
    
    
    event_URL = f'{SITELINK}/event/{event_path}'
    
    qr.add_data(event_URL)
    qr.make(fit=True)
    qr_image = qr.make_image(fill_color="black", back_color="white")
    if not dynamic:
        qr_image.save(f'../public/QR/{event_ID}.png')
    elif dynamic:
        qr_image.save(f'../public/QR/DYNAMIC/{event_ID}.png')
    event_info = {"ID": event_ID, "Path": event_path }
    return event_info

def update_QR(event_ID, event_URL):
    qr = qrcode.QRCode(
        version=1,
        box_size=10
       
    )
    print("I am here!!!!")
    
    new_event_path = create_path()
    new_URL = f'{SITELINK}/event/{event_URL}'
    
    qr.add_data(new_URL)
    qr.make(fit=True)
    qr_image = qr.make_image(fill_color="black", back_color="white")
    print("updated")
    qr_image.save(f'../public/QR/DYNAMIC/{event_ID}.png')
    return new_event_path


def delete_QR(event_id):
    remove(f'../public/QR/{event_id}.png')
    
    return
    

def export_QR_codes():
    filename = 'events_QR'
    make_archive(f'../public/ZIP/{filename}', 'zip', '../public/QR')
    
    return filename
