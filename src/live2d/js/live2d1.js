! function(t) {
	function e(r) {
		if (i[r]) return i[r].exports;
		var o = i[r] = {
			i: r,
			l: !1,
			exports: {}
		};
		return t[r].call(o.exports, o, o.exports, e), o.l = !0, o.exports
	}
	var i = {};
	e.m = t, e.c = i, e.d = function(t, i, r) {
		e.o(t, i) || Object.defineProperty(t, i, {
			configurable: !1,
			enumerable: !0,
			get: r
		})
	}, e.n = function(t) {
		var i = t && t.__esModule ? function() {
			return t.default
		} : function() {
			return t
		};
		return e.d(i, "a", i), i
	}, e.o = function(t, e) {
		return Object.prototype.hasOwnProperty.call(t, e)
	}, e.p = "", e(e.s = 4)
}([function(t, e, i) {
	"use strict";

	function r() {
		this.live2DModel = null, this.modelMatrix = null, this.eyeBlink = null, this.physics = null, this.pose = null, this.debugMode = !1, this.initialized = !1, this.updating = !1, this.alpha = 1, this.accAlpha = 0, this.lipSync = !1, this.lipSyncValue = 0, this.accelX = 0, this.accelY = 0, this.accelZ = 0, this.dragX = 0, this.dragY = 0, this.startTimeMSec = null, this.mainMotionManager = new h, this.expressionManager = new h, this.motions = {}, this.expressions = {}, this.isTexLoaded = !1
	}

	function o() {
		AMotion.prototype.constructor.call(this), this.paramList = new Array
	}

	function n() {
		this.id = "", this.type = -1, this.value = null
	}

	function s() {
		this.nextBlinkTime = null, this.stateStartTime = null, this.blinkIntervalMsec = null, this.eyeState = g.STATE_FIRST, this.blinkIntervalMsec = 4e3, this.closingMotionMsec = 100, this.closedMotionMsec = 50, this.openingMotionMsec = 150, this.closeIfZero = !0, this.eyeID_L = "PARAM_EYE_L_OPEN", this.eyeID_R = "PARAM_EYE_R_OPEN"
	}

	function _() {
		this.tr = new Float32Array(16), this.identity()
	}

	function a(t, e) {
		_.prototype.constructor.call(this), this.width = t, this.height = e
	}

	function h() {
		MotionQueueManager.prototype.constructor.call(this), this.currentPriority = null, this.reservePriority = null, this.super = MotionQueueManager.prototype
	}

	function l() {
		this.physicsList = new Array, this.startTimeMSec = UtSystem.getUserTimeMSec()
	}

	function $() {
		this.lastTime = 0, this.lastModel = null, this.partsGroups = new Array
	}

	function u(t) {
		this.paramIndex = -1, this.partsIndex = -1, this.link = null, this.id = t
	}

	function p() {
		this.EPSILON = .01, this.faceTargetX = 0, this.faceTargetY = 0, this.faceX = 0, this.faceY = 0, this.faceVX = 0, this.faceVY = 0, this.lastTimeSec = 0
	}

	function f() {
		_.prototype.constructor.call(this), this.screenLeft = null, this.screenRight = null, this.screenTop = null, this.screenBottom = null, this.maxLeft = null, this.maxRight = null, this.maxTop = null, this.maxBottom = null, this.max = Number.MAX_VALUE, this.min = 0
	}

	function c() {}
	var d = 0;
	r.prototype.getModelMatrix = function() {
		return this.modelMatrix
	}, r.prototype.setAlpha = function(t) {
		t > .999 && (t = 1), t < .001 && (t = 0), this.alpha = t
	}, r.prototype.getAlpha = function() {
		return this.alpha
	}, r.prototype.isInitialized = function() {
		return this.initialized
	}, r.prototype.setInitialized = function(t) {
		this.initialized = t
	}, r.prototype.isUpdating = function() {
		return this.updating
	}, r.prototype.setUpdating = function(t) {
		this.updating = t
	}, r.prototype.getLive2DModel = function() {
		return this.live2DModel
	}, r.prototype.setLipSync = function(t) {
		this.lipSync = t
	}, r.prototype.setLipSyncValue = function(t) {
		this.lipSyncValue = t
	}, r.prototype.setAccel = function(t, e, i) {
		this.accelX = t, this.accelY = e, this.accelZ = i
	}, r.prototype.setDrag = function(t, e) {
		this.dragX = t, this.dragY = e
	}, r.prototype.getMainMotionManager = function() {
		return this.mainMotionManager
	}, r.prototype.getExpressionManager = function() {
		return this.expressionManager
	}, r.prototype.loadModelData = function(t, e) {
		var i = c.getPlatformManager();
		this.debugMode && i.log("Load model : " + t);
		var r = this;
		i.loadLive2DModel(t, function(t) {
			r.live2DModel = t, r.live2DModel.saveParam(), 0 == Live2D.getError() ? (r.modelMatrix = new a(r.live2DModel.getCanvasWidth(), r.live2DModel.getCanvasHeight()), r.modelMatrix.setWidth(2), r.modelMatrix.setCenterPosition(0, 0), e(r.live2DModel)) : console.error("Error : Failed to loadModelData().")
		})
	}, r.prototype.loadTexture = function(t, e, i) {
		d++;
		var r = c.getPlatformManager();
		this.debugMode && r.log("Load Texture : " + e);
		var o = this;
		r.loadTexture(this.live2DModel, t, e, function() {
			0 == --d && (o.isTexLoaded = !0), "function" == typeof i && i()
		})
	}, r.prototype.loadMotion = function(t, e, i) {
		var r = c.getPlatformManager();
		this.debugMode && r.log("Load Motion : " + e);
		var o = null,
			n = this;
		r.loadBytes(e, function(e) {
			o = Live2DMotion.loadMotion(e), null != t && (n.motions[t] = o), i(o)
		})
	}, r.prototype.loadExpression = function(t, e, i) {
		var r = c.getPlatformManager();
		this.debugMode && r.log("Load Expression : " + e);
		var n = this;
		r.loadBytes(e, function(e) {
			null != t && (n.expressions[t] = o.loadJson(e)), "function" == typeof i && i()
		})
	}, r.prototype.loadPose = function(t, e) {
		var i = c.getPlatformManager();
		this.debugMode && i.log("Load Pose : " + t);
		var r = this;
		try {
			i.loadBytes(t, function(t) {
				r.pose = $.load(t), "function" == typeof e && e()
			})
		} catch (t) {
			console.warn(t)
		}
	}, r.prototype.loadPhysics = function(t) {
		var e = c.getPlatformManager();
		this.debugMode && e.log("Load Physics : " + t);
		var i = this;
		try {
			e.loadBytes(t, function(t) {
				i.physics = l.load(t)
			})
		} catch (t) {
			console.warn(t)
		}
	}, r.prototype.hitTestSimple = function(t, e, i) {
		if (null === this.live2DModel) return !1;
		var r = this.live2DModel.getDrawDataIndex(t);
		if (r < 0) return !1;
		for (var o = this.live2DModel.getTransformedPoints(r), n = this.live2DModel.getCanvasWidth(), s = 0, _ = this.live2DModel.getCanvasHeight(), a = 0, h = 0; h < o.length; h += 2) {
			var l = o[h],
				$ = o[h + 1];
			l < n && (n = l), l > s && (s = l), $ < _ && (_ = $), $ > a && (a = $)
		}
		var u = this.modelMatrix.invertTransformX(e),
			p = this.modelMatrix.invertTransformY(i);
		return n <= u && u <= s && _ <= p && p <= a
	}, r.prototype.hitTestSimpleCustom = function(t, e, i, r) {
		return null !== this.live2DModel && i >= t[0] && i <= e[0] && r <= t[1] && r >= e[1]
	}, o.prototype = new AMotion, o.EXPRESSION_DEFAULT = "DEFAULT", o.TYPE_SET = 0, o.TYPE_ADD = 1, o.TYPE_MULT = 2, o.loadJson = function(t) {
		var e = new o,
			i = c.getPlatformManager().jsonParseFromBytes(t);
		if (e.setFadeIn(parseInt(i.fade_in) > 0 ? parseInt(i.fade_in) : 1e3), e.setFadeOut(parseInt(i.fade_out) > 0 ? parseInt(i.fade_out) : 1e3), null == i.params) return e;
		var r = i.params,
			s = r.length;
		e.paramList = [];
		for (var _ = 0; _ < s; _++) {
			var a = r[_],
				h = a.id.toString(),
				l = parseFloat(a.val),
				$ = o.TYPE_ADD,
				u = null != a.calc ? a.calc.toString() : "add";
			if (($ = "add" === u ? o.TYPE_ADD : "mult" === u ? o.TYPE_MULT : "set" === u ? o.TYPE_SET : o.TYPE_ADD) == o.TYPE_ADD) l -= p = null == a.def ? 0 : parseFloat(a.def);
			else if ($ == o.TYPE_MULT) {
				var p = null == a.def ? 1 : parseFloat(a.def);
				0 == p && (p = 1), l /= p
			}
			var f = new n;
			f.id = h, f.type = $, f.value = l, e.paramList.push(f)
		}
		return e
	}, o.prototype.updateParamExe = function(t, e, i, r) {
		for (var n = this.paramList.length - 1; n >= 0; --n) {
			var s = this.paramList[n];
			s.type == o.TYPE_ADD ? t.addToParamFloat(s.id, s.value, i) : s.type == o.TYPE_MULT ? t.multParamFloat(s.id, s.value, i) : s.type == o.TYPE_SET && t.setParamFloat(s.id, s.value, i)
		}
	}, s.prototype.calcNextBlink = function() {
		return UtSystem.getUserTimeMSec() + Math.random() * (2 * this.blinkIntervalMsec - 1)
	}, s.prototype.setInterval = function(t) {
		this.blinkIntervalMsec = t
	}, s.prototype.setEyeMotion = function(t, e, i) {
		this.closingMotionMsec = t, this.closedMotionMsec = e, this.openingMotionMsec = i
	}, s.prototype.updateParam = function(t) {
		var e, i = UtSystem.getUserTimeMSec(),
			r = 0;
		switch (this.eyeState) {
			case g.STATE_CLOSING:
				(r = (i - this.stateStartTime) / this.closingMotionMsec) >= 1 && (r = 1, this.eyeState = g.STATE_CLOSED, this.stateStartTime = i), e = 1 - r;
				break;
			case g.STATE_CLOSED:
				(r = (i - this.stateStartTime) / this.closedMotionMsec) >= 1 && (this.eyeState = g.STATE_OPENING, this.stateStartTime = i), e = 0;
				break;
			case g.STATE_OPENING:
				(r = (i - this.stateStartTime) / this.openingMotionMsec) >= 1 && (r = 1, this.eyeState = g.STATE_INTERVAL, this.nextBlinkTime = this.calcNextBlink()), e = r;
				break;
			case g.STATE_INTERVAL:
				this.nextBlinkTime < i && (this.eyeState = g.STATE_CLOSING, this.stateStartTime = i), e = 1;
				break;
			case g.STATE_FIRST:
			default:
				this.eyeState = g.STATE_INTERVAL, this.nextBlinkTime = this.calcNextBlink(), e = 1
		}
		this.closeIfZero || (e = -e), t.setParamFloat(this.eyeID_L, e), t.setParamFloat(this.eyeID_R, e)
	};
	var g = function() {};
	g.STATE_FIRST = "STATE_FIRST", g.STATE_INTERVAL = "STATE_INTERVAL", g.STATE_CLOSING = "STATE_CLOSING", g.STATE_CLOSED = "STATE_CLOSED", g.STATE_OPENING = "STATE_OPENING", _.mul = function(t, e, i) {
		var r, o, n, s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		for (r = 0; r < 4; r++)
			for (o = 0; o < 4; o++)
				for (n = 0; n < 4; n++) s[r + 4 * o] += t[r + 4 * n] * e[n + 4 * o];
		for (r = 0; r < 16; r++) i[r] = s[r]
	}, _.prototype.identity = function() {
		for (var t = 0; t < 16; t++) this.tr[t] = t % 5 == 0 ? 1 : 0
	}, _.prototype.getArray = function() {
		return this.tr
	}, _.prototype.getCopyMatrix = function() {
		return new Float32Array(this.tr)
	}, _.prototype.setMatrix = function(t) {
		if (null != this.tr && this.tr.length == this.tr.length)
			for (var e = 0; e < 16; e++) this.tr[e] = t[e]
	}, _.prototype.getScaleX = function() {
		return this.tr[0]
	}, _.prototype.getScaleY = function() {
		return this.tr[5]
	}, _.prototype.transformX = function(t) {
		return this.tr[0] * t + this.tr[12]
	}, _.prototype.transformY = function(t) {
		return this.tr[5] * t + this.tr[13]
	}, _.prototype.invertTransformX = function(t) {
		return (t - this.tr[12]) / this.tr[0]
	}, _.prototype.invertTransformY = function(t) {
		return (t - this.tr[13]) / this.tr[5]
	}, _.prototype.multTranslate = function(t, e) {
		var i = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, 0, 1];
		_.mul(i, this.tr, this.tr)
	}, _.prototype.translate = function(t, e) {
		this.tr[12] = t, this.tr[13] = e
	}, _.prototype.translateX = function(t) {
		this.tr[12] = t
	}, _.prototype.translateY = function(t) {
		this.tr[13] = t
	}, _.prototype.multScale = function(t, e) {
		var i = [t, 0, 0, 0, 0, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
		_.mul(i, this.tr, this.tr)
	}, _.prototype.scale = function(t, e) {
		this.tr[0] = t, this.tr[5] = e
	}, (a.prototype = new _).setPosition = function(t, e) {
		this.translate(t, e)
	}, a.prototype.setCenterPosition = function(t, e) {
		var i = this.width * this.getScaleX(),
			r = this.height * this.getScaleY();
		this.translate(t - i / 2, e - r / 2)
	}, a.prototype.top = function(t) {
		this.setY(t)
	}, a.prototype.bottom = function(t) {
		var e = this.height * this.getScaleY();
		this.translateY(t - e)
	}, a.prototype.left = function(t) {
		this.setX(t)
	}, a.prototype.right = function(t) {
		var e = this.width * this.getScaleX();
		this.translateX(t - e)
	}, a.prototype.centerX = function(t) {
		var e = this.width * this.getScaleX();
		this.translateX(t - e / 2)
	}, a.prototype.centerY = function(t) {
		var e = this.height * this.getScaleY();
		this.translateY(t - e / 2)
	}, a.prototype.setX = function(t) {
		this.translateX(t)
	}, a.prototype.setY = function(t) {
		this.translateY(t)
	}, a.prototype.setHeight = function(t) {
		var e = t / this.height,
			i = -e;
		this.scale(e, i)
	}, a.prototype.setWidth = function(t) {
		var e = t / this.width,
			i = -e;
		this.scale(e, i)
	}, (h.prototype = new MotionQueueManager).getCurrentPriority = function() {
		return this.currentPriority
	}, h.prototype.getReservePriority = function() {
		return this.reservePriority
	}, h.prototype.reserveMotion = function(t) {
		return !(this.reservePriority >= t || this.currentPriority >= t || (this.reservePriority = t, 0))
	}, h.prototype.setReservePriority = function(t) {
		this.reservePriority = t
	}, h.prototype.updateParam = function(t) {
		var e = MotionQueueManager.prototype.updateParam.call(this, t);
		return this.isFinished() && (this.currentPriority = 0), e
	}, h.prototype.startMotionPrio = function(t, e) {
		return e == this.reservePriority && (this.reservePriority = 0), this.currentPriority = e, this.startMotion(t, !1)
	}, l.load = function(t) {
		for (var e = new l, i = c.getPlatformManager().jsonParseFromBytes(t).physics_hair, r = i.length, o = 0; o < r; o++) {
			var n = i[o],
				s = new PhysicsHair,
				_ = n.setup,
				a = parseFloat(_.length),
				h = parseFloat(_.regist),
				$ = parseFloat(_.mass);
			s.setup(a, h, $);
			for (var u = n.src, p = u.length, f = 0; f < p; f++) {
				var d = u[f],
					g = d.id,
					y = PhysicsHair.Src.SRC_TO_X;
				"x" === (L = d.ptype) ? y = PhysicsHair.Src.SRC_TO_X: "y" === L ? y = PhysicsHair.Src.SRC_TO_Y : "angle" === L ? y = PhysicsHair.Src.SRC_TO_G_ANGLE : UtDebug.error("live2d", "Invalid parameter:PhysicsHair.Src");
				var m = parseFloat(d.scale),
					T = parseFloat(d.weight);
				s.addSrcParam(y, g, m, T)
			}
			for (var P = n.targets, S = P.length, f = 0; f < S; f++) {
				var v = P[f],
					g = v.id,
					y = PhysicsHair.Target.TARGET_FROM_ANGLE,
					L = v.ptype;
				"angle" === L ? y = PhysicsHair.Target.TARGET_FROM_ANGLE : "angle_v" === L ? y = PhysicsHair.Target.TARGET_FROM_ANGLE_V : UtDebug.error("live2d", "Invalid parameter:PhysicsHair.Target");
				var m = parseFloat(v.scale),
					T = parseFloat(v.weight);
				s.addTargetParam(y, g, m, T)
			}
			e.physicsList.push(s)
		}
		return e
	}, l.prototype.updateParam = function(t) {
		for (var e = UtSystem.getUserTimeMSec() - this.startTimeMSec, i = 0; i < this.physicsList.length; i++) this.physicsList[i].update(t, e)
	}, $.load = function(t) {
		for (var e = new $, i = c.getPlatformManager().jsonParseFromBytes(t).parts_visible, r = i.length, o = 0; o < r; o++) {
			for (var n = i[o].group, s = n.length, _ = new Array, a = 0; a < s; a++) {
				var h = n[a],
					l = new u(h.id);
				if (_[a] = l, null != h.link) {
					var p = h.link,
						f = p.length;
					l.link = new Array;
					for (var d = 0; d < f; d++) {
						var g = new u(p[d]);
						l.link.push(g)
					}
				}
			}
			e.partsGroups.push(_)
		}
		return e
	}, $.prototype.updateParam = function(t) {
		if (null != t) {
			t != this.lastModel && this.initParam(t), this.lastModel = t;
			var e = UtSystem.getUserTimeMSec(),
				i = 0 == this.lastTime ? 0 : (e - this.lastTime) / 1e3;
			this.lastTime = e, i < 0 && (i = 0);
			for (var r = 0; r < this.partsGroups.length; r++) this.normalizePartsOpacityGroup(t, this.partsGroups[r], i), this.copyOpacityOtherParts(t, this.partsGroups[r])
		}
	}, $.prototype.initParam = function(t) {
		if (null != t)
			for (var e = 0; e < this.partsGroups.length; e++)
				for (var i = this.partsGroups[e], r = 0; r < i.length; r++) {
					i[r].initIndex(t);
					var o = i[r].partsIndex,
						n = i[r].paramIndex;
					if (!(o < 0)) {
						var s = 0 != t.getParamFloat(n);
						if (t.setPartsOpacity(o, s ? 1 : 0), t.setParamFloat(n, s ? 1 : 0), null != i[r].link)
							for (var _ = 0; _ < i[r].link.length; _++) i[r].link[_].initIndex(t)
					}
				}
	}, $.prototype.normalizePartsOpacityGroup = function(t, e, i) {
		for (var r = -1, o = 1, n = 0; n < e.length; n++) {
			var s = e[n].partsIndex,
				_ = e[n].paramIndex;
			if (!(s < 0) && 0 != t.getParamFloat(_)) {
				if (r >= 0) break;
				r = n, o = t.getPartsOpacity(s), (o += i / .5) > 1 && (o = 1)
			}
		}
		r < 0 && (r = 0, o = 1);
		for (n = 0; n < e.length; n++)
			if (!((s = e[n].partsIndex) < 0))
				if (r == n) t.setPartsOpacity(s, o);
				else {
					var a, h = t.getPartsOpacity(s);
					(1 - (a = o < .5 ? -.5 * o / .5 + 1 : .5 * (1 - o) / .5)) * (1 - o) > .15 && (a = 1 - .15 / (1 - o)), h > a && (h = a), t.setPartsOpacity(s, h)
				}
	}, $.prototype.copyOpacityOtherParts = function(t, e) {
		for (var i = 0; i < e.length; i++) {
			var r = e[i];
			if (null != r.link && !(r.partsIndex < 0))
				for (var o = t.getPartsOpacity(r.partsIndex), n = 0; n < r.link.length; n++) {
					var s = r.link[n];
					s.partsIndex < 0 || t.setPartsOpacity(s.partsIndex, o)
				}
		}
	}, u.prototype.initIndex = function(t) {
		this.paramIndex = t.getParamIndex("VISIBLE:" + this.id), this.partsIndex = t.getPartsDataIndex(PartsDataID.getID(this.id)), t.setParamFloat(this.paramIndex, 1)
	}, p.FRAME_RATE = 30, p.prototype.setPoint = function(t, e) {
		this.faceTargetX = t, this.faceTargetY = e
	}, p.prototype.getX = function() {
		return this.faceX
	}, p.prototype.getY = function() {
		return this.faceY
	}, p.prototype.update = function() {
		var t = 40 / 7.5 / p.FRAME_RATE;
		if (0 != this.lastTimeSec) {
			var e = UtSystem.getUserTimeMSec(),
				i = (e - this.lastTimeSec) * p.FRAME_RATE / 1e3;
			this.lastTimeSec = e;
			var r = i * t / (.15 * p.FRAME_RATE),
				o = this.faceTargetX - this.faceX,
				n = this.faceTargetY - this.faceY;
			if (!(Math.abs(o) <= this.EPSILON && Math.abs(n) <= this.EPSILON)) {
				var s = Math.sqrt(o * o + n * n),
					_ = t * n / s,
					a = t * o / s - this.faceVX,
					h = _ - this.faceVY,
					l = Math.sqrt(a * a + h * h);
				(l < -r || l > r) && (a *= r / l, h *= r / l, l = r), this.faceVX += a, this.faceVY += h;
				var $ = .5 * (Math.sqrt(r * r + 16 * r * s - 8 * r * s) - r),
					u = Math.sqrt(this.faceVX * this.faceVX + this.faceVY * this.faceVY);
				u > $ && (this.faceVX *= $ / u, this.faceVY *= $ / u), this.faceX += this.faceVX, this.faceY += this.faceVY
			}
		} else this.lastTimeSec = UtSystem.getUserTimeMSec()
	}, (f.prototype = new _).getMaxScale = function() {
		return this.max
	}, f.prototype.getMinScale = function() {
		return this.min
	}, f.prototype.setMaxScale = function(t) {
		this.max = t
	}, f.prototype.setMinScale = function(t) {
		this.min = t
	}, f.prototype.isMaxScale = function() {
		return this.getScaleX() == this.max
	}, f.prototype.isMinScale = function() {
		return this.getScaleX() == this.min
	}, f.prototype.adjustTranslate = function(t, e) {
		this.tr[0] * this.maxLeft + (this.tr[12] + t) > this.screenLeft && (t = this.screenLeft - this.tr[0] * this.maxLeft - this.tr[12]), this.tr[0] * this.maxRight + (this.tr[12] + t) < this.screenRight && (t = this.screenRight - this.tr[0] * this.maxRight - this.tr[12]), this.tr[5] * this.maxTop + (this.tr[13] + e) < this.screenTop && (e = this.screenTop - this.tr[5] * this.maxTop - this.tr[13]), this.tr[5] * this.maxBottom + (this.tr[13] + e) > this.screenBottom && (e = this.screenBottom - this.tr[5] * this.maxBottom - this.tr[13]);
		var i = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, 0, 1];
		_.mul(i, this.tr, this.tr)
	}, f.prototype.adjustScale = function(t, e, i) {
		var r = i * this.tr[0];
		r < this.min ? this.tr[0] > 0 && (i = this.min / this.tr[0]) : r > this.max && this.tr[0] > 0 && (i = this.max / this.tr[0]);
		var o = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, 0, 1],
			n = [i, 0, 0, 0, 0, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
			s = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -t, -e, 0, 1];
		_.mul(s, this.tr, this.tr), _.mul(n, this.tr, this.tr), _.mul(o, this.tr, this.tr)
	}, f.prototype.setScreenRect = function(t, e, i, r) {
		this.screenLeft = t, this.screenRight = e, this.screenTop = r, this.screenBottom = i
	}, f.prototype.setMaxScreenRect = function(t, e, i, r) {
		this.maxLeft = t, this.maxRight = e, this.maxTop = r, this.maxBottom = i
	}, f.prototype.getScreenLeft = function() {
		return this.screenLeft
	}, f.prototype.getScreenRight = function() {
		return this.screenRight
	}, f.prototype.getScreenBottom = function() {
		return this.screenBottom
	}, f.prototype.getScreenTop = function() {
		return this.screenTop
	}, f.prototype.getMaxLeft = function() {
		return this.maxLeft
	}, f.prototype.getMaxRight = function() {
		return this.maxRight
	}, f.prototype.getMaxBottom = function() {
		return this.maxBottom
	}, f.prototype.getMaxTop = function() {
		return this.maxTop
	}, c.platformManager = null, c.getPlatformManager = function() {
		return c.platformManager
	}, c.setPlatformManager = function(t) {
		c.platformManager = t
	}, t.exports = {
		L2DTargetPoint: p,
		Live2DFramework: c,
		L2DViewMatrix: f,
		L2DPose: $,
		L2DPartsParam: u,
		L2DPhysics: l,
		L2DMotionManager: h,
		L2DModelMatrix: a,
		L2DMatrix44: _,
		EYE_STATE: g,
		L2DEyeBlink: s,
		L2DExpressionParam: n,
		L2DExpressionMotion: o,
		L2DBaseModel: r
	}
}, function(t, e, i) {
	"use strict";
	var r = {
		DEBUG_LOG: !1,
		DEBUG_MOUSE_LOG: !1,
		DEBUG_DRAW_HIT_AREA: !1,
		DEBUG_DRAW_ALPHA_MODEL: !1,
		VIEW_MAX_SCALE: 2,
		VIEW_MIN_SCALE: .8,
		VIEW_LOGICAL_LEFT: -1,
		VIEW_LOGICAL_RIGHT: 1,
		VIEW_LOGICAL_MAX_LEFT: -2,
		VIEW_LOGICAL_MAX_RIGHT: 2,
		VIEW_LOGICAL_MAX_BOTTOM: -2,
		VIEW_LOGICAL_MAX_TOP: 2,
		PRIORITY_NONE: 0,
		PRIORITY_IDLE: 1,
		PRIORITY_SLEEPY: 2,
		PRIORITY_NORMAL: 3,
		PRIORITY_FORCE: 4,
		MOTION_GROUP_IDLE: "idle",
		MOTION_GROUP_SLEEPY: "sleepy",
		MOTION_GROUP_TAP_BODY: "tap_body",
		MOTION_GROUP_FLICK_HEAD: "flick_head",
		MOTION_GROUP_PINCH_IN: "pinch_in",
		MOTION_GROUP_PINCH_OUT: "pinch_out",
		MOTION_GROUP_SHAKE: "shake",
		MOTION_GROUP_Talk: "talk",
		MOTION_GROUP_Reset: "rest",
		HIT_AREA_HEAD: "head",
		HIT_AREA_BODY: "body",
		hitFlag: !1
	};
	t.exports = r
}, function(t, e, i) {
	"use strict";
	Object.defineProperty(e, "__esModule", {
		value: !0
	}), e.setContext = function(t) {
		r = t
	}, e.getContext = function() {
		return r
	};
	var r = void 0
}, function(t, e, i) {
	"use strict";

	function r() {}
	r.matrixStack = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], r.depth = 0, r.currentMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], r.tmp = new Array(16), r.reset = function() {
		this.depth = 0
	}, r.loadIdentity = function() {
		for (var t = 0; t < 16; t++) this.currentMatrix[t] = t % 5 == 0 ? 1 : 0
	}, r.push = function() {
		var t = (this.depth, 16 * (this.depth + 1));
		this.matrixStack.length < t + 16 && (this.matrixStack.length = t + 16);
		for (var e = 0; e < 16; e++) this.matrixStack[t + e] = this.currentMatrix[e];
		this.depth++
	}, r.pop = function() {
		--this.depth < 0 && (myError("Invalid matrix stack."), this.depth = 0);
		for (var t = 16 * this.depth, e = 0; e < 16; e++) this.currentMatrix[e] = this.matrixStack[t + e]
	}, r.getMatrix = function() {
		return this.currentMatrix
	}, r.multMatrix = function(t) {
		var e, i, r;
		for (e = 0; e < 16; e++) this.tmp[e] = 0;
		for (e = 0; e < 4; e++)
			for (i = 0; i < 4; i++)
				for (r = 0; r < 4; r++) this.tmp[e + 4 * i] += this.currentMatrix[e + 4 * r] * t[r + 4 * i];
		for (e = 0; e < 16; e++) this.currentMatrix[e] = this.tmp[e]
	}, t.exports = r
}, function(t, e, i) {
	t.exports = i(5)
}, function(t, e, i) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			default: t
		}
	}

	function o(t) {
		(D = document.getElementById(t)).addEventListener && (window.addEventListener("click", g), window.addEventListener("mousedown", g), window.addEventListener("mousemove", g), window.addEventListener("mouseup", g), document.addEventListener("mouseout", g), window.addEventListener("touchstart", y), window.addEventListener("touchend", y), window.addEventListener("touchmove", y))
	}

	function n(t) {
		var e = D.width / 2,
			i = D.height / 2;
		R = new L.L2DTargetPoint;
		var r = i / e,
			o = M.default.VIEW_LOGICAL_LEFT,
			n = M.default.VIEW_LOGICAL_RIGHT,
			_ = -r,
			h = r;
		if (window.Live2D.captureFrame = !1, (F = new L.L2DViewMatrix).setScreenRect(o, n, _, h), F.setMaxScreenRect(M.default.VIEW_LOGICAL_MAX_LEFT, M.default.VIEW_LOGICAL_MAX_RIGHT, M.default.VIEW_LOGICAL_MAX_BOTTOM, M.default.VIEW_LOGICAL_MAX_TOP), F.setMaxScale(M.default.VIEW_MAX_SCALE), F.setMinScale(M.default.VIEW_MIN_SCALE), (b = new L.L2DMatrix44).multScale(1, e / i), (C = new L.L2DMatrix44).multTranslate(-e / 2, -i / 2), C.multScale(2 / e, -2 / e), O = v(), (0, A.setContext)(O), !O) return console.error("Failed to create WebGL context."), void(window.WebGLRenderingContext && console.error("Your browser don't support WebGL, check https://get.webgl.org/ for futher information."));
		window.Live2D.setGL(O), O.clearColor(0, 0, 0, 0), a(t), s()
	}

	function s() {
		x || (x = !0, function t() {
			_();
			var e = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
			if (window.Live2D.captureFrame) {
				window.Live2D.captureFrame = !1;
				var i = document.createElement("a");
				document.body.appendChild(i), i.setAttribute("type", "hidden"), i.href = D.toDataURL(), i.download = window.Live2D.captureName || "live2d.png", i.click()
			}
			e(t, D)
		}())
	}

	function _() {
		I.default.reset(), I.default.loadIdentity(), R.update(), w.setDrag(R.getX(), R.getY()), O.clear(O.COLOR_BUFFER_BIT), I.default.multMatrix(b.getArray()), I.default.multMatrix(F.getArray()), I.default.push();
		for (var t = 0; t < w.numModels(); t++) {
			var e = w.getModel(t);
			if (null == e) return;
			e.initialized && !e.updating && (e.update(), e.draw(O))
		}
		I.default.pop()
	}

	function a(t) {
		w.reloadFlg = !0, w.count++, w.changeModel(O, t)
	}

	function h(t, e) {
		return t.x * e.x + t.y * e.y
	}

	function l(t, e) {
		var i = Math.sqrt(t * t + e * e);
		return {
			x: t / i,
			y: e / i
		}
	}

	function $(t, e, i) {
		function r(t, e) {
			return 180 * Math.acos(h({
				x: 0,
				y: 1
			}, l(t, e))) / Math.PI
		}
		if (e.x < i.left + i.width && e.y < i.top + i.height && e.x > i.left && e.y > i.top) return e;
		var o = t.x - e.x,
			n = t.y - e.y,
			s = r(o, n);
		e.x < t.x && (s = 360 - s);
		var _ = 360 - r(i.left - t.x, -1 * (i.top - t.y)),
			a = 360 - r(i.left - t.x, -1 * (i.top + i.height - t.y)),
			$ = r(i.left + i.width - t.x, -1 * (i.top - t.y)),
			u = r(i.left + i.width - t.x, -1 * (i.top + i.height - t.y)),
			p = n / o,
			f = {};
		if (s < $) {
			var c = i.top - t.y,
				d = c / p;
			f = {
				y: t.y + c,
				x: t.x + d
			}
		} else if (s < u) {
			var g = i.left + i.width - t.x,
				y = g * p;
			f = {
				y: t.y + y,
				x: t.x + g
			}
		} else if (s < a) {
			var m = i.top + i.height - t.y,
				T = m / p;
			f = {
				y: t.y + m,
				x: t.x + T
			}
		} else if (s < _) {
			var P = t.x - i.left,
				S = P * p;
			f = {
				y: t.y - S,
				x: t.x - P
			}
		} else {
			var v = i.top - t.y,
				L = v / p;
			f = {
				y: t.y + v,
				x: t.x + L
			}
		}
		return f
	}

	function u(t) {
		N = !0;
		var e = D.getBoundingClientRect(),
			i = P(t.clientX - e.left),
			r = S(t.clientY - e.top),
			o = $({
				x: e.left + e.width / 2,
				y: e.top + e.height * G
			}, {
				x: t.clientX,
				y: t.clientY
			}, e),
			n = m(o.x - e.left),
			s = T(o.y - e.top);
		M.default.DEBUG_MOUSE_LOG && console.log("onMouseMove device( x:" + t.clientX + " y:" + t.clientY + " ) view( x:" + n + " y:" + s + ")"), B = i, U = r, R.setPoint(n, s)
	}

	function p(t) {
		N = !0;
		var e = D.getBoundingClientRect(),
			i = P(t.clientX - e.left),
			r = S(t.clientY - e.top),
			o = $({
				x: e.left + e.width / 2,
				y: e.top + e.height * G
			}, {
				x: t.clientX,
				y: t.clientY
			}, e),
			n = m(o.x - e.left),
			s = T(o.y - e.top);
		M.default.DEBUG_MOUSE_LOG && console.log("onMouseDown device( x:" + t.clientX + " y:" + t.clientY + " ) view( x:" + n + " y:" + s + ")"), B = i, U = r, w.tapEvent(n, s)
	}

	function f(t) {
		var e = D.getBoundingClientRect(),
			i = P(t.clientX - e.left),
			r = S(t.clientY - e.top),
			o = $({
				x: e.left + e.width / 2,
				y: e.top + e.height * G
			}, {
				x: t.clientX,
				y: t.clientY
			}, e),
			n = m(o.x - e.left),
			s = T(o.y - e.top);
		M.default.DEBUG_MOUSE_LOG && console.log("onMouseMove device( x:" + t.clientX + " y:" + t.clientY + " ) view( x:" + n + " y:" + s + ")"), N && (B = i, U = r, R.setPoint(n, s))
	}

	function c() {
		N && (N = !1), R.setPoint(0, 0)
	}

	function d() {
		M.default.DEBUG_LOG && console.log("Set Session Storage."), sessionStorage.setItem("Sleepy", "1")
	}

	function g(t) {
		if ("mousewheel" == t.type);
		else if ("mousedown" == t.type) p(t);
		else if ("mousemove" == t.type) "1" === sessionStorage.getItem("Sleepy") && sessionStorage.setItem("Sleepy", "0"), u(t);
		else if ("mouseup" == t.type) {
			if ("button" in t && 0 != t.button) return
		} else if ("mouseout" == t.type) {
			M.default.DEBUG_LOG && console.log("Mouse out Window."), c();
			var e = sessionStorage.getItem("SleepyTimer");
			window.clearTimeout(e), e = window.setTimeout(d, 5e4), sessionStorage.setItem("SleepyTimer", e)
		}
	}

	function y(t) {
		var e = t.touches[0];
		"touchstart" == t.type ? 1 == t.touches.length && u(e) : "touchmove" == t.type ? f(e) : "touchend" == t.type && c()
	}

	function m(t) {
		var e = C.transformX(t);
		return F.invertTransformX(e)
	}

	function T(t) {
		var e = C.transformY(t);
		return F.invertTransformY(e)
	}

	function P(t) {
		return C.transformX(t)
	}

	function S(t) {
		return C.transformY(t)
	}

	function v() {
		for (var t = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"], e = 0; e < t.length; e++) try {
			var i = D.getContext(t[e], {
				premultipliedAlpha: !0
			});
			if (i) return i
		} catch (t) {}
		return null
	}
	i(6);
	var L = i(0),
		E = r(i(8)),
		M = r(i(1)),
		I = r(i(3)),
		A = i(2),
		w = (window.navigator.platform.toLowerCase(), new E.default),
		x = !1,
		O = null,
		D = null,
		R = null,
		F = null,
		b = null,
		C = null,
		N = !1,
		B = 0,
		U = 0,
		G = .5;
	window.loadlive2d = function(t, e, i) {
		G = void 0 === i ? .5 : i, o(t), n(e)
	}
}, function(t, e, i) {
	"use strict";
	(function(t) {
		! function() {
			function e() {
				It || (this._$MT = null, this._$5S = null, this._$NP = 0, e._$42++, this._$5S = new G(this))
			}

			function i(t) {
				if (!It) {
					this.clipContextList = new Array, this.glcontext = t.gl, this.dp_webgl = t, this.curFrameNo = 0, this.firstError_clipInNotUpdate = !0, this.colorBuffer = 0, this.isInitGLFBFunc = !1, this.tmpBoundsOnModel = new P, st.glContext.length > st.frameBuffers.length && (this.curFrameNo = this.getMaskRenderTexture()), this.tmpModelToViewMatrix = new D, this.tmpMatrix2 = new D, this.tmpMatrixForMask = new D, this.tmpMatrixForDraw = new D, this.CHANNEL_COLORS = new Array;
					var e = new M;
					(e = new M).r = 0, e.g = 0, e.b = 0, e.a = 1, this.CHANNEL_COLORS.push(e), (e = new M).r = 1, e.g = 0, e.b = 0, e.a = 0, this.CHANNEL_COLORS.push(e), (e = new M).r = 0, e.g = 1, e.b = 0, e.a = 0, this.CHANNEL_COLORS.push(e), (e = new M).r = 0, e.g = 0, e.b = 1, e.a = 0, this.CHANNEL_COLORS.push(e);
					for (var i = 0; i < this.CHANNEL_COLORS.length; i++) this.dp_webgl.setChannelFlagAsColor(i, this.CHANNEL_COLORS[i])
				}
			}

			function r(t, e, i) {
				this.clipIDList = new Array, this.clipIDList = i, this.clippingMaskDrawIndexList = new Array;
				for (var r = 0; r < i.length; r++) this.clippingMaskDrawIndexList.push(e.getDrawDataIndex(i[r]));
				this.clippedDrawContextList = new Array, this.isUsing = !0, this.layoutChannelNo = 0, this.layoutBounds = new P, this.allClippedDrawRect = new P, this.matrixForMask = new Float32Array(16), this.matrixForDraw = new Float32Array(16), this.owner = t
			}

			function o(t, e) {
				this._$gP = t, this.drawDataIndex = e
			}

			function n() {
				It || (this.color = null)
			}

			function s() {
				It || (this._$dP = null, this._$eo = null, this._$V0 = null, this._$dP = 1e3, this._$eo = 1e3, this._$V0 = 1, this._$a0())
			}

			function _() {}

			function a() {
				this._$r = null, this._$0S = null
			}

			function h() {
				It || (this.x = null, this.y = null, this.width = null, this.height = null)
			}

			function l(t) {
				It || et.prototype.constructor.call(this, t)
			}

			function $(t) {
				It || et.prototype.constructor.call(this, t)
			}

			function u() {
				It || (this._$vo = null, this._$F2 = null, this._$ao = 400, this._$1S = 400, u._$42++)
			}

			function p() {
				It || (this.p1 = new f, this.p2 = new f, this._$Fo = 0, this._$Db = 0, this._$L2 = 0, this._$M2 = 0, this._$ks = 0, this._$9b = 0, this._$iP = 0, this._$iT = 0, this._$lL = new Array, this._$qP = new Array, this.setup(.3, .5, .1))
			}

			function f() {
				this._$p = 1, this.x = 0, this.y = 0, this.vx = 0, this.vy = 0, this.ax = 0, this.ay = 0, this.fx = 0, this.fy = 0, this._$s0 = 0, this._$70 = 0, this._$7L = 0, this._$HL = 0
			}

			function c(t, e, i) {
				this._$wL = null, this.scale = null, this._$V0 = null, this._$wL = t, this.scale = e, this._$V0 = i
			}

			function d(t, e, i, r) {
				c.prototype.constructor.call(this, e, i, r), this._$tL = null, this._$tL = t
			}

			function g(t, e, i) {
				this._$wL = null, this.scale = null, this._$V0 = null, this._$wL = t, this.scale = e, this._$V0 = i
			}

			function y(t, e, i, r) {
				g.prototype.constructor.call(this, e, i, r), this._$YP = null, this._$YP = t
			}

			function T() {
				It || (this._$fL = 0, this._$gL = 0, this._$B0 = 1, this._$z0 = 1, this._$qT = 0, this.reflectX = !1, this.reflectY = !1)
			}

			function P() {
				It || (this.x = null, this.y = null, this.width = null, this.height = null)
			}

			function S() {}

			function v() {
				It || (this.x = null, this.y = null)
			}

			function L() {
				It || (this._$gP = null, this._$dr = null, this._$GS = null, this._$qb = null, this._$Lb = null, this._$mS = null, this.clipID = null, this.clipIDList = new Array)
			}

			function E() {
				It || (this._$Eb = E._$ps, this._$lT = 1, this._$C0 = 1, this._$tT = 1, this._$WL = 1, this.culling = !1, this.matrix4x4 = new Float32Array(16), this.premultipliedAlpha = !1, this.anisotropy = 0, this.clippingProcess = E.CLIPPING_PROCESS_NONE, this.clipBufPre_clipContextMask = null, this.clipBufPre_clipContextDraw = null, this.CHANNEL_COLORS = new Array)
			}

			function M() {
				It || (this.a = 1, this.r = 1, this.g = 1, this.b = 1, this.scale = 1, this._$ho = 1, this.blendMode = st.L2D_COLOR_BLEND_MODE_MULT)
			}

			function I() {
				It || (this._$kP = null, this._$dr = null, this._$Ai = !0, this._$mS = null)
			}

			function A() {}

			function w() {
				It || (this._$VP = 0, this._$wL = null, this._$GP = null, this._$8o = w._$ds, this._$2r = -1, this._$O2 = 0, this._$ri = 0)
			}

			function x() {}

			function O() {
				It || (this._$Ob = null)
			}

			function D() {
				this.m = new Float32Array(16), this.identity()
			}

			function R(t) {
				It || et.prototype.constructor.call(this, t)
			}

			function F() {
				It || (this._$7 = 1, this._$f = 0, this._$H = 0, this._$g = 1, this._$k = 0, this._$w = 0, this._$hi = STATE_IDENTITY, this._$Z = _$pS)
			}

			function b() {
				It || (s.prototype.constructor.call(this), this.motions = new Array, this._$7r = null, this._$7r = b._$Co++, this._$D0 = 30, this._$yT = 0, this._$E = !0, this.loopFadeIn = !0, this._$AS = -1, _$a0())
			}

			function C() {
				this._$P = new Float32Array(100), this.size = 0
			}

			function N() {
				this._$4P = null, this._$I0 = null, this._$RP = null
			}

			function B() {}

			function U() {}

			function G(t) {
				It || (this._$QT = !0, this._$co = -1, this._$qo = 0, this._$pb = new Array(G._$is), this._$_2 = new Float32Array(G._$is), this._$vr = new Float32Array(G._$is), this._$Rr = new Float32Array(G._$is), this._$Or = new Float32Array(G._$is), this._$fs = new Float32Array(G._$is), this._$Js = new Array(G._$is), this._$3S = new Array, this._$aS = new Array, this._$Bo = null, this._$F2 = new Array, this._$db = new Array, this._$8b = new Array, this._$Hr = new Array, this._$Ws = null, this._$Vs = null, this._$Er = null, this._$Es = new Int16Array(B._$Qb), this._$ZP = new Float32Array(2 * B._$1r), this._$Ri = t, this._$b0 = G._$HP++, this.clipManager = null, this.dp_webgl = null)
			}

			function Y() {}

			function k() {
				It || (this._$12 = null, this._$bb = null, this._$_L = null, this._$jo = null, this._$iL = null, this._$0L = null, this._$Br = null, this._$Dr = null, this._$Cb = null, this._$mr = null, this._$_L = Et.STATE_FIRST, this._$Br = 4e3, this._$Dr = 100, this._$Cb = 50, this._$mr = 150, this._$jo = !0, this._$iL = "PARAM_EYE_L_OPEN", this._$0L = "PARAM_EYE_R_OPEN")
			}

			function V() {
				It || (E.prototype.constructor.call(this), this._$sb = new Int32Array(V._$As), this._$U2 = new Array, this.transform = null, this.gl = null, null == V._$NT && (V._$NT = V._$9r(256), V._$vS = V._$9r(256), V._$no = V._$vb(256)))
			}

			function X() {
				It || (I.prototype.constructor.call(this), this._$GS = null, this._$Y0 = null)
			}

			function z(t) {
				nt.prototype.constructor.call(this, t), this._$8r = I._$ur, this._$Yr = null, this._$Wr = null
			}

			function H() {
				It || (L.prototype.constructor.call(this), this._$gP = null, this._$dr = null, this._$GS = null, this._$qb = null, this._$Lb = null, this._$mS = null)
			}

			function W() {
				It || (this._$NL = null, this._$3S = null, this._$aS = null, W._$42++)
			}

			function j() {
				It || (e.prototype.constructor.call(this), this._$zo = new V)
			}

			function q() {
				It || (s.prototype.constructor.call(this), this.motions = new Array, this._$o2 = null, this._$7r = q._$Co++, this._$D0 = 30, this._$yT = 0, this._$E = !1, this.loopFadeIn = !0, this._$rr = -1, this._$eP = 0)
			}

			function J(t, e) {
				return String.fromCharCode(t.getUint8(e))
			}

			function C() {
				this._$P = new Float32Array(100), this.size = 0
			}

			function N() {
				this._$4P = null, this._$I0 = null, this._$RP = null
			}

			function Q() {
				It || (I.prototype.constructor.call(this), this._$o = 0, this._$A = 0, this._$GS = null, this._$Eo = null)
			}

			function Z(t) {
				nt.prototype.constructor.call(this, t), this._$8r = I._$ur, this._$Cr = null, this._$hr = null
			}

			function K() {
				It || (this.visible = !0, this._$g0 = !1, this._$NL = null, this._$3S = null, this._$aS = null, K._$42++)
			}

			function tt(t) {
				this._$VS = null, this._$e0 = null, this._$e0 = t
			}

			function et(t) {
				It || (this.id = t)
			}

			function it() {
				It || (this._$4S = null)
			}

			function rt(t, e) {
				this.canvas = t, this.context = e, this.viewport = new Array(0, 0, t.width, t.height), this._$6r = 1, this._$xP = 0, this._$3r = 1, this._$uP = 0, this._$Qo = -1, this.cacheImages = {}
			}

			function ot() {
				It || (this._$TT = null, this._$LT = null, this._$FS = null, this._$wL = null)
			}

			function nt(t) {
				It || (this._$e0 = null, this._$IP = null, this._$JS = !1, this._$AT = !0, this._$e0 = t, this.totalScale = 1, this._$7s = 1, this.totalOpacity = 1)
			}

			function st() {}

			function _t() {}

			function at(t) {
				It || (this._$ib = t)
			}

			function ht() {
				It || (H.prototype.constructor.call(this), this._$LP = -1, this._$d0 = 0, this._$Yo = 0, this._$JP = null, this._$5P = null, this._$BP = null, this._$Eo = null, this._$Qi = null, this._$6s = ht._$ms, this.culling = !0, this.gl_cacheImage = null, this.instanceNo = ht._$42++)
			}

			function lt(t) {
				St.prototype.constructor.call(this, t), this._$8r = H._$ur, this._$Cr = null, this._$hr = null
			}

			function $t() {
				It || (this.x = null, this.y = null)
			}

			function ut(t) {
				It || (e.prototype.constructor.call(this), this.drawParamWebGL = new gt(t), this.drawParamWebGL.setGL(st.getGL(t)))
			}

			function pt() {
				It || (this.motions = null, this._$eb = !1, this.motions = new Array)
			}

			function ft() {
				this._$w0 = null, this._$AT = !0, this._$9L = !1, this._$z2 = -1, this._$bs = -1, this._$Do = -1, this._$sr = null, this._$sr = ft._$Gs++
			}

			function ct() {
				this.m = new Array(1, 0, 0, 0, 1, 0, 0, 0, 1)
			}

			function dt(t) {
				It || et.prototype.constructor.call(this, t)
			}

			function gt(t) {
				It || (E.prototype.constructor.call(this), this.textures = new Array, this.transform = null, this.gl = null, this.glno = t, this.firstDraw = !0, this.anisotropyExt = null, this.maxAnisotropy = 0, this._$As = 32, this._$Gr = !1, this._$NT = null, this._$vS = null, this._$no = null, this.vertShader = null, this.fragShader = null, this.vertShaderOff = null, this.fragShaderOff = null)
			}

			function yt(t, e, i) {
				return null == e && (e = t.createBuffer()), t.bindBuffer(t.ARRAY_BUFFER, e), t.bufferData(t.ARRAY_BUFFER, i, t.DYNAMIC_DRAW), e
			}

			function mt(t, e, i) {
				return null == e && (e = t.createBuffer()), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, e), t.bufferData(t.ELEMENT_ARRAY_BUFFER, i, t.DYNAMIC_DRAW), e
			}

			function Tt(t) {
				It || (this._$P = new Int8Array(8), this._$R0 = new DataView(this._$P.buffer), this._$3i = new Int8Array(1e3), this._$hL = 0, this._$v0 = 0, this._$S2 = 0, this._$Ko = new Array, this._$T = t, this._$F = 0)
			}

			function Pt() {}

			function St(t) {
				It || (this._$e0 = null, this._$IP = null, this._$Us = null, this._$7s = null, this._$IS = [!1], this._$VS = null, this._$AT = !0, this.baseOpacity = 1, this.clipBufPre_clipContext = null, this._$e0 = t)
			}

			function vt() {}
			It = !0;
			e._$0s = 1, e._$4s = 2, e._$42 = 0, e._$62 = function(t, i) {
				try {
					if (i instanceof ArrayBuffer && (i = new DataView(i)), !(i instanceof DataView)) throw new at("_$SS#loadModel(b) / b _$x be DataView or ArrayBuffer");
					var r, o = new Tt(i),
						n = o._$ST(),
						s = o._$ST(),
						a = o._$ST();
					if (109 != n || 111 != s || 99 != a) throw new at("_$gi _$C _$li , _$Q0 _$P0.");
					if (r = o._$ST(), o._$gr(r), r > U._$T7) throw t._$NP |= e._$4s, new at("_$gi _$C _$li , _$n0 _$_ version _$li ( SDK : " + U._$T7 + " < _$f0 : " + r + " )@_$SS#loadModel()\n");
					var h = o._$nP();
					if (r >= U._$s7) {
						var l = o._$9T(),
							$ = o._$9T();
						if (-30584 != l || -30584 != $) throw t._$NP |= e._$0s, new at("_$gi _$C _$li , _$0 _$6 _$Ui.")
					}
					t._$KS(h);
					var u = t.getModelContext();
					u.setDrawParam(t.getDrawParam()), u.init()
				} catch (t) {
					_._$Rb(t)
				}
			}, e.prototype._$KS = function(t) {
				this._$MT = t
			}, e.prototype.getModelImpl = function() {
				return null == this._$MT && (this._$MT = new u, this._$MT._$zP()), this._$MT
			}, e.prototype.getCanvasWidth = function() {
				return null == this._$MT ? 0 : this._$MT.getCanvasWidth()
			}, e.prototype.getCanvasHeight = function() {
				return null == this._$MT ? 0 : this._$MT.getCanvasHeight()
			}, e.prototype.getParamFloat = function(t) {
				return "number" != typeof t && (t = this._$5S.getParamIndex($.getID(t))), this._$5S.getParamFloat(t)
			}, e.prototype.setParamFloat = function(t, e, i) {
				"number" != typeof t && (t = this._$5S.getParamIndex($.getID(t))), arguments.length < 3 && (i = 1), this._$5S.setParamFloat(t, this._$5S.getParamFloat(t) * (1 - i) + e * i)
			}, e.prototype.addToParamFloat = function(t, e, i) {
				"number" != typeof t && (t = this._$5S.getParamIndex($.getID(t))), arguments.length < 3 && (i = 1), this._$5S.setParamFloat(t, this._$5S.getParamFloat(t) + e * i)
			}, e.prototype.multParamFloat = function(t, e, i) {
				"number" != typeof t && (t = this._$5S.getParamIndex($.getID(t))), arguments.length < 3 && (i = 1), this._$5S.setParamFloat(t, this._$5S.getParamFloat(t) * (1 + (e - 1) * i))
			}, e.prototype.getParamIndex = function(t) {
				return this._$5S.getParamIndex($.getID(t))
			}, e.prototype.loadParam = function() {
				this._$5S.loadParam()
			}, e.prototype.saveParam = function() {
				this._$5S.saveParam()
			}, e.prototype.init = function() {
				this._$5S.init()
			}, e.prototype.update = function() {
				this._$5S.update()
			}, e.prototype._$Rs = function() {
				return _._$li("_$60 _$PT _$Rs()"), -1
			}, e.prototype._$Ds = function(t) {
				_._$li("_$60 _$PT _$SS#_$Ds() \n")
			}, e.prototype._$K2 = function() {}, e.prototype.draw = function() {}, e.prototype.getModelContext = function() {
				return this._$5S
			}, e.prototype._$s2 = function() {
				return this._$NP
			}, e.prototype._$P7 = function(t, e, i, r) {
				var o = -1,
					n = 0,
					s = this;
				if (0 != i)
					if (1 == t.length) {
						var _ = t[0],
							a = 0 != s.getParamFloat(_),
							h = e[0],
							l = s.getPartsOpacity(h),
							$ = i / r;
						a ? (l += $) > 1 && (l = 1) : (l -= $) < 0 && (l = 0), s.setPartsOpacity(h, l)
					} else {
						for (f = 0; f < t.length; f++) {
							_ = t[f];
							if (c = 0 != s.getParamFloat(_)) {
								if (o >= 0) break;
								o = f;
								h = e[f];
								n = s.getPartsOpacity(h), (n += i / r) > 1 && (n = 1)
							}
						}
						o < 0 && (console.log("No _$wi _$q0/ _$U default[%s]", t[0]), o = 0, n = 1, s.loadParam(), s.setParamFloat(t[o], n), s.saveParam());
						for (f = 0; f < t.length; f++) {
							h = e[f];
							if (o == f) s.setPartsOpacity(h, n);
							else {
								var u, p = s.getPartsOpacity(h);
								(1 - (u = n < .5 ? -.5 * n / .5 + 1 : .5 * (1 - n) / .5)) * (1 - n) > .15 && (u = 1 - .15 / (1 - n)), p > u && (p = u), s.setPartsOpacity(h, p)
							}
						}
					}
				else
					for (var f = 0; f < t.length; f++) {
						var _ = t[f],
							h = e[f],
							c = 0 != s.getParamFloat(_);
						s.setPartsOpacity(h, c ? 1 : 0)
					}
			}, e.prototype.setPartsOpacity = function(t, e) {
				"number" != typeof t && (t = this._$5S.getPartsDataIndex(l.getID(t))), this._$5S.setPartsOpacity(t, e)
			}, e.prototype.getPartsDataIndex = function(t) {
				return t instanceof l || (t = l.getID(t)), this._$5S.getPartsDataIndex(t)
			}, e.prototype.getPartsOpacity = function(t) {
				return "number" != typeof t && (t = this._$5S.getPartsDataIndex(l.getID(t))), t < 0 ? 0 : this._$5S.getPartsOpacity(t)
			}, e.prototype.getDrawParam = function() {}, e.prototype.getDrawDataIndex = function(t) {
				return this._$5S.getDrawDataIndex(R.getID(t))
			}, e.prototype.getDrawData = function(t) {
				return this._$5S.getDrawData(t)
			}, e.prototype.getTransformedPoints = function(t) {
				var e = this._$5S._$C2(t);
				return e instanceof lt ? e.getTransformedPoints() : null
			}, e.prototype.getIndexArray = function(t) {
				if (t < 0 || t >= this._$5S._$aS.length) return null;
				var e = this._$5S._$aS[t];
				return null != e && e.getType() == H._$wb && e instanceof ht ? e.getIndexArray() : null
			}, i.CHANNEL_COUNT = 4, i.RENDER_TEXTURE_USE_MIPMAP = !1, i.NOT_USED_FRAME = -100, i.prototype._$L7 = function() {
				if (this.tmpModelToViewMatrix && (this.tmpModelToViewMatrix = null), this.tmpMatrix2 && (this.tmpMatrix2 = null), this.tmpMatrixForMask && (this.tmpMatrixForMask = null), this.tmpMatrixForDraw && (this.tmpMatrixForDraw = null), this.tmpBoundsOnModel && (this.tmpBoundsOnModel = null), this.CHANNEL_COLORS) {
					for (var t = this.CHANNEL_COLORS.length - 1; t >= 0; --t) this.CHANNEL_COLORS.splice(t, 1);
					this.CHANNEL_COLORS = []
				}
				this.releaseShader()
			}, i.prototype.releaseShader = function() {
				for (var t = st.frameBuffers.length, e = 0; e < t; e++) this.gl.deleteFramebuffer(st.frameBuffers[e].framebuffer);
				st.frameBuffers = [], st.glContext = []
			}, i.prototype.init = function(t, e, i) {
				for (var o = 0; o < e.length; o++) {
					var n = e[o].getClipIDList();
					if (null != n) {
						var s = this.findSameClip(n);
						null == s && (s = new r(this, t, n), this.clipContextList.push(s));
						var _ = e[o].getDrawDataID(),
							a = t.getDrawDataIndex(_);
						s.addClippedDrawData(_, a), i[o].clipBufPre_clipContext = s
					}
				}
			}, i.prototype.getMaskRenderTexture = function() {
				var t = null;
				return t = this.dp_webgl.createFramebuffer(), st.frameBuffers[this.dp_webgl.glno] = t, this.dp_webgl.glno
			}, i.prototype.setupClip = function(t, e) {
				for (var i = 0, r = 0; r < this.clipContextList.length; r++) {
					var o = this.clipContextList[r];
					this.calcClippedDrawTotalBounds(t, o), o.isUsing && i++
				}
				if (i > 0) {
					var n = e.gl.getParameter(e.gl.FRAMEBUFFER_BINDING),
						s = new Array(4);
					s[0] = 0, s[1] = 0, s[2] = e.gl.canvas.width, s[3] = e.gl.canvas.height, e.gl.viewport(0, 0, st.clippingMaskBufferSize, st.clippingMaskBufferSize), this.setupLayoutBounds(i), e.gl.bindFramebuffer(e.gl.FRAMEBUFFER, st.frameBuffers[this.curFrameNo].framebuffer), e.gl.clearColor(0, 0, 0, 0), e.gl.clear(e.gl.COLOR_BUFFER_BIT);
					for (r = 0; r < this.clipContextList.length; r++) {
						var _ = (o = this.clipContextList[r]).allClippedDrawRect,
							a = (o.layoutChannelNo, o.layoutBounds);
						this.tmpBoundsOnModel._$jL(_), this.tmpBoundsOnModel.expand(.05 * _.width, .05 * _.height);
						var h = a.width / this.tmpBoundsOnModel.width,
							l = a.height / this.tmpBoundsOnModel.height;
						this.tmpMatrix2.identity(), this.tmpMatrix2.translate(-1, -1, 0), this.tmpMatrix2.scale(2, 2, 1), this.tmpMatrix2.translate(a.x, a.y, 0), this.tmpMatrix2.scale(h, l, 1), this.tmpMatrix2.translate(-this.tmpBoundsOnModel.x, -this.tmpBoundsOnModel.y, 0), this.tmpMatrixForMask.setMatrix(this.tmpMatrix2.m), this.tmpMatrix2.identity(), this.tmpMatrix2.translate(a.x, a.y, 0), this.tmpMatrix2.scale(h, l, 1), this.tmpMatrix2.translate(-this.tmpBoundsOnModel.x, -this.tmpBoundsOnModel.y, 0), this.tmpMatrixForDraw.setMatrix(this.tmpMatrix2.m);
						for (var $ = this.tmpMatrixForMask.getArray(), u = 0; u < 16; u++) o.matrixForMask[u] = $[u];
						for (var p = this.tmpMatrixForDraw.getArray(), u = 0; u < 16; u++) o.matrixForDraw[u] = p[u];
						for (var f = o.clippingMaskDrawIndexList.length, c = 0; c < f; c++) {
							var d = o.clippingMaskDrawIndexList[c],
								g = t.getDrawData(d),
								y = t._$C2(d);
							e.setClipBufPre_clipContextForMask(o), g.draw(e, t, y)
						}
					}
					e.gl.bindFramebuffer(e.gl.FRAMEBUFFER, n), e.setClipBufPre_clipContextForMask(null), e.gl.viewport(s[0], s[1], s[2], s[3])
				}
			}, i.prototype.getColorBuffer = function() {
				return this.colorBuffer
			}, i.prototype.findSameClip = function(t) {
				for (var e = 0; e < this.clipContextList.length; e++) {
					var i = this.clipContextList[e],
						r = i.clipIDList.length;
					if (r == t.length) {
						for (var o = 0, n = 0; n < r; n++)
							for (var s = i.clipIDList[n], _ = 0; _ < r; _++)
								if (t[_] == s) {
									o++;
									break
								}
						if (o == r) return i
					}
				}
				return null
			}, i.prototype.calcClippedDrawTotalBounds = function(t, e) {
				for (var i = t._$Ri.getModelImpl().getCanvasWidth(), r = t._$Ri.getModelImpl().getCanvasHeight(), o = i > r ? i : r, n = o, s = o, _ = 0, a = 0, h = e.clippedDrawContextList.length, l = 0; l < h; l++) {
					var $ = e.clippedDrawContextList[l].drawDataIndex,
						u = t._$C2($);
					if (u._$yo()) {
						for (var p = u.getTransformedPoints(), f = p.length, c = [], d = [], g = 0, y = B._$i2; y < f; y += B._$No) c[g] = p[y], d[g] = p[y + 1], g++;
						var m = Math.min.apply(null, c),
							T = Math.min.apply(null, d),
							P = Math.max.apply(null, c),
							S = Math.max.apply(null, d);
						m < n && (n = m), T < s && (s = T), P > _ && (_ = P), S > a && (a = S)
					}
				}
				if (n == o) e.allClippedDrawRect.x = 0, e.allClippedDrawRect.y = 0, e.allClippedDrawRect.width = 0, e.allClippedDrawRect.height = 0, e.isUsing = !1;
				else {
					var v = _ - n,
						L = a - s;
					e.allClippedDrawRect.x = n, e.allClippedDrawRect.y = s, e.allClippedDrawRect.width = v, e.allClippedDrawRect.height = L, e.isUsing = !0
				}
			}, i.prototype.setupLayoutBounds = function(t) {
				var e = t / i.CHANNEL_COUNT,
					r = t % i.CHANNEL_COUNT;
				e = ~~e, r = ~~r;
				for (var o = 0, n = 0; n < i.CHANNEL_COUNT; n++) {
					var s = e + (n < r ? 1 : 0);
					if (0 == s);
					else if (1 == s)($ = this.clipContextList[o++]).layoutChannelNo = n, $.layoutBounds.x = 0, $.layoutBounds.y = 0, $.layoutBounds.width = 1, $.layoutBounds.height = 1;
					else if (2 == s)
						for (h = 0; h < s; h++) {
							var a = 0;
							l = ~~(l = h % 2), ($ = this.clipContextList[o++]).layoutChannelNo = n, $.layoutBounds.x = .5 * l, $.layoutBounds.y = 0, $.layoutBounds.width = .5, $.layoutBounds.height = 1
						} else if (s <= 4)
							for (h = 0; h < s; h++) l = ~~(l = h % 2), a = ~~(a = h / 2), ($ = this.clipContextList[o++]).layoutChannelNo = n, $.layoutBounds.x = .5 * l, $.layoutBounds.y = .5 * a, $.layoutBounds.width = .5, $.layoutBounds.height = .5;
						else if (s <= 9)
						for (var h = 0; h < s; h++) {
							var l = h % 3;
							l = ~~l, a = ~~(a = h / 3);
							var $ = this.clipContextList[o++];
							$.layoutChannelNo = n, $.layoutBounds.x = l / 3, $.layoutBounds.y = a / 3, $.layoutBounds.width = 1 / 3, $.layoutBounds.height = 1 / 3
						} else _._$li("_$6 _$0P mask count : %d", s)
				}
			}, r.prototype.addClippedDrawData = function(t, e) {
				var i = new o(t, e);
				this.clippedDrawContextList.push(i)
			}, s._$JT = function(t, e, i) {
				var r = t / e,
					o = i / e,
					n = o,
					s = 1 - (1 - o) * (1 - o),
					_ = 1 - (1 - n) * (1 - n),
					a = 1 / 3 * (1 - o) * s + (n * (2 / 3) + 1 / 3 * (1 - n)) * (1 - s),
					h = (n + 2 / 3 * (1 - n)) * _ + (o * (1 / 3) + 2 / 3 * (1 - o)) * (1 - _),
					l = 1 - 3 * h + 3 * a - 0,
					$ = 3 * h - 6 * a + 0,
					u = 3 * a - 0;
				if (r <= 0) return 0;
				if (r >= 1) return 1;
				var p = r,
					f = p * p;
				return l * (p * f) + $ * f + u * p + 0
			}, s.prototype._$a0 = function() {}, s.prototype.setFadeIn = function(t) {
				this._$dP = t
			}, s.prototype.setFadeOut = function(t) {
				this._$eo = t
			}, s.prototype._$pT = function(t) {
				this._$V0 = t
			}, s.prototype.getFadeOut = function() {
				return this._$eo
			}, s.prototype._$4T = function() {
				return this._$eo
			}, s.prototype._$mT = function() {
				return this._$V0
			}, s.prototype.getDurationMSec = function() {
				return -1
			}, s.prototype.getLoopDurationMSec = function() {
				return -1
			}, s.prototype.updateParam = function(t, e) {
				if (e._$AT && !e._$9L) {
					var i = A.getUserTimeMSec();
					if (e._$z2 < 0) {
						e._$z2 = i, e._$bs = i;
						var r = this.getDurationMSec();
						e._$Do < 0 && (e._$Do = r <= 0 ? -1 : e._$z2 + r)
					}
					var o = this._$V0;
					0 <= (o = o * (0 == this._$dP ? 1 : _t._$r2((i - e._$bs) / this._$dP)) * (0 == this._$eo || e._$Do < 0 ? 1 : _t._$r2((e._$Do - i) / this._$eo))) && o <= 1 || console.log("### assert!! ### "), this.updateParamExe(t, i, o, e), e._$Do > 0 && e._$Do < i && (e._$9L = !0)
				}
			}, s.prototype.updateParamExe = function(t, e, i, r) {}, _._$8s = 0, _._$fT = new Object, _.start = function(t) {
				var e = _._$fT[t];
				null == e && (e = new a, e._$r = t, _._$fT[t] = e), e._$0S = A.getSystemTimeMSec()
			}, _.dump = function(t) {
				var e = _._$fT[t];
				if (null != e) {
					var i = A.getSystemTimeMSec() - e._$0S;
					return console.log(t + " : " + i + "ms"), i
				}
				return -1
			}, _.end = function(t) {
				var e = _._$fT[t];
				return null != e ? A.getSystemTimeMSec() - e._$0S : -1
			}, _._$li = function(t, e) {
				console.log("_$li : " + t + "\n", e)
			}, _._$Ji = function(t, e) {
				console.log(t, e)
			}, _._$dL = function(t, e) {
				console.log(t, e), console.log("\n")
			}, _._$KL = function(t, e) {
				for (var i = 0; i < e; i++) i % 16 == 0 && i > 0 ? console.log("\n") : i % 8 == 0 && i > 0 && console.log("  "), console.log("%02X ", 255 & t[i]);
				console.log("\n")
			}, _._$nr = function(t, e, i) {
				console.log("%s\n", t);
				for (var r = e.length, o = 0; o < r; ++o) console.log("%5d", e[o]), console.log("%s\n", i), console.log(",");
				console.log("\n")
			}, _._$Rb = function(t) {
				console.log("dump exception : " + t), console.log("stack :: " + t.stack)
			}, h.prototype._$8P = function() {
				return .5 * (this.x + this.x + this.width)
			}, h.prototype._$6P = function() {
				return .5 * (this.y + this.y + this.height)
			}, h.prototype._$EL = function() {
				return this.x + this.width
			}, h.prototype._$5T = function() {
				return this.y + this.height
			}, h.prototype._$jL = function(t, e, i, r) {
				this.x = t, this.y = e, this.width = i, this.height = r
			}, h.prototype._$jL = function(t) {
				this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height
			}, l.prototype = new et, l._$tP = new Object, l._$27 = function() {
				l._$tP.clear()
			}, l.getID = function(t) {
				var e = l._$tP[t];
				return null == e && (e = new l(t), l._$tP[t] = e), e
			}, l.prototype._$3s = function() {
				return new l
			}, $.prototype = new et, $._$tP = new Object, $._$27 = function() {
				$._$tP.clear()
			}, $.getID = function(t) {
				var e = $._$tP[t];
				return null == e && (e = new $(t), $._$tP[t] = e), e
			}, $.prototype._$3s = function() {
				return new $
			}, u._$42 = 0, u.prototype._$zP = function() {
				null == this._$vo && (this._$vo = new it), null == this._$F2 && (this._$F2 = new Array)
			}, u.prototype.getCanvasWidth = function() {
				return this._$ao
			}, u.prototype.getCanvasHeight = function() {
				return this._$1S
			}, u.prototype._$F0 = function(t) {
				this._$vo = t._$nP(), this._$F2 = t._$nP(), this._$ao = t._$6L(), this._$1S = t._$6L()
			}, u.prototype._$6S = function(t) {
				this._$F2.push(t)
			}, u.prototype._$Xr = function() {
				return this._$F2
			}, u.prototype._$E2 = function() {
				return this._$vo
			}, p.prototype.setup = function(t, e, i) {
				this._$ks = this._$Yb(), this.p2._$xT(), 3 == arguments.length && (this._$Fo = t, this._$L2 = e, this.p1._$p = i, this.p2._$p = i, this.p2.y = t, this.setup())
			}, p.prototype.getPhysicsPoint1 = function() {
				return this.p1
			}, p.prototype.getPhysicsPoint2 = function() {
				return this.p2
			}, p.prototype._$qr = function() {
				return this._$Db
			}, p.prototype._$pr = function(t) {
				this._$Db = t
			}, p.prototype._$5r = function() {
				return this._$M2
			}, p.prototype._$Cs = function() {
				return this._$9b
			}, p.prototype._$Yb = function() {
				return -180 * Math.atan2(this.p1.x - this.p2.x, -(this.p1.y - this.p2.y)) / Math.PI
			}, p.prototype.addSrcParam = function(t, e, i, r) {
				var o = new d(t, e, i, r);
				this._$lL.push(o)
			}, p.prototype.addTargetParam = function(t, e, i, r) {
				var o = new y(t, e, i, r);
				this._$qP.push(o)
			}, p.prototype.update = function(t, e) {
				if (0 == this._$iP) return this._$iP = this._$iT = e, void(this._$Fo = Math.sqrt((this.p1.x - this.p2.x) * (this.p1.x - this.p2.x) + (this.p1.y - this.p2.y) * (this.p1.y - this.p2.y)));
				var i = (e - this._$iT) / 1e3;
				if (0 != i) {
					for (r = this._$lL.length - 1; r >= 0; --r) this._$lL[r]._$oP(t, this);
					this._$oo(t, i), this._$M2 = this._$Yb(), this._$9b = (this._$M2 - this._$ks) / i, this._$ks = this._$M2
				}
				for (var r = this._$qP.length - 1; r >= 0; --r) this._$qP[r]._$YS(t, this);
				this._$iT = e
			}, p.prototype._$oo = function(t, e) {
				e < .033 && (e = .033);
				var i = 1 / e;
				this.p1.vx = (this.p1.x - this.p1._$s0) * i, this.p1.vy = (this.p1.y - this.p1._$70) * i, this.p1.ax = (this.p1.vx - this.p1._$7L) * i, this.p1.ay = (this.p1.vy - this.p1._$HL) * i, this.p1.fx = this.p1.ax * this.p1._$p, this.p1.fy = this.p1.ay * this.p1._$p, this.p1._$xT();
				var r, o, n = -Math.atan2(this.p1.y - this.p2.y, this.p1.x - this.p2.x),
					s = Math.cos(n),
					_ = Math.sin(n),
					a = 9.8 * this.p2._$p,
					h = this._$Db * Pt._$bS,
					l = a * Math.cos(n - h);
				r = l * _, o = l * s;
				var $ = -this.p1.fx * _ * _,
					u = -this.p1.fy * _ * s,
					p = -this.p2.vx * this._$L2,
					f = -this.p2.vy * this._$L2;
				this.p2.fx = r + $ + p, this.p2.fy = o + u + f, this.p2.ax = this.p2.fx / this.p2._$p, this.p2.ay = this.p2.fy / this.p2._$p, this.p2.vx += this.p2.ax * e, this.p2.vy += this.p2.ay * e, this.p2.x += this.p2.vx * e, this.p2.y += this.p2.vy * e;
				var c = Math.sqrt((this.p1.x - this.p2.x) * (this.p1.x - this.p2.x) + (this.p1.y - this.p2.y) * (this.p1.y - this.p2.y));
				this.p2.x = this.p1.x + this._$Fo * (this.p2.x - this.p1.x) / c, this.p2.y = this.p1.y + this._$Fo * (this.p2.y - this.p1.y) / c, this.p2.vx = (this.p2.x - this.p2._$s0) * i, this.p2.vy = (this.p2.y - this.p2._$70) * i, this.p2._$xT()
			}, f.prototype._$xT = function() {
				this._$s0 = this.x, this._$70 = this.y, this._$7L = this.vx, this._$HL = this.vy
			}, c.prototype._$oP = function(t, e) {}, (d.prototype = new c)._$oP = function(t, e) {
				var i = this.scale * t.getParamFloat(this._$wL),
					r = e.getPhysicsPoint1();
				switch (this._$tL) {
					default:
						case p.Src.SRC_TO_X:
						r.x = r.x + (i - r.x) * this._$V0;
					break;
					case p.Src.SRC_TO_Y:
							r.y = r.y + (i - r.y) * this._$V0;
						break;
					case p.Src.SRC_TO_G_ANGLE:
							var o = e._$qr();o += (i - o) * this._$V0,
						e._$pr(o)
				}
			}, g.prototype._$YS = function(t, e) {}, (y.prototype = new g)._$YS = function(t, e) {
				switch (this._$YP) {
					default:
						case p.Target.TARGET_FROM_ANGLE:
						t.setParamFloat(this._$wL, this.scale * e._$5r(), this._$V0);
					break;
					case p.Target.TARGET_FROM_ANGLE_V:
							t.setParamFloat(this._$wL, this.scale * e._$Cs(), this._$V0)
				}
			}, (p.Src = function() {}).SRC_TO_X = "SRC_TO_X", p.Src.SRC_TO_Y = "SRC_TO_Y", p.Src.SRC_TO_G_ANGLE = "SRC_TO_G_ANGLE", (p.Target = function() {}).TARGET_FROM_ANGLE = "TARGET_FROM_ANGLE", p.Target.TARGET_FROM_ANGLE_V = "TARGET_FROM_ANGLE_V", T.prototype.init = function(t) {
				this._$fL = t._$fL, this._$gL = t._$gL, this._$B0 = t._$B0, this._$z0 = t._$z0, this._$qT = t._$qT, this.reflectX = t.reflectX, this.reflectY = t.reflectY
			}, T.prototype._$F0 = function(t) {
				this._$fL = t._$_T(), this._$gL = t._$_T(), this._$B0 = t._$_T(), this._$z0 = t._$_T(), this._$qT = t._$_T(), t.getFormatVersion() >= U.LIVE2D_FORMAT_VERSION_V2_10_SDK2 && (this.reflectX = t._$po(), this.reflectY = t._$po())
			}, T.prototype._$e = function() {};
			var Lt = function() {};
			Lt._$ni = function(t, e, i, r, o, n, s, _, a) {
				var h = s * n - _ * o;
				if (0 == h) return null;
				var l, $ = ((t - i) * n - (e - r) * o) / h;
				return l = 0 != o ? (t - i - $ * s) / o : (e - r - $ * _) / n, isNaN(l) && (l = (t - i - $ * s) / o, isNaN(l) && (l = (e - r - $ * _) / n), isNaN(l) && (console.log("a is NaN @UtVector#_$ni() "), console.log("v1x : " + o), console.log("v1x != 0 ? " + (0 != o)))), null == a ? new Array(l, $) : (a[0] = l, a[1] = $, a)
			}, P.prototype._$8P = function() {
				return this.x + .5 * this.width
			}, P.prototype._$6P = function() {
				return this.y + .5 * this.height
			}, P.prototype._$EL = function() {
				return this.x + this.width
			}, P.prototype._$5T = function() {
				return this.y + this.height
			}, P.prototype._$jL = function(t, e, i, r) {
				this.x = t, this.y = e, this.width = i, this.height = r
			}, P.prototype._$jL = function(t) {
				this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height
			}, P.prototype.contains = function(t, e) {
				return this.x <= this.x && this.y <= this.y && this.x <= this.x + this.width && this.y <= this.y + this.height
			}, P.prototype.expand = function(t, e) {
				this.x -= t, this.y -= e, this.width += 2 * t, this.height += 2 * e
			}, S._$Z2 = function(t, e, i, r) {
				var o = e._$Q2(t, i),
					n = t._$vs(),
					s = t._$Tr();
				if (e._$zr(n, s, o), o <= 0) return r[n[0]];
				if (1 == o) return (_ = r[n[0]]) + ((a = r[n[1]]) - _) * (b = s[0]) | 0;
				if (2 == o) {
					var _ = r[n[0]],
						a = r[n[1]],
						h = r[n[2]],
						l = r[n[3]];
					return (B = _ + (a - _) * (b = s[0]) | 0) + ((U = h + (l - h) * b | 0) - B) * (C = s[1]) | 0
				}
				if (3 == o) {
					var $ = r[n[0]],
						u = r[n[1]],
						p = r[n[2]],
						f = r[n[3]],
						c = r[n[4]],
						d = r[n[5]],
						g = r[n[6]],
						y = r[n[7]];
					return (B = (_ = $ + (u - $) * (b = s[0]) | 0) + ((a = p + (f - p) * b | 0) - _) * (C = s[1]) | 0) + ((U = (h = c + (d - c) * b | 0) + ((l = g + (y - g) * b | 0) - h) * C | 0) - B) * (N = s[2]) | 0
				}
				if (4 == o) {
					var m = r[n[0]],
						T = r[n[1]],
						P = r[n[2]],
						S = r[n[3]],
						v = r[n[4]],
						L = r[n[5]],
						E = r[n[6]],
						M = r[n[7]],
						I = r[n[8]],
						A = r[n[9]],
						w = r[n[10]],
						x = r[n[11]],
						O = r[n[12]],
						D = r[n[13]],
						R = r[n[14]],
						F = r[n[15]],
						b = s[0],
						C = s[1],
						N = s[2],
						B = (_ = ($ = m + (T - m) * b | 0) + ((u = P + (S - P) * b | 0) - $) * C | 0) + ((a = (p = v + (L - v) * b | 0) + ((f = E + (M - E) * b | 0) - p) * C | 0) - _) * N | 0,
						U = (h = (c = I + (A - I) * b | 0) + ((d = w + (x - w) * b | 0) - c) * C | 0) + ((l = (g = O + (D - O) * b | 0) + ((y = R + (F - R) * b | 0) - g) * C | 0) - h) * N | 0;
					return B + (U - B) * s[3] | 0
				}
				for (var G = 1 << o, Y = new Float32Array(G), k = 0; k < G; k++) {
					for (var V = k, X = 1, z = 0; z < o; z++) X *= V % 2 == 0 ? 1 - s[z] : s[z], V /= 2;
					Y[k] = X
				}
				for (var H = new Float32Array(G), W = 0; W < G; W++) H[W] = r[n[W]];
				for (var j = 0, W = 0; W < G; W++) j += Y[W] * H[W];
				return j + .5 | 0
			}, S._$br = function(t, e, i, r) {
				var o = e._$Q2(t, i),
					n = t._$vs(),
					s = t._$Tr();
				if (e._$zr(n, s, o), o <= 0) return r[n[0]];
				if (1 == o) return (_ = r[n[0]]) + ((a = r[n[1]]) - _) * ($ = s[0]);
				if (2 == o) {
					var _ = r[n[0]],
						a = r[n[1]],
						h = r[n[2]],
						l = r[n[3]],
						$ = s[0];
					return (1 - (T = s[1])) * (_ + (a - _) * $) + T * (h + (l - h) * $)
				}
				if (3 == o) {
					var u = r[n[0]],
						p = r[n[1]],
						f = r[n[2]],
						c = r[n[3]],
						d = r[n[4]],
						g = r[n[5]],
						y = r[n[6]],
						m = r[n[7]],
						$ = s[0],
						T = s[1];
					return (1 - (N = s[2])) * ((1 - T) * (u + (p - u) * $) + T * (f + (c - f) * $)) + N * ((1 - T) * (d + (g - d) * $) + T * (y + (m - y) * $))
				}
				if (4 == o) {
					var P = r[n[0]],
						S = r[n[1]],
						v = r[n[2]],
						L = r[n[3]],
						E = r[n[4]],
						M = r[n[5]],
						I = r[n[6]],
						A = r[n[7]],
						w = r[n[8]],
						x = r[n[9]],
						O = r[n[10]],
						D = r[n[11]],
						R = r[n[12]],
						F = r[n[13]],
						b = r[n[14]],
						C = r[n[15]],
						$ = s[0],
						T = s[1],
						N = s[2],
						B = s[3];
					return (1 - B) * ((1 - N) * ((1 - T) * (P + (S - P) * $) + T * (v + (L - v) * $)) + N * ((1 - T) * (E + (M - E) * $) + T * (I + (A - I) * $))) + B * ((1 - N) * ((1 - T) * (w + (x - w) * $) + T * (O + (D - O) * $)) + N * ((1 - T) * (R + (F - R) * $) + T * (b + (C - b) * $)))
				}
				for (var U = 1 << o, G = new Float32Array(U), Y = 0; Y < U; Y++) {
					for (var k = Y, V = 1, X = 0; X < o; X++) V *= k % 2 == 0 ? 1 - s[X] : s[X], k /= 2;
					G[Y] = V
				}
				for (var z = new Float32Array(U), H = 0; H < U; H++) z[H] = r[n[H]];
				for (var W = 0, H = 0; H < U; H++) W += G[H] * z[H];
				return W
			}, S._$Vr = function(t, e, i, r, o, n, s, _) {
				var a = e._$Q2(t, i),
					h = t._$vs(),
					l = t._$Tr();
				e._$zr(h, l, a);
				var $ = 2 * r,
					u = s;
				if (a <= 0) {
					p = o[h[0]];
					if (2 == _ && 0 == s) A._$jT(p, 0, n, 0, $);
					else
						for (g = 0; g < $;) n[u] = p[g++], n[u + 1] = p[g++], u += _
				} else if (1 == a)
					for (var p = o[h[0]], f = o[h[1]], c = l[0], d = 1 - c, g = 0; g < $;) n[u] = p[g] * d + f[g] * c, ++g, n[u + 1] = p[g] * d + f[g] * c, ++g, u += _;
				else if (2 == a)
					for (var p = o[h[0]], f = o[h[1]], y = o[h[2]], m = o[h[3]], c = l[0], T = l[1], d = 1 - c, P = 1 - T, S = P * d, v = P * c, L = T * d, E = T * c, g = 0; g < $;) n[u] = S * p[g] + v * f[g] + L * y[g] + E * m[g], ++g, n[u + 1] = S * p[g] + v * f[g] + L * y[g] + E * m[g], ++g, u += _;
				else if (3 == a)
					for (var M = o[h[0]], I = o[h[1]], w = o[h[2]], x = o[h[3]], O = o[h[4]], D = o[h[5]], R = o[h[6]], F = o[h[7]], c = l[0], T = l[1], b = l[2], d = 1 - c, P = 1 - T, C = 1 - b, N = C * P * d, B = C * P * c, U = C * T * d, G = C * T * c, Y = b * P * d, k = b * P * c, V = b * T * d, X = b * T * c, g = 0; g < $;) n[u] = N * M[g] + B * I[g] + U * w[g] + G * x[g] + Y * O[g] + k * D[g] + V * R[g] + X * F[g], ++g, n[u + 1] = N * M[g] + B * I[g] + U * w[g] + G * x[g] + Y * O[g] + k * D[g] + V * R[g] + X * F[g], ++g, u += _;
				else if (4 == a)
					for (var z = o[h[0]], H = o[h[1]], W = o[h[2]], j = o[h[3]], q = o[h[4]], J = o[h[5]], Q = o[h[6]], Z = o[h[7]], K = o[h[8]], tt = o[h[9]], et = o[h[10]], it = o[h[11]], rt = o[h[12]], ot = o[h[13]], nt = o[h[14]], st = o[h[15]], c = l[0], T = l[1], b = l[2], _t = l[3], d = 1 - c, P = 1 - T, C = 1 - b, at = 1 - _t, ht = at * C * P * d, lt = at * C * P * c, $t = at * C * T * d, ut = at * C * T * c, pt = at * b * P * d, ft = at * b * P * c, ct = at * b * T * d, dt = at * b * T * c, gt = _t * C * P * d, yt = _t * C * P * c, mt = _t * C * T * d, Tt = _t * C * T * c, Pt = _t * b * P * d, St = _t * b * P * c, vt = _t * b * T * d, Lt = _t * b * T * c, g = 0; g < $;) n[u] = ht * z[g] + lt * H[g] + $t * W[g] + ut * j[g] + pt * q[g] + ft * J[g] + ct * Q[g] + dt * Z[g] + gt * K[g] + yt * tt[g] + mt * et[g] + Tt * it[g] + Pt * rt[g] + St * ot[g] + vt * nt[g] + Lt * st[g], ++g, n[u + 1] = ht * z[g] + lt * H[g] + $t * W[g] + ut * j[g] + pt * q[g] + ft * J[g] + ct * Q[g] + dt * Z[g] + gt * K[g] + yt * tt[g] + mt * et[g] + Tt * it[g] + Pt * rt[g] + St * ot[g] + vt * nt[g] + Lt * st[g], ++g, u += _;
				else {
					for (var Et = 1 << a, Mt = new Float32Array(Et), It = 0; It < Et; It++) {
						for (var At = It, wt = 1, xt = 0; xt < a; xt++) wt *= At % 2 == 0 ? 1 - l[xt] : l[xt], At /= 2;
						Mt[It] = wt
					}
					for (var Ot = new Float32Array(Et), Dt = 0; Dt < Et; Dt++) Ot[Dt] = o[h[Dt]];
					for (g = 0; g < $;) {
						for (var Rt = 0, Ft = 0, bt = g + 1, Dt = 0; Dt < Et; Dt++) Rt += Mt[Dt] * Ot[Dt][g], Ft += Mt[Dt] * Ot[Dt][bt];
						g += 2, n[u] = Rt, n[u + 1] = Ft, u += _
					}
				}
			}, v.prototype._$HT = function(t, e) {
				this.x = t, this.y = e
			}, v.prototype._$HT = function(t) {
				this.x = t.x, this.y = t.y
			}, L._$ur = -2, L._$ES = 500, L._$wb = 2, L._$8S = 3, L._$52 = L._$ES, L._$R2 = L._$ES, L._$or = function() {
				return L._$52
			}, L._$Pr = function() {
				return L._$R2
			}, L.prototype.convertClipIDForV2_11 = function(t) {
				var e = [];
				return null == t ? null : 0 == t.length ? null : /,/.test(t) ? e = t.id.split(",") : (e.push(t.id), e)
			}, L.prototype._$F0 = function(t) {
				this._$gP = t._$nP(), this._$dr = t._$nP(), this._$GS = t._$nP(), this._$qb = t._$6L(), this._$Lb = t._$cS(), this._$mS = t._$Tb(), t.getFormatVersion() >= U._$T7 ? (this.clipID = t._$nP(), this.clipIDList = this.convertClipIDForV2_11(this.clipID)) : this.clipIDList = [], this._$MS(this._$Lb)
			}, L.prototype.getClipIDList = function() {
				return this.clipIDList
			}, L.prototype.init = function(t) {}, L.prototype._$Nr = function(t, e) {
				if (e._$IS[0] = !1, e._$Us = S._$Z2(t, this._$GS, e._$IS, this._$Lb), st._$Zs);
				else if (e._$IS[0]) return;
				e._$7s = S._$br(t, this._$GS, e._$IS, this._$mS)
			}, L.prototype._$2b = function(t, e) {}, L.prototype.getDrawDataID = function() {
				return this._$gP
			}, L.prototype._$j2 = function(t) {
				this._$gP = t
			}, L.prototype.getOpacity = function(t, e) {
				return e._$7s
			}, L.prototype._$zS = function(t, e) {
				return e._$Us
			}, L.prototype._$MS = function(t) {
				for (var e = t.length - 1; e >= 0; --e) {
					var i = t[e];
					i < L._$52 ? L._$52 = i : i > L._$R2 && (L._$R2 = i)
				}
			}, L.prototype.getTargetBaseDataID = function() {
				return this._$dr
			}, L.prototype._$gs = function(t) {
				this._$dr = t
			}, L.prototype._$32 = function() {
				return null != this._$dr && this._$dr != dt._$2o()
			}, L.prototype.preDraw = function(t, e, i) {}, L.prototype.draw = function(t, e, i) {}, L.prototype.getType = function() {}, L.prototype._$B2 = function(t, e, i) {}, E._$ps = 32, E.CLIPPING_PROCESS_NONE = 0, E.CLIPPING_PROCESS_OVERWRITE_ALPHA = 1, E.CLIPPING_PROCESS_MULTIPLY_ALPHA = 2, E.CLIPPING_PROCESS_DRAW = 3, E.CLIPPING_PROCESS_CLEAR_ALPHA = 4, E.prototype.setChannelFlagAsColor = function(t, e) {
				this.CHANNEL_COLORS[t] = e
			}, E.prototype.getChannelFlagAsColor = function(t) {
				return this.CHANNEL_COLORS[t]
			}, E.prototype._$ZT = function() {}, E.prototype._$Uo = function(t, e, i, r, o, n, s) {}, E.prototype._$Rs = function() {
				return -1
			}, E.prototype._$Ds = function(t) {}, E.prototype.setBaseColor = function(t, e, i, r) {
				t < 0 ? t = 0 : t > 1 && (t = 1), e < 0 ? e = 0 : e > 1 && (e = 1), i < 0 ? i = 0 : i > 1 && (i = 1), r < 0 ? r = 0 : r > 1 && (r = 1), this._$lT = t, this._$C0 = e, this._$tT = i, this._$WL = r
			}, E.prototype._$WP = function(t) {
				this.culling = t
			}, E.prototype.setMatrix = function(t) {
				for (var e = 0; e < 16; e++) this.matrix4x4[e] = t[e]
			}, E.prototype._$IT = function() {
				return this.matrix4x4
			}, E.prototype.setPremultipliedAlpha = function(t) {
				this.premultipliedAlpha = t
			}, E.prototype.isPremultipliedAlpha = function() {
				return this.premultipliedAlpha
			}, E.prototype.setAnisotropy = function(t) {
				this.anisotropy = t
			}, E.prototype.getAnisotropy = function() {
				return this.anisotropy
			}, E.prototype.getClippingProcess = function() {
				return this.clippingProcess
			}, E.prototype.setClippingProcess = function(t) {
				this.clippingProcess = t
			}, E.prototype.setClipBufPre_clipContextForMask = function(t) {
				this.clipBufPre_clipContextMask = t
			}, E.prototype.getClipBufPre_clipContextMask = function() {
				return this.clipBufPre_clipContextMask
			}, E.prototype.setClipBufPre_clipContextForDraw = function(t) {
				this.clipBufPre_clipContextDraw = t
			}, E.prototype.getClipBufPre_clipContextDraw = function() {
				return this.clipBufPre_clipContextDraw
			}, I._$ur = -2, I._$c2 = 1, I._$_b = 2, I.prototype._$F0 = function(t) {
				this._$kP = t._$nP(), this._$dr = t._$nP()
			}, I.prototype.readV2_opacity = function(t) {
				t.getFormatVersion() >= U.LIVE2D_FORMAT_VERSION_V2_10_SDK2 && (this._$mS = t._$Tb())
			}, I.prototype.init = function(t) {}, I.prototype._$Nr = function(t, e) {}, I.prototype.interpolateOpacity = function(t, e, i, r) {
				null == this._$mS ? i.setInterpolatedOpacity(1) : i.setInterpolatedOpacity(S._$br(t, e, r, this._$mS))
			}, I.prototype._$2b = function(t, e) {}, I.prototype._$nb = function(t, e, i, r, o, n, s) {}, I.prototype.getType = function() {}, I.prototype._$gs = function(t) {
				this._$dr = t
			}, I.prototype._$a2 = function(t) {
				this._$kP = t
			}, I.prototype.getTargetBaseDataID = function() {
				return this._$dr
			}, I.prototype.getBaseDataID = function() {
				return this._$kP
			}, I.prototype._$32 = function() {
				return null != this._$dr && this._$dr != dt._$2o()
			}, A._$W2 = 0, A._$CS = A._$W2, A._$Mo = function() {
				return !0
			}, A._$XP = function(t) {
				try {
					for (var e = getTimeMSec(); getTimeMSec() - e < t;);
				} catch (t) {
					t._$Rb()
				}
			}, A.getUserTimeMSec = function() {
				return A._$CS == A._$W2 ? A.getSystemTimeMSec() : A._$CS
			}, A.setUserTimeMSec = function(t) {
				A._$CS = t
			}, A.updateUserTimeMSec = function() {
				return A._$CS = A.getSystemTimeMSec()
			}, A.getTimeMSec = function() {
				return (new Date).getTime()
			}, A.getSystemTimeMSec = function() {
				return (new Date).getTime()
			}, A._$Q = function(t) {}, A._$jT = function(t, e, i, r, o) {
				for (var n = 0; n < o; n++) i[r + n] = t[e + n]
			}, w._$ds = -2, w.prototype._$F0 = function(t) {
				this._$wL = t._$nP(), this._$VP = t._$6L(), this._$GP = t._$nP()
			}, w.prototype.getParamIndex = function(t) {
				return this._$2r != t && (this._$8o = w._$ds), this._$8o
			}, w.prototype._$Pb = function(t, e) {
				this._$8o = t, this._$2r = e
			}, w.prototype.getParamID = function() {
				return this._$wL
			}, w.prototype._$yP = function(t) {
				this._$wL = t
			}, w.prototype._$N2 = function() {
				return this._$VP
			}, w.prototype._$d2 = function() {
				return this._$GP
			}, w.prototype._$t2 = function(t, e) {
				this._$VP = t, this._$GP = e
			}, w.prototype._$Lr = function() {
				return this._$O2
			}, w.prototype._$wr = function(t) {
				this._$O2 = t
			}, w.prototype._$SL = function() {
				return this._$ri
			}, w.prototype._$AL = function(t) {
				this._$ri = t
			}, x.startsWith = function(t, e, i) {
				var r = e + i.length;
				if (r >= t.length) return !1;
				for (var o = e; o < r; o++)
					if (x.getChar(t, o) != i.charAt(o - e)) return !1;
				return !0
			}, x.getChar = function(t, e) {
				return String.fromCharCode(t.getUint8(e))
			}, x.createString = function(t, e, i) {
				for (var r = new ArrayBuffer(2 * i), o = new Uint16Array(r), n = 0; n < i; n++) o[n] = t.getUint8(e + n);
				return String.fromCharCode.apply(null, o)
			}, x._$LS = function(t, e, i, r) {
				t instanceof ArrayBuffer && (t = new DataView(t));
				var o = i,
					n = !1,
					s = !1,
					_ = 0,
					a = x.getChar(t, o);
				"-" == a && (n = !0, o++);
				for (var h = !1; o < e; o++) {
					switch (a = x.getChar(t, o)) {
						case "0":
							_ *= 10;
							break;
						case "1":
							_ = 10 * _ + 1;
							break;
						case "2":
							_ = 10 * _ + 2;
							break;
						case "3":
							_ = 10 * _ + 3;
							break;
						case "4":
							_ = 10 * _ + 4;
							break;
						case "5":
							_ = 10 * _ + 5;
							break;
						case "6":
							_ = 10 * _ + 6;
							break;
						case "7":
							_ = 10 * _ + 7;
							break;
						case "8":
							_ = 10 * _ + 8;
							break;
						case "9":
							_ = 10 * _ + 9;
							break;
						case ".":
							s = !0, o++, h = !0;
							break;
						default:
							h = !0
					}
					if (h) break
				}
				if (s)
					for (var l = .1, $ = !1; o < e; o++) {
						switch (a = x.getChar(t, o)) {
							case "0":
								break;
							case "1":
								_ += 1 * l;
								break;
							case "2":
								_ += 2 * l;
								break;
							case "3":
								_ += 3 * l;
								break;
							case "4":
								_ += 4 * l;
								break;
							case "5":
								_ += 5 * l;
								break;
							case "6":
								_ += 6 * l;
								break;
							case "7":
								_ += 7 * l;
								break;
							case "8":
								_ += 8 * l;
								break;
							case "9":
								_ += 9 * l;
								break;
							default:
								$ = !0
						}
						if (l *= .1, $) break
					}
				return n && (_ = -_), r[0] = o, _
			}, O.prototype._$zP = function() {
				this._$Ob = new Array
			}, O.prototype._$F0 = function(t) {
				this._$Ob = t._$nP()
			}, O.prototype._$Ur = function(t) {
				if (t._$WS()) return !0;
				for (var e = t._$v2(), i = this._$Ob.length - 1; i >= 0; --i) {
					var r = this._$Ob[i].getParamIndex(e);
					if (r == w._$ds && (r = t.getParamIndex(this._$Ob[i].getParamID())), t._$Xb(r)) return !0
				}
				return !1
			}, O.prototype._$Q2 = function(t, e) {
				for (var i, r, o = this._$Ob.length, n = t._$v2(), s = 0, _ = 0; _ < o; _++) {
					var a = this._$Ob[_];
					if ((i = a.getParamIndex(n)) == w._$ds && (i = t.getParamIndex(a.getParamID()), a._$Pb(i, n)), i < 0) throw new Exception("err 23242 : " + a.getParamID());
					var h = i < 0 ? 0 : t.getParamFloat(i);
					r = a._$N2();
					var l, $, u = a._$d2(),
						p = -1,
						f = 0;
					if (r < 1);
					else if (1 == r) l = u[0], l - B._$J < h && h < l + B._$J ? (p = 0, f = 0) : (p = 0, e[0] = !0);
					else if (l = u[0], h < l - B._$J) p = 0, e[0] = !0;
					else if (h < l + B._$J) p = 0;
					else {
						for (var c = !1, d = 1; d < r; ++d) {
							if ($ = u[d], h < $ + B._$J) {
								$ - B._$J < h ? p = d : (p = d - 1, f = (h - l) / ($ - l), s++), c = !0;
								break
							}
							l = $
						}
						c || (p = r - 1, f = 0, e[0] = !0)
					}
					a._$wr(p), a._$AL(f)
				}
				return s
			}, O.prototype._$zr = function(t, e, i) {
				var r = 1 << i;
				r + 1 > B._$Qb && console.log("err 23245\n");
				for (var o = this._$Ob.length, n = 1, s = 1, _ = 0, a = 0; a < r; ++a) t[a] = 0;
				for (var h = 0; h < o; ++h) {
					var l = this._$Ob[h];
					if (0 == l._$SL()) {
						if (($ = l._$Lr() * n) < 0 && st._$3T) throw new Exception("err 23246");
						for (a = 0; a < r; ++a) t[a] += $
					} else {
						for (var $ = n * l._$Lr(), u = n * (l._$Lr() + 1), a = 0; a < r; ++a) t[a] += (a / s | 0) % 2 == 0 ? $ : u;
						e[_++] = l._$SL(), s *= 2
					}
					n *= l._$N2()
				}
				t[r] = 65535, e[_] = -1
			}, O.prototype._$h2 = function(t, e, i) {
				for (var r = new Float32Array(e), o = 0; o < e; ++o) r[o] = i[o];
				var n = new w;
				n._$yP(t), n._$t2(e, r), this._$Ob.push(n)
			}, O.prototype._$J2 = function(t) {
				for (var e = t, i = this._$Ob.length, r = 0; r < i; ++r) {
					var o = this._$Ob[r],
						n = o._$N2(),
						s = e % o._$N2(),
						_ = o._$d2()[s];
					console.log("%s[%d]=%7.2f / ", o.getParamID(), s, _), e /= n
				}
				console.log("\n")
			}, O.prototype.getParamCount = function() {
				return this._$Ob.length
			}, O.prototype._$zs = function() {
				return this._$Ob
			}, D.prototype.identity = function() {
				for (var t = 0; t < 16; t++) this.m[t] = t % 5 == 0 ? 1 : 0
			}, D.prototype.getArray = function() {
				return this.m
			}, D.prototype.getCopyMatrix = function() {
				return new Float32Array(this.m)
			}, D.prototype.setMatrix = function(t) {
				if (null != t && 16 == t.length)
					for (var e = 0; e < 16; e++) this.m[e] = t[e]
			}, D.prototype.mult = function(t, e, i) {
				return null == e ? null : (this == e ? this.mult_safe(this.m, t.m, e.m, i) : this.mult_fast(this.m, t.m, e.m, i), e)
			}, D.prototype.mult_safe = function(t, e, i, r) {
				if (t == i) {
					var o = new Array(16);
					this.mult_fast(t, e, o, r);
					for (var n = 15; n >= 0; --n) i[n] = o[n]
				} else this.mult_fast(t, e, i, r)
			}, D.prototype.mult_fast = function(t, e, i, r) {
				r ? (i[0] = t[0] * e[0] + t[4] * e[1] + t[8] * e[2], i[4] = t[0] * e[4] + t[4] * e[5] + t[8] * e[6], i[8] = t[0] * e[8] + t[4] * e[9] + t[8] * e[10], i[12] = t[0] * e[12] + t[4] * e[13] + t[8] * e[14] + t[12], i[1] = t[1] * e[0] + t[5] * e[1] + t[9] * e[2], i[5] = t[1] * e[4] + t[5] * e[5] + t[9] * e[6], i[9] = t[1] * e[8] + t[5] * e[9] + t[9] * e[10], i[13] = t[1] * e[12] + t[5] * e[13] + t[9] * e[14] + t[13], i[2] = t[2] * e[0] + t[6] * e[1] + t[10] * e[2], i[6] = t[2] * e[4] + t[6] * e[5] + t[10] * e[6], i[10] = t[2] * e[8] + t[6] * e[9] + t[10] * e[10], i[14] = t[2] * e[12] + t[6] * e[13] + t[10] * e[14] + t[14], i[3] = i[7] = i[11] = 0, i[15] = 1) : (i[0] = t[0] * e[0] + t[4] * e[1] + t[8] * e[2] + t[12] * e[3], i[4] = t[0] * e[4] + t[4] * e[5] + t[8] * e[6] + t[12] * e[7], i[8] = t[0] * e[8] + t[4] * e[9] + t[8] * e[10] + t[12] * e[11], i[12] = t[0] * e[12] + t[4] * e[13] + t[8] * e[14] + t[12] * e[15], i[1] = t[1] * e[0] + t[5] * e[1] + t[9] * e[2] + t[13] * e[3], i[5] = t[1] * e[4] + t[5] * e[5] + t[9] * e[6] + t[13] * e[7], i[9] = t[1] * e[8] + t[5] * e[9] + t[9] * e[10] + t[13] * e[11], i[13] = t[1] * e[12] + t[5] * e[13] + t[9] * e[14] + t[13] * e[15], i[2] = t[2] * e[0] + t[6] * e[1] + t[10] * e[2] + t[14] * e[3], i[6] = t[2] * e[4] + t[6] * e[5] + t[10] * e[6] + t[14] * e[7], i[10] = t[2] * e[8] + t[6] * e[9] + t[10] * e[10] + t[14] * e[11], i[14] = t[2] * e[12] + t[6] * e[13] + t[10] * e[14] + t[14] * e[15], i[3] = t[3] * e[0] + t[7] * e[1] + t[11] * e[2] + t[15] * e[3], i[7] = t[3] * e[4] + t[7] * e[5] + t[11] * e[6] + t[15] * e[7], i[11] = t[3] * e[8] + t[7] * e[9] + t[11] * e[10] + t[15] * e[11], i[15] = t[3] * e[12] + t[7] * e[13] + t[11] * e[14] + t[15] * e[15])
			}, D.prototype.translate = function(t, e, i) {
				this.m[12] = this.m[0] * t + this.m[4] * e + this.m[8] * i + this.m[12], this.m[13] = this.m[1] * t + this.m[5] * e + this.m[9] * i + this.m[13], this.m[14] = this.m[2] * t + this.m[6] * e + this.m[10] * i + this.m[14], this.m[15] = this.m[3] * t + this.m[7] * e + this.m[11] * i + this.m[15]
			}, D.prototype.scale = function(t, e, i) {
				this.m[0] *= t, this.m[4] *= e, this.m[8] *= i, this.m[1] *= t, this.m[5] *= e, this.m[9] *= i, this.m[2] *= t, this.m[6] *= e, this.m[10] *= i, this.m[3] *= t, this.m[7] *= e, this.m[11] *= i
			}, D.prototype.rotateX = function(t) {
				var e = Pt.fcos(t),
					i = Pt._$9(t),
					r = this.m[4];
				this.m[4] = r * e + this.m[8] * i, this.m[8] = r * -i + this.m[8] * e, r = this.m[5], this.m[5] = r * e + this.m[9] * i, this.m[9] = r * -i + this.m[9] * e, r = this.m[6], this.m[6] = r * e + this.m[10] * i, this.m[10] = r * -i + this.m[10] * e, r = this.m[7], this.m[7] = r * e + this.m[11] * i, this.m[11] = r * -i + this.m[11] * e
			}, D.prototype.rotateY = function(t) {
				var e = Pt.fcos(t),
					i = Pt._$9(t),
					r = this.m[0];
				this.m[0] = r * e + this.m[8] * -i, this.m[8] = r * i + this.m[8] * e, r = this.m[1], this.m[1] = r * e + this.m[9] * -i, this.m[9] = r * i + this.m[9] * e, r = m[2], this.m[2] = r * e + this.m[10] * -i, this.m[10] = r * i + this.m[10] * e, r = m[3], this.m[3] = r * e + this.m[11] * -i, this.m[11] = r * i + this.m[11] * e
			}, D.prototype.rotateZ = function(t) {
				var e = Pt.fcos(t),
					i = Pt._$9(t),
					r = this.m[0];
				this.m[0] = r * e + this.m[4] * i, this.m[4] = r * -i + this.m[4] * e, r = this.m[1], this.m[1] = r * e + this.m[5] * i, this.m[5] = r * -i + this.m[5] * e, r = this.m[2], this.m[2] = r * e + this.m[6] * i, this.m[6] = r * -i + this.m[6] * e, r = this.m[3], this.m[3] = r * e + this.m[7] * i, this.m[7] = r * -i + this.m[7] * e
			}, R.prototype = new et, R._$tP = new Object, R._$27 = function() {
				R._$tP.clear()
			}, R.getID = function(t) {
				var e = R._$tP[t];
				return null == e && (e = new R(t), R._$tP[t] = e), e
			}, R.prototype._$3s = function() {
				return new R
			}, F._$kS = -1, F._$pS = 0, F._$hb = 1, F.STATE_IDENTITY = 0, F._$gb = 1, F._$fo = 2, F._$go = 4, F.prototype.transform = function(t, e, i) {
				var r, o, n, s, _, a, h = 0,
					l = 0;
				switch (this._$hi) {
					default: return;
					case F._$go | F._$fo | F._$gb:
							for (r = this._$7, o = this._$H, n = this._$k, s = this._$f, _ = this._$g, a = this._$w; --i >= 0;) {
							var $ = t[h++],
								u = t[h++];
							e[l++] = r * $ + o * u + n, e[l++] = s * $ + _ * u + a
						}
						return;
					case F._$go | F._$fo:
							for (r = this._$7, o = this._$H, s = this._$f, _ = this._$g; --i >= 0;) {
							var $ = t[h++],
								u = t[h++];
							e[l++] = r * $ + o * u, e[l++] = s * $ + _ * u
						}
						return;
					case F._$go | F._$gb:
							for (o = this._$H, n = this._$k, s = this._$f, a = this._$w; --i >= 0;) {
							$ = t[h++];
							e[l++] = o * t[h++] + n, e[l++] = s * $ + a
						}
						return;
					case F._$go:
							for (o = this._$H, s = this._$f; --i >= 0;) {
							$ = t[h++];
							e[l++] = o * t[h++], e[l++] = s * $
						}
						return;
					case F._$fo | F._$gb:
							for (r = this._$7, n = this._$k, _ = this._$g, a = this._$w; --i >= 0;) e[l++] = r * t[h++] + n, e[l++] = _ * t[h++] + a;
						return;
					case F._$fo:
							for (r = this._$7, _ = this._$g; --i >= 0;) e[l++] = r * t[h++], e[l++] = _ * t[h++];
						return;
					case F._$gb:
							for (n = this._$k, a = this._$w; --i >= 0;) e[l++] = t[h++] + n, e[l++] = t[h++] + a;
						return;
					case F.STATE_IDENTITY:
							return void(t == e && h == l || A._$jT(t, h, e, l, 2 * i))
				}
			}, F.prototype.update = function() {
				0 == this._$H && 0 == this._$f ? 1 == this._$7 && 1 == this._$g ? 0 == this._$k && 0 == this._$w ? (this._$hi = F.STATE_IDENTITY, this._$Z = F._$pS) : (this._$hi = F._$gb, this._$Z = F._$hb) : 0 == this._$k && 0 == this._$w ? (this._$hi = F._$fo, this._$Z = F._$kS) : (this._$hi = F._$fo | F._$gb, this._$Z = F._$kS) : 0 == this._$7 && 0 == this._$g ? 0 == this._$k && 0 == this._$w ? (this._$hi = F._$go, this._$Z = F._$kS) : (this._$hi = F._$go | F._$gb, this._$Z = F._$kS) : 0 == this._$k && 0 == this._$w ? (this._$hi = F._$go | F._$fo, this._$Z = F._$kS) : (this._$hi = F._$go | F._$fo | F._$gb, this._$Z = F._$kS)
			}, F.prototype._$RT = function(t) {
				this._$IT(t);
				var e = t[0],
					i = t[2],
					r = t[1],
					o = t[3],
					n = Math.sqrt(e * e + r * r),
					s = e * o - i * r;
				0 == n ? st._$so && console.log("affine._$RT() / rt==0") : (t[0] = n, t[1] = s / n, t[2] = (r * o + e * i) / s, t[3] = Math.atan2(r, e))
			}, F.prototype._$ho = function(t, e, i, r) {
				var o = new Float32Array(6),
					n = new Float32Array(6);
				t._$RT(o), e._$RT(n);
				var s = new Float32Array(6);
				s[0] = o[0] + (n[0] - o[0]) * i, s[1] = o[1] + (n[1] - o[1]) * i, s[2] = o[2] + (n[2] - o[2]) * i, s[3] = o[3] + (n[3] - o[3]) * i, s[4] = o[4] + (n[4] - o[4]) * i, s[5] = o[5] + (n[5] - o[5]) * i, r._$CT(s)
			}, F.prototype._$CT = function(t) {
				var e = Math.cos(t[3]),
					i = Math.sin(t[3]);
				this._$7 = t[0] * e, this._$f = t[0] * i, this._$H = t[1] * (t[2] * e - i), this._$g = t[1] * (t[2] * i + e), this._$k = t[4], this._$w = t[5], this.update()
			}, F.prototype._$IT = function(t) {
				t[0] = this._$7, t[1] = this._$f, t[2] = this._$H, t[3] = this._$g, t[4] = this._$k, t[5] = this._$w
			}, b.prototype = new s, b._$cs = "VISIBLE:", b._$ar = "LAYOUT:", b._$Co = 0, b._$D2 = [], b._$1T = 1, b.loadMotion = function(t) {
				var e = new b,
					i = [0],
					r = t.length;
				e._$yT = 0;
				for (var o = 0; o < r; ++o) {
					var n = 255 & t[o];
					if ("\n" != n && "\r" != n)
						if ("#" != n)
							if ("$" != n) {
								if ("a" <= n && n <= "z" || "A" <= n && n <= "Z" || "_" == n) {
									for (var s = o, _ = -1; o < r && "\r" != (n = 255 & t[o]) && "\n" != n; ++o)
										if ("=" == n) {
											_ = o;
											break
										}
									if (_ >= 0) {
										var a = new N;
										x.startsWith(t, s, b._$cs) ? (a._$RP = N._$hs, a._$4P = new String(t, s, _ - s)) : x.startsWith(t, s, b._$ar) ? (a._$4P = new String(t, s + 7, _ - s - 7), x.startsWith(t, s + 7, "ANCHOR_X") ? a._$RP = N._$xs : x.startsWith(t, s + 7, "ANCHOR_Y") ? a._$RP = N._$us : x.startsWith(t, s + 7, "SCALE_X") ? a._$RP = N._$qs : x.startsWith(t, s + 7, "SCALE_Y") ? a._$RP = N._$Ys : x.startsWith(t, s + 7, "X") ? a._$RP = N._$ws : x.startsWith(t, s + 7, "Y") && (a._$RP = N._$Ns)) : (a._$RP = N._$Fr, a._$4P = new String(t, s, _ - s)), e.motions.push(a);
										var h = 0;
										for (b._$D2.clear(), o = _ + 1; o < r && "\r" != (n = 255 & t[o]) && "\n" != n; ++o)
											if ("," != n && " " != n && "\t" != n) {
												u = x._$LS(t, r, o, i);
												if (i[0] > 0) {
													b._$D2.push(u), h++;
													var l = i[0];
													if (l < o) {
														console.log("_$n0 _$hi . @Live2DMotion loadMotion()\n");
														break
													}
													o = l
												}
											}
										a._$I0 = b._$D2._$BL(), h > e._$yT && (e._$yT = h)
									}
								}
							} else {
								for (var s = o, _ = -1; o < r && "\r" != (n = 255 & t[o]) && "\n" != n; ++o)
									if ("=" == n) {
										_ = o;
										break
									}
								var $ = !1;
								if (_ >= 0)
									for (_ == s + 4 && "f" == t[s + 1] && "p" == t[s + 2] && "s" == t[s + 3] && ($ = !0), o = _ + 1; o < r && "\r" != (n = 255 & t[o]) && "\n" != n; ++o)
										if ("," != n && " " != n && "\t" != n) {
											var u = x._$LS(t, r, o, i);
											i[0] > 0 && $ && 5 < u && u < 121 && (e._$D0 = u), o = i[0]
										}
								for (; o < r && "\n" != t[o] && "\r" != t[o]; ++o);
							}
					else
						for (; o < r && "\n" != t[o] && "\r" != t[o]; ++o);
				}
				return e._$AS = 1e3 * e._$yT / e._$D0 | 0, e
			}, b.prototype.getDurationMSec = function() {
				return this._$AS
			}, b.prototype.dump = function() {
				for (var t = 0; t < this.motions.length; t++) {
					var e = this.motions[t];
					console.log("_$wL[%s] [%d]. ", e._$4P, e._$I0.length);
					for (var i = 0; i < e._$I0.length && i < 10; i++) console.log("%5.2f ,", e._$I0[i]);
					console.log("\n")
				}
			}, b.prototype.updateParamExe = function(t, e, i, r) {
				for (var o = (e - r._$z2) * this._$D0 / 1e3, n = 0 | o, s = o - n, _ = 0; _ < this.motions.length; _++) {
					var a = this.motions[_],
						h = a._$I0.length,
						l = a._$4P;
					if (a._$RP == N._$hs) {
						var $ = a._$I0[n >= h ? h - 1 : n];
						t.setParamFloat(l, $)
					} else if (N._$ws <= a._$RP && a._$RP <= N._$Ys);
					else {
						var u = t.getParamFloat(l),
							p = a._$I0[n >= h ? h - 1 : n],
							f = u + (p + (a._$I0[n + 1 >= h ? h - 1 : n + 1] - p) * s - u) * i;
						t.setParamFloat(l, f)
					}
				}
				n >= this._$yT && (this._$E ? (r._$z2 = e, this.loopFadeIn && (r._$bs = e)) : r._$9L = !0)
			}, b.prototype._$r0 = function() {
				return this._$E
			}, b.prototype._$aL = function(t) {
				this._$E = t
			}, b.prototype.isLoopFadeIn = function() {
				return this.loopFadeIn
			}, b.prototype.setLoopFadeIn = function(t) {
				this.loopFadeIn = t
			}, C.prototype.clear = function() {
				this.size = 0
			}, C.prototype.add = function(t) {
				if (this._$P.length <= this.size) {
					var e = new Float32Array(2 * this.size);
					A._$jT(this._$P, 0, e, 0, this.size), this._$P = e
				}
				this._$P[this.size++] = t
			}, C.prototype._$BL = function() {
				var t = new Float32Array(this.size);
				return A._$jT(this._$P, 0, t, 0, this.size), t
			}, N._$Fr = 0, N._$hs = 1, N._$ws = 100, N._$Ns = 101, N._$xs = 102, N._$us = 103, N._$qs = 104, N._$Ys = 105, B._$Ms = 1, B._$Qs = 2, B._$i2 = 0, B._$No = 2, B._$do = B._$Ms, B._$Ls = !0, B._$1r = 5, B._$Qb = 65, B._$J = 1e-4, B._$FT = .001, B._$Ss = 3, U._$o7 = 6, U._$S7 = 7, U._$s7 = 8, U._$77 = 9, U.LIVE2D_FORMAT_VERSION_V2_10_SDK2 = 10, U.LIVE2D_FORMAT_VERSION_V2_11_SDK2_1 = 11, U._$T7 = U.LIVE2D_FORMAT_VERSION_V2_11_SDK2_1, U._$Is = -2004318072, U._$h0 = 0, U._$4L = 23, U._$7P = 33, U._$uT = function(t) {
				console.log("_$bo :: _$6 _$mo _$E0 : %d\n", t)
			}, U._$9o = function(t) {
				if (t < 40) return U._$uT(t), null;
				if (t < 50) return U._$uT(t), null;
				if (t < 60) return U._$uT(t), null;
				if (t < 100) switch (t) {
						case 65:
							return new Q;
						case 66:
							return new O;
						case 67:
							return new w;
						case 68:
							return new X;
						case 69:
							return new T;
						case 70:
							return new ht;
						default:
							return U._$uT(t), null
					} else if (t < 150) switch (t) {
						case 131:
							return new ot;
						case 133:
							return new K;
						case 136:
							return new u;
						case 137:
							return new it;
						case 142:
							return new W
					}
					return U._$uT(t), null
			}, G._$HP = 0, G._$_0 = !0, G._$V2 = -1, G._$W0 = -1, G._$jr = !1, G._$ZS = !0, G._$tr = -1e6, G._$lr = 1e6, G._$is = 32, G._$e = !1, G.prototype.getDrawDataIndex = function(t) {
				for (var e = this._$aS.length - 1; e >= 0; --e)
					if (null != this._$aS[e] && this._$aS[e].getDrawDataID() == t) return e;
				return -1
			}, G.prototype.getDrawData = function(t) {
				if (t instanceof R) {
					if (null == this._$Bo) {
						this._$Bo = new Object;
						for (var e = this._$aS.length, i = 0; i < e; i++) {
							var r = this._$aS[i],
								o = r.getDrawDataID();
							null != o && (this._$Bo[o] = r)
						}
					}
					return this._$Bo[id]
				}
				return t < this._$aS.length ? this._$aS[t] : null
			}, G.prototype.release = function() {
				this._$3S.clear(), this._$aS.clear(), this._$F2.clear(), null != this._$Bo && this._$Bo.clear(), this._$db.clear(), this._$8b.clear(), this._$Hr.clear()
			}, G.prototype.init = function() {
				this._$co++, this._$F2.length > 0 && this.release();
				for (var t = this._$Ri.getModelImpl(), e = t._$Xr(), r = e.length, o = new Array, n = new Array, s = 0; s < r; ++s) {
					var _ = e[s];
					this._$F2.push(_), this._$Hr.push(_.init(this));
					for (var a = _.getBaseData(), h = a.length, l = 0; l < h; ++l) o.push(a[l]);
					for (l = 0; l < h; ++l) {
						var $ = a[l].init(this);
						$._$l2(s), n.push($)
					}
					for (var u = _.getDrawData(), p = u.length, l = 0; l < p; ++l) {
						var f = u[l],
							c = f.init(this);
						c._$IP = s, this._$aS.push(f), this._$8b.push(c)
					}
				}
				for (var d = o.length, g = dt._$2o();;) {
					for (var y = !1, s = 0; s < d; ++s) {
						var m = o[s];
						if (null != m) {
							var T = m.getTargetBaseDataID();
							(null == T || T == g || this.getBaseDataIndex(T) >= 0) && (this._$3S.push(m), this._$db.push(n[s]), o[s] = null, y = !0)
						}
					}
					if (!y) break
				}
				var P = t._$E2();
				if (null != P) {
					var S = P._$1s();
					if (null != S)
						for (var v = S.length, s = 0; s < v; ++s) {
							var L = S[s];
							null != L && this._$02(L.getParamID(), L.getDefaultValue(), L.getMinValue(), L.getMaxValue())
						}
				}
				this.clipManager = new i(this.dp_webgl), this.clipManager.init(this, this._$aS, this._$8b), this._$QT = !0
			}, G.prototype.update = function() {
				G._$e && _.start("_$zL");
				for (var t = this._$_2.length, e = 0; e < t; e++) this._$_2[e] != this._$vr[e] && (this._$Js[e] = G._$ZS, this._$vr[e] = this._$_2[e]);
				var i = this._$3S.length,
					r = this._$aS.length,
					o = H._$or(),
					n = H._$Pr() - o + 1;
				(null == this._$Ws || this._$Ws.length < n) && (this._$Ws = new Int16Array(n), this._$Vs = new Int16Array(n));
				for (e = 0; e < n; e++) this._$Ws[e] = G._$V2, this._$Vs[e] = G._$V2;
				(null == this._$Er || this._$Er.length < r) && (this._$Er = new Int16Array(r));
				for (e = 0; e < r; e++) this._$Er[e] = G._$W0;
				G._$e && _.dump("_$zL"), G._$e && _.start("_$UL");
				for (var s = null, a = 0; a < i; ++a) {
					var h = this._$3S[a],
						l = this._$db[a];
					try {
						h._$Nr(this, l), h._$2b(this, l)
					} catch (t) {
						null == s && (s = t)
					}
				}
				null != s && G._$_0 && _._$Rb(s), G._$e && _.dump("_$UL"), G._$e && _.start("_$DL");
				for (var $ = null, u = 0; u < r; ++u) {
					var p = this._$aS[u],
						f = this._$8b[u];
					try {
						if (p._$Nr(this, f), f._$u2()) continue;
						p._$2b(this, f);
						var c, d = Math.floor(p._$zS(this, f) - o);
						try {
							c = this._$Vs[d]
						} catch (t) {
							console.log("_$li :: %s / %s \t\t\t\t@@_$fS\n", t.toString(), p.getDrawDataID().toString()), d = Math.floor(p._$zS(this, f) - o);
							continue
						}
						c == G._$V2 ? this._$Ws[d] = u : this._$Er[c] = u, this._$Vs[d] = u
					} catch (t) {
						null == $ && ($ = t, st._$sT(st._$H7))
					}
				}
				null != $ && G._$_0 && _._$Rb($), G._$e && _.dump("_$DL"), G._$e && _.start("_$eL");
				for (e = this._$Js.length - 1; e >= 0; e--) this._$Js[e] = G._$jr;
				return this._$QT = !1, G._$e && _.dump("_$eL"), !1
			}, G.prototype.preDraw = function(t) {
				null != this.clipManager && (t._$ZT(), this.clipManager.setupClip(this, t))
			}, G.prototype.draw = function(t) {
				if (null != this._$Ws) {
					var e = this._$Ws.length;
					t._$ZT();
					for (var i = 0; i < e; ++i) {
						var r = this._$Ws[i];
						if (r != G._$V2)
							for (;;) {
								var o = this._$aS[r],
									n = this._$8b[r];
								if (n._$yo()) {
									var s = n._$IP,
										a = this._$Hr[s];
									n._$VS = a.getPartsOpacity(), o.draw(t, this, n)
								}
								var h = this._$Er[r];
								if (h <= r || h == G._$W0) break;
								r = h
							}
					}
				} else _._$li("call _$Ri.update() before _$Ri.draw() ")
			}, G.prototype.getParamIndex = function(t) {
				for (var e = this._$pb.length - 1; e >= 0; --e)
					if (this._$pb[e] == t) return e;
				return this._$02(t, 0, G._$tr, G._$lr)
			}, G.prototype._$BS = function(t) {
				return this.getBaseDataIndex(t)
			}, G.prototype.getBaseDataIndex = function(t) {
				for (var e = this._$3S.length - 1; e >= 0; --e)
					if (null != this._$3S[e] && this._$3S[e].getBaseDataID() == t) return e;
				return -1
			}, G.prototype._$UT = function(t, e) {
				var i = new Float32Array(e);
				return A._$jT(t, 0, i, 0, t.length), i
			}, G.prototype._$02 = function(t, e, i, r) {
				if (this._$qo >= this._$pb.length) {
					var o = this._$pb.length,
						n = new Array(2 * o);
					A._$jT(this._$pb, 0, n, 0, o), this._$pb = n, this._$_2 = this._$UT(this._$_2, 2 * o), this._$vr = this._$UT(this._$vr, 2 * o), this._$Rr = this._$UT(this._$Rr, 2 * o), this._$Or = this._$UT(this._$Or, 2 * o);
					var s = new Array;
					A._$jT(this._$Js, 0, s, 0, o), this._$Js = s
				}
				return this._$pb[this._$qo] = t, this._$_2[this._$qo] = e, this._$vr[this._$qo] = e, this._$Rr[this._$qo] = i, this._$Or[this._$qo] = r, this._$Js[this._$qo] = G._$ZS, this._$qo++
			}, G.prototype._$Zo = function(t, e) {
				this._$3S[t] = e
			}, G.prototype.setParamFloat = function(t, e) {
				e < this._$Rr[t] && (e = this._$Rr[t]), e > this._$Or[t] && (e = this._$Or[t]), this._$_2[t] = e
			}, G.prototype.loadParam = function() {
				var t = this._$_2.length;
				t > this._$fs.length && (t = this._$fs.length), A._$jT(this._$fs, 0, this._$_2, 0, t)
			}, G.prototype.saveParam = function() {
				var t = this._$_2.length;
				t > this._$fs.length && (this._$fs = new Float32Array(t)), A._$jT(this._$_2, 0, this._$fs, 0, t)
			}, G.prototype._$v2 = function() {
				return this._$co
			}, G.prototype._$WS = function() {
				return this._$QT
			}, G.prototype._$Xb = function(t) {
				return this._$Js[t] == G._$ZS
			}, G.prototype._$vs = function() {
				return this._$Es
			}, G.prototype._$Tr = function() {
				return this._$ZP
			}, G.prototype.getBaseData = function(t) {
				return this._$3S[t]
			}, G.prototype.getParamFloat = function(t) {
				return this._$_2[t]
			}, G.prototype.getParamMax = function(t) {
				return this._$Or[t]
			}, G.prototype.getParamMin = function(t) {
				return this._$Rr[t]
			}, G.prototype.setPartsOpacity = function(t, e) {
				this._$Hr[t].setPartsOpacity(e)
			}, G.prototype.getPartsOpacity = function(t) {
				return this._$Hr[t].getPartsOpacity()
			}, G.prototype.getPartsDataIndex = function(t) {
				for (var e = this._$F2.length - 1; e >= 0; --e)
					if (null != this._$F2[e] && this._$F2[e]._$p2() == t) return e;
				return -1
			}, G.prototype._$q2 = function(t) {
				return this._$db[t]
			}, G.prototype._$C2 = function(t) {
				return this._$8b[t]
			}, G.prototype._$Bb = function(t) {
				return this._$Hr[t]
			}, G.prototype._$5s = function(t, e) {
				for (var i = this._$Ws.length, r = t, o = 0; o < i; ++o) {
					var n = this._$Ws[o];
					if (n != G._$V2)
						for (;;) {
							var s = this._$8b[n];
							s._$yo() && (s._$GT()._$B2(this, s, r), r += e);
							var _ = this._$Er[n];
							if (_ <= n || _ == G._$W0) break;
							n = _
						}
				}
			}, G.prototype.setDrawParam = function(t) {
				this.dp_webgl = t
			}, G.prototype.getDrawParam = function() {
				return this.dp_webgl
			}, Y._$0T = function(t) {
				return Y._$0T(new _$5(t))
			}, Y._$0T = function(t) {
				if (!t.exists()) throw new _$ls(t._$3b());
				for (var e, i = t.length(), r = new Int8Array(i), o = new _$Xs(new _$kb(t), 8192), n = 0;
					(e = o.read(r, n, i - n)) > 0;) n += e;
				return r
			}, Y._$C = function(t) {
				var e = null,
					i = null;
				try {
					e = t instanceof Array ? t : new _$Xs(t, 8192), i = new _$js;
					for (var r, o = new Int8Array(1e3);
						(r = e.read(o)) > 0;) i.write(o, 0, r);
					return i._$TS()
				} finally {
					null != t && t.close(), null != i && (i.flush(), i.close())
				}
			}, k.prototype._$T2 = function() {
				return A.getUserTimeMSec() + Math._$10() * (2 * this._$Br - 1)
			}, k.prototype._$uo = function(t) {
				this._$Br = t
			}, k.prototype._$QS = function(t, e, i) {
				this._$Dr = t, this._$Cb = e, this._$mr = i
			}, k.prototype._$7T = function(t) {
				var e, i = A.getUserTimeMSec(),
					r = 0;
				switch (this._$_L) {
					case STATE_CLOSING:
						(r = (i - this._$bb) / this._$Dr) >= 1 && (r = 1, this._$_L = Et.STATE_CLOSED, this._$bb = i), e = 1 - r;
						break;
					case STATE_CLOSED:
						(r = (i - this._$bb) / this._$Cb) >= 1 && (this._$_L = Et.STATE_OPENING, this._$bb = i), e = 0;
						break;
					case STATE_OPENING:
						(r = (i - this._$bb) / this._$mr) >= 1 && (r = 1, this._$_L = Et.STATE_INTERVAL, this._$12 = this._$T2()), e = r;
						break;
					case STATE_INTERVAL:
						this._$12 < i && (this._$_L = Et.STATE_CLOSING, this._$bb = i), e = 1;
						break;
					case STATE_FIRST:
					default:
						this._$_L = Et.STATE_INTERVAL, this._$12 = this._$T2(), e = 1
				}
				this._$jo || (e = -e), t.setParamFloat(this._$iL, e), t.setParamFloat(this._$0L, e)
			};
			var Et = function() {};
			Et.STATE_FIRST = "STATE_FIRST", Et.STATE_INTERVAL = "STATE_INTERVAL", Et.STATE_CLOSING = "STATE_CLOSING", Et.STATE_CLOSED = "STATE_CLOSED", Et.STATE_OPENING = "STATE_OPENING", V.prototype = new E, V._$As = 32, V._$Gr = !1, V._$NT = null, V._$vS = null, V._$no = null, V._$9r = function(t) {
					return new Float32Array(t)
				}, V._$vb = function(t) {
					return new Int16Array(t)
				}, V._$cr = function(t, e) {
					return null == t || t._$yL() < e.length ? ((t = V._$9r(2 * e.length)).put(e), t._$oT(0)) : (t.clear(), t.put(e), t._$oT(0)), t
				}, V._$mb = function(t, e) {
					return null == t || t._$yL() < e.length ? ((t = V._$vb(2 * e.length)).put(e), t._$oT(0)) : (t.clear(), t.put(e), t._$oT(0)), t
				}, V._$Hs = function() {
					return V._$Gr
				}, V._$as = function(t) {
					V._$Gr = t
				}, V.prototype.setGL = function(t) {
					this.gl = t
				}, V.prototype.setTransform = function(t) {
					this.transform = t
				}, V.prototype._$ZT = function() {}, V.prototype._$Uo = function(t, e, i, r, o, n, s, _) {
					if (!(n < .01)) {
						var a = this._$U2[t],
							h = n > .9 ? st.EXPAND_W : 0;
						this.gl.drawElements(a, i, r, o, n, h, this.transform, _)
					}
				}, V.prototype._$Rs = function() {
					throw new Error("_$Rs")
				}, V.prototype._$Ds = function(t) {
					throw new Error("_$Ds")
				}, V.prototype._$K2 = function() {
					for (var t = 0; t < this._$sb.length; t++) 0 != this._$sb[t] && (this.gl._$Sr(1, this._$sb, t), this._$sb[t] = 0)
				}, V.prototype.setTexture = function(t, e) {
					this._$sb.length < t + 1 && this._$nS(t), this._$sb[t] = e
				}, V.prototype.setTexture = function(t, e) {
					this._$sb.length < t + 1 && this._$nS(t), this._$U2[t] = e
				}, V.prototype._$nS = function(t) {
					var e = Math.max(2 * this._$sb.length, t + 1 + 10),
						i = new Int32Array(e);
					A._$jT(this._$sb, 0, i, 0, this._$sb.length), this._$sb = i;
					var r = new Array;
					A._$jT(this._$U2, 0, r, 0, this._$U2.length), this._$U2 = r
				}, X.prototype = new I, X._$Xo = new Float32Array(2), X._$io = new Float32Array(2), X._$0o = new Float32Array(2), X._$Lo = new Float32Array(2), X._$To = new Float32Array(2), X._$Po = new Float32Array(2), X._$gT = new Array, X.prototype._$zP = function() {
					this._$GS = new O, this._$GS._$zP(), this._$Y0 = new Array
				}, X.prototype.getType = function() {
					return I._$c2
				}, X.prototype._$F0 = function(t) {
					I.prototype._$F0.call(this, t), this._$GS = t._$nP(), this._$Y0 = t._$nP(), I.prototype.readV2_opacity.call(this, t)
				}, X.prototype.init = function(t) {
					var e = new z(this);
					return e._$Yr = new T, this._$32() && (e._$Wr = new T), e
				}, X.prototype._$Nr = function(t, e) {
					this != e._$GT() && console.log("### assert!! ### ");
					var i = e;
					if (this._$GS._$Ur(t)) {
						var r = X._$gT;
						r[0] = !1;
						var o = this._$GS._$Q2(t, r);
						e._$Ib(r[0]), this.interpolateOpacity(t, this._$GS, e, r);
						var n = t._$vs(),
							s = t._$Tr();
						if (this._$GS._$zr(n, s, o), o <= 0) {
							_ = this._$Y0[n[0]];
							i._$Yr.init(_)
						} else if (1 == o) {
							var _ = this._$Y0[n[0]],
								a = this._$Y0[n[1]],
								h = s[0];
							i._$Yr._$fL = _._$fL + (a._$fL - _._$fL) * h, i._$Yr._$gL = _._$gL + (a._$gL - _._$gL) * h, i._$Yr._$B0 = _._$B0 + (a._$B0 - _._$B0) * h, i._$Yr._$z0 = _._$z0 + (a._$z0 - _._$z0) * h, i._$Yr._$qT = _._$qT + (a._$qT - _._$qT) * h
						} else if (2 == o) {
							var _ = this._$Y0[n[0]],
								a = this._$Y0[n[1]],
								l = this._$Y0[n[2]],
								$ = this._$Y0[n[3]],
								h = s[0],
								u = s[1],
								p = _._$fL + (a._$fL - _._$fL) * h,
								f = l._$fL + ($._$fL - l._$fL) * h;
							i._$Yr._$fL = p + (f - p) * u, p = _._$gL + (a._$gL - _._$gL) * h, f = l._$gL + ($._$gL - l._$gL) * h, i._$Yr._$gL = p + (f - p) * u, p = _._$B0 + (a._$B0 - _._$B0) * h, f = l._$B0 + ($._$B0 - l._$B0) * h, i._$Yr._$B0 = p + (f - p) * u, p = _._$z0 + (a._$z0 - _._$z0) * h, f = l._$z0 + ($._$z0 - l._$z0) * h, i._$Yr._$z0 = p + (f - p) * u, p = _._$qT + (a._$qT - _._$qT) * h, f = l._$qT + ($._$qT - l._$qT) * h, i._$Yr._$qT = p + (f - p) * u
						} else if (3 == o) {
							var c = this._$Y0[n[0]],
								d = this._$Y0[n[1]],
								g = this._$Y0[n[2]],
								y = this._$Y0[n[3]],
								m = this._$Y0[n[4]],
								T = this._$Y0[n[5]],
								P = this._$Y0[n[6]],
								S = this._$Y0[n[7]],
								h = s[0],
								u = s[1],
								v = s[2],
								p = c._$fL + (d._$fL - c._$fL) * h,
								f = g._$fL + (y._$fL - g._$fL) * h,
								L = m._$fL + (T._$fL - m._$fL) * h,
								E = P._$fL + (S._$fL - P._$fL) * h;
							i._$Yr._$fL = (1 - v) * (p + (f - p) * u) + v * (L + (E - L) * u), p = c._$gL + (d._$gL - c._$gL) * h, f = g._$gL + (y._$gL - g._$gL) * h, L = m._$gL + (T._$gL - m._$gL) * h, E = P._$gL + (S._$gL - P._$gL) * h, i._$Yr._$gL = (1 - v) * (p + (f - p) * u) + v * (L + (E - L) * u), p = c._$B0 + (d._$B0 - c._$B0) * h, f = g._$B0 + (y._$B0 - g._$B0) * h, L = m._$B0 + (T._$B0 - m._$B0) * h, E = P._$B0 + (S._$B0 - P._$B0) * h, i._$Yr._$B0 = (1 - v) * (p + (f - p) * u) + v * (L + (E - L) * u), p = c._$z0 + (d._$z0 - c._$z0) * h, f = g._$z0 + (y._$z0 - g._$z0) * h, L = m._$z0 + (T._$z0 - m._$z0) * h, E = P._$z0 + (S._$z0 - P._$z0) * h, i._$Yr._$z0 = (1 - v) * (p + (f - p) * u) + v * (L + (E - L) * u), p = c._$qT + (d._$qT - c._$qT) * h, f = g._$qT + (y._$qT - g._$qT) * h, L = m._$qT + (T._$qT - m._$qT) * h, E = P._$qT + (S._$qT - P._$qT) * h, i._$Yr._$qT = (1 - v) * (p + (f - p) * u) + v * (L + (E - L) * u)
						} else if (4 == o) {
							var M = this._$Y0[n[0]],
								I = this._$Y0[n[1]],
								A = this._$Y0[n[2]],
								w = this._$Y0[n[3]],
								x = this._$Y0[n[4]],
								O = this._$Y0[n[5]],
								D = this._$Y0[n[6]],
								R = this._$Y0[n[7]],
								F = this._$Y0[n[8]],
								b = this._$Y0[n[9]],
								C = this._$Y0[n[10]],
								N = this._$Y0[n[11]],
								B = this._$Y0[n[12]],
								U = this._$Y0[n[13]],
								G = this._$Y0[n[14]],
								Y = this._$Y0[n[15]],
								h = s[0],
								u = s[1],
								v = s[2],
								k = s[3],
								p = M._$fL + (I._$fL - M._$fL) * h,
								f = A._$fL + (w._$fL - A._$fL) * h,
								L = x._$fL + (O._$fL - x._$fL) * h,
								E = D._$fL + (R._$fL - D._$fL) * h,
								V = F._$fL + (b._$fL - F._$fL) * h,
								z = C._$fL + (N._$fL - C._$fL) * h,
								H = B._$fL + (U._$fL - B._$fL) * h,
								W = G._$fL + (Y._$fL - G._$fL) * h;
							i._$Yr._$fL = (1 - k) * ((1 - v) * (p + (f - p) * u) + v * (L + (E - L) * u)) + k * ((1 - v) * (V + (z - V) * u) + v * (H + (W - H) * u)), p = M._$gL + (I._$gL - M._$gL) * h, f = A._$gL + (w._$gL - A._$gL) * h, L = x._$gL + (O._$gL - x._$gL) * h, E = D._$gL + (R._$gL - D._$gL) * h, V = F._$gL + (b._$gL - F._$gL) * h, z = C._$gL + (N._$gL - C._$gL) * h, H = B._$gL + (U._$gL - B._$gL) * h, W = G._$gL + (Y._$gL - G._$gL) * h, i._$Yr._$gL = (1 - k) * ((1 - v) * (p + (f - p) * u) + v * (L + (E - L) * u)) + k * ((1 - v) * (V + (z - V) * u) + v * (H + (W - H) * u)), p = M._$B0 + (I._$B0 - M._$B0) * h, f = A._$B0 + (w._$B0 - A._$B0) * h, L = x._$B0 + (O._$B0 - x._$B0) * h, E = D._$B0 + (R._$B0 - D._$B0) * h, V = F._$B0 + (b._$B0 - F._$B0) * h, z = C._$B0 + (N._$B0 - C._$B0) * h, H = B._$B0 + (U._$B0 - B._$B0) * h, W = G._$B0 + (Y._$B0 - G._$B0) * h, i._$Yr._$B0 = (1 - k) * ((1 - v) * (p + (f - p) * u) + v * (L + (E - L) * u)) + k * ((1 - v) * (V + (z - V) * u) + v * (H + (W - H) * u)), p = M._$z0 + (I._$z0 - M._$z0) * h, f = A._$z0 + (w._$z0 - A._$z0) * h, L = x._$z0 + (O._$z0 - x._$z0) * h, E = D._$z0 + (R._$z0 - D._$z0) * h, V = F._$z0 + (b._$z0 - F._$z0) * h, z = C._$z0 + (N._$z0 - C._$z0) * h, H = B._$z0 + (U._$z0 - B._$z0) * h, W = G._$z0 + (Y._$z0 - G._$z0) * h, i._$Yr._$z0 = (1 - k) * ((1 - v) * (p + (f - p) * u) + v * (L + (E - L) * u)) + k * ((1 - v) * (V + (z - V) * u) + v * (H + (W - H) * u)), p = M._$qT + (I._$qT - M._$qT) * h, f = A._$qT + (w._$qT - A._$qT) * h, L = x._$qT + (O._$qT - x._$qT) * h, E = D._$qT + (R._$qT - D._$qT) * h, V = F._$qT + (b._$qT - F._$qT) * h, z = C._$qT + (N._$qT - C._$qT) * h, H = B._$qT + (U._$qT - B._$qT) * h, W = G._$qT + (Y._$qT - G._$qT) * h, i._$Yr._$qT = (1 - k) * ((1 - v) * (p + (f - p) * u) + v * (L + (E - L) * u)) + k * ((1 - v) * (V + (z - V) * u) + v * (H + (W - H) * u))
						} else {
							for (var j = 0 | Math.pow(2, o), q = new Float32Array(j), J = 0; J < j; J++) {
								for (var Q = J, Z = 1, K = 0; K < o; K++) Z *= Q % 2 == 0 ? 1 - s[K] : s[K], Q /= 2;
								q[J] = Z
							}
							for (var tt = new Array, et = 0; et < j; et++) tt[et] = this._$Y0[n[et]];
							for (var it = 0, rt = 0, ot = 0, nt = 0, st = 0, et = 0; et < j; et++) it += q[et] * tt[et]._$fL, rt += q[et] * tt[et]._$gL, ot += q[et] * tt[et]._$B0, nt += q[et] * tt[et]._$z0, st += q[et] * tt[et]._$qT;
							i._$Yr._$fL = it, i._$Yr._$gL = rt, i._$Yr._$B0 = ot, i._$Yr._$z0 = nt, i._$Yr._$qT = st
						}
						_ = this._$Y0[n[0]];
						i._$Yr.reflectX = _.reflectX, i._$Yr.reflectY = _.reflectY
					}
				}, X.prototype._$2b = function(t, e) {
					this != e._$GT() && console.log("### assert!! ### ");
					var i = e;
					if (i._$hS(!0), this._$32()) {
						var r = this.getTargetBaseDataID();
						if (i._$8r == I._$ur && (i._$8r = t.getBaseDataIndex(r)), i._$8r < 0) st._$so && _._$li("_$L _$0P _$G :: %s", r), i._$hS(!1);
						else {
							var o = t.getBaseData(i._$8r);
							if (null != o) {
								var n = t._$q2(i._$8r),
									s = X._$Xo;
								s[0] = i._$Yr._$fL, s[1] = i._$Yr._$gL;
								var a = X._$io;
								a[0] = 0, a[1] = -.1, n._$GT().getType() == I._$c2 ? a[1] = -10 : a[1] = -.1;
								var h = X._$0o;
								this._$Jr(t, o, n, s, a, h);
								var l = Pt._$92(a, h);
								o._$nb(t, n, s, s, 1, 0, 2), i._$Wr._$fL = s[0], i._$Wr._$gL = s[1], i._$Wr._$B0 = i._$Yr._$B0, i._$Wr._$z0 = i._$Yr._$z0, i._$Wr._$qT = i._$Yr._$qT - l * Pt._$NS;
								var $ = n.getTotalScale();
								i.setTotalScale_notForClient($ * i._$Wr._$B0);
								var u = n.getTotalOpacity();
								i.setTotalOpacity(u * i.getInterpolatedOpacity()), i._$Wr.reflectX = i._$Yr.reflectX, i._$Wr.reflectY = i._$Yr.reflectY, i._$hS(n._$yo())
							} else i._$hS(!1)
						}
					} else i.setTotalScale_notForClient(i._$Yr._$B0), i.setTotalOpacity(i.getInterpolatedOpacity())
				}, X.prototype._$nb = function(t, e, i, r, o, n, s) {
					this != e._$GT() && console.log("### assert!! ### ");
					for (var _, a, h = e, l = null != h._$Wr ? h._$Wr : h._$Yr, $ = Math.sin(Pt._$bS * l._$qT), u = Math.cos(Pt._$bS * l._$qT), p = h.getTotalScale(), f = l.reflectX ? -1 : 1, c = l.reflectY ? -1 : 1, d = u * p * f, g = -$ * p * c, y = $ * p * f, m = u * p * c, T = l._$fL, P = l._$gL, S = o * s, v = n; v < S; v += s) _ = i[v], a = i[v + 1], r[v] = d * _ + g * a + T, r[v + 1] = y * _ + m * a + P
				}, X.prototype._$Jr = function(t, e, i, r, o, n) {
					e != i._$GT() && console.log("### assert!! ### ");
					var s = X._$Lo;
					X._$Lo[0] = r[0], X._$Lo[1] = r[1], e._$nb(t, i, s, s, 1, 0, 2);
					for (var _ = X._$To, a = X._$Po, h = 1, l = 0; l < 10; l++) {
						if (a[0] = r[0] + h * o[0], a[1] = r[1] + h * o[1], e._$nb(t, i, a, _, 1, 0, 2), _[0] -= s[0], _[1] -= s[1], 0 != _[0] || 0 != _[1]) return n[0] = _[0], void(n[1] = _[1]);
						if (a[0] = r[0] - h * o[0], a[1] = r[1] - h * o[1], e._$nb(t, i, a, _, 1, 0, 2), _[0] -= s[0], _[1] -= s[1], 0 != _[0] || 0 != _[1]) return _[0] = -_[0], _[0] = -_[0], n[0] = _[0], void(n[1] = _[1]);
						h *= .1
					}
					st._$so && console.log("_$L0 to transform _$SP\n")
				}, z.prototype = new nt, H.prototype = new L, H._$ur = -2, H._$ES = 500, H._$wb = 2, H._$8S = 3, H._$os = 4, H._$52 = H._$ES, H._$R2 = H._$ES, H._$Sb = function(t) {
					for (var e = t.length - 1; e >= 0; --e) {
						var i = t[e];
						i < H._$52 ? H._$52 = i : i > H._$R2 && (H._$R2 = i)
					}
				}, H._$or = function() {
					return H._$52
				}, H._$Pr = function() {
					return H._$R2
				}, H.prototype._$F0 = function(t) {
					this._$gP = t._$nP(), this._$dr = t._$nP(), this._$GS = t._$nP(), this._$qb = t._$6L(), this._$Lb = t._$cS(), this._$mS = t._$Tb(), t.getFormatVersion() >= U._$T7 ? (this.clipID = t._$nP(), this.clipIDList = this.convertClipIDForV2_11(this.clipID)) : this.clipIDList = null, H._$Sb(this._$Lb)
				}, H.prototype.getClipIDList = function() {
					return this.clipIDList
				}, H.prototype._$Nr = function(t, e) {
					if (e._$IS[0] = !1, e._$Us = S._$Z2(t, this._$GS, e._$IS, this._$Lb), st._$Zs);
					else if (e._$IS[0]) return;
					e._$7s = S._$br(t, this._$GS, e._$IS, this._$mS)
				}, H.prototype._$2b = function(t) {}, H.prototype.getDrawDataID = function() {
					return this._$gP
				}, H.prototype._$j2 = function(t) {
					this._$gP = t
				}, H.prototype.getOpacity = function(t, e) {
					return e._$7s
				}, H.prototype._$zS = function(t, e) {
					return e._$Us
				}, H.prototype.getTargetBaseDataID = function() {
					return this._$dr
				}, H.prototype._$gs = function(t) {
					this._$dr = t
				}, H.prototype._$32 = function() {
					return null != this._$dr && this._$dr != dt._$2o()
				}, H.prototype.getType = function() {}, W._$42 = 0, W.prototype._$1b = function() {
					return this._$3S
				}, W.prototype.getDrawDataList = function() {
					return this._$aS
				}, W.prototype._$F0 = function(t) {
					this._$NL = t._$nP(), this._$aS = t._$nP(), this._$3S = t._$nP()
				}, W.prototype._$kr = function(t) {
					t._$Zo(this._$3S), t._$xo(this._$aS), this._$3S = null, this._$aS = null
				}, j.prototype = new e, j.loadModel = function(t) {
					var i = new j;
					return e._$62(i, t), i
				}, j.loadModel = function(t) {
					var i = new j;
					return e._$62(i, t), i
				}, j._$to = function() {
					return new j
				}, j._$er = function(t) {
					var e = new _$5("../_$_r/_$t0/_$Ri/_$_P._$d");
					if (0 == e.exists()) throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + e._$PL());
					for (var i = ["../_$_r/_$t0/_$Ri/_$_P.512/_$CP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$vP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$EP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$pP._$1"], r = j.loadModel(e._$3b()), o = 0; o < i.length; o++) {
						var n = new _$5(i[o]);
						if (0 == n.exists()) throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + n._$PL());
						r.setTexture(o, _$nL._$_o(t, n._$3b()))
					}
					return r
				}, j.prototype.setGL = function(t) {
					this._$zo.setGL(t)
				}, j.prototype.setTransform = function(t) {
					this._$zo.setTransform(t)
				}, j.prototype.draw = function() {
					this._$5S.draw(this._$zo)
				}, j.prototype._$K2 = function() {
					this._$zo._$K2()
				}, j.prototype.setTexture = function(t, e) {
					null == this._$zo && _._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"), this._$zo.setTexture(t, e)
				}, j.prototype.setTexture = function(t, e) {
					null == this._$zo && _._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"), this._$zo.setTexture(t, e)
				}, j.prototype._$Rs = function() {
					return this._$zo._$Rs()
				}, j.prototype._$Ds = function(t) {
					this._$zo._$Ds(t)
				}, j.prototype.getDrawParam = function() {
					return this._$zo
				}, q.prototype = new s, q._$cs = "VISIBLE:", q._$ar = "LAYOUT:", q.MTN_PREFIX_FADEIN = "FADEIN:", q.MTN_PREFIX_FADEOUT = "FADEOUT:", q._$Co = 0, q._$1T = 1, q.loadMotion = function(t) {
					var e = Y._$C(t);
					return q.loadMotion(e)
				}, q.loadMotion = function(t) {
					t instanceof ArrayBuffer && (t = new DataView(t));
					var e = new q,
						i = [0],
						r = t.byteLength;
					e._$yT = 0;
					for (var o = 0; o < r; ++o) {
						var n = J(t, o),
							s = n.charCodeAt(0);
						if ("\n" != n && "\r" != n)
							if ("#" != n)
								if ("$" != n) {
									if (97 <= s && s <= 122 || 65 <= s && s <= 90 || "_" == n) {
										for (var _ = o, a = -1; o < r && "\r" != (n = J(t, o)) && "\n" != n; ++o)
											if ("=" == n) {
												a = o;
												break
											}
										if (a >= 0) {
											var h = new N;
											x.startsWith(t, _, q._$cs) ? (h._$RP = N._$hs, h._$4P = x.createString(t, _, a - _)) : x.startsWith(t, _, q._$ar) ? (h._$4P = x.createString(t, _ + 7, a - _ - 7), x.startsWith(t, _ + 7, "ANCHOR_X") ? h._$RP = N._$xs : x.startsWith(t, _ + 7, "ANCHOR_Y") ? h._$RP = N._$us : x.startsWith(t, _ + 7, "SCALE_X") ? h._$RP = N._$qs : x.startsWith(t, _ + 7, "SCALE_Y") ? h._$RP = N._$Ys : x.startsWith(t, _ + 7, "X") ? h._$RP = N._$ws : x.startsWith(t, _ + 7, "Y") && (h._$RP = N._$Ns)) : (h._$RP = N._$Fr, h._$4P = x.createString(t, _, a - _)), e.motions.push(h);
											var l = 0,
												$ = [];
											for (o = a + 1; o < r && "\r" != (n = J(t, o)) && "\n" != n; ++o)
												if ("," != n && " " != n && "\t" != n) {
													f = x._$LS(t, r, o, i);
													if (i[0] > 0) {
														$.push(f), l++;
														var u = i[0];
														if (u < o) {
															console.log("_$n0 _$hi . @Live2DMotion loadMotion()\n");
															break
														}
														o = u - 1
													}
												}
											h._$I0 = new Float32Array($), l > e._$yT && (e._$yT = l)
										}
									}
								} else {
									for (var _ = o, a = -1; o < r && "\r" != (n = J(t, o)) && "\n" != n; ++o)
										if ("=" == n) {
											a = o;
											break
										}
									var p = !1;
									if (a >= 0)
										for (a == _ + 4 && "f" == J(t, _ + 1) && "p" == J(t, _ + 2) && "s" == J(t, _ + 3) && (p = !0), o = a + 1; o < r && "\r" != (n = J(t, o)) && "\n" != n; ++o)
											if ("," != n && " " != n && "\t" != n) {
												var f = x._$LS(t, r, o, i);
												i[0] > 0 && p && 5 < f && f < 121 && (e._$D0 = f), o = i[0]
											}
									for (; o < r && "\n" != J(t, o) && "\r" != J(t, o); ++o);
								}
						else
							for (; o < r && "\n" != J(t, o) && "\r" != J(t, o); ++o);
					}
					return e._$rr = 1e3 * e._$yT / e._$D0 | 0, e
				}, q.prototype.getDurationMSec = function() {
					return this._$E ? -1 : this._$rr
				}, q.prototype.getLoopDurationMSec = function() {
					return this._$rr
				}, q.prototype.dump = function() {
					for (var t = 0; t < this.motions.length; t++) {
						var e = this.motions[t];
						console.log("_$wL[%s] [%d]. ", e._$4P, e._$I0.length);
						for (var i = 0; i < e._$I0.length && i < 10; i++) console.log("%5.2f ,", e._$I0[i]);
						console.log("\n")
					}
				}, q.prototype.updateParamExe = function(t, e, i, r) {
					for (var o = (e - r._$z2) * this._$D0 / 1e3, n = 0 | o, s = o - n, _ = 0; _ < this.motions.length; _++) {
						var a = this.motions[_],
							h = a._$I0.length,
							l = a._$4P;
						if (a._$RP == N._$hs) {
							var $ = a._$I0[n >= h ? h - 1 : n];
							t.setParamFloat(l, $)
						} else if (N._$ws <= a._$RP && a._$RP <= N._$Ys);
						else {
							var u, p = t.getParamIndex(l),
								f = t.getModelContext(),
								c = .4 * (f.getParamMax(p) - f.getParamMin(p)),
								d = f.getParamFloat(p),
								g = a._$I0[n >= h ? h - 1 : n],
								y = a._$I0[n + 1 >= h ? h - 1 : n + 1],
								m = d + ((u = g < y && y - g > c || g > y && g - y > c ? g : g + (y - g) * s) - d) * i;
							t.setParamFloat(l, m)
						}
					}
					n >= this._$yT && (this._$E ? (r._$z2 = e, this.loopFadeIn && (r._$bs = e)) : r._$9L = !0), this._$eP = i
				}, q.prototype._$r0 = function() {
					return this._$E
				}, q.prototype._$aL = function(t) {
					this._$E = t
				}, q.prototype._$S0 = function() {
					return this._$D0
				}, q.prototype._$U0 = function(t) {
					this._$D0 = t
				}, q.prototype.isLoopFadeIn = function() {
					return this.loopFadeIn
				}, q.prototype.setLoopFadeIn = function(t) {
					this.loopFadeIn = t
				}, C.prototype.clear = function() {
					this.size = 0
				}, C.prototype.add = function(t) {
					if (this._$P.length <= this.size) {
						var e = new Float32Array(2 * this.size);
						A._$jT(this._$P, 0, e, 0, this.size), this._$P = e
					}
					this._$P[this.size++] = t
				}, C.prototype._$BL = function() {
					var t = new Float32Array(this.size);
					return A._$jT(this._$P, 0, t, 0, this.size), t
				}, N._$Fr = 0, N._$hs = 1, N._$ws = 100, N._$Ns = 101, N._$xs = 102, N._$us = 103, N._$qs = 104, N._$Ys = 105, Q.prototype = new I, Q._$gT = new Array, Q.prototype._$zP = function() {
					this._$GS = new O, this._$GS._$zP()
				}, Q.prototype._$F0 = function(t) {
					I.prototype._$F0.call(this, t), this._$A = t._$6L(), this._$o = t._$6L(), this._$GS = t._$nP(), this._$Eo = t._$nP(), I.prototype.readV2_opacity.call(this, t)
				}, Q.prototype.init = function(t) {
					var e = new Z(this),
						i = (this._$o + 1) * (this._$A + 1);
					return null != e._$Cr && (e._$Cr = null), e._$Cr = new Float32Array(2 * i), null != e._$hr && (e._$hr = null), this._$32() ? e._$hr = new Float32Array(2 * i) : e._$hr = null, e
				}, Q.prototype._$Nr = function(t, e) {
					var i = e;
					if (this._$GS._$Ur(t)) {
						var r = this._$VT(),
							o = Q._$gT;
						o[0] = !1, S._$Vr(t, this._$GS, o, r, this._$Eo, i._$Cr, 0, 2), e._$Ib(o[0]), this.interpolateOpacity(t, this._$GS, e, o)
					}
				}, Q.prototype._$2b = function(t, e) {
					var i = e;
					if (i._$hS(!0), this._$32()) {
						var r = this.getTargetBaseDataID();
						if (i._$8r == I._$ur && (i._$8r = t.getBaseDataIndex(r)), i._$8r < 0) st._$so && _._$li("_$L _$0P _$G :: %s", r), i._$hS(!1);
						else {
							var o = t.getBaseData(i._$8r),
								n = t._$q2(i._$8r);
							if (null != o && n._$yo()) {
								var s = n.getTotalScale();
								i.setTotalScale_notForClient(s);
								var a = n.getTotalOpacity();
								i.setTotalOpacity(a * i.getInterpolatedOpacity()), o._$nb(t, n, i._$Cr, i._$hr, this._$VT(), 0, 2), i._$hS(!0)
							} else i._$hS(!1)
						}
					} else i.setTotalOpacity(i.getInterpolatedOpacity())
				}, Q.prototype._$nb = function(t, e, i, r, o, n, s) {
					var _ = e,
						a = null != _._$hr ? _._$hr : _._$Cr;
					Q.transformPoints_sdk2(i, r, o, n, s, a, this._$o, this._$A)
				}, Q.transformPoints_sdk2 = function(e, i, r, o, n, s, _, a) {
					for (var h, l, $, u = r * n, p = 0, f = 0, c = 0, d = 0, g = 0, y = 0, m = !1, T = o; T < u; T += n) {
						var P, S, v, L;
						if (v = e[T], L = e[T + 1], P = v * _, S = L * a, P < 0 || S < 0 || _ <= P || a <= S) {
							var E = _ + 1;
							if (!m) {
								m = !0, p = .25 * (s[2 * (0 + 0 * E)] + s[2 * (_ + 0 * E)] + s[2 * (0 + a * E)] + s[2 * (_ + a * E)]), f = .25 * (s[2 * (0 + 0 * E) + 1] + s[2 * (_ + 0 * E) + 1] + s[2 * (0 + a * E) + 1] + s[2 * (_ + a * E) + 1]);
								var M = s[2 * (_ + a * E)] - s[2 * (0 + 0 * E)],
									I = s[2 * (_ + a * E) + 1] - s[2 * (0 + 0 * E) + 1],
									A = s[2 * (_ + 0 * E)] - s[2 * (0 + a * E)],
									w = s[2 * (_ + 0 * E) + 1] - s[2 * (0 + a * E) + 1];
								p -= .5 * ((c = .5 * (M + A)) + (g = .5 * (M - A))), f -= .5 * ((d = .5 * (I + w)) + (y = .5 * (I - w)))
							}
							if (-2 < v && v < 3 && -2 < L && L < 3)
								if (v <= 0)
									if (L <= 0) {
										var x = s[2 * (0 + 0 * E)],
											O = s[2 * (0 + 0 * E) + 1],
											D = p - 2 * c,
											R = f - 2 * d,
											F = p - 2 * g,
											b = f - 2 * y,
											C = p - 2 * c - 2 * g,
											N = f - 2 * d - 2 * y;
										(B = .5 * (v - -2)) + (U = .5 * (L - -2)) <= 1 ? (i[T] = C + (F - C) * B + (D - C) * U, i[T + 1] = N + (b - N) * B + (R - N) * U) : (i[T] = x + (D - x) * (1 - B) + (F - x) * (1 - U), i[T + 1] = O + (R - O) * (1 - B) + (b - O) * (1 - U))
									} else if (L >= 1) {
								var F = s[2 * (0 + a * E)],
									b = s[2 * (0 + a * E) + 1],
									C = p - 2 * c + 1 * g,
									N = f - 2 * d + 1 * y,
									x = p + 3 * g,
									O = f + 3 * y,
									D = p - 2 * c + 3 * g,
									R = f - 2 * d + 3 * y;
								(B = .5 * (v - -2)) + (U = .5 * (L - 1)) <= 1 ? (i[T] = C + (F - C) * B + (D - C) * U, i[T + 1] = N + (b - N) * B + (R - N) * U) : (i[T] = x + (D - x) * (1 - B) + (F - x) * (1 - U), i[T + 1] = O + (R - O) * (1 - B) + (b - O) * (1 - U))
							} else {
								(k = 0 | S) == a && (k = a - 1);
								var B = .5 * (v - -2),
									U = S - k,
									G = k / a,
									Y = (k + 1) / a,
									F = s[2 * (0 + k * E)],
									b = s[2 * (0 + k * E) + 1],
									x = s[2 * (0 + (k + 1) * E)],
									O = s[2 * (0 + (k + 1) * E) + 1],
									C = p - 2 * c + G * g,
									N = f - 2 * d + G * y,
									D = p - 2 * c + Y * g,
									R = f - 2 * d + Y * y;
								B + U <= 1 ? (i[T] = C + (F - C) * B + (D - C) * U, i[T + 1] = N + (b - N) * B + (R - N) * U) : (i[T] = x + (D - x) * (1 - B) + (F - x) * (1 - U), i[T + 1] = O + (R - O) * (1 - B) + (b - O) * (1 - U))
							} else if (1 <= v)
								if (L <= 0) {
									var D = s[2 * (_ + 0 * E)],
										R = s[2 * (_ + 0 * E) + 1],
										x = p + 3 * c,
										O = f + 3 * d,
										C = p + 1 * c - 2 * g,
										N = f + 1 * d - 2 * y,
										F = p + 3 * c - 2 * g,
										b = f + 3 * d - 2 * y;
									(B = .5 * (v - 1)) + (U = .5 * (L - -2)) <= 1 ? (i[T] = C + (F - C) * B + (D - C) * U, i[T + 1] = N + (b - N) * B + (R - N) * U) : (i[T] = x + (D - x) * (1 - B) + (F - x) * (1 - U), i[T + 1] = O + (R - O) * (1 - B) + (b - O) * (1 - U))
								} else if (L >= 1) {
								var C = s[2 * (_ + a * E)],
									N = s[2 * (_ + a * E) + 1],
									F = p + 3 * c + 1 * g,
									b = f + 3 * d + 1 * y,
									D = p + 1 * c + 3 * g,
									R = f + 1 * d + 3 * y,
									x = p + 3 * c + 3 * g,
									O = f + 3 * d + 3 * y;
								(B = .5 * (v - 1)) + (U = .5 * (L - 1)) <= 1 ? (i[T] = C + (F - C) * B + (D - C) * U, i[T + 1] = N + (b - N) * B + (R - N) * U) : (i[T] = x + (D - x) * (1 - B) + (F - x) * (1 - U), i[T + 1] = O + (R - O) * (1 - B) + (b - O) * (1 - U))
							} else {
								var k = 0 | S;
								k == a && (k = a - 1);
								var B = .5 * (v - 1),
									U = S - k,
									G = k / a,
									Y = (k + 1) / a,
									C = s[2 * (_ + k * E)],
									N = s[2 * (_ + k * E) + 1],
									D = s[2 * (_ + (k + 1) * E)],
									R = s[2 * (_ + (k + 1) * E) + 1],
									F = p + 3 * c + G * g,
									b = f + 3 * d + G * y,
									x = p + 3 * c + Y * g,
									O = f + 3 * d + Y * y;
								B + U <= 1 ? (i[T] = C + (F - C) * B + (D - C) * U, i[T + 1] = N + (b - N) * B + (R - N) * U) : (i[T] = x + (D - x) * (1 - B) + (F - x) * (1 - U), i[T + 1] = O + (R - O) * (1 - B) + (b - O) * (1 - U))
							} else if (L <= 0) {
								(z = 0 | P) == _ && (z = _ - 1);
								var B = P - z,
									U = .5 * (L - -2),
									V = z / _,
									X = (z + 1) / _,
									D = s[2 * (z + 0 * E)],
									R = s[2 * (z + 0 * E) + 1],
									x = s[2 * (z + 1 + 0 * E)],
									O = s[2 * (z + 1 + 0 * E) + 1],
									C = p + V * c - 2 * g,
									N = f + V * d - 2 * y,
									F = p + X * c - 2 * g,
									b = f + X * d - 2 * y;
								B + U <= 1 ? (i[T] = C + (F - C) * B + (D - C) * U, i[T + 1] = N + (b - N) * B + (R - N) * U) : (i[T] = x + (D - x) * (1 - B) + (F - x) * (1 - U), i[T + 1] = O + (R - O) * (1 - B) + (b - O) * (1 - U))
							} else if (L >= 1) {
								var z = 0 | P;
								z == _ && (z = _ - 1);
								var B = P - z,
									U = .5 * (L - 1),
									V = z / _,
									X = (z + 1) / _,
									C = s[2 * (z + a * E)],
									N = s[2 * (z + a * E) + 1],
									F = s[2 * (z + 1 + a * E)],
									b = s[2 * (z + 1 + a * E) + 1],
									D = p + V * c + 3 * g,
									R = f + V * d + 3 * y,
									x = p + X * c + 3 * g,
									O = f + X * d + 3 * y;
								B + U <= 1 ? (i[T] = C + (F - C) * B + (D - C) * U, i[T + 1] = N + (b - N) * B + (R - N) * U) : (i[T] = x + (D - x) * (1 - B) + (F - x) * (1 - U), i[T + 1] = O + (R - O) * (1 - B) + (b - O) * (1 - U))
							} else t.err.printf("_$li calc : %.4f , %.4f\t\t\t\t\t@@BDBoxGrid\n", v, L);
							else i[T] = p + v * c + L * g, i[T + 1] = f + v * d + L * y
						} else l = P - (0 | P), $ = S - (0 | S), h = 2 * ((0 | P) + (0 | S) * (_ + 1)), l + $ < 1 ? (i[T] = s[h] * (1 - l - $) + s[h + 2] * l + s[h + 2 * (_ + 1)] * $, i[T + 1] = s[h + 1] * (1 - l - $) + s[h + 3] * l + s[h + 2 * (_ + 1) + 1] * $) : (i[T] = s[h + 2 * (_ + 1) + 2] * (l - 1 + $) + s[h + 2 * (_ + 1)] * (1 - l) + s[h + 2] * (1 - $), i[T + 1] = s[h + 2 * (_ + 1) + 3] * (l - 1 + $) + s[h + 2 * (_ + 1) + 1] * (1 - l) + s[h + 3] * (1 - $))
					}
				}, Q.prototype.transformPoints_sdk1 = function(t, e, i, r, o, n, s) {
					for (var _, a, h, l, $, u, p, f = e, c = this._$o, d = this._$A, g = o * s, y = null != f._$hr ? f._$hr : f._$Cr, m = n; m < g; m += s) st._$ts ? (_ = i[m], a = i[m + 1], _ < 0 ? _ = 0 : _ > 1 && (_ = 1), a < 0 ? a = 0 : a > 1 && (a = 1), _ *= c, a *= d, h = 0 | _, l = 0 | a, h > c - 1 && (h = c - 1), l > d - 1 && (l = d - 1), u = _ - h, p = a - l, $ = 2 * (h + l * (c + 1))) : (_ = i[m] * c, a = i[m + 1] * d, u = _ - (0 | _), p = a - (0 | a), $ = 2 * ((0 | _) + (0 | a) * (c + 1))), u + p < 1 ? (r[m] = y[$] * (1 - u - p) + y[$ + 2] * u + y[$ + 2 * (c + 1)] * p, r[m + 1] = y[$ + 1] * (1 - u - p) + y[$ + 3] * u + y[$ + 2 * (c + 1) + 1] * p) : (r[m] = y[$ + 2 * (c + 1) + 2] * (u - 1 + p) + y[$ + 2 * (c + 1)] * (1 - u) + y[$ + 2] * (1 - p), r[m + 1] = y[$ + 2 * (c + 1) + 3] * (u - 1 + p) + y[$ + 2 * (c + 1) + 1] * (1 - u) + y[$ + 3] * (1 - p))
				}, Q.prototype._$VT = function() {
					return (this._$o + 1) * (this._$A + 1)
				}, Q.prototype.getType = function() {
					return I._$_b
				}, Z.prototype = new nt, K._$42 = 0, K.prototype._$zP = function() {
					this._$3S = new Array, this._$aS = new Array
				}, K.prototype._$F0 = function(t) {
					this._$g0 = t._$8L(), this.visible = t._$8L(), this._$NL = t._$nP(), this._$3S = t._$nP(), this._$aS = t._$nP()
				}, K.prototype.init = function(t) {
					var e = new tt(this);
					return e.setPartsOpacity(this.isVisible() ? 1 : 0), e
				}, K.prototype._$6o = function(t) {
					if (null == this._$3S) throw new Error("_$3S _$6 _$Wo@_$6o");
					this._$3S.push(t)
				}, K.prototype._$3o = function(t) {
					if (null == this._$aS) throw new Error("_$aS _$6 _$Wo@_$3o");
					this._$aS.push(t)
				}, K.prototype._$Zo = function(t) {
					this._$3S = t
				}, K.prototype._$xo = function(t) {
					this._$aS = t
				}, K.prototype.isVisible = function() {
					return this.visible
				}, K.prototype._$uL = function() {
					return this._$g0
				}, K.prototype._$KP = function(t) {
					this.visible = t
				}, K.prototype._$ET = function(t) {
					this._$g0 = t
				}, K.prototype.getBaseData = function() {
					return this._$3S
				}, K.prototype.getDrawData = function() {
					return this._$aS
				}, K.prototype._$p2 = function() {
					return this._$NL
				}, K.prototype._$ob = function(t) {
					this._$NL = t
				}, K.prototype.getPartsID = function() {
					return this._$NL
				}, K.prototype._$MP = function(t) {
					this._$NL = t
				}, (tt.prototype = new function() {}).getPartsOpacity = function() {
					return this._$VS
				}, tt.prototype.setPartsOpacity = function(t) {
					this._$VS = t
				}, et._$L7 = function() {
					$._$27(), dt._$27(), R._$27(), l._$27()
				}, et.prototype.toString = function() {
					return this.id
				},
				function() {}.prototype._$F0 = function(t) {}, it.prototype._$1s = function() {
					return this._$4S
				}, it.prototype._$zP = function() {
					this._$4S = new Array
				}, it.prototype._$F0 = function(t) {
					this._$4S = t._$nP()
				}, it.prototype._$Ks = function(t) {
					this._$4S.push(t)
				}, rt.tr = new ct, rt._$50 = new ct, rt._$Ti = new Array(0, 0), rt._$Pi = new Array(0, 0), rt._$B = new Array(0, 0), rt.prototype._$lP = function(t, e, i, r) {
					this.viewport = new Array(t, e, i, r)
				}, rt.prototype._$bL = function() {
					this.context.save();
					var t = this.viewport;
					null != t && (this.context.beginPath(), this.context._$Li(t[0], t[1], t[2], t[3]), this.context.clip())
				}, rt.prototype._$ei = function() {
					this.context.restore()
				}, rt.prototype.drawElements = function(t, e, i, r, o, n, s, a) {
					try {
						o != this._$Qo && (this._$Qo = o, this.context.globalAlpha = o);
						for (var h = e.length, l = t.width, $ = t.height, u = this.context, p = this._$xP, f = this._$uP, c = this._$6r, d = this._$3r, g = rt.tr, y = rt._$Ti, m = rt._$Pi, T = rt._$B, P = 0; P < h; P += 3) {
							u.save();
							var S = e[P],
								v = e[P + 1],
								L = e[P + 2],
								E = p + c * i[2 * S],
								M = f + d * i[2 * S + 1],
								I = p + c * i[2 * v],
								A = f + d * i[2 * v + 1],
								w = p + c * i[2 * L],
								x = f + d * i[2 * L + 1];
							s && (s._$PS(E, M, T), E = T[0], M = T[1], s._$PS(I, A, T), I = T[0], A = T[1], s._$PS(w, x, T), w = T[0], x = T[1]);
							var O = l * r[2 * S],
								D = $ - $ * r[2 * S + 1],
								R = l * r[2 * v],
								F = $ - $ * r[2 * v + 1],
								b = l * r[2 * L],
								C = $ - $ * r[2 * L + 1],
								N = Math.atan2(F - D, R - O),
								B = Math.atan2(A - M, I - E),
								U = I - E,
								G = A - M,
								Y = Math.sqrt(U * U + G * G),
								k = R - O,
								V = F - D,
								X = Y / Math.sqrt(k * k + V * V);
							Lt._$ni(b, C, O, D, R - O, F - D, -(F - D), R - O, y), Lt._$ni(w, x, E, M, I - E, A - M, -(A - M), I - E, m);
							var z = (m[0] - y[0]) / y[1],
								H = Math.min(O, R, b),
								W = Math.max(O, R, b),
								j = Math.min(D, F, C),
								q = Math.max(D, F, C),
								J = Math.floor(H),
								Q = Math.floor(j),
								Z = Math.ceil(W),
								K = Math.ceil(q);
							if (g.identity(), g.translate(E, M), g.rotate(B), g.scale(1, m[1] / y[1]), g.shear(z, 0), g.scale(X, X), g.rotate(-N), g.translate(-O, -D), g.setContext(u), n || (n = 1.2), st.IGNORE_EXPAND && (n = 0), st.USE_CACHED_POLYGON_IMAGE) {
								var tt = a._$e0;
								if (tt.gl_cacheImage = tt.gl_cacheImage || {}, !tt.gl_cacheImage[P]) {
									var et = rt.createCanvas(Z - J, K - Q);
									st.DEBUG_DATA.LDGL_CANVAS_MB = st.DEBUG_DATA.LDGL_CANVAS_MB || 0, st.DEBUG_DATA.LDGL_CANVAS_MB += (Z - J) * (K - Q) * 4;
									var it = et.getContext("2d");
									it.translate(-J, -Q), rt.clip(it, g, n, Y, O, D, R, F, b, C, E, M, I, A, w, x), it.drawImage(t, 0, 0), tt.gl_cacheImage[P] = {
										cacheCanvas: et,
										cacheContext: it
									}
								}
								u.drawImage(tt.gl_cacheImage[P].cacheCanvas, J, Q)
							} else st.IGNORE_CLIP || rt.clip(u, g, n, Y, O, D, R, F, b, C, E, M, I, A, w, x), st.USE_ADJUST_TRANSLATION && (H = 0, W = l, j = 0, q = $), u.drawImage(t, H, j, W - H, q - j, H, j, W - H, q - j);
							u.restore()
						}
					} catch (t) {
						_._$Rb(t)
					}
				}, rt.clip = function(t, e, i, r, o, n, s, _, a, h, l, $, u, p, f, c) {
					i > .02 ? rt.expandClip(t, e, i, r, l, $, u, p, f, c) : rt.clipWithTransform(t, null, o, n, s, _, a, h)
				}, rt.expandClip = function(t, e, i, r, o, n, s, _, a, h) {
					var l = s - o,
						$ = _ - n,
						u = a - o,
						p = h - n,
						f = l * p - $ * u > 0 ? i : -i,
						c = -$,
						d = l,
						g = a - s,
						y = h - _,
						m = -y,
						T = g,
						P = Math.sqrt(g * g + y * y),
						S = -p,
						v = u,
						L = Math.sqrt(u * u + p * p),
						E = o - f * c / r,
						M = n - f * d / r,
						I = s - f * c / r,
						A = _ - f * d / r,
						w = s - f * m / P,
						x = _ - f * T / P,
						O = a - f * m / P,
						D = h - f * T / P,
						R = o + f * S / L,
						F = n + f * v / L,
						b = a + f * S / L,
						C = h + f * v / L,
						N = rt._$50;
					return null != e._$P2(N) && (rt.clipWithTransform(t, N, E, M, I, A, w, x, O, D, b, C, R, F), !0)
				}, rt.clipWithTransform = function(t, e, i, r, o, n, s, a) {
					if (arguments.length < 7) _._$li("err : @LDGL.clip()");
					else if (arguments[1] instanceof ct) {
						var h = rt._$B,
							l = e,
							$ = arguments;
						if (t.beginPath(), l) {
							l._$PS($[2], $[3], h), t.moveTo(h[0], h[1]);
							for (u = 4; u < $.length; u += 2) l._$PS($[u], $[u + 1], h), t.lineTo(h[0], h[1])
						} else {
							t.moveTo($[2], $[3]);
							for (var u = 4; u < $.length; u += 2) t.lineTo($[u], $[u + 1])
						}
						t.clip()
					} else _._$li("err : a[0] is _$6 LDTransform @LDGL.clip()")
				}, rt.createCanvas = function(t, e) {
					var i = document.createElement("canvas");
					return i.setAttribute("width", t), i.setAttribute("height", e), i || _._$li("err : " + i), i
				}, rt.dumpValues = function() {
					for (var t = "", e = 0; e < arguments.length; e++) t += "[" + e + "]= " + arguments[e].toFixed(3) + " , ";
					console.log(t)
				}, ot.prototype._$F0 = function(t) {
					this._$TT = t._$_T(), this._$LT = t._$_T(), this._$FS = t._$_T(), this._$wL = t._$nP()
				}, ot.prototype.getMinValue = function() {
					return this._$TT
				}, ot.prototype.getMaxValue = function() {
					return this._$LT
				}, ot.prototype.getDefaultValue = function() {
					return this._$FS
				}, ot.prototype.getParamID = function() {
					return this._$wL
				}, nt.prototype._$yo = function() {
					return this._$AT && !this._$JS
				}, nt.prototype._$hS = function(t) {
					this._$AT = t
				}, nt.prototype._$GT = function() {
					return this._$e0
				}, nt.prototype._$l2 = function(t) {
					this._$IP = t
				}, nt.prototype.getPartsIndex = function() {
					return this._$IP
				}, nt.prototype._$x2 = function() {
					return this._$JS
				}, nt.prototype._$Ib = function(t) {
					this._$JS = t
				}, nt.prototype.getTotalScale = function() {
					return this.totalScale
				}, nt.prototype.setTotalScale_notForClient = function(t) {
					this.totalScale = t
				}, nt.prototype.getInterpolatedOpacity = function() {
					return this._$7s
				}, nt.prototype.setInterpolatedOpacity = function(t) {
					this._$7s = t
				}, nt.prototype.getTotalOpacity = function(t) {
					return this.totalOpacity
				}, nt.prototype.setTotalOpacity = function(t) {
					this.totalOpacity = t
				}, st._$2s = "2.1.00_1", st._$Kr = 201001e3, st._$sP = !0, st._$so = !0, st._$cb = !1, st._$3T = !0, st._$Ts = !0, st._$fb = !0, st._$ts = !0, st.L2D_DEFORMER_EXTEND = !0, st._$Wb = !1, st._$yr = !1, st._$Zs = !1, st.L2D_NO_ERROR = 0, st._$i7 = 1e3, st._$9s = 1001, st._$es = 1100, st._$r7 = 2e3, st._$07 = 2001, st._$b7 = 2002, st._$H7 = 4e3, st.L2D_COLOR_BLEND_MODE_MULT = 0, st.L2D_COLOR_BLEND_MODE_ADD = 1, st.L2D_COLOR_BLEND_MODE_INTERPOLATE = 2, st._$6b = !0, st._$cT = 0, st.clippingMaskBufferSize = 256, st.glContext = new Array, st.frameBuffers = new Array, st.fTexture = new Array, st.IGNORE_CLIP = !1, st.IGNORE_EXPAND = !1, st.EXPAND_W = 2, st.USE_ADJUST_TRANSLATION = !0, st.USE_CANVAS_TRANSFORM = !0, st.USE_CACHED_POLYGON_IMAGE = !1, st.DEBUG_DATA = {}, st.PROFILE_IOS_SPEED = {
					PROFILE_NAME: "iOS Speed",
					USE_ADJUST_TRANSLATION: !0,
					USE_CACHED_POLYGON_IMAGE: !0,
					EXPAND_W: 4
				}, st.PROFILE_IOS_QUALITY = {
					PROFILE_NAME: "iOS HiQ",
					USE_ADJUST_TRANSLATION: !0,
					USE_CACHED_POLYGON_IMAGE: !1,
					EXPAND_W: 2
				}, st.PROFILE_IOS_DEFAULT = st.PROFILE_IOS_QUALITY, st.PROFILE_ANDROID = {
					PROFILE_NAME: "Android",
					USE_ADJUST_TRANSLATION: !1,
					USE_CACHED_POLYGON_IMAGE: !1,
					EXPAND_W: 2
				}, st.PROFILE_DESKTOP = {
					PROFILE_NAME: "Desktop",
					USE_ADJUST_TRANSLATION: !1,
					USE_CACHED_POLYGON_IMAGE: !1,
					EXPAND_W: 2
				}, st.initProfile = function() {
					vt.isIOS() ? st.setupProfile(st.PROFILE_IOS_DEFAULT) : vt.isAndroid() ? st.setupProfile(st.PROFILE_ANDROID) : st.setupProfile(st.PROFILE_DESKTOP)
				}, st.setupProfile = function(t, e) {
					if ("number" == typeof t) switch (t) {
						case 9901:
							t = st.PROFILE_IOS_SPEED;
							break;
						case 9902:
							t = st.PROFILE_IOS_QUALITY;
							break;
						case 9903:
							t = st.PROFILE_IOS_DEFAULT;
							break;
						case 9904:
							t = st.PROFILE_ANDROID;
							break;
						case 9905:
							t = st.PROFILE_DESKTOP;
							break;
						default:
							alert("profile _$6 _$Ui : " + t)
					}
					arguments.length < 2 && (e = !0), e && console.log("profile : " + t.PROFILE_NAME);
					for (var i in t) st[i] = t[i], e && console.log("  [" + i + "] = " + t[i])
				}, st.init = function() {
					st._$6b && (console.log("Live2D %s", st._$2s), st._$6b = !1, st.initProfile())
				}, st.getVersionStr = function() {
					return st._$2s
				}, st.getVersionNo = function() {
					return st._$Kr
				}, st._$sT = function(t) {
					st._$cT = t
				}, st.getError = function() {
					var t = st._$cT;
					return st._$cT = 0, t
				}, st.dispose = function() {
					st.glContext = [], st.frameBuffers = [], st.fTexture = []
				}, st.setGL = function(t, e) {
					var i = e || 0;
					st.glContext[i] = t
				}, st.getGL = function(t) {
					return st.glContext[t]
				}, st.setClippingMaskBufferSize = function(t) {
					st.clippingMaskBufferSize = t
				}, st.getClippingMaskBufferSize = function() {
					return st.clippingMaskBufferSize
				}, st.deleteBuffer = function(t) {
					st.getGL(t).deleteFramebuffer(st.frameBuffers[t].framebuffer), delete st.frameBuffers[t], delete st.glContext[t]
				}, _t._$r2 = function(t) {
					return t < 0 ? 0 : t > 1 ? 1 : .5 - .5 * Math.cos(t * Pt.PI_F)
				}, at._$fr = -1, at.prototype.toString = function() {
					return this._$ib
				}, ht.prototype = new H, ht._$42 = 0, ht._$Os = 30, ht._$ms = 0, ht._$ns = 1, ht._$_s = 2, ht._$gT = new Array, ht.prototype._$_S = function(t) {
					this._$LP = t
				}, ht.prototype.getTextureNo = function() {
					return this._$LP
				}, ht.prototype._$ZL = function() {
					return this._$Qi
				}, ht.prototype._$H2 = function() {
					return this._$JP
				}, ht.prototype.getNumPoints = function() {
					return this._$d0
				}, ht.prototype.getType = function() {
					return H._$wb
				}, ht.prototype._$B2 = function(t, e, i) {
					var r = e,
						o = null != r._$hr ? r._$hr : r._$Cr;
					switch (B._$do) {
						default:
							case B._$Ms:
							throw new Error("_$L _$ro ");
						case B._$Qs:
								for (var n = this._$d0 - 1; n >= 0; --n) o[n * B._$No + 4] = i
					}
				}, ht.prototype._$zP = function() {
					this._$GS = new O, this._$GS._$zP()
				}, ht.prototype._$F0 = function(t) {
					H.prototype._$F0.call(this, t), this._$LP = t._$6L(), this._$d0 = t._$6L(), this._$Yo = t._$6L();
					var e = t._$nP();
					this._$BP = new Int16Array(3 * this._$Yo);
					for (var i = 3 * this._$Yo - 1; i >= 0; --i) this._$BP[i] = e[i];
					if (this._$Eo = t._$nP(), this._$Qi = t._$nP(), t.getFormatVersion() >= U._$s7) {
						if (this._$JP = t._$6L(), 0 != this._$JP) {
							if (0 != (1 & this._$JP)) {
								var r = t._$6L();
								null == this._$5P && (this._$5P = new Object), this._$5P._$Hb = parseInt(r)
							}
							0 != (this._$JP & ht._$Os) ? this._$6s = (this._$JP & ht._$Os) >> 1 : this._$6s = ht._$ms, 0 != (32 & this._$JP) && (this.culling = !1)
						}
					} else this._$JP = 0
				}, ht.prototype.init = function(t) {
					var e = new lt(this),
						i = this._$d0 * B._$No,
						r = this._$32();
					switch (null != e._$Cr && (e._$Cr = null), e._$Cr = new Float32Array(i), null != e._$hr && (e._$hr = null), e._$hr = r ? new Float32Array(i) : null, B._$do) {
						default:
							case B._$Ms:
							if (B._$Ls)
								for (o = this._$d0 - 1; o >= 0; --o) {
									n = o << 1;
									this._$Qi[n + 1] = 1 - this._$Qi[n + 1]
								}
							break;
						case B._$Qs:
								for (var o = this._$d0 - 1; o >= 0; --o) {
								var n = o << 1,
									s = o * B._$No,
									_ = this._$Qi[n],
									a = this._$Qi[n + 1];
								e._$Cr[s] = _, e._$Cr[s + 1] = a, e._$Cr[s + 4] = 0, r && (e._$hr[s] = _, e._$hr[s + 1] = a, e._$hr[s + 4] = 0)
							}
					}
					return e
				}, ht.prototype._$Nr = function(t, e) {
					var i = e;
					if (this != i._$GT() && console.log("### assert!! ### "), this._$GS._$Ur(t) && (H.prototype._$Nr.call(this, t, i), !i._$IS[0])) {
						var r = ht._$gT;
						r[0] = !1, S._$Vr(t, this._$GS, r, this._$d0, this._$Eo, i._$Cr, B._$i2, B._$No)
					}
				}, ht.prototype._$2b = function(t, e) {
					try {
						this != e._$GT() && console.log("### assert!! ### ");
						var i = !1;
						e._$IS[0] && (i = !0);
						var r = e;
						if (!i && (H.prototype._$2b.call(this, t), this._$32())) {
							var o = this.getTargetBaseDataID();
							if (r._$8r == H._$ur && (r._$8r = t.getBaseDataIndex(o)), r._$8r < 0) st._$so && _._$li("_$L _$0P _$G :: %s", o);
							else {
								var n = t.getBaseData(r._$8r),
									s = t._$q2(r._$8r);
								null == n || s._$x2() ? r._$AT = !1 : (n._$nb(t, s, r._$Cr, r._$hr, this._$d0, B._$i2, B._$No), r._$AT = !0), r.baseOpacity = s.getTotalOpacity()
							}
						}
					} catch (t) {
						throw t
					}
				}, ht.prototype.draw = function(t, e, i) {
					if (this != i._$GT() && console.log("### assert!! ### "), !i._$IS[0]) {
						var r = i,
							o = this._$LP;
						o < 0 && (o = 1);
						var n = this.getOpacity(e, r) * i._$VS * i.baseOpacity,
							s = null != r._$hr ? r._$hr : r._$Cr;
						t.setClipBufPre_clipContextForDraw(i.clipBufPre_clipContext), t._$WP(this.culling), t._$Uo(o, 3 * this._$Yo, this._$BP, s, this._$Qi, n, this._$6s, r)
					}
				}, ht.prototype.dump = function() {
					console.log("  _$yi( %d ) , _$d0( %d ) , _$Yo( %d ) \n", this._$LP, this._$d0, this._$Yo), console.log("  _$Oi _$di = { ");
					for (t = 0; t < this._$BP.length; t++) console.log("%5d ,", this._$BP[t]);
					console.log("\n  _$5i _$30");
					for (var t = 0; t < this._$Eo.length; t++) {
						console.log("\n    _$30[%d] = ", t);
						for (var e = this._$Eo[t], i = 0; i < e.length; i++) console.log("%6.2f, ", e[i])
					}
					console.log("\n")
				}, ht.prototype._$72 = function(t) {
					return null == this._$5P ? null : this._$5P[t]
				}, ht.prototype.getIndexArray = function() {
					return this._$BP
				}, (lt.prototype = new St).getTransformedPoints = function() {
					return null != this._$hr ? this._$hr : this._$Cr
				}, $t.prototype._$HT = function(t) {
					this.x = t.x, this.y = t.y
				}, $t.prototype._$HT = function(t, e) {
					this.x = t, this.y = e
				}, ut.prototype = new e, ut.loadModel = function(t) {
					var i = new ut;
					return e._$62(i, t), i
				}, ut.loadModel = function(t, i) {
					var r = new ut(i || 0);
					return e._$62(r, t), r
				}, ut._$to = function() {
					return new ut
				}, ut._$er = function(t) {
					var e = new _$5("../_$_r/_$t0/_$Ri/_$_P._$d");
					if (0 == e.exists()) throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + e._$PL());
					for (var i = ["../_$_r/_$t0/_$Ri/_$_P.512/_$CP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$vP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$EP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$pP._$1"], r = ut.loadModel(e._$3b()), o = 0; o < i.length; o++) {
						var n = new _$5(i[o]);
						if (0 == n.exists()) throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + n._$PL());
						r.setTexture(o, _$nL._$_o(t, n._$3b()))
					}
					return r
				}, ut.prototype.setGL = function(t) {
					st.setGL(t)
				}, ut.prototype.setTransform = function(t) {
					this.drawParamWebGL.setTransform(t)
				}, ut.prototype.update = function() {
					this._$5S.update(), this._$5S.preDraw(this.drawParamWebGL)
				}, ut.prototype.draw = function() {
					this._$5S.draw(this.drawParamWebGL)
				}, ut.prototype._$K2 = function() {
					this.drawParamWebGL._$K2()
				}, ut.prototype.setTexture = function(t, e) {
					null == this.drawParamWebGL && _._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"), this.drawParamWebGL.setTexture(t, e)
				}, ut.prototype.setTexture = function(t, e) {
					null == this.drawParamWebGL && _._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"), this.drawParamWebGL.setTexture(t, e)
				}, ut.prototype._$Rs = function() {
					return this.drawParamWebGL._$Rs()
				}, ut.prototype._$Ds = function(t) {
					this.drawParamWebGL._$Ds(t)
				}, ut.prototype.getDrawParam = function() {
					return this.drawParamWebGL
				}, ut.prototype.setMatrix = function(t) {
					this.drawParamWebGL.setMatrix(t)
				}, ut.prototype.setPremultipliedAlpha = function(t) {
					this.drawParamWebGL.setPremultipliedAlpha(t)
				}, ut.prototype.isPremultipliedAlpha = function() {
					return this.drawParamWebGL.isPremultipliedAlpha()
				}, ut.prototype.setAnisotropy = function(t) {
					this.drawParamWebGL.setAnisotropy(t)
				}, ut.prototype.getAnisotropy = function() {
					return this.drawParamWebGL.getAnisotropy()
				}, pt.prototype._$tb = function() {
					return this.motions
				}, pt.prototype.startMotion = function(t, e) {
					for (var i = null, r = this.motions.length, o = 0; o < r; ++o) null != (i = this.motions[o]) && (i._$qS(i._$w0.getFadeOut()), this._$eb && _._$Ji("MotionQueueManager[size:%2d]->startMotion() / start _$K _$3 (m%d)\n", r, i._$sr));
					if (null == t) return -1;
					(i = new ft)._$w0 = t, this.motions.push(i);
					var n = i._$sr;
					return this._$eb && _._$Ji("MotionQueueManager[size:%2d]->startMotion() / new _$w0 (m%d)\n", r, n), n
				}, pt.prototype.updateParam = function(t) {
					try {
						for (var e = !1, i = 0; i < this.motions.length; i++) {
							var r = this.motions[i];
							if (null != r) {
								var o = r._$w0;
								null != o ? (o.updateParam(t, r), e = !0, r.isFinished() && (this._$eb && _._$Ji("MotionQueueManager[size:%2d]->updateParam() / _$T0 _$w0 (m%d)\n", this.motions.length - 1, r._$sr), this.motions.splice(i, 1), i--)) : (this.motions = this.motions.splice(i, 1), i--)
							} else this.motions.splice(i, 1), i--
						}
						return e
					} catch (t) {
						return _._$li(t), !0
					}
				}, pt.prototype.isFinished = function(t) {
					if (arguments.length >= 1) {
						for (e = 0; e < this.motions.length; e++)
							if (null != (i = this.motions[e]) && i._$sr == t && !i.isFinished()) return !1;
						return !0
					}
					for (var e = 0; e < this.motions.length; e++) {
						var i = this.motions[e];
						if (null != i)
							if (null != i._$w0) {
								if (!i.isFinished()) return !1
							} else this.motions.splice(e, 1), e--;
						else this.motions.splice(e, 1), e--
					}
					return !0
				}, pt.prototype.stopAllMotions = function() {
					for (var t = 0; t < this.motions.length; t++) {
						var e = this.motions[t];
						null != e ? (e._$w0, this.motions.splice(t, 1), t--) : (this.motions.splice(t, 1), t--)
					}
				}, pt.prototype._$Zr = function(t) {
					this._$eb = t
				}, pt.prototype._$e = function() {
					console.log("-- _$R --\n");
					for (var t = 0; t < this.motions.length; t++) {
						var e = this.motions[t]._$w0;
						console.log("MotionQueueEnt[%d] :: %s\n", this.motions.length, e.toString())
					}
				}, ft._$Gs = 0, ft.prototype.isFinished = function() {
					return this._$9L
				}, ft.prototype._$qS = function(t) {
					var e = A.getUserTimeMSec() + t;
					(this._$Do < 0 || e < this._$Do) && (this._$Do = e)
				}, ft.prototype._$Bs = function() {
					return this._$sr
				}, ct.prototype.setContext = function(t) {
					var e = this.m;
					t.transform(e[0], e[1], e[3], e[4], e[6], e[7])
				}, ct.prototype.toString = function() {
					for (var t = "LDTransform { ", e = 0; e < 9; e++) t += this.m[e].toFixed(2) + " ,";
					return t += " }"
				}, ct.prototype.identity = function() {
					var t = this.m;
					t[0] = t[4] = t[8] = 1, t[1] = t[2] = t[3] = t[5] = t[6] = t[7] = 0
				}, ct.prototype._$PS = function(t, e, i) {
					null == i && (i = new Array(0, 0));
					var r = this.m;
					return i[0] = r[0] * t + r[3] * e + r[6], i[1] = r[1] * t + r[4] * e + r[7], i
				}, ct.prototype._$P2 = function(t) {
					t || (t = new ct);
					var e = this.m,
						i = e[0],
						r = e[1],
						o = e[2],
						n = e[3],
						s = e[4],
						_ = e[5],
						a = e[6],
						h = e[7],
						l = e[8],
						$ = i * s * l + r * _ * a + o * n * h - i * _ * h - o * s * a - r * n * l;
					if (0 == $) return null;
					var u = 1 / $;
					return t.m[0] = u * (s * l - h * _), t.m[1] = u * (h * o - r * l), t.m[2] = u * (r * _ - s * o), t.m[3] = u * (a * _ - n * l), t.m[4] = u * (i * l - a * o), t.m[5] = u * (n * o - i * _), t.m[6] = u * (n * h - a * s), t.m[7] = u * (a * r - i * h), t.m[8] = u * (i * s - n * r), t
				}, ct.prototype.transform = function(t, e, i) {
					null == i && (i = new Array(0, 0));
					var r = this.m;
					return i[0] = r[0] * t + r[3] * e + r[6], i[1] = r[1] * t + r[4] * e + r[7], i
				}, ct.prototype.translate = function(t, e) {
					var i = this.m;
					i[6] = i[0] * t + i[3] * e + i[6], i[7] = i[1] * t + i[4] * e + i[7], i[8] = i[2] * t + i[5] * e + i[8]
				}, ct.prototype.scale = function(t, e) {
					var i = this.m;
					i[0] *= t, i[1] *= t, i[2] *= t, i[3] *= e, i[4] *= e, i[5] *= e
				}, ct.prototype.shear = function(t, e) {
					var i = this.m,
						r = i[0] + i[3] * e,
						o = i[1] + i[4] * e,
						n = i[2] + i[5] * e;
					i[3] = i[0] * t + i[3], i[4] = i[1] * t + i[4], i[5] = i[2] * t + i[5], i[0] = r, i[1] = o, i[2] = n
				}, ct.prototype.rotate = function(t) {
					var e = this.m,
						i = Math.cos(t),
						r = Math.sin(t),
						o = e[0] * i + e[3] * r,
						n = e[1] * i + e[4] * r,
						s = e[2] * i + e[5] * r;
					e[3] = -e[0] * r + e[3] * i, e[4] = -e[1] * r + e[4] * i, e[5] = -e[2] * r + e[5] * i, e[0] = o, e[1] = n, e[2] = s
				}, ct.prototype.concatenate = function(t) {
					var e = this.m,
						i = t.m,
						r = e[0] * i[0] + e[3] * i[1] + e[6] * i[2],
						o = e[1] * i[0] + e[4] * i[1] + e[7] * i[2],
						n = e[2] * i[0] + e[5] * i[1] + e[8] * i[2],
						s = e[0] * i[3] + e[3] * i[4] + e[6] * i[5],
						_ = e[1] * i[3] + e[4] * i[4] + e[7] * i[5],
						a = e[2] * i[3] + e[5] * i[4] + e[8] * i[5],
						h = e[0] * i[6] + e[3] * i[7] + e[6] * i[8],
						l = e[1] * i[6] + e[4] * i[7] + e[7] * i[8],
						$ = e[2] * i[6] + e[5] * i[7] + e[8] * i[8];
					m[0] = r, m[1] = o, m[2] = n, m[3] = s, m[4] = _, m[5] = a, m[6] = h, m[7] = l, m[8] = $
				}, dt.prototype = new et, dt._$eT = null, dt._$tP = new Object, dt._$2o = function() {
					return null == dt._$eT && (dt._$eT = dt.getID("DST_BASE")), dt._$eT
				}, dt._$27 = function() {
					dt._$tP.clear(), dt._$eT = null
				}, dt.getID = function(t) {
					var e = dt._$tP[t];
					return null == e && (e = new dt(t), dt._$tP[t] = e), e
				}, dt.prototype._$3s = function() {
					return new dt
				}, gt.prototype = new E, gt._$9r = function(t) {
					return new Float32Array(t)
				}, gt._$vb = function(t) {
					return new Int16Array(t)
				}, gt._$cr = function(t, e) {
					return null == t || t._$yL() < e.length ? ((t = gt._$9r(2 * e.length)).put(e), t._$oT(0)) : (t.clear(), t.put(e), t._$oT(0)), t
				}, gt._$mb = function(t, e) {
					return null == t || t._$yL() < e.length ? ((t = gt._$vb(2 * e.length)).put(e), t._$oT(0)) : (t.clear(), t.put(e), t._$oT(0)), t
				}, gt._$Hs = function() {
					return this._$Gr
				}, gt._$as = function(t) {
					this._$Gr = t
				}, gt.prototype.getGL = function() {
					return this.gl
				}, gt.prototype.setGL = function(t) {
					this.gl = t
				}, gt.prototype.setTransform = function(t) {
					this.transform = t
				}, gt.prototype._$ZT = function() {
					var t = this.gl;
					this.firstDraw && (this.initShader(), this.firstDraw = !1, this.anisotropyExt = t.getExtension("EXT_texture_filter_anisotropic") || t.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || t.getExtension("MOZ_EXT_texture_filter_anisotropic"), this.anisotropyExt && (this.maxAnisotropy = t.getParameter(this.anisotropyExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT))), t.disable(t.SCISSOR_TEST), t.disable(t.STENCIL_TEST), t.disable(t.DEPTH_TEST), t.frontFace(t.CW), t.enable(t.BLEND), t.colorMask(1, 1, 1, 1), t.bindBuffer(t.ARRAY_BUFFER, null), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, null)
				}, gt.prototype._$Uo = function(t, e, i, r, o, n, s, _) {
					if (!(n < .01 && null == this.clipBufPre_clipContextMask)) {
						var a = (n > .9 && st.EXPAND_W, this.gl);
						if (null == this.gl) throw new Error("gl is null");
						var h = 1 * this._$C0 * n,
							l = 1 * this._$tT * n,
							$ = 1 * this._$WL * n,
							u = this._$lT * n;
						if (null != this.clipBufPre_clipContextMask) {
							a.frontFace(a.CCW), a.useProgram(this.shaderProgram), this._$vS = yt(a, this._$vS, r), this._$no = mt(a, this._$no, i), a.enableVertexAttribArray(this.a_position_Loc), a.vertexAttribPointer(this.a_position_Loc, 2, a.FLOAT, !1, 0, 0), this._$NT = yt(a, this._$NT, o), a.activeTexture(a.TEXTURE1), a.bindTexture(a.TEXTURE_2D, this.textures[t]), a.uniform1i(this.s_texture0_Loc, 1), a.enableVertexAttribArray(this.a_texCoord_Loc), a.vertexAttribPointer(this.a_texCoord_Loc, 2, a.FLOAT, !1, 0, 0), a.uniformMatrix4fv(this.u_matrix_Loc, !1, this.getClipBufPre_clipContextMask().matrixForMask);
							var p = this.getClipBufPre_clipContextMask().layoutChannelNo,
								f = this.getChannelFlagAsColor(p);
							a.uniform4f(this.u_channelFlag, f.r, f.g, f.b, f.a);
							var c = this.getClipBufPre_clipContextMask().layoutBounds;
							a.uniform4f(this.u_baseColor_Loc, 2 * c.x - 1, 2 * c.y - 1, 2 * c._$EL() - 1, 2 * c._$5T() - 1), a.uniform1i(this.u_maskFlag_Loc, !0)
						} else if (null != this.getClipBufPre_clipContextDraw()) {
							a.useProgram(this.shaderProgramOff), this._$vS = yt(a, this._$vS, r), this._$no = mt(a, this._$no, i), a.enableVertexAttribArray(this.a_position_Loc_Off), a.vertexAttribPointer(this.a_position_Loc_Off, 2, a.FLOAT, !1, 0, 0), this._$NT = yt(a, this._$NT, o), a.activeTexture(a.TEXTURE1), a.bindTexture(a.TEXTURE_2D, this.textures[t]), a.uniform1i(this.s_texture0_Loc_Off, 1), a.enableVertexAttribArray(this.a_texCoord_Loc_Off), a.vertexAttribPointer(this.a_texCoord_Loc_Off, 2, a.FLOAT, !1, 0, 0), a.uniformMatrix4fv(this.u_clipMatrix_Loc_Off, !1, this.getClipBufPre_clipContextDraw().matrixForDraw), a.uniformMatrix4fv(this.u_matrix_Loc_Off, !1, this.matrix4x4), a.activeTexture(a.TEXTURE2), a.bindTexture(a.TEXTURE_2D, st.fTexture[this.glno]), a.uniform1i(this.s_texture1_Loc_Off, 2);
							var p = this.getClipBufPre_clipContextDraw().layoutChannelNo,
								f = this.getChannelFlagAsColor(p);
							a.uniform4f(this.u_channelFlag_Loc_Off, f.r, f.g, f.b, f.a), a.uniform4f(this.u_baseColor_Loc_Off, h, l, $, u)
						} else a.useProgram(this.shaderProgram), this._$vS = yt(a, this._$vS, r), this._$no = mt(a, this._$no, i), a.enableVertexAttribArray(this.a_position_Loc), a.vertexAttribPointer(this.a_position_Loc, 2, a.FLOAT, !1, 0, 0), this._$NT = yt(a, this._$NT, o), a.activeTexture(a.TEXTURE1), a.bindTexture(a.TEXTURE_2D, this.textures[t]), a.uniform1i(this.s_texture0_Loc, 1), a.enableVertexAttribArray(this.a_texCoord_Loc), a.vertexAttribPointer(this.a_texCoord_Loc, 2, a.FLOAT, !1, 0, 0), a.uniformMatrix4fv(this.u_matrix_Loc, !1, this.matrix4x4), a.uniform4f(this.u_baseColor_Loc, h, l, $, u), a.uniform1i(this.u_maskFlag_Loc, !1);
						this.culling ? this.gl.enable(a.CULL_FACE) : this.gl.disable(a.CULL_FACE), this.gl.enable(a.BLEND);
						var d, g, y, m;
						if (null != this.clipBufPre_clipContextMask) d = a.ONE, g = a.ONE_MINUS_SRC_ALPHA, y = a.ONE, m = a.ONE_MINUS_SRC_ALPHA;
						else switch (s) {
							case ht._$ms:
								d = a.ONE, g = a.ONE_MINUS_SRC_ALPHA, y = a.ONE, m = a.ONE_MINUS_SRC_ALPHA;
								break;
							case ht._$ns:
								d = a.ONE, g = a.ONE, y = a.ZERO, m = a.ONE;
								break;
							case ht._$_s:
								d = a.DST_COLOR, g = a.ONE_MINUS_SRC_ALPHA, y = a.ZERO, m = a.ONE
						}
						a.blendEquationSeparate(a.FUNC_ADD, a.FUNC_ADD), a.blendFuncSeparate(d, g, y, m), this.anisotropyExt && a.texParameteri(a.TEXTURE_2D, this.anisotropyExt.TEXTURE_MAX_ANISOTROPY_EXT, this.maxAnisotropy);
						var T = i.length;
						a.drawElements(a.TRIANGLES, T, a.UNSIGNED_SHORT, 0), a.bindTexture(a.TEXTURE_2D, null)
					}
				}, gt.prototype._$Rs = function() {
					throw new Error("_$Rs")
				}, gt.prototype._$Ds = function(t) {
					throw new Error("_$Ds")
				}, gt.prototype._$K2 = function() {
					for (var t = 0; t < this.textures.length; t++) 0 != this.textures[t] && (this.gl._$K2(1, this.textures, t), this.textures[t] = null)
				}, gt.prototype.setTexture = function(t, e) {
					this.textures[t] = e
				}, gt.prototype.initShader = function() {
					var t = this.gl;
					this.loadShaders2(), this.a_position_Loc = t.getAttribLocation(this.shaderProgram, "a_position"), this.a_texCoord_Loc = t.getAttribLocation(this.shaderProgram, "a_texCoord"), this.u_matrix_Loc = t.getUniformLocation(this.shaderProgram, "u_mvpMatrix"), this.s_texture0_Loc = t.getUniformLocation(this.shaderProgram, "s_texture0"), this.u_channelFlag = t.getUniformLocation(this.shaderProgram, "u_channelFlag"), this.u_baseColor_Loc = t.getUniformLocation(this.shaderProgram, "u_baseColor"), this.u_maskFlag_Loc = t.getUniformLocation(this.shaderProgram, "u_maskFlag"), this.a_position_Loc_Off = t.getAttribLocation(this.shaderProgramOff, "a_position"), this.a_texCoord_Loc_Off = t.getAttribLocation(this.shaderProgramOff, "a_texCoord"), this.u_matrix_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "u_mvpMatrix"), this.u_clipMatrix_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "u_ClipMatrix"), this.s_texture0_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "s_texture0"), this.s_texture1_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "s_texture1"), this.u_channelFlag_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "u_channelFlag"), this.u_baseColor_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "u_baseColor")
				}, gt.prototype.disposeShader = function() {
					var t = this.gl;
					this.shaderProgram && (t.deleteProgram(this.shaderProgram), this.shaderProgram = null), this.shaderProgramOff && (t.deleteProgram(this.shaderProgramOff), this.shaderProgramOff = null)
				}, gt.prototype.compileShader = function(t, e) {
					var i = this.gl,
						r = e,
						o = i.createShader(t);
					if (null == o) return _._$Ji("_$L0 to create shader"), null;
					if (i.shaderSource(o, r), i.compileShader(o), !i.getShaderParameter(o, i.COMPILE_STATUS)) {
						var n = i.getShaderInfoLog(o);
						return _._$Ji("_$L0 to compile shader : " + n), i.deleteShader(o), null
					}
					return o
				}, gt.prototype.loadShaders2 = function() {
					var t = this.gl;
					if (this.shaderProgram = t.createProgram(), !this.shaderProgram) return !1;
					if (this.shaderProgramOff = t.createProgram(), !this.shaderProgramOff) return !1;
					if (this.vertShader = this.compileShader(t.VERTEX_SHADER, "attribute vec4     a_position;attribute vec2     a_texCoord;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform mat4       u_mvpMatrix;void main(){    gl_Position = u_mvpMatrix * a_position;    v_ClipPos = u_mvpMatrix * a_position;    v_texCoord = a_texCoord;}"), !this.vertShader) return _._$Ji("Vertex shader compile _$li!"), !1;
					if (this.vertShaderOff = this.compileShader(t.VERTEX_SHADER, "attribute vec4     a_position;attribute vec2     a_texCoord;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform mat4       u_mvpMatrix;uniform mat4       u_ClipMatrix;void main(){    gl_Position = u_mvpMatrix * a_position;    v_ClipPos = u_ClipMatrix * a_position;    v_texCoord = a_texCoord ;}"), !this.vertShaderOff) return _._$Ji("OffVertex shader compile _$li!"), !1;
					if (this.fragShader = this.compileShader(t.FRAGMENT_SHADER, "precision mediump float;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform sampler2D  s_texture0;uniform vec4       u_channelFlag;uniform vec4       u_baseColor;uniform bool       u_maskFlag;void main(){    vec4 smpColor;     if(u_maskFlag){        float isInside =             step(u_baseColor.x, v_ClipPos.x/v_ClipPos.w)          * step(u_baseColor.y, v_ClipPos.y/v_ClipPos.w)          * step(v_ClipPos.x/v_ClipPos.w, u_baseColor.z)          * step(v_ClipPos.y/v_ClipPos.w, u_baseColor.w);        smpColor = u_channelFlag * texture2D(s_texture0 , v_texCoord).a * isInside;    }else{        smpColor = texture2D(s_texture0 , v_texCoord) * u_baseColor;    }    gl_FragColor = smpColor;}"), !this.fragShader) return _._$Ji("Fragment shader compile _$li!"), !1;
					if (this.fragShaderOff = this.compileShader(t.FRAGMENT_SHADER, "precision mediump float ;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform sampler2D  s_texture0;uniform sampler2D  s_texture1;uniform vec4       u_channelFlag;uniform vec4       u_baseColor ;void main(){    vec4 col_formask = texture2D(s_texture0, v_texCoord) * u_baseColor;    vec4 clipMask = texture2D(s_texture1, v_ClipPos.xy / v_ClipPos.w) * u_channelFlag;    float maskVal = clipMask.r + clipMask.g + clipMask.b + clipMask.a;    col_formask = col_formask * maskVal;    gl_FragColor = col_formask;}"), !this.fragShaderOff) return _._$Ji("OffFragment shader compile _$li!"), !1;
					if (t.attachShader(this.shaderProgram, this.vertShader), t.attachShader(this.shaderProgram, this.fragShader), t.attachShader(this.shaderProgramOff, this.vertShaderOff), t.attachShader(this.shaderProgramOff, this.fragShaderOff), t.linkProgram(this.shaderProgram), t.linkProgram(this.shaderProgramOff), !t.getProgramParameter(this.shaderProgram, t.LINK_STATUS)) {
						var e = t.getProgramInfoLog(this.shaderProgram);
						return _._$Ji("_$L0 to link program: " + e), this.vertShader && (t.deleteShader(this.vertShader), this.vertShader = 0), this.fragShader && (t.deleteShader(this.fragShader), this.fragShader = 0), this.shaderProgram && (t.deleteProgram(this.shaderProgram), this.shaderProgram = 0), this.vertShaderOff && (t.deleteShader(this.vertShaderOff), this.vertShaderOff = 0), this.fragShaderOff && (t.deleteShader(this.fragShaderOff), this.fragShaderOff = 0), this.shaderProgramOff && (t.deleteProgram(this.shaderProgramOff), this.shaderProgramOff = 0), !1
					}
					return !0
				}, gt.prototype.createFramebuffer = function() {
					var t = this.gl,
						e = st.clippingMaskBufferSize,
						i = t.createFramebuffer();
					t.bindFramebuffer(t.FRAMEBUFFER, i);
					var r = t.createRenderbuffer();
					t.bindRenderbuffer(t.RENDERBUFFER, r), t.renderbufferStorage(t.RENDERBUFFER, t.RGBA4, e, e), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.RENDERBUFFER, r);
					var o = t.createTexture();
					return t.bindTexture(t.TEXTURE_2D, o), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, e, e, 0, t.RGBA, t.UNSIGNED_BYTE, null), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, o, 0), t.bindTexture(t.TEXTURE_2D, null), t.bindRenderbuffer(t.RENDERBUFFER, null), t.bindFramebuffer(t.FRAMEBUFFER, null), st.fTexture[this.glno] = o, {
						framebuffer: i,
						renderbuffer: r,
						texture: st.fTexture[this.glno]
					}
				}, Tt.prototype._$fP = function() {
					var t, e, i, r = this._$ST();
					if (0 == (128 & r)) return 255 & r;
					if (0 == (128 & (t = this._$ST()))) return (127 & r) << 7 | 127 & t;
					if (0 == (128 & (e = this._$ST()))) return (127 & r) << 14 | (127 & t) << 7 | 255 & e;
					if (0 == (128 & (i = this._$ST()))) return (127 & r) << 21 | (127 & t) << 14 | (127 & e) << 7 | 255 & i;
					throw new at("_$L _$0P  _")
				}, Tt.prototype.getFormatVersion = function() {
					return this._$S2
				}, Tt.prototype._$gr = function(t) {
					this._$S2 = t
				}, Tt.prototype._$3L = function() {
					return this._$fP()
				}, Tt.prototype._$mP = function() {
					return this._$zT(), this._$F += 8, this._$T.getFloat64(this._$F - 8)
				}, Tt.prototype._$_T = function() {
					return this._$zT(), this._$F += 4, this._$T.getFloat32(this._$F - 4)
				}, Tt.prototype._$6L = function() {
					return this._$zT(), this._$F += 4, this._$T.getInt32(this._$F - 4)
				}, Tt.prototype._$ST = function() {
					return this._$zT(), this._$T.getInt8(this._$F++)
				}, Tt.prototype._$9T = function() {
					return this._$zT(), this._$F += 2, this._$T.getInt16(this._$F - 2)
				}, Tt.prototype._$2T = function() {
					throw this._$zT(), this._$F += 8, new at("_$L _$q read long")
				}, Tt.prototype._$po = function() {
					return this._$zT(), 0 != this._$T.getInt8(this._$F++)
				};
			var Mt = !0;
			Tt.prototype._$bT = function() {
					this._$zT();
					var t = this._$3L(),
						e = null;
					if (Mt) try {
						var i = new ArrayBuffer(2 * t);
						e = new Uint16Array(i);
						for (o = 0; o < t; ++o) e[o] = this._$T.getUint8(this._$F++);
						return String.fromCharCode.apply(null, e)
					} catch (t) {
						Mt = !1
					}
					try {
						var r = new Array;
						if (null == e)
							for (o = 0; o < t; ++o) r[o] = this._$T.getUint8(this._$F++);
						else
							for (var o = 0; o < t; ++o) r[o] = e[o];
						return String.fromCharCode.apply(null, r)
					} catch (t) {
						console.log("read utf8 / _$rT _$L0 !! : " + t)
					}
				}, Tt.prototype._$cS = function() {
					this._$zT();
					for (var t = this._$3L(), e = new Int32Array(t), i = 0; i < t; i++) e[i] = this._$T.getInt32(this._$F), this._$F += 4;
					return e
				}, Tt.prototype._$Tb = function() {
					this._$zT();
					for (var t = this._$3L(), e = new Float32Array(t), i = 0; i < t; i++) e[i] = this._$T.getFloat32(this._$F), this._$F += 4;
					return e
				}, Tt.prototype._$5b = function() {
					this._$zT();
					for (var t = this._$3L(), e = new Float64Array(t), i = 0; i < t; i++) e[i] = this._$T.getFloat64(this._$F), this._$F += 8;
					return e
				}, Tt.prototype._$nP = function() {
					return this._$Jb(-1)
				}, Tt.prototype._$Jb = function(t) {
					if (this._$zT(), t < 0 && (t = this._$3L()), t == U._$7P) {
						var e = this._$6L();
						if (0 <= e && e < this._$Ko.length) return this._$Ko[e];
						throw new at("_$sL _$4i @_$m0")
					}
					var i = this._$4b(t);
					return this._$Ko.push(i), i
				}, Tt.prototype._$4b = function(t) {
					if (0 == t) return null;
					if (50 == t) {
						e = this._$bT();
						return o = R.getID(e)
					}
					if (51 == t) {
						e = this._$bT();
						return o = dt.getID(e)
					}
					if (134 == t) {
						e = this._$bT();
						return o = l.getID(e)
					}
					if (60 == t) {
						var e = this._$bT();
						return o = $.getID(e)
					}
					if (t >= 48) {
						var i = U._$9o(t);
						return null != i ? (i._$F0(this), i) : null
					}
					switch (t) {
						case 1:
							return this._$bT();
						case 10:
							return new n(this._$6L(), !0);
						case 11:
							return new P(this._$mP(), this._$mP(), this._$mP(), this._$mP());
						case 12:
							return new P(this._$_T(), this._$_T(), this._$_T(), this._$_T());
						case 13:
							return new v(this._$mP(), this._$mP());
						case 14:
							return new v(this._$_T(), this._$_T());
						case 15:
							for (var r = this._$3L(), o = new Array(r), s = 0; s < r; s++) o[s] = this._$nP();
							return o;
						case 17:
							return o = new F(this._$mP(), this._$mP(), this._$mP(), this._$mP(), this._$mP(), this._$mP());
						case 21:
							return new h(this._$6L(), this._$6L(), this._$6L(), this._$6L());
						case 22:
							return new $t(this._$6L(), this._$6L());
						case 23:
							throw new Error("_$L _$ro ");
						case 16:
						case 25:
							return this._$cS();
						case 26:
							return this._$5b();
						case 27:
							return this._$Tb();
						case 2:
						case 3:
						case 4:
						case 5:
						case 6:
						case 7:
						case 8:
						case 9:
						case 18:
						case 19:
						case 20:
						case 24:
						case 28:
							throw new at("_$6 _$q : _$nP() of 2-9 ,18,19,20,24,28 : " + t);
						default:
							throw new at("_$6 _$q : _$nP() NO _$i : " + t)
					}
				}, Tt.prototype._$8L = function() {
					return 0 == this._$hL ? this._$v0 = this._$ST() : 8 == this._$hL && (this._$v0 = this._$ST(), this._$hL = 0), 1 == (this._$v0 >> 7 - this._$hL++ & 1)
				}, Tt.prototype._$zT = function() {
					0 != this._$hL && (this._$hL = 0)
				},
				function() {}.prototype._$wP = function(t, e, i) {
					for (var r = 0; r < i; r++) {
						for (var o = 0; o < e; o++) {
							var n = 2 * (o + r * e);
							console.log("(% 7.3f , % 7.3f) , ", t[n], t[n + 1])
						}
						console.log("\n")
					}
					console.log("\n")
				}, Pt._$2S = Math.PI / 180, Pt._$bS = Math.PI / 180, Pt._$wS = 180 / Math.PI, Pt._$NS = 180 / Math.PI, Pt.PI_F = Math.PI, Pt._$kT = [0, .012368, .024734, .037097, .049454, .061803, .074143, .086471, .098786, .111087, .12337, .135634, .147877, .160098, .172295, .184465, .196606, .208718, .220798, .232844, .244854, .256827, .268761, .280654, .292503, .304308, .316066, .327776, .339436, .351044, .362598, .374097, .385538, .396921, .408243, .419502, .430697, .441826, .452888, .463881, .474802, .485651, .496425, .507124, .517745, .528287, .538748, .549126, .559421, .56963, .579752, .589785, .599728, .609579, .619337, .629, .638567, .648036, .657406, .666676, .675843, .684908, .693867, .70272, .711466, .720103, .72863, .737045, .745348, .753536, .76161, .769566, .777405, .785125, .792725, .800204, .807561, .814793, .821901, .828884, .835739, .842467, .849066, .855535, .861873, .868079, .874153, .880093, .885898, .891567, .897101, .902497, .907754, .912873, .917853, .922692, .92739, .931946, .936359, .940629, .944755, .948737, .952574, .956265, .959809, .963207, .966457, .96956, .972514, .97532, .977976, .980482, .982839, .985045, .987101, .989006, .990759, .992361, .993811, .995109, .996254, .997248, .998088, .998776, .999312, .999694, .999924, 1], Pt._$92 = function(t, e) {
					var i = Math.atan2(t[1], t[0]),
						r = Math.atan2(e[1], e[0]);
					return Pt._$tS(i, r)
				}, Pt._$tS = function(t, e) {
					for (var i = t - e; i < -Math.PI;) i += 2 * Math.PI;
					for (; i > Math.PI;) i -= 2 * Math.PI;
					return i
				}, Pt._$9 = function(t) {
					return Math.sin(t)
				}, Pt.fcos = function(t) {
					return Math.cos(t)
				}, St.prototype._$u2 = function() {
					return this._$IS[0]
				}, St.prototype._$yo = function() {
					return this._$AT && !this._$IS[0]
				}, St.prototype._$GT = function() {
					return this._$e0
				}, vt._$W2 = 0, vt.SYSTEM_INFO = null, vt.USER_AGENT = navigator.userAgent, vt.isIPhone = function() {
					return vt.SYSTEM_INFO || vt.setup(), vt.SYSTEM_INFO._isIPhone
				}, vt.isIOS = function() {
					return vt.SYSTEM_INFO || vt.setup(), vt.SYSTEM_INFO._isIPhone || vt.SYSTEM_INFO._isIPad
				}, vt.isAndroid = function() {
					return vt.SYSTEM_INFO || vt.setup(), vt.SYSTEM_INFO._isAndroid
				}, vt.getOSVersion = function() {
					return vt.SYSTEM_INFO || vt.setup(), vt.SYSTEM_INFO.version
				}, vt.getOS = function() {
					return vt.SYSTEM_INFO || vt.setup(), vt.SYSTEM_INFO._isIPhone || vt.SYSTEM_INFO._isIPad ? "iOS" : vt.SYSTEM_INFO._isAndroid ? "Android" : "_$Q0 OS"
				}, vt.setup = function() {
					function t(t, e) {
						for (var i = t.substring(e).split(/[ _,;\.]/), r = 0, o = 0; o <= 2 && !isNaN(i[o]); o++) {
							var n = parseInt(i[o]);
							if (n < 0 || n > 999) {
								_._$li("err : " + n + " @UtHtml5.setup()"), r = 0;
								break
							}
							r += n * Math.pow(1e3, 2 - o)
						}
						return r
					}
					var e, i = vt.USER_AGENT,
						r = vt.SYSTEM_INFO = {
							userAgent: i
						};
					if ((e = i.indexOf("iPhone OS ")) >= 0) r.os = "iPhone", r._isIPhone = !0, r.version = t(i, e + "iPhone OS ".length);
					else if ((e = i.indexOf("iPad")) >= 0) {
						if ((e = i.indexOf("CPU OS")) < 0) return void _._$li(" err : " + i + " @UtHtml5.setup()");
						r.os = "iPad", r._isIPad = !0, r.version = t(i, e + "CPU OS ".length)
					} else(e = i.indexOf("Android")) >= 0 ? (r.os = "Android", r._isAndroid = !0, r.version = t(i, e + "Android ".length)) : (r.os = "-", r.version = -1)
				}, window.UtSystem = A, window.UtDebug = _, window.LDTransform = ct, window.LDGL = rt, window.Live2D = st, window.Live2DModelWebGL = ut, window.Live2DModelJS = j, window.Live2DMotion = q, window.MotionQueueManager = pt, window.PhysicsHair = p, window.AMotion = s, window.PartsDataID = l, window.DrawDataID = R, window.BaseDataID = dt, window.ParamID = $, st.init();
			var It = !1
		}()
	}).call(e, i(7))
}, function(t, e) {
	t.exports = {
		import: function() {
			throw new Error("System.import cannot be used indirectly")
		}
	}
}, function(t, e, i) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			default: t
		}
	}

	function o() {
		this.models = [], this.count = -1, this.reloadFlg = !1, Live2D.init(), n.Live2DFramework.setPlatformManager(new s.default)
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	}), e.default = o;
	var n = i(0),
		s = r(i(9)),
		_ = r(i(10)),
		a = r(i(1));
	o.prototype.createModel = function() {
		var t = new _.default;
		return this.models.push(t), t
	}, o.prototype.changeModel = function(t, e) {
		this.reloadFlg && (this.reloadFlg = !1, this.releaseModel(0, t), this.createModel(), this.models[0].load(t, e))
	}, o.prototype.getModel = function(t) {
		return t >= this.models.length ? null : this.models[t]
	}, o.prototype.releaseModel = function(t, e) {
		this.models.length <= t || (this.models[t].release(e), delete this.models[t], this.models.splice(t, 1))
	}, o.prototype.numModels = function() {
		return this.models.length
	}, o.prototype.setDrag = function(t, e) {
		for (var i = 0; i < this.models.length; i++) this.models[i].setDrag(t, e)
	}, o.prototype.maxScaleEvent = function() {
		a.default.DEBUG_LOG && console.log("Max scale event.");
		for (var t = 0; t < this.models.length; t++) this.models[t].startRandomMotion(a.default.MOTION_GROUP_PINCH_IN, a.default.PRIORITY_NORMAL)
	}, o.prototype.minScaleEvent = function() {
		a.default.DEBUG_LOG && console.log("Min scale event.");
		for (var t = 0; t < this.models.length; t++) this.models[t].startRandomMotion(a.default.MOTION_GROUP_PINCH_OUT, a.default.PRIORITY_NORMAL)
	}, o.prototype.tapEvent = function(t, e) {
		if (a.default.hitFlag) return !1;
		a.default.hitFlag = !0, setTimeout(function() {
			a.default.hitFlag = !1
		}, 8e3), a.default.DEBUG_LOG && console.log("tapEvent view x:" + t + " y:" + e);
		for (var i = 0; i < this.models.length; i++) this.models[i].hitTest(a.default.HIT_AREA_HEAD, t, e) ? (a.default.DEBUG_LOG && console.log("Tap face."), this.models[i].setRandomExpression()) : this.models[i].hitTest(a.default.HIT_AREA_BODY, t, e) ? (a.default.DEBUG_LOG && console.log("Tap body. models[" + i + "]"), this.models[i].startRandomMotion(a.default.MOTION_GROUP_TAP_BODY, a.default.PRIORITY_FORCE)) : this.models[i].hitTestCustom("head", t, e) ? (a.default.DEBUG_LOG && console.log("Tap face."), this.models[i].startRandomMotion(a.default.MOTION_GROUP_FLICK_HEAD, a.default.PRIORITY_FORCE)) : this.models[i].hitTestCustom("body", t, e) && (a.default.DEBUG_LOG && console.log("Tap body. models[" + i + "]"), this.models[i].startRandomMotion(a.default.MOTION_GROUP_TAP_BODY, a.default.PRIORITY_FORCE));
		return !0
	}
}, function(t, e, i) {
	"use strict";

	function r() {}
	Object.defineProperty(e, "__esModule", {
		value: !0
	}), e.default = r;
	var o = i(2);
	r.prototype.loadBytes = function(t, e) {
		var i = new XMLHttpRequest;
		i.open("GET", t, !0), i.responseType = "arraybuffer", i.onload = function() {
			switch (i.status) {
				case 200:
					e(i.response);
					break;
				default:
					console.error("Failed to load (" + i.status + ") : " + t)
			}
		}, i.send(null)
	}, r.prototype.loadString = function(t) {
		this.loadBytes(t, function(t) {
			return t
		})
	}, r.prototype.loadLive2DModel = function(t, e) {
		var i = null;
		this.loadBytes(t, function(t) {
			i = Live2DModelWebGL.loadModel(t), e(i)
		})
	}, r.prototype.loadTexture = function(t, e, i, r) {
		var n = new Image;
		n.src = i, n.crossOrigin = "Anonymous", n.onload = function() {
			var i = (0, o.getContext)(),
				s = i.createTexture();
			if (!s) return console.error("Failed to generate gl texture name."), -1;
			0 == t.isPremultipliedAlpha() && i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1), i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, 1), i.activeTexture(i.TEXTURE0), i.bindTexture(i.TEXTURE_2D, s), i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, i.RGBA, i.UNSIGNED_BYTE, n), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, i.LINEAR), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.LINEAR_MIPMAP_NEAREST), i.generateMipmap(i.TEXTURE_2D), t.setTexture(e, s), s = null, "function" == typeof r && r()
		}, n.onerror = function() {
			console.error("Failed to load image : " + i)
		}
	}, r.prototype.jsonParseFromBytes = function(t) {
		var e, i = new Uint8Array(t, 0, 3);
		return e = 239 == i[0] && 187 == i[1] && 191 == i[2] ? String.fromCharCode.apply(null, new Uint8Array(t, 3)) : String.fromCharCode.apply(null, new Uint8Array(t)), JSON.parse(e)
	}, r.prototype.log = function(t) {}
}, function(t, e, i) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			default: t
		}
	}

	function o() {
		n.L2DBaseModel.prototype.constructor.call(this), this.modelHomeDir = "", this.modelSetting = null, this.tmpMatrix = []
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	}), e.default = o;
	var n = i(0),
		s = r(i(11)),
		_ = r(i(1)),
		a = r(i(3));
	(o.prototype = new n.L2DBaseModel).load = function(t, e, i) {
		this.setUpdating(!0), this.setInitialized(!1), this.modelHomeDir = e.substring(0, e.lastIndexOf("/") + 1), this.modelSetting = new s.default;
		var r = this;
		this.modelSetting.loadModelSetting(e, function() {
			var t = r.modelHomeDir + r.modelSetting.getModelFile();
			r.loadModelData(t, function(t) {
				for (var e = 0; e < r.modelSetting.getTextureNum(); e++) {
					if (/^https?:\/\/|^\/\//i.test(r.modelSetting.getTextureFile(e))) o = r.modelSetting.getTextureFile(e);
					else var o = r.modelHomeDir + r.modelSetting.getTextureFile(e);
					r.loadTexture(e, o, function() {
						if (r.isTexLoaded) {
							if (r.modelSetting.getExpressionNum() > 0) {
								r.expressions = {};
								for (s = 0; s < r.modelSetting.getExpressionNum(); s++) {
									var t = r.modelSetting.getExpressionName(s),
										e = r.modelHomeDir + r.modelSetting.getExpressionFile(s);
									r.loadExpression(t, e)
								}
							} else r.expressionManager = null, r.expressions = {};
							if (r.eyeBlink, null != r.modelSetting.getPhysicsFile() ? r.loadPhysics(r.modelHomeDir + r.modelSetting.getPhysicsFile()) : r.physics = null, null != r.modelSetting.getPoseFile() ? r.loadPose(r.modelHomeDir + r.modelSetting.getPoseFile(), function() {
									r.pose.updateParam(r.live2DModel)
								}) : r.pose = null, null != r.modelSetting.getLayout()) {
								var o = r.modelSetting.getLayout();
								null != o.width && r.modelMatrix.setWidth(o.width), null != o.height && r.modelMatrix.setHeight(o.height), null != o.x && r.modelMatrix.setX(o.x), null != o.y && r.modelMatrix.setY(o.y), null != o.center_x && r.modelMatrix.centerX(o.center_x), null != o.center_y && r.modelMatrix.centerY(o.center_y), null != o.top && r.modelMatrix.top(o.top), null != o.bottom && r.modelMatrix.bottom(o.bottom), null != o.left && r.modelMatrix.left(o.left), null != o.right && r.modelMatrix.right(o.right)
							}
							if (null != r.modelSetting.getHitAreasCustom()) {
								var n = r.modelSetting.getHitAreasCustom();
								null != n.head_x && (_.default.hit_areas_custom_head_x = n.head_x), null != n.head_y && (_.default.hit_areas_custom_head_y = n.head_y), null != n.body_x && (_.default.hit_areas_custom_body_x = n.body_x), null != n.body_y && (_.default.hit_areas_custom_body_y = n.body_y)
							}
							for (s = 0; s < r.modelSetting.getInitParamNum(); s++) r.live2DModel.setParamFloat(r.modelSetting.getInitParamID(s), r.modelSetting.getInitParamValue(s));
							for (var s = 0; s < r.modelSetting.getInitPartsVisibleNum(); s++) r.live2DModel.setPartsOpacity(r.modelSetting.getInitPartsVisibleID(s), r.modelSetting.getInitPartsVisibleValue(s));
							r.live2DModel.saveParam(), r.preloadMotionGroup(_.default.MOTION_GROUP_IDLE), r.preloadMotionGroup(_.default.MOTION_GROUP_SLEEPY), r.mainMotionManager.stopAllMotions(), r.setUpdating(!1), r.setInitialized(!0), "function" == typeof i && i()
						}
					})
				}
			})
		})
	}, o.prototype.release = function(t) {
		var e = n.Live2DFramework.getPlatformManager();
		t.deleteTexture(e.texture)
	}, o.prototype.preloadMotionGroup = function(t) {
		for (var e = this, i = 0; i < this.modelSetting.getMotionNum(t); i++) {
			var r = this.modelSetting.getMotionFile(t, i);
			this.loadMotion(r, this.modelHomeDir + r, function(r) {
				r.setFadeIn(e.modelSetting.getMotionFadeIn(t, i)), r.setFadeOut(e.modelSetting.getMotionFadeOut(t, i))
			})
		}
	}, o.prototype.update = function() {
		if (null != this.live2DModel) {
			var t = 2 * ((UtSystem.getUserTimeMSec() - this.startTimeMSec) / 1e3) * Math.PI,
				e = document.getElementById("live_talk").value;
			"1" === e && ("1" === sessionStorage.getItem("Sleepy") ? this.startRandomMotion(_.default.MOTION_GROUP_SLEEPY, _.default.PRIORITY_SLEEPY) : (this.startRandomMotion(_.default.MOTION_GROUP_Talk, _.default.PRIORITY_FORCE), document.getElementById("live_talk").value = "0")), this.mainMotionManager.isFinished() && "0" === e && ("1" === sessionStorage.getItem("Sleepy") ? sessionStorage.getItem("Sleepy") : (this.startRandomMotion(_.default.MOTION_GROUP_Reset, _.default.PRIORITY_IDLE), "0" === document.getElementById("live_talk").value && (document.getElementById("live_talk").value = "3"))), this.live2DModel.loadParam(), this.mainMotionManager.updateParam(this.live2DModel) || null != this.eyeBlink && this.eyeBlink.updateParam(this.live2DModel), this.live2DModel.saveParam(), null == this.expressionManager || null == this.expressions || this.expressionManager.isFinished() || this.expressionManager.updateParam(this.live2DModel), this.live2DModel.addToParamFloat("PARAM_ANGLE_X", 30 * this.dragX, 1), this.live2DModel.addToParamFloat("PARAM_ANGLE_Y", 30 * this.dragY, 1), this.live2DModel.addToParamFloat("PARAM_ANGLE_Z", this.dragX * this.dragY * -30, 1), this.live2DModel.addToParamFloat("PARAM_BODY_ANGLE_X", 10 * this.dragX, 1), this.live2DModel.addToParamFloat("PARAM_EYE_BALL_X", this.dragX, 1), this.live2DModel.addToParamFloat("PARAM_EYE_BALL_Y", this.dragY, 1), this.live2DModel.addToParamFloat("PARAM_ANGLE_X", Number(15 * Math.sin(t / 6.5345)), .5), this.live2DModel.addToParamFloat("PARAM_ANGLE_Y", Number(8 * Math.sin(t / 3.5345)), .5), this.live2DModel.addToParamFloat("PARAM_ANGLE_Z", Number(10 * Math.sin(t / 5.5345)), .5), this.live2DModel.addToParamFloat("PARAM_BODY_ANGLE_X", Number(4 * Math.sin(t / 15.5345)), .5), this.live2DModel.setParamFloat("PARAM_BREATH", Number(.5 + .5 * Math.sin(t / 3.2345)), 1), null != this.physics && this.physics.updateParam(this.live2DModel), null == this.lipSync && this.live2DModel.setParamFloat("PARAM_MOUTH_OPEN_Y", this.lipSyncValue), null != this.pose && this.pose.updateParam(this.live2DModel), this.live2DModel.update()
		} else _.default.DEBUG_LOG && console.error("Failed to update.")
	}, o.prototype.setRandomExpression = function() {
		var t = [];
		for (var e in this.expressions) t.push(e);
		var i = parseInt(Math.random() * t.length);
		this.setExpression(t[i])
	}, o.prototype.startRandomMotion = function(t, e) {
		var i = this.modelSetting.getMotionNum(t),
			r = parseInt(Math.random() * i);
		this.startMotion(t, r, e)
	}, o.prototype.startMotion = function(t, e, i) {
		var r = this.modelSetting.getMotionFile(t, e);
		if (null != r && "" != r) {
			if (i == _.default.PRIORITY_FORCE) this.mainMotionManager.setReservePriority(i);
			else if (!this.mainMotionManager.reserveMotion(i)) return void(_.default.DEBUG_LOG && console.log("Motion is running."));
			var o, n = this;
			null == this.motions[t] ? this.loadMotion(null, this.modelHomeDir + r, function(r) {
				o = r, n.setFadeInFadeOut(t, e, i, o)
			}) : (o = this.motions[t], n.setFadeInFadeOut(t, e, i, o))
		} else _.default.DEBUG_LOG && console.error("Failed to motion.")
	}, o.prototype.setFadeInFadeOut = function(t, e, i, r) {
		var o = this.modelSetting.getMotionFile(t, e);
		if (r.setFadeIn(this.modelSetting.getMotionFadeIn(t, e)), r.setFadeOut(this.modelSetting.getMotionFadeOut(t, e)), _.default.DEBUG_LOG && console.log("Start motion : " + o), null == this.modelSetting.getMotionSound(t, e)) this.mainMotionManager.startMotionPrio(r, i);
		else {
			var n = this.modelSetting.getMotionSound(t, e),
				s = document.createElement("audio");
			s.src = this.modelHomeDir + n, _.default.DEBUG_LOG && console.log("Start sound : " + n), s.play(), this.mainMotionManager.startMotionPrio(r, i)
		}
	}, o.prototype.setExpression = function(t) {
		var e = this.expressions[t];
		_.default.DEBUG_LOG && console.log("Expression : " + t), this.expressionManager.startMotion(e, !1)
	}, o.prototype.draw = function(t) {
		a.default.push(), a.default.multMatrix(this.modelMatrix.getArray()), this.tmpMatrix = a.default.getMatrix(), this.live2DModel.setMatrix(this.tmpMatrix), this.live2DModel.draw(), a.default.pop()
	}, o.prototype.hitTest = function(t, e, i) {
		for (var r = this.modelSetting.getHitAreaNum(), o = 0; o < r; o++)
			if (t == this.modelSetting.getHitAreaName(o)) {
				var n = this.modelSetting.getHitAreaID(o);
				return this.hitTestSimple(n, e, i)
			}
		return !1
	}, o.prototype.hitTestCustom = function(t, e, i) {
		return "head" == t ? this.hitTestSimpleCustom(_.default.hit_areas_custom_head_x, _.default.hit_areas_custom_head_y, e, i) : "body" == t && this.hitTestSimpleCustom(_.default.hit_areas_custom_body_x, _.default.hit_areas_custom_body_y, e, i)
	}
}, function(t, e, i) {
	"use strict";

	function r() {
		this.NAME = "name", this.ID = "id", this.MODEL = "model", this.TEXTURES = "textures", this.HIT_AREAS = "hit_areas", this.PHYSICS = "physics", this.POSE = "pose", this.EXPRESSIONS = "expressions", this.MOTION_GROUPS = "motions", this.SOUND = "sound", this.FADE_IN = "fade_in", this.FADE_OUT = "fade_out", this.LAYOUT = "layout", this.HIT_AREAS_CUSTOM = "hit_areas_custom", this.INIT_PARAM = "init_param", this.INIT_PARTS_VISIBLE = "init_parts_visible", this.VALUE = "val", this.FILE = "file", this.json = {}
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	}), e.default = r;
	var o = i(0);
	r.prototype.loadModelSetting = function(t, e) {
		var i = this;
		o.Live2DFramework.getPlatformManager().loadBytes(t, function(t) {
			var r = String.fromCharCode.apply(null, new Uint8Array(t));
			i.json = JSON.parse(r), e()
		})
	}, r.prototype.getTextureFile = function(t) {
		return null == this.json[this.TEXTURES] || null == this.json[this.TEXTURES][t] ? null : this.json[this.TEXTURES][t]
	}, r.prototype.getModelFile = function() {
		return this.json[this.MODEL]
	}, r.prototype.getTextureNum = function() {
		return null == this.json[this.TEXTURES] ? 0 : this.json[this.TEXTURES].length
	}, r.prototype.getHitAreaNum = function() {
		return null == this.json[this.HIT_AREAS] ? 0 : this.json[this.HIT_AREAS].length
	}, r.prototype.getHitAreaID = function(t) {
		return null == this.json[this.HIT_AREAS] || null == this.json[this.HIT_AREAS][t] ? null : this.json[this.HIT_AREAS][t][this.ID]
	}, r.prototype.getHitAreaName = function(t) {
		return null == this.json[this.HIT_AREAS] || null == this.json[this.HIT_AREAS][t] ? null : this.json[this.HIT_AREAS][t][this.NAME]
	}, r.prototype.getPhysicsFile = function() {
		return this.json[this.PHYSICS]
	}, r.prototype.getPoseFile = function() {
		return this.json[this.POSE]
	}, r.prototype.getExpressionNum = function() {
		return null == this.json[this.EXPRESSIONS] ? 0 : this.json[this.EXPRESSIONS].length
	}, r.prototype.getExpressionFile = function(t) {
		return null == this.json[this.EXPRESSIONS] ? null : this.json[this.EXPRESSIONS][t][this.FILE]
	}, r.prototype.getExpressionName = function(t) {
		return null == this.json[this.EXPRESSIONS] ? null : this.json[this.EXPRESSIONS][t][this.NAME]
	}, r.prototype.getLayout = function() {
		return this.json[this.LAYOUT]
	}, r.prototype.getHitAreasCustom = function() {
		return this.json[this.HIT_AREAS_CUSTOM]
	}, r.prototype.getInitParamNum = function() {
		return null == this.json[this.INIT_PARAM] ? 0 : this.json[this.INIT_PARAM].length
	}, r.prototype.getMotionNum = function(t) {
		return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] ? 0 : this.json[this.MOTION_GROUPS][t].length
	}, r.prototype.getMotionFile = function(t, e) {
		return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] || null == this.json[this.MOTION_GROUPS][t][e] ? null : this.json[this.MOTION_GROUPS][t][e][this.FILE]
	}, r.prototype.getMotionSound = function(t, e) {
		return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] || null == this.json[this.MOTION_GROUPS][t][e] || null == this.json[this.MOTION_GROUPS][t][e][this.SOUND] ? null : this.json[this.MOTION_GROUPS][t][e][this.SOUND]
	}, r.prototype.getMotionFadeIn = function(t, e) {
		return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] || null == this.json[this.MOTION_GROUPS][t][e] || null == this.json[this.MOTION_GROUPS][t][e][this.FADE_IN] ? 1e3 : this.json[this.MOTION_GROUPS][t][e][this.FADE_IN]
	}, r.prototype.getMotionFadeOut = function(t, e) {
		return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] || null == this.json[this.MOTION_GROUPS][t][e] || null == this.json[this.MOTION_GROUPS][t][e][this.FADE_OUT] ? 1e3 : this.json[this.MOTION_GROUPS][t][e][this.FADE_OUT]
	}, r.prototype.getInitParamID = function(t) {
		return null == this.json[this.INIT_PARAM] || null == this.json[this.INIT_PARAM][t] ? null : this.json[this.INIT_PARAM][t][this.ID]
	}, r.prototype.getInitParamValue = function(t) {
		return null == this.json[this.INIT_PARAM] || null == this.json[this.INIT_PARAM][t] ? NaN : this.json[this.INIT_PARAM][t][this.VALUE]
	}, r.prototype.getInitPartsVisibleNum = function() {
		return null == this.json[this.INIT_PARTS_VISIBLE] ? 0 : this.json[this.INIT_PARTS_VISIBLE].length
	}, r.prototype.getInitPartsVisibleID = function(t) {
		return null == this.json[this.INIT_PARTS_VISIBLE] || null == this.json[this.INIT_PARTS_VISIBLE][t] ? null : this.json[this.INIT_PARTS_VISIBLE][t][this.ID]
	}, r.prototype.getInitPartsVisibleValue = function(t) {
		return null == this.json[this.INIT_PARTS_VISIBLE] || null == this.json[this.INIT_PARTS_VISIBLE][t] ? NaN : this.json[this.INIT_PARTS_VISIBLE][t][this.VALUE]
	}
}]);