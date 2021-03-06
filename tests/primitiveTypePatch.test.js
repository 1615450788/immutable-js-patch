'use strict';

var Immutable = require('immutable');
var assert = require('assert');
var patch = require('../src/patch');

describe('primitive types patch', function () {
  it('returns same value when ops are empty', function () {
    var value = 1;
    var result = patch(value, Immutable.fromJS([]));

    assert.equal(result, value);
  });

  it('replaces numbers', function () {
    var value = 1;
    var newValue = 10;
    var result = patch(
      value,
      Immutable.fromJS([{ op: 'replace', path: '/', value: newValue }])
    );

    assert.equal(result, newValue);
  });

  it('replaces strings', function () {
    var value = '1';
    var newValue = '10';
    var result = patch(
      value,
      Immutable.fromJS([{ op: 'replace', path: '/', value: newValue }])
    );

    assert.equal(result, newValue);
  });

  it('replaces arrays', function () {
    var value = [1];
    var newValue = [10];
    var result = patch(
      value,
      Immutable.List([
        Immutable.Map({ op: 'replace', path: '/', value: newValue }),
      ])
    );

    assert.deepEqual(result, newValue);
  });

  it('replaces objects', function () {
    var value = { a: 1 };
    var newValue = { b: 2 };
    var result = patch(
      value,
      Immutable.List([
        Immutable.Map({ op: 'replace', path: '/', value: newValue }),
      ])
    );

    assert.deepEqual(result, newValue);
  });

  it('when op is remove returns null', function () {
    var value = { a: 1 };
    var result = patch(
      value,
      Immutable.List([Immutable.Map({ op: 'remove', path: '/' })])
    );

    assert.equal(result, null);
  });

  

  it('移除空属性', function () {
    var value = { slides: [] };
    var initData = Immutable.fromJS({ slides: [] });
    var diffData = Immutable.fromJS([
      {
        op: 'remove',
        path: '/slides/0/_type',
      }
    ]);
    const newData = patch(initData, diffData);
    assert.deepEqual(newData.toJS(),value);
  });

  it('添加新属性', function () {
    var value = { slides: [{size:1880}] };
    var initData = Immutable.fromJS({ slides: [] });
    var diffData = Immutable.fromJS([
      {
        op: 'add',
        path: '/slides/0/size',
        value: 1880,
      },
    ]);
    const newData = patch(initData, diffData);
    assert.deepEqual(newData.toJS(), value);
  });
  
  it('移除空属性后添加新属性', function () {
    var value = { slides: [{size:1880}] };
    var initData = Immutable.fromJS({ slides: [] });
    var diffData = Immutable.fromJS([
      {
        op: 'remove',
        path: '/slides/0/_type',
      },
      {
        op: 'add',
        path: '/slides/0/size',
        value: 1880,
      },
    ]);
    const newData = patch(initData, diffData);
    assert.deepEqual(newData.toJS(), value);
  });
});
