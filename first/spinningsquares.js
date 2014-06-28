// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(/* function */ callback, /* DOMElement */ element){
      window.setTimeout(callback, 1000 / 60);
    };
})();

/*
var context,canvas;
var init=function(scope,options){

  canvas = document.createElement( 'canvas' );
  canvas.width = screen.width;
  canvas.height = screen.height;
  document.body.appendChild(canvas);
  context = canvas.getContext( '2d' );
  context.strokeStyle = 'rgb(0,0,0)';
  context.lineWidth=1;
  context.fillStyle = 'rgb(255,255,255)';
  context.beginPath();
  context.rect(0,0,canvas.width,canvas.height);
  context.fill();

};


var Square=function(params){
  this.params=params?params:{
    center:[-(screen.width/2),0],
    size:100,
    rotation:0,
    twist:0,
    depth:0,
    max_depth:10
  };

  this.draw=function(){

    context.save();
    context.translate(canvas.width/2,canvas.height/2);
    context.beginPath();

    //context.translate(-(this.params.size/2),-(this.params.size/2));
    //context.rotate(this.params.rotation*(Math.PI/180));
    //context.translate(this.params.size/2,this.params.size/2);

    context.rotate(this.params.rotation*(Math.PI/180));
    context.rect((this.params.center[0]-(this.params.size/2)),
                 (this.params.center[1]-(this.params.size/2)),
                 this.params.size,
                 this.params.size);

    context.stroke();

    context.restore();

  };

  this.mutate=function(params){
    params.center[0]+=100;
    params.center[1]+=0;
    params.rotation+=10;
    params.twist+=0;
    params.size+=0;
    return params;
  };

  this.spawn=function(){
    this.params.depth++;
    var new_params;
    new_params=this.mutate(JSON.parse(JSON.stringify(this.params)));
    this.child=new Square(new_params);
    this.child.spawn();

  };


  this.draw();
  if(this.params.depth<this.params.max_depth){
    this.spawn();
  }
  return this;
};




init();
var square=new Square();

*/

 var canvas, context, deg=1;

init();
animate();
//draw();
function init() {
  console.log('hi');
  canvas = document.createElement( 'canvas' );
  canvas.width = 500;
  canvas.height = 500;

  context = canvas.getContext( '2d' );

  document.body.appendChild( canvas );
  context.strokeStyle = 'rgb(200,200,20)';

}

function animate() {
  requestAnimFrame( animate );
  draw();

}

function draw() {
  if(this.params==undefined){
    this.params={
      size:500,
      width:100,
      max_depth:2,
      rotation:0
    };

  }
context.clearRect(0,0,canvas.width,canvas.height);

  var draw_square=function(center,size,depth,rotation){
    //console.log(depth);
    //console.log(arguments);
   // context.fill();
    context.save();
    context.beginPath();
    context.translate(center[0]+250,center[1]+250);
    context.rotate(rotation* Math.PI/180);
    context.rect((center[0]-(size/2)),(center[1]-(size/2)),size,size);
    //context.fill();
    //context.endPath();
    context.stroke();
    context.restore();
    if(depth>1){



      //console.log(depth);
      var corners=get_corners(center,size),
          i;
      for(i=0;i<corners.length;i++){
        //console.log(corners[i]);
        //rotation+=1;
        draw_square(corners[i],size,depth-1,rotation*(.3*depth));
      }




    }
  },
      get_corners=function(center,size){
        var negative=function(i){
          return center[i]-(size/2);
        },
            positive=function(i){
              return center[i]+(size/2);
            };


        return [
              [negative(0),negative(1)],
              [negative(0),positive(1)],
              [positive(0),negative(1)],
              [positive(0),positive(1)]
            ];
      };
  this.params.rotation+=1;
  //console.log(this.params.rotation);
  //console.log('center:',[this.params.size/2,this.params.size/2]);
  draw_square([0,0],this.params.width,this.params.max_depth,this.params.rotation);
  //var time = new Date().getTime() * 0.002;
  //var x = Math.sin( time ) * 192 + 256;
  //var y = Math.cos( time * 0.9 ) * 192 + 256;
  //toggle = !toggle;

  //context.fillStyle = toggle ? 'rgb(200,200,20)' :  'rgb(20,20,200)';
  //context.beginPath();
  //context.arc( x, y, 10, 0, Math.PI * 2, true );
  //context.closePath();
  //context.fill();

  //context.rect(200,200,100,100);
  //context.stroke();
}
