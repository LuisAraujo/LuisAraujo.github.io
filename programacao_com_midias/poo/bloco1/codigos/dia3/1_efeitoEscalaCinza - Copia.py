imagem = Picture("C:/Users/fl43/stevejobs.jpg")

pixels = imagem.getPixels()

for p in pixels:
  valor = ( p.getRed()+ p.getGreen() + p.getBlue())/3
  p.setColor(Color(valor,valor,valor))
    
imagem.show()