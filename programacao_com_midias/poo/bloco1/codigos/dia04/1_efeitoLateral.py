imagem = Picture("C:/Users/fl43/stevejobs.jpg")

for x in range(0, imagem.getWidth()):
  for y in range(0, imagem.getHeight()) :
    if (x < imagem.getWidth()/2):
      p = imagem.getPixel(x,y)
      p.setRed(0)
    
imagem.show()