var ExploderDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node.addClass("follow");
};

ExploderDancer.prototype = Object.create(Dancer.prototype);
ExploderDancer.prototype.constructor = ExploderDancer;


ExploderDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this);

  this.$node.css({left: this.left, top: this.top});
  //var opac =  Math.pow(this.distance, -1);
 // this.$node.transit({ opacity: opac});

  // Update deltaX and deltaY from vector data
//  this.border = parseInt(this.$node.css("border-radius"), 10) * 10/this.distance;
  this.calculateForce();
  this.applyForce();
};

ExploderDancer.prototype.calculateForce = function() {
  this.deltaX = Math.cos(this.angle) * (this.distance);
  this.deltaY = Math.sin(this.angle) * (this.distance);
}

ExploderDancer.prototype.applyForce = function() {
  this.left = this.deltaX + parseInt(this.$node.css("left"), 10);
  this.top = this.deltaY + parseInt(this.$node.css("top"), 10);
}