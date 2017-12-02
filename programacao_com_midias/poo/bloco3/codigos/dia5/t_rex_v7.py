#versao com colisão
from PPlay.window import *
from PPlay.sprite import *
from PPlay.animation import *
from PPlay.keyboard import *
from PPlay.text import *
from random import uniform
import time

janela = Window(400,300)
teclado = Window.get_keyboard()

trex = Animation("runall.png",4)
trex.set_sequence(0, 3, True)
trex.set_total_duration(500)
trex_estado = "nochao"
trex.set_position(20,220)

chaos = []
pos_chao = 0
for i in range(0,7):
    chao = Sprite("ground1.png")
    chao.set_position(pos_chao,250)
    chaos.append(chao)
    pos_chao+=70
    

ultimocacto = 0;
cactos = []

pontos = 0
placar = Text(janela, "Yu Gothic", 20)
placar.set_text("Ponto: "+str(pontos), 1, (20,20,20), (170,10))
#cria um estado para o jogo
gameover = False

while(gameover == False):
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
        #se colidir termina o jogo
        if(trex.collided(c2)):
            gameover = True
            break
        if(c2.x+c2.width <= 0):
            cactos.pop(index)
            pontos +=1
            placar.set_text("Ponto: "+str(pontos), 1, (255,255,255), (170,10))
                        
        index+=1
        placar.draw()
        c2.draw()
        
    janela.update()
