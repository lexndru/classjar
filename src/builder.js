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

const { ClassBean } = require('./bean')

/**
 * ClassBuilder is a text template formatter that handlers the content of
 * a ClassBean and outputs a complete JavaScript class.
 *
 * @param jar     ClassBean  Instance of a ClassBean
 * @param name    String     The name of the class to build
 * @param head    String     Class constructor initialization statements
 * @param body    String     Class non-constructor getters/setters methods
 */
class ClassBuilder {
  constructor () {
    this._bean = null
    this._name = null
    this._head = null
    this._body = null
  }

  /**
   * Builder initialization. Must register an instance of Jar otherwise
   * throws an error.
   *
   * @param bean    ClassBean   Instance of a ClassBean
   * @throw         Error       Unexpected argument, must be instance of ClassBean
   */
  use (bean) {
    if (bean instanceof ClassBean) {
      this._bean = bean
      this._name = bean.getName()
      this._head = ''
      this._body = ''
    } else {
      throw new Error(`Unexpected argument, must be instance of ClassBean`)
    }
  }

  /**
   * Build class template from a Jar. Must be called after initialization,
   * otherwise it throws an error.
   *
   * @throw        Error     Must register a Jar before building
   */
  build () {
    if (this._bean == null) {
      throw new Error(`Must register a Jar before building`)
    }
    for (let { prop, attr, guards } of this._bean.all()) {
      this._body += `${attr.getter} () {`
      this._body += `if(this.${attr.prop}==null){`
      this._body += `throw new Error('Property "${prop}" is not set');}`
      this._body += `return this.${attr.prop};}`
      this._body += `${attr.setter} (value) {`
      for (let guard of guards) {
        this._body += `let test = ${guard.toString()};`
        this._body += `if (!test(value)) {`
        this._body += `throw new Error('Unexpected value "`
        this._body += `' + value + '" of type ' + typeof value);}`
      }
      this._body += `this.${attr.prop} = value;}`
      this._head += `this.${attr.prop} = null;`
    }
  }

  /**
   * Dump the content of the class as text template. It can be used after
   * each build call, otherwise it has an undefined behaviour.
   *
   * @return        String     Entire class template
   */
  dump () {
    let name = this._name
    let comm = `// JavaScript class generated with ClassJar`
    let constructor_ = this._head
    let methods = this._body
    let clazz = `class ${name}{constructor(){${constructor_}}${methods}}`
    let out = comm + '\n\n' + clazz + '\n' + `module.exports = ${name};`
    return out
  }
}

module.exports = { ClassBuilder }
