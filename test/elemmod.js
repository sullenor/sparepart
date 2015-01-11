describe('elemmod.js', function () {
  'use strict';

  var expect = require('expect.js');
  var path = require('path');

  var Elem = require('../lib/elem');
  var ElemMod = require('../lib/elemmod');

  var fixturePath = path.join(__dirname, './fixture');

  describe('mod derives properties from block', function () {
    var modPath;
    var mod;

    before(function () {
      modPath = path.join(fixturePath,
        'blockA',
        'elemA',
        '_modA');

      var elem = new Elem(path.dirname(modPath));
      mod = new ElemMod(modPath, elem);
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

    it('property _elem equal elemA', function () {
      expect(mod._elem).to.be.equal('elemA');
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
        'elemA',
        '_modA');

      mod = new ElemMod(modPath);
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

    it('property _elem equal elemA', function () {
      expect(mod._elem).to.be.equal('elemA');
    });

    it('property _mod equal modA', function () {
      expect(mod._mod).to.be.equal('_modA');
    });
  });
});
