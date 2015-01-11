describe('mod.js', function () {
  'use strict';

  var expect = require('expect.js');
  var path = require('path');

  var Block = require('../lib/block');
  var Mod = require('../lib/mod');

  var fixturePath = path.join(__dirname, './fixture');

  describe('mod derives properties from block', function () {
    var block;
    var modPath;
    var mod;

    before(function () {
      modPath = path.join(fixturePath,
        'blockA',
        '_modA');

      block = new Block(path.dirname(modPath));
      mod = new Mod(modPath, block);
    });

    it('property name equal modA', function () {
      expect(mod.name).to.be.equal('modA');
    });

    it('property path equal original path', function () {
      expect(mod.path).to.be.equal(modPath);
    });

    it('property _block equal blockA', function () {
      expect(mod._block).to.be.equal('blockA');
    });

    it('property _mod equal modA', function () {
      expect(mod._mod).to.be.equal('_modA');
    });
  });

  describe('mod derives properties from path', function () {
    var modPath;
    var mod;

    before(function () {
      modPath = path.join(fixturePath,
        'blockA',
        '_modA');

      mod = new Mod(modPath);
    });

    it('property name equal modA', function () {
      expect(mod.name).to.be.equal('modA');
    });

    it('property path equal original path', function () {
      expect(mod.path).to.be.equal(modPath);
    });

    it('property _block equal blockA', function () {
      expect(mod._block).to.be.equal('blockA');
    });

    it('property _mod equal modA', function () {
      expect(mod._mod).to.be.equal('_modA');
    });
  });
});
