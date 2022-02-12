const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var cH
var cW

let engine;
let world;
var rope, rope2, rope3,rope4,rope5;
var fruit,ground;
var fruit_con,fruit_con_2,fruit_con_3,fruit_con_4,fruit_con_5;

var bg_img;
var food;
var rabbit;

var button, button2,button3,button4,button5,button6,button7,button8,button9,button10;
var b1,b2,b3,b4,button_img;
var blower;
var bunny;
var blink,eat,sad;
var mute_btn;

//var fr,rope2;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  button_img=loadImage('cut_btn.png')

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)



  if (isMobile){
    cW = displayWidth
    cH = displayHeight
    createCanvas(displayWidth+80,displayHeight)
  }
  else{
    cW = windowWidth
    cH = windowHeight
    createCanvas(windowWidth,windowHeight)
  }


 
  frameRate(80);

  /*bk_song.play();
  bk_song.setVolume(0.5);*/

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  //button.mouseClicked(drop);

  /*button2 = createImg('cut_btn.png');
  button2.position(1840,30);
  button2.size(50,50);
  //button2.mouseClicked(drop2);

  button3 = createImg('cut_btn.png');
  button3.position(20,130);
  button3.size(50,50);
  //button3.mouseClicked(drop3);

  button4 = createImg('cut_btn.png');
  button4.position(1840,130);
  button4.size(50,50);
  //button4.mouseClicked(drop2);

  button5 = createImg('cut_btn.png');
  button5.position(20,230);
  button5.size(50,50);
  //button5.mouseClicked(drop);

  button6 = createImg('cut_btn.png');
  button6.position(1840,230);
  button6.size(50,50);
  //button6.mouseClicked(drop2);

  button7 = createImg('cut_btn.png');
  button7.position(20,330);
  button7.size(50,50);
  //button7.mouseClicked(drop3);

  button8 = createImg('cut_btn.png');
  button8.position(1840,330);
  button8.size(50,50);
  //button8.mouseClicked(drop2);

  button9 = createImg('cut_btn.png');
  button9.position(20,430);
  button9.size(50,50);
  //button9.mouseClicked(drop3);

  button10 = createImg('cut_btn.png');
  button10.position(1840,430);
  button10.size(50,50);
  //button10.mouseClicked(drop2);*/

  mute_btn = createImg('mute.png');
  mute_btn.position(1840, 850);
  mute_btn.size(50,50);
  //mute_btn.mouseClicked(mute);
  
  rope = new Rope(20,{x:25,y:30});
  
  rope2 = new Rope(20,{x:1200,y:10});
  rope3 = new Rope(4,{x:180,y:160});
  rope4 = new Rope(4,{x:180,y:160});
  rope5 = new Rope(4,{x:180,y:160});
  ground = new Ground(200,cH,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(170,cH-220,100,100);
  bunny.scale = 0.35;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(950,10,20);
  //Matter.Composite.add(rope.body,fruit);
  var button_option={
    isStatic:true
  }
  b1 = Bodies.circle(1200,10,20,button_option);
  Matter.Composite.add(rope.body,b1);
  b2 = Bodies.circle(20,130,20,button_option);
  Matter.Composite.add(rope2.body,b2);

  fruit_con = new Link(rope,b1);

  fruit_con_2 = new Link(rope2,b2);
  //fruit_con_3 = new Link(rope3,fruit);
  //fruit_con_4 = new Link(rope4,fruit);
  //fruit_con_5 = new Link(rope5,fruit);

  
  
  //fruit_con = new Link(rope,button10);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,cW+80,cH);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  push();
  imageMode(CENTER);
  image(button_img,b2.position.x,b2.position.y,70,70);
  image(button_img,b1.position.x,b1.position.y,70,70);
  pop();
  

  rope.show();
  rope2.show();
  //rope3.show();
  //rope4.show();
  //rope5.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
  }


  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
     
   }
   
}

function drop()
{
  cut_sound.play();
  //rope.break();
  //fruit_con.detach();
  //fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  //rope2.break();
  //fruit_con_2.detach();
  //fruit_con_2 = null; 
}

function drop3()
{
  cut_sound.play();
  //rope3.break();
  //fruit_con_3.detach();
  //fruit_con_3 = null; 
}
function drop4()
{
  cut_sound.play();
  //rope3.break();
  //fruit_con_4.detach();
  //fruit_con_4 = null; 
}
  function drop5()
  {
    cut_sound.play();
    //rope3.break();
    //fruit_con_5.detach();
    //fruit_con_5 = null; 
  }

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=50)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}