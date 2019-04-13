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

const fs = require('fs')
const path = require('path')

/**
 * Loader is an util class to read and parse potential ClassJar packages
 * from JSON files or JS modules.
 *
 * @param filepath     String       Path to file to load
 * @param filetype     String       The type of the file (json or js)
 */
class Loader {
  constructor () {
    this._filepath = null
    this._filetype = null
  }

  /**
   * Filepath setter
   *
   * @param fp    String      Path to file to load
   * @throw       Error       File must have a valid filepath
   */
  setFilepath (fp) {
    if (fp && fp.toString() === fp) {
      this._filepath = fp
    } else {
      throw new Error(`File must have a valid filepath`)
    }
  }

  /**
   * Filename getter
   *
   * @return      String      The name of the file without filename extension
   */
  getFilename () {
    return path.basename(this._filepath, `.${this._filetype}`)
  }

  /**
   * Read the content of the file and return it AS IS. Throws an error if
   * the file cannot be accessed or the file is missing.
   *
   * @return      Promise      File content on success, otherwise an error
   */
  async readFile () {
    return new Promise((resolve, reject) => {
      fs.readFile(this._filepath, (e, data) => e ? reject(e) : resolve(data))
    })
  }

  /**
   * Handle stored file as a JSON or throws an error if it fails to parse.
   *
   * @throw       Error        Cannot load file as JSON
   * @return      Object       The name of the file and its parsed content
   */
  async json () {
    this._filetype = 'json'
    let name = this.getFilename()
    let content = await this.readFile()
    let data = JSON.parse(content)
    if (data != null) {
      return { name, data }
    }
    throw new Error(`Cannot load file as JSON`)
  }

  /**
   * Handle stored file as a JavaScript module or throws an error if it
   * fails to parse.
   *
   * @throw       Error        Cannot load file as JavaScript module
   * @return      Object       The name of the file and its parsed content
   */
  async module () {
    this._filetype = 'js'
    let name = this.getFilename()
    let data = require(path.resolve(__dirname, this._filepath))
    if (data !== null && data !== undefined) {
      return { name, data }
    }
    throw new Error(`Cannot load file as JavaScript module`)
  }

  /**
   * Class helper method to set filepath.
   *
   * @param fp    String       Path to file to load
   * @return      Loader       Instance of Loader
   */
  static fetch (fp) {
    let ldr = new Loader()
    ldr.setFilepath(fp)
    return ldr
  }
}

module.exports = { Loader }
