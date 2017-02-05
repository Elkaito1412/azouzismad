var stars = [];
var swarkh = [];
var myrkt = [];
var srkhspd = 5;
var difsped = 300;
var starspeed = 200;
var starmovsped = 1;
var mylife = 20;
var ennlife = 50;
var scr = 0;
var currentpl = 1;
var currenten = 1;
var azozship;
var azzrocket;
var rkt;
var orng;
var mrk;
var bty
var backimg;
var finalpic;
var one = 0;
var explose;
var maintitle;
var endlose;
var endwin;
function setup() {
  createCanvas(800,400);
  azozship = loadImage("../imgs/azz.png");
  azzrocket = loadImage("../imgs/rocket.png");
  rkt = loadImage("../imgs/azzrocket.png");
  orng = loadImage("../imgs/orangina.png");
  bty = loadImage("../imgs/btl.png");
  mrk = loadImage("../imgs/mrko.gif");
  backimg = loadImage("../imgs/back.jpg");
  finalpic = loadImage("../imgs/3es.png");
  explose = loadImage("../imgs/explose.png");
  maintitle = loadImage("../imgs/maintitle.jpg")
  endlose = loadImage("../imgs/l9r3awins.jpg");
  endwin = loadImage("../imgs/win.jpg");
}

function draw() {
    image(backimg,0,0,width,height);
    back();
  if (scr == 0){
    fscren();
  }
  else if (scr == 1){
    if(one == 0){
      startcount();
      one++;
    }
  inters();
  swappl();
  if(player.x > 0){
  show();
  rocketmove();
}
  if(ennemy.x < width){
  showenn();
  moverocket();
}
  fill(0,255,0);
  rect(0,0,map(mylife,0,20,0,width/2),10);
  fill(255,0,0);
  rect(width,0,map(ennlife,0,50,0,-width/2),10);
  if(mylife <= 0 || ennlife <= 0){
    if(ennlife <= 0){
      ennemy.x += 1;
      finalscreen();
    }
    else if(mylife <= 0){
      player.x -= 1;
    }
  }
  if (mylife <= 0 && currentpl == 3){
    finalscreen();
  }
}
}
//making the player
var Player = function() {
  this.x = 30;
  this.y = 30;
  this.w = 114;
  this.h = 56.8;
}
  var player = new Player();
//end making the player
//showing the player
function show(){
  player.y = mouseY;
  if(mouseY < 0){
    player.y = 0;
  }
  else if(mouseY > height-30){
    player.y = height-30;
  }
  fill(255);
    image(azozship,player.x,player.y,player.w,player.h);
}
//end showing the player
//making my rockets
var myrockets = function(){
  this.x = player.x;
  this.y = player.y+40;
  this.w = 40;
  this.h = 30;
}
//end of making my rockets
//making the new rockets
  function keyPressed(){
    myrkt.push(new myrockets());
  }
//end of making the new rockets
//moving the rockets
  function rocketmove(){
    for (var i = 0; i < myrkt.length; i++) {
      myrkt[i].x += srkhspd;
      fill(255);
      image(azzrocket,myrkt[i].x,myrkt[i].y,myrkt[i].w,myrkt[i].h);
      if(myrkt[i].x>width){
        myrkt.splice(i,1);
      }
    }
  }
