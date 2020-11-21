/*!
 * name: @jswork/next-lrc
 * description: A javascript lrc parser.
 * homepage: https://github.com/afeiship/next-lrc
 * version: 1.0.0
 * date: 2020-11-21 12:25:02
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var DEFAULT_OPTIONS = { regexp: /\[(.*?)\](.*)/ };
  var clock2timestamp = function (value) {
    var res = value.split(/[.:]/);
    var minute = parseInt(res[0]);
    var second = parseInt(res[1]);
    var micro = parseInt(res[2]);
    return 60 * 1e3 * minute + 1e3 * second + micro;
  };

  nx.lrc = function (inContent, inOptions) {
    var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
    var lines = inContent.split('\n');
    return lines.map(function (line) {
      var matches = options.regexp.exec(line);
      return {
        clock: matches[1],
        timestamp: clock2timestamp(matches[1]),
        value: matches[2]
      };
    });
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.lrc;
  }
})();
