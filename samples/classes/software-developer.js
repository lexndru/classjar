// JavaScript class generated with ClassJar

class SoftwareDeveloper {
  constructor () {
    this.__firstname = null;
    this.__lastname = null;
    this.__age = null;
    this.__programminglanguage = null;
  }
  
  getFirstName () {
    if (this.__firstname == null) {
      throw new Error('Property "first.name" is not set');
    }
    return this.__firstname;
  }
  
  setFirstName (value) {
    let test = v => v !== undefined && v !== null && v.toString() === v;
    if (!test(value)) {
      throw new Error('Unexpected value "' + value + '" of type ' + typeof value);
    }
    this.__firstname = value;
  }
  
  getLastName () {
    if (this.__lastname == null) {
      throw new Error('Property "last.name" is not set');
    }
    return this.__lastname;
  }
  
  setLastName (value) {
    let test = v => v !== undefined && v !== null && v.toString() === v;
    if (!test(value)) {
      throw new Error('Unexpected value "' + value + '" of type ' + typeof value);
    }
    this.__lastname = value;
  }
  
  getAge () {
    if (this.__age == null) {
      throw new Error('Property "age" is not set');
    }
    return this.__age;
  }
  
  setAge (value) {
    let test = v => Number(v) === v && (v % 1 === 0) && (0 + v === v) && v >= 0 && v < 256;
    if (!test(value)) {
      throw new Error('Unexpected value "' + value + '" of type ' + typeof value);
    }
    this.__age = value;
  }
  
  getProgrammingLanguage () {
    if (this.__programminglanguage == null) {
      throw new Error('Property "programming.language" is not set');
    }
    return this.__programminglanguage;
  }
  
  setProgrammingLanguage (value) {
    let test = v => ['go', 'javascript', 'python'].indexOf(v) > -1;
    if (!test(value)) {
      throw new Error('Unexpected value "' + value + '" of type ' + typeof value);
    }
    this.__programminglanguage = value;
  }
}

module.exports = SoftwareDeveloper;
