var BlinkyDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this, top, left, timeBetweenSteps);
};

BlinkyDancer.prototype = Object.create(Dancer.prototype);
BlinkyDancer.prototype.constructor = BlinkyDancer;


BlinkyDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this);
<<<<<<< HEAD

=======
>>>>>>> 06ebf7ba9ef4eda7d240a771e016b0e5ac668edf
  /* toggle() is a jQuery method to show/hide the <span> tag.
   * See http://api.jquery.com/category/effects/ for this and
   * other effects you can use on a jQuery-wrapped html tag. */
  this.$node.toggle();

};
<<<<<<< HEAD

BlinkyDancer.prototype.calculateForce = function() {
  this.distance
  Math.sin(this.angle) Math.cos(this.angle)
}

BlinkyDancer.prototype.applyForce = function() {
  this.distance
}
=======
>>>>>>> 06ebf7ba9ef4eda7d240a771e016b0e5ac668edf
