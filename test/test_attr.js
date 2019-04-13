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

const { Attribute } = require('../src/attr')


describe('Class Attributes', () => {

  let goodAttrName = 'user email address'
  let badAttrName = ' user email addres#'

  it('should allow letters and pascalize attribute', () => {
    let a = new Attribute(goodAttrName, ' ')
    a.validate().build()
    assert.equal(a._attr, 'UserEmailAddress')
  })

  it('should allow letters and mangle property', () => {
    let a = new Attribute(goodAttrName, ' ')
    a.validate().build()
    assert.equal(a.prop, '__useremailaddress')
  })

  it('should allow letters and create getter', () => {
    let a = new Attribute(goodAttrName, ' ')
    a.validate().build()
    assert.equal(a.getter, 'getUserEmailAddress')
  })

  it('should allow letters and create setter', () => {
    let a = new Attribute(goodAttrName, ' ')
    a.validate().build()
    assert.equal(a.setter, 'setUserEmailAddress')
  })

  it('should fail for non-letters', () => {
    let a = new Attribute(badAttrName, ' ')
    assert.throws(() => a.validate().build())
  })

})
