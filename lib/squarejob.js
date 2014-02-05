var n = 0;
var o = [0,0];
module.exports = function(nda, ctx, size, offset){
  for(var i = 0; i < nda.shape[0]; i++){
    for(var j = 0; j < nda.shape[1]; j++){
      n = nda.get(i, j)
      gen(ctx, size, i * size, j * size, n, offset)
    }
  }
}

function gen(draw, lifeSize, x, y, z, offset){
  x -= x % lifeSize
  y -= y % lifeSize
  offset = offset || o 
  draw.strokeStyle = (z === 0) ? rgba(0,0,0,1) :  rgba(255,255,255,1) 
 

  switch(z)
    {
     case 0:


  draw.fillStyle = rgba(255,255,255,1) 

       break;
     case 10:
    
  draw.fillStyle = rgba(255,0,0,1) 


       break;
     case 20:
       
  draw.fillStyle = rgba(0,0,255,1) 
    
       break;
     default:

  draw.fillStyle = rgba(0,0,0,1) 


    }

  draw.fillRect(x + offset[0], y + offset[1], lifeSize, lifeSize)
  draw.strokeRect(x + offset[0], y + offset[1], lifeSize, lifeSize)
}


function rgba(r,g,b,a){
  return 'rgba('+Array.prototype.join.call(arguments, ',') +')'
}
