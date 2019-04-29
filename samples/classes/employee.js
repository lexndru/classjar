// JavaScript class generated with ClassJar

class Employee {
  constructor () {
    this.__firstname = null;
    this.__lastname = null;
    this.__jobtitle = "ceo";
    this.__salary = null;
  }

  getFirstName () {
    if (this.__firstname === null) {
      throw new Error('Property "first.name" is not set');
    }
    return this.__firstname;
  }

  setFirstName (value) {
    if (this.__firstname !== null) {
      throw new Error('Cannot set immutable property "first.name"');
    }
    let test = v => v !== undefined && v !== null && v.toString() === v;
    if (!test(value)) {
      throw new Error('Unexpected value "' + value + '" of type ' + typeof value);
    }
    this.__firstname = value;
  }

  getLastName () {
    if (this.__lastname === null) {
      throw new Error('Property "last.name" is not set');
    }
    return this.__lastname;
  }

  setLastName (value) {
    if (this.__lastname !== null) {
      throw new Error('Cannot set immutable property "last.name"');
    }
    let test = v => v !== undefined && v !== null && v.toString() === v;
    if (!test(value)) {
      throw new Error('Unexpected value "' + value + '" of type ' + typeof value);
    }
    this.__lastname = value;
  }

  getJobTitle () {
    if (this.__jobtitle === null) {
      throw new Error('Property "job.title" is not set');
    }
    return this.__jobtitle;
  }

  setJobTitle (value) {
    let test = v => ['devops', 'project manager', 'software developer'].indexOf(v) > -1;
    if (!test(value)) {
      throw new Error('Unexpected value "' + value + '" of type ' + typeof value);
    }
    this.__jobtitle = value;
  }

  getSalary () {
    if (this.__salary === null) {
      throw new Error('Property "salary" is not set');
    }
    return this.__salary;
  }

  setSalary (value) {
    let test = v => Number(v) === v && (v % 1 === 0) && (0 + v === v) && v >= 0 && v < 65536;
    if (!test(value)) {
      throw new Error('Unexpected value "' + value + '" of type ' + typeof value);
    }
    this.__salary = value;
  }

  static Dump (object, keepObject) {
    if (object instanceof Employee) {
      let serialized = JSON.stringify(object);
      return keepObject === true ? JSON.parse(serialized) : serialized;
    }
    throw new Error('Can only dump instances of Employee');
  }

  static Load (serialized) {
    if (Object(serialized) !== serialized) {
      serialized = JSON.parse(serialized);
    }

    if (serialized === null) {
      throw new Error('Failed to load serialized object');
    }
    let object = new Employee();
    for (let key of Object.keys(serialized)) {
      if (object[key] === undefined) {
        throw new Error('Unsupported key "' + key + '" for this class');
      }
      object[key] = serialized[key];
    }
    return object;
  }
}

module.exports = Employee;
