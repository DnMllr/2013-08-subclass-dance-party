describe("soulTrainDancer", function() {

  var soulTrainDancer;
  var timeBetweenSteps = 100;
  var clock;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    soulTrainDancer = new SoulTrainDancer(10, 20, timeBetweenSteps);
  });

  it("should have a jQuery $node object", function(){
    expect(soulTrainDancer.$node).to.be.an.instanceof(jQuery);
  });
/*
  it("should have a step function that makes its node blink", function() {
    sinon.spy(soulTrainDancer.$node, 'toggle');
    soulTrainDancer.step();
    expect(soulTrainDancer.$node.toggle.called).to.be.true;
  });
*/
  describe("dance", function(){
    it("should call step at least once per second", function(){
      sinon.spy(soulTrainDancer, "step");
      expect(soulTrainDancer.step.callCount).to.be.equal(0)
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
   // clock.tick(timeBetweenSteps);

      expect(soulTrainDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(soulTrainDancer.step.callCount).to.be.equal(2);
    });
  });
});
