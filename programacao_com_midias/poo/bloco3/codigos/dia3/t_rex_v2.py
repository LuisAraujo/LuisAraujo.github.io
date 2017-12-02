from PPlay.window import *
from PPlay.sprite import *
from PPlay.text import *

janela = Window(400,300)

chaos = []

for i in range(0,6):
    chaos.append(Sprite("ground1.png"))

pos = 0
for c in chaos:
    c.set_position(pos,250)
    pos+=70

while(True):
    janela.set_background_color((200,200,200))
    for c in chaos:
        c.draw()
        
    janela.update()
