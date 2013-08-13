var Dancer = function(top, left, timeBetweenSteps){
  this.timeBetweenSteps= timeBetweenSteps || 1000;
  this.$node = $('<span class="dancer"></span>');
  this.test = "test";
  debugger;
  this.step();
  this.distance = 0;
  this.deltaX = 0;
  this.deltaY = 0;
  this.setPosition(top, left);
  this.timer;
};


Dancer.prototype.step = function(){
  // schedules the next step
 var that = this;
 that.timer = setTimeout(function() { that.step(); }, this.timeBetweenSteps);
};

Dancer.prototype.setPosition = function(top, left){
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

Dancer.prototype.lineUp = function(top) {
  clearTimeout(this.timer);
  this.$node.animate({left: 50},1000);
  this.$node.animate({top: top},1000);
}