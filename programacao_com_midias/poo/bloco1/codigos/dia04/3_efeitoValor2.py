imagem = Picture("C:/Users/fl43/stevejobs.jpg")

for x in range(0, imagem.getWidth()):
  for y in range(0, imagem.getHeight()) :
        p = imagem.getPixel(x,y)
        if (255 - p.getRed() < 100 and 255 - p.getGreen() < 100):
          p.setColor( Color (0,0,0))
    
imagem.show()