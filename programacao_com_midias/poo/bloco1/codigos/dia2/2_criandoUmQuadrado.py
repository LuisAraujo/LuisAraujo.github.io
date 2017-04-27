#Usando a classe Picture para criar uma imagem
imagem = Picture("C:/Users/fl43/branco.jpg")
for x in range(0, 100):
  p =	imagem.getPixel(x,0)
  p.setColor(Color(0,0,0))



for x in range(0, 100):
  p =	imagem.getPixel(x,100)
  p.setColor(Color(0,0,0))

for y in range(0, 100):
  p =	imagem.getPixel(0,y)
  p.setColor(Color(0,0,0))

for y in range(0, 100):
  p = imagem.getPixel(100,y)
  p.setColor(Color(0,0,0))


show(imagem)


