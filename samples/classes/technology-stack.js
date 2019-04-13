// Generated JavaScript class file with ClassJar v1.0.0

class TechnologyStack {
  constructor () {
    this.__frontend = null;
    this.__backend = null;
    this.__database = null;
  }
  
  getFrontend () {
    if (this.__frontend == null) {
      throw new Error('Property "frontend" is not set');
    }
    return this.__frontend;
  }
  
  setFrontend (value) {
    let test = v => v !== undefined && v !== null && v.toString() === v;
    if (!test(value)) {
      throw new Error('Unexpected value "' + value + '" of type ' + typeof value);
    }
    this.__frontend = value;
  }
  
  getBackend () {
    if (this.__backend == null) {
      throw new Error('Property "backend" is not set');
    }
    return this.__backend;
  }
  
  setBackend (value) {
    let test = v => v !== undefined && v !== null && v.toString() === v;
    if (!test(value)) {
      throw new Error('Unexpected value "' + value + '" of type ' + typeof value);
    }
    this.__backend = value;
  }
  
  getDatabase () {
    if (this.__database == null) {
      throw new Error('Property "database" is not set');
    }
    return this.__database;
  }
  
  setDatabase (value) {
    let test = v => v !== undefined && v !== null && v.toString() === v;
    if (!test(value)) {
      throw new Error('Unexpected value "' + value + '" of type ' + typeof value);
    }
    this.__database = value;
  }
}

module.exports = TechnologyStack;
