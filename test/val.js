describe('val.js', function () {
  'use strict';

  var expect = require('expect.js');
  var path = require('path');

  var ElemMod = require('../lib/elemmod');
  var Mod = require('../lib/mod');
  var Val = require('../lib/val');

  var fixturePath = path.join(__dirname, './fixture');

  describe('value of block\'s modifier', function () {
    describe('derives properties from mod', function () {
      var mod;
      var valPath;
      var val;

      before(function () {
        valPath = path.join(fixturePath,
          'blockA',
          '_modA',
          'blockA_modA_a.js');

        mod = new Mod(path.dirname(valPath));
        val = new Val(valPath, mod);
      });

      it('property name equal a', function () {
        expect(val.name).to.be.equal('a');
      });

      it('property path equal original', function () {
        expect(val.path).to.be.equal(valPath);
      });

      it('property _block equal blockA', function () {
        expect(val._block).to.be.equal('blockA');
      });

      it('property _elem doesn\'t exist', function () {
        expect(val).to.not.have.property('_elem');
      });

      it('property _mod equal _modA', function () {
        expect(val._mod).to.be.equal('_modA');
      });

      it('property _val equal _a', function () {
        expect(val._val).to.be.equal('_a');
      });
    });

    describe('derives properties from path', function () {
      var valPath;
      var val;

      before(function () {
        valPath = path.join(fixturePath,
          'blockA',
          '_modA',
          'blockA_modA_a.js');

        val = new Val(valPath);
      });

      it('property name equal a', function () {
        expect(val.name).to.be.equal('a');
      });

      it('property path equal original path', function () {
        expect(val.path).to.be.equal(valPath);
      });

      it('property _block equal blockA', function () {
        expect(val._block).to.be.equal('blockA');
      });

      it('property _elem doesn\'t exist', function () {
        expect(val).to.not.have.property('_elem');
      });

      it('property _mod equal _modA', function () {
        expect(val._mod).to.be.equal('_modA');
      });

      it('property _val equal _a', function () {
        expect(val._val).to.be.equal('_a');
      });
    });
  });

  describe('value of element\'s modifier', function () {
    describe('derives properties from mod', function () {
      var elemmod;
      var valPath;
      var val;

      before(function () {
        valPath = path.join(fixturePath,
          'blockA',
          'elemA',
          '_modA',
          'blockA__elemA_modA_a.js');

        elemmod = new ElemMod(path.dirname(valPath));
        val = new Val(valPath, elemmod);
      });

      it('property name equal a', function () {
        expect(val.name).to.be.equal('a');
      });

      it('property path equal original path', function () {
        expect(val.path).to.be.equal(valPath);
      });

      it('property _block equal blockA', function () {
        expect(val._block).to.be.equal('blockA');
      });

      it('property _elem equal elemA', function () {
        expect(val._elem).to.be.equal('elemA');
      });

      it('property _mod equal _modA', function () {
        expect(val._mod).to.be.equal('_modA');
      });

      it('property _val equal _a', function () {
        expect(val._val).to.be.equal('_a');
      });
    });

    describe('derives properties from path', function () {
      var valPath;
      var val;

      before(function () {
        valPath = path.join(fixturePath,
          'blockA',
          'elemA',
          '_modA',
          'blockA__elemA_modA_a.js');

        val = new Val(valPath);
      });

      it('property name equal a', function () {
        expect(val.name).to.be.equal('a');
      });

      it('property path equal original path', function () {
        expect(val.path).to.be.equal(valPath);
      });

      it('property _block equal blockA', function () {
        expect(val._block).to.be.equal('blockA');
      });

      it('property _elem equal elemA', function () {
        expect(val._elem).to.be.equal('elemA');
      });

      it('property _mod equal _modA', function () {
        expect(val._mod).to.be.equal('_modA');
      });

      it('property _val equal _a', function () {
        expect(val._val).to.be.equal('_a');
      });
    });
  });
});
