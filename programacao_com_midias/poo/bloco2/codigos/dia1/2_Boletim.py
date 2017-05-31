class Boletim( ):
 nota1 = 5;
 nota2 = 6;
 nota3 = 7;

 def calcularMedia(self):
   print (self.nota1 + self.nota2 + self.nota3 ) / 3
   
 def estaAprovado(self, media):
   if media >= 5:
	print "Aprovado""
   else 
	print "Reprovado!"