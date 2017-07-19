import Node from './Node'

export default class Trie {
  constructor() {
    this.root = null;
    this.wordCount = 0;
  }

  insert(string) {
    const node = new Node()

    if (!this.root) {
      this.root = node;
    }

    let letters = [...string.toLowerCase()];
    let currentNode = this.root;

    letters.forEach(letter => {
      if(!currentNode.children[letter]) {
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

    for (let i = 0; i < word.length; i++) {
      currentNode = currentNode.children[word[i]]
    }

    const addLetters = (string, currentNode) => {

      let keys = Object.keys(currentNode.children);

      for (let j = 0; j < keys.length; j++) {
        const child = currentNode.children[keys[j]];

        let newString = string + child.letter;

        if (child.isWord) {
          suggestions.push(newString);
        }
        addLetters(newString, child);
      }
    };

    if (currentNode && currentNode.isWord) {
      suggestions.push(string)
    }
    if (currentNode) {
      addLetters(string, currentNode);
    }
    return suggestions;
  }

  select() {

  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }
}
