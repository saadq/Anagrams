(function() {
  'use strict';

  /**
   * Constructor function for Glossary object
   */
  function Glossary(words) {
    this._words = words;
    this._length = this._words.length;
  }

  // Reference to the Glossary prototype
  var glossaryProto = Glossary.prototype;

  /**
   * Returns a random word from the current glossary
   */
  glossaryProto.randWord = function() {
    return this._words[Math.floor(Math.random() * this._length)];
  };

  /**
   * Removes a word from the current glossary
   */
  glossaryProto.removeWord = function(word) {
    var index = this._words.indexOf(word);
    this._words.splice(index, 1);
    this.updateWordCount();
  };

  /**
   * Updates _length of the current glossary
   */
  glossaryProto.updateWordCount = function() {
    this._length = this._words.length;
  };

  /**
   * Shuffles the characters of a String
   */
  String.prototype.shuffle = function() {
    var fragments = this.split('');
    for (var i = fragments.length; i > 0;) {
      var random = parseInt(Math.random() * i);
      var temp = fragments[--i];
      fragments[i] = fragments[random];
      fragments[random] = temp;
    }
    return fragments.join('');
  };

  /**
   * Sorts a String alphabetically
   */
  String.prototype.sort = function() {
    return this.split('').sort().join('');
  };

  /**
   * Replaces one letter of a String with a randomly selected letter
   */
  String.prototype.replaceLetter = function() {
    var index = Math.floor(Math.random() * 100 % this.length);
    var newWord = this.slice(0, index) + this.slice(index + 1);
    newWord += randLetter();
    return newWord;
  };

  /**
   * Checks to see if the given word is a correct answer
   */
  String.prototype.isCorrect = function() {
    return this.sort() === game.correctButton.innerHTML.sort();
  };

  /**
   * Returns a random lowercase letter
   */
  var randLetter = function() {
    return String.fromCharCode(97 + Math.floor(Math.random() * 26));
  };

  // Game object used to to manipulate the timer, score, button choices, current word, and current level
  var game = {};

  // Cacheing elements
  game.currentWord = document.getElementById('current_word'); // The current word being displayed
  game.timer = document.getElementById('timer'); // The timer being displayed
  game.score = document.getElementById('score'); // The player's current score
  game.buttons = document.getElementsByClassName('anagram_button'); // The buttons for the answer choices
  game.lossScreen = document.getElementById('loss_screen'); // Hidden loss screen
  game.finalScore = document.getElementById('final_score'); // Final score displayed on the loss screen
  game.resetButton = document.getElementById('reset'); // Reset button displayed on the loss screen

  // Reference to the current button with the correct answer
  game.correctButton = null;

  // Current difficulty of the game
  game.currentGlossary = null;

  // Level number used to choose the appropriate glossary
  game.level = 0;

  // Score number used to keep track of the player's current score
  game.scoreNum = 0;

  // The remaining time left for the countdown timer
  game.millsecondsLeft = 500;

  // The Glossaries for each of the difficulty levels
  game.glossaries = {
    veryEasy: new Glossary([
      'act', 'all', 'and', 'any', 'are', 'bar', 'but',
      'can', 'car', 'day', 'dew', 'eat', 'far', 'for',
      'get', 'gym', 'has', 'her', 'hey', 'him', 'his',
      'how', 'ink', 'jet', 'key', 'log', 'mad', 'man',
      'nap', 'new', 'not', 'now', 'odd', 'old', 'one',
      'our', 'out', 'pal', 'ram', 'saw', 'see', 'tan',
      'the', 'urn', 'vet', 'was', 'wed', 'you', 'zoo'
    ]),
    easy: new Glossary([
      'aeon', 'aero', 'back', 'bang', 'been', 'bell', 'bios',
      'blog', 'blot', 'bots', 'cafe', 'come', 'edgy', 'fold',
      'from', 'good', 'have', 'here', 'howl', 'just', 'know',
      'like', 'long', 'make', 'many', 'more', 'much', 'navy',
      'only', 'over', 'some', 'spew', 'such', 'tact', 'take',
      'than', 'that', 'them', 'they', 'this', 'time', 'very',
      'want', 'well', 'were', 'when', 'will', 'with', 'your'
    ]),
    medium:  new Glossary([
      'adept', 'aphid', 'aphis', 'apoda', 'apsis', 'arena', 'argon',
      'argus', 'aroph', 'aster', 'augur', 'aurin', 'baric', 'bathe',
      'being', 'beroe', 'chair', 'chart', 'cheer', 'cilia', 'cloud',
      'death', 'delph', 'devil', 'evade', 'exode', 'exult', 'farse',
      'fever', 'flesh', 'flock', 'hepar', 'hexad', 'hocco', 'homer',
      'houri', 'lumen', 'lymph', 'phono', 'photo', 'rheic', 'rhein',
      'rogue', 'romic', 'rosin', 'rouge', 'scrat', 'screw', 'sense'
    ]),
    hard: new Glossary([
      'dossel', 'dosser', 'dosses', 'dossil', 'dotage', 'dotard', 'doters',
      'formee', 'former', 'formes', 'formic', 'formol', 'formyl', 'fornix',
      'ibises', 'icebox', 'icecap', 'iceman', 'icemen', 'ichors', 'icicle',
      'invite', 'invoke', 'inwall', 'inward', 'inwind', 'inwove', 'inwrap',
      'purvey', 'pushed', 'pusher', 'pushes', 'pushup', 'pusley', 'pusses',
      'regret', 'regrew', 'regrow', 'reguli', 'rehabs', 'rehang', 'rehash',
      'sorned', 'sorner', 'sorrel', 'sorrow', 'sorted', 'sorter', 'sortie'
    ]),
    insane: new Glossary([
      'aeriest', 'aerobat', 'aerobes', 'aerobia', 'aerobic', 'aerogel',
      'aerosat', 'aerosol', 'aerugos', 'chortle', 'choughs', 'choused',
      'chouser', 'chouses', 'chowder', 'chowing', 'chowsed', 'chowses',
      'creaked', 'creamed', 'creamer', 'creased', 'creaser', 'creases',
      'created', 'creates', 'creatin', 'diffuse', 'digamma', 'digests',
      'diggers', 'digging', 'dighted', 'digital', 'diglots', 'dignify',
      'echoism', 'eclairs', 'eclipse', 'eclogue', 'ecocide', 'ecology',
      'economy', 'ecotage', 'ecotone', 'faintly', 'fairest', 'fairies',
      'fairing', 'fairish', 'fairway', 'faithed', 'faitour', 'fajitas',
      'idiotic', 'idlesse', 'idolise', 'idolism', 'idolize', 'idylist'
    ]),
    suicidal: new Glossary([
      'agatizes', 'agedness', 'agemates', 'agencies', 'agendums', 'ageneses',
      'agenesia', 'agenesis', 'backwash', 'backwood', 'backwrap', 'backyard',
      'baclofen', 'bacteria', 'bacterin', 'baculine', 'blasters', 'blastier',
      'blasties', 'blasting', 'blastoff', 'blastoma', 'blastula', 'blatancy',
      'cochleas', 'cocinera', 'cockaded', 'cockades', 'cockapoo', 'cockatoo',
      'cockbill', 'cockboat', 'exorcise', 'exorcism', 'exorcist', 'exorcize',
      'exordial', 'exordium', 'exosmose', 'exospore', 'headfish', 'headfuls',
      'headgate', 'headgear', 'headhunt', 'headiest', 'headings', 'headlamp',
      'smuggled', 'smuggler', 'smuggles', 'smugness', 'smushing', 'smutched'
    ])
  };

  /**
   * Updates the current glossary being used based on your current level
   */
  game.updateGlossary = function() {
    // Increase the difficulty after every 5 points earned by the player
    if (this.scoreNum !== 0 && this.scoreNum % 5 === 0) {
      this.levelUp();
    }

    var glossaries = this.glossaries;

    // Choose the glossary based on the current level
    switch (this.level) {
      case 0: this.currentGlossary = glossaries.veryEasy; break;
      case 1: this.currentGlossary = glossaries.easy; break;
      case 2: this.currentGlossary = glossaries.medium; break;
      case 3: this.currentGlossary = glossaries.hard; break;
      case 4: this.currentGlossary = glossaries.insane; break;
      default: this.currentGlossary = glossaries.suicidal; break;
    }
  };

  /**
   * Returns the correct answer for the current word
   */
  game.getCorrectChoice = function(word) {
    var output;

    do {
      output = word.shuffle();
    } while (output === word);

    return output;
  };

  /**
   * Returns an incorrect answer for the current word
   */
  game.getIncorrectChoice = function(word) {
    var output;

    do {
      output = word.replaceLetter();
    } while (output.isCorrect());

    return output.shuffle();
  };

  /**
   * Removes the previous word used and updates the remaining word count of the glossary
   */
  game.removePrevWord = function() {
    var prevWord = this.currentWord.innerHTML;

    // Remove the previous word from the current glossary
    this.currentGlossary.removeWord(prevWord);
  };

  /**
   * Updates the current word with a random word from the current glossary
   */
  game.updateWord = function() {
    // Remove the previous word that was used from the current glossary
    this.removePrevWord();

    // Update the current word to a random word from the current glossary
    this.currentWord.innerHTML = this.currentGlossary.randWord();
  };

  /**
   * Assigns the correct and incorrect choices to each button
   */
  game.updateButtons = function() {
    // Index used with for-loops
    var i;

    // Choose a random button to hold the correct choice
    this.correctButton = this.buttons[Math.floor(Math.random() * 4)];
    this.correctButton.innerHTML = game.getCorrectChoice(this.currentWord.innerHTML);

    // Give the rest of the buttons incorrect choices
    for (i = 0; i < this.buttons.length; i++) {
      if (this.buttons[i] === this.correctButton) { continue; }
      this.buttons[i].innerHTML = game.getIncorrectChoice(this.currentWord.innerHTML);
    }

    // Add event handlers to each button
    for (i = 0; i < this.buttons.length; i++) {
      this.buttons[i].addEventListener('click', this.clickHandler);
    }
  };

  /**
   * Starts the countdown timer
   */
  game.displayTimer = function() {
    // Clear the previous timer
    clearInterval(game.timer);
    game.timer = setInterval(function() {
      if (game.millsecondsLeft === 0) {
        // If the timer reaches zero, clear the timer and end the game
        clearInterval(game.timer);
        game.over();
      } else {
        game.millsecondsLeft--;
      }
      var time = document.getElementById('timer');
      time.innerHTML = (game.millsecondsLeft / 100).toFixed(2);
    }, 10);
  };

  /**
   * Resets the countdown timer
   */
  game.resetTimer = function() {
    game.millsecondsLeft = 500;
  };

  /**
   * Handler for pressing the correct and incorrect buttons
   */
  game.clickHandler = function(event) {
    var clickedButton = event.target;
    if (clickedButton === game.correctButton) {
      game.resetTimer();
      game.updateScore();
      game.removePrevWord();
      game.render();
    } else {
      game.over(clickedButton);
    }
  };

  /**
   * Increments the current level by 1
   */
  game.levelUp = function() {
    this.level++;
  };

  /**
   * Increments the current score by 1
   */
  game.updateScore = function() {
    this.scoreNum++;
    if (this.scoreNum.toString().length < 2) {
      this.scoreNum = '0' + this.scoreNum;
    }
    this.score.innerHTML = 'Score: ' + this.scoreNum;
  };

  /**
   * Displays the loss screen
   */
  game.displayLossScreen = function() {
    // Display the loss screen
    game.lossScreen.style.opacity = '1';
    game.lossScreen.style.zIndex = '10';

    // Display the final score
    game.finalScore.innerHTML = game.scoreNum;

    // Add event handler to the reset button
    game.resetButton.addEventListener('click', function() {
      window.location = 'anagrams.html';
    });
  };

  /**
   * Ends the game
   */
  game.over = function(clickedButton) {
    // Stop the timer
    game.millsecondsLeft = 0;

    // Disable all of the buttons by removing their event handlers
    for (var i = 0; i < this.buttons.length; i++) {
      this.buttons[i].removeEventListener('click', this.clickHandler);
    }

    // If a wrong choice was made, show their incorrect choice in red
    if (clickedButton) {
      clickedButton.style.background = 'red';
      clickedButton.style.border = 'red';
    }

    // Show the correct answer in green
    this.correctButton.style.background = 'green';
    this.correctButton.style.borderWidth = '2px';

    // Display the loss screen
    setTimeout(game.displayLossScreen, 1500);
  };

  /**
   * Renders the current word and button choices
   */
  game.render = function() {
    this.updateGlossary();
    this.updateWord();
    this.updateButtons();
    this.displayTimer();
  };

  game.render();
})();