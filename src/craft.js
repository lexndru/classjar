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

const { FileCraft } = require('filecraft')

const { ClassBuilder } = require('./builder')

/**
 * Trained class template crafter with predefined rules. This class is used
 * as a JavaScript formatter and file writer.
 *
 * @param name  String    Filename used to store defined class
 */
class ClassCraft extends FileCraft {
  constructor (name) {
    super(name, 'js')
    this.define(`Multiline`, this._defMultiline)
    this.define(`Linefeeds`, this._defLinefeeds)
    this.define(`Constructor`, this._defConstructor)
    this.define(`Spacing`, this._defSpacing)
    this.define(`Nesting`, this._defNesting)
  }

  /**
   * Predefined nesting rule
   *
   * @param feed    Array           Lines of code (original)
   * @param ctx     PortableFile    Crafting context
   * @return        Array           Lines of code (transformed)
   */
  _defNesting (feed, ctx) {
    ctx.resetIndent()
    for (let i = 0; i < feed.length; i++) {
      let indent = ctx.indent
      if (feed[i].match(/\{/)) {
        ctx.incIndent()
      }
      if (feed[i].match(/\}/)) {
        ctx.decIndent()
        indent = ctx.indent
      }
      feed[i] = indent + feed[i]
    }
    return feed
  }

  /**
   * Predefined spacing rule
   *
   * @param feed    Array           Lines of code (original)
   * @return        Array           Lines of code (transformed)
   */
  _defSpacing (feed) {
    for (let i = 0; i < feed.length; i++) {
      let tokens
      if (feed[i].indexOf('{') > -1) {
        let pos = feed[i].indexOf('{')
        if (feed[i][pos - 1] !== ' ') {
          feed[i] = feed[i].substring(0, pos) + ' ' + feed[i].substring(pos)
        }
      }
      tokens = feed[i].match(/(if|for|while)\(/)
      if (tokens != null && tokens.length > 1) {
        let len = tokens.length
        feed[i] = feed[i].substring(0, len) + ' ' + feed[i].substring(len)
      }
      tokens = feed[i].match(/[^>!]?(={1,3})[^>]?/)
      if (tokens != null && tokens.length > 1) {
        let pos = feed[i].indexOf(tokens[1])
        let len = tokens.length
        let before = feed[i].substring(0, pos)
        let after = feed[i].substring(len + pos)
        if (!before.endsWith(' ')) {
          before += ' '
        }
        if (!after.startsWith(' ')) {
          after = ' ' + after
        }
        feed[i] = before + tokens[1] + after
      }
    }
    return feed
  }

  /**
   * Predefined linefeeds rule
   *
   * @param feed    Array           Lines of code (original)
   * @param ctx     PortableFile    Crafting context
   * @return        Array           Lines of code (transformed)
   */
  _defLinefeeds (feed, ctx) {
    for (let i = 0; i < feed.length; i++) {
      if (feed[i].indexOf('}') > -1 && feed[i + 1] !== undefined) {
        let nextline = feed[i + 1]
        if (nextline.match(/\w+\s*\(.*\)\s*\{/)) {
          feed[i] += ctx.linefeed
        }
      }
    }
    return feed
  }

  /**
   * Predefined constructor rule
   *
   * @param feed    Array           Lines of code (original)
   * @return        Array           Lines of code (transformed)
   */
  _defConstructor (feed) {
    let token = 'constructor'
    for (let i = 0; i < feed.length; i++) {
      let pos = feed[i].indexOf(token)
      if (pos > -1) {
        let before = feed[i].substring(0, pos)
        let after = feed[i].substring(pos + token.length)
        feed[i] = `${before}${token} ${after}`
        break
      }
    }
  }

  /**
   * Predefined multiline rule
   *
   * @param feed    Array           Lines of code (original)
   * @return        Array           Lines of code (transformed)
   */
  _defMultiline (feed) {
    for (let i = 0; i < feed.length; i++) {
      let index = feed[i].search(/[{};]/)
      if (index > -1) {
        let before = feed[i].substring(0, index + 1)
        let after = feed[i].substring(index + 1)
        let nextline = feed[i + 1]
        if (nextline !== undefined) {
          feed[i + 1] = after
          after = nextline
        }
        feed.push(after)
        feed[i] = before
      }
    }
    return feed
  }

  /**
   * Helper method to initalize ClassCraft, process class content and
   * apply defined transformations. First argument must be an instance
   * of a ClassBuilder, otherwise an error is thrown.
   *
   * @param template    ClassBuilder    Instance of ClassBuilder
   * @param name        String          Filename to export class
   * @throw             Error           Unexpected template argument
   * @return            ClassCraft      Instance of ClassCraft
   */
  static New (template, name) {
    let cls = new ClassCraft(name)
    let file = cls.TextFile()
    if (template instanceof ClassBuilder) {
      file.writeString(template.dump())
      file._indentSize = 2 // monkey patch
    } else {
      throw new Error(`Unexpected ${typeof template} argument`)
    }
    return cls
  }
}

module.exports = { ClassCraft }
