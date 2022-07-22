import qrcode
from env import SITELINK
from shutil import make_archive
from os import remove
from PIL import ImageDraw, Image



    
# создает QR и возвращает имя файла
def create_QR(event_ID, event_path, dynamic):     
    qr = qrcode.QRCode(
        version=1,
        box_size=40
       
    )
    
    
    event_URL = f'{SITELINK}/event/{event_path}'
    
    qr.add_data(event_URL)
    qr.make(fit=True)
    qr_image = qr.make_image(fill_color="black", back_color="white")
    if not dynamic:
        qr_image.save(f'../public/QR/{event_ID}.png')
    elif dynamic:
        qr_image.save(f'../public/QRDYNAMIC/{event_ID}.png')
    event_info = {"ID": event_ID, "Path": event_path }
    # add_text_to_QR('Text', f'{event_ID}.png')
    
    return event_info

def add_text_to_QR(title, filename):
    try:
        background = Image.new('RGBA', (176, 225), (255,255,255,255))
        draw = ImageDraw.Draw(background)
        draw.text((5,5), "Top text", (0,0,0))
        draw.text((5,210),"Bottom", (0,0,0))
        qr = Image.open(f'../public/QR/{filename}')
        background.paste(qr, (0,20))
        background.save(filename)
    except Exception as e:print(e)
    return


def update_QR(event_ID, event_URL):
    try:
        delete_QR(event_ID)
        
        qr = qrcode.QRCode(
            version=1,
            box_size=10
        
        )
        
        new_URL = f'{SITELINK}/event/{event_URL}'
        
        qr.add_data(new_URL)
        qr.make(fit=True)
        qr_image = qr.make_image(fill_color="black", back_color="white")
        qr_image.save(f'../public/QRDYNAMIC/{event_ID}.png')
    except Exception as e: print(e)
    return 


def delete_QR(event_id):
    try:
        remove(f'../public/QR/{event_id}.png')
    except:
        remove(f'../public/QRDYNAMIC/{event_id}.png')
        
    
    return
    

def export_QR_codes():
    filename = 'events_QR'
    make_archive(f'../public/ZIP/{filename}', 'zip', '../public/QR')
    
    return filename
