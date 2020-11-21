/*!
 * name: @jswork/next-lrc
 * description: A javascript lrc parser.
 * homepage: https://github.com/afeiship/next-lrc
 * version: 1.0.4
 * date: 2020-11-21 16:24:23
 * license: MIT
 */

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

  var getTimes = function (current, next) {
    if (!next) return { times: [], duration: 0 };
    var matches1 = CLOCK_RE.exec(current);
    var matches2 = CLOCK_RE.exec(next);
    return {
      times: [matches1[1], matches2[1]],
      duration: clock2timestamp(matches2[1]) - clock2timestamp(matches1[1])
    };
  };

  nx.lrc = function (inContent, inOptions) {
    var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
    var lines = inContent.split('\n').filter(options.filter);
    return lines.map(function (line, index) {
      var next = lines[index + 1];
      var matches = options.regexp.exec(line);
      var times = getTimes(line, next);
      return options.callback(
        nx.mix(
          {
            clock: matches[1],
            timestamp: clock2timestamp(matches[1]),
            value: matches[2]
          },
          times
        ),
        index
      );
    });
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.lrc;
  }
})();
