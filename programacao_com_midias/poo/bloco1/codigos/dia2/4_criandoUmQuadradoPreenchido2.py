caminho = "C:/Users/fl43/branco.jpg"
imagem = Picture(caminho)

#quadrado preenchido
#pega o pixel com a posicaoo x e y variando de 0 ?? 100

for x in range(0,250):
  for y in range(0, 250):
    pixel = imagem.getPixel(x,y)
    pixel.setColor(  Color(x+y, 0, x-y) )

#salvado minha imagem com o nome "minhaimagem.jpg"
imagem.write("C:/Users/fl43/minhaimagem.jpg")
show(imagem)
   

