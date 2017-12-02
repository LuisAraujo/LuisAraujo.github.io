from PPlay.window import *
from PPlay.sprite import *

janela = Window(400,300)

chaos = []



for i in range(0,6):
    chaos.append(Sprite("ground1.png"))


cactos = []
pos_cactos = 30;
for i in range(0,3):
    cacto = Sprite("cactus1.png")
    cacto.set_position(pos_cactos,220)
    pos_cactos += 30
    cactos.append(cacto)

pos_chao = 0
for c in chaos:
    c.set_position(pos_chao,250)
    pos_chao+=130

while(True):
    janela.set_background_color((200,200,200))
    for c in chaos:
        c.set_position(c.x-0.1, c.y)
        c.draw()

    for c2 in cactos:
        c2.set_position(c2.x-0.1, c2.y)
        c2.draw()
        
    janela.update()
