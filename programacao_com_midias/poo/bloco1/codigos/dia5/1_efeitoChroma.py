imagem = Picture("C:/Users/fl43/homem.jpg")
imagem2 = Picture("C:/Users/fl43/deserto.jpg")

for x in range(0, imagem.getWidth()):
  for y in range(0, imagem.getHeight()) :
        #pega o pixel da image 1
        p1 = imagem.getPixel(x,y)
        #se a cor vermelha, mas a cor azul for menor que a verde
        if(p1.getRed() + p1.getBlue() < p1.getGreen()):
          #pega o pixel da imagem 2
          p2 = imagem2.getPixel(x,y)
          #pega a cor
          cor = p2.getColor()
          #substitui na imagem 1
          p1.setColor(cor)
    
imagem.show()