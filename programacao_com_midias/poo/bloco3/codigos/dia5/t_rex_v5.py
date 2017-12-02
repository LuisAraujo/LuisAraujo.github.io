#versão como animação do t-rex
from PPlay.window import *
from PPlay.sprite import *
from PPlay.animation import *
from PPlay.keyboard import *
from random import uniform
import time

janela = Window(400,300)
teclado = Window.get_keyboard()

ultimocacto = 0;
#usa Animation no lugar de Sprite,
#diz a imagem e as divisões
trex = Animation("runall.png",4)
#diz o frame inicial, final e loop
trex.set_sequence(0, 3, True)
#diz a duração de cada frame
trex.set_total_duration(500)
trex_estado = "nochao"

pos_trey = 220
trex.set_position(20,pos_trey)

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
    if (teclado.key_pressed("enter") and trex_estado=="nochao"):
        trex_estado="pulando"

    if(trex_estado=="pulando"):
        trex.set_position(trex.x, trex.y-0.1)
        if(trex.y <= 160):
             trex_estado="caindo"
    elif(trex_estado=="caindo"):
        trex.set_position(trex.x, trex.y+0.1)
        if(trex.y >= 220):
             trex.set_position(trex.x, 220)
             trex_estado="nochao"

            
    trex.draw()
    trex.update()

    for c in chaos:
        c.set_position(c.x-0.1, c.y)
        if(c.x+c.width <= 0):
            c.set_position(370, c.y)
        c.draw()

    if( time.time() - ultimocacto > 0.5 + uniform(0.5, 1)):
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
