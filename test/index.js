var assert = require('assert');
var path = require('path');
var engineDeps = require('../');

describe('engine dependency reading', function() {
  beforeEach(function() {
    this.fn = engineDeps.__getEngineDeps;
  });

  it('returns an empty object when no key present', function() {
    assert.deepEqual({},
        this.fn(path.join(__dirname, 'mocks/empty.json')));
  });

  it('can read engine deps', function() {
    assert.deepEqual({
      "0.10.x": {"backbone": "latest"},
      "0.12.x": {"lodash": "latest"},
      "^0.12.x": {
        "underscore": "latest",
        "backbone": "latest"
      }
    },
    this.fn(path.join(__dirname, 'mocks/simple.json')));
  });
});

describe('getting valid ranges', function() {
  beforeEach(function() {
    this.fn = engineDeps.__getValidEngineRanges;
  });

  it('returns an empty set when no matching', function() {
    assert.deepEqual([], this.fn('0.1.0', ['0.12.x']));
  });

  it('returns duplicates if defined', function() {
    assert.deepEqual(['0.1.x', '0.1.0'],
        this.fn('0.1.0', ['0.1.x', '0.1.0']));
  });
});

describe('converts dependency hash', function() {
  beforeEach(function() {
    this.fn = engineDeps.__convertDependencyHash;
  });

  it('handles an empty hash', function() {
    assert.deepEqual(this.fn({}), []);
  });

  it('converts single key hash', function() {
    assert.deepEqual(this.fn({
      foo: '0.1.x'
    }), ['foo@0.1.x']);
  });

  it('converts multiple key hash', function() {
    assert.deepEqual(this.fn({
      foo: '0.1.x',
      zap: '0.1.1',
    }), ['foo@0.1.x', 'zap@0.1.1']);
  });
});

