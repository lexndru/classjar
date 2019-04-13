// Copyright (c) 2019 Alexandru Catrina <alex@codeissues.net>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

const EMPTY_STRING = ''

/**
 * Uppercase the first letter of a given string argument or throw an error
 * if argument is invalid.
 *
 * @param word  String      String to be transformed
 * @throw       Error       Cannot transform text if argument is not string
 * @throw       Error       Cannot process empty string
 * @return      String      Capitalized string
 */
const capitalize = (word) => {
  if (!word || word.toString() !== word) {
    throw new Error(`Cannot transform text if argument is not string`)
  }
  if (word.length >= 2) {
    return word.charAt(0).toUpperCase() + word.substring(1)
  }
  if (word.length === 1) {
    return word.charAt(0).toUpperCase()
  }
  throw new Error(`Cannot process empty string`)
}

/**
 * Transform a given string argument into its pascal case representation
 * or throw an error if argument is invalid.
 *
 * It affects only lowercase letters.
 *
 * @param words       String      String to be transformed
 * @param delimiter   String      Delimiter used to "space out" string
 * @throw             Error       Cannot transform if words is not string
 * @throw             Error       Cannot transform if delimiter is not string
 * @return            String      Camelcased string
 */
const pascalize = (words, delimiter) => {
  if (!words || words.toString() !== words) {
    throw new Error(`Cannot transform if words is not string`)
  }
  if (!delimiter || delimiter.toString() !== delimiter) {
    throw new Error(`Cannot transform if delimiter is not string`)
  }
  let word = ''
  words.split(delimiter).forEach(w => {
    word += capitalize(w)
  })
  return word
}

module.exports = { EMPTY_STRING, capitalize, pascalize }
