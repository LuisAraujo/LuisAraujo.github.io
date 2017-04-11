#Usando o método pickAFile da classe FileChooser
#FileChooser.pickAFile()
#Usando a classe Picture para criar uma imagem
Picture("C:/Users/fl43/stevejobs.jpg")
#Usando o método getWidth da classe Picture para saber a largura da imagem
print Picture("C:/Users/fl43/stevejobs.jpg").getWidth()
#Usando o método getWidth da classe Picture para saber a altura da imagem
print Picture("C:/Users/fl43/stevejobs.jpg").getHeight()

#Usando a classe Pixel para criar um pixel
Pixel(Picture("C:/Users/fl43/stevejobs.jpg"),0,0)
#Usando a o método getX da Classe Pixel para criar saber o seu valor X
print Pixel(Picture("C:/Users/fl43/stevejobs.jpg"),0,0).getX()
#Usando a o método getY da Classe Pixel para criar saber o seu valor Y
print Pixel(Picture("C:/Users/fl43/stevejobs.jpg"),0,0).getY()