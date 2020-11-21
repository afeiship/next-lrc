(function () {
  require('../src');

  require('@jswork/next-fs-read');

  describe('api.basic test', () => {
    test('nx.lrc', function () {
      const content = nx.fsRead('./__tests__/E201.lrc', { charset: 'gbk' });
      const res = nx.lrc(content);
      // console.log(res);
      expect(res.length > 0).toBe(true);

      // duraiton
      expect(res[0].duration).toBe(5400);
      expect(res[res.length - 1].duration).toBe(0);

      // times
      expect(res[0].times).toEqual(['00:00.800', '00:06.200']);
      expect(res[res.length - 1].times).toEqual([]);

      // other
      expect(res[0].clock).toBe('00:00.800');
      expect(res[0].timestamp).toBe(800);
      expect(res[0].value).toBe('--- lesson 1  A private conversation 私人谈话');
    });
  });
})();
