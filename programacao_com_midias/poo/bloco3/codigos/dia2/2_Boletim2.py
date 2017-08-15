class Boletim( ):

 def __init__(self, nota1, nota2, nota3):
        self.nota1 = nota1
        self.nota2 = nota2
        self.nota3 = nota3

 def calcularMedia(self):
   return self.nota1 + self.nota2 + self.nota3 ) / 3
   
 def getSituacao(self):
	media = self.calcularMedia()
	if( media < 5):
		print("Reprovado")
	elif (media > 5 && media < 7)):
		print("Aprovado")
	elif (media > 7 && media <= 10)):
		print("Aprovadissimo")