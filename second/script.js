

var frag, //globals are coolz
    slider,
    canvas,
    context,
    render,
    init;

init=function(){
  frag = document.createDocumentFragment();
  slider = document.createElement('input');
  canvas = document.createElement('canvas');
  context = canvas.getContext( '2d' );
  $(canvas).attr({
    id:'canvas',
    width:screen.width,
    height:screen.height
  });
  $(slider).attr({
    id:'rotate',
    type:'range',
    value:0,
    step:1,
    min:0,
    max:360
  });

  slider.addEventListener('input',function(e){
    render(e.target.value);
  });

  frag.appendChild(slider);
  frag.appendChild(canvas);
  document.body.appendChild(frag);

  context.lineWidth=1;
  context.strokeStyle = '#ffffff';
  render();
};

render=function(angle){
  if(angle!==undefined ){
    this.angle=angle;
  }
  else if(this.angle==undefined){
    this.angle=0;
  }
  console.log('render '+this.angle);
  context.clearRect(0,0,canvas.width,canvas.height);
  context.save();
  context.translate(screen.width/2,screen.height/2);//move to center
  context.beginPath();
  //context.translate(100,100);
  context.rotate(this.angle* Math.PI/180);
  context.rect(-50,-50,100,100); //pivot = 0,0

  context.stroke();
  context.restore();

};
init();



