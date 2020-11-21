(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var DEFAULT_OPTIONS = { regexp: /\[(.*?)\](.*)/, callback: nx.stubValue, filter: Boolean };
  var CLOCK_RE = /\[(.*?)\]/;
  var clock2timestamp = function (value) {
    var res = value.split(/[.:]/);
    var minute = parseInt(res[0]);
    var second = parseInt(res[1]);
    var micro = parseInt(res[2]);
    return 60 * 1e3 * minute + 1e3 * second + micro;
  };

  var getDuration = function (current, next) {
    if (!next) return 0;
    var matches1 = CLOCK_RE.exec(current);
    var matches2 = CLOCK_RE.exec(next);
    return clock2timestamp(matches2[1]) - clock2timestamp(matches1[1]);
  };

  nx.lrc = function (inContent, inOptions) {
    var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
    var lines = inContent.split('\n').filter(options.filter);
    return lines.map(function (line, index) {
      var next = lines[index + 1];
      var matches = options.regexp.exec(line);
      var duration = getDuration(line, next);
      return options.callback(
        {
          clock: matches[1],
          timestamp: clock2timestamp(matches[1]),
          duration: duration,
          value: matches[2]
        },
        index
      );
    });
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.lrc;
  }
})();
