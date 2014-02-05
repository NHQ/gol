var body = document.body
var ui = require('getids')(document.body)
var fs = require('fullscreen');
var touchdown = require('touchdown');
var Time = require('since-when')
var ndarray = require('ndarray')
var rules = require('./lib/rules.js')
require('./lib/reqFrame')()
var getCSS = require('./lib/getCSS')
var drawGrid = require('./lib/grid.js')
var squarejob = require('./lib/squarejob');
var w,h,draw,drawS,lifeSize,zom,data,data2;

var playerTeam = 0;

init()

function init(){
  w = window.innerWidth
  h = window.innerHeight
  draw = ui.board.getContext('2d')
  drawS = ui.stemps.getContext('2d')
  lifeSize = 20 
  zoom = 1;
  ui.board.width = w
  ui.board.height = h
  drawGrid(draw, w, h, 20)
}


data = new Uint8ClampedArray(Math.ceil(w / lifeSize) * Math.ceil(h / lifeSize))
data2 = new Uint8ClampedArray(Math.ceil(w / lifeSize) * Math.ceil(h / lifeSize))
data3 = new Uint8ClampedArray(Math.ceil(123 / 40) * Math.ceil(267 / 40))


for(var x = 0; x < data.length; x++){
  data[x] = 100;
  data2[x] = 100;
}
for(x = 0; x<data3.length; x++) data3[x] =100;

var prev = ndarray(data, [Math.ceil(w / lifeSize), Math.ceil(h / lifeSize)]);
var next = ndarray(data2, [Math.ceil(w / lifeSize), Math.ceil(h / lifeSize)]);
var stemp = ndarray(data3, [Math.ceil(123 / 40), Math.ceil(267 / 40)]);
///var stempS = ndarray(data3, [Math.ceil(123 / 40), Math.ceil(267 / 40)]);

window.addEventListener('resize', function(evt){
  init()
  squarejob(prev, draw, lifeSize)
//  for(var i = 0; i < next.shape[0]; i++){
//    for(var j = 0; j < next.shape[1]; j++){
//      var n = prev.get(i, j)
//      gen(i * lifeSize, j * lifeSize, n - 10)
//    }
//  }
}, false)

  var pixel = draw.getImageData(0,0,100,100)
  function draw(t){

    window.requestAnimationFrame(draw)
  
  }

  var anim = 0;
  touchdown.start(ui.board);
  touchdown.start(ui.step)
  touchdown.start(ui.play)
  touchdown.start(ui.stop)
  touchdown.start(ui.p1)
  touchdown.start(ui.p2)
  touchdown.start(ui.stemps)
  touchdown.start(ui.stempNum)
  touchdown.start(ui.stempSave)

ui.stop.addEventListener('touchdown', function(){
  window.cancelAnimationFrame(anim)
})

ui.stop.addEventListener('touchdown', function(){
  window.cancelAnimationFrame(anim)
})
ui.play.addEventListener('touchdown', function(){
  play()
})
ui.step.addEventListener('click', run)


module.exports = {
  play: play,
  stop: stop,
  step: step,
}



ui.p1.addEventListener('touchdown',function(){
playerTeam = 10
})

ui.p2.addEventListener('touchdown',function(){
playerTeam = 20
})




function stop(){
  window.cancelAnimationFrame(anim)
}
function play(){
  anim = window.requestAnimationFrame(play)
  run()
}
function run(evt){
  
  rules(prev, next)
  squarejob(next, draw, lifeSize)
//  var j = prev
//  prev = next
//  next = j
  for(var i = 0; i < next.shape[0]; i++){
    for(var j = 0; j < next.shape[1]; j++){
      var n = next.get(i, j)
      prev.set(i,j,n);
//      gen(i * lifeSize, j * lifeSize, n)
    }
  }

}


ui.stemps.addEventListener('touchdown',springLife)
ui.board.addEventListener('touchdown', springStemp)



function springStemp(e){
var precheak = new Array();
var obs = 0;
var n = 0;
var zbord , zstemp, x, y;
var ex = e.detail.x
var ey = e.detail.y
   ex -= ex % lifeSize
   ey -= ey % lifeSize
   ex /= lifeSize
   ey /= lifeSize              ////find the offset mous location for refferens
   

  for(i = 0 ; i < stemp.shape[0] ; i++){      //// run therow all stemp 2d array
  for(j = 0 ; j < stemp.shape[1] ; j++){

   zstemp = stemp.get( i,  j)

   if(zstemp != 100){           ///cheaking for obsticles 

   x = ex + i
   y = ey + j
   
   zbord = prev.get(x, y)

   if(zbord != 100) 
   obs++
   }
   precheak[n] = zstemp
   n++
  }
  }
  n = 0;
  if(obs === 0)
  {
   for(i = 0 ; i < stemp.shape[0] ; i++){
   for(j = 0 ; j < stemp.shape[1] ; j++){
   if(precheak[n] != 100){
     x = ex + i
     y = ey + j
     prev.set(x, y, playerTeam )
     next.set(x, y, playerTeam )  //////// dump the info from stemps  
     
   squarejob(prev, draw, lifeSize)
     }
     n++
   }
   }

  }
  else
  console.log("cant create", obs, "obsticles");
}


//ui.board.addEventListener('deltavector', springLife)
function gen(x, y, z){
  x -= x % lifeSize
  y -= y % lifeSize
  draw.strokeStyle = (z === 0) ? rgba(0,70,0,1) : rgba(255,255,255,1)
  draw.fillStyle = (z === 0) ? rgba(255,255,255,1) : rgba(250,70,100,1)
  draw.fillRect(x, y, lifeSize, lifeSize)
  draw.strokeRect(x, y, lifeSize, lifeSize)
}
function springLife(e){
  var x = e.detail.x, y = e.detail.y;
  var caller = this.id
  var size = (caller === "board") ? lifeSize : 40
  x -= e.srcElement.offsetLeft
  y -= e.srcElement.offsetTop
  console.log(x,y)
  x -= x % size
  y -= y % size
  x /= size
  y /= size
  var z = (caller === "board") ? prev.get(x, y) : stemp.get(x,y)
  if(z === 100) z = playerTeam 
  else z = 100
  
  if(caller === "board") {
  prev.set(x, y, z)
  next.set(x,y,z)
//  gen(e.detail.x, e.detail.y, z)
  squarejob(prev, draw, size)
  }
  else 
  {
  stemp.set(x,y,z)
  squarejob(stemp,drawS,size)
  }
  
  
}//}

var screen = fs(document.body);

screen.on('attain', function(){
})

screen.on('error', function(e){console.log(e)})

document.body.addEventListener('click', function(){
//  screen.request()
})

function rgba(){
  return 'rgba('+Array.prototype.join.call(arguments, ',')+')'
}
