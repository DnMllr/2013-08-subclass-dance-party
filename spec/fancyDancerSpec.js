describe("fancyDancer", function() {

  var fancyDancer;
  var timeBetweenSteps = 100;
  var clock;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    fancyDancer = new FancyDancer(10, 20, timeBetweenSteps);
  });

  it("should have a jQuery $node object", function(){
    expect(fancyDancer.$node).to.be.an.instanceof(jQuery);
  });

  describe("dance", function(){
    it("should call step at least once per second", function(){
      sinon.spy(fancyDancer, "step");
      expect(fancyDancer.step.callCount).to.be.equal(0)
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
   // clock.tick(timeBetweenSteps);

      expect(fancyDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(fancyDancer.step.callCount).to.be.equal(2);
    });
  });
});
