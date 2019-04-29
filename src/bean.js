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

const { Attribute } = require('./attr')
const { pascalize } = require('./text')

/**
 * ClassBean is a container/vessel type class to hold properties, guards and
 * class name. All properties are transformed into Attributes.
 *
 * @param name    String    The name of the class
 * @param props   Map       Unique set of class properties
 * @param guards  Map       Map between properties and guards
 */
class ClassBean {
  constructor () {
    this._name = null
    this._props = new Map()
    this._guards = new Map()
  }

  /**
   * Class name setter.
   *
   * The class name follows a PascalCase styling. Only lowercase letters
   * are affected. Throws an error if argument is not a string or is empty.
   *
   * @param name    String      The name of the class
   * @throws        Error       Class name must be string, got name
   * @throws        Error       Class name must be string, got empty argument
   */
  setName (name) {
    if (name.toString() !== name) {
      throw new Error(`Class name must be string, got ${typeof name}`)
    }
    if (name.length === 0) {
      throw new Error(`Class name must be string, got empty argument`)
    }
    this._name = pascalize(name, '-')
  }

  /**
   * Class name getter.
   *
   * Returns the class name if is set, otherwise throws an error. The class
   * name follows a PascalCase styling. Only lowercase letters are affected.
   *
   * @throws        Error       Class name is not set
   * @return        String      The name of the class
   */
  getName () {
    if (this._name && this._name.length > 0) {
      return this._name
    }
    throw new Error(`Class name is not set`)
  }

  /**
   * Create class property
   *
   * Add new property to class or throw an error if property already exists
   *
   * @param prop        String      New property to add
   * @param value       Object      Default property value (optional)
   * @param immutable   Boolean     If true, value cannot be changed afterwards
   * @throws            Error       Propery prop already exists
   */
  addProperty (prop, value = null, immutable = false) {
    if (this._props.has(prop)) {
      throw new Error(`Propery "${prop}" already exists`)
    }
    this._props.set(prop, { value, immutable })
  }

  /**
   * Remove class property
   *
   * Remove property from class or throw an error if property does not exists.
   * The removed property is returned, similar to pop() on a stack.
   *
   * @param prop    String      Property to lookup and remove
   * @throws        Error       Propery prop does not exists
   * @return        String      Removed propery
   */
  removeProperty (prop) {
    if (this._props.has(prop)) {
      for (let prop_ of this._props.keys()) {
        if (prop_ === prop) {
          this._props.delete(prop)
          return prop_
        }
      }
    }
    throw new Error(`Propery "${prop}" does not exist`)
  }

  /**
   * Lookup class property
   *
   * Check whether a property exists or not.
   *
   * @param prop    String      Property to lookup
   * @return        Boolean     True if property exists, otherwise false
   */
  hasProperty (prop) {
    return this._props.has(prop)
  }

  /**
   * Class properties generator
   *
   * Create an iterator with object-like pairs of all class saved properties
   * and their composed attributes.
   */
  * properties () {
    for (let prop of this._props.keys()) {
      let attr = Attribute.from(prop)
      yield { prop, attr }
    }
  }

  /**
   * Create class property guard
   *
   * Add new guard of a property. A guard is a type-check callback to validate
   * input. All guards must evaluate to boolean.
   *
   * The property must exist otherwise an error is thrown.
   *
   * @param prop    String      Property to guard
   * @param func    Function    Callback to be used as guard
   * @throws        Error       Cannot add guard on non-existing property
   */
  addPropertyGuard (prop, func) {
    if (!this.hasProperty(prop)) {
      throw new Error(`Cannot add guard on non-existing property`)
    }
    let blocks = this._guards.get(prop)
    if (blocks == null) {
      blocks = new Set()
    }
    blocks.add(func)
    this._guards.set(prop, blocks)
  }

  /**
   * Remove class property guards
   *
   * It removes all guards of a property. Works similar to pop() on an stack.
   * An empty set is returned if the property has no guards defined.
   *
   * The property must exist otherwise an error is thrown.
   *
   * @param prop    String      Property to lookup
   * @throws        Error       Cannot remove guards from non-existing property
   * @return        Set         Set of stored guards
   */
  removePropertyGuards (prop) {
    if (!this.hasProperty(prop)) {
      throw new Error(`Cannot remove guards from non-existing property`)
    }
    let guards = this.getPropertyGuards(prop)
    this._guards.delete(prop)
    return guards
  }

  /**
   * Class property guards getter
   *
   * Retrieve all guards of a property. An empty set is returned if the
   * property has no guards defined.
   *
   * @param prop    String      Property to lookup
   * @return        Set         Set of stored guards
   */
  getPropertyGuards (prop) {
    if (!this._guards.has(prop)) {
      return new Set()
    }
    return this._guards.get(prop)
  }

  /**
   * Extended class properties generator
   *
   * Create an iterator with object-like pairs of all class saved properties,
   * their composed attributes and property guards.
   */
  * all () {
    for (let [prop, { value, immutable }] of this._props.entries()) {
      let guards = this.getPropertyGuards(prop)
      let attr = Attribute.from(prop)
      yield { prop, value, immutable, attr, guards }
    }
  }

  /**
   * Instance generator
   */
  [Symbol.iterator] () {
    return this.all()
  }
}

module.exports = { ClassBean }
