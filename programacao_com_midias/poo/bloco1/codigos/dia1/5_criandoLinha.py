#Usando variaveis para guardar um objeto do tipo Picture
imagem = Picture("C:/Users/fl43/branco.jpg")
#exibindo o objeto do tipo pixel
print imagem.getPixel(0,0)

#guardando o objeto do tipo Pixel em uma variavel
pixel = imagem.getPixel(0,0)
pixel.setColor( Color(255,0,0))

pixel = imagem.getPixel(1,0)
pixel.setColor( Color(255,0,0))

pixel = imagem.getPixel(2,0)
pixel.setColor( Color(255,0,0))

pixel = imagem.getPixel(3,0)
pixel.setColor( Color(255,0,0))

pixel = imagem.getPixel(4,0)
pixel.setColor( Color(255,0,0))

imagem.show()

