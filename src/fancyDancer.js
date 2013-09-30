var FancyDancer = function(top, left, timeBetweenSteps){

  this.x = 100;
  this.direction = true;
  Dancer.call(this,top, left, timeBetweenSteps);
};
FancyDancer.prototype = Object.create(Dancer.prototype);
FancyDancer.prototype.constructor = FancyDancer;

FancyDancer.prototype.step = function(){
  Dancer.prototype.step.call(this);
  this.$node.addClass("fancy");
  this.$node.animate({left: this.x},1000);
  this.direction ? this.x +=400 : this.x -= 400;
  if (this.x > 1600 || this.x < 100) { this.direction = !this.direction; }
  var growth = Math.floor(Math.random() * 100 );
  this.$node.animate({'border-width': growth +'px'},500);
};