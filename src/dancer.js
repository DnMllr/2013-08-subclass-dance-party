// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps){
  this.timeBetweenSteps= timeBetweenSteps || 1000;
  // use jQuery to create an HTML <span> tag
  this.$node = $('<span class="dancer"></span>');
  this.test = "test";
  this.step();
  this.distance = 0;
  this.deltaX = 0;
  this.deltaY = 0;
  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  this.setPosition(top, left);
};


Dancer.prototype.step = function(){
  // the basic dancer doesn't do anything interesting at all on each step,
  // it just schedules the next step
 var that = this;
 setTimeout(function() { that.step(); }, this.timeBetweenSteps);
};

Dancer.prototype.setPosition = function(top, left){
/* Use css top and left properties to position our <span> tag
 * where it belongs on the page. See http://api.jquery.com/css/
 */
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};

Dancer.prototype.sendPosition = function(distance,  angle) {
  this.distance = distance;
  this.angle = angle;
}
/*
Dancer.prototype.lineUp = function() {
  var styleSettings = {
    //left: 50
  };
  this.$node.css(styleSettings)
}*/