# next-lrc
> A javascript lrc parser.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-lrc
```

## usage
```js
import '@jswork/next-lrc';
import '@jswork/next-fs-read';

const content = nx.fsRead('./__tests__/E201.lrc', { charset: 'gbk' });
nx.lrc(content);
/*
[
  {
    clock: '00:00.800',
    timestamp: 800,
    value: '--- lesson 1  A private conversation 私人谈话',
    times: [ '00:00.800', '00:06.200' ],
    duration: 5400
  },
  {
    clock: '00:06.200',
    timestamp: 6200,
    value: '--- First listen and then answer the question.^听录音，然后回答以下问题。',
    times: [ '00:06.200', '00:12.120' ],
    duration: 5920
  },
  {
    clock: '00:12.120',
    timestamp: 12120,
    value: '--- Why did the writer complain to the people behind him?',
    times: [ '00:12.120', '00:19.840' ],
    duration: 7720
  },
  // ....
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-lrc/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-lrc
[version-url]: https://npmjs.org/package/@jswork/next-lrc

[license-image]: https://img.shields.io/npm/l/@jswork/next-lrc
[license-url]: https://github.com/afeiship/next-lrc/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-lrc
[size-url]: https://github.com/afeiship/next-lrc/blob/master/dist/next-lrc.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-lrc
[download-url]: https://www.npmjs.com/package/@jswork/next-lrc
