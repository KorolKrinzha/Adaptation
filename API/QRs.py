import qrcode
from env import SITELINK
from IDs import create_ID, create_path



    
# создает QR и возвращает имя файла
def create_QR():     
    qr = qrcode.QRCode(
        version=1,
        box_size=10
       
    )
    
    event_path = create_path()
    event_ID = create_ID()
    
    event_URL = f'{SITELINK}/event/{event_path}'
    
    qr.add_data(event_URL)
    qr.make(fit=True)
    qr_image = qr.make_image(fill_color="black", back_color="white")
    qr_image.save(f'../public/{event_ID}.png')
    event_info = {"ID": event_ID, "Path": event_path }
    return event_info

def update_QR(event_ID):
    qr = qrcode.QRCode(
        version=1,
        box_size=10
       
    )
    
    new_event_path = create_path()
    event_URL = f'{SITELINK}/event/{new_event_path}'
    
    qr.add_data(event_URL)
    qr.make(fit=True)
    qr_image = qr.make_image(fill_color="black", back_color="white")
    qr_image.save(f'../public/QR/{event_ID}.png')
    return new_event_path