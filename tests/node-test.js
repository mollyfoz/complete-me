import { expect } from 'chai';
import Node from '../lib/Node';

describe ('Node functionality', () => {
  let node;

  beforeEach(() => {
    node = new Node()
  })

  it('should be a thing', () => {
    expect(node).to.exist
  })

  it('should start with null as its default letter', () => {
    expect(node.letter).to.equal(null)
  })

  it('should not start out as a word', () => {
    expect(node.isWord).to.equal(false);
  })

  it('should have no children', () => {
    expect(node.children).to.deep.equal({});
  })
})
