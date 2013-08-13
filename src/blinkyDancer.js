var BlinkyDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this, top, left, timeBetweenSteps);
  this.test = "test2"
};

BlinkyDancer.prototype = Object.create(Dancer.prototype);
BlinkyDancer.prototype.constructor = BlinkyDancer;


BlinkyDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this);
  /* toggle() is a jQuery method to show/hide the <span> tag.
   * See http://api.jquery.com/category/effects/ for this and
   * other effects you can use on a jQuery-wrapped html tag. */
  //this.$node.toggle();

  // Apply animate based on current deltaX deltaY
  this.$node.animate({left: this.left, top: this.top}, this.timeBetweenSteps, "easeOutSine");
  //var opac =  Math.pow(this.distance, -1);
 // this.$node.transit({ opacity: opac});

  // Update deltaX and deltaY from vector data
  this.deltaX = Math.cos(this.angle) * (this.distance);
  this.deltaY = Math.sin(this.angle) * (this.distance);
  this.left = parseInt(this.$node.css("left"), 10) + this.deltaX;
  this.top = parseInt(this.$node.css("top"), 10) + this.deltaY;
//  this.border = parseInt(this.$node.css("border-radius"), 10) * 10/this.distance;


};

BlinkyDancer.prototype.calculateForce = function() {
  this.deltaX = Math.cos(this.angle) * (this.distance);
  this.deltaY = Math.sin(this.angle) * (this.distance);

}

BlinkyDancer.prototype.applyForce = function() {
  this.left = parseInt(this.$node.css("left"), 10) + this.deltaX;
  this.top = parseInt(this.$node.css("top"), 10) + this.deltaY;
}