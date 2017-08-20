# Pygame and System Modules
import sys
import math
import time
import pygame
from . import window
from . import draw
from pygame.locals import *

# Initializes pygame's modules
pygame.init()

"""An Draw shape class. Developed by Luis Gustavo Araujo in Group of research Technology 
of Information of State University of Feira de Santana."""
class Draw():
    """
    Draw Shapes with statics methods
    """
    #-----------------------DRAW STATICS METHODS--------------------
    
    #draw a rectangle shape
    def rect(Surface, color,left, top, width, height):
        pygame.draw.rect(Surface.screen, color,  pygame.Rect( (left, top), (width, height)) )

    #draw a shape with any number of sides
    def polygon(Surface, color, pointlist):
        pygame.draw.polygon(Surface.screen, color, pointlist)

    #draw a circle around a point
    def circle(Surface, color, pos, radius):
         pygame.draw.circle(Surface.screen, color, pos, radius)
    
    #draw a round shape inside a rectangle
    def ellipse(Surface, color, left, top, width, height):
        pygame.draw.ellipse(Surface.screen, color, Rect((left, top), (width, height)) )

    #draw a partial section of an ellipse
    def arc(Surface, color, left, top, width, height, start_angle, stop_angle):
        pygame.draw.arc(Surface.screen, color,  Rect((left, top), (width, height)), math.radians(start_angle), math.radians(stop_angle))

    #draw a straight line segment
    def line(Surface, color, start_pos, end_pos):
        pygame.draw.line(Surface.screen, color, start_pos, end_pos)
        
    #draw multiple contiguous line segments
    def lines(Surface, color, pointlist, closed):
         pygame.draw.lines(Surface.screen, color, closed, pointlist)

    #draw fine antialiased lines
    def aaline(Surface, color, startpos, endpos, blend=1):
        pygame.draw.aaline(Surface.screen, color, startpos, endpos, blend)
        
    #draw a connected sequence of antialiased lines
    def aalines(Surface, color, pointlist,closed, blend=1):	 
        pygame.draw.aalines(Surface.screen, color, closed, pointlist, blend)

    #-----------------------SET METHODS AS STATICS --------------------
    rect = staticmethod(rect)
    polygon = staticmethod(polygon)
    circle= staticmethod(circle)
    ellipse = staticmethod(ellipse)
    arc= staticmethod(arc)
    line= staticmethod(line)
    lines= staticmethod(lines)
    aaline= staticmethod(aaline)
    aalines= staticmethod(aalines)
