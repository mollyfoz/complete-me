import Trie from './Tries.js'
import words from './words.json'
const inputField = $('.user-input');
const textArea = $('.suggested-words');
let newTrie = new Trie();

newTrie.populate(words);

const filterWords = () => {

  let stringInput = $('.user-input').val().toLowerCase();
  let suggestedWords = newTrie.suggest(stringInput);

  $('button').remove();

  for (let i = 0; i < 10; i++) {
    if (suggestedWords[i] !== undefined) {
      textArea.append(`<button class="suggestions">${suggestedWords[i]}</button>`)
    }
  }
}

const selectWord = event => {

  let selected = event.target.innerHTML;

  newTrie.select(selected);
  clearInput();
  clearSuggested();
}

const clearInput = () => {

  inputField.val('');
}

const clearSuggested = () => {

  if (inputField.val() === '') {
    $('button').remove();
  }
}

textArea.on('click', '.suggestions', selectWord);

inputField.on('input', filterWords);
