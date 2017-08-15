class Efeito( ):

	def __init__(self):
	self.imagem = Picture("C:/Users/hiper/Documents/stevejobs.jpg")

	def negativo(self):
		pixels = self.imagem.getPixels()

		for p in pixels:
			novoRed = 255 - p.getRed();
			novoGreen = 255 - p.getGreen();
			novoBlue = 255 - p.getBlue();
			p.setColor(Color(novoRed,novoGreen,novoBlue))

		self.imagem.show()


	def escalaCinza(self):
		pixels = self.imagem.getPixels()

		for p in pixels:
			valor = ( p.getRed()+ p.getGreen() + p.getBlue())/3
			p.setColor(Color(valor,valor,valor))

		self.imagem.show()



efeito = Efeitos()
efeito.negativo()
efeito.escalaCinza()