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

const { typed } = require('./type')

const { Loader } = require('./loader')

const { ClassBean } = require('./bean')
const { ClassCraft } = require('./craft')
const { ClassBuilder } = require('./builder')

/**
 * ClassJar is a higher-level class util to generate JavaScript classes
 * from beans. It supports JSON and JS modules as class beans.
 *
 * @param file       String       Filepath to bean
 * @param content    Array        Pairs of properties-guards
 * @param beanjar    ClassBean    Instance of beans container
 * @param clazz      ClassCraft   Instance of class crafter
 */
class ClassJar {
  constructor (fp) {
    this._file = fp
    this._beanjar = new ClassBean()
    this._content = []
    this._clazz = null
  }

  /**
   * Load content of JSON as bean
   */
  async loadJSON () {
    let { name, data } = await Loader.fetch(this._file).json()
    this._beanjar.setName(name)
    this._content = Object.entries(data)
  }

  /**
   * Load JS module as bean
   */
  async loadModule () {
    let { name, data } = await Loader.fetch(this._file).module()
    this._beanjar.setName(name)
    this._content = Object.entries(data)
  }

  /**
   * Loop through content and update the Jar with class properties,
   * guards and other type checks. It throws an error if a property
   * has an unsupported guard.
   *
   * @throw       Error         Unsupported guard type: value
   * @return      ClassJar      Self-instance
   */
  setup () {
    for (let [field, type] of this._content) {
      let typecheck
      if (typed('string')(type)) {
        typecheck = typed(type)
      } else if (typed('func')(type)) {
        typecheck = type
      } else {
        throw new Error(`Unsupported guard ${typeof type}: ${type}`)
      }
      this._beanjar.addProperty(field)
      this._beanjar.addPropertyGuard(field, typecheck)
    }
    return this
  }

  /**
   * Initialize a class builder to create the JavaScript class from
   * all gathered beans in the ClassJar. An additional class crafter
   * is being used to format the output.
   *
   * @return      ClassJar      Self-instance
   */
  build () {
    let builder = new ClassBuilder()
    builder.use(this._beanjar)
    builder.build()
    this._clazz = ClassCraft.New(builder, this._file)
    return this
  }

  /**
   * ClassBean instance getter
   */
  get bean () {
    return this._beanjar
  }

  /**
   * ClassCraft instance getter
   */
  get clazz () {
    return this._clazz
  }

  /**
   * ClassJar helper method to bootstrap from JS module
   *
   * @param src     String      Path to source bean
   * @return        ClassJar    Instance of ClassJar
   */
  static async js (src) {
    let jar = new ClassJar(src)
    await jar.loadModule()
    return jar.setup().build()
  }

  /**
   * ClassJar helper method to bootstrap from JSON file
   *
   * @param src     String      Path to source bean
   * @return        ClassJar    Instance of ClassJar
   */
  static async json (src) {
    let jar = new ClassJar(src)
    await jar.loadJSON()
    return jar.setup().build()
  }
}

module.exports = { ClassJar }
