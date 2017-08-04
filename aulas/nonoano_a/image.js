

function createImage(path){
	img = new myImage(path)
	return img;
}

function show(image){
	s_image = new Image();
	s_image.crossOrigin = 'anonymous';
	s_image.onload = function(){
		canvas.width = s_image.width;
		canvas.height = s_image.height;
		contexto.drawImage(s_image,0,0);	
		
		var arr_pixels = [];

		if(image.pixels.length == 0){
		
		    var conti=0;
			var contj=0;
			
			for(var i=0; i<s_image.width; i++){
				arr_pixels.push([]);
				
				for(var j=0; j<s_image.height; j++){
					var pixels = contexto.getImageData(i, j, 1,1);
					var red = pixels.data[0];
					var green = pixels.data[1];
					var blue = pixels.data[2];
					
					var p = new Pixel(red, green, blue, image, conti, contj++);
					
					arr_pixels[arr_pixels.length-1].push( p );	
					
				}	
				conti++;
				contj = 0;
			}
			
			image.pixels = arr_pixels;
			//console.log(image);
		
		}else{
			
			var conti=0;
			var contj=0;
			var pixels = null;
			for(var i=0; i< s_image.width; i++){
				
				for(var j=0; j< s_image.height; j++){
				
					pixels = contexto.getImageData(i, j, 1,1);
					pixels.data[0] = image.pixels[conti][contj].red;
					pixels.data[1] = image.pixels[conti][contj].green;
					pixels.data[2] = image.pixels[conti][contj].blue;
					contexto.putImageData(pixels,conti,contj++);
					
				}
				console.log(conti, contj);				
				conti++;
				contj=0;
			}
			
			
		}
		
	}	

	s_image.src = image.path;
	
}



function myImage(p){
	this.path = p;
	this.pixels = [];
}

function Pixel(r,g,b, myimg, x, y){
	this.red = r;
	this.green = g;
	this.blue = b;
	this.x = x;
	this.y= y;
	this.img = myimg;
}

function getPixel(img, x,y){
	return img.pixels[x][y];
}

function getPixels(img){
	return img.pixels;
}

function setColor(pixel, color){
	
	pixel.img.pixels[pixel.x][pixel.y].red = color.red; 
    pixel.img.pixels[pixel.x][pixel.y].green = color.green; 
    pixel.img.pixels[pixel.x][pixel.y].blue = color.blue;	
}

function getRed(pixel){
	return pixel.img.pixels[pixel.x][pixel.y].red;
}


function getGreen(pixel){
	return pixel.img.pixels[pixel.x][pixel.y].green;
}


function getBlue(pixel){
	return pixel.img.pixels[pixel.x][pixel.y].blue;
}
function Color(r,g,b){
	this.red = r;
	this.green = g;
	this.blue = b;
}


function makeColor(r,g,b){
	return new Color(r,g,b);
}