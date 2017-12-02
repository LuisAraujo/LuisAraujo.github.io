from PPlay.window import *
from PPlay.sprite import *
from PPlay.text import *
import random

#placar
placarj1 = 0
placarj2 = 0
 
# Como sempre, criamos primeiro a janela
janela = Window(400,300)
teclado = Window.get_keyboard()

# Associamos então uma variável ao Sprite
ball = Sprite("quadrado.png")
barra1 = Sprite("barra.png")
barra2 = Sprite("barra.png")

# E depois o Sprite
ball.set_position(200,150)
barra1.set_position(5,20)
barra2.set_position(365,20)

ball_direcao_x = 0.1
ball_direcao_y = 0.1

placar = Text(janela, "Yu Gothic", 20)
placar.set_text("PONG", 1, (255,255,255), (170,10))

while(True):
    #Pintamos o fundo de preto
    janela.set_background_color((0,0,0))
   
    #movimento da bola
    ball.move_x(ball_direcao_x)    
    ball.move_y(ball_direcao_y)

    #limites y
    if(ball.y > 300 and ball_direcao_y > 0):
        placar.set_text(str(placarj1)+" | "+str(placarj2), 1, (255,255,255), (170,10))
        ball_direcao_y = -1*random.uniform(0.1, 0.2)
      
      
    if(ball.y < 0 and ball_direcao_y < 0):
        ball_direcao_y = random.uniform(0.1, 0.2)

    #limites y
    if(ball.x > 400 and ball_direcao_x ==0.1):
        ball_direcao_x = -0.1
        placarj1+=1
      
    if(ball.x < 0 and ball_direcao_x == -0.1):
        ball_direcao_x = 0.1
        placarj2+=1
        
    #colicao com a barra  
    if(ball.collided(barra1)):
         ball_direcao_x = 0.1
    if(ball.collided(barra2)):
         ball_direcao_x = -0.1
   
    

    #controla a barra
    if(teclado.key_pressed("UP")):  
        barra1.move_y(-0.1)
    if(teclado.key_pressed("DOWN")):   
       barra1.move_y(0.1)

    if(teclado.key_pressed("W")):  
        barra2.move_y(-0.1)
    if(teclado.key_pressed("S")):   
       barra2.move_y(0.1)

    #desenha objetos
    ball.draw()
    barra1.draw()
    barra2.draw()
    placar.draw()

    janela.update()

