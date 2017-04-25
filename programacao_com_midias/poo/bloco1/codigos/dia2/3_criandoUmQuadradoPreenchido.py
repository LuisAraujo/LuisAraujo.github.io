caminho = "C:/Users/fl43/branco.jpg"
imagem = Picture(caminho)

#quadrado preenchido
#pega o pixel com a posicaoo x e y variando de 0 ?? 100
for x in range(0, 100):
	for y in range(0, 100):
		pixel =  imagem.getPixel(x,y)
		pixel.setColor(Color(0,0,0))

show(imagem)
   

