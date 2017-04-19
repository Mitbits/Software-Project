class CountDownTimer {
   constructor(duration, granularity) {
    this.duration = duration;
    this.granularity = granularity || 1000;
    this.tickFtns = [];
    this.running = false;
    this.reset = false;
    this.ranFor = duration;

    this.resetTimeText = "";
  }

  start() {
    if (this.running) {
      return;
    }
    this.running = true;
    var start = Date.now(),
        that = this,
        diff, obj;

    (function timer() {
      diff = that.duration - (((Date.now() - start) / 1000) | 0);
      if (diff > 0 && that.reset == false) {
        setTimeout(timer, that.granularity);
      } else {
        diff = 0;
        that.running = false;
      }

      obj = CountDownTimer.parse(diff);
      that.ranFor--;

      that.tickFtns.forEach(function(ftn) {
        ftn.call(this, obj.minutes, obj.seconds);
      }, that);
    }());
  }

  resetTimer() {
    this.reset = true;
  }

  onTick(ftn) {
    if (typeof ftn === 'function') {
      this.tickFtns.push(ftn);
    }
    return this;
  }

  expired() {
    return !this.running;
  }

  static parse(seconds) {
    return {
      'minutes': (seconds / 60) | 0,
      'seconds': (seconds % 60) | 0
    };
  }
}

export {CountDownTimer};
