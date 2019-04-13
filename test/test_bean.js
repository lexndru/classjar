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

const { ClassBean } = require('../src/bean')


describe('Class Bean', () => {

  it('should accept only string as name', () => {
    let cb = new ClassBean()
    assert.throws(() => cb.setName(null))
    cb.setName('some-class-name')
    assert.equal(cb.getName(), 'SomeClassName')
  })

  it('should accept unique properties', () => {
    let cb = new ClassBean()
    cb.addProperty('first')
    assert.throws(() => cb.addProperty('first'))
    assert.equal(cb._props.size, 1)
  })

  it('should remove property after pop', () => {
    let cb = new ClassBean()
    cb.addProperty('first')
    let prop = cb.removeProperty('first')
    assert.equal(prop, 'first')
  })

  it('should accept multiple property guards', () => {
    let cb = new ClassBean()
    assert.throws(() => cb.addPropertyGuard('second', () => undefined))
    cb.addProperty('second')
    cb.addPropertyGuard('second', v => v + 0 === v)
    assert.equal(cb._props.size, 1)
    assert.equal(cb.getPropertyGuards('second').size, 1)
    cb.addPropertyGuard('second', v => v * 1 === v)
    assert.equal(cb.getPropertyGuards('second').size, 2)
  })

  it('should accept multiple property guards', () => {
    let cb = new ClassBean()
    cb.addProperty('second')
    cb.addPropertyGuard('second', v => v + 0 === v)
    cb.addPropertyGuard('second', v => v * 1 === v)
    assert.equal(cb.getPropertyGuards('second').size, 2)
    cb.removePropertyGuards('second')
    assert.equal(cb.getPropertyGuards('second').size, 0)
  })

})
