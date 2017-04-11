#Usando variaveis para guardar um objeto do tipo Picture
imagem = Picture("C:/Users/fl43/stevejobs.jpg")
#exibindo o objeto do tipo pixel
print imagem.getPixel(0,0)

#guardando o objeto do tipo Pixel em uma variavel
pixel = imagem.getPixel(0,0)
print pixel

#Mudando o valor de vermelho para 0
pixel.setRed(0)
print pixel
#Mudando o valor de verde para 0
pixel.setGreen(0)
print pixel
#Mudando o valor de azul para 0
pixel.setBlue(0)

imagem.show()
