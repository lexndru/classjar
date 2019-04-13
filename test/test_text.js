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

const assert = require('assert')
const path = require('path')

const { pascalize, capitalize } = require('../src/text')


describe('Text utils', () => {

  let word = 'nodejs'
  let moreWords = 'this is a nodejs module'

  it('should uppercase first letter of word', () => {
    assert.equal(capitalize(word), 'Nodejs')
  })

  it('should throw error if non-string or empty string', () => {
    assert.throws(() => capitalize(null))
    assert.throws(() => capitalize(''))
    assert.throws(() => pascalize(''))
    assert.throws(() => pascalize('test', null))
  })

  it('should uppercase first letter of each word', () => {
    assert.equal(pascalize(moreWords, ' '), 'ThisIsANodejsModule')
  })

})
