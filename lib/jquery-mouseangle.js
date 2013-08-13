;
/*
 *  jQuery Mouse Angle
 *  Get the angle of the mouse relative to the center point of an element
 *  Barnabas Kendall (barnabas@bkendall.biz)
 */


(function ($, window, document, undefined) {
	// Create the defaults once
	var pluginName = 'mouseAngle',
			defaults = {
				updateLimit:50, // wait at least this number of miliseconds between updates, may be more
				onlyMouseDown:true, // if true, only updates when the mouse is down. set false to update on mouse over
				isAbsolute:false, // if true, always returns the number of degrees exactly, otherwise keeps track of how much the item has been spun around
				limitRPM:0,				// if a number > 0, then limit the spin to this number of rotations per minute
				movementThreshold:3     // until the mouse moves this much (pixels) x or y, don't send updates
			};

	/* =============== Private utility functions  ===============*/

	function clamp(obj, name, min, max) {
		if (obj[name] < min) {
			obj[name] = min;
		} else if (obj[name] > max) {
			obj[name] = max;
		}
	}

	/* =============== Plugin constructor and definition  ===============*/

	function Plugin(element, options) {
		this.element = element;
		this.$element = $(element);
		this.options = $.extend({}, defaults, options);

		// fix options and make sure they are sane
		clamp(this.options, 'updateLimit', 10, 1000);
		clamp(this.options, 'limitRPM', 0, 180);	// 180 = 2 rotations/second, pretty fast to drag
		clamp(this.options, 'movementThreshold', 0, Math.min(this.$element.height() / 2, this.$element.width() / 2));	// half the container

		this._name = pluginName;
		this._lastUpdate = new Date().getTime();
		this._lastAngle = null;

		// set up simple CSS rotate target
		if (this.options.rotateTarget) {
			this.$rotateTarget = $(this.options.rotateTarget);
		}

		if (this.options.limitRPM > 0) {
			var degreesPerSecond = this.options.limitRPM * 6;
			this._maxRadiansPerSec = Math.abs(degreesPerSecond * Math.PI / 180);
		}

		var base = this;		// avoid ambiguity; what is "this" anyway?

		/* =============== Plugin methods  ===============*/

		this.onAngleStart = function (event) {
			var pCenter = base.getCenterPoint();
			var pMouse = new mouseAngle.point(event.pageX, event.pageY);
			var aMouse = mouseAngle.pointsToAngle(pCenter, pMouse);

			base.setCenterPoint(pCenter);
			base.setStartPoint(pMouse);
			base.setStartAngle(aMouse);
			base.$element.trigger(base._name + '.start', aMouse);

			base._lastAngle = aMouse;
			base._lastUpdate = event.timeStamp || new Date().getTime();
		};

		this.onAngleMove = function (event) {
			// stop here if too many updates
			var now = event.timeStamp || new Date().getTime();
			if (now - base._lastUpdate < base.options.updateLimit) return;

			var pMouse = new mouseAngle.point(event.pageX, event.pageY);
			var pStart = base.getStartPoint();

			if(pMouse.maxDelta(pStart) < base.options.movementThreshold ) {
				return;
			}

			var aMouse = base.getMouseAngle(pMouse);
			if (base.$rotateTarget) {
				mouseAngle.setRotate(base.$rotateTarget, aMouse.degrees);
			}
			base.$element.trigger(base._name + '.update', aMouse);
			base._lastUpdate = now;
		};

		this.onAngleEnd = function (event) {
			var pMouse = new mouseAngle.point(event.pageX, event.pageY);
			var pStart = base.getStartPoint();
			var aStart = base.getStartAngle();

			if(pMouse.maxDelta(pStart) < base.options.movementThreshold ) {
				base.$element.trigger(base._name + '.click', aStart);
				return;
			}

			var pCenter = base.getCenterPoint();
			var aMouse = mouseAngle.pointsToAngle(pCenter, pMouse);
			var aEnd = base.getMouseAngle(pMouse);

			aEnd.direction = aStart.radians < aMouse.radians ? 1 : -1;
			// todo: fix the reverse direction problem when the mouse rolls over 9 o'clock

			//console.log('direction: ' + dir + '; ' + (dir > 0 ? 'clockwise' : 'counter-clockwise'));

			base.setCurrentAngle(aEnd);
			base.$element.trigger(base._name + '.end', aEnd);
			base._lastAngle = null;
			base._lastUpdate = event.timeStamp || new Date().getTime();
		};

		this.getMouseAngle = function (pMouse) {
			var pCenter = base.getCenterPoint();
			var aMouse = mouseAngle.pointsToAngle(pCenter, pMouse);

			if (!base.options.isAbsolute) {
				var aStart = base.getStartAngle(), aCurrent = base.getCurrentAngle();
				if (aStart && aCurrent) {
					aMouse = mouseAngle.radiansToAngle(aCurrent.radians + aMouse.radians - aStart.radians);
				}
			}

			// make sure the max rotation isn't too high
			if (base._lastAngle) {
				var radLast = base._lastAngle.radians;
				var radDelta = radLast - aMouse.radians;

				if (this.options.limitRPM > 0) {
					var secDelta = (new Date().getTime() - base._lastUpdate) / 1000;
					var radLimit = this._maxRadiansPerSec * secDelta;

					if (Math.abs(radDelta) > radLimit) {
						if (radDelta > 0) {
							radLimit *= -1;
						}
						aMouse = mouseAngle.radiansToAngle(radLast + radLimit);
						if (console && console.log) {
							console.log('Speed limit: ' + radDelta.toFixed(3) + ' changed to ' + radLimit.toFixed(3));
						}
						radDelta = radLimit;
					}
				}

				aMouse.delta = radDelta;
			}

			base._lastAngle = aMouse;
			return aMouse;
		};

		this.getCenterPoint = function () {
			return base._centerPoint || base.$element.data('centerPoint') || mouseAngle.getCenterPoint(base.$element);
		};

		this.setCenterPoint = function (point) {
			base._centerPoint = point;
			base.$element.data('centerPoint', point);
		};

		this.getStartPoint = function () {
			return base._startPoint || base.$element.data('startPoint');
		};

		this.setStartPoint = function (point) {
			base._startPoint = point;
			base.$element.data('startPoint', point);
		};

		this.getStartAngle = function () {
			return base._startAngle || base.$element.data('startAngle');
		};

		this.setStartAngle = function (angle) {
			base._startAngle = angle;
			base.$element.data('startAngle', angle);
		};

		this.getCurrentAngle = function () {
			return base._currentAngle || base.$element.data('currentAngle');
		};

		this.setCurrentAngle = function (angle) {
			if (base.$rotateTarget) {
				mouseAngle.setRotate(base.$rotateTarget, angle.degrees);
			}
			base._currentAngle = angle;
			base.$element.data('currentAngle', angle);
		};

		this.init = function () {
			var isMouseDown = false;
			if (base.options.onlyMouseDown) {
				base.$element.bind('mousedown',
						function (event) {
							isMouseDown = true;
							base.onAngleStart(event);
							base.$element.bind('mousemove.angle', function (event) {
								base.onAngleMove(event);
							});
						}).bind('mouseup mouseleave', function (event) {
							if (isMouseDown) {
								base.onAngleEnd(event);
							}
							base.$element.unbind('mousemove.angle');
							isMouseDown = false;
						});
			} else {
				base.$element.mouseenter(
						function (event) {
							base.onAngleStart(event);
						}).mousemove(
						function (event) {
							base.onAngleMove(event);
						}).mouseleave(function (event) {
							base.onAngleEnd(event);
						});
			}

			// touch events
			base.$element.bind('touchstart touchmove touchend', function (e) {
				e.preventDefault();
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				switch (e.type) {
					case 'touchstart':
						base.onAngleStart(touch);
						break;
					case 'touchend':
						base.onAngleEnd(touch);
						break;
					default:
						base.onAngleMove(touch);
				}
			});

		};

		this.init();
	}

	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}
		});
	}

})(jQuery, window, document);

