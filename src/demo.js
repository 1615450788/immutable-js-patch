'use strict';

var Immutable = require('immutable');
var patch = require('../src/patch');

var value = { slides: [{ size: 1880 }] };
var initData = Immutable.fromJS({ slides: [] });
var diffData = Immutable.fromJS([
  {
    op: 'remove',
    path: '/slides/0/_type',
  }
]);
const newData = patch(initData, diffData);
console.log(newData.toJS())