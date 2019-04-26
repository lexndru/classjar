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

/**
 * A JavaScript class template.
 */
const classTemplate = (className, classMethods, constructorBody) => `
// JavaScript class generated with ClassJar

class ${className} {
  constructor () {${constructorBody}}${classMethods}

  static Dump (object, keepObject) {
    if (object instanceof ${className}) {
      let serialized = JSON.stringify(object);
      return keepObject === true ? JSON.parse(serialized) : serialized;
    }
    throw new Error('Can only dump instances of ${className}');
  }

  static Load (serialized) {
    if (Object(serialized) !== serialized) {
      serialized = JSON.parse(serialized);
    }
    if (serialized === null) {
      throw new Error('Failed to load serialized object');
    }
    let object = new ${className}();
    for (let key of Object.keys(serialized)) {
      if (object[key] === undefined) {
        throw new Error('Unsupported key "' + key + '" for this class');
      }
      object[key] = serialized[key];
    }
    return object;
  }
}

module.exports = ${className};
`

module.exports = { classTemplate }
