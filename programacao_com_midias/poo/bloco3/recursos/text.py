# Pygame
import pygame
from pygame.locals import *

# Initializes pygame's modules
pygame.init()

"""Text is a class for add text in game.
This calss has developed by Luis Gustavo Araujo in Group of research Technology 
of Information of State University of Feira de Santana (2017)"""
class Text():
    
    """font is the name of font, size is size of font"""
    def __init__(self, surface, font, size):
        self.surface= surface
        self.myfont = pygame.font.SysFont(font,size)
		
    """this method draw a text in game"""
    def draw(self):
       self.surface.screen.blit(self.label, self.position)
        
    """set text setting a text, pos, a color and position of text """
    def set_text(self, text, pos, color, position):
        self.position = position
        self.label = self.myfont.render(text, pos, color)

        