/* =============== Public utility functions  ===============*/

var mouseAngle = mouseAngle || {}; 	// namespace

mouseAngle.point = function (px, py) {
	this.x = parseInt(px);
	this.y = parseInt(py);
};
mouseAngle.point.prototype.toString = function () {
	return 'x: ' + Math.round(this.x) + ', y: ' + Math.round(this.y);
};
mouseAngle.point.prototype.maxDelta = function(other) {
	if(other && other.x && other.y) {
		return Math.max(Math.abs(this.x - other.x), Math.abs(this.y - other.y))
	}
	return 0;
};


mouseAngle.angle = function (rad, deg, pct) {
	this.radians = rad;
	this.degrees = deg;
	this.percent = pct;
};

mouseAngle.angle.prototype.toString = function() {
	return (this.percent * 100).toFixed(2) + '%; ' + (this.degrees).toFixed(1) + '°; ' + this.radians.toFixed(3);
};

mouseAngle.getCenterPoint = function ($el) {
	var pos = $el.offset();
	var centerX = pos.left + ($el.outerWidth() / 2);
	var centerY = pos.top + ($el.outerHeight() / 2);
	return new mouseAngle.point(centerX, centerY);
};

mouseAngle.radiansToAngle = function (radians) {
	var degrees = (radians * 180 / Math.PI);
	while (degrees > 360) degrees -= 360;
	while (degrees < 0) degrees += 360;

	var percent = degrees / 360;
	return new mouseAngle.angle(radians, degrees, percent);
};

mouseAngle.degreesToAngle = function (degrees) {
	var radians = degrees * Math.PI / 180;
	return mouseAngle.radiansToAngle(radians);
};

mouseAngle.percentToAngle = function (percent) {
	while (percent > 1) percent -= 1;
	while (percent < 0) percent += 1;

	var degrees = 360 * percent;
	return mouseAngle.degreesToAngle(degrees);
};

mouseAngle.pointsToAngle = function (p1, p2) {
	return mouseAngle.radiansToAngle(Math.atan2(p2.y - p1.y, p2.x - p1.x));
};

mouseAngle.setRotate = function ($el, deg) {
	deg += 90;  // offset to translate between CSS and math degrees
	while (deg < 0) deg += 360;
	while (deg > 360) deg -= 360;

	$el.css({
		'transform':'rotate(' + deg + 'deg)',
		'-ms-transform':'rotate(' + deg + 'deg)',
		'-webkit-transform':'rotate(' + deg + 'deg)',
		'-o-transform':'rotate(' + deg + 'deg)',
		'-moz-transform':'rotate(' + deg + 'deg)'
	});
};