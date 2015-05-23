/**
 * StringLib object used to manipulate Strings
 * and to make comparisons with the current word from a Glossary
 */
var StringLib = (function() {
  'use strict';

  return {
    /**
     * Shuffles the characters of a String
     */
    shuffle: function(str) {
      var fragments = str.split('');
      for (var i = fragments.length; i > 0;) {
        var random = parseInt(Math.random() * i);
        var temp = fragments[--i];
        fragments[i] = fragments[random];
        fragments[random] = temp;
      }
      return fragments.join('');
    },

    /**
     * Sorts a String alphabetically
     */
    sort: function(str) {
      return str.split('').sort().join('');
    },

    /**
     * Returns a random lowercase letter
     */
    randLetter: function() {
      return String.fromCharCode(97 + Math.floor(Math.random() * 26));
    },

    /**
     * Replaces one letter of a String with a randomly selected letter
     */
    replaceLetter: function(str) {
      var index = Math.floor(Math.random() * 100 % str.length);
      var newWord = str.slice(0, index) + str.slice(index + 1);
      newWord += this.randLetter();
      return newWord;
    },

    /**
     * Checks to see if the given word is a correct answer
     */
    isCorrect: function(str, correctAnswer) {
      return this.sort(str) === this.sort(correctAnswer);
    }
  };
})();
