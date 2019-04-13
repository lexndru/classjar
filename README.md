# ClassJar

ClassJar is a Node.js utility tool to generate JavaScript classes from a structured datasets called beans. The purpose is to obtain custom user-defined objects with predefined getters and setters. This project is inspired by Java's JAXB.

# Install from npm
```
$ npm install --save classjar
```

# How to use?
```
$ classjar -s samples/beans/person.json -d project/classes
Successfully generated class!
 (bean) => samples/beans/person.json
 (file) => project/person.js
 (name) => Person

$ head project/person.js
// Generated JavaScript class file with ClassJar v1.0.0

class Person {
  constructor () {
    this.__firstname = null;
    this.__lastname = null;
    this.__age = null;
  }

  getFirstName () {

```

Currently it supports JSON files and JS modules as beans.


# License
Copyright 2019 Alexandru Catrina

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
