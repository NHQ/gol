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
var pice = require('./lib/pices.js');
var rgba = require('./lib/rgba.js')
var w,h,draw,drawS,lifeSize,zom,data,data2,action;
var pices = new Array();
var playerTeam = 0;
var tern = 0

init()

function init(){
  w = window.innerWidth
  h = window.innerHeight
  draw = ui.board.getContext('2d')
  drawS = ui.stemps.getContext('2d')
  lifeSize = 10 
  stempSize = 40
  zoom = 1;
  ui.board.width = w
  ui.board.height = h
  ui.stemps.width = 200
  ui.stemps.height = 200
  drawGrid(draw, w, h, lifeSize)
  drawGrid(drawS, 200, 200, stempSize)
  pices.push(new pice.set("base",10,10,10))

  pices.push(new pice.set("base",10,50,40))
  pices.push(new pice.set("base",100,10,30))
  pices.push(new pice.set("base",100,50,20))
}
function run(evt){
  rules(prev, next)
  squarejob(next, draw, lifeSize)
  tern ++
  for(i=0;i<pices.length;i++){
     pices[i].capture(next)
     pices[i].mark(playerTeam,lifeSize,draw)
     if(tern === 5 && pices[i].type === "base") pices[i].energy ++
  }
  if(tern === 5) tern = 0;
  for(var i = 0; i < next.shape[0]; i++){
    for(var j = 0; j < next.shape[1]; j++){
      var n = next.get(i, j)
      prev.set(i,j,n);
    }
  }
}



ui.stemps.addEventListener('touchdown',drawStemp)
ui.board.addEventListener('touchdown', function (e){switch(action){
case "BStemp": springStemp(e)
 break;
case "BBase":builder(e,"base")
 break;
case "BStation" :builder(e,"station")
break;
case "BTurent": builder(e,"turent")
break;
case "BFort": builder(e,"fort")
break;



}
} )

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
console.log(playerTeam)
})

ui.p2.addEventListener('touchdown',function(){
playerTeam = 20
})


ui.p3.addEventListener('touchdown',function(){
playerTeam = 30
})


ui.BStemp.addEventListener('touchdown',function(){
action = "BStemp"
console.log(action)
})


ui.BBace.addEventListener('touchdown',function(){
action = "BBase"
})


ui.BStatian.addEventListener('touchdown',function(){
action = "BStation"
})



ui.BTurent.addEventListener('touchdown',function(){
action = "BTurent"
})



ui.BFort.addEventListener('touchdown',function(){
action = "BFort"
})









data = new Uint8ClampedArray(Math.ceil(w / lifeSize) * Math.ceil(h / lifeSize))
data2 = new Uint8ClampedArray(Math.ceil(w / lifeSize) * Math.ceil(h / lifeSize))
data3 = new Uint8ClampedArray(Math.ceil(200 / stempSize) * Math.ceil(200 / stempSize))


for(var x = 0; x < data.length; x++){
  data[x] = 100;
  data2[x] = 100;
}
for(x = 0; x<data3.length; x++) data3[x] =100;

var prev = ndarray(data, [Math.ceil(w / lifeSize), Math.ceil(h / lifeSize)]);
var next = ndarray(data2, [Math.ceil(w / lifeSize), Math.ceil(h / lifeSize)]);
var stemp = ndarray(data3, [Math.ceil(200 / 40), Math.ceil(200 / 40)]);
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
  touchdown.start(ui.BStemp)
  touchdown.start(ui.BBace)
  touchdown.start(ui.p3)
 touchdown.start(ui.BStatian)
 touchdown.start(ui.BFort)
 touchdown.start(ui.BTurent)







  function draw(t){

    window.requestAnimationFrame(draw)
  
  }

  function drawS(t){

    window.requestAnimationFrame(draw)
  
  }

function stop(){
  window.cancelAnimationFrame(anim)
}
function play(){
  anim = window.requestAnimationFrame(play)
  run()
}
function builder(e,type){
var ex = e.detail.x
var ey = e.detail.y
   ex -= ex % lifeSize
   ey -= ey % lifeSize
   ex /= lifeSize
   ey /= lifeSize              ////find the offset mous location for refferens
if(pice.ICanBuild(ex,ey,playerTeam,pices))
 pices.push(new pice.set(type,ex,ey,playerTeam,pices))



}



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
   if(zstemp != 100) {           ///cheaking for obsticles 
     x = ex + i
     y = ey + j
     if(pice.ICanPlay(x,y,playerTeam,pices)) {
       zbord = prev.get(x, y)

       if(zbord != 100) 
       obs++
     }
     else obs = 100;
    }
   precheak[n] = zstemp
   n++
  } }
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
  else{
  if(obs<100)
  console.log("cant create", obs, "obsticles");
  else
  console.log("out of your inflouens fild");
  }
}

function drawStemp(e){
  var x = e.detail.x, y = e.detail.y;
  x -= e.srcElement.offsetLeft
  y -= e.srcElement.offsetTop
  console.log(x,y)
  x -= x % stempSize
  y -= y % stempSize
  x /= stempSize
  y /= stempSize
  var z = stemp.get(x,y)
  if(z === 100) z = 0
  else z = 100
  stemp.set(x,y,z)
  squarejob(stemp,drawS,stempSize)
  }
  
  

var screen = fs(document.body);

screen.on('attain', function(){
})

screen.on('error', function(e){console.log(e)})

document.body.addEventListener('click', function(){
//  screen.request()
})

