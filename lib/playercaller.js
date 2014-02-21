var rgba = require('./rgba.js')

module.exports = swich

function swich (player,shade){ 

 switch(player)
    {
     case 0:

  return rgba(255,255,255,shade) 

       break;
     case 10:
    
  return rgba(255,0,0,shade) 

       break;
     case 20:
       
  return rgba(0,0,255,shade) 
    
       break;
      case 30:
       
  return rgba(40,150,150,shade) 
    
       break;

    case 40:
       
  return rgba(200,40,100,shade) 
    
       break;



     default:

  return rgba(0,0,0,shade) 

    }

}
