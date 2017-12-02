from PPlay.window import *
from PPlay.sprite import *
import time

janela = Window(400,300)
ultimocacto = 0;

trex = Sprite("run1.png")
pos_trex = 0
trex.set_position(pos_trex,220)
              
chaos = []
pos_chao = 0
for i in range(0,7):
    chao = Sprite("ground1.png")
    chao.set_position(pos_chao,250)
    chaos.append(chao)
    pos_chao+=70
    

cactos = []


while(True):
    janela.set_background_color((200,200,200))
    for c in chaos:
        c.set_position(c.x-0.1, c.y)
        if(c.x+c.width <= 0):
            c.set_position(370, c.y)
        c.draw()

    #usando uma condição para verificar o tempo
    if( time.time() - ultimocacto > 1):
        ultimocacto = time.time()
        cacto = Sprite("cactus1.png")
        cacto.set_position(400,220)
        cactos.append(cacto)

    index = 0

    for c2 in cactos:
        
        c2.set_position(c2.x-0.1, c2.y)
        if(c2.x+c2.width <= 0):
            cactos.pop(index)
            
        index+=1       
        c2.draw()
        
    janela.update()
