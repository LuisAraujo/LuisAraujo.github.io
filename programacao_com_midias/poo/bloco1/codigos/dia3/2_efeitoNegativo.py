imagem = Picture("C:/Users/fl43/stevejobs.jpg")

pixels = imagem.getPixels()

for p in pixels:
  novoRed = 255 - p.getRed();
  novoGreen = 255 - p.getGreen();
  novoBlue = 255 - p.getBlue();
  p.setColor(Color(novoRed,novoGreen,novoBlue))
    
imagem.show()