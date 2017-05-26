(function ($) {
    var defaultOptions = {
        animation : 'type',
        typeSpeed : 80,
        cycleInterval : 6000
    };
    
    function Hints ($this, options) {
        this._$this = $this;
        this._options = $.extend({}, defaultOptions, options);
        this._hintTexts = $this.data('placeholders');
        this._curHint = 0;
        this.start();
    }
    
    Hints.prototype.start = function () {
        var self = this;
        self._nextHint();
    };
    
    Hints.prototype._nextHint = function () {
        var hint = this._getNextHintText();
        this._animateHint(hint, this._options.animation);
    };
    
    Hints.prototype._animateHint = function (hint, animation) {
        var index = 0;
        var self = this;
        var delay = this._options.typeSpeed;

        function animate () {
            index++;
            
            if (index > hint.length) {
                window.setTimeout(function () {
                    self._nextHint();
                }, self._options.cycleInterval);
            } else {
                self._$this.attr('placeholder', hint.substr(0, index));
                window.setTimeout(animate, Math.round(Math.random() * delay));
            }
        }
        
        animate();
    };
    
    Hints.prototype._getNextHintText = function () {
        var hint = this._hintTexts[this._curHint];
        this._curHint = (this._curHint + 1) % this._hintTexts.length;
        
        return hint;
    };
    
    $.fn.hints = function (options) {
        this.each(function () {
            var $this = $(this);
            var hints = $this.data('hints-instance');
            
            if (!hints) {
                hints = new Hints($this, options);
                $this.data('hints-instance', hints);
            }
        });
        
        return this;
    };
}(jQuery));
