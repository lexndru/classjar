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

const { capitalize, pascalize, EMPTY_STRING } = require('./text')

/**
 * Attribute is an util class helper to generate private properties,
 * getters and setters for an anonymous class.
 *
 * The only accepted characters as part of the attribute name are letter,
 * both lowercase and uppercase. Attributes are "camelcased". An optional
 * delimiter can be used to increase readability.
 *
 * @param string      String    The string to form an attribute
 * @param delimiter   String    The string to "space out" the string
 */
class Attribute {
  constructor (string, delimiter = EMPTY_STRING) {
    this._delimiter = delimiter.toString()
    this._str = string.toString()
    this._attr = EMPTY_STRING
    this._badCharPos = new Map()
    this._size = this._str.length - 1
    this._validated = false
  }

  /**
   * Private Property
   *
   * Returns a prefixed attribute name as a private property of the instance,
   * otherwise it throws an error if build() hasn't been called. The prefix
   * (two leading underscores) is inspred by Python's name mangling.
   * https://en.wikipedia.org/wiki/Name_mangling
   *
   * @throw     Error       Must build class attribute before calling property
   * @return    String      Private property name
   */
  get prop () {
    if (this._attr.length > 0) {
      return `__${this._attr.toLowerCase()}`
    }
    throw new Error(`Must build class attribute before calling property`)
  }

  /**
   * Getter Method
   *
   * Returns a prefixed method name as an instance getter for an attribute,
   * otherwise it throws an error if build() hasn't been called.
   *
   * @throw     Error       Must build class attribute before calling getter
   * @return    String      Getter method name
   */
  get getter () {
    if (this._attr.length > 0) {
      return `get${this._attr}`
    }
    throw new Error(`Must build class attribute before calling getter`)
  }

  /**
   * Setter Method
   *
   * Returns a prefixed method name as an instance setter for an attribute,
   * otherwise it throws an error if build() hasn't been called.
   *
   * @throw     Error       Must build class attribute before calling setter
   * @return    String      Setter method name
   */
  get setter () {
    if (this._attr.length > 0) {
      return `set${this._attr}`
    }
    throw new Error(`Must build class attribute before calling setter`)
  }

  /**
   * Build an attribute from a string. It follows the pascal case notation.
   * https://en.wikipedia.org/wiki/Camel_case
   */
  build () {
    if (this._delimiter.length > 0) {
      this._attr = pascalize(this._str, this._delimiter)
    } else {
      this._attr = capitalize(this._str)
    }
  }

  /**
   * Check if a string can be used as an attribute. It allows one delimiter
   * and accepts only letters, from A to Z (both lowercase and uppercase).
   *
   * Throws an error if invalid characters are found.
   *
   * @throw     Error          Unexpected chars in attribute name
   * @return    Attribute      Self-instance
   */
  validate () {
    for (let i = 0; i <= this._size; i++) {
      let c = this._str.charCodeAt(i)
      if (c === this._delimiter.charCodeAt(0) && i > 0 && i < this._size) {
        continue
      }
      if ((c < 65) || (c > 90 && c < 97) || (c > 122)) {
        this._badCharPos.set(i, c)
      }
    }
    this._validated = true
    if (this.isInvalid()) {
      throw new Error(`Unexpected chars in attribute name`)
    }
    return this
  }

  /**
   * Returns if a string has been validated and can be used as an attribute.
   * Throws an error if the validate() method hasn't been called.
   *
   * @return    Error       Must run validate method before calling this
   * @return    Boolean     Whether string is invalid or not
   */
  isInvalid () {
    if (this._validated) {
      return this._badCharPos.size > 0
    }
    throw new Error(`Must run validate method before calling this`)
  }

  /**
   * Returns list of pairs <index, char> with invalid characters found.
   * Throws an error if the validate() method hasn't been called.
   *
   * @return    Error       Must run validate method before calling this
   * @return    Array       An array of arrays of size two with index and char
   */
  get invalidChars () {
    if (this._validated) {
      return this._badCharPos.entries()
    }
    throw new Error(`Must run validate method before calling this`)
  }

  /**
   * Class helper method to quickly validate and build an attribute from
   * a string. Has a dot as a delimiter.
   *
   * @param string    String         String to generate class attribute
   * @param delim     String         Attribute delimitator string
   * @return          Attribute      Instance of Attribute
   */
  static from (string, delim = '.') {
    let attr = new Attribute(string, delim)
    attr.validate().build()
    return attr
  }
}

module.exports = { Attribute }
