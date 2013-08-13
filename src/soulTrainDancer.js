var SoulTrainDancer = function(top, left, timeBetweenSteps){

  this.x = 100;
  this.y = 100;
  this.direction = true;
  Dancer.call(this,top, left, timeBetweenSteps);

  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
  //this.$node = $('<span class="dancer"></span>');

};
//debugger;
SoulTrainDancer.prototype = Object.create(Dancer.prototype);
SoulTrainDancer.prototype.constructor = SoulTrainDancer;

SoulTrainDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step

  Dancer.prototype.step.call(this);
  this.$node.addClass("soultrain");

  this.$node.animate({left: this.x},1000);
  this.direction ? this.x +=400 : this.x -= 400;
  if (this.x > 1600 || this.x < 100) { this.direction = !this.direction; }

  this.$node.animate({top: this.y},1000);
  this.direction ? this.y +=400 : this.y -= 400;
  if (this.y > 800 || this.y < 100) { this.direction = !this.direction; }

  var growth = Math.floor(Math.random() * 100 );
  this.$node.animate({'border-width': growth +'px'},500);
  /* toggle() is a jQuery method to show/hide the <span> tag.
   * See http://api.jquery.com/category/effects/ for this and
   * other effects you can use on a jQuery-wrapped html tag. */
   console.log(this);
  //this.$node.toggle();
};

BlinkyDancer.prototype.calculateForce = function() {
  this.distance;
  this.angle;
}

BlinkyDancer.prototype.applyForce = function() {

}