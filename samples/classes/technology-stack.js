// JavaScript class generated with ClassJar

class TechnologyStack {
  constructor () {
    this.__frontend = null;
    this.__backend = null;
    this.__database = null;
    this.__legacy = null;
  }

   getFrontend () {
    if (this.__frontend === null) {
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
    if (this.__backend === null) {
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
    if (this.__database === null) {
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

  getLegacy () {
    if (this.__legacy === null) {
      throw new Error('Property "legacy" is not set');
    }
    return this.__legacy;
  }

  setLegacy (value) {
    let test = v => v === true || v === false;
    if (!test(value)) {
      throw new Error('Unexpected value "' + value + '" of type ' + typeof value);
    }
    this.__legacy = value;
  }

  static Dump (object, keepObject) {
    if (object instanceof TechnologyStack) {
      let serialized = JSON.stringify(object);
      return keepObject === true ? JSON.parse(serialized) : serialized;
    }
    throw new Error('Can only dump instances of TechnologyStack');
  }

  static Load (serialized) {
    if (Object(serialized) !== serialized) {
      serialized = JSON.parse(serialized);
    }

    if (serialized === null) {
      throw new Error('Failed to load serialized object');
    }
    let object = new TechnologyStack();
    for (let key of Object.keys(serialized)) {
      if (object[key] === undefined) {
        throw new Error('Unsupported key "' + key + '" for this class');
      }
      object[key] = serialized[key];
    }
    return object;
  }
}

module.exports = TechnologyStack;
