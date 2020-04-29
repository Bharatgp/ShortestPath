function Cell(i, j, w) {
  this.i = i;
  this.j = j;
  this.x = i * w;
  this.y = j * w;
  this.w = w;
  this.revealed = false;
  this.col=false;
  this.rev2=false;
}

Cell.prototype.show = function() {
  if(this.rev2){
      fill(255,0,0);
      rect(this.x, this.y, this.w, this.w);
    
  }
  if (this.revealed) {
      fill(127);
      rect(this.x, this.y, this.w, this.w);
     
  }
  if(this.col){
    fill(255, 204, 0);
    rect(this.x, this.y, this.w, this.w);
  }
}
Cell.prototype.contains = function(x, y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}
Cell.prototype.reveal = function() {
  this.revealed = true;
}