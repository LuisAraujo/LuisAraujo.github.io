caminho = "C:/Users/fl43/stevejobs.jpg"
imagem = Picture(caminho)
#array com TODOS os pixels da imagem
pixels  = imagem.getPixels();

for p in pixels:  
  verm = p.getRed()
  verd = p.getGreen()
  azul = p.getBlue()
  p.setColor(Color (verm-100, verd+100, azul+10) )


#imagem.write("C:/Users/fl43/minhaimagem.jpg")
show(imagem)
   

