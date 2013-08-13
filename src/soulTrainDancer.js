var SoulTrainDancer = function(top, left, timeBetweenSteps){

  this.x = 100;
  this.y = 100;
  this.direction = true;
  Dancer.call(this,top, left, timeBetweenSteps);
  this.$node = $('<img src="http://s3.evcdn.com/images/block/I0-001/006/676/674-9.jpeg_/soul-train-saturdayz-club-cabana-74.jpeg"></img>');
  this.$node.addClass("soultrain");
};
SoulTrainDancer.prototype = Object.create(Dancer.prototype);
SoulTrainDancer.prototype.constructor = SoulTrainDancer;


SoulTrainDancer.prototype.step = function(){
 
  Dancer.prototype.step.call(this);

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