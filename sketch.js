function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
var grid;
var cols;
var rows;
var w = 20;
var obs=[];
var ctt=0;
var lin=0;
var count_mouse=0;
var start;
var end;
var min1=99999;
var min2=99999;
var mdps;
var mdpe;
var fp=-1;
 var above=[];
var below=[];
var dis_above=0;
var dis_below=0;
function get_Distance(x1,y1,x2,y2){
  var a = x1 - x2;
var b = y1 - y2;

var c = Math.sqrt( a*a + b*b );
  return c;
}
function CheckPoint(P){
 
  
  if(P.y>start.y || P.y>end.y){
    return 1;
  }else{
    return 0;
  }
  
}
function orientation(p,q,r) 
{ 
    var val = (q.y - p.y) * (r.x - q.x) - 
              (q.x - p.x) * (r.y - q.y); 
  
    if (val == 0) {
      return 0; 
    }
    if(val>0){
      return 1;
    }else{
      return 2;
    }
    
} 

function setup() {
  createCanvas(1400, 900);
  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols, rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }
}

function mousePressed() {

  
  if(count_mouse<2){
    for (var i2 = 0; i2 < cols; i2++) {
    for (var j2 = 0; j2 < rows; j2++) {
      if (grid[i2][j2].contains(mouseX, mouseY)) {
        //obs.push(grid[i][j]);
        
        grid[i2][j2].rev2=true;
        if(count_mouse==0){
          start=grid[i2][j2];
        }else{
          end=grid[i2][j2];
      }
    }
  }
  }
  }
  else{
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
       
        obs.push(grid[i][j]);
        grid[i][j].reveal();
        
      }
    }
  }
  }
  count_mouse=count_mouse+1;
}
function draw() {
  background(255);
   //if(lin==1){
    for(var x1=1;x1<obs.length;x1++){
      strokeWeight(1);
      line(obs[x1-1].x+10,obs[x1-1].y+10,obs[x1].x+10,obs[x1].y+10);
    }
  if(lin==1){
      line(obs[0].x+10,obs[0].y+10,obs[obs.length-1].x+10,obs[obs.length-1].y+10);
    strokeWeight(4);
      line(start.x+10,start.y+10,mdps.x+10,mdps.y+10);
    
    line(end.x+10,end.y+10,mdpe.x+10,mdpe.y+10);
    
  }
  if(fp==0){
    for(var x1=1;x1<below.length;x1++){
       strokeWeight(4);
      line(below[x1-1].x+10,below[x1-1].y+10,below[x1].x+10,below[x1].y+10);
     
    }
    
  }
   if(fp==1){
      strokeWeight(4);
    for(var x1=1;x1<above.length;x1++){
      line(above[x1-1].x+10,above[x1-1].y+10,above[x1].x+10,above[x1].y+10);
     
    }
    
  }
  
  //}
  
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
 
}
function Chull(){

var hull=[];
 
stroke(126);
  var ptr1=0;
  var n=obs.length;
  if(n<3) return;
  var l=0;
  
  for (var i = 1; i < n; i++) {
    if (obs[i].x < obs[l].x) 
    {
            l = i; 
    }
  }
  var p = l, q;
  
  do{
     
    hull.push(obs[p]);

    ptr1=ptr1+1;
    q = (p+1)%n; 
    for (var t = 0; t < n; t++) 
    { 
        if (orientation(obs[p], obs[t], obs[q]) == 2) 
        {
               q = t; 
        }
    } 
  p = q; 
  }while(p!=l)
     
    for(var z=0;z<ptr1;z++){
        if(CheckPoint(hull[z])==0){
          below.push(hull[z]);
        }
        else{
          above.push(hull[z]);
        }
      /* if(min1>get_Distance(start.x,start.y,hull[z].x,hull[z].y)){
          min1=get_Distance(start.x,start.y,hull[z].x,hull[z].y);
          mdps=hull[z];
        }
        if(min2>get_Distance(end.x,end.y,hull[z].x,hull[z].y)){
          min2=get_Distance(end.x,end.y,hull[z].x,hull[z].y);
          mdpe=hull[z];
        }*/
       stroke(0);
       noFill();
     
      hull[z].revealed = false;
      hull[z].col=true;
     
    }
  for(var z =1;z<below.size;z++){
    dis_below=dis_below+get_Distance(below[z-1].x,below[z-1].y,below[z].x,below[z].y);
    
  }
  dis_below=dis_below+get_Distance(below[0].x,below[0].y,start.x,start.y);
  dis_below=dis_below+get_Distance(below[below.length-1].x,below[below.length-1].y,end.x,end.y);
  for(var z =1;z<below.size;z++){
    dis_above=dis_above+get_Distance(above[z-1].x,above[z-1].y,above[z].x,above[z].y);
    
  }
  dis_above=dis_above+get_Distance(above[0].x,above[0].y,end.x,end.y);
  dis_above=dis_above+get_Distance(above[above.length-1].x,above[above.length-1].y,start.x,start.y);
  if(dis_above>dis_below){
    mdps=below[0];
    mdpe=below[below.length-1];
    fp=0;
  }
  else{
    mdpe=above[0];
    mdps=above[above.length-1];
    fp=1;
  }
   lin=1;
}
