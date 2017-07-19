import { expect } from 'chai';
import Trie from '../scripts/Tries'
import Node from '../scripts/Node'
const text = "/usr/share/dict/words"
const fs = require('fs');
let dictionary = fs.readFileSync(text).toString().trim().split('\n')

describe('Trie functionality', () => {

  describe('Insert', () => {

  let completeMe = new Trie();

  beforeEach(function () {
    let completeMe;
  })

    it('should have a root', () => {
      expect(completeMe.root).to.equal(null);
    })

    it('should be able to insert a word and root should be a node', () => {
      completeMe.insert('apple');

      expect(completeMe.root).to.be.instanceOf(Node);
    })

    it('should be able to insert a word and root should have children', () => {
      completeMe.insert('apple');

      expect(completeMe.root.children.a.letter).to.be.equal('a');
      expect(completeMe.root.children.a.children.p.letter).to.equal('p');
    })

    it('should be able to insert a word and last letter has isWord property of true', () => {
      completeMe.insert('app');
      completeMe.insert('apple');

      expect(completeMe.root.children
        .a.children
        .p.children
        .p.children
        .l.children
        .e.letter).to.equal('e');

      expect(completeMe.root.children
        .a.children
        .p.children
        .p.children
        .l.children
        .e.isWord).to.equal(true);

      expect(completeMe.root.children
        .a.children
        .p.children
        .p.letter).to.equal('p');

      expect(completeMe.root.children
        .a.children
        .p.children
        .p
        .isWord).to.equal(true);
    })

    it('should be able to insert multiple words and children objects have multiple properties', () => {
      completeMe.insert('apple');
      completeMe.insert('ape');

      let childKeys = Object.keys(
        completeMe.root
        .children.a
        .children.p
        .children
      );

      expect(childKeys).to.deep.equal(['p', 'e'])

      expect(completeMe.root.children
        .a.children
        .p.children
        .p.children
        .l.children
        .e.letter).to.equal('e');

      expect(completeMe.root.children
        .a.children
        .p.children
        .p.children
        .l.children
        .e.isWord).to.equal(true);
    })

    it('should have nodes that represent incomplete words where isWord is false', () => {
      completeMe.insert('apple');
      completeMe.insert('app');
      completeMe.insert('applesauce');

      expect(
        completeMe.root
        .children.a
        .children.p
        .children.p
        .children.l
        .isWord).to.equal(false);
    })
  })

  describe('count', () => {

    let completeMe;

    beforeEach(function () {
      completeMe = new Trie();
    })

    it('should return number of words inserted', () => {
      expect(completeMe.count()).to.equal(0);
      completeMe.insert('ape');
      expect(completeMe.count()).to.equal(1);
      completeMe.insert('app');
      expect(completeMe.count()).to.equal(2);
      completeMe.insert('apple');
      expect(completeMe.count()).to.equal(3);
    })

    it('should return number of words inserted', () => {
      expect(completeMe.count()).to.equal(0);
      completeMe.insert('ape');
      expect(completeMe.count()).to.equal(1);
      completeMe.insert('ape');
      expect(completeMe.count()).to.equal(1);
    })
  })

  describe('Suggest', () => {
    let completeMe;

    beforeEach(function () {
      completeMe = new Trie();
      completeMe.insert('app');
      completeMe.insert('apple');
      completeMe.insert('applesauce');
      completeMe.insert('apply');
      completeMe.insert('apt');
      completeMe.insert('cat');
      completeMe.insert('x-ray');
    })

    it('should return all children words of suggestion', () => {

      let suggestions = completeMe.suggest('app');

      expect(suggestions).to.deep.equal([ 'app', 'apple', 'applesauce', 'apply' ])

      suggestions = completeMe.suggest('applesb');

      expect(suggestions).to.deep.equal([])

      suggestions = completeMe.suggest('apple');

      expect(suggestions).to.deep.equal([ 'apple', 'applesauce' ])

      suggestions = completeMe.suggest('ca.');

      expect(suggestions).to.deep.equal([])

      suggestions = completeMe.suggest('x');

      expect(suggestions).to.deep.equal([ 'x-ray' ])
    })
  });

  describe('Select', () => {

      let completeMe;

    beforeEach(function () {
      completeMe = new Trie();
    })

    it.skip('should be able to select order of words returned by suggest', () => {
      completeMe.insert('apple');
      completeMe.insert('applesauce');
      completeMe.insert('apply');
      completeMe.insert('app');

      let suggestions = completeMe.suggest('app');

      expect(suggestions).to.deep.equal([ 'app', 'apple', 'applesauce', 'apply' ])
      completeMe.select('apply')
      expect(suggestions).to.deep.equal([ 'app', 'apple', 'applesauce', 'apply' ])
      completeMe.select('apple')
      expect(suggestions).to.deep.equal([ 'apple', 'apply', 'app', 'applesauce' ])
    })
  })

  describe('populate dictionary', () => {
      let completeMe

      beforeEach(function (done) {
        this.timeout(5000)
        completeMe = new Trie()
        completeMe.populate(dictionary)
        done()
      })

      it('should have lots of words after dictionary is populated', () => {
        expect(completeMe.wordCount).to.equal(234371)
      })
    })
})
