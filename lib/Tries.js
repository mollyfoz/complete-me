import Node from './Node';

export default class Trie {
  constructor() {
    this.root = null;
    this.wordCount = 0;
  }

  insert(string) {
    const node = new Node();

    if (!this.root) {
      this.root = node;
    }

    let letters = [...string.toLowerCase()];
    let currentNode = this.root;

    letters.forEach(letter => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter);
      }
      currentNode = currentNode.children[letter];
    })

    if (!currentNode.isWord) {
      currentNode.isWord = true;
      this.wordCount++;
    }
  }

  count() {
    return this.wordCount;
  }

  suggest(string) {
    let word = [...string.toLowerCase()];
    let currentNode = this.root;
    let suggestions = [];

    word.forEach(letter => {
      if (currentNode) {
        currentNode = currentNode.children[letter];
      }
    })

    const addLetters = (string, currentNode) => {

      let keys = Object.keys(currentNode.children);

      keys.forEach(key => {
        const child = currentNode.children[key];

        let newString = string + child.letter;

        if (child.isWord) {
          suggestions.push({
            name: newString,
            frequency: child.frequency,
            lastTouched: child.lastTouched});
        }
        addLetters(newString, child);
      })
    };

    if (currentNode && currentNode.isWord) {
      suggestions.push({
        name: string,
        frequency: currentNode.frequency,
        lastTouched: currentNode.lastTouched})
    }

    if (currentNode) {
      addLetters(string, currentNode);
    }

    suggestions.sort((a, b) => {
      return b.frequency - a.frequency || b.lastTouched - a.lastTouched;
    })

    return suggestions.map((obj) => {
      return obj.name;
    })
  }

  select(string) {
    let word = [...string.toLowerCase()];
    let currentNode = this.root;

    word.forEach(letter => {
      currentNode = currentNode.children[letter];
    })
    currentNode.frequency++;
    currentNode.lastTouched = Date.now();
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }
}
