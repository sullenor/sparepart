describe('block.js', function () {
  'use strict';

  var expect = require('expect.js');
  var path = require('path');

  var Block = require('../lib/block');

  describe('has()', function () {
    var block;
    var file;

    before(function (next) {
      block = new Block(path.join(__dirname, './fixture/blockA'));
      block.once('done', next);
      block.once('README.md', function (err, filepath) {
        file = filepath;
      });
      block.has('README.md');
    });

    it('block found a file', function () {
      expect(file).to.be.a('string');
    });

    it('block has file README.md', function () {
      expect(path.basename(file)).to.be.eql('README.md');
    });
  });

  describe('read()', function () {
    var block;

    before(function (next) {
      block = new Block(path.join(__dirname, './fixture/blockA'));
      block.once('done', next);
      block.read();
    });

    it('block has array of elems', function () {
      expect(block.elems).to.be.an('array');
    });

    it('block has elem elemA', function () {
      expect(block.elems).to.have.length(1);
      expect(block.elems[0].name).to.be.eql('elemA');
    });

    it('block has array of mods', function () {
      expect(block.mods).to.be.an('array');
    });

    it('block has mod modA', function () {
      expect(block.mods).to.have.length(1);
      expect(block.mods[0].name).to.be.eql('modA');
    });

    it('modA has array of vals', function () {
      expect(block.mods[0].vals).to.be.an('array');
    });
  });
});
