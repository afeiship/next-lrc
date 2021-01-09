/*!
 * name: @jswork/next-lrc
 * description: A javascript lrc parser.
 * homepage: https://github.com/afeiship/next-lrc
 * version: 1.0.9
 * date: 2021-01-09 16:43:46
 * license: MIT
 */

(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var isValidLrc = nx.isValidLrc || require('@jswork/next-is-valid-lrc');
  var clock2time = nx.clock2time || require('@jswork/next-clock2time');
  var DEFAULT_OPTIONS = { filter: isValidLrc };
  var CLOCK_RE = /\[(.*?)\]/;
  var LRC_RE = /\[(.*?)\](.*)/;

  var getTimes = function (current, next) {
    if (!next) return { times: [], duration: 0 };
    var matches1 = CLOCK_RE.exec(current);
    var matches2 = CLOCK_RE.exec(next);
    return {
      times: [matches1[1], matches2[1]],
      duration: clock2time(matches2[1]) - clock2time(matches1[1])
    };
  };

  nx.lrc = function (inContent, inOptions) {
    var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
    var lines = inContent.split('\n').filter(options.filter);
    return lines.map(function (line, index) {
      var next = lines[index + 1];
      var matches = LRC_RE.exec(line);
      var times = getTimes(line, next);
      return nx.mix(
        { clock: matches[1], timestamp: clock2time(matches[1]), value: matches[2] },
        times
      );
    });
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.lrc;
  }
})();
