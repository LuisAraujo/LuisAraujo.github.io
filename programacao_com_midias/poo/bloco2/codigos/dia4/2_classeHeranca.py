class MyPicture(Picture):
  def __init__(self, path):
    super(MyPicture, self).__init__(path)
  
  def addEfeitoEscalaCinza(self):
    for p in self.getPixels():
      mediaCor = (p.getRed() + p.getGreen() + p.getBlue()) / 3
      p.setColor( Color(mediaCor, mediaCor, mediaCor) )
      
  def addEfeitoMatiz(self):
     for p in self.getPixels():
      p.setColor( Color( p.getRed(), p.getGreen(), 0) )


imagem = MyPicture("C:/Users/hiper/Documents/stevejobs.jpg")
#imagem.addEfeitoEscalaCinza()
imagem.addEfeitoMatiz()
imagem.show()


