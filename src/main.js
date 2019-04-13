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

const path = require('path')

const { ArgumentParser } = require('argparse')

const { ClassJar } = require('./jar')

/**
 * ClassJar entrypoint for CLI
 *
 * Converts beans into JS classes from JSON file and JS modules.
 *
 * @param argv    Array      List of command line arguments
 */
async function main (argv) {
  let handler, className

  const shell = new ArgumentParser({
    description: `Generate JavaScript classes from JSON/JS beans`,
    addHelp: true
  })

  shell.addArgument([`-s`, `--src`], {
    help: `Path to target source bean`,
    required: true
  })

  shell.addArgument([`-d`, `--dest`], {
    help: `Path to class directory`,
    required: true
  })

  shell.addArgument(`--js`, {
    help: `Force bean parser to JS module`,
    action: `storeTrue`
  })

  shell.addArgument(`--json`, {
    help: `Force bean parser to JSON`,
    action: `storeTrue`
  })

  const args = shell.parseArgs()

  if (args.js === true) {
    handler = 'js'
  } else if (args.json === true) {
    handler = 'json'
  } else {
    let fp = args.src
    if (fp.endsWith('.json')) {
      handler = 'json'
    } else if (fp.endsWith('.js')) {
      handler = 'js'
    } else {
      process.stderr.write(`Source file extension must be *.js or *.json\n`)
      process.exit(1)
    }
  }

  let classfile = path.basename(args.src, `.${handler}`)
  let output = path.resolve(args.dest, classfile)

  try {
    const jar = await ClassJar[handler](args.src)
    await jar.clazz.saveAs(output, 'js')
    className = jar.bean.getName()
  } catch (e) {
    process.stderr.write(`Cannot generate class from bean!\n`)
    process.stderr.write(` (error) => ${e.message}\n`)
    process.exit(1)
  }

  process.stdout.write(`Successfully generated class!\n`)
  process.stdout.write(` (bean) => ${args.src}\n`)
  process.stdout.write(` (file) => ${output}.js\n`)
  process.stdout.write(` (name) => ${className}\n`)
}

module.exports = { main }
