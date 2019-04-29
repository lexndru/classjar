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
const fs = require('fs')

const { ClassJar } = require('../src/jar')

describe('Main', () => {

  let bean1 = path.resolve('samples', 'beans', 'person.json')
  let dump1 = path.resolve('samples', 'classes', 'person.js')

  let bean2 = path.resolve('samples', 'beans', 'software-developer.js')
  let dump2 = path.resolve('samples', 'classes', 'software-developer.js')

  let bean3 = path.resolve('samples', 'beans', 'employee.js')
  let dump3 = path.resolve('samples', 'classes', 'employee.js')

  it('should convert JSON bean into JS class', async () => {
    const jar = await ClassJar.json(bean1)
    let clazz = await jar.clazz.preview()
    fs.readFile(dump1, (e, data) => {
      assert.equal(clazz.toString(), data.toString())
    })
  })

  it('should convert simple JS bean into JS class', async () => {
    const jar = await ClassJar.js(bean2)
    let clazz = await jar.clazz.preview()
    fs.readFile(dump2, (e, data) => {
      assert.equal(clazz.toString(), data.toString())
    })
  })

  it('should convert complex JS bean into JS class', async () => {
    const jar = await ClassJar.js(bean3)
    let clazz = await jar.clazz.preview()
    fs.readFile(dump3, (e, data) => {
      assert.equal(clazz.toString(), data.toString())
    })
  })

  it('should serialize generated classes', async () => {
    const Person = require(dump1)
    let p1 = new Person()
    p1.setFirstName('alexandru')
    let obj = Person.Dump(p1)
    let p2 = Person.Load(obj)
    assert.equal(p1.getFirstName(), p2.getFirstName())
  })

})
