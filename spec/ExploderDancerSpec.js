describe("exploderDancer", function() {

  var exploderDancer;
  var timeBetweenSteps = 100;
  var clock;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    exploderDancer = new ExploderDancer(10, 20, timeBetweenSteps);
  });

  it("should have a jQuery $node object", function(){
    expect(exploderDancer.$node).to.be.an.instanceof(jQuery);
  });

  describe("dance", function(){
    it("should call step at least once per second", function(){
      sinon.spy(exploderDancer, "step");
      expect(exploderDancer.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
     // clock.tick(timeBetweenSteps);

      expect(exploderDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(exploderDancer.step.callCount).to.be.equal(2);
    });
  });
});
