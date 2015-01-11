describe('elem.js', function () {
  'use strict';

  var expect = require('expect.js');
  var path = require('path');

  var Block = require('../lib/block');
  var Elem = require('../lib/elem');

  var fixturePath = path.join(__dirname, './fixture');

  describe('derives properties from block', function () {
    var elemPath;
    var elem;

    before(function () {
      elemPath = path.join(fixturePath,
        'blockA',
        'elemA');

      var block = new Block(path.dirname(elemPath));
      elem = new Elem(elemPath, block);
    });

    it('property name equal elemA', function () {
      expect(elem.name).to.be.equal('elemA');
    });

    it('property path equal original path', function () {
      expect(elem.path).to.be.equal(elemPath);
    });

    it('property _block equal blockA', function () {
      expect(elem._block).to.be.equal('blockA');
    });

    it('property _elem equal elemA', function () {
      expect(elem._elem).to.be.equal('elemA');
    });
  });

  describe('derives properties from path', function () {
    var elemPath;
    var elem;

    before(function () {
      elemPath = path.join(fixturePath,
        'blockA',
        'elemA');

      elem = new Elem(elemPath);
    });

    it('property name equal elemA', function () {
      expect(elem.name).to.be.equal('elemA');
    });

    it('property path equal original path', function () {
      expect(elem.path).to.be.equal(elemPath);
    });

    it('property _block equal blockA', function () {
      expect(elem._block).to.be.equal('blockA');
    });

    it('property _elem equal elemA', function () {
      expect(elem._elem).to.be.equal('elemA');
    });
  });

  describe('also parses elem folder with double lodash', function () {
    var elemPath;
    var elem;

    before(function () {
      elemPath = path.join(fixturePath,
        'blockB',
        '__elemA');

      elem = new Elem(elemPath);
    });

    it('property name equal elemA', function () {
      expect(elem.name).to.be.equal('elemA');
    });

    it('property path equal original path', function () {
      expect(elem.path).to.be.equal(elemPath);
    });

    it('property _block equal blockB', function () {
      expect(elem._block).to.be.equal('blockB');
    });

    it('property _elem equal __elemA', function () {
      expect(elem._elem).to.be.equal('__elemA');
    });
  });
});
