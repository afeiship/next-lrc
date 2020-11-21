(function () {
  require('../src');

  require('@jswork/next-fs-read');

  describe('api.basic test', () => {
    test('nx.lrc', function () {
      const content = nx.fsRead('./__tests__/E201.lrc', { charset: 'gbk' });
      const res = nx.lrc(content);;
      expect(res.length > 0).toBe(true);
      expect(res[0].clock).toBe('00:00.800');
      expect(res[0].timestamp).toBe(800);
      expect(res[0].value).toBe('--- lesson 1  A private conversation 私人谈话');
    });
  });
})();
