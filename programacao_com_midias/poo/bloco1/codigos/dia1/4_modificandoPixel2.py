#Usando variaveis para guardar um objeto do tipo Picture
imagem = Picture("C:/Users/fl43/stevejobs.jpg")
#exibindo o objeto do tipo pixel
print imagem.getPixel(0,0)

#guardando o objeto do tipo Pixel em uma variavel
pixel = imagem.getPixel(0,0)
print pixel

#Mudando o valor de vermelho para 0
pixel.setRed(pixel.getRed()-10)
print pixel
#Mudando o valor de verde para 0
pixel.setGreen(pixel.getGreen()-10)
print pixel
#Mudando o valor de azul para 0
pixel.setBlue(pixel.getBlue() - 10)

imagem.show()
