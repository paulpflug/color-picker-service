var __vue_template__ = "<div tabindex=\"-1\" v-on=\"click: focusEl\" class=\"color-picker-container\">\n\n  </div>\n  <button v-on=\"click: selectColor\" class=\"btn btn-primary icon icon-paintcan\">Color</button>\n  <button v-on=\"click: unColor\" class=\"btn\">Uncolor</button>";
var ColorPicker;

ColorPicker = null;

module.exports = {
  data: function() {
    return {
      color: null,
      cancelEvent: null,
      scp: null
    };
  },
  ready: function() {
    this.log("ready");
    if (ColorPicker == null) {
      ColorPicker = require("simple-color-picker");
    }
    this.scp = new ColorPicker({
      el: document.querySelector("div.color-picker-service>div.color-picker-container")
    });
    return this.scp.setColor(this.color);
  },
  attached: function() {
    var ref;
    this.log("attached");
    return (ref = this.scp) != null ? ref.setColor(this.color) : void 0;
  },
  detached: function() {
    var ref;
    this.log("detached");
    return (ref = this.cancelEvent) != null ? ref.dispose() : void 0;
  },
  methods: {
    selectColor: function() {
      this.color = this.scp.getHexString();
      this.log(this.color + " selected");
      if (typeof this.cb === "function") {
        this.cb(this.color);
      }
      this.cb = null;
      return this.detach();
    },
    unColor: function() {
      this.log("uncoloring selected");
      if (typeof this.cb === "function") {
        this.cb(false);
      }
      this.cb = null;
      return this.detach();
    },
    detach: function() {
      this.log("detaching");
      if (typeof this.cb === "function") {
        this.cb(void 0);
      }
      this.cb = null;
      try {
        return this.$remove();
      } catch (_error) {

      }
    },
    focusEl: function() {
      return this.$el.focus();
    },
    getRandomColor: function() {
      var color, i, j, letters;
      letters = '0123456789ABCDEF'.split('');
      color = '#';
      for (i = j = 0; j <= 5; i = ++j) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    getNewColor: function(arg, cb) {
      var color, container, x, y;
      x = arg.x, y = arg.y, color = arg.color;
      this.detach();
      this.cb = cb;
      if (color != null) {
        this.color = color;
      } else {
        this.color = this.getRandomColor();
      }
      if (this.$el == null) {
        container = document.createElement("div");
        container.classList.add("color-picker-service");
        container.setAttribute("tabindex", "-1");
        container.addEventListener("blur", (function(_this) {
          return function(e) {
            _this.log("catched blur");
            if (e.relatedTarget.parentNode !== e.target) {
              return _this.detach;
            }
          };
        })(this));
        this.$mount(container);
      }
      this.$el.setAttribute("style", "top:" + y + "px;left:" + x + "px;");
      this.$appendTo(document.body);
      return this.cancelEvent = atom.commands.add("atom-workspace", "core:cancel", this.detach);
    }
  }
};

;(typeof module.exports === "function"? module.exports.options: module.exports).template = __vue_template__;
