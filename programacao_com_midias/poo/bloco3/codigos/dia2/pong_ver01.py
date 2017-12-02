from PPlay.window import *
from PPlay.sprite import *
 
# Como sempre, criamos primeiro a janela
janela = Window(400,300)
teclado = Window.get_keyboard()

# Associamos então uma variável ao Sprite
ball = Sprite("quadrado.png")
barra1 = Sprite("barra.png")
barra2 = Sprite("barra.png")

#Pintamos o fundo da tela
  # Preto
 
# E depois o Sprite
ball.set_position(200,150)
barra1.set_position(5,20)
barra2.set_position(365,20)

ball_direcao = 1
ball_direcao_y = 0.1;

while(True):
    janela.set_background_color((0,0,0))
    if(ball_direcao):
        ball.move_x(0.1)
    else:
        ball.move_x(-0.1)

    ball.move_y(ball_direcao_y)
    
    if(ball.y > 300 and ball_direcao_y == 0.1):
      ball_direcao_y = -0.1
      
    if(ball.y < 0 and ball_direcao_y == -0.1):
      ball_direcao_y = 0.1

    if(ball.collided(barra1)):
         ball_direcao = 1
    if(ball.collided(barra2)):
         ball_direcao = 0
   
    ball.draw()
    if(teclado.key_pressed("UP")):  
        barra1.move_y(-0.1)
    if(teclado.key_pressed("DOWN")):   
       barra1.move_y(0.1)

    if(teclado.key_pressed("W")):  
        barra2.move_y(-0.1)
    if(teclado.key_pressed("S")):   
       barra2.move_y(0.1)
       
    barra1.draw()
    barra2.draw()

    janela.update()


# O GameLoop
#:
# Atualizamos a lógica do jogo
#ball.move_x(0.1)
#ball.move_y(0.1)   
