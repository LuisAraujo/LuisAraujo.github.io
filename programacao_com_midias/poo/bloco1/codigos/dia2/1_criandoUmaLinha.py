#Usando a classe Picture para criar uma imagem
imagem = Picture("C:/Users/fl43/branco.jpg")
for x in range(0, 100):
  p =	imagem.getPixel(x,0)
  p.setColor(Color(0,0,0))
  
show(imagem)
