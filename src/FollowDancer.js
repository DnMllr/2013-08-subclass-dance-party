var FollowDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this, top, left, timeBetweenSteps);
};

FollowDancer.prototype = Object.create(Dancer.prototype);
FollowDancer.prototype.constructor = FollowDancer;
this.$node.addClass("follow");

FollowDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this);

  this.$node.animate({left: this.left, top: this.top}, this.timeBetweenSteps, "easeOutSine");
  //var opac =  Math.pow(this.distance, -1);
 // this.$node.transit({ opacity: opac});

  // Update deltaX and deltaY from vector data
  this.deltaX = Math.cos(this.angle) * Math.pow((this.distance), 2)/this.timeBetweenSteps;
  this.deltaY = Math.sin(this.angle) * Math.pow((this.distance), 2)/this.timeBetweenSteps;
  this.left = parseInt(this.$node.css("left"), 10) + this.deltaX;
  this.top = parseInt(this.$node.css("top"), 10) + this.deltaY;
//  this.border = parseInt(this.$node.css("border-radius"), 10) * 10/this.distance;


};

FollowDancer.prototype.calculateForce = function() {
  this.deltaX = Math.cos(this.angle) * (this.distance);
  this.deltaY = Math.sin(this.angle) * (this.distance);

}

FollowDancer.prototype.applyForce = function() {
  this.left = parseInt(this.$node.css("left"), 10) + this.deltaX;
  this.top = parseInt(this.$node.css("top"), 10) + this.deltaY;
}