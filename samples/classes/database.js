// JavaScript class generated with ClassJar

class Database {
  constructor () {
    this.__name = null;
    this.__website = null;
    this.__relational = null;
    this.__version = null;
  }

  getName () {
    if (this.__name === null) {
      throw new Error('Property "name" is not set');
    }
    return this.__name;
  }

  setName (value) {
    if (this.__name !== null) {
      throw new Error('Cannot set immutable property "name"');
    }
    let test = v => v !== undefined && v !== null && v.toString() === v;
    if (!test(value)) {
      throw new Error('Unexpected value "' + value + '" of type ' + typeof value);
    }
    this.__name = value;
  }

  getWebsite () {
    if (this.__website === null) {
      throw new Error('Property "website" is not set');
    }
    return this.__website;
  }

  setWebsite (value) {
    let test = v => v !== undefined && v !== null && v.toString() === v;
    if (!test(value)) {
      throw new Error('Unexpected value "' + value + '" of type ' + typeof value);
    }
    this.__website = value;
  }

  getRelational () {
    if (this.__relational === null) {
      throw new Error('Property "relational" is not set');
    }
    return this.__relational;
  }

  setRelational (value) {
    if (this.__relational !== null) {
      throw new Error('Cannot set immutable property "relational"');
    }
    let test = v => v === true || v === false;
    if (!test(value)) {
      throw new Error('Unexpected value "' + value + '" of type ' + typeof value);
    }
    this.__relational = value;
  }

  getVersion () {
    if (this.__version === null) {
      throw new Error('Property "version" is not set');
    }
    return this.__version;
  }

  setVersion (value) {
    if (this.__version !== null) {
      throw new Error('Cannot set immutable property "version"');
    }
    let test = v => v !== undefined && v !== null && v.toString() === v;
    if (!test(value)) {
      throw new Error('Unexpected value "' + value + '" of type ' + typeof value);
    }
    this.__version = value;
  }

  static Dump (object, keepObject) {
    if (object instanceof Database) {
      let serialized = JSON.stringify(object);
      return keepObject === true ? JSON.parse(serialized) : serialized;
    }
    throw new Error('Can only dump instances of Database');
  }

  static Load (serialized) {
    if (Object(serialized) !== serialized) {
      serialized = JSON.parse(serialized);
    }

    if (serialized === null) {
      throw new Error('Failed to load serialized object');
    }
    let object = new Database();
    for (let key of Object.keys(serialized)) {
      if (object[key] === undefined) {
        throw new Error('Unsupported key "' + key + '" for this class');
      }
      object[key] = serialized[key];
    }
    return object;
  }
}

module.exports = Database;
