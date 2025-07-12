/*let words = ['COOKIE', 'CUPCAKE', 'CAKE', 'BREAD'];
let letters = ['C', 'O', 'O', 'K', 'I', 'E', 'C', 'U', 'P', 'C', 'A', 'K', 'E', 'B', 'R', 'E', 'A', 'D'];

function createWordBank() {
    const wordBank = document.getElementById('word-bank');
    words.forEach(word => {
        const wordElement = document.createElement('div');
        wordElement.textContent = word;
        wordBank.appendChild(wordElement);
    });
}

function createCookieBoard() {
    const board = document.getElementById('cookie-board');
    letters.forEach(letter => {
        const letterElement = document.createElement('div');
        letterElement.textContent = letter;
        letterElement.className = 'cookie-letter';
        board.appendChild(letterElement);
    });
}

createWordBank();
createCookieBoard();*/
const wordsByGrade = {
    1: ['cat', 'dog', 'sun', 'hat', 'run', 'bat', 'map', 'fan', 'pen', 'bag',
        'top', 'car', 'leg', 'box', 'toy', 'cap', 'bed', 'red', 'man', 'jam',
        'bug', 'net', 'cup', 'lip', 'pit', 'tip', 'log', 'pan', 'ten', 'wig',
        'van', 'fig', 'mud', 'zip', 'tap', 'win', 'hop', 'dot'],
    2: ['apple', 'chair', 'brush', 'green', 'plant', 'truck', 'house', 'cloud',
        'zebra', 'table', 'spoon', 'candy', 'lemon', 'piano', 'bread', 'mouse',
        'light', 'stone', 'water', 'sweet', 'drink', 'train', 'grape', 'shape',
        'fruit', 'glass', 'sleep', 'skate', 'slide', 'frame', 'grass', 'snack',
        'brick', 'shirt', 'crane', 'jelly', 'witch', 'crowd'],
    3: ['school', 'garden', 'pencil', 'window', 'rocket', 'orange', 'pillow',
        'doctor', 'purple', 'rabbit', 'vacuum', 'shovel', 'drawer', 'animal',
        'bottle', 'basket', 'castle', 'circle', 'planet', 'should', 'danger',
        'forest', 'bridge', 'driver', 'hammer', 'jacket', 'mirror', 'object',
        'number', 'pocket', 'silver', 'throat', 'united', 'winter', 'wizard',
        'zigzag', 'friend'],
    4: ['library', 'teacher', 'picture', 'holiday', 'present', 'country',
        'freedom', 'history', 'journey', 'natural', 'science', 'subject',
        'weather', 'monster', 'pattern', 'quarter', 'respect', 'station',
        'victory', 'without', 'article', 'balance', 'capital', 'develop',
        'explain', 'feather', 'grammar', 'husband', 'imagine', 'justice',
        'kitchen', 'laundry', 'measure', 'network', 'opinion', 'project',
        'quality', 'rescue'],
    5: ['language', 'activity', 'elephant', 'triangle', 'mountain', 'knowledge',
        'adventure', 'education', 'agreement', 'attention', 'challenge',
        'community', 'condition', 'direction', 'engineer', 'foundation',
        'government', 'happiness', 'importance', 'investment', 'judgement',
        'leadership', 'management', 'navigation', 'operation', 'population',
        'reduction', 'scientist', 'technology', 'volunteer', 'wonderful',
        'experience', 'discipline', 'philosophy', 'reputation', 'ambitious',
        'brilliant', 'curiosity', 'determined']
  };
  
  let currentWord = '';
  let selectedLetters = [];
  let score = 0;
  
  function loadWords() {
    const grade = document.getElementById('grade-select').value;
    const wordList = wordsByGrade[grade];
    currentWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
    selectedLetters = [];
  
    document.getElementById('feedback-message').innerText = '';
    document.getElementById('word-meaning').innerText = '';
  
    const slotsContainer = document.getElementById('word-slots');
    slotsContainer.innerHTML = '';
    for (let i = 0; i < currentWord.length; i++) {
      const slot = document.createElement('div');
      slot.classList.add('slot');
      slot.dataset.index = i;
      slotsContainer.appendChild(slot);
    }
  
    displayLetters(currentWord.split(''));
  }
  
  function displayLetters(letters) {
    const wheel = document.getElementById('letter-wheel');
    wheel.innerHTML = '';
  
    const shuffled = [...letters].sort(() => Math.random() - 0.5);
  
    shuffled.forEach(letter => {
      const el = document.createElement('div');
      el.classList.add('letter');
      el.innerText = letter;
      el.addEventListener('click', function () {
        selectLetter(letter, el);
      });
      wheel.appendChild(el);
    });
  }
  
  function selectLetter(letter, el) {
    const slots = document.querySelectorAll('.slot');
    for (let slot of slots) {
      if (!slot.innerText) {
        slot.innerText = letter;
        selectedLetters.push({ letter, el });
        el.classList.add('used-letter');
        el.style.pointerEvents = 'none';
        break;
      }
    }
  
    if (selectedLetters.length === currentWord.length) {
      checkWord();
    }
  }
  
  function checkWord() {
    const formed = selectedLetters.map(obj => obj.letter).join('');
    const feedback = document.getElementById('feedback-message');
    const meaningBox = document.getElementById('word-meaning');
  
    if (formed === currentWord) {
      feedback.innerText = '✅ Correct! Well done!';
      score += 2;
      document.getElementById('score').innerText = `Score: ${score}`;
      fetchDefinition(currentWord);
    } else {
      feedback.innerText = '❌ Try again!';
      meaningBox.innerText = '';
    }
  }
  
  function resetLetters() {
    const slots = document.querySelectorAll('.slot');
    slots.forEach(slot => slot.innerText = '');
    selectedLetters.forEach(obj => {
      obj.el.style.pointerEvents = 'auto';
      obj.el.classList.remove('used-letter');
    });
    selectedLetters = [];
  
    document.getElementById('feedback-message').innerText = '';
    document.getElementById('word-meaning').innerText = '';
  }
  
  function shuffleLetters() {
    if (currentWord) displayLetters(currentWord.split(''));
  }
  
  function fetchDefinition(word) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`)
      .then(response => response.json())
      .then(data => {
        const meaningBox = document.getElementById('word-meaning');
        if (data && data.length > 0 && data[0].meanings.length > 0) {
          const definition = data[0].meanings[0].definitions[0].definition;
          meaningBox.innerText = `📖 Meaning of "${word.toLowerCase()}": ${definition}`;
        } else {
          meaningBox.innerText = `📖 Meaning not found for "${word.toLowerCase()}"`;
        }
      })
      .catch(error => {
        document.getElementById('word-meaning').innerText = '📖 Error fetching meaning.';
      });
  }
  