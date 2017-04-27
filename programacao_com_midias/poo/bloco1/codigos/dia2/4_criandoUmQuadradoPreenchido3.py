caminho = "C:/Users/fl43/branco.jpg"
imagem = Picture(caminho)

#quadrado preenchido
#pega o pixel com a posicaoo x e y variando de 0 ?? 100

for x in range(0,250):
  for y in range(0, 250):
    pixel = imagem.getPixel(x,y)
    pixel.setColor( Color(x, 0, 0 ) )

c = 255;
for x in range(250,500):
  c = c-1
  for y in range(0, 250):
    pixel = imagem.getPixel(x,y)
    pixel.setColor( Color(c, 0, 0 ) )



#salvado minha imagem com o nome "minhaimagem.jp
imagem.write("C:/Users/fl43/minhaimagem.jpg")
show(imagem)
   

