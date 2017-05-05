imagem = Picture("C:/Users/fl43/stevejobs.jpg")

for x in range(0, imagem.getWidth()):
  for y in range(0, imagem.getHeight()) :
        p = imagem.getPixel(x,y)
        if (p.getBlue() > p.getGreen() and p.getBlue() > p.getRed()):
          p.setColor( Color(0,0,0) )
    
imagem.show()