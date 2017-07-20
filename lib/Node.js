export default class Node {
  constructor(letter = null) {
    this.isWord = false;
    this.letter = letter;
    this.children = {};
    this.frequency = 0;
    this.lastTouched = 0;
  }
}
