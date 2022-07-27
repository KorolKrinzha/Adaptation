import qrcode
from env import SITELINK
from shutil import make_archive
from os import remove
from PIL import ImageDraw, Image, ImageFont



    
# создает QR и возвращает имя файла
def create_QR(event_ID, event_path, dynamic, title):     
    qr = qrcode.QRCode(
        border = 1,
        box_size=20       
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
    add_text_to_QR(title, f'{event_ID}.png', dynamic)
    
    return event_info

def add_text_to_QR(title, filename, dynamic):
    try:
        if not dynamic:
            qr_image = Image.open(f'../public/QR/{filename}')
        else:
            qr_image = Image.open(f'../public/QRDYNAMIC/{filename}')
        
        qr_width, qr_height = qr_image.size

        
        background_image_size = 900
        background = Image.new('RGBA', (background_image_size, background_image_size), (255,255,255,255))
        draw = ImageDraw.Draw(background)
        
        fontsize = 47
        font = ImageFont.truetype("../src/styles/fonts/HSESans-Regular.otf",fontsize)
        
        
        title = title.upper()
        title_width, title_height = font.getsize(title)
        
        draw.text(((background_image_size-title_width)//2,0), title, (0,0,0),font=font)
        background.paste(qr_image,((background_image_size-qr_width)//2,(background_image_size-qr_height)//2+20))
        
            
        if not dynamic:    
            background.save(f'../public/QR/{filename}')
        else:
            background.save(f'../public/QRDYNAMIC/{filename}')
        
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