//end of making the rockets
//making the stars in background
var Star = function(){
  this.x = width;
  this.y = random(0,height);
}
function newstar(){
  stars.push(new Star());
}
function back(){
  for (var i = 0; i < stars.length; i++) {
    fill(255);
    noStroke();
    ellipse(stars[i].x,stars[i].y,3,3);
    stars[i].x -= starmovsped;
    if(stars[i].x < 0){
      stars.splice(i,1);
    }
  }
}
//end making the stars in background
//making the ennemy
var Ennemy = function(){
  this.x = 710;
  this.yoff = 56;
  this.y = 0;
  this.w = 70;
  this.h = 60;
}
var ennemy = new Ennemy();
//end making the ennemy
//showing the ennemy
function showenn(){
  fill(255,0,0);
  ennemy.y = map(noise(ennemy.yoff),0,1,-200,height+200);
  if(ennemy.y < 0){
    ennemy.y = 0;
  }
  else if(ennemy.y > height-ennemy.h){
    ennemy.y = height-ennemy.h;
  }
   image(mrk,ennemy.x,ennemy.y,ennemy.w,ennemy.h);
   ennemy.yoff += 0.02;
}
//End of showing the ennemy
//making the rockets
var rockets = function(){
  this.x = ennemy.x;
  this.y = ennemy.y;
  this.w = 40;
  this.h = 20;
  this.speed = 5;
  this.orange = random(0,3);
}
//end of making the rockets
//function for starting the count
function startcount(){
setInterval(newrocket,difsped);
setInterval(newstar,starspeed);
}
//end of function for staring the count
//making a new rocket at the end of a delay

 function newrocket(){
   swarkh.push(new rockets());
   if(difsped > 300){
   difsped -= 5;
   starspeed -= 5;
 }
   srkhspd += 0.1;
   starmovsped += 0.1;
 }
//end of making it
//moving the rockets
  function moverocket(){
    for (var i = 0; i < swarkh.length; i++) {
        if(floor(swarkh[i].orange) == 2){
          image(orng,swarkh[i].x,swarkh[i].y,swarkh[i].w,swarkh[i].h);
        }
        else if(floor(swarkh[i].orange) == 1){
          image(bty,swarkh[i].x,swarkh[i].y,swarkh[i].w,swarkh[i].h);
        }
        else{
      image(rkt,swarkh[i].x,swarkh[i].y,swarkh[i].w,swarkh[i].h);
    }
      swarkh[i].x -= srkhspd;
      if(swarkh[i].x < 0){
        swarkh.splice(i,1);
      }
    }
  }
// end of making the rockets
//checking intersection with the rocket
  function inters(){
    for (var i = 0; i < swarkh.length; i++) {
      if(swarkh[i].x < player.x+player.w && swarkh[i].x > player.x && swarkh[i].y > player.y && swarkh[i].y < player.y+player.h){
        image(explose,swarkh[i].x,swarkh[i].y,40,40);
        swarkh.splice(i,1);
        mylife -= 2;
      }
    }
    for (var i = 0; i < myrkt.length; i++) {
      if(myrkt[i].x < ennemy.x+ennemy.w && myrkt[i].x > ennemy.x && myrkt[i].y > ennemy.y && myrkt[i].y < ennemy.y+ennemy.h){
        image(explose,myrkt[i].x+myrkt[i].w,myrkt[i].y,40,40);
        myrkt.splice(i,1);
        ennlife -= 2;
      }
    }
  }
//end of checking intersections
//the first screen
 function fscren(){
   background(0);
   image(maintitle,0,0);
     if(mouseY > 240 && mouseY < 340 && mouseX > 270 && mouseX < 520){
       scr = 1;
   }
 }
//end of the first screen
//swapping the players
function swappl(){
  if(player.x < 0){
    if(currentpl == 1){
    azozship = loadImage("../imgs/mnanauk.png");
    azzrocket = loadImage("../imgs/dla3.png");
    player.x = 30;
    mylife = 20;
    currentpl = 2;
  }
  else if (currentpl == 2){
    azozship = loadImage("../imgs/tijani.png");
    azzrocket = loadImage("../imgs/lcask.png");
    player.x = 30;
    mylife = 20;
    currentpl = 3;
  }
  }
}
//end of swaping the players
function finalscreen(){
  if(ennlife <= 0){
  background(0);
  image(endwin,0,0);
}
  else if(mylife < 0){
    background(0);
    fill(0,255,0);
    ellipse(width/2,height/2,100,100);
    image(endlose,0,0);
  }
}
