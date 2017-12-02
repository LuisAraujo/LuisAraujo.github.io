from PPlay.window import *
from PPlay.sprite import *
from PPlay.text import *

janela = Window(400,300)

chao1 = Sprite("ground1.png")
chao2 = Sprite("ground1.png")
chao3 = Sprite("ground1.png")
chao4 = Sprite("ground1.png")
chao5 = Sprite("ground1.png")
chao6 = Sprite("ground1.png")

chao1.set_position(0,250)
chao2.set_position(70,250)
chao3.set_position(140,250)
chao4.set_position(210,250)
chao5.set_position(280,250)
chao6.set_position(350,250)

while(True):
    janela.set_background_color((200,200,200))
    chao1.draw()
    chao2.draw()
    chao3.draw()
    chao4.draw()
    chao5.draw()
    chao6.draw()
    janela.update()
